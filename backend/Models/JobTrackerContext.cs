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

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Set behavior so that when a contact is deleted, a Job's contactId field is nulled
        modelBuilder.Entity<Job>()
            .HasOne(j => j.Contact)
            .WithMany()
            .HasForeignKey(j => j.ContactId)
            .OnDelete(DeleteBehavior.SetNull);
    }

    public DbSet<Contact> Contacts { get; set; } = null!;
    public DbSet<Job> Jobs { get; set; } = null!;
    public DbSet<Skill> Skills { get; set; } = null!;
    public DbSet<Status> Statuses { get; set; } = null!;
    public DbSet<User> Users { get; set; } = null!;

    // Junction Tables
    public DbSet<JobSkill> JobSkills { get; set; } = null!;
    public DbSet<UserSkill> UserSkills { get; set; } = null!;
}