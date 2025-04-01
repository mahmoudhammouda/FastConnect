using ConnectExtension.Backend.Models;
using ConnectExtension.Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Threading.Tasks;

namespace ConnectExtension.Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        /// <summary>
        /// Connexion avec email et mot de passe
        /// </summary>
        [HttpPost("login")]
        public async Task<ActionResult<AuthResponse>> Login([FromBody] LoginRequest request)
        {
            var response = await _authService.LoginAsync(request);
            
            if (!response.Success)
            {
                return Unauthorized(response);
            }
            
            return Ok(response);
        }

        /// <summary>
        /// Connexion avec LinkedIn
        /// </summary>
        [HttpPost("linkedin")]
        public async Task<ActionResult<AuthResponse>> LoginWithLinkedIn([FromBody] LinkedInLoginRequest request)
        {
            var response = await _authService.LoginWithLinkedInAsync(request);
            
            if (!response.Success)
            {
                return Unauthorized(response);
            }
            
            return Ok(response);
        }

        /// <summary>
        /// Inscription d'un nouvel utilisateur
        /// </summary>
        [HttpPost("register")]
        public async Task<ActionResult<AuthResponse>> Register([FromBody] RegisterRequest request)
        {
            var response = await _authService.RegisterAsync(request);
            
            if (!response.Success)
            {
                return BadRequest(response);
            }
            
            return Ok(response);
        }

        /// <summary>
        /// Rafraîchir un token JWT
        /// </summary>
        [HttpPost("refresh")]
        public async Task<ActionResult<AuthResponse>> RefreshToken([FromBody] RefreshTokenRequest request)
        {
            var response = await _authService.RefreshTokenAsync(request.RefreshToken);
            
            if (!response.Success)
            {
                return Unauthorized(response);
            }
            
            return Ok(response);
        }

        /// <summary>
        /// Vérifier la validité d'un token
        /// </summary>
        [HttpGet("verify")]
        [Authorize]
        public ActionResult<bool> VerifyToken()
        {
            return Ok(true); // Si nous arrivons ici, le token est valide (le middleware Authorize l'a vérifié)
        }

        /// <summary>
        /// Compléter l'onboarding
        /// </summary>
        [HttpPost("onboarding")]
        [Authorize]
        public async Task<ActionResult<User>> CompleteOnboarding([FromBody] UserOnboardingRequest request)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();
            }
            
            try
            {
                var user = await _authService.CompleteOnboardingAsync(userId, request);
                return Ok(user);
            }
            catch (System.Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Obtenir le profil de l'utilisateur connecté
        /// </summary>
        [HttpGet("profile")]
        [Authorize]
        public async Task<ActionResult<User>> GetProfile()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();
            }
            
            try
            {
                var user = await _authService.GetUserByIdAsync(userId);
                return Ok(user);
            }
            catch (System.Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Mettre à jour le profil de l'utilisateur
        /// </summary>
        [HttpPut("profile")]
        [Authorize]
        public async Task<ActionResult<User>> UpdateProfile([FromBody] User userUpdate)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();
            }
            
            try
            {
                var updatedUser = await _authService.UpdateUserProfileAsync(userId, userUpdate);
                return Ok(updatedUser);
            }
            catch (System.Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}