using System;
using System.Collections.Generic;
using ConnectExtension.Backend.Models;
using ConnectExtension.Backend.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace ConnectExtension.Backend.Controllers
{
    [ApiController]
    [Route("api/consultant-availabilities")]
    public class ConsultantAvailabilitiesController : ControllerBase
    {
        private readonly IConsultantAvailabilityService _availabilityService;
        private readonly ILogger<ConsultantAvailabilitiesController> _logger;

        public ConsultantAvailabilitiesController(
            IConsultantAvailabilityService availabilityService, 
            ILogger<ConsultantAvailabilitiesController> logger)
        {
            _availabilityService = availabilityService;
            _logger = logger;
        }

        // GET: api/consultant-availabilities
        [HttpGet]
        public ActionResult<IEnumerable<ConsultantAvailability>> GetAllAvailabilities()
        {
            _logger.LogInformation("Récupération de toutes les disponibilités");
            return Ok(_availabilityService.GetAllAvailabilities());
        }
        
        // GET: api/consultant-availabilities/paged?page=1&pageSize=10
        [HttpGet("paged")]
        public ActionResult<IEnumerable<ConsultantAvailability>> GetPagedAvailabilities([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
        {
            if (page < 1 || pageSize < 1)
            {
                _logger.LogWarning("Tentative d'accès avec des paramètres de pagination invalides: page={Page}, pageSize={PageSize}", page, pageSize);
                return BadRequest("Page and pageSize must be greater than 0");
            }
            
            _logger.LogInformation("Récupération des disponibilités paginées: page={Page}, pageSize={PageSize}", page, pageSize);
            return Ok(_availabilityService.GetPagedAvailabilities(page, pageSize));
        }

        // GET: api/consultant-availabilities/{id}
        [HttpGet("{id}")]
        public ActionResult<ConsultantAvailability> GetAvailabilityById(string id)
        {
            _logger.LogInformation("Récupération de la disponibilité avec l'ID: {Id}", id);
            var availability = _availabilityService.GetAvailabilityById(id);
            
            if (availability == null)
            {
                _logger.LogWarning("Disponibilité non trouvée avec l'ID: {Id}", id);
                return NotFound();
            }
            
            return Ok(availability);
        }

        // GET: api/consultant-availabilities/consultant/{consultantId}
        [HttpGet("consultant/{consultantId}")]
        public ActionResult<IEnumerable<ConsultantAvailability>> GetAvailabilitiesByConsultantId(string consultantId)
        {
            _logger.LogInformation("Récupération des disponibilités pour le consultant avec l'ID: {ConsultantId}", consultantId);
            return Ok(_availabilityService.GetAvailabilitiesByConsultantId(consultantId));
        }

        // GET: api/consultant-availabilities/byskills?skills=Agile,Scrum
        [HttpGet("byskills")]
        public ActionResult<IEnumerable<ConsultantAvailability>> GetAvailabilitiesBySkills([FromQuery] string skills)
        {
            if (string.IsNullOrWhiteSpace(skills))
            {
                _logger.LogWarning("Tentative de recherche par compétences sans spécifier de compétences");
                return BadRequest("At least one skill must be provided");
            }
            
            var skillsList = skills.Split(',');
            _logger.LogInformation("Recherche de disponibilités avec les compétences: {Skills}", skills);
            return Ok(_availabilityService.GetAvailabilitiesBySkills(new List<string>(skillsList)));
        }

        // GET: api/consultant-availabilities/bystatus?status=Available
        [HttpGet("bystatus")]
        public ActionResult<IEnumerable<ConsultantAvailability>> GetAvailabilitiesByStatus([FromQuery] string status)
        {
            if (string.IsNullOrWhiteSpace(status) || !TryParseAvailabilityStatus(status, out AvailabilityStatus availabilityStatus))
            {
                _logger.LogWarning("Tentative de recherche par statut de disponibilité avec une valeur invalide: {Status}", status);
                return BadRequest("Invalid availability status");
            }
            
            _logger.LogInformation("Recherche de disponibilités avec statut: {Status}", status);
            return Ok(_availabilityService.GetAvailabilitiesByStatus(availabilityStatus));
        }

        // GET: api/consultant-availabilities/bysectors?sectors=Finance,Healthcare
        [HttpGet("bysectors")]
        public ActionResult<IEnumerable<ConsultantAvailability>> GetAvailabilitiesBySectors([FromQuery] string sectors)
        {
            if (string.IsNullOrWhiteSpace(sectors))
            {
                _logger.LogWarning("Tentative de recherche par secteurs sans spécifier de secteurs");
                return BadRequest("At least one sector must be provided");
            }
            
            var sectorsList = sectors.Split(',');
            _logger.LogInformation("Recherche de disponibilités avec les secteurs: {Sectors}", sectors);
            return Ok(_availabilityService.GetAvailabilitiesBySectors(new List<string>(sectorsList)));
        }

        // GET: api/consultant-availabilities/byexpertises?expertises=Cloud,AI
        [HttpGet("byexpertises")]
        public ActionResult<IEnumerable<ConsultantAvailability>> GetAvailabilitiesByExpertises([FromQuery] string expertises)
        {
            if (string.IsNullOrWhiteSpace(expertises))
            {
                _logger.LogWarning("Tentative de recherche par expertises sans spécifier d'expertises");
                return BadRequest("At least one expertise must be provided");
            }
            
            var expertisesList = expertises.Split(',');
            _logger.LogInformation("Recherche de disponibilités avec les expertises: {Expertises}", expertises);
            return Ok(_availabilityService.GetAvailabilitiesByExpertises(new List<string>(expertisesList)));
        }

        // GET: api/consultant-availabilities/byworkmode?workMode=Remote
        [HttpGet("byworkmode")]
        public ActionResult<IEnumerable<ConsultantAvailability>> GetAvailabilitiesByWorkMode([FromQuery] string workMode)
        {
            if (string.IsNullOrWhiteSpace(workMode) || !TryParseWorkMode(workMode, out WorkMode mode))
            {
                _logger.LogWarning("Tentative de recherche par mode de travail avec une valeur invalide: {WorkMode}", workMode);
                return BadRequest("Invalid work mode");
            }
            
            _logger.LogInformation("Recherche de disponibilités avec mode de travail: {WorkMode}", workMode);
            return Ok(_availabilityService.GetAvailabilitiesByWorkMode(mode));
        }

        // GET: api/consultant-availabilities/bycities?cities=Paris,Lyon
        [HttpGet("bycities")]
        public ActionResult<IEnumerable<ConsultantAvailability>> GetAvailabilitiesByCities([FromQuery] string cities)
        {
            if (string.IsNullOrWhiteSpace(cities))
            {
                _logger.LogWarning("Tentative de recherche par villes sans spécifier de villes");
                return BadRequest("At least one city must be provided");
            }
            
            var citiesList = cities.Split(',');
            _logger.LogInformation("Recherche de disponibilités avec les villes: {Cities}", cities);
            return Ok(_availabilityService.GetAvailabilitiesByCities(new List<string>(citiesList)));
        }

        // POST: api/consultant-availabilities
        [HttpPost]
        public ActionResult<ConsultantAvailability> CreateAvailability([FromBody] ConsultantAvailability availability)
        {
            if (availability == null)
            {
                _logger.LogWarning("Tentative de création d'une disponibilité avec des données null");
                return BadRequest("Availability data is required");
            }
            
            try
            {
                var createdAvailability = _availabilityService.CreateAvailability(availability);
                _logger.LogInformation("Disponibilité créée avec succès: {Id}", createdAvailability.Id);
                return CreatedAtAction(nameof(GetAvailabilityById), new { id = createdAvailability.Id }, createdAvailability);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erreur lors de la création de la disponibilité");
                return StatusCode(500, "An error occurred while creating the availability");
            }
        }

        // PUT: api/consultant-availabilities/{id}
        [HttpPut("{id}")]
        public ActionResult<ConsultantAvailability> UpdateAvailability(string id, [FromBody] ConsultantAvailability availability)
        {
            if (availability == null)
            {
                _logger.LogWarning("Tentative de mise à jour d'une disponibilité avec des données null");
                return BadRequest("Availability data is required");
            }
            
            try
            {
                var updatedAvailability = _availabilityService.UpdateAvailability(id, availability);
                
                if (updatedAvailability == null)
                {
                    _logger.LogWarning("Tentative de mise à jour d'une disponibilité inexistante: {Id}", id);
                    return NotFound();
                }
                
                _logger.LogInformation("Disponibilité mise à jour avec succès: {Id}", updatedAvailability.Id);
                return Ok(updatedAvailability);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erreur lors de la mise à jour de la disponibilité: {Id}", id);
                return StatusCode(500, "An error occurred while updating the availability");
            }
        }

        // DELETE: api/consultant-availabilities/{id}
        [HttpDelete("{id}")]
        public ActionResult DeleteAvailability(string id)
        {
            try
            {
                var result = _availabilityService.DeleteAvailability(id);
                
                if (!result)
                {
                    _logger.LogWarning("Tentative de suppression d'une disponibilité inexistante: {Id}", id);
                    return NotFound();
                }
                
                _logger.LogInformation("Disponibilité supprimée avec succès: {Id}", id);
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erreur lors de la suppression de la disponibilité: {Id}", id);
                return StatusCode(500, "An error occurred while deleting the availability");
            }
        }

        private bool TryParseAvailabilityStatus(string value, out AvailabilityStatus result)
        {
            result = AvailabilityStatus.Available; // Default value

            if (string.Equals(value, "Available", StringComparison.OrdinalIgnoreCase))
            {
                result = AvailabilityStatus.Available;
                return true;
            }
            else if (string.Equals(value, "Soon", StringComparison.OrdinalIgnoreCase))
            {
                result = AvailabilityStatus.Soon;
                return true;
            }
            else if (string.Equals(value, "Unavailable", StringComparison.OrdinalIgnoreCase))
            {
                result = AvailabilityStatus.Unavailable;
                return true;
            }
            
            return false;
        }

        private bool TryParseWorkMode(string value, out WorkMode result)
        {
            result = WorkMode.OnSite; // Default value

            if (string.Equals(value, "OnSite", StringComparison.OrdinalIgnoreCase) ||
                string.Equals(value, "on_site", StringComparison.OrdinalIgnoreCase))
            {
                result = WorkMode.OnSite;
                return true;
            }
            else if (string.Equals(value, "Remote", StringComparison.OrdinalIgnoreCase) ||
                     string.Equals(value, "remote", StringComparison.OrdinalIgnoreCase))
            {
                result = WorkMode.Remote;
                return true;
            }
            else if (string.Equals(value, "Hybrid", StringComparison.OrdinalIgnoreCase) ||
                     string.Equals(value, "hybrid", StringComparison.OrdinalIgnoreCase))
            {
                result = WorkMode.Hybrid;
                return true;
            }
            
            return false;
        }
    }
}