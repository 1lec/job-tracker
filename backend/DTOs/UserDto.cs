namespace JobTracker.Backend.DTOs;

public class UserDto
{
    public required long Id { get; set; }
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public required string Email { get; set; }
}

