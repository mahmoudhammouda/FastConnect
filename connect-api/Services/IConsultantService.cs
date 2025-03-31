using System.Collections.Generic;
using ConnectExtension.Backend.Models;

namespace ConnectExtension.Backend.Services
{
    public interface IConsultantService
    {
        IEnumerable<Consultant> GetAllConsultants();
        IEnumerable<Consultant> GetPagedConsultants(int page, int pageSize);
        Consultant GetConsultantById(string id);
        IEnumerable<Consultant> GetConsultantsBySkills(List<string> skills);
        IEnumerable<Consultant> GetConsultantsByAvailability(AvailabilityStatus availability);
        IEnumerable<Consultant> GetConsultantsByExperience(ExperienceLevel experience);
    }
}
