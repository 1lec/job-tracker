using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using JobTracker.Backend.Models;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class StatusesController : ControllerBase
{
    private readonly JobTrackerContext _context;
    public StatusesController(JobTrackerContext context)
    {
        _context = context;
    }

    // GET: api/statuses
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Status>>> GetStatus()
    {
        // Get the userId from the JWT claims
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
        if (userIdClaim == null)
        {
            return Unauthorized();
        }

        // Select all statuses
        var statuses = await _context.Statuses
            .ToListAsync();

        return statuses;
    }

    // GET: api/statuses/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Status>> GetStatus(long id)
    {
        // Get the userId from the JWT claims
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
        if (userIdClaim == null)
        {
            return Unauthorized();
        }

        // Select the status with a specific id
        var status = await _context.Statuses.FindAsync(id);

        if (status == null)
        {
            return NotFound();
        }

        return status;
    }

    private bool StatusExists(long? id)
    {
        return _context.Statuses.Any(e => e.Id == id);
    }
}
