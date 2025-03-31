using System.Collections.Generic;

namespace ConnectExtension.Backend.Models
{
    public enum ExperienceLevel
    {
        LessThan3,
        Between3And10,
        MoreThan10
    }

    public enum AvailabilityStatus
    {
        Available,
        Soon,
        Unavailable
    }

    public class Consultant
    {
        public string Id { get; set; }
        public string Role { get; set; }
        public string LinkedinUrl { get; set; }
        public string? Phone { get; set; }
        public string? Email { get; set; }
        public bool Locked { get; set; }
        public string Type { get; set; }
        public List<string> Skills { get; set; } = new List<string>();
        public string Location { get; set; }
        public ExperienceLevel Experience { get; set; }
        public bool PhoneValidated { get; set; }
        public bool EmailValidated { get; set; }
        public bool LinkedinValidated { get; set; }
        public AvailabilityStatus Availability { get; set; }
        public string Message { get; set; }
    }
}
