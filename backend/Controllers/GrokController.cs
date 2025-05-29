#pragma warning disable SKEXP0010
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using JobTracker.Backend.Models;
using System.Linq;
using Microsoft.SemanticKernel.ChatCompletion;
using Microsoft.SemanticKernel.Connectors.OpenAI;

namespace JobTracker.Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GrokController : ControllerBase
    {
        private readonly JobTrackerContext _context;
        public GrokController(JobTrackerContext context)
        {
            _context = context;
        }

        public class GrokCompareRequest
        {
            public long JobId { get; set; }
        }

        [HttpPost("compare")]
        public async Task<IActionResult> Compare([FromBody] GrokCompareRequest request)
        {
            // get user id from token string then convert to int
            var userIdToken = User.FindFirst(ClaimTypes.NameIdentifier);
            var userId = int.Parse(userIdToken.Value);

            // eager loading was based on https://learn.microsoft.com/en-us/ef/core/querying/related-data/eager

            // get job skills by job id
            var jobs = await _context.Jobs
                .Include(j => j.JobSkills)
                    .ThenInclude(js => js.Skill)
                .Where(j => j.Id == request.JobId)
                .ToListAsync();

            // get user skills by user id
            var users = await _context.Users
                .Include(u => u.UserSkills)
                    .ThenInclude(us => us.Skill)
                .Where(u => u.Id == userId)
                .ToListAsync();

            // takes the skills and joins them one by one into a string
            var jobSkills = string.Join(", ", jobs.First().JobSkills.Select(jobSkill => jobSkill.Skill.Name));
            var userSkills = string.Join(", ", users.First().UserSkills.Select(userSkill => userSkill.Skill.Name));

            // api call based on https://devblogs.microsoft.com/semantic-kernel/integrate-sk-with-xai-grok-easily/  

            var chatService = new OpenAIChatCompletionService(
                modelId: "grok-beta", 
                apiKey: "xai-jH06gHRactr1k17YDYCIUdXhe6cYPThOzJMWV20i4QC3Yv1QGVCB3R0KItlHVQ1luszL9dCodRB5qLk7", 
                endpoint: new Uri("https://api.x.ai/v1")
            );

            ChatHistory chatHistory = new ChatHistory();
            chatHistory.AddUserMessage(
                $"Please compare this job's required skills: {jobSkills} with my skills: {userSkills}. Let me know my chances of getting this job based on this comparison and how I can improve my chances of getting this job. Write it in a witty way."
            );

            var settings = new OpenAIPromptExecutionSettings { MaxTokens = 200 };

            var reply = await chatService.GetChatMessageContentAsync(chatHistory, settings);
            Console.WriteLine("Grok reply: " + reply);

            return Content(reply.Content ?? string.Empty, "application/json");
        }
    }
} 