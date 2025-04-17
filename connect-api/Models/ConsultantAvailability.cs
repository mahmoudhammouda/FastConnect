using System;
using System.Collections.Generic;

namespace ConnectExtension.Backend.Models
{
    public enum WorkMode
    {
        OnSite,
        Remote,
        Hybrid
    }

    public class ConsultantAvailability
    {
        public string Id { get; set; }
        public string ConsultantId { get; set; }
        public string ConsultantName { get; set; }
        public string ConsultantRole { get; set; }
        public DateTime StartDate { get; set; }
        public int DurationInMonths { get; set; }
        public AvailabilityStatus Status { get; set; }
        public List<string> Cities { get; set; } = new List<string>();
        public WorkMode WorkMode { get; set; }
        public decimal? Rate { get; set; }
        public List<string> Skills { get; set; } = new List<string>();
        public string Description { get; set; }
        public List<string> Sectors { get; set; } = new List<string>();
        public List<string> Expertises { get; set; } = new List<string>();
    }
}