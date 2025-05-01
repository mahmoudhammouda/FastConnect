using ConnectExtension.Backend.Models;
using ConnectExtension.Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Security.Claims;
using System.Threading.Tasks;

namespace ConnectExtension.Backend.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly ILinkedInAuthService _linkedInAuthService;

        public AuthController(IAuthService authService, ILinkedInAuthService linkedInAuthService)
        {
            _authService = authService;
            _linkedInAuthService = linkedInAuthService;
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
        /// Obtenir l'URL de redirection OAuth LinkedIn
        /// </summary>
        [HttpGet("linkedin/redirect")]
        public ActionResult<LinkedInAuthUrlResponse> GetLinkedInRedirect()
        {
            try
            {
                var redirectUrl = _linkedInAuthService.GetAuthorizationUrl();
                return Ok(redirectUrl);
            }
            catch (Exception ex)
            {
                return BadRequest(new { Success = false, Message = $"Erreur lors de la génération de l'URL LinkedIn: {ex.Message}" });
            }
        }

        /// <summary>
        /// Callback OAuth LinkedIn - Endpoint appelé par le frontend après redirection LinkedIn
        /// </summary>
        [HttpGet("linkedin/callback")]
        public async Task<ActionResult<AuthResponse>> LinkedInCallback([FromQuery] string code, [FromQuery] string state = "", [FromQuery] string error = "", [FromQuery] string error_description = "")
        {
            // Vérifier s'il y a une erreur
            if (!string.IsNullOrEmpty(error))
            {
                return BadRequest(new { Success = false, Message = $"Erreur LinkedIn: {error} - {error_description}" });
            }

            try
            {
                // 1. Échanger le code contre un token d'accès
                var tokenResponse = await _linkedInAuthService.ExchangeCodeForTokenAsync(code);
                
                // 2. Récupérer les informations du profil LinkedIn
                var userProfile = await _linkedInAuthService.GetUserProfileAsync(tokenResponse.AccessToken);
                
                // 3. Créer une requête d'authentification LinkedIn pour le service Auth
                var linkedInRequest = new LinkedInLoginRequest
                {
                    Email = userProfile.Email,
                    LinkedInToken = tokenResponse.AccessToken,
                    RememberMe = true, // Par défaut on garde la session active pour LinkedIn
                    ProfileUrl = userProfile.ProfileUrl,
                    FirstName = userProfile.FirstName,
                    LastName = userProfile.LastName,
                    PictureUrl = userProfile.PictureUrl,
                    Title = userProfile.Title
                };
                
                // 4. Authentifier l'utilisateur avec nos services
                var response = await _authService.LoginWithLinkedInAsync(linkedInRequest);
                
                if (!response.Success)
                {
                    return Unauthorized(response);
                }
                
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(new { Success = false, Message = $"Erreur lors de l'authentification LinkedIn: {ex.Message}" });
            }
        }

        /// <summary>
        /// Connexion avec LinkedIn (legacy endpoint)
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
        [HttpPost("refresh-token")] // Ajouter cet alias pour compatibilité avec le frontend
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
        /// Déconnecter l'utilisateur et invalider son token
        /// </summary>
        [HttpPost("logout")]
        [Authorize]
        public async Task<ActionResult<bool>> Logout()
        {
            try
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userId))
                {
                    // Utilisateur déjà déconnecté ou token invalide
                    return Ok(true);
                }
                
                // Vous pouvez ajouter ici une logique pour invalider le refresh token en base de données
                // await _authService.InvalidateTokensForUserAsync(userId);
                
                return Ok(true);
            }
            catch (Exception ex)
            {
                return BadRequest(new { Success = false, Message = $"Erreur lors de la déconnexion: {ex.Message}" });
            }
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