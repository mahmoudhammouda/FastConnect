using System.Collections.Generic;
using ConnectExtension.Backend.Models;

namespace ConnectExtension.Backend.Services
{
    public interface IConsultantAvailabilityService
    {
        IEnumerable<ConsultantAvailability> GetAllAvailabilities();
        IEnumerable<ConsultantAvailability> GetPagedAvailabilities(int page, int pageSize);
        ConsultantAvailability GetAvailabilityById(string id);
        IEnumerable<ConsultantAvailability> GetAvailabilitiesByConsultantId(string consultantId);
        IEnumerable<ConsultantAvailability> GetAvailabilitiesBySkills(List<string> skills);
        IEnumerable<ConsultantAvailability> GetAvailabilitiesByStatus(AvailabilityStatus status);
        IEnumerable<ConsultantAvailability> GetAvailabilitiesBySectors(List<string> sectors);
        IEnumerable<ConsultantAvailability> GetAvailabilitiesByExpertises(List<string> expertises);
        IEnumerable<ConsultantAvailability> GetAvailabilitiesByWorkMode(WorkMode workMode);
        IEnumerable<ConsultantAvailability> GetAvailabilitiesByCities(List<string> cities);
        ConsultantAvailability CreateAvailability(ConsultantAvailability availability);
        ConsultantAvailability UpdateAvailability(string id, ConsultantAvailability availability);
        bool DeleteAvailability(string id);
    }
}