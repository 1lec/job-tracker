namespace JobTracker.Backend.DTOs;

public class CreateJobDto
{
    public required string Company { get; set; }
    public required string JobTitle { get; set; }
    public required DateOnly DateApplied { get; set; }
    public required long StatusId { get; set; }
    public long? ContactId { get; set; }
    public List<long>? SkillIds { get; set; }
}