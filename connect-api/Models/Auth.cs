using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace ConnectExtension.Backend.Models
{
    /// <summary>
    /// Requête d'authentification par email/mot de passe
    /// </summary>
    public class LoginRequest
    {
        /// <summary>
        /// Email de l'utilisateur
        /// </summary>
        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        /// <summary>
        /// Mot de passe
        /// </summary>
        [Required]
        public string Password { get; set; } = string.Empty;

        /// <summary>
        /// Se souvenir de moi (conserver la session plus longtemps)
        /// </summary>
        public bool RememberMe { get; set; } = false;
    }

    /// <summary>
    /// Requête d'authentification via LinkedIn
    /// </summary>
    public class LinkedInLoginRequest
    {
        /// <summary>
        /// Token d'accès LinkedIn OAuth
        /// </summary>
        [Required]
        public string LinkedInToken { get; set; } = string.Empty;

        /// <summary>
        /// Email LinkedIn
        /// </summary>
        [Required]
        public string Email { get; set; } = string.Empty;

        /// <summary>
        /// Se souvenir de moi (conserver la session plus longtemps)
        /// </summary>
        public bool RememberMe { get; set; } = false;

        /// <summary>
        /// URL du profil LinkedIn
        /// </summary>
        public string? ProfileUrl { get; set; }

        /// <summary>
        /// Prénom de l'utilisateur
        /// </summary>
        public string? FirstName { get; set; }

        /// <summary>
        /// Nom de l'utilisateur
        /// </summary>
        public string? LastName { get; set; }

        /// <summary>
        /// URL de la photo de profil
        /// </summary>
        public string? PictureUrl { get; set; }

        /// <summary>
        /// Titre/poste professionnel
        /// </summary>
        public string? Title { get; set; }
    }

    /// <summary>
    /// Requête d'inscription d'un nouvel utilisateur
    /// </summary>
    public class RegisterRequest
    {
        /// <summary>
        /// Nom d'utilisateur
        /// </summary>
        [Required]
        public string Username { get; set; } = string.Empty;

        /// <summary>
        /// Email
        /// </summary>
        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        /// <summary>
        /// Mot de passe (au moins 8 caractères)
        /// </summary>
        [Required]
        [MinLength(8, ErrorMessage = "Le mot de passe doit contenir au moins 8 caractères")]
        public string Password { get; set; } = string.Empty;

        /// <summary>
        /// Confirmation du mot de passe
        /// </summary>
        [Required]
        public string ConfirmPassword { get; set; } = string.Empty;

        /// <summary>
        /// Profil LinkedIn (optionnel)
        /// </summary>
        public string? LinkedInProfile { get; set; }

        /// <summary>
        /// URL de l'avatar (optionnel)
        /// </summary>
        public string? ProfileImageUrl { get; set; }

        /// <summary>
        /// Rôle utilisateur (par défaut: Consultant)
        /// </summary>
        public UserRole Role { get; set; } = UserRole.Consultant;

        /// <summary>
        /// Localisation (optionnel)
        /// </summary>
        public string? Location { get; set; }

        /// <summary>
        /// Titre/poste professionnel (optionnel)
        /// </summary>
        public string? Title { get; set; }
    }

    /// <summary>
    /// Requête de finalisation de l'onboarding
    /// </summary>
    public class UserOnboardingRequest
    {
        /// <summary>
        /// Rôle utilisateur sélectionné
        /// </summary>
        [Required]
        public UserRole UserRole { get; set; }

        /// <summary>
        /// Titre professionnel
        /// </summary>
        [Required]
        public string Title { get; set; } = string.Empty;
    }

    /// <summary>
    /// Réponse d'authentification
    /// </summary>
    public class AuthResponse
    {
        /// <summary>
        /// Indique si l'authentification a réussi
        /// </summary>
        public bool Success { get; set; }

        /// <summary>
        /// Message à afficher à l'utilisateur
        /// </summary>
        public string Message { get; set; } = string.Empty;

        /// <summary>
        /// Token JWT
        /// </summary>
        public string Token { get; set; } = string.Empty;

        /// <summary>
        /// Token de rafraîchissement
        /// </summary>
        public string RefreshToken { get; set; } = string.Empty;

        /// <summary>
        /// Date d'expiration du token
        /// </summary>
        public DateTime Expiration { get; set; }

        /// <summary>
        /// Informations sur l'utilisateur
        /// </summary>
        public User? User { get; set; }
    }

    /// <summary>
    /// Requête de rafraîchissement du token
    /// </summary>
    public class RefreshTokenRequest
    {
        /// <summary>
        /// Token de rafraîchissement
        /// </summary>
        [Required]
        public string RefreshToken { get; set; } = string.Empty;
    }
}