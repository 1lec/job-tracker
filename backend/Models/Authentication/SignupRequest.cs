namespace JobTracker.Backend.Models.Auth;

public class SignupRequest
{
    public string FirstName { get; set; } = "";
    public string LastName { get; set; } = "";
    public string Email { get; set; } = "";
    public string Password { get; set; } = "";
    public List<long>? SkillIds { get; set; } = new();
}