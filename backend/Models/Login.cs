// Template for this Model was obtained from:
// https://learn.microsoft.com/en-us/aspnet/core/tutorials/first-web-api?view=aspnetcore-9.0&tabs=visual-studio-code#add-a-model-class

namespace JobTracker.Backend.Models;

public class Login
{
    public long Id { get; set; }

    // Required Properties
    public required string Email { get; set; }
    public required string Password { get; set; }

    // Foreign Key(s)
    public long UserId { get; set; }

    // Navigation Properties
    public required virtual User User { get; set; }
}

