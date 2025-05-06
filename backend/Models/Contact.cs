// Template for this Model was obtained from:
// https://learn.microsoft.com/en-us/aspnet/core/tutorials/first-web-api?view=aspnetcore-9.0&tabs=visual-studio-code#add-a-model-class

// Information about Navigation Properties:
// https://learn.microsoft.com/en-us/ef/ef6/fundamentals/relationships#relationships-in-ef

namespace JobTracker.Backend.Models;

public class Contact
{
    public long Id { get; set; }

    // Nullable Properties
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? Email { get; set; }
    public string? Company { get; set; }

    // Foreign Key(s)
    public required long UserId { get; set; }

    // Navigation Properties (connects a Contact back to its specific User)
    public required virtual User User { get; set; }
}

