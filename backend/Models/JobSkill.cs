// Template for this Model was obtained from:
// https://learn.microsoft.com/en-us/aspnet/core/tutorials/first-web-api?view=aspnetcore-9.0&tabs=visual-studio-code#add-a-model-class

// I used ChatGPT to generate the navigation properties for this Model. This saved around 30 minutes.
// The transcript can be found here: https://chatgpt.com/share/6813e131-34f0-800a-bb25-cc17bf4bdf03

namespace JobTracker.Backend.Models;

public class JobSkill
{
    public long Id { get; set; }

    // Foreign Keys
    public required long JobId { get; set; }
    public required long SkillId { get; set; }

    // Navigation Properties
    public Job? Job { get; set; }
    public Skill? Skill { get; set; }
}
