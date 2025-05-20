// Template for this Model was obtained from:
// https://learn.microsoft.com/en-us/aspnet/core/tutorials/first-web-api?view=aspnetcore-9.0&tabs=visual-studio-code#add-a-model-class

// Information about Navigation Properties:
// https://learn.microsoft.com/en-us/ef/ef6/fundamentals/relationships#relationships-in-ef

namespace JobTracker.Backend.Models;

public class Job
{
    public long Id { get; set; }
    public required string Company { get; set; }
    public required string JobTitle { get; set; }
    public required DateOnly DateApplied { get; set; }

    // Foreign Keys
    public required long UserId { get; set; }
    public required long StatusId { get; set; }
    public long? ContactId { get; set; }

    // Navigation Properties
    public virtual User? User { get; set; }
    public virtual Status? Status { get; set; }
    public virtual Contact? Contact { get; set; }

    // Navigation Properties for M:M Relationships
    public ICollection<JobSkill> JobSkills { get; set; } = new List<JobSkill>();
}

