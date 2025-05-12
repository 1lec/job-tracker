using Microsoft.EntityFrameworkCore;
using JobTracker.Backend.Models; // Adjust based on your namespace structure

var builder = WebApplication.CreateBuilder(args);
var connectionString = builder.Configuration.GetConnectionString("JobTrackerContext") ?? throw new InvalidOperationException("Connection string 'JobTrackerContext' not found.");

// Add services to the container.

// Configure CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:3000") // Use your frontend URL and port
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Add controllers etc.
builder.Services.AddControllers();

// Add in-memory database for development purposes
builder.Services.AddDbContext<JobTrackerContext>(options =>
    options.UseInMemoryDatabase("JobTrackerDb")); // This uses an in-memory database

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthorization();

// Use CORS with the defined policy
app.UseCors("AllowFrontend");

app.MapControllers();

app.Run();
