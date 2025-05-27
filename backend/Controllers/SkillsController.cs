using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using JobTracker.Backend.Models;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class SkillsController : ControllerBase
{
    private readonly JobTrackerContext _context;
    public SkillsController(JobTrackerContext context)
    {
        _context = context;
    }

    // GET: api/skills
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Skill>>> GetSkill()
    {
        // Get the userId from the JWT claims
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
        if (userIdClaim == null)
        {
            return Unauthorized();
        }

        // Select all skills
        var skills = await _context.Skills
            .ToListAsync();

        return skills;
    }

    // GET: api/skills/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Skill>> GetSkill(long id)
    {
        // Get the userId from the JWT claims
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
        if (userIdClaim == null)
        {
            return Unauthorized();
        }

        // Select the skill with a specific id
        var skill = await _context.Skills.FindAsync(id);

        if (skill == null)
        {
            return NotFound();
        }

        return skill;
    }

    private bool SkillExists(long? id)
    {
        return _context.Skills.Any(e => e.Id == id);
    }
}
