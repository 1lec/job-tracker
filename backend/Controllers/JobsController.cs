// 05/22/2025: Changes to incorporate JWT into this controller's methods were modeled after changes to the analogous ContactsController.cs
// 05/24/2025: Modifications to LINQ query to obtain a list of jobs made with help from ChatGPT, saving 30 minutes of work.
// Thread: https://chatgpt.com/share/68323fa7-9124-800a-863f-94f53e27e1a2

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using JobTracker.Backend.Models;
using JobTracker.Backend.DTOs;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class JobsController : ControllerBase
{
    private readonly JobTrackerContext _context;
    public JobsController(JobTrackerContext context)
    {
        _context = context;
    }

    // GET: api/jobs
    [HttpGet]
    public async Task<ActionResult<IEnumerable<JobWithJoinsDto>>> GetJob()
    {
        // Get the userId from the JWT claims
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
        if (userIdClaim == null)
        {
            return Unauthorized();
        }

        // Convert string userId from token into a long, which matches the userId type in database
        var userId = long.Parse(userIdClaim.Value);

        // Filter jobs by userId
        var userJobs = await _context.Jobs
        .Where(j => j.UserId == userId)
        .Include(j => j.Status)
        .Include(j => j.Contact)
        .Include(j => j.JobSkills!)
            .ThenInclude(js => js.Skill)
        .Select(j => new JobWithJoinsDto
        {
            Id = j.Id,
            Company = j.Company,
            JobTitle = j.JobTitle,
            DateApplied = j.DateApplied,
            Status = j.Status!.Name,
            Contact = j.Contact!.Email,
            Skills = j.JobSkills!
                        .Where(js => js.Skill != null)
                        .Select(js => js.Skill!.Name)
                        .ToList()
        })
        .ToListAsync();

        return userJobs;
    }

    // GET: api/jobs/5
    [HttpGet("{id}")]
public async Task<ActionResult<EditJobDto>> GetJob(long id)
{
    var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
    if (userIdClaim == null)
    {
        return Unauthorized();
    }

    var userId = long.Parse(userIdClaim.Value);

    var job = await _context.Jobs
        .Include(j => j.JobSkills)
        .FirstOrDefaultAsync(j => j.Id == id);

    if (job == null || job.UserId != userId)
    {
        return NotFound();
    }

    var jobDto = new EditJobDto
    {
        Id = job.Id,
        Company = job.Company,
        JobTitle = job.JobTitle,
        DateApplied = job.DateApplied,
        StatusId = job.StatusId,
        ContactId = job.ContactId,
        SkillIds = [.. job.JobSkills.Select(js => js.SkillId)]
    };

    return Ok(jobDto);
}

    // PUT: api/jobs/5 (update)
    [HttpPut("{id}")]
    public async Task<IActionResult> PutJob(long? id, EditJobDto jobDto)
    {
        // Get the userId from the JWT claims
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
        if (userIdClaim == null)
        {
            return Unauthorized();
        }

        // Convert string userId from token into a long, which matches the userId type in database
        var userId = long.Parse(userIdClaim.Value);

        // Use the Id for the job and the userId from the token to fetch the job itself
        var job = await _context.Jobs
            .Include(j => j.JobSkills)
            .FirstOrDefaultAsync(c => c.Id == id && c.UserId == userId);

        if (job == null)
        {
            return NotFound("Job not found or you don't have access to it");
        }

        // Make updates to the fetched job
        job.Company = jobDto.Company;
        job.JobTitle = jobDto.JobTitle;
        job.DateApplied = jobDto.DateApplied;
        job.StatusId = jobDto.StatusId;
        job.ContactId = jobDto.ContactId;

        // Create two lists: the former contains skillIds already in the job, the latter contains skillIds received from the edit form
        var currentSkillIds = job.JobSkills.Select(js => js.SkillId).ToList();
        var newSkillIds = jobDto.SkillIds ?? [];

        // Extract current skillIds that are not present in the list obtained from the edit form, then delete them
        var skillsToRemove = job.JobSkills.Where(js => !newSkillIds.Contains(js.SkillId)).ToList();
        _context.JobSkills.RemoveRange(skillsToRemove);

        // If a skillId is not already present in the current skills, add it to the job
        var skillsToAdd = newSkillIds.Where(id => !currentSkillIds.Contains(id))
            .Select(id => new JobSkill { JobId = job.Id, SkillId = id });

        await _context.JobSkills.AddRangeAsync(skillsToAdd);

        // Save changes to the job
        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!JobExists(id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return NoContent();
    }

    // POST: api/jobs (Insert)
    [HttpPost]
    public async Task<ActionResult<Job>> PostJob([FromBody] CreateJobDto jobDto)
    {
        // Extract userId from token received from frontend
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
        if (userIdClaim == null)
        {
            return Unauthorized();
        }
        var userId = long.Parse(userIdClaim.Value);

        // Use DTO and userId to create a complete Job object
        var job = new Job
        {
            Company = jobDto.Company,
            JobTitle = jobDto.JobTitle,
            DateApplied = jobDto.DateApplied,
            UserId = userId,
            StatusId = jobDto.StatusId,
            ContactId = jobDto.ContactId
        };

        _context.Jobs.Add(job);
        await _context.SaveChangesAsync();

        if (jobDto.SkillIds != null && jobDto.SkillIds.Count > 0)
        {
            for (int i = 0; i < jobDto.SkillIds.Count; i++)
            {
                _context.JobSkills.Add(new JobSkill
                {
                    JobId = job.Id,
                    SkillId = jobDto.SkillIds[i]
                });
            }

            await _context.SaveChangesAsync();
        }

        // Return the jobDto instead of a job object to avoid a circular reference error
        return CreatedAtAction("GetJob", new { id = job.Id }, jobDto);
    }

    // DELETE: api/jobs/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteJob(long? id)
    {
        // Get the userId from the JWT claims
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
        if (userIdClaim == null)
        {
            return Unauthorized();
        }

        // Convert string userId from token into a long, which matches the userId type in database
        var userId = long.Parse(userIdClaim.Value);

        var job = await _context.Jobs
            .Where(c => c.Id == id && c.UserId == userId)
            .FirstOrDefaultAsync();

        if (job == null)
        {
            return NotFound();
        }

        _context.Jobs.Remove(job);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool JobExists(long? id)
    {
        return _context.Jobs.Any(e => e.Id == id);
    }
}
