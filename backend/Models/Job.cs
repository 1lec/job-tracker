// Template for this Model was obtained from:
// https://learn.microsoft.com/en-us/aspnet/core/tutorials/first-web-api?view=aspnetcore-9.0&tabs=visual-studio-code

namespace JobTracker.Backend.Models;

public class Job
{
    public long Id { get; set; }
    public string CompanyName { get; set; } // PascalCase is convention for properties, apparently
    public string JobTitle { get; set; }
    public DateOnly DateApplied { get; set; }

    // Foreign Keys
    public long UserId { get; set; }
    public long StatusId { get; set; }
    public long ContactId { get; set; }
}

