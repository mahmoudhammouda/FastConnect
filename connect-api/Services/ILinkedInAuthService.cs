using ConnectExtension.Backend.Models;
using System.Threading.Tasks;

namespace ConnectExtension.Backend.Services
{
    /// <summary>
    /// Interface pour le service d'authentification LinkedIn
    /// </summary>
    public interface ILinkedInAuthService
    {
        /// <summary>
        /// Génère l'URL d'autorisation LinkedIn
        /// </summary>
        /// <returns>URL de redirection vers LinkedIn</returns>
        LinkedInAuthUrlResponse GetAuthorizationUrl();
        
        /// <summary>
        /// Échange le code d'autorisation contre un token d'accès
        /// </summary>
        /// <param name="code">Code d'autorisation fourni par LinkedIn</param>
        /// <returns>Token d'accès et informations associées</returns>
        Task<LinkedInTokenResponse> ExchangeCodeForTokenAsync(string code);
        
        /// <summary>
        /// Récupère les informations de profil LinkedIn de l'utilisateur
        /// </summary>
        /// <param name="accessToken">Token d'accès LinkedIn</param>
        /// <returns>Profil utilisateur LinkedIn</returns>
        Task<LinkedInUserProfile> GetUserProfileAsync(string accessToken);
    }
}
