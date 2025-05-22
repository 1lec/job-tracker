namespace JobTracker.Backend.DTOs;

public class CreateContactDto
{
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? Email { get; set; }
    public string? Company { get; set; }
}