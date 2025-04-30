using System.Text.Json.Serialization;

namespace ConnectExtension.Backend.Models
{
    /// <summary>
    /// Réponse contenant l'URL d'autorisation LinkedIn
    /// </summary>
    public class LinkedInAuthUrlResponse
    {
        /// <summary>
        /// URL de redirection vers LinkedIn OAuth
        /// </summary>
        public string Url { get; set; } = string.Empty;
        
        /// <summary>
        /// État pour la protection CSRF
        /// </summary>
        public string State { get; set; } = string.Empty;
    }

    /// <summary>
    /// Réponse du token OAuth2 de LinkedIn
    /// </summary>
    public class LinkedInTokenResponse
    {
        /// <summary>
        /// Type de token (Bearer)
        /// </summary>
        [JsonPropertyName("token_type")]
        public string TokenType { get; set; } = string.Empty;
        
        /// <summary>
        /// Durée de validité du token en secondes
        /// </summary>
        [JsonPropertyName("expires_in")]
        public int ExpiresIn { get; set; }
        
        /// <summary>
        /// Token d'accès LinkedIn
        /// </summary>
        [JsonPropertyName("access_token")]
        public string AccessToken { get; set; } = string.Empty;
        
        /// <summary>
        /// Token de rafraîchissement (si disponible)
        /// </summary>
        [JsonPropertyName("refresh_token")]
        public string? RefreshToken { get; set; }
    }

    /// <summary>
    /// Profil utilisateur LinkedIn récupéré via l'API
    /// </summary>
    public class LinkedInUserProfile
    {
        /// <summary>
        /// Identifiant LinkedIn
        /// </summary>
        public string Id { get; set; } = string.Empty;
        
        /// <summary>
        /// Prénom
        /// </summary>
        public string FirstName { get; set; } = string.Empty;
        
        /// <summary>
        /// Nom
        /// </summary>
        public string LastName { get; set; } = string.Empty;
        
        /// <summary>
        /// Adresse email
        /// </summary>
        public string Email { get; set; } = string.Empty;
        
        /// <summary>
        /// URL du profil LinkedIn
        /// </summary>
        public string ProfileUrl { get; set; } = string.Empty;
        
        /// <summary>
        /// URL de la photo de profil
        /// </summary>
        public string? PictureUrl { get; set; }
        
        /// <summary>
        /// Titre/poste professionnel actuel
        /// </summary>
        public string? Title { get; set; }
    }

    /// <summary>
    /// Requête pour le callback OAuth LinkedIn
    /// </summary>
    public class LinkedInCallbackRequest
    {
        /// <summary>
        /// Code d'autorisation fourni par LinkedIn
        /// </summary>
        public string Code { get; set; } = string.Empty;
        
        /// <summary>
        /// État pour vérification CSRF
        /// </summary>
        public string State { get; set; } = string.Empty;
        
        /// <summary>
        /// Code d'erreur (si échec)
        /// </summary>
        public string? Error { get; set; }
        
        /// <summary>
        /// Description de l'erreur (si échec)
        /// </summary>
        public string? ErrorDescription { get; set; }
    }
}
