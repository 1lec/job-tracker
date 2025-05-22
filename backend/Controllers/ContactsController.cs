// 05/22/2025: Changes to incorporate JWT into the controller's methods were made with assistance from ChatGPT, saving 1-2 hours of work.
// Thread: https://chatgpt.com/share/682f62d3-74b0-800a-b7ef-5e61b29beb36

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using JobTracker.Backend.Models;
using JobTracker.Backend.DTOs;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class ContactsController : ControllerBase
{
    private readonly JobTrackerContext _context;
    public ContactsController(JobTrackerContext context)
    {
        _context = context;
    }

    // GET: api/contacts
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Contact>>> GetContact()
    {
        // Get the userId from the JWT claims
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
        if (userIdClaim == null)
        {
            return Unauthorized();
        }

        // Convert string userId from token into a long, which matches the userId type in database
        var userId = long.Parse(userIdClaim.Value);

        // Filter contacts by userId
        var userContacts = await _context.Contacts
            .Where(c => c.UserId == userId)
            .ToListAsync();

        return userContacts;
    }

    // GET: api/contacts/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Contact>> GetContact(long id)
    {
        // Get the userId from the JWT claims
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
        if (userIdClaim == null)
        {
            return Unauthorized();
        }

        // Convert string userId from token into a long, which matches the userId type in database
        var userId = long.Parse(userIdClaim.Value);

        var contact = await _context.Contacts
            .FindAsync(id);

        if (contact == null || contact.UserId != userId)
        {
            return NotFound();
        }

        return contact;
    }

    // PUT: api/contacts/5 (update)
    [HttpPut("{id}")]
    public async Task<IActionResult> PutContact(long? id, EditContactDto contactDto)
    {
        // Get the userId from the JWT claims
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
        if (userIdClaim == null)
        {
            return Unauthorized();
        }

        // Convert string userId from token into a long, which matches the userId type in database
        var userId = long.Parse(userIdClaim.Value);

        // Use the Id for the contact and the userId from the token to fetch the contact itself
        var contact = await _context.Contacts
            .FirstOrDefaultAsync(c => c.Id == id && c.UserId == userId);

        if (contact == null)
        {
            return NotFound("Contact not found or you don't have access to it");
        }

        // Make updates to the fetched contact
        contact.FirstName = contactDto.FirstName;
        contact.LastName = contactDto.LastName;
        contact.Email = contactDto.Email;
        contact.Company = contactDto.Company;

        // Save the changes to the contact
        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!ContactExists(id))
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

    // POST: api/contacts (Insert)
    [HttpPost]
    public async Task<IActionResult> PostContact(CreateContactDto contactDto)
    {
        // Extract userId from token received from frontend
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
        if (userIdClaim == null)
        {
            return Unauthorized();
        }
        var userId = long.Parse(userIdClaim.Value);

        // Use DTO and userId to create a complete Contact object
        var contact = new Contact
        {
            FirstName = contactDto.FirstName, 
            LastName = contactDto.LastName, 
            Email = contactDto.Email, 
            Company = contactDto.Company, 
            UserId = userId
        };

        _context.Contacts.Add(contact);
        await _context.SaveChangesAsync();

        return CreatedAtAction("GetContact", new { id = contact.Id }, contact);
    }

    // DELETE: api/contacts/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteContact(long? id)
    {
        // Get the userId from the JWT claims
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
        if (userIdClaim == null)
        {
            return Unauthorized();
        }

        // Convert string userId from token into a long, which matches the userId type in database
        var userId = long.Parse(userIdClaim.Value);

        var contact = await _context.Contacts
            .Where(c => c.Id == id && c.UserId == userId)
            .FirstOrDefaultAsync();

        if (contact == null)
        {
            return NotFound();
        }

        _context.Contacts.Remove(contact);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool ContactExists(long? id)
    {
        return _context.Contacts.Any(e => e.Id == id);
    }
}
