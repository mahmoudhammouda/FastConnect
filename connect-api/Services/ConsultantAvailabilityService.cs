using System;
using System.Collections.Generic;
using System.Linq;
using ConnectExtension.Backend.Models;

namespace ConnectExtension.Backend.Services
{
    public class ConsultantAvailabilityService : IConsultantAvailabilityService
    {
        private readonly List<ConsultantAvailability> _availabilities;
        private readonly IConsultantService _consultantService;

        public ConsultantAvailabilityService(IConsultantService consultantService)
        {
            _consultantService = consultantService;
            _availabilities = InitializeAvailabilities();
        }

        public IEnumerable<ConsultantAvailability> GetAllAvailabilities()
        {
            return _availabilities;
        }

        public IEnumerable<ConsultantAvailability> GetPagedAvailabilities(int page, int pageSize)
        {
            return _availabilities
                .Skip((page - 1) * pageSize)
                .Take(pageSize);
        }

        public ConsultantAvailability GetAvailabilityById(string id)
        {
            return _availabilities.FirstOrDefault(a => a.Id == id);
        }

        public IEnumerable<ConsultantAvailability> GetAvailabilitiesByConsultantId(string consultantId)
        {
            return _availabilities.Where(a => a.ConsultantId == consultantId);
        }

        public IEnumerable<ConsultantAvailability> GetAvailabilitiesBySkills(List<string> skills)
        {
            if (skills == null || !skills.Any())
                return _availabilities;

            return _availabilities.Where(a => 
                a.Skills.Any(s => skills.Contains(s, StringComparer.OrdinalIgnoreCase)));
        }

        public IEnumerable<ConsultantAvailability> GetAvailabilitiesByStatus(AvailabilityStatus status)
        {
            return _availabilities.Where(a => a.Status == status);
        }

        public IEnumerable<ConsultantAvailability> GetAvailabilitiesBySectors(List<string> sectors)
        {
            if (sectors == null || !sectors.Any())
                return _availabilities;

            return _availabilities.Where(a => 
                a.Sectors.Any(s => sectors.Contains(s, StringComparer.OrdinalIgnoreCase)));
        }

        public IEnumerable<ConsultantAvailability> GetAvailabilitiesByExpertises(List<string> expertises)
        {
            if (expertises == null || !expertises.Any())
                return _availabilities;

            return _availabilities.Where(a => 
                a.Expertises.Any(e => expertises.Contains(e, StringComparer.OrdinalIgnoreCase)));
        }

        public IEnumerable<ConsultantAvailability> GetAvailabilitiesByWorkMode(WorkMode workMode)
        {
            return _availabilities.Where(a => a.WorkMode == workMode);
        }

        public IEnumerable<ConsultantAvailability> GetAvailabilitiesByCities(List<string> cities)
        {
            if (cities == null || !cities.Any())
                return _availabilities;

            return _availabilities.Where(a => 
                a.Cities.Any(c => cities.Contains(c, StringComparer.OrdinalIgnoreCase)));
        }

        public ConsultantAvailability CreateAvailability(ConsultantAvailability availability)
        {
            if (availability == null)
                throw new ArgumentNullException(nameof(availability));

            // Generate a new ID if not provided
            if (string.IsNullOrEmpty(availability.Id))
            {
                availability.Id = Guid.NewGuid().ToString();
            }

            _availabilities.Add(availability);
            return availability;
        }

        public ConsultantAvailability UpdateAvailability(string id, ConsultantAvailability availability)
        {
            if (availability == null)
                throw new ArgumentNullException(nameof(availability));

            var existingAvailability = _availabilities.FirstOrDefault(a => a.Id == id);
            if (existingAvailability == null)
                return null;

            // Remove the existing availability and add the updated one
            _availabilities.Remove(existingAvailability);
            
            // Ensure the ID remains the same
            availability.Id = id;
            _availabilities.Add(availability);
            
            return availability;
        }

        public bool DeleteAvailability(string id)
        {
            var availability = _availabilities.FirstOrDefault(a => a.Id == id);
            if (availability == null)
                return false;

            return _availabilities.Remove(availability);
        }

        private List<ConsultantAvailability> InitializeAvailabilities()
        {
            var availabilities = new List<ConsultantAvailability>();
            var random = new Random(42); // Fixed seed for reproducible results
            var consultants = _consultantService.GetAllConsultants().ToList();
            var cities = new string[] { 
                "Paris", "Lyon", "Marseille", "Toulouse", "Bordeaux", "Lille", "Nantes", 
                "Strasbourg", "Nice", "Rennes", "Montpellier", "Toulon", "Grenoble" 
            };
            var workModes = Enum.GetValues(typeof(WorkMode)).Cast<WorkMode>().ToArray();

            // Génération aléatoire de disponibilités
            foreach (var consultant in consultants)
            {
                // Chaque consultant a entre 0 et 2 disponibilités
                var numAvailabilities = random.Next(0, 3);
                
                for (int i = 0; i < numAvailabilities; i++)
                {
                    // Détermination de la date de début (entre aujourd'hui et 60 jours dans le futur)
                    var startDate = DateTime.Now.AddDays(random.Next(0, 61));
                    
                    // Durée en mois (1-12)
                    var durationInMonths = random.Next(1, 13);
                    
                    // Choix du mode de travail
                    var workMode = workModes[random.Next(workModes.Length)];
                    
                    // Tarif journalier (entre 400 et 1200€)
                    var rate = random.Next(400, 1201);
                    
                    // Sélection de 1 à 3 villes
                    var numCities = random.Next(1, 4);
                    var selectedCities = new List<string>();
                    for (int j = 0; j < numCities; j++)
                    {
                        var city = cities[random.Next(cities.Length)];
                        if (!selectedCities.Contains(city))
                            selectedCities.Add(city);
                    }
                    
                    // Création de la disponibilité
                    var availability = new ConsultantAvailability
                    {
                        Id = Guid.NewGuid().ToString(),
                        ConsultantId = consultant.Id,
                        ConsultantName = consultant.Role, // Utilisation du rôle comme nom temporaire
                        ConsultantRole = consultant.Role,
                        StartDate = startDate,
                        DurationInMonths = durationInMonths,
                        Status = AvailabilityStatus.Available, // Toutes les nouvelles disponibilités sont marquées comme disponibles
                        Cities = selectedCities,
                        WorkMode = workMode,
                        Rate = rate,
                        Skills = consultant.Skills, // Utilisation des mêmes compétences que le consultant
                        Description = $"Disponible à partir du {startDate.ToString("dd/MM/yyyy")} pour une mission de {durationInMonths} mois.",
                        Sectors = consultant.Sectors,
                        Expertises = consultant.Expertises
                    };
                    
                    availabilities.Add(availability);
                }
            }
            
            return availabilities;
        }
    }
}