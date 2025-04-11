import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, tap, delay } from 'rxjs/operators';
import { Consultant, ConsultantWithTags, ExperienceLevel, ExperienceLevelString, AvailabilityStatus } from '../models/consultant.model';
import { environment } from '../../environments/environment';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ConsultantService {
  private mockData: Consultant[] = [];

  constructor(private apiService: ApiService) { 
    console.log('ConsultantService initialized');
    
    // Générons quand même les données mockées en cas de besoin
    this.generateMockData();
  }

  /**
   * Génère des données de test pour le développement
   * NOTE: Ces données sont uniquement pour le développement en local et ne sont plus utilisées
   * Les données réelles proviennent exclusivement de l'API
   */
  private generateMockData(): void {
    console.log('[ConsultantService] Génération de données mockées pour le développement (inutilisées)');
    const roles = ['Développeur Full Stack', 'Data Scientist', 'DevOps Engineer', 'UX/UI Designer', 'Product Manager', 'Architecte Logiciel', 'Mobile Developer', 'Frontend Developer', 'Backend Developer', 'SRE/Cloud Engineer'];
    const types = ['Freelance', 'Salarié', 'Consultant'];
    const locations = ['Paris', 'Lyon', 'Marseille', 'Toulouse', 'Bordeaux', 'Lille', 'Nantes', 'Strasbourg', 'Remote', 'Hybride', 'Full-Remote', 'Luxembourg', 'Bruxelles'];
    const experiences: ExperienceLevelString[] = ['less_than_3', 'between_3_and_10', 'more_than_10'];
    const availabilities: AvailabilityStatus[] = [0, 1, 2]; // 0 = available, 1 = soon, 2 = unavailable
    
    // Entreprises pour les expériences professionnelles
    const companies = [
      'Accenture', 'Capgemini', 'Sopra Steria', 'SNCF', 'Orange', 'Total', 'BNP Paribas', 
      'Société Générale', 'Crédit Agricole', 'AXA', 'Engie', 'EDF', 'L\'Oréal', 'Carrefour', 
      'Google', 'Microsoft', 'Amazon', 'Apple', 'Facebook', 'Twitter', 'Airbnb', 'Uber', 
      'Doctolib', 'Deezer', 'Blablacar', 'OVH', 'Thales', 'Atos', 'IBM', 'HP', 'Dell', 
      'Allianz', 'Axa', 'MAIF', 'La Poste', 'Air France', 'RATP', 'SNCF'
    ];
    
    const skillsPool = [
      'JavaScript', 'TypeScript', 'Angular', 'React', 'Vue.js', 'Node.js', 'Python', 'Java', 'C#', '.NET',
      'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'CI/CD', 'Jenkins', 'Git', 'GitHub Actions',
      'SQL', 'NoSQL', 'MongoDB', 'PostgreSQL', 'MySQL', 'Oracle', 'Redis',
      'HTML', 'CSS', 'SASS', 'LESS', 'Tailwind CSS', 'Bootstrap', 'Material Design',
      'REST API', 'GraphQL', 'gRPC', 'WebSockets', 'Microservices', 'Serverless',
      'Agile', 'Scrum', 'Kanban', 'Jira', 'Confluence', 'TDD', 'BDD', 'DDD',
      'Machine Learning', 'AI', 'Deep Learning', 'NLP', 'Computer Vision', 'Data Analysis',
      'Mobile', 'iOS', 'Android', 'Kotlin', 'Swift', 'React Native', 'Flutter'
    ];
    
    // Domaines d'expertise spécifiques 
    const expertiseDomains = [
      'Architecture logicielle', 'Cybersécurité', 'Cloud computing', 'DevOps', 'FinTech', 
      'E-commerce', 'Santé', 'Transport', 'Énergie', 'Télécommunications', 'Médias', 
      'Éducation', 'Retail', 'Industrie 4.0', 'Smart City', 'IoT', 'Blockchain', 
      'Intelligence artificielle', 'Big Data', 'Réalité virtuelle', 'Réalité augmentée', 
      'User experience', 'Accessibilité', 'Sécurité des données', 'Protection de la vie privée',
      'Transformation digitale', 'Innovation', 'Conduite du changement', 'Agilité à l\'échelle', 
      'Performance web', 'Mobile first', 'Progressive Web Apps', 'Microservices'
    ];
    
    // Secteurs d'activité
    const activitySectors = [
      'Banque & Finance', 'Assurance', 'Santé', 'Pharmaceutique', 'Luxe', 
      'Commerce de détail', 'Transport & Logistique', 'Aéronautique', 'Automobile', 
      'Télécommunications', 'Média & Divertissement', 'Énergie', 'Industrie manufacturière', 
      'Services publics', 'Défense', 'Éducation', 'Agroalimentaire', 'Hôtellerie & Restauration', 
      'Immobilier', 'Construction', 'High-Tech', 'Environnement & Développement durable', 
      'Tourisme', 'Sport', 'Mode & Textile', 'Conseil', 'E-commerce'
    ];

    const messages = [
      "Bonjour,\n\nJe suis disponible pour des missions de conseil en architecture de systèmes distribués et infrastructures cloud.\n\nMon expertise :\n- Expérience approfondie avec AWS, GCP et Azure\n- Spécialiste en migration vers le cloud\n- Optimisation des coûts d'infrastructure\n\nJ'ai aidé plus de 15 entreprises à réduire leurs coûts cloud de 30% en moyenne tout en améliorant la performance et la fiabilité de leurs systèmes.\n\nÀ l'écoute de nouvelles opportunités à partir de mai 2025.\n\n#technique #architecture #devops #cloud #costoptimization",
      
      "Bonjour,\n\nExpert en solutions #cloud et #cybersécurité, je suis passionné par les technologies émergentes et la sécurisation des infrastructures critiques.\n\nProfil :\n- +10 ans d'expérience en sécurité des SI\n- Certifications CISSP et AWS Security Specialist\n- Spécialiste des normes ISO27001 et RGPD\n\nRécemment, j'ai dirigé des audits de sécurité pour des entreprises du CAC 40 et implémenté des stratégies de défense qui ont réduit les incidents de 75%.\n\nDisponible immédiatement pour des missions d'audit ou de conseil stratégique.\n\n#security #compliance #audit #training",
      
      "Bonjour à tous,\n\nDéveloppeur full-stack avec 8 ans d'expérience en #javascript #react #nodejs, je recherche de nouveaux défis techniques.\n\nMes compétences :\n- Architecture microservices\n- Optimisation de performance\n- Certifié AWS Solutions Architect et MongoDB Developer\n\nMa dernière réalisation : refonte complète d'une plateforme e-commerce (10M+ visiteurs) avec mise en place d'une architecture JAMstack qui a amélioré les temps de chargement de 300%.\n\nDisponible dès juillet pour des projets innovants.\n\n#fullstack #performance #architecture #ecommerce",
      
      "Bonjour,\n\nData Scientist spécialisé #MachineLearning et #DeepLearning, je suis actuellement disponible pour des missions en remote.\n\nMon parcours :\n- PhD en Intelligence Artificielle (École Polytechnique)\n- Expert TensorFlow, PyTorch et scikit-learn\n- Spécialiste en modèles prédictifs et détection de fraudes\n\nMon projet récent : système de détection de fraude financière avec réduction des faux positifs de 60% tout en maintenant un taux de détection >95%.\n\nÀ la recherche d'opportunités à fort impact social ou environnemental.\n\n#DataScience #AI #analytics #python",
      
      "Bonjour,\n\nConsultant UX/UI à la recherche d'une nouvelle opportunité dans le secteur de la santé ou de l'éducation.\n\nMon expertise :\n- Portfolio de +30 projets (startups et grandes entreprises)\n- Recherche utilisateur, prototypage, tests d'utilisabilité\n- Maîtrise de Figma, Adobe XD et Sketch\n\nRécemment, j'ai dirigé la refonte UX d'une application de santé mentale (500K+ utilisateurs), améliorant la rétention de 40%.\n\nJe privilégie les projets à impact social positif.\n\nDisponible dès maintenant.\n\n#design #frontend #healthcare #edtech #accessibility",
      
      "Bonjour,\n\nArchitecte logiciel expérimenté dans les environnements critiques à haute disponibilité.\n\nMes domaines d'expertise :\n- Conception de systèmes distribués\n- Traitement de données en temps réel\n- Architectures événementielles (Kafka, RabbitMQ, Apache Flink)\n\nJ'ai conçu des architectures critiques pour les secteurs bancaire et télécoms garantissant une disponibilité de 99,999%.\n\nMa spécialité : transformer des systèmes monolithiques en architectures microservices modernes sans perturbation opérationnelle.\n\nDisponible à partir de juin 2025.\n\n#reliability #architecture #distributed #microservices",
      
      "Bonjour,\n\nDéveloppeur mobile avec +5 ans d'expérience en développement natif et cross-platform.\n\nMes technologies :\n- React Native, Flutter\n- Kotlin, Swift\n- AR, ML on-device\n\nJ'ai publié plus de 15 applications (App Store/Google Play) totalisant des millions d'utilisateurs.\n\nProjet récent : application de fitness ayant atteint le Top 10 de sa catégorie sur l'App Store avec une note de 4,8/5 (50K+ avis).\n\nJe suis particulièrement intéressé par les projets innovants utilisant l'AR ou le ML.\n\nDisponible immédiatement.\n\n#mobile #reactnative #flutter #performance #ux",
      "Expert en solutions DevOps et CI/CD avec une solide expérience en automatisation d'infrastructures et déploiements. Maîtrise de Kubernetes, Terraform, Ansible, Jenkins, GitHub Actions et GitLab CI. J'ai mis en place des pipelines CI/CD robustes pour des équipes de développement de toutes tailles, réduisant les temps de déploiement de plusieurs heures à quelques minutes. #docker #kubernetes #automation #gitops #terraform #IaC",
      "Ingénieur backend passionné par les API performantes et les architectures scalables. Expertise en Java, Spring Boot, Quarkus et microservices. J'ai conçu et implémenté des systèmes capables de traiter des milliers de transactions par seconde avec une latence minimale. Expérience en optimisation de bases de données relationnelles et NoSQL. #java #spring #microservices #performance #scalability #databases",
      "Product Manager orienté données avec background technique en développement et analyse de données. J'ai dirigé le développement de produits SaaS B2B dans les secteurs de la finance et du marketing, en mettant l'accent sur l'expérience utilisateur et l'exploitation des données pour la prise de décision. Certifié Scrum Product Owner et Google Analytics. #produit #analytics #agile #saas #b2b #finance",
      "Spécialiste en cybersécurité pour applications cloud avec expertise en sécurisation d'environnements AWS, Azure et GCP. Expérience en tests d'intrusion, analyse de vulnérabilités et réponse aux incidents. J'ai aidé plusieurs entreprises à obtenir des certifications de sécurité (ISO27001, SOC2) et à mettre en place des pratiques de DevSecOps. Certifié CEH, OSCP et AWS Security Specialist. #security #pentesting #devsecops #cloud #compliance #certification",
      "Consultant en transformation digitale pour le secteur financier avec plus de 12 ans d'expérience. J'accompagne les banques et assurances dans leur modernisation technologique et organisationnelle. Expertise en optimisation de processus, adoption de méthodologies agiles et mise en place de plateformes API. Ancien directeur technique dans une grande banque européenne. #fintech #agile #transformation #banking #insurance #api",
      "Développeur .NET avec forte expertise Azure et plus de 7 ans d'expérience en développement d'applications d'entreprise. Spécialiste ASP.NET Core, Entity Framework, Azure Functions et Azure DevOps. J'ai conçu et implémenté des systèmes critiques pour des clients dans les secteurs de la santé, de la finance et de l'industrie. Microsoft Certified Azure Developer Associate. #csharp #dotnet #azure #cloud #microsoft #enterprise",
      "Expert en solutions BigData et DataLakes avec expérience approfondie en conception et implémentation d'architectures de traitement de données à grande échelle. Maîtrise de Hadoop, Spark, Databricks, Snowflake et les services AWS/Azure pour le Big Data. J'ai dirigé des projets de migration vers le cloud et d'implémentation de solutions data pour de grandes entreprises internationales. #hadoop #spark #databricks #bigdata #datalake #cloud",
      "Consultant en accessibilité web et mobile avec 6 ans d'expérience dans la conception et l'audit d'interfaces inclusives. Je travaille avec les équipes produit et développement pour garantir la conformité aux normes WCAG et l'inclusion de tous les utilisateurs. J'ai réalisé plus de 50 audits d'accessibilité et formé des équipes aux bonnes pratiques. Défenseur de l'inclusion numérique et intervenant régulier dans des conférences sur l'accessibilité. #a11y #inclusive #standards #wcag #ux #formation"
    ];

    for (let i = 1; i <= 100; i++) {
      const locked = Math.random() > 0.7;
      const randomRole = roles[Math.floor(Math.random() * roles.length)];
      const randomType = types[Math.floor(Math.random() * types.length)];
      const randomLocation = locations[Math.floor(Math.random() * locations.length)];
      const randomExperience = experiences[Math.floor(Math.random() * experiences.length)];
      const randomAvailability = availabilities[Math.floor(Math.random() * availabilities.length)];
      
      // Generate random skills (between 3 and 7)
      const randomSkillsCount = Math.floor(Math.random() * 5) + 3;
      const shuffledSkills = [...skillsPool].sort(() => 0.5 - Math.random());
      const randomSkills = shuffledSkills.slice(0, randomSkillsCount);
      
      // Generate random message
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      
      // Génération d'emplacements multiples pour certains consultants (1 à 3 lieux)
      let consultantLocations = randomLocation;
      
      // Pour 40% des consultants, ajouter des emplacements multiples
      if (Math.random() < 0.4) {
        // Sélectionner 1 ou 2 lieux supplémentaires différents du premier
        const additionalLocationsCount = Math.floor(Math.random() * 2) + 1;
        const availableLocations = locations.filter(loc => loc !== randomLocation);
        const shuffledLocations = [...availableLocations].sort(() => 0.5 - Math.random());
        const additionalLocations = shuffledLocations.slice(0, additionalLocationsCount);
        
        // Combiner les emplacements avec des virgules
        consultantLocations = [randomLocation, ...additionalLocations].join(', ');
      }
      
      // Génération d'expertises aléatoires (entre 2 et 4)
      const randomExpertiseCount = Math.floor(Math.random() * 3) + 2;
      const shuffledExpertises = [...expertiseDomains].sort(() => 0.5 - Math.random());
      const randomExpertises = shuffledExpertises.slice(0, randomExpertiseCount);
      
      // Génération de secteurs d'activité (entre 1 et 3)
      const sectorCount = Math.floor(Math.random() * 3) + 1;
      const shuffledSectors = [...activitySectors].sort(() => 0.5 - Math.random());
      const randomSectors = shuffledSectors.slice(0, sectorCount);
      
      // Génération d'expériences professionnelles aléatoires (entre 1 et 3)
      const experienceCount = Math.floor(Math.random() * 3) + 1;
      const randomExperiences = [];
      
      // Création d'expériences aléatoires
      for (let j = 0; j < experienceCount; j++) {
        const randomCompany = companies[Math.floor(Math.random() * companies.length)];
        const roleForExperience = roles[Math.floor(Math.random() * roles.length)];
        const isCurrent = j === 0; // La première expérience est l'expérience actuelle
        
        randomExperiences.push({
          role: roleForExperience,
          company: randomCompany,
          isCurrent: isCurrent
        });
      }
      
      // Conversion des chaînes d'énumération en valeurs d'énumération
      const expLevel = randomExperience === 'less_than_3' 
                 ? ExperienceLevel.Junior 
                 : randomExperience === 'between_3_and_10' 
                 ? ExperienceLevel.Intermediate 
                 : ExperienceLevel.Senior;
                 
      this.mockData.push({
        id: `100${i}`,
        role: randomRole,
        linkedinUrl: 'https://www.linkedin.com/in/example',
        phone: locked ? undefined : '+33 6 12 34 56 78',
        email: locked ? undefined : 'contact@example.com',
        type: randomType,
        skills: randomSkills,
        location: consultantLocations,
        experience: expLevel,
        availability: randomAvailability,
        message: randomMessage,
        experiences: randomExperiences,
        expertises: randomExpertises,
        sectors: randomSectors
      } as Consultant);
    }
  }

  /**
   * Get all consultants
   */
  getConsultants(): Observable<ConsultantWithTags[]> {
    console.log('[ConsultantService] Fetching all consultants from API');
    
    // Use the real API with proper error handling
    return this.apiService.get<Consultant[]>('/consultants')
      .pipe(
        tap(response => {
          console.log('[ConsultantService] All consultants API Response received - length:', response?.length || 0);
          if (response?.length === 0) {
            console.warn('[ConsultantService] API returned empty consultant array');
          }
        }),
        map(consultants => {
          // Vérifier que consultants est bien un tableau
          if (!Array.isArray(consultants)) {
            console.error('[ConsultantService] API did not return an array of consultants:', consultants);
            return [];
          }
          console.log(`[ConsultantService] Processing ${consultants.length} consultants, adding tags`);
          return consultants.map(consultant => ({
            ...consultant,
            tags: this.extractTags(consultant?.message || '')
          }));
        }),
        catchError(error => {
          console.error('[ConsultantService] Error fetching all consultants:', error);
          // Retourner l'erreur au lieu d'utiliser des données de repli
          return throwError(() => new Error('Impossible de récupérer les consultants. ' + 
            (error.status === 0 ? 
              'Le serveur API est peut-être indisponible.' : 
              `Erreur ${error.status}: ${error.message || 'message inconnu'}`)));
        })
      );
  }
  
  /**
   * Get consultants with pagination
   */
  getPagedConsultants(page: number, pageSize: number): Observable<ConsultantWithTags[]> {
    console.log(`[ConsultantService] Fetching paged consultants`);
    console.log(`[ConsultantService] Page: ${page}, PageSize: ${pageSize}`);
    
    // Pour le moment, nous utilisons l'API complète et simulons la pagination côté client
    return this.apiService.get<Consultant[]>('/consultants')
      .pipe(
        tap(response => {
          console.log('[ConsultantService] API Response received - length:', response?.length || 0);
          if (response?.length === 0) {
            console.warn('[ConsultantService] API returned empty consultant array');
          }
        }),
        map(consultants => {
          // Vérifier que consultants est bien un tableau
          if (!Array.isArray(consultants)) {
            console.error('[ConsultantService] API did not return an array of consultants:', consultants);
            return [];
          }
          // Simuler la pagination côté client
          const startIndex = (page - 1) * pageSize;
          const endIndex = startIndex + pageSize;
          console.log(`[ConsultantService] Slice from ${startIndex} to ${endIndex}`);
          return consultants.slice(startIndex, endIndex);
        }),
        map(consultants => {
          console.log(`[ConsultantService] Processing ${consultants.length} consultants, adding tags`);
          return consultants.map(consultant => ({
            ...consultant,
            tags: this.extractTags(consultant?.message || '')
          }));
        }),
        catchError(error => {
          console.error('[ConsultantService] Error fetching paged consultants:', error);
          // Retourner l'erreur au lieu d'utiliser des données de repli
          return throwError(() => new Error('Impossible de récupérer les consultants paginés. ' + 
            (error.status === 0 ? 
              'Le serveur API est peut-être indisponible.' : 
              `Erreur ${error.status}: ${error.message || 'message inconnu'}`)));
        })
      );
  }

  /**
   * Extract hashtags from a message
   */
  extractTags(message: string): string[] {
    const tags: string[] = [];
    const regex = /#(\w+)/g;
    let match;
    
    while ((match = regex.exec(message)) !== null) {
      tags.push(match[1]);
    }
    
    return tags;
  }

  /**
   * Filter consultants based on search criteria
   */
  filterConsultants(
    consultants: ConsultantWithTags[], 
    searchText?: string, 
    skills?: string[], 
    availability?: string, 
    experience?: string,
    location?: string
  ): ConsultantWithTags[] {
    return consultants.filter(consultant => {
      // Filter by search text
      if (searchText && searchText.trim() !== '') {
        const searchLower = searchText.toLowerCase();
        const messageMatch = consultant.message ? consultant.message.toLowerCase().includes(searchLower) : false;
        const roleMatch = consultant.role.toLowerCase().includes(searchLower);
        const locationMatch = consultant.location.toLowerCase().includes(searchLower);
        const tagsMatch = consultant.tags && consultant.tags.length > 0 
                           ? consultant.tags.some(tag => tag.toLowerCase().includes(searchLower)) 
                           : false;
        
        if (!messageMatch && !roleMatch && !locationMatch && !tagsMatch) {
          return false;
        }
      }
      
      // Filter by skills
      if (skills && skills.length > 0) {
        if (!skills.every(skill => consultant.skills.includes(skill))) {
          return false;
        }
      }
      
      // Filter by availability
      if (availability && availability !== 'all') {
        // Convert string to number for comparison
        const availabilityNum = parseInt(availability, 10);
        if (consultant.availability !== availabilityNum) {
          return false;
        }
      }
      
      // Filter by experience
      if (experience && experience !== 'all') {
        if (consultant.experience !== experience) {
          return false;
        }
      }
      
      // Filter by location
      if (location && location !== 'all') {
        // Check if any of the consultant's locations match the filter
        const consultantLocations = consultant.location.split(',').map(loc => loc.trim());
        if (!consultantLocations.includes(location)) {
          return false;
        }
      }
      
      return true;
    });
  }
}
