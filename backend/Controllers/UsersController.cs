using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using JobTracker.Backend.Models;
using JobTracker.Backend.DTOs;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class UsersController : ControllerBase
{
    private readonly JobTrackerContext _context;
    public UsersController(JobTrackerContext context)
    {
        _context = context;
    }

    // GET: api/users
    [HttpGet]
    public async Task<ActionResult<UserDto>> GetUser()
    {
        // Get the userId from the JWT claims
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
        if (userIdClaim == null)
        {
            return Unauthorized();
        }

        // Convert string userId from token into a long, which matches the userId type in database
        var userId = long.Parse(userIdClaim.Value);

        var user = await _context.Users
            .Where(u => u.Id == userId)
            .Include(u => u.UserSkills!)
                .ThenInclude(us => us.Skill)
            .Select(u => new UserDto
            {
                Id = u.Id,
                FirstName = u.FirstName,
                LastName = u.LastName,
                Email = u.Email,
                SkillIds = u.UserSkills!
                        .Where(us => us.Skill != null)
                        .Select(us => us.Skill!.Id)
                        .ToList(),
                Skills = u.UserSkills!
                        .Where(us => us.Skill != null)
                        .Select(us => us.Skill!.Name)
                        .ToList()
            })
            .FirstOrDefaultAsync();

        if (user == null)
        {
            return NotFound();
        }

        return user;
    }

    // PUT: api/users (update)
    [HttpPut]
    public async Task<IActionResult> PutUser(UserDto userDto)
    {
        // Get the userId from the JWT claims
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
        if (userIdClaim == null)
        {
            return Unauthorized();
        }

        // Convert string userId from token into a long, which matches the userId type in database
        var userId = long.Parse(userIdClaim.Value);

        // Search for 
        var user = await _context.Users
            .Include(u => u.UserSkills)
            .FirstOrDefaultAsync(u => u.Id == userId);

        if (user == null)
        {
            return NotFound("User not found or you don't have access to it");
        }

        // Make updates to the fetched user
        user.FirstName = userDto.FirstName;
        user.LastName = userDto.LastName;
        user.Email = userDto.Email;

        // Create two lists: the former contains skillIds already in the user, the latter contains skillIds received from the edit form
        var currentSkillIds = user.UserSkills.Select(us => us.SkillId).ToList();
        var newSkillIds = userDto.SkillIds ?? [];

        // Extract current skillIds that are not present in the list obtained from the edit form, then delete them
        var skillsToRemove = user.UserSkills.Where(us => !newSkillIds.Contains(us.SkillId)).ToList();
        _context.UserSkills.RemoveRange(skillsToRemove);

        // If a skillId is not already present in the current skills, add it to the user
        var skillsToAdd = newSkillIds.Where(id => !currentSkillIds.Contains(id))
            .Select(id => new UserSkill { UserId = user.Id, SkillId = id });

        await _context.UserSkills.AddRangeAsync(skillsToAdd);

        // Save the changes to the profile
        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!UserExists(userId))
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

    // POST: api/users (Insert)
    [HttpPost]
    public async Task<ActionResult<User>> PostUser(User user)
    {
        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return CreatedAtAction("GetUser", new { id = user.Id }, user);
    }

    // DELETE: api/users/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUser(long? id)
    {
        var user = await _context.Users.FindAsync(id);
        if (user == null)
        {
            return NotFound();
        }

        _context.Users.Remove(user);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool UserExists(long? id)
    {
        return _context.Users.Any(e => e.Id == id);
    }
}
