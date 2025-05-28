namespace JobTracker.Backend.DTOs;

public class JobWithJoinsDto
{
    public long Id { get; set; }
    public required string Company { get; set; }
    public required string JobTitle { get; set; }
    public required DateOnly DateApplied { get; set; }
    public required string Status { get; set; }
    public string? Contact { get; set; }
    public List<string>? Skills { get; set; }
}