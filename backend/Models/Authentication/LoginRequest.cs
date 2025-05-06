namespace JobTracker.Backend.Models.Auth;

public class LoginRequest
{
    public string Email { get; set; } = "";
    public string Password { get; set; } = "";
}