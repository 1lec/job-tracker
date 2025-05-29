// This controller was created with assistant from ChatGPT. About an hour of work was saved. The thread can be
// found here: https://chatgpt.com/share/681a8da1-de0c-800a-a24c-18d125721825.

// Additional changes to this Authentication Controller were made with help from ChatGPT, saving at least 30
// minutes of work. Thread: https://chatgpt.com/share/681fc8b9-6a30-800a-8298-55d2415c502e

using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using JobTracker.Backend.Models;
using JobTracker.Backend.Models.Auth;
using Microsoft.AspNetCore.Identity;

namespace JobTracker.Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthenticationController : ControllerBase
    {
        private readonly JobTrackerContext _context;
        private readonly IConfiguration _configuration;

        public AuthenticationController(JobTrackerContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpPost("signup")]
        public async Task<IActionResult> Signup([FromBody] SignupRequest request)
        {
            Console.WriteLine($"Received signup request: {request.FirstName} {request.LastName} ({request.Email})");

            // Check if the email is already registered in the database
            if (_context.Users.Any(u => u.Email == request.Email))
            {
                return Conflict("Email is already registered.");
            }

            // Create a new User entity
            var newUser = new User
            {
                FirstName = request.FirstName,
                LastName = request.LastName,
                Email = request.Email,
                Password = request.Password // Must hash passwords in production
            };

            // hash passowrd
            //https://learn.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.identity.passwordhasher-1?view=aspnetcore-8.0
            var hasher = new PasswordHasher<User>();
            newUser.Password = hasher.HashPassword(newUser, newUser.Password);

            // Add to database and save
            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();

            Console.WriteLine($"User signed up successfully: {newUser.FirstName} {newUser.LastName} ({newUser.Email})");

            // Iterate through any skillIds and add them to the UserSkills table
            if (request.SkillIds != null && request.SkillIds.Count > 0)
            {
                for (int i = 0; i < request.SkillIds.Count; i++)
                {
                    _context.UserSkills.Add(new UserSkill
                    {
                        UserId = newUser.Id,
                        SkillId = request.SkillIds[i]
                    });
                }

                await _context.SaveChangesAsync();
            }

            return Ok(new
            {
                message = "Signup successful.",
                user = new
                {
                    newUser.FirstName,
                    newUser.LastName,
                    newUser.Email
                }
            });
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            // getting user from database
            var user = _context.Users.FirstOrDefault(u =>
                u.Email == request.Email
            );

            // if entered email not in db then error
            if (user == null)
            {
                Console.WriteLine($"Failed login attempt for email: {request.Email}");
                return Unauthorized("Invalid email or password.");
            }

            // check if hashed passwords match 
            var hasher = new PasswordHasher<User>();
            var passwordPassed = hasher.VerifyHashedPassword(user, user.Password, request.Password);
            // if not error
            if (passwordPassed != PasswordVerificationResult.Success)
            {
                Console.WriteLine($"Failed login attempt for email: {request.Email}");
                return Unauthorized("Invalid password.");
            }

            Console.WriteLine($"User with email {request.Email} logged in successfully.");

            // JWT token generation
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Email)
            };

            var jwtKey = _configuration["Jwt:Key"] 
                ?? throw new InvalidOperationException("JWT signing key is not configured.");
            
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddHours(1),
                signingCredentials: creds
            );

            var tokenString = new JwtSecurityTokenHandler().WriteToken(token);

            // Return to client
            return Ok(new
            {
                message = "Login successful.",
                token = tokenString,
                user = new
                {
                    user.FirstName,
                    user.LastName,
                    user.Email
                }
            });
        }
    }
}
