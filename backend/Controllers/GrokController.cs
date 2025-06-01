#pragma warning disable SKEXP0010
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using JobTracker.Backend.Models;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using System.Net.Http.Headers;

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
            // for debugging
            Console.WriteLine($"jobSkills: {jobSkills}");
            Console.WriteLine($"userSkills: {userSkills}");

            var prompt = $"Please compare this job's required skills: {jobSkills} with my skills: {userSkills}. Let me know my chances of getting this job based on this comparison and how I can improve my chances of getting this job. Write it in a witty way.";

            var reply = await CallGrokDirectAsync(prompt);
            // for debugging
            Console.WriteLine("Grok reply: " + reply);

            return Content(reply ?? string.Empty, "application/json");
        }

        private async Task<string> CallGrokDirectAsync(string prompt)
        {
            // api call we used HttpClient which based on https://chatgpt.com/share/683ca6f8-43a8-800f-9901-5a53be232253
            // saved me around an hour of research and learning. 
            var apiKey = "xai-FlxF6ZOgzgmcLmf55XzBVDTleMo2SHHI7F5tGfhQZn3nSdReOj0ouqCBYx0E6eA6p3BHSUbXE37WUhY4";
            var url = "https://api.x.ai/v1/chat/completions";
           // json request
            var requestData = $@"
            {{
                ""model"": ""grok-3-mini"",
                ""messages"": [
                    {{ ""role"": ""user"", ""content"": ""{prompt}"" }}
                ]
            }}";

            // creating http client instance then making the content a string then using it as a response
            using var client = new HttpClient();
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", apiKey);
            var content = new StringContent(requestData, Encoding.UTF8, "application/json");
            var response = await client.PostAsync(url, content);
            var responseString = await response.Content.ReadAsStringAsync();

           // parsing response for reply
            using var doc = JsonDocument.Parse(responseString);
            var reply = doc.RootElement
                .GetProperty("choices")[0]
                .GetProperty("message")
                .GetProperty("content")
                .GetString();

            return reply;
        }
    }
} 