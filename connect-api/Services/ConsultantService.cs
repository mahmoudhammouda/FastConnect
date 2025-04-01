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
            // Données pour la génération de consultants
            var roles = new string[] { 
                "Développeur Full Stack", "Data Scientist", "DevOps Engineer", "UX/UI Designer", 
                "Product Manager", "Architecte Logiciel", "Mobile Developer", "Frontend Developer", 
                "Backend Developer", "SRE/Cloud Engineer", "Développeur Frontend", "Développeur Backend",
                "Product Owner", "Scrum Master", "UI Designer", "UX Researcher", "Data Engineer", 
                "QA Engineer", "Architect Logiciel", "Consultant ERP", "Administrateur Système",
                "Architecte Cloud", "Data Analyst", "Expert Sécurité", "Network Engineer"
            };
            
            var types = new string[] { "Freelance", "Salarié", "Consultant" };
            
            var locations = new string[] { 
                "Paris", "Lyon", "Marseille", "Toulouse", "Bordeaux", "Lille", "Nantes", 
                "Strasbourg", "Remote", "Hybride", "Full-Remote", "Luxembourg", "Bruxelles" 
            };
            
            var experiences = new ExperienceLevel[] { 
                ExperienceLevel.LessThan3, 
                ExperienceLevel.Between3And10, 
                ExperienceLevel.MoreThan10 
            };
            
            var availabilities = new AvailabilityStatus[] { 
                AvailabilityStatus.Available, 
                AvailabilityStatus.Soon, 
                AvailabilityStatus.Unavailable 
            };
            
            // Entreprises pour les expériences professionnelles
            var companies = new string[] {
                "Accenture", "Capgemini", "Sopra Steria", "SNCF", "Orange", "Total", "BNP Paribas", 
                "Société Générale", "Crédit Agricole", "AXA", "Engie", "EDF", "L'Oréal", "Carrefour", 
                "Google", "Microsoft", "Amazon", "Apple", "Facebook", "Twitter", "Airbnb", "Uber", 
                "Doctolib", "Deezer", "Blablacar", "OVH", "Thales", "Atos", "IBM", "HP", "Dell", 
                "Allianz", "Axa", "MAIF", "La Poste", "Air France", "RATP", "SNCF"
            };
            
            var skillsPool = new string[] {
                "JavaScript", "TypeScript", "Angular", "React", "Vue.js", "Node.js", "Python", "Java", "C#", ".NET",
                "AWS", "Azure", "GCP", "Docker", "Kubernetes", "CI/CD", "Jenkins", "Git", "GitHub Actions",
                "SQL", "NoSQL", "MongoDB", "PostgreSQL", "MySQL", "Oracle", "Redis",
                "HTML", "CSS", "SASS", "LESS", "Tailwind CSS", "Bootstrap", "Material Design",
                "REST API", "GraphQL", "gRPC", "WebSockets", "Microservices", "Serverless",
                "Agile", "Scrum", "Kanban", "Jira", "Confluence", "TDD", "BDD", "DDD",
                "Machine Learning", "AI", "Deep Learning", "NLP", "Computer Vision", "Data Analysis",
                "Mobile", "iOS", "Android", "Kotlin", "Swift", "React Native", "Flutter"
            };
            
            // Domaines d'expertise spécifiques 
            var expertiseDomains = new string[] {
                "Architecture logicielle", "Cybersécurité", "Cloud computing", "DevOps", "FinTech", 
                "E-commerce", "Santé", "Transport", "Énergie", "Télécommunications", "Médias", 
                "Éducation", "Retail", "Industrie 4.0", "Smart City", "IoT", "Blockchain", 
                "Intelligence artificielle", "Big Data", "Réalité virtuelle", "Réalité augmentée", 
                "User experience", "Accessibilité", "Sécurité des données", "Protection de la vie privée",
                "Transformation digitale", "Innovation", "Conduite du changement", "Agilité à l'échelle", 
                "Performance web", "Mobile first", "Progressive Web Apps", "Microservices"
            };
            
            // Secteurs d'activité
            var activitySectors = new string[] {
                "Banque & Finance", "Assurance", "Santé", "Pharmaceutique", "Luxe", 
                "Commerce de détail", "Transport & Logistique", "Aéronautique", "Automobile", 
                "Télécommunications", "Média & Divertissement", "Énergie", "Industrie manufacturière", 
                "Services publics", "Défense", "Éducation", "Agroalimentaire", "Hôtellerie & Restauration", 
                "Immobilier", "Construction", "High-Tech", "Environnement & Développement durable", 
                "Tourisme", "Sport", "Mode & Textile", "Conseil", "E-commerce"
            };

            var messages = new string[] {
                "Bonjour,\n\nJe suis disponible pour des missions de conseil en architecture de systèmes distribués et infrastructures cloud.\n\nMon expertise :\n- Expérience approfondie avec AWS, GCP et Azure\n- Spécialiste en migration vers le cloud\n- Optimisation des coûts d'infrastructure\n\nJ'ai aidé plus de 15 entreprises à réduire leurs coûts cloud de 30% en moyenne tout en améliorant la performance et la fiabilité de leurs systèmes.\n\nÀ l'écoute de nouvelles opportunités dès maintenant.",
                
                "Bonjour,\n\nExpert en solutions #cloud et #cybersécurité, je suis passionné par les technologies émergentes et la sécurisation des infrastructures critiques.\n\nProfil :\n- +10 ans d'expérience en sécurité des SI\n- Certifications CISSP et AWS Security Specialist\n- Spécialiste des normes ISO27001 et RGPD\n\nRécemment, j'ai dirigé des audits de sécurité pour des entreprises du CAC 40 et implémenté des stratégies de défense qui ont réduit les incidents de 70% en 6 mois.",
                
                "Bonjour à tous,\n\nDéveloppeur full-stack avec 8 ans d'expérience en #javascript #react #nodejs, je recherche de nouveaux défis techniques.\n\nMes compétences :\n- Architecture microservices\n- Optimisation de performance\n- Certifié AWS Solutions Architect et MongoDB Developer\n\nMa dernière réalisation : refonte complète d'une plateforme e-commerce (10M+ visiteurs) avec mise en place d'une architecture JAMstack qui a amélioré les temps de chargement de 300%.",
                
                "Bonjour,\n\nData Scientist spécialisé #MachineLearning et #DeepLearning, je suis actuellement disponible pour des missions en remote.\n\nMon parcours :\n- PhD en Intelligence Artificielle (École Polytechnique)\n- Expert TensorFlow, PyTorch et scikit-learn\n- Spécialiste en modèles prédictifs et détection de fraudes\n\nMon projet récent : système de détection de fraude financière avec réduction des faux positifs de 60% tout en maintenant un taux de détection >95%.",
                
                "Bonjour,\n\nConsultant UX/UI à la recherche d'une nouvelle opportunité dans le secteur de la santé ou de l'éducation.\n\nMon expertise :\n- Portfolio de +30 projets (startups et grandes entreprises)\n- Recherche utilisateur, prototypage, tests d'utilisabilité\n- Maîtrise de Figma, Adobe XD et Sketch\n\nRécemment, j'ai dirigé la refonte UX d'une application de santé mentale (500K+ utilisateurs), améliorant la rétention de 40%.\n\nJe privilégie les projets à impact social positif.",
                
                "Bonjour,\n\nArchitecte logiciel expérimenté dans les environnements critiques à haute disponibilité.\n\nMes domaines d'expertise :\n- Conception de systèmes distribués\n- Traitement de données en temps réel\n- Architectures événementielles (Kafka, RabbitMQ, Apache Flink)\n\nJ'ai conçu des architectures critiques pour les secteurs bancaire et télécoms garantissant une disponibilité de 99,999%.\n\nMa spécialité : transformer des systèmes monolithiques en architectures scalables et résilientes.",
                
                "Bonjour,\n\nDéveloppeur mobile avec +5 ans d'expérience en développement natif et cross-platform.\n\nMes technologies :\n- React Native, Flutter\n- Kotlin, Swift\n- AR, ML on-device\n\nJ'ai publié plus de 15 applications (App Store/Google Play) totalisant des millions d'utilisateurs.\n\nProjet récent : application de fitness ayant atteint le Top 10 de sa catégorie sur l'App Store avec une note de 4,8/5 (50K+ avis).\n\nJe suis particulièrement intéressé par les projets innovants utilisant les dernières technologies mobiles.",
                
                "Expert en solutions DevOps et CI/CD avec une solide expérience en automatisation d'infrastructures et déploiements. Maîtrise de Kubernetes, Terraform, Ansible, Jenkins, GitHub Actions et GitLab CI. J'ai mis en place des pipelines CI/CD robustes pour des équipes de développement de toutes tailles, réduisant les temps de déploiement de plusieurs heures à quelques minutes. #docker #kubernetes #automation #gitops #terraform #IaC",
                
                "Ingénieur backend passionné par les API performantes et les architectures scalables. Expertise en Java, Spring Boot, Quarkus et microservices. J'ai conçu et implémenté des systèmes capables de traiter des milliers de transactions par seconde avec une latence minimale. Expérience en optimisation de bases de données relationnelles et NoSQL. #java #spring #microservices #performance #scalability #databases",
                
                "Product Manager orienté données avec background technique en développement et analyse de données. J'ai dirigé le développement de produits SaaS B2B dans les secteurs de la finance et du marketing, en mettant l'accent sur l'expérience utilisateur et l'exploitation des données pour la prise de décision. Certifié Scrum Product Owner et Google Analytics. #produit #analytics #agile #saas #b2b #finance",
                
                "Spécialiste en cybersécurité pour applications cloud avec expertise en sécurisation d'environnements AWS, Azure et GCP. Expérience en tests d'intrusion, analyse de vulnérabilités et réponse aux incidents. J'ai aidé plusieurs entreprises à obtenir des certifications de sécurité (ISO27001, SOC2) et à mettre en place des pratiques de DevSecOps. Certifié CEH, OSCP et AWS Security Specialist. #security #pentesting #devsecops #cloud #compliance #certification",
                
                "Consultant en transformation digitale pour le secteur financier avec plus de 12 ans d'expérience. J'accompagne les banques et assurances dans leur modernisation technologique et organisationnelle. Expertise en optimisation de processus, adoption de méthodologies agiles et mise en place de plateformes API. Ancien directeur technique dans une grande banque européenne. #fintech #agile #transformation #banking #insurance #api",
                
                "Développeur .NET avec forte expertise Azure et plus de 7 ans d'expérience en développement d'applications d'entreprise. Spécialiste ASP.NET Core, Entity Framework, Azure Functions et Azure DevOps. J'ai conçu et implémenté des systèmes critiques pour des clients dans les secteurs de la santé, de la finance et de l'industrie. Microsoft Certified Azure Developer Associate. #csharp #dotnet #azure #cloud #microsoft #enterprise",
                
                "Expert en solutions BigData et DataLakes avec expérience approfondie en conception et implémentation d'architectures de traitement de données à grande échelle. Maîtrise de Hadoop, Spark, Databricks, Snowflake et les services AWS/Azure pour le Big Data. J'ai dirigé des projets de migration vers le cloud et d'implémentation de solutions data pour de grandes entreprises internationales. #hadoop #spark #databricks #bigdata #datalake #cloud",
                
                "Consultant en accessibilité web et mobile avec 6 ans d'expérience dans la conception et l'audit d'interfaces inclusives. Je travaille avec les équipes produit et développement pour garantir la conformité aux normes WCAG et l'inclusion de tous les utilisateurs. J'ai réalisé plus de 50 audits d'accessibilité et formé des équipes aux bonnes pratiques. Défenseur de l'inclusion numérique et intervenant régulier dans des conférences sur l'accessibilité. #a11y #inclusion #wcag #ux"
            };
            
            var random = new Random(42); // Fixed seed for reproducible results
            var consultants = new List<Consultant>();
            
            for (int i = 0; i < 50; i++)
            {
                // Sélection des données de base
                var role = roles[random.Next(roles.Length)];
                var type = types[random.Next(types.Length)];
                var location = locations[random.Next(locations.Length)];
                var experience = experiences[random.Next(experiences.Length)];
                var availability = availabilities[random.Next(availabilities.Length)];
                var message = messages[random.Next(messages.Length)];
                
                // Sélection de compétences aléatoires (4-8)
                var skillCount = random.Next(4, 9);
                var selectedSkills = new List<string>();
                var shuffledSkillIndices = Enumerable.Range(0, skillsPool.Length).OrderBy(x => random.Next()).Take(skillCount).ToList();
                foreach (var index in shuffledSkillIndices)
                {
                    selectedSkills.Add(skillsPool[index]);
                }
                
                // Sélection d'expertises aléatoires (2-4)
                var expertiseCount = random.Next(2, 5);
                var selectedExpertises = new List<string>();
                var shuffledExpertiseIndices = Enumerable.Range(0, expertiseDomains.Length).OrderBy(x => random.Next()).Take(expertiseCount).ToList();
                foreach (var index in shuffledExpertiseIndices)
                {
                    selectedExpertises.Add(expertiseDomains[index]);
                }
                
                // Sélection de secteurs aléatoires (1-3)
                var sectorCount = random.Next(1, 4);
                var selectedSectors = new List<string>();
                var shuffledSectorIndices = Enumerable.Range(0, activitySectors.Length).OrderBy(x => random.Next()).Take(sectorCount).ToList();
                foreach (var index in shuffledSectorIndices)
                {
                    selectedSectors.Add(activitySectors[index]);
                }
                
                // Génération d'expériences professionnelles (1-3)
                var experienceCount = random.Next(1, 4);
                var selectedExperiences = new List<Experience>();
                for (int j = 0; j < experienceCount; j++)
                {
                    var company = companies[random.Next(companies.Length)];
                    var experienceRole = j == 0 ? role : roles[random.Next(roles.Length)];
                    var isCurrent = j == 0 && random.Next(2) == 0; // 50% chance for the first experience to be current
                    
                    selectedExperiences.Add(new Experience
                    {
                        Role = experienceRole,
                        Company = company,
                        IsCurrent = isCurrent
                    });
                }
                
                var hasPhone = random.Next(10) < 8; // 80% chance of having a phone
                var hasEmail = random.Next(10) < 9; // 90% chance of having an email
                var locked = random.Next(10) < 2; // 20% chance of being locked
                
                consultants.Add(new Consultant
                {
                    Id = (1000 + i).ToString(),
                    Role = role,
                    LinkedinUrl = $"https://www.linkedin.com/in/consultant-{1000 + i}",
                    Phone = hasPhone ? $"+33 {random.Next(6, 8)} {random.Next(10, 100)} {random.Next(10, 100)} {random.Next(10, 100)}" : null,
                    Email = hasEmail ? $"consultant{1000 + i}@example.com" : null,
                    Locked = locked,
                    Type = type,
                    Skills = selectedSkills,
                    Location = location,
                    Experience = experience,
                    PhoneValidated = hasPhone && random.Next(10) < 8, // 80% of phones are validated if present
                    EmailValidated = hasEmail && random.Next(10) < 8, // 80% of emails are validated if present
                    LinkedinValidated = random.Next(10) < 8, // 80% of LinkedIn profiles are validated
                    Availability = availability,
                    Message = message,
                    Experiences = selectedExperiences,
                    Expertises = selectedExpertises,
                    Sectors = selectedSectors
                });
            }
            
            return consultants;
        }
    }
}