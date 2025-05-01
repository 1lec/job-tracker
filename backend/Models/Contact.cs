// Template for this Model was obtained from:
// https://learn.microsoft.com/en-us/aspnet/core/tutorials/first-web-api?view=aspnetcore-9.0&tabs=visual-studio-code#add-a-model-class

namespace JobTracker.Backend.Models;

public class Contact
{
    public long Id { get; set; }
    public string FirstName { get; set; } // PascalCase is convention for properties, apparently
    public string LastName { get; set; }
    public string Email { get; set; }
    public string Company { get; set; }

    // Foreign Key(s)
    public long UserId { get; set; }
}

