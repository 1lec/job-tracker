// Template for this Model was obtained from:
// https://learn.microsoft.com/en-us/aspnet/core/tutorials/first-web-api?view=aspnetcore-9.0&tabs=visual-studio-code#add-a-model-class

// Information about Navigation Properties:
// https://learn.microsoft.com/en-us/ef/ef6/fundamentals/relationships#relationships-in-ef

namespace JobTracker.Backend.Models;

public class User
{
    public long Id { get; set; }

    // Required Properties
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public required string Email { get; set; }
    public required string Password { get; set; }

    // Navigation Properties
    public virtual ICollection<Job> Jobs { get; set; } = new List<Job>();
    public virtual ICollection<Contact> Contacts { get; set; } = new List<Contact>();

    // Navigation Properties for M:M Relationships
    public ICollection<UserSkill> UserSkills { get; set; } = new List<UserSkill>();
}

