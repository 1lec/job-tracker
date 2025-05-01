// Template for this Database Context was obtained from:
// https://learn.microsoft.com/en-us/aspnet/core/tutorials/first-web-api?view=aspnetcore-9.0&tabs=visual-studio-code#add-a-database-context

using Microsoft.EntityFrameworkCore;

namespace JobTracker.Backend.Models;

public class JobTrackerContext : DbContext
{
    public JobTrackerContext(DbContextOptions<JobTrackerContext> options)
        : base(options)
    {
    }

    public DbSet<Job> Jobs { get; set; } = null!;
}