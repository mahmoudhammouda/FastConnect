using System.Collections.Generic;
using ConnectExtension.Backend.Models;
using ConnectExtension.Backend.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace ConnectExtension.Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ConsultantsController : ControllerBase
    {
        private readonly IConsultantService _consultantService;
        private readonly ILogger<ConsultantsController> _logger;

        public ConsultantsController(IConsultantService consultantService, ILogger<ConsultantsController> logger)
        {
            _consultantService = consultantService;
            _logger = logger;
        }

        // GET: api/consultants
        [HttpGet]
        public ActionResult<IEnumerable<Consultant>> GetAllConsultants()
        {
            _logger.LogInformation("Récupération de tous les consultants");
            return Ok(_consultantService.GetAllConsultants());
        }
        
        // GET: api/consultants/paged?page=1&pageSize=10
        [HttpGet("paged")]
        public ActionResult<IEnumerable<Consultant>> GetPagedConsultants([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
        {
            if (page < 1 || pageSize < 1)
            {
                _logger.LogWarning("Tentative d'accès avec des paramètres de pagination invalides: page={Page}, pageSize={PageSize}", page, pageSize);
                return BadRequest("Page and pageSize must be greater than 0");
            }
            
            _logger.LogInformation("Récupération des consultants paginés: page={Page}, pageSize={PageSize}", page, pageSize);
            return Ok(_consultantService.GetPagedConsultants(page, pageSize));
        }

        // GET: api/consultants/{id}
        [HttpGet("{id}")]
        public ActionResult<Consultant> GetConsultantById(string id)
        {
            _logger.LogInformation("Récupération du consultant avec l'ID: {Id}", id);
            var consultant = _consultantService.GetConsultantById(id);
            
            if (consultant == null)
            {
                _logger.LogWarning("Consultant non trouvé avec l'ID: {Id}", id);
                return NotFound();
            }
            
            return Ok(consultant);
        }

        // GET: api/consultants/byskills?skills=Agile,Scrum
        [HttpGet("byskills")]
        public ActionResult<IEnumerable<Consultant>> GetConsultantsBySkills([FromQuery] string skills)
        {
            if (string.IsNullOrWhiteSpace(skills))
            {
                _logger.LogWarning("Tentative de recherche par compétences sans spécifier de compétences");
                return BadRequest("At least one skill must be provided");
            }
            
            var skillsList = skills.Split(',');
            _logger.LogInformation("Recherche de consultants avec les compétences: {Skills}", skills);
            return Ok(_consultantService.GetConsultantsBySkills(new List<string>(skillsList)));
        }

        // GET: api/consultants/byavailability?availability=Available
        [HttpGet("byavailability")]
        public ActionResult<IEnumerable<Consultant>> GetConsultantsByAvailability([FromQuery] string availability)
        {
            if (string.IsNullOrWhiteSpace(availability) || !TryParseAvailability(availability, out AvailabilityStatus status))
            {
                _logger.LogWarning("Tentative de recherche par disponibilité avec une valeur invalide: {Availability}", availability);
                return BadRequest("Invalid availability status");
            }
            
            _logger.LogInformation("Recherche de consultants avec disponibilité: {Availability}", availability);
            return Ok(_consultantService.GetConsultantsByAvailability(status));
        }

        // GET: api/consultants/byexperience?experience=MoreThan10
        [HttpGet("byexperience")]
        public ActionResult<IEnumerable<Consultant>> GetConsultantsByExperience([FromQuery] string experience)
        {
            if (string.IsNullOrWhiteSpace(experience) || !TryParseExperience(experience, out ExperienceLevel level))
            {
                _logger.LogWarning("Tentative de recherche par expérience avec une valeur invalide: {Experience}", experience);
                return BadRequest("Invalid experience level");
            }
            
            _logger.LogInformation("Recherche de consultants avec niveau d'expérience: {Experience}", experience);
            return Ok(_consultantService.GetConsultantsByExperience(level));
        }

        private bool TryParseAvailability(string value, out AvailabilityStatus result)
        {
            result = AvailabilityStatus.Available; // Default value

            if (string.Equals(value, "Available", System.StringComparison.OrdinalIgnoreCase))
            {
                result = AvailabilityStatus.Available;
                return true;
            }
            else if (string.Equals(value, "Soon", System.StringComparison.OrdinalIgnoreCase))
            {
                result = AvailabilityStatus.Soon;
                return true;
            }
            else if (string.Equals(value, "Unavailable", System.StringComparison.OrdinalIgnoreCase))
            {
                result = AvailabilityStatus.Unavailable;
                return true;
            }
            
            return false;
        }

        private bool TryParseExperience(string value, out ExperienceLevel result)
        {
            result = ExperienceLevel.LessThan3; // Default value

            if (string.Equals(value, "LessThan3", System.StringComparison.OrdinalIgnoreCase) ||
                string.Equals(value, "less_than_3", System.StringComparison.OrdinalIgnoreCase))
            {
                result = ExperienceLevel.LessThan3;
                return true;
            }
            else if (string.Equals(value, "Between3And10", System.StringComparison.OrdinalIgnoreCase) ||
                     string.Equals(value, "between_3_and_10", System.StringComparison.OrdinalIgnoreCase))
            {
                result = ExperienceLevel.Between3And10;
                return true;
            }
            else if (string.Equals(value, "MoreThan10", System.StringComparison.OrdinalIgnoreCase) ||
                     string.Equals(value, "more_than_10", System.StringComparison.OrdinalIgnoreCase))
            {
                result = ExperienceLevel.MoreThan10;
                return true;
            }
            
            return false;
        }
    }
}
