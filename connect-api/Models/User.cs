using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace ConnectExtension.Backend.Models
{
    /// <summary>
    /// Représente un type de rôle utilisateur dans le système
    /// </summary>
    public enum UserRole
    {
        Consultant,
        Recruiter,
        Admin
    }

    /// <summary>
    /// Représente un utilisateur du système
    /// </summary>
    public class User
    {
        /// <summary>
        /// Identifiant unique de l'utilisateur
        /// </summary>
        public string Id { get; set; } = Guid.NewGuid().ToString();

        /// <summary>
        /// Nom d'utilisateur
        /// </summary>
        public string Username { get; set; } = string.Empty;

        /// <summary>
        /// Adresse email de l'utilisateur
        /// </summary>
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        /// <summary>
        /// URL du profil LinkedIn
        /// </summary>
        public string? LinkedInProfile { get; set; }

        /// <summary>
        /// URL de l'image de profil
        /// </summary>
        public string? ProfileImageUrl { get; set; }

        /// <summary>
        /// Mot de passe hashé (non renvoyé dans les réponses API)
        /// </summary>
        [JsonIgnore]
        public string? PasswordHash { get; set; }

        /// <summary>
        /// Rôle de l'utilisateur dans le système
        /// </summary>
        public UserRole Role { get; set; } = UserRole.Consultant;

        /// <summary>
        /// Date de création du compte
        /// </summary>
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        /// <summary>
        /// Date de dernière connexion
        /// </summary>
        public DateTime? LastLogin { get; set; }

        /// <summary>
        /// Indique si le processus d'onboarding a été complété
        /// </summary>
        public bool OnboardingCompleted { get; set; } = false;

        /// <summary>
        /// Compétences de l'utilisateur (pertinent pour les consultants)
        /// </summary>
        public List<string> Skills { get; set; } = new List<string>();

        /// <summary>
        /// Localisation géographique de l'utilisateur
        /// </summary>
        public string? Location { get; set; }

        /// <summary>
        /// Numéro de téléphone
        /// </summary>
        public string? PhoneNumber { get; set; }

        /// <summary>
        /// Titre ou poste actuel
        /// </summary>
        public string? Title { get; set; }

        /// <summary>
        /// Indique si le compte a été vérifié
        /// </summary>
        public bool IsVerified { get; set; } = false;

        /// <summary>
        /// Indique si l'utilisateur a été authentifié via LinkedIn
        /// </summary>
        public bool IsLinkedInAuthenticated { get; set; } = false;
    }
}