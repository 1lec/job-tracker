// This controller was created with assistant from ChatGPT. About an hour of work was saved. The thread can be
// found here: https://chatgpt.com/share/681a8da1-de0c-800a-a24c-18d125721825.

using Microsoft.AspNetCore.Mvc;
using JobTracker.Backend.Models.Auth;

namespace JobTracker.Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthenticationController : ControllerBase
    {
        // In-memory user store for demo purposes
        private static List<SignupRequest> registeredUsers = new();

        [HttpPost("signup")]
        public IActionResult Signup([FromBody] SignupRequest request)
        {
            Console.WriteLine($"Received signup request: {request.FirstName} {request.LastName} ({request.Email})");

            // Check if user already exists by email
            if (registeredUsers.Any(u => u.Email.Equals(request.Email, StringComparison.OrdinalIgnoreCase)))
            {
                return Conflict("Email is already registered.");
            }

            // Store user (in production, hash password and store in DB)
            registeredUsers.Add(request);

            Console.WriteLine($"User signed up successfully: {request.FirstName} {request.LastName} ({request.Email})");

            return Ok(new
            {
                message = "Signup successful.",
                user = new
                {
                    request.FirstName,
                    request.LastName,
                    request.Email,
                    request.Skills
                }
            });
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            var user = registeredUsers.FirstOrDefault(u =>
                u.Email.Equals(request.Email, StringComparison.OrdinalIgnoreCase) &&
                u.Password == request.Password // NOTE: never store passwords in plain text in real apps
            );

            if (user == null)
            {
                Console.WriteLine($"Failed login attempt for email: {request.Email}");
                return Unauthorized("Invalid email or password.");
            }
            
            Console.WriteLine($"User with email {request.Email} logged in successfully.");

            return Ok(new
            {
                message = "Login successful.",
                user = new
                {
                    user.FirstName,
                    user.LastName,
                    user.Email,
                    user.Skills
                }
            });
        }
    }
}
