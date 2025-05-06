// Template for this Model was obtained from:
// https://learn.microsoft.com/en-us/aspnet/core/tutorials/first-web-api?view=aspnetcore-9.0&tabs=visual-studio-code#add-a-model-class

namespace JobTracker.Backend.Models;

public class Status
{
    public long Id { get; set; }

    // Required Properties
    public required string Name { get; set; }

    // Navigation Properties (list of Jobs of a given status)
    public virtual ICollection<Job> Jobs { get; set; } = new List<Job>();

}