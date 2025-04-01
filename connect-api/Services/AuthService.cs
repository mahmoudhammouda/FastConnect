using ConnectExtension.Backend.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using BCrypt.Net;

namespace ConnectExtension.Backend.Services
{
    /// <summary>
    /// Implémentation du service d'authentification
    /// </summary>
    public class AuthService : IAuthService
    {
        private readonly IConfiguration _configuration;
        private readonly List<User> _users = new(); // Stockage en mémoire pour le prototype
        private readonly Dictionary<string, string> _refreshTokens = new(); // Stockage des refreshTokens

        public AuthService(IConfiguration configuration)
        {
            _configuration = configuration;
            
            // Ajouter quelques utilisateurs de test
            var admin = new User
            {
                Id = "admin-id",
                Username = "Admin",
                Email = "admin@fastconnect.com",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("admin123"),
                Role = UserRole.Admin,
                IsVerified = true,
                OnboardingCompleted = true,
                Title = "Administrateur",
                Skills = new List<string> { "Administration", "Management" },
                Location = "Paris, France"
            };
            
            var consultant = new User
            {
                Id = "consultant-id",
                Username = "Consultant Test",
                Email = "consultant@fastconnect.com",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("consultant123"),
                Role = UserRole.Consultant,
                IsVerified = true,
                OnboardingCompleted = true,
                Title = "Développeur Senior",
                Skills = new List<string> { "Angular", ".NET", "SQL", "Azure" },
                Location = "Lyon, France"
            };
            
            var recruiter = new User
            {
                Id = "recruiter-id",
                Username = "Recruteur Test",
                Email = "recruiter@fastconnect.com",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("recruiter123"),
                Role = UserRole.Recruiter,
                IsVerified = true,
                OnboardingCompleted = true,
                Title = "Responsable Recrutement",
                Location = "Paris, France"
            };
            
            _users.Add(admin);
            _users.Add(consultant);
            _users.Add(recruiter);
        }

        /// <summary>
        /// Authentifier un utilisateur avec email et mot de passe
        /// </summary>
        public async Task<AuthResponse> LoginAsync(LoginRequest request)
        {
            // Simuler une opération asynchrone
            await Task.Delay(100);
            
            var user = _users.Find(u => u.Email.ToLower() == request.Email.ToLower());
            
            if (user == null)
            {
                return new AuthResponse
                {
                    Success = false,
                    Message = "Utilisateur non trouvé"
                };
            }
            
            if (!BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
            {
                return new AuthResponse
                {
                    Success = false,
                    Message = "Mot de passe incorrect"
                };
            }
            
            user.LastLogin = DateTime.UtcNow;
            
            return GenerateAuthResponse(user, request.RememberMe);
        }

        /// <summary>
        /// Authentifier un utilisateur avec LinkedIn OAuth
        /// </summary>
        public async Task<AuthResponse> LoginWithLinkedInAsync(LinkedInLoginRequest request)
        {
            // Simuler une opération asynchrone
            await Task.Delay(100);
            
            // Vérifier si l'utilisateur existe déjà
            var user = _users.Find(u => u.Email.ToLower() == request.Email.ToLower());
            
            if (user == null)
            {
                // Créer un nouvel utilisateur
                user = new User
                {
                    Email = request.Email,
                    Username = request.Email.Split('@')[0], // Nom d'utilisateur temporaire
                    LinkedInProfile = "https://linkedin.com/in/" + request.Email.Split('@')[0],
                    IsLinkedInAuthenticated = true,
                    Role = UserRole.Consultant, // Rôle par défaut
                    OnboardingCompleted = false // L'utilisateur devra compléter son profil
                };
                
                _users.Add(user);
            }
            else
            {
                // Mettre à jour les informations LinkedIn
                user.IsLinkedInAuthenticated = true;
                user.LastLogin = DateTime.UtcNow;
            }
            
            return GenerateAuthResponse(user, request.RememberMe);
        }

        /// <summary>
        /// Inscrire un nouvel utilisateur
        /// </summary>
        public async Task<AuthResponse> RegisterAsync(RegisterRequest request)
        {
            // Simuler une opération asynchrone
            await Task.Delay(100);
            
            // Vérifier si l'email est déjà utilisé
            if (_users.Exists(u => u.Email.ToLower() == request.Email.ToLower()))
            {
                return new AuthResponse
                {
                    Success = false,
                    Message = "Cet email est déjà utilisé"
                };
            }
            
            // Vérifier si les mots de passe correspondent
            if (request.Password != request.ConfirmPassword)
            {
                return new AuthResponse
                {
                    Success = false,
                    Message = "Les mots de passe ne correspondent pas"
                };
            }
            
            // Créer un nouvel utilisateur
            var user = new User
            {
                Email = request.Email,
                Username = request.Username,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password),
                Role = request.Role,
                LinkedInProfile = request.LinkedInProfile,
                ProfileImageUrl = request.ProfileImageUrl,
                Location = request.Location,
                Title = request.Title,
                OnboardingCompleted = false // L'utilisateur devra compléter son profil
            };
            
            _users.Add(user);
            
            return GenerateAuthResponse(user);
        }

        /// <summary>
        /// Mettre à jour le profil lors de la première connexion
        /// </summary>
        public async Task<User> CompleteOnboardingAsync(string userId, UserOnboardingRequest request)
        {
            // Simuler une opération asynchrone
            await Task.Delay(100);
            
            var user = _users.Find(u => u.Id == userId);
            
            if (user == null)
            {
                throw new Exception("Utilisateur non trouvé");
            }
            
            user.Role = request.UserRole;
            user.Title = request.Title;
            user.OnboardingCompleted = true;
            
            return user;
        }

        /// <summary>
        /// Rafraîchir un token d'authentification
        /// </summary>
        public async Task<AuthResponse> RefreshTokenAsync(string refreshToken)
        {
            // Simuler une opération asynchrone
            await Task.Delay(100);
            
            if (!_refreshTokens.TryGetValue(refreshToken, out var userId))
            {
                return new AuthResponse
                {
                    Success = false,
                    Message = "Token de rafraîchissement invalide"
                };
            }
            
            var user = _users.Find(u => u.Id == userId);
            
            if (user == null)
            {
                return new AuthResponse
                {
                    Success = false,
                    Message = "Utilisateur non trouvé"
                };
            }
            
            // Supprimer l'ancien refresh token
            _refreshTokens.Remove(refreshToken);
            
            // Générer une nouvelle réponse d'authentification
            return GenerateAuthResponse(user);
        }

        /// <summary>
        /// Valider un token JWT
        /// </summary>
        public bool ValidateToken(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["JWT:Secret"] ?? "FastConnectDefaultSecretKey12345678");
            
            try
            {
                tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = true,
                    ValidIssuer = _configuration["JWT:Issuer"] ?? "FastConnectAPI",
                    ValidateAudience = true,
                    ValidAudience = _configuration["JWT:Audience"] ?? "FastConnectUser",
                    ClockSkew = TimeSpan.Zero
                }, out _);
                
                return true;
            }
            catch
            {
                return false;
            }
        }

        /// <summary>
        /// Obtenir un utilisateur par son ID
        /// </summary>
        public async Task<User> GetUserByIdAsync(string userId)
        {
            // Simuler une opération asynchrone
            await Task.Delay(100);
            
            var user = _users.Find(u => u.Id == userId);
            
            if (user == null)
            {
                throw new Exception("Utilisateur non trouvé");
            }
            
            return user;
        }

        /// <summary>
        /// Mettre à jour le profil d'un utilisateur
        /// </summary>
        public async Task<User> UpdateUserProfileAsync(string userId, User userUpdate)
        {
            // Simuler une opération asynchrone
            await Task.Delay(100);
            
            var user = _users.Find(u => u.Id == userId);
            
            if (user == null)
            {
                throw new Exception("Utilisateur non trouvé");
            }
            
            // Mettre à jour les propriétés modifiables
            user.Username = userUpdate.Username;
            user.ProfileImageUrl = userUpdate.ProfileImageUrl;
            user.LinkedInProfile = userUpdate.LinkedInProfile;
            user.Title = userUpdate.Title;
            user.Location = userUpdate.Location;
            user.PhoneNumber = userUpdate.PhoneNumber;
            user.Skills = userUpdate.Skills;
            
            return user;
        }

        /// <summary>
        /// Générer une réponse d'authentification avec token JWT
        /// </summary>
        private AuthResponse GenerateAuthResponse(User user, bool rememberMe = false)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["JWT:Secret"] ?? "FastConnectDefaultSecretKey12345678");
            
            var tokenExpiration = rememberMe ? DateTime.UtcNow.AddDays(7) : DateTime.UtcNow.AddHours(1);
            
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id),
                    new Claim(ClaimTypes.Email, user.Email),
                    new Claim(ClaimTypes.Name, user.Username),
                    new Claim(ClaimTypes.Role, user.Role.ToString())
                }),
                Expires = tokenExpiration,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
                Issuer = _configuration["JWT:Issuer"] ?? "FastConnectAPI",
                Audience = _configuration["JWT:Audience"] ?? "FastConnectUser"
            };
            
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var jwtToken = tokenHandler.WriteToken(token);
            
            // Générer un refresh token unique
            var refreshToken = Guid.NewGuid().ToString();
            _refreshTokens[refreshToken] = user.Id;
            
            return new AuthResponse
            {
                Success = true,
                Message = "Authentification réussie",
                Token = jwtToken,
                RefreshToken = refreshToken,
                Expiration = tokenExpiration,
                User = user
            };
        }
    }
}