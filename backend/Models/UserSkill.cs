// Template for this Model was obtained from:
// https://learn.microsoft.com/en-us/aspnet/core/tutorials/first-web-api?view=aspnetcore-9.0&tabs=visual-studio-code#add-a-model-class

namespace JobTracker.Backend.Models;

public class UserSkill
{
    public long Id { get; set; }

    // Foreign Keys
    public long UserId { get; set; }
    public long SkillId { get; set; }
}
