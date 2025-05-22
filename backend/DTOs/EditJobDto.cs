namespace JobTracker.Backend.DTOs;

public class EditJobDto
{
    public required long Id { get; set; }
    public required string Company { get; set; }
    public required string JobTitle { get; set; }
    public required DateOnly DateApplied { get; set; }
    public required long StatusId { get; set; }
    public long? ContactId { get; set; }
}