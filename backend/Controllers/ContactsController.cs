using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using JobTracker.Backend.Models;

[Route("api/[controller]")]
[ApiController]
public class ContactsController : ControllerBase
{
    private readonly JobTrackerContext _context;
    public ContactsController(JobTrackerContext context)
    {
        _context = context;
    }

    // GET: api/Contact
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Contact>>> GetContact()
    {
        return await _context.Contacts.ToListAsync();
    }

    // GET: api/Contact/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Contact>> GetContact(long id)
    {
        var contact = await _context.Contacts.FindAsync(id);

        if (contact == null)
        {
            return NotFound();
        }

        return contact;
    }

    // PUT: api/Contact/5 (update)
    [HttpPut("{id}")]
    public async Task<IActionResult> PutContact(long? id, Contact contact)
    {
        if (id != contact.Id)
        {
            return BadRequest();
        }

        _context.Entry(contact).State = EntityState.Modified;

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

    // POST: api/Contact (Insert)
    [HttpPost]
    public async Task<ActionResult<Contact>> PostContact(Contact contact)
    {
        _context.Contacts.Add(contact);
        await _context.SaveChangesAsync();

        return CreatedAtAction("GetContact", new { id = contact.Id }, contact);
    }

    // DELETE: api/Contact/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteContact(long? id)
    {
        var contact = await _context.Contacts.FindAsync(id);
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
