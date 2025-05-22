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
    public async Task<ActionResult<IEnumerable<Job>>> GetJob()
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
            .Where(c => c.UserId == userId)
            .ToListAsync();

        return userJobs;
    }

    // GET: api/jobs/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Job>> GetJob(long id)
    {
        // Get the userId from the JWT claims
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
        if (userIdClaim == null)
        {
            return Unauthorized();
        }

        // Convert string userId from token into a long, which matches the userId type in database
        var userId = long.Parse(userIdClaim.Value);

        var job = await _context.Jobs.FindAsync(id);

        if (job == null || job.UserId != userId)
        {
            return NotFound();
        }

        return job;
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
    public async Task<ActionResult<Job>> PostJob(CreateJobDto jobDto)
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

        return CreatedAtAction("GetJob", new { id = job.Id }, job);
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
