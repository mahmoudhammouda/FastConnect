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
                "Bonjour à toute la communauté FastConnect,\n\nJe me permets de me présenter comme architecte cloud expérimenté et je suis actuellement disponible pour des missions de conseil en architecture de systèmes distribués et infrastructures cloud.\n\nMon parcours professionnel :\n\nAprès avoir passé 10 ans dans le développement de solutions d'infrastructure, dont 7 ans spécifiquement dédiés au cloud computing, j'ai eu l'opportunité de travailler avec des organisations de toutes tailles, allant des startups innovantes aux grandes entreprises du CAC 40. Mon expérience couvre l'ensemble du cycle de vie des projets d'infrastructure, de la conception initiale à la mise en production et l'optimisation continue.\n\nMon expertise en détail :\n\n- Expérience approfondie avec AWS (architectures multi-comptes, migration à grande échelle, Well-Architected Framework)\n- Google Cloud Platform (Kubernetes, BigQuery, Dataflow, Anthos pour environnements hybrides)\n- Microsoft Azure (AKS, Azure Functions, Logic Apps, Azure DevOps)\n- Spécialiste en migration vers le cloud (stratégies de lift-and-shift, re-platforming et re-architecting)\n- Optimisation des coûts d'infrastructure (réduction moyenne de 35% sur mes dernières missions)\n- Automatisation complète des déploiements via Infrastructure as Code (Terraform, CloudFormation, ARM)\n- Conception et implémentation d'architectures microservices\n- Sécurisation d'infrastructures cloud selon les standards RGPD, ISO27001, et PCI-DSS\n- Mise en place de stratégies de résilience et de reprise après sinistre (DR)\n- Implémentation de pratiques GitOps et DevSecOps\n\nRéalisations récentes :\n\n* Migration d'une entreprise du CAC 40 vers une architecture multi-cloud hybride en moins de 6 mois, permettant une réduction des coûts d'infrastructure de 42% et une amélioration de la flexibilité opérationnelle.\n\n* Conception et mise en place d'un système de déploiement continu qui a réduit le délai de mise en production de 2 semaines à 2 heures, permettant des cycles de développement plus rapides et une meilleure réactivité aux besoins du marché.\n\n* Conception d'une architecture à haute disponibilité (99,999%) pour un site de e-commerce à fort trafic (+2M de visites quotidiennes), s'adaptant automatiquement aux pics de charge saisonniers.\n\n* Mise en place d'une stratégie complète de modernisation d'applications legacy pour une société d'assurance, incluant la containerisation de plus de 50 applications et leur orchestration via Kubernetes.\n\n* Développement d'une plateforme data lake sur AWS pour un acteur majeur de la grande distribution, permettant l'analyse en temps réel des comportements d'achat et optimisant les stratégies de stock et de pricing.\n\nRésultats concrets obtenus pour mes clients :\n\n- J'ai aidé plus de 15 entreprises à réduire leurs coûts cloud de 30% en moyenne tout en améliorant la performance et la fiabilité de leurs systèmes.\n- Amélioration de la performance des applications de 40 à 60% grâce à des architectures optimisées et des stratégies de mise en cache avancées.\n- Réduction des incidents de production de 75% via l'automatisation des tests et des déploiements.\n- Diminution du temps de résolution des incidents (MTTR) de 65% grâce à de meilleures pratiques de monitoring et d'alerting.\n- Augmentation de la vélocité de développement de 40% par l'adoption de méthodologies DevOps et d'outils modernes.\n\nCertifications valides :\n\n* AWS Solutions Architect Professional\n* Google Cloud Professional Cloud Architect\n* Microsoft Azure Solutions Architect Expert\n* HashiCorp Certified Terraform Associate\n* Certified Kubernetes Administrator (CKA)\n* TOGAF 9 Certified\n\nApproche de travail :\n\nJe privilégie toujours une approche collaborative et pragmatique. Je commence par comprendre en profondeur les besoins business avant de proposer des solutions techniques. Je crois fermement que la meilleure architecture est celle qui répond précisément aux besoins actuels tout en anticipant les évolutions futures.\n\nJe suis passionné par le partage de connaissances et j'anime régulièrement des formations et des conférences sur l'architecture cloud. J'ai également contribué à plusieurs projets open source liés à l'automatisation d'infrastructure.\n\nDisponibilité et modalités :\n\nJe suis disponible dès maintenant pour des missions de conseil, d'architecture ou de mise en œuvre, en régie ou au forfait. Je peux intervenir sur site ou en remote, selon les besoins. Je suis également ouvert à des missions de formation ou de mentorat pour les équipes.\n\nN'hésitez pas à me contacter pour échanger sur vos besoins et objectifs. Je serais ravi de discuter de comment mon expertise pourrait contribuer au succès de vos projets d'infrastructure cloud.\n\nCordialement,\n\n#ArchitectureCloud #AWS #Azure #GCP #DevOps #Infrastructure #Scalabilité #HighAvailability #Kubernetes #Terraform #Microservices",
                
                "ALERTE CYBERSÉCURITÉ\n\nBonjour à tous,\n\nJe suis un expert certifié en solutions #cloud et #cybersécurité avec plus de 10 ans d'expérience, passionné par la protection des infrastructures critiques et la sécurisation des environnements numériques modernes. Dans un contexte où les menaces évoluent constamment, je propose mon expertise pour renforcer la posture de sécurité de votre organisation.\n\nMon parcours professionnel en détail :\n\nExpérience professionnelle :\n- Responsable Sécurité Cloud chez un leader bancaire européen (3 ans) - Supervision d'une équipe de 12 spécialistes en sécurité\n- Consultant senior en cybersécurité pour des clients internationaux (5 ans) - Intervention dans plus de 30 pays\n- Analyste SOC pour un service gouvernemental stratégique (2 ans) - Gestion de menaces avancées\n- Intervenant en écoles d'ingénieurs (cybersécurité opérationnelle) - Formation de plus de 500 étudiants\n\nCertifications et formations :\n- CISSP (Certified Information Systems Security Professional)\n- AWS Certified Security Specialty\n- OSCP (Offensive Security Certified Professional)\n- CEH (Certified Ethical Hacker)\n- CCSP (Certified Cloud Security Professional)\n- ISO 27001 Lead Implementer & Lead Auditor\n- CISM (Certified Information Security Manager)\n- GCIH (GIAC Certified Incident Handler)\n- Formation avancée en cyber threat intelligence\n\nDomaines d'expertise approfondie :\n\n1. Sécurité des environnements cloud :\n- Sécurisation d'architectures multi-cloud (AWS, Azure, GCP)\n- Conception de solutions Zero Trust\n- Gestion des identités et des accès privilégiés\n- Protection des données dans le cloud (chiffrement, tokenisation)\n- Sécurité des containers et Kubernetes\n\n2. Évaluation et tests :\n- Audit de sécurité approfondi (infrastructure, applications, cloud)\n- Tests d'intrusion (web, mobile, infrastructure, social engineering)\n- Red teaming et simulations d'attaques ciblées\n- Évaluation de sécurité DevSecOps\n- Analyse de code sécurisé\n\n3. Conformité et gouvernance :\n- Mise en place de programmes de conformité (RGPD, PCI DSS, ISO 27001)\n- Élaboration de politiques de sécurité adaptées\n- Gestion des risques informatiques\n- Stratégies de souveraineté numérique\n- Programmes de sensibilisation et formation\n\n4. Détection et réponse :\n- Gestion de crise et réponse aux incidents\n- Forensics et analyse post-incident\n- Déploiement de SOC et SIEM\n- Threat hunting et CTI (Cyber Threat Intelligence)\n- Surveillance continue et détection des menaces\n\n5. Sécurité des innovations :\n- Sécurité DevOps et automatisation des contrôles de sécurité\n- Protection des environnements IoT et OT\n- Sécurité de l'IA et du machine learning\n- Blockchain et cryptographie avancée\n- Sécurité du edge computing\n\nRéalisations marquantes :\n\n* Conçu et déployé une architecture Zero Trust pour une multinationale (15,000+ employés), incluant micro-segmentation, authentification multi-facteurs avancée et gestion des accès privilégiés, réduisant la surface d'attaque de 85%.\n\n* Dirigé des audits de sécurité pour 5 entreprises du CAC 40, identifiant des vulnérabilités critiques qui auraient pu entraîner des brèches majeures, et établi des feuilles de route de remédiation sur 18 mois.\n\n* Implémenté des stratégies de défense qui ont réduit les incidents de sécurité de 70% en 6 mois pour un groupe bancaire international, incluant déploiement d'EDR avancés, déception technology et surveillance comportementale des utilisateurs.\n\n* Détecté et neutralisé une APT (Advanced Persistent Threat) visant des données sensibles dans le secteur de la défense, avec documentation complète des TTPs (Tactics, Techniques and Procedures) utilisées par l'attaquant.\n\n* Mis en place un programme de sécurité DevSecOps complet pour une entreprise SaaS, intégrant des contrôles de sécurité automatisés à chaque étape du pipeline CI/CD, réduisant de 65% le temps de réponse aux incidents de sécurité.\n\n* Conçu et déployé un programme de gestion des vulnérabilités pour un groupe hospitalier de 10 établissements, réduisant le délai moyen de correction des failles critiques de 45 jours à 5 jours.\n\n* Développé une solution innovante de détection des comportements suspects basée sur l'IA, capable d'identifier des menaces inconnues avec un taux de faux positifs inférieur à 2%.\n\nServices proposés actuellement :\n\n- Audits de sécurité complets (infrastructure, applications, cloud, social engineering)\n- Évaluation de maturité sécurité et définition de feuilles de route stratégiques\n- Accompagnement RGPD et certifications (ISO 27001, SOC2, HDS, PCI-DSS)\n- Mise en place de programmes de Security by Design dans les cycles de développement\n- Formation des équipes techniques et sensibilisation des utilisateurs aux bonnes pratiques\n- Conception et implémentation de SOC (Security Operations Center)\n- Gestion de crise et réponse aux incidents de sécurité\n- Revue d'architecture cloud et sécurisation d'environnements multi-cloud\n\nVeille et contributions à la communauté :\n\nJe maintiens une veille active sur les dernières menaces et vulnérabilités. Je contribue régulièrement à des projets open source liés à la sécurité et j'ai publié plusieurs articles techniques dans des revues spécialisées. Je suis également intervenant dans des conférences de sécurité comme BlackHat, DefCon et FIC.\n\nDisponibilité : Immédiate pour missions courtes ou longues, remote ou sur site dans toute l'Europe.\n\nN'hésitez pas à me contacter pour discuter de vos enjeux de sécurité et comment je pourrais vous aider à protéger efficacement votre organisation et vos données critiques. Dans un monde où les attaques sont de plus en plus sophistiquées, une approche proactive de la sécurité est essentielle.\n\n#Cybersecurity #CloudSecurity #RGPD #ZeroTrust #SecurityByDesign #InfoSec #PentestingH #NetworkSecurity #ApplicationSecurity #ThreatHunting",
                
                "Hello World ! \n\nDéveloppeur full-stack passionné avec 8+ ans d'expérience en #javascript #react #nodejs #typescript et technologies web modernes, je suis à la recherche de nouveaux défis techniques stimulants où je pourrai mettre à profit mon expertise et ma passion pour le code propre et performant.\n\nMon parcours professionnel :\n\nJ'ai débuté ma carrière en tant que développeur front-end, avant de m'étendre progressivement aux compétences backend et DevOps pour devenir un véritable full-stack. J'ai eu la chance de travailler aussi bien dans des startups agiles que dans des grandes entreprises, ce qui m'a permis d'acquérir une grande adaptabilité et une vision globale des projets de développement.\n\nMon stack technique en détail :\n\nFrontend :\n- React (hooks, context API, redux, styled-components, Next.js) - 8 ans d'expérience\n- Vue.js (Composition API, Pinia, Nuxt) - 4 ans d'expérience\n- React Native & Expo pour applications mobiles cross-platform - 5 ans d'expérience\n- Angular pour projets d'entreprise complexes - 3 ans d'expérience\n- CSS avancé (Grid, Flexbox, animations, responsive design, TailwindCSS)\n- Tests unitaires et E2E (Jest, React Testing Library, Cypress, Playwright)\n- WebGL, Three.js et animations avancées pour expériences interactives\n- PWA (Progressive Web Apps) et stratégies de mise en cache\n\nBackend :\n- Node.js (Express, NestJS, Fastify) - 7 ans d'expérience\n- Deno pour expérimentations récentes\n- GraphQL (Apollo, Relay, Hasura) et REST API design\n- Authentification & autorisation (JWT, OAuth, RBAC, SAML)\n- Serverless (AWS Lambda, Netlify Functions, Vercel Edge Functions)\n- Webhooks et intégrations API tierces\n- Tests et documentation automatique d'API\n\nDevOps & Architecture :\n- Architecture microservices et serverless\n- Docker, Kubernetes, CI/CD pipelines (GitHub Actions, CircleCI, Jenkins)\n- AWS (EC2, S3, Lambda, DynamoDB, CloudFront, SQS/SNS)\n- Monitoring et logging (Prometheus, Grafana, ELK, Datadog)\n- Performance monitoring (Lighthouse CI, Core Web Vitals, RUM)\n- Infrastructure as Code (Terraform, CDK)\n- Stratégies de déploiement (blue/green, canary)\n\nBases de données :\n- MongoDB (schémas, indexation, agrégations, sharding) - 6 ans d'expérience\n- PostgreSQL et MySQL pour données relationnelles - 5 ans d'expérience\n- Redis pour caching et messages - 4 ans d'expérience\n- Elasticsearch pour recherche avancée - 3 ans d'expérience\n- TimescaleDB pour données de séries temporelles\n\nCertifications :\n* AWS Solutions Architect Associate (2023)\n* MongoDB Developer & DBA Associate (2022)\n* Professional Scrum Developer I (2021)\n* Microsoft Azure Fundamentals (2020)\n* Google Analytics Individual Qualification (2019)\n\nApproche technique :\n- Code maintainable et documenté, avec tests automatiques extensifs\n- Architecture évolutive et scalable, pensée pour la croissance\n- Performance et optimisation dès la conception\n- Collaboration et partage de connaissances, mentorat d'équipes junior\n- Développement guidé par les données et les métriques\n- Focus sur l'expérience utilisateur et l'accessibilité\n\nRéalisations récentes dont je suis particulièrement fier :\n\n1. Refonte complète d'une plateforme e-commerce (10M+ visiteurs mensuels) avec mise en place d'une architecture JAMstack (Next.js, Contentful, Stripe, Algolia) qui a:\n   * Amélioré les temps de chargement de 300% (Core Web Vitals tous au vert)\n   * Augmenté le taux de conversion de 25%\n   * Réduit les coûts d'infrastructure de 60%\n   * Permis une internationalisation sur 12 marchés en 3 mois\n   * Mis en place un design system réutilisable across platforms\n\n2. Développement d'une application de gestion de tâches corporate utilisée par 5000+ employés:\n   * Synchronisation offline et temps de réponse < 100ms\n   * Intégration avec Microsoft 365 et Google Workspace\n   * Implémentation de fonctionnalités collaboratives en temps réel\n   * Conformité RGPD et chiffrement de bout en bout\n\n3. Création d'un dashboard temps réel pour visualiser et analyser 500M+ d'événements quotidiens:\n   * Architecture distribuée utilisant Kafka, Elasticsearch et Redis\n   * Visualisations interactives avec D3.js et Canvas\n   * Latence < 2s même avec des requêtes complexes\n   * Système d'alerting automatisé basé sur des anomalies\n\n4. Application mobile cross-platform pour une fintech:\n   * Développée avec React Native pour iOS et Android\n   * Implémentation de fonctionnalités de sécurité avancées (biométrie, détection de rootkit)\n   * Intégration avec des APIs bancaires via PSD2\n   * Animations fluides et interactions intuitives\n\n5. Mentor pour 10+ développeurs juniors et contributions à plusieurs projets open-source:\n   * Auteur d'une librairie React pour la gestion de formulaires complexes (3k+ stars sur GitHub)\n   * Contribution régulière à l'écosystème TypeScript\n   * Présentations à des meetups et conférences tech locales\n\nMéthodologies et outils :\n- Méthodologies Agile (Scrum, Kanban)\n- Domain-Driven Design (DDD)\n- Test-Driven Development (TDD)\n- Continuous Integration / Continuous Deployment\n- Code reviews et pair programming\n- Documentation systématique (Storybook, Swagger, README)\n\nJe suis particulièrement intéressé par des projets innovants dans la fintech, l'e-commerce, ou les applications SaaS à fort impact. J'apprécie les environnements qui valorisent la qualité du code, l'innovation technique et l'impact utilisateur.\n\nDisponible pour des missions freelance, des positions permanentes ou des collaborations ponctuelles.\n\nDisponibilité : Dès maintenant - Remote ou région parisienne\n\n#JavaScript #React #NodeJS #FullStack #WebPerformance #Microservices #Cloud #TechLeadership #AWS #MongoDB",
                
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
            
            for (int i = 0; i < 200; i++)
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