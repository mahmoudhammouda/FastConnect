using System;
using System.Collections.Generic;
using System.Linq;
using ConnectExtension.Backend.Models;

namespace ConnectExtension.Backend.Services
{
    public class ConsultantService : IConsultantService
    {
        private readonly List<Consultant> _consultants;

        public ConsultantService()
        {
            // Initialize in-memory data store with sample consultants
            _consultants = InitializeConsultants();
        }

        public IEnumerable<Consultant> GetAllConsultants()
        {
            return _consultants;
        }
        
        public IEnumerable<Consultant> GetPagedConsultants(int page, int pageSize)
        {
            return _consultants
                .Skip((page - 1) * pageSize)
                .Take(pageSize);
        }

        public Consultant GetConsultantById(string id)
        {
            return _consultants.FirstOrDefault(c => c.Id == id);
        }

        public IEnumerable<Consultant> GetConsultantsBySkills(List<string> skills)
        {
            if (skills == null || !skills.Any())
                return _consultants;

            return _consultants.Where(c => 
                c.Skills.Any(s => skills.Contains(s, StringComparer.OrdinalIgnoreCase)));
        }

        public IEnumerable<Consultant> GetConsultantsByAvailability(AvailabilityStatus availability)
        {
            return _consultants.Where(c => c.Availability == availability);
        }

        public IEnumerable<Consultant> GetConsultantsByExperience(ExperienceLevel experience)
        {
            return _consultants.Where(c => c.Experience == experience);
        }

        private List<Consultant> InitializeConsultants()
        {
            var consultants = new List<Consultant>();
            
            // Add our existing sample consultants
            consultants.AddRange(new List<Consultant>
            {
                new Consultant
                {
                    Id = "1001",
                    Role = "Chef de Projet IT",
                    LinkedinUrl = "https://www.linkedin.com/in/sample-consultant-1",
                    Phone = "+33 6 12 34 56 78",
                    Email = "consultant1@example.com",
                    Locked = false,
                    Type = "IT",
                    Skills = new List<string> { "Agile", "Scrum", "JIRA" },
                    Location = "Paris",
                    Experience = ExperienceLevel.Between3And10,
                    PhoneValidated = true,
                    EmailValidated = true,
                    LinkedinValidated = true,
                    Availability = AvailabilityStatus.Available,
                    Message = "Chef de projet IT avec 5 ans d'expérience en gestion de projets agiles. Disponible immédiatement pour missions à Paris. #agile #scrum #gestiondeprojet"
                },
                new Consultant
                {
                    Id = "1002",
                    Role = "Développeur Full Stack",
                    LinkedinUrl = "https://www.linkedin.com/in/sample-consultant-2",
                    Phone = "+33 6 23 45 67 89",
                    Email = "consultant2@example.com",
                    Locked = false,
                    Type = "Développement",
                    Skills = new List<string> { "React", "Node.js", "MongoDB", "Docker" },
                    Location = "Lyon",
                    Experience = ExperienceLevel.MoreThan10,
                    PhoneValidated = true,
                    EmailValidated = true,
                    LinkedinValidated = true,
                    Availability = AvailabilityStatus.Soon,
                    Message = "Développeur Full Stack avec expertise en architecture cloud et DevOps. Disponible à partir de juin pour missions en télétravail ou à Lyon. #react #nodejs #docker #aws #cloud"
                },
                new Consultant
                {
                    Id = "1003",
                    Role = "Ingénieur DevOps",
                    LinkedinUrl = "https://www.linkedin.com/in/sample-consultant-3",
                    Phone = null,
                    Email = "consultant3@example.com",
                    Locked = true,
                    Type = "Opérations",
                    Skills = new List<string> { "Kubernetes", "AWS", "Terraform", "CI/CD" },
                    Location = "Lille",
                    Experience = ExperienceLevel.Between3And10,
                    PhoneValidated = false,
                    EmailValidated = true,
                    LinkedinValidated = true,
                    Availability = AvailabilityStatus.Unavailable,
                    Message = "Ingénieur DevOps spécialisé en Kubernetes et infrastructures cloud. Actuellement en mission jusqu'à septembre. #kubernetes #aws #devops #cloud"
                },
                new Consultant
                {
                    Id = "1004",
                    Role = "Développeur .NET",
                    LinkedinUrl = "https://www.linkedin.com/in/sample-consultant-4",
                    Phone = "+33 6 34 56 78 90",
                    Email = "consultant4@example.com",
                    Locked = false,
                    Type = "Développement",
                    Skills = new List<string> { ".NET", "C#", "Azure", "TDD" },
                    Location = "Bordeaux",
                    Experience = ExperienceLevel.LessThan3,
                    PhoneValidated = true,
                    EmailValidated = true,
                    LinkedinValidated = true,
                    Availability = AvailabilityStatus.Available,
                    Message = "Développeur .NET junior passionné par les bonnes pratiques (TDD, Clean Code). Disponible immédiatement pour missions sur Bordeaux ou télétravail. #dotnet #csharp #tdd #azure"
                },
                new Consultant
                {
                    Id = "1005",
                    Role = "Data Scientist",
                    LinkedinUrl = "https://www.linkedin.com/in/sample-consultant-5",
                    Phone = "+33 6 45 67 89 01",
                    Email = "consultant5@example.com",
                    Locked = false,
                    Type = "Data",
                    Skills = new List<string> { "Python", "Machine Learning", "TensorFlow", "SQL" },
                    Location = "Toulouse",
                    Experience = ExperienceLevel.MoreThan10,
                    PhoneValidated = true,
                    EmailValidated = true,
                    LinkedinValidated = true,
                    Availability = AvailabilityStatus.Available,
                    Message = "Data Scientist expérimenté avec focus sur NLP et Computer Vision. Cherche missions ambitieuses sur Toulouse. #machinelearning #python #deeplearning #nlp"
                },
                new Consultant
                {
                    Id = "1006",
                    Role = "UX/UI Designer",
                    LinkedinUrl = "https://www.linkedin.com/in/sample-consultant-6",
                    Phone = "+33 6 56 78 90 12",
                    Email = null,
                    Locked = false,
                    Type = "Design",
                    Skills = new List<string> { "Figma", "Adobe XD", "Sketch", "Prototyping" },
                    Location = "Paris",
                    Experience = ExperienceLevel.Between3And10,
                    PhoneValidated = true,
                    EmailValidated = false,
                    LinkedinValidated = true,
                    Availability = AvailabilityStatus.Soon,
                    Message = "Designer UX/UI passionné par l'accessibilité et l'expérience utilisateur. Disponible en mai pour nouveaux projets. #ux #ui #figma #design #prototype"
                }
            });
            
            // Generate additional consultants to reach 50 total
            var roles = new string[] { 
                "Développeur Frontend", "Développeur Backend", "DevOps Engineer", "Product Owner", 
                "Scrum Master", "UI Designer", "UX Researcher", "Data Engineer", "QA Engineer", 
                "Mobile Developer", "Architect Logiciel", "Consultant ERP", "Administrateur Système",
                "Architecte Cloud", "Data Analyst", "Expert Sécurité", "Network Engineer"
            };
            
            var skills = new Dictionary<string, string[]> {
                { "Développeur Frontend", new string[] { "JavaScript", "React", "Vue.js", "Angular", "CSS", "Responsive Design", "Tailwind", "TypeScript", "Webpack" } },
                { "Développeur Backend", new string[] { "Java", "C#", "Python", "Node.js", "PHP", "Ruby", "Go", "SQL", "NoSQL", "Microservices", "REST API" } },
                { "DevOps Engineer", new string[] { "Docker", "Kubernetes", "CI/CD", "Jenkins", "Terraform", "AWS", "Azure", "GCP", "Monitoring", "Ansible" } },
                { "Product Owner", new string[] { "Agile", "Scrum", "User Stories", "Backlog Management", "JIRA", "Confluence", "Stakeholder Management" } },
                { "Scrum Master", new string[] { "Agile", "Scrum", "Kanban", "Facilitation", "JIRA", "Conflict Resolution", "Coaching" } },
                { "UI Designer", new string[] { "Figma", "Adobe XD", "Sketch", "Design Systems", "Typography", "Color Theory", "Prototyping" } },
                { "UX Researcher", new string[] { "User Testing", "Interviews", "Surveys", "Personas", "Journey Mapping", "Analytics", "Wireframing" } },
                { "Data Engineer", new string[] { "Python", "SQL", "ETL", "Spark", "Hadoop", "Data Warehousing", "Kafka", "Airflow" } },
                { "QA Engineer", new string[] { "Test Automation", "Selenium", "Cypress", "Manual Testing", "Test Plans", "JIRA", "QA Processes" } },
                { "Mobile Developer", new string[] { "iOS", "Android", "Swift", "Kotlin", "React Native", "Flutter", "Mobile UI/UX", "Firebase" } },
                { "Architect Logiciel", new string[] { "System Design", "Microservices", "Design Patterns", "SOA", "Distributed Systems", "Cloud Architecture" } },
                { "Consultant ERP", new string[] { "SAP", "Oracle", "Microsoft Dynamics", "Business Process", "Requirements Analysis" } },
                { "Administrateur Système", new string[] { "Linux", "Windows Server", "Bash Scripting", "PowerShell", "Monitoring", "Security", "Backup" } },
                { "Architecte Cloud", new string[] { "AWS", "Azure", "GCP", "Cloud Security", "IaC", "Serverless", "Containers", "Cost Optimization" } },
                { "Data Analyst", new string[] { "SQL", "Python", "R", "PowerBI", "Tableau", "Excel", "Data Visualization", "Statistics" } },
                { "Expert Sécurité", new string[] { "Pentesting", "SIEM", "Threat Analysis", "ISO 27001", "OWASP", "Security Audits", "Network Security" } },
                { "Network Engineer", new string[] { "Routing", "Switching", "Firewalls", "VPN", "SD-WAN", "Network Monitoring", "TCP/IP", "Cisco" } }
            };
            
            var locations = new string[] { "Paris", "Lyon", "Marseille", "Bordeaux", "Lille", "Toulouse", "Nantes", "Strasbourg", "Nice", "Rennes" };
            var types = new string[] { "Développement", "IT", "Opérations", "Produit", "Design", "Data", "Qualité", "Sécurité", "Infrastructure" };
            var experiences = new ExperienceLevel[] { ExperienceLevel.LessThan3, ExperienceLevel.Between3And10, ExperienceLevel.MoreThan10 };
            var availabilities = new AvailabilityStatus[] { AvailabilityStatus.Available, AvailabilityStatus.Soon, AvailabilityStatus.Unavailable };
            
            var random = new Random(42); // Fixed seed for reproducible results
            
            for (int i = 0; i < 44; i++) // Generate 44 more consultants to reach 50 total
            {
                var role = roles[random.Next(roles.Length)];
                var location = locations[random.Next(locations.Length)];
                var type = types[random.Next(types.Length)];
                var experience = experiences[random.Next(experiences.Length)];
                var availability = availabilities[random.Next(availabilities.Length)];
                var locked = random.Next(10) < 1; // 10% chance of being locked
                
                // Select 2-5 random skills from the corresponding role
                var roleSkills = skills[role];
                var selectedSkills = new List<string>();
                var skillCount = random.Next(2, Math.Min(6, roleSkills.Length));
                
                var shuffledIndices = Enumerable.Range(0, roleSkills.Length).OrderBy(x => random.Next()).Take(skillCount).ToList();
                foreach (var index in shuffledIndices)
                {
                    selectedSkills.Add(roleSkills[index]);
                }
                
                // Generate a message with hashtags
                var message = GenerateConsultantMessage(role, location, availability, selectedSkills, random);
                
                var hasPhone = random.Next(10) < 8; // 80% chance of having a phone
                var hasEmail = random.Next(10) < 9; // 90% chance of having an email
                
                consultants.Add(new Consultant
                {
                    Id = (1007 + i).ToString(),
                    Role = role,
                    LinkedinUrl = $"https://www.linkedin.com/in/sample-consultant-{1007 + i}",
                    Phone = hasPhone ? $"+33 {random.Next(6, 8)} {random.Next(10, 100)} {random.Next(10, 100)} {random.Next(10, 100)}" : null,
                    Email = hasEmail ? $"consultant{1007 + i}@example.com" : null,
                    Locked = locked,
                    Type = type,
                    Skills = selectedSkills,
                    Location = location,
                    Experience = experience,
                    PhoneValidated = hasPhone && random.Next(10) < 9, // 90% of phones are validated if present
                    EmailValidated = hasEmail && random.Next(10) < 9, // 90% of emails are validated if present
                    LinkedinValidated = random.Next(10) < 9, // 90% of LinkedIn profiles are validated
                    Availability = availability,
                    Message = message
                });
            }
            
            return consultants;
        }
        
        private string GenerateConsultantMessage(string role, string location, AvailabilityStatus availability, List<string> skills, Random random)
        {
            var experienceYears = random.Next(1, 16);
            var availabilityText = availability == AvailabilityStatus.Available 
                ? "Disponible immédiatement" 
                : availability == AvailabilityStatus.Soon 
                    ? $"Disponible à partir de {GetRandomMonth()}" 
                    : "Actuellement en mission";
                    
            var missionType = random.Next(3) switch
            {
                0 => $"missions sur {location}",
                1 => "missions en télétravail",
                _ => $"missions sur {location} ou en télétravail"
            };
            
            var specialization = random.Next(3) switch
            {
                0 => $"spécialisé en {skills[0]}",
                1 => skills.Count > 1 ? $"avec expertise en {skills[0]} et {skills[1]}" : $"spécialisé en {skills[0]}",
                _ => ""
            };
            
            var message = $"{role} {specialization} avec {experienceYears} ans d'expérience. {availabilityText} pour {missionType}.";
            
            // Add hashtags
            var hashtags = new List<string>();
            foreach (var skill in skills)
            {
                var hashtag = "#" + skill.ToLower().Replace(".", "").Replace("/", "").Replace(" ", "").Replace("-", "");
                hashtags.Add(hashtag);
            }
            
            if (random.Next(2) == 0) // 50% chance to add location hashtag
            {
                hashtags.Add("#" + location.ToLower());
            }
            
            message += " " + string.Join(" ", hashtags);
            
            return message;
        }
        
        private string GetRandomMonth()
        {
            var months = new string[] { "janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre" };
            return months[new Random().Next(months.Length)];
        }
    }
}
