using ConnectExtension.Backend.Models;
using System.Threading.Tasks;

namespace ConnectExtension.Backend.Services
{
    /// <summary>
    /// Interface pour le service d'authentification
    /// </summary>
    public interface IAuthService
    {
        /// <summary>
        /// Authentifier un utilisateur avec email et mot de passe
        /// </summary>
        Task<AuthResponse> LoginAsync(LoginRequest request);
        
        /// <summary>
        /// Authentifier un utilisateur avec LinkedIn OAuth
        /// </summary>
        Task<AuthResponse> LoginWithLinkedInAsync(LinkedInLoginRequest request);
        
        /// <summary>
        /// Inscrire un nouvel utilisateur
        /// </summary>
        Task<AuthResponse> RegisterAsync(RegisterRequest request);
        
        /// <summary>
        /// Mettre à jour le profil lors de la première connexion
        /// </summary>
        Task<User> CompleteOnboardingAsync(string userId, UserOnboardingRequest request);
        
        /// <summary>
        /// Rafraîchir un token d'authentification
        /// </summary>
        Task<AuthResponse> RefreshTokenAsync(string refreshToken);
        
        /// <summary>
        /// Valider un token JWT
        /// </summary>
        bool ValidateToken(string token);
        
        /// <summary>
        /// Obtenir un utilisateur par son ID
        /// </summary>
        Task<User> GetUserByIdAsync(string userId);
        
        /// <summary>
        /// Mettre à jour le profil d'un utilisateur
        /// </summary>
        Task<User> UpdateUserProfileAsync(string userId, User userUpdate);
    }
}