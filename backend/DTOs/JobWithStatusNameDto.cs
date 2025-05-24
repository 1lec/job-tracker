namespace JobTracker.Backend.DTOs;

public class JobWithStatusNameDto
{
    public long Id { get; set; }
    public required string Company { get; set; }
    public required string JobTitle { get; set; }
    public required DateOnly DateApplied { get; set; }
    public required string Status { get; set; }
    public long? ContactId { get; set; }
}