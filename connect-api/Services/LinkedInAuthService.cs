using ConnectExtension.Backend.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace ConnectExtension.Backend.Services
{
    /// <summary>
    /// Service d'authentification LinkedIn qui gère le flux OAuth2
    /// </summary>
    public class LinkedInAuthService : ILinkedInAuthService
    {
        private readonly IConfiguration _configuration;
        private readonly HttpClient _httpClient;
        private readonly string _clientId;
        private readonly string _clientSecret;
        private readonly string _redirectUri;

        public LinkedInAuthService(IConfiguration configuration, HttpClient httpClient)
        {
            _configuration = configuration;
            _httpClient = httpClient;
            
            // Récupération des paramètres d'authentification LinkedIn depuis la configuration
            _clientId = _configuration["LinkedIn:ClientId"];
            _clientSecret = _configuration["LinkedIn:ClientSecret"];
            _redirectUri = _configuration["LinkedIn:RedirectUri"];
            
            if (string.IsNullOrEmpty(_clientId) || string.IsNullOrEmpty(_clientSecret) || string.IsNullOrEmpty(_redirectUri))
            {
                throw new ArgumentException("LinkedIn OAuth settings are missing in configuration");
            }
        }

        /// <summary>
        /// Génère l'URL d'autorisation LinkedIn
        /// </summary>
        /// <returns>URL de redirection vers LinkedIn</returns>
        public LinkedInAuthUrlResponse GetAuthorizationUrl()
        {
            // Définition des scopes requis par l'application
            // r_liteprofile : nom, prénom, photo
            // r_emailaddress : email
            // w_member_social : pour publier au nom de l'utilisateur (optionnel)
            var scopes = new[] { "r_liteprofile", "r_emailaddress" };
            
            // Génération d'un état unique pour la sécurité CSRF
            var state = Guid.NewGuid().ToString();
            
            // Construction de l'URL d'autorisation
            var authUrl = new StringBuilder("https://www.linkedin.com/oauth/v2/authorization");
            authUrl.Append($"?response_type=code");
            authUrl.Append($"&client_id={Uri.EscapeDataString(_clientId)}");
            authUrl.Append($"&redirect_uri={Uri.EscapeDataString(_redirectUri)}");
            authUrl.Append($"&state={Uri.EscapeDataString(state)}");
            authUrl.Append($"&scope={Uri.EscapeDataString(string.Join(" ", scopes))}");
            
            return new LinkedInAuthUrlResponse
            {
                Url = authUrl.ToString(),
                State = state
            };
        }

        /// <summary>
        /// Échange le code d'autorisation contre un token d'accès
        /// </summary>
        /// <param name="code">Code d'autorisation fourni par LinkedIn</param>
        /// <returns>Token d'accès et informations associées</returns>
        public async Task<LinkedInTokenResponse> ExchangeCodeForTokenAsync(string code)
        {
            // Préparation de la requête pour échanger le code contre un token
            var tokenRequestContent = new FormUrlEncodedContent(new Dictionary<string, string>
            {
                ["grant_type"] = "authorization_code",
                ["code"] = code,
                ["redirect_uri"] = _redirectUri,
                ["client_id"] = _clientId,
                ["client_secret"] = _clientSecret
            });

            // Envoi de la requête à LinkedIn
            var response = await _httpClient.PostAsync(
                "https://www.linkedin.com/oauth/v2/accessToken", 
                tokenRequestContent);

            if (!response.IsSuccessStatusCode)
            {
                var errorContent = await response.Content.ReadAsStringAsync();
                throw new Exception($"LinkedIn token exchange failed: {response.StatusCode}, {errorContent}");
            }

            // Lecture et désérialisation de la réponse
            var tokenResponseJson = await response.Content.ReadAsStringAsync();
            var tokenResponse = JsonSerializer.Deserialize<LinkedInTokenResponse>(
                tokenResponseJson, 
                new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

            if (tokenResponse == null)
            {
                throw new Exception("LinkedIn token response is null");
            }

            return tokenResponse;
        }

        /// <summary>
        /// Récupère les informations de profil LinkedIn de l'utilisateur
        /// </summary>
        /// <param name="accessToken">Token d'accès LinkedIn</param>
        /// <returns>Profil utilisateur LinkedIn</returns>
        public async Task<LinkedInUserProfile> GetUserProfileAsync(string accessToken)
        {
            try 
            {
                // Récupération du profil de base (nom, prénom)
                var profileResponse = await GetLinkedInApiResponseAsync(
                    "https://api.linkedin.com/v2/me?projection=(id,firstName,lastName,profilePicture(displayImage~:playableStreams))",
                    accessToken);

                // Récupération de l'email
                var emailResponse = await GetLinkedInApiResponseAsync(
                    "https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))",
                    accessToken);

                // Traitement des réponses pour extraire les informations nécessaires
                var profile = JsonDocument.Parse(profileResponse).RootElement;
                var email = JsonDocument.Parse(emailResponse).RootElement;

                // Extraction du nom et prénom avec gestion multilingue
                var firstName = ExtractLocalizedString(profile, "firstName");
                var lastName = ExtractLocalizedString(profile, "lastName");
                var emailAddress = ExtractEmail(email);
                var profileId = profile.GetProperty("id").GetString() ?? "";

                // Construction de l'URL du profil LinkedIn
                var profileUrl = $"https://www.linkedin.com/in/{profileId}";

                // Extraction de l'URL de la photo de profil si disponible
                string? pictureUrl = null;
                if (profile.TryGetProperty("profilePicture", out var profilePicture) &&
                    profilePicture.TryGetProperty("displayImage~", out var displayImage) &&
                    displayImage.TryGetProperty("elements", out var elements) &&
                    elements.GetArrayLength() > 0)
                {
                    var element = elements[0];
                    if (element.TryGetProperty("identifiers", out var identifiers) &&
                        identifiers.GetArrayLength() > 0)
                    {
                        pictureUrl = identifiers[0].GetProperty("identifier").GetString();
                    }
                }

                // Note: Nous n'utilisons plus l'API positions qui nécessitait des permissions supplémentaires
                // et causait des erreurs 404

                return new LinkedInUserProfile
                {
                    Id = profileId,
                    FirstName = firstName,
                    LastName = lastName,
                    Email = emailAddress,
                    ProfileUrl = profileUrl,
                    PictureUrl = pictureUrl,
                    Title = "" // Titre laissé vide car nous n'avons plus accès à l'API positions
                };
            }
            catch (Exception ex)
            {
                throw new Exception($"Error retrieving LinkedIn profile: {ex.Message}", ex);
            }


        }

        /// <summary>
        /// Effectue une requête à l'API LinkedIn
        /// </summary>
        private async Task<string> GetLinkedInApiResponseAsync(string url, string accessToken)
        {
            var request = new HttpRequestMessage(HttpMethod.Get, url);
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
            request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            var response = await _httpClient.SendAsync(request);
            
            if (!response.IsSuccessStatusCode)
            {
                var errorContent = await response.Content.ReadAsStringAsync();
                throw new Exception($"LinkedIn API request failed: {response.StatusCode}, {errorContent}");
            }

            return await response.Content.ReadAsStringAsync();
        }

        /// <summary>
        /// Extrait une chaîne localisée du format LinkedIn (gestion multilingue)
        /// </summary>
        private string ExtractLocalizedString(JsonElement element, string propertyName)
        {
            if (!element.TryGetProperty(propertyName, out var property))
            {
                return string.Empty;
            }

            // Essayer d'abord la locale préférée (fr_FR)
            if (property.TryGetProperty("localized", out var localized) &&
                localized.TryGetProperty("fr_FR", out var frValue))
            {
                return frValue.GetString() ?? string.Empty;
            }

            // Sinon, essayer la locale par défaut (en_US)
            if (property.TryGetProperty("localized", out var localized2) &&
                localized2.TryGetProperty("en_US", out var enValue))
            {
                return enValue.GetString() ?? string.Empty;
            }

            // Dernier recours : prendre la première locale disponible
            if (property.TryGetProperty("localized", out var localized3))
            {
                foreach (var locale in localized3.EnumerateObject())
                {
                    return locale.Value.GetString() ?? string.Empty;
                }
            }

            return string.Empty;
        }

        /// <summary>
        /// Extrait l'adresse email du format LinkedIn
        /// </summary>
        private string ExtractEmail(JsonElement element)
        {
            if (element.TryGetProperty("elements", out var elements) &&
                elements.GetArrayLength() > 0 &&
                elements[0].TryGetProperty("handle~", out var handle) &&
                handle.TryGetProperty("emailAddress", out var emailElement))
            {
                return emailElement.GetString() ?? string.Empty;
            }

            return string.Empty;
        }
    }
}
