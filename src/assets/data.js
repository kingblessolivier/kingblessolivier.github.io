export const languages = ['EN', 'KINY', 'FR']

const i18n = {
  EN: {
    nav: {
      home: 'Home',
      about: 'About',
      work: 'Experience',
      projects: 'Projects',
      systems: 'Systems',
      skills: 'Skills',
      awards: 'Awards',
      gallery: 'Gallery',
      contact: 'Contact',
    },
    hero: {
      visitors: 'Visitors',
      viewProjects: 'View Projects',
      contactMe: 'Contact Me',
      roleLines: [
        'Full-Stack Software Engineer',
        'AI Systems Engineer',
        'Intelligent Systems Builder',
      ],
      signatureTag: 'Signature Profile',
      coreFocusLabel: 'Core Focus',
      coreFocusValue: 'Intelligent Systems',
      visionLabel: 'Vision',
      projectsLabel: 'Projects',
      systemsLabel: 'Systems Built',
      certificatesLabel: 'Certificates',
      headline: 'I engineer intelligent, scalable software systems that solve real-world problems.',
      availableForWork: 'Available for work',
    },
    about: {
      sectionTag: 'Personal Story',
      signatureTag: 'Signature Philosophy',
      journeyTitle: 'Journey',
      trait1: 'Outcome-driven engineering',
      trait2: 'System clarity and scalability',
      trait3: 'Clean, human-centered interfaces',
      fullStackLabel: 'Full-Stack Engineer',
    },
    projects: {
      sectionTag: 'Case Studies',
      intro:
        'Every project below includes the problem, architecture, implementation role, key challenges, and practical impact.',
      viewCaseStudy: 'Open Case Study',
      close: 'Close',
      problem: 'Problem',
      solution: 'Solution',
      role: 'My Role',
      architecture: 'Architecture',
      challenges: 'Challenges',
      impact: 'Impact',
      github: 'GitHub',
      liveDemo: 'Live Demo',
    },
    systems: {
      title: 'System Design Thinking',
      subtitle: 'How I design scalable products from request to insight.',
      frontend: 'Frontend Layer',
      backend: 'Backend Layer',
      data: 'Data + Intelligence Layer',
      flowTitle: 'System Flow',
      stepLabel: 'Step',
      flow: ['Client Request', 'API Gateway', 'Service Layer', 'Data + Models', 'Insights Returned'],
      frontendItems: ['React UI', 'Routing', 'State + Form UX', 'Client-side validation'],
      backendItems: ['Django REST APIs', 'Auth & RBAC', 'Business logic services', 'Async workers'],
      dataItems: ['PostgreSQL/MySQL', 'Feature extraction', 'Model inference', 'Monitoring insights'],
    },
    work: {
      sectionTag: 'Professional Background',
      title: 'Work Experience',
      focus: 'How hands-on IT support and customer-facing banking shaped the way I build.',
      educationTitle: 'Education',
      expectedGraduationLabel: 'Expected Graduation',
    },
    skills: {
      sectionTag: 'Capability Map',
      radarTitle: 'Skill Radar',
      searchPlaceholder: 'Search skill...',
      sortLabel: 'Sort',
      highToLow: 'High to Low',
      lowToHigh: 'Low to High',
      noMatch: 'No skills match your search.',
    },
    awards: {
      sectionTag: 'Honors and Certificates',
    },
    gallery: {
      sectionTag: 'Moments',
      all: 'All',
      categories: {
        Hackathons: 'Hackathons',
        Projects: 'Projects',
        Events: 'Events',
      },
    },
    contact: {
      sectionTag: 'Get In Touch',
      directTitle: 'Direct Contact',
      profilesLabel: 'Profiles',
      name: 'Name',
      email: 'Email',
      message: 'Message',
      namePlaceholder: 'Your name',
      emailPlaceholder: 'your@email.com',
      messagePlaceholder: 'Tell me about your project',
      send: 'Send Message',
      sending: 'Sending...',
      success: 'Message sent successfully. Thanks for reaching out.',
      errors: {
        name: 'Name is required.',
        email: 'Valid email is required.',
        message: 'Message should be at least 12 characters.',
      },
    },
    footer: {
      crafted: 'Crafted in Kigali',
    },
  },
  KINY: {
    nav: {
      home: 'Ahabanza',
      about: 'Ibyanjye',
      work: 'Uburambe',
      projects: 'Imishinga',
      systems: 'Sisitemu',
      skills: 'Ubumenyi',
      awards: 'Ibihembo',
      gallery: 'Amafoto',
      contact: 'Twandikire',
    },
    hero: {
      visitors: 'Abasuye',
      viewProjects: 'Reba Imishinga',
      contactMe: 'Vugana Nanjye',
      roleLines: [
        'Injeniyeri wa Software (Full-Stack)',
        'Injeniyeri wa Sisitemu za AI',
        'Umwubatsi wa Sisitemu zifite Ubwenge',
      ],
      signatureTag: 'Umwirondoro Wihariye',
      coreFocusLabel: 'Icyerekezo Nyamukuru',
      coreFocusValue: 'Sisitemu zifite Ubwenge',
      visionLabel: 'Iyerekwa',
      projectsLabel: 'Imishinga',
      systemsLabel: 'Sisitemu Zubatswe',
      certificatesLabel: 'Impamyabushobozi',
      headline: 'Ndubaka sisitemu za software zifite ubwenge, zishobora kwaguka, kandi zigatunga ibibazo by isi ya none.',
      availableForWork: 'Nzakorera ubukozi',
    },
    about: {
      sectionTag: 'Inkuru Yanjye',
      signatureTag: 'Uko Nkora',
      journeyTitle: 'Urugendo',
      trait1: 'Ubuhanga bushingiye ku bisubizo',
      trait2: 'Sisitemu isobanutse kandi ishobora kwaguka',
      trait3: 'Interface nziza ishingiye ku muntu',
      fullStackLabel: 'Injeniyeri ya Full-Stack',
    },
    projects: {
      sectionTag: 'Inyigo z Imishinga',
      intro:
        'Buri mushinga uri hano werekana ikibazo, uko wubatswe, uruhare rwanjye, imbogamizi, n ingaruka zawo.',
      viewCaseStudy: 'Reba Inyigo',
      close: 'Funga',
      problem: 'Ikibazo',
      solution: 'Igisubizo',
      role: 'Uruhare Rwanjye',
      architecture: 'Uko Sisitemu Yubatse',
      challenges: 'Imbogamizi',
      impact: 'Ingaruka',
      github: 'GitHub',
      liveDemo: 'Reba Urubuga',
    },
    systems: {
      title: 'Uko Ntekereza Sisitemu',
      subtitle: 'Uko ntegurira ibicuruzwa kwaguka kuva ku busabe kugeza ku bisubizo.',
      frontend: 'Igice cya Frontend',
      backend: 'Igice cya Backend',
      data: 'Amakuru n Ubwenge bw Imashini',
      flowTitle: 'Uruhererekane rwa Sisitemu',
      stepLabel: 'Intambwe',
      flow: ['Ubusabe bw Umukoresha', 'API Gateway', 'Service Layer', 'Data na Models', 'Igisubizo gisubira ku Mukoresha'],
      frontendItems: ['React UI', 'Routing', 'State + Form UX', 'Kugenzura ku ruhande rw umukoresha'],
      backendItems: ['Django REST APIs', 'Auth & RBAC', 'Serivisi za Logic y Ubucuruzi', 'Abakozi ba Async'],
      dataItems: ['PostgreSQL/MySQL', 'Gukuramo ibimenyetso', 'Gushyira Model mu bikorwa', 'Isesengura ryo kugenzura'],
    },
    work: {
      sectionTag: 'Amateka y Umwuga',
      title: 'Uburambe mu Kazi',
      focus: 'Uko ubufasha bwa IT n uburambe mu mabanki bugana ku bakiliya byampaye uburyo nubaka.',
      educationTitle: 'Amashuri',
      expectedGraduationLabel: 'Igihe Nzasoza',
    },
    skills: {
      sectionTag: 'Ikarita y Ubumenyi',
      radarTitle: 'Radar y Ubumenyi',
      searchPlaceholder: 'Shakisha ubumenyi...',
      sortLabel: 'Tondeka',
      highToLow: 'Kuva hejuru ujya hasi',
      lowToHigh: 'Kuva hasi ujya hejuru',
      noMatch: 'Nta bumenyi buhuye n ibyo washakishije.',
    },
    awards: {
      sectionTag: 'Ibihembo n Impamyabushobozi',
    },
    gallery: {
      sectionTag: 'Ibihe by Ingenzi',
      all: 'Byose',
      categories: {
        Hackathons: 'Hackathons',
        Projects: 'Imishinga',
        Events: 'Ibirori',
      },
    },
    contact: {
      sectionTag: 'Twandikire',
      directTitle: 'Aho Wanyandikira',
      profilesLabel: 'Imiyoboro',
      name: 'Amazina',
      email: 'Imeri',
      message: 'Ubutumwa',
      namePlaceholder: 'Amazina yawe',
      emailPlaceholder: 'imeri@urugero.com',
      messagePlaceholder: 'Mbwira umushinga wawe',
      send: 'Ohereza Ubutumwa',
      sending: 'Biroherezwa...',
      success: 'Ubutumwa bwoherejwe neza. Murakoze kutwandikira.',
      errors: {
        name: 'Amazina arasabwa.',
        email: 'Imeri yemewe irakenewe.',
        message: 'Ubutumwa bugomba kuba nibura inyuguti 12.',
      },
    },
    footer: {
      crafted: 'Byakorewe i Kigali',
    },
  },
  FR: {
    nav: {
      home: 'Accueil',
      about: 'A propos',
      work: 'Experience',
      projects: 'Projets',
      systems: 'Systemes',
      skills: 'Competences',
      awards: 'Recompenses',
      gallery: 'Galerie',
      contact: 'Contact',
    },
    hero: {
      visitors: 'Visiteurs',
      viewProjects: 'Voir les Projets',
      contactMe: 'Me Contacter',
      roleLines: [
        'Ingenieur Logiciel Full-Stack',
        'Ingenieur Systemes IA',
        'Concepteur de Systemes Intelligents',
      ],
      signatureTag: 'Profil Signature',
      coreFocusLabel: 'Focus Principal',
      coreFocusValue: 'Systemes Intelligents',
      visionLabel: 'Vision',
      projectsLabel: 'Projets',
      systemsLabel: 'Systemes Construits',
      certificatesLabel: 'Certificats',
      headline: 'Je concois des systemes logiciels intelligents et evolutifs qui resolvent des problemes concrets.',
      availableForWork: 'Disponible pour travailler',
    },
    about: {
      sectionTag: 'Mon Parcours',
      signatureTag: 'Philosophie',
      journeyTitle: 'Parcours',
      trait1: 'Ingenierie orientee resultats',
      trait2: 'Clarte et evolutivite des systemes',
      trait3: 'Interfaces propres centrees sur l utilisateur',
      fullStackLabel: 'Ingenieur Full-Stack',
    },
    projects: {
      sectionTag: 'Etudes de Cas',
      intro:
        'Chaque projet ci-dessous presente le probleme, l architecture, mon role, les defis et l impact concret.',
      viewCaseStudy: 'Voir le Cas',
      close: 'Fermer',
      problem: 'Probleme',
      solution: 'Solution',
      role: 'Mon Role',
      architecture: 'Architecture',
      challenges: 'Defis',
      impact: 'Impact',
      github: 'GitHub',
      liveDemo: 'Démo en ligne',
    },
    systems: {
      title: 'Vision System Design',
      subtitle: 'Ma methode pour concevoir des produits evolutifs du besoin a l insight.',
      frontend: 'Couche Frontend',
      backend: 'Couche Backend',
      data: 'Couche Data et IA',
      flowTitle: 'Flux Systeme',
      stepLabel: 'Etape',
      flow: ['Requete Client', 'API Gateway', 'Service Layer', 'Data et Modeles', 'Insights Retournes'],
      frontendItems: ['React UI', 'Routing', 'Etat + UX de Formulaire', 'Validation cote client'],
      backendItems: ['APIs REST Django', 'Auth & RBAC', 'Services de logique metier', 'Workers asynchrones'],
      dataItems: ['PostgreSQL/MySQL', 'Extraction de features', 'Inference de modele', 'Insights de monitoring'],
    },
    work: {
      sectionTag: 'Parcours Professionnel',
      title: 'Experience Professionnelle',
      focus: 'Comment le support informatique de terrain et l experience bancaire orientee client ont faconne ma maniere de construire.',
      educationTitle: 'Formation',
      expectedGraduationLabel: 'Diplome Prevu',
    },
    skills: {
      sectionTag: 'Carte de Competences',
      radarTitle: 'Radar de Competences',
      searchPlaceholder: 'Rechercher une competence...',
      sortLabel: 'Tri',
      highToLow: 'Du plus eleve au plus faible',
      lowToHigh: 'Du plus faible au plus eleve',
      noMatch: 'Aucune competence ne correspond a votre recherche.',
    },
    awards: {
      sectionTag: 'Honneurs et Certifications',
    },
    gallery: {
      sectionTag: 'Moments',
      all: 'Tout',
      categories: {
        Hackathons: 'Hackathons',
        Projects: 'Projets',
        Events: 'Evenements',
      },
    },
    contact: {
      sectionTag: 'Me Contacter',
      directTitle: 'Contact Direct',
      profilesLabel: 'Profils',
      name: 'Nom',
      email: 'Email',
      message: 'Message',
      namePlaceholder: 'Votre nom',
      emailPlaceholder: 'votre@email.com',
      messagePlaceholder: 'Parlez-moi de votre projet',
      send: 'Envoyer',
      sending: 'Envoi...',
      success: 'Message envoye avec succes. Merci pour votre contact.',
      errors: {
        name: 'Le nom est requis.',
        email: 'Un email valide est requis.',
        message: 'Le message doit avoir au moins 12 caracteres.',
      },
    },
    footer: {
      crafted: 'Concu a Kigali',
    },
  },
}

export const portfolioData = {
  personal: {
    name: 'NSENGIMANA Olivier',
    title: 'Software Engineer | Intelligent Systems Builder',
    headline: 'I engineer intelligent, scalable software systems that solve real-world problems.',
    location: 'Kigali, Rwanda',
    email: 'nsengimanaolivier100@gmail.com',
    phone: '+250786856578',
    whatsapp: '+250786856578',
    story: {
      EN: 'I started with curiosity, moved through consistent practice, and became an engineer focused on intelligent systems that create measurable everyday value. Before full-time software focus, I also gained frontline service experience through the Equity Leaders Program.',
      KINY: 'Natangiriye ku matsiko, nkomeza kwitoza buri munsi, maze mpinduka injeniyeri wibanda ku kubaka sisitemu zifite ubwenge zifasha abantu buri munsi. Mbere yo kwibanda cyane kuri software, nabanje no kugira ubunararibonye mu gutanga serivisi z imbere ku bakiliya binyuze muri Equity Leaders Program.',
      FR: 'J’ai commencé par la curiosité, puis par la discipline, pour devenir un ingénieur qui construit des systèmes intelligents utiles au quotidien. Avant de me concentrer pleinement sur le logiciel, j’ai aussi acquis une expérience terrain en service client via le programme Equity Leaders.',
    },
    philosophy: {
      EN: 'Build products that are technically reliable, emotionally clear, and operationally scalable.',
      KINY: 'Kubaka ibicuruzwa byizewe mu ikoranabuhanga, bisobanutse ku mukoresha, kandi bishobora kwaguka.',
      FR: 'Construire des produits fiables techniquement, clairs pour l’utilisateur et évolutifs dans l’opération.',
    },
    journey: {
      EN: [
        'Began with web basics and small utility scripts.',
        'Built full-stack academic and civic systems.',
        'Moved into AI-assisted decision systems for practical workflows.',
      ],
      KINY: [
        'Natangiye niga web basics n ama scripts mato.',
        'Nubatse sisitemu za full-stack zo mu masomo no mu mibereho y abaturage.',
        'Ninjiye mu kubaka sisitemu zifashwa na AI ku kazi ka buri munsi.',
      ],
      FR: [
        'Debut avec les bases du web et des scripts utilitaires.',
        'Construction de systemes full-stack académiques et citoyens.',
        'Evolution vers des systemes d aide a la decision bases sur l IA.',
      ],
    },
  },
  stats: {
    projects: 21,
    certificates: 6,
    hackathons: 3,
    systemsBuilt: 10,
  },
  workExperience: [
    {
      company: 'Equity Bank Rwanda',
      role: {
        EN: 'IT Infrastructure & Endpoint Support',
        KINY: 'Ubufasha bwa IT Infrastructure na Endpoint',
        FR: 'Support Infrastructure IT & Postes de Travail',
      },
      type: 'IT Support',
      duration: {
        EN: 'On-site',
        KINY: 'Ku biro',
        FR: 'Sur site',
      },
      details: {
        EN: 'Provided endpoint and infrastructure support across the bank: installed and configured Windows on staff computers, diagnosed and fixed hardware and software faults, set up and connected users to network printers, and handled day-to-day end-user IT support.',
        KINY: 'Natanze ubufasha bwa endpoint na infrastructure muri banki: nashyizeho kandi ndinganiza Windows kuri mudasobwa z abakozi, nsuzuma kandi nkemura ibibazo bya hardware na software, nshyiraho kandi nhuza abakoresha na printers zo ku rusobe, kandi ntanga ubufasha bwa buri munsi ku bakoresha.',
        FR: 'Support endpoint et infrastructure au sein de la banque : installation et configuration de Windows sur les postes du personnel, diagnostic et résolution des pannes matérielles et logicielles, configuration et connexion des utilisateurs aux imprimantes réseau, et support informatique quotidien aux utilisateurs.',
      },
    },
    {
      company: 'Equity Bank Rwanda',
      role: {
        EN: 'Bank Teller Intern',
        KINY: 'Intern wa Teller muri Banki',
        FR: 'Stagiaire Guichetier Bancaire',
      },
      duration: {
        EN: '7 months internship',
        KINY: 'Internship y amezi 7',
        FR: 'Stage de 7 mois',
      },
      details: {
        EN: 'Handled transactions, cash balancing, and frontline customer operations with high accuracy during internship.',
        KINY: 'Nakiriye transactions, mbara amafaranga neza, kandi ntanga serivisi ku bakiliya ku rwego rwo hejuru mu gihe cya internship.',
        FR: 'Gestion des transactions, équilibrage de caisse et opérations client avec grande précision pendant le stage.',
      },
    },
    {
      company: 'Equity Leaders Program',
      role: {
        EN: 'Customer Service Intern',
        KINY: 'Intern muri Customer Service',
        FR: 'Stagiaire en Service Client',
      },
      duration: {
        EN: '3 months internship',
        KINY: 'Internship y amezi 3',
        FR: 'Stage de 3 mois',
      },
      details: {
        EN: 'Supported customer issue resolution, service communication, and branch experience quality.',
        KINY: 'Nafashije gukemura ibibazo by abakiliya, gutanga amakuru ya serivisi, no kuzamura quality ya branch experience.',
        FR: 'Appui à la résolution des demandes client, communication de service et qualité de l’expérience agence.',
      },
    },
  ],
  education: [
    {
      institution: {
        EN: 'University of Rwanda',
        KINY: 'Kaminuza y u Rwanda',
        FR: 'Université du Rwanda',
      },
      degree: {
        EN: 'Bachelor Degree in Information Technology',
        KINY: 'Impamyabumenyi y Icyiciro cya Mbere muri Information Technology',
        FR: 'Licence en Information Technology',
      },
      expectedGraduation: '2027',
      details: {
        EN: 'Currently pursuing core studies in software engineering, systems design, and applied computing.',
        KINY: 'Ndi gukomeza amasomo y ibanze muri software engineering, systems design, na applied computing.',
        FR: 'Actuellement en formation sur l’ingénierie logicielle, la conception de systèmes et l’informatique appliquée.',
      },
    },
  ],
  skills: {
    frontend: [
      { name: 'React', level: 90 },
      { name: 'Next.js', level: 84 },
      { name: 'TypeScript', level: 82 },
      { name: 'Tailwind CSS', level: 88 },
    ],
    backend: [
      { name: 'Python', level: 92 },
      { name: 'Django', level: 90 },
      { name: 'REST APIs', level: 88 },
    ],
    databases: [
      { name: 'PostgreSQL', level: 86 },
      { name: 'MySQL', level: 80 },
      { name: 'MongoDB', level: 78 },
    ],
    ai_ml: [
      { name: 'Recommendation Systems', level: 82 },
      { name: 'Profile Screening Systems', level: 86 },
      { name: 'Model Evaluation', level: 75 },
    ],
    devops: [
      { name: 'Git/GitHub', level: 90 },
      { name: 'Vercel/Render', level: 84 },
      { name: 'AWS Fundamentals', level: 70 },
    ],
    mobile: [
      { name: 'Flutter', level: 76 },
      { name: 'Dart', level: 74 },
    ],
    other: [
      { name: 'C#', level: 72 },
      { name: '.NET', level: 70 },
      { name: 'PowerShell', level: 74 },
      { name: 'Batchfile', level: 68 },
    ],
    professional: [
      { name: 'Customer Service', level: 88 },
      { name: 'Cash Handling Accuracy', level: 86 },
      { name: 'Communication', level: 87 },
      { name: 'Conflict Resolution', level: 82 },
      { name: 'Team Collaboration', level: 85 },
    ],
  },
  social: {
    github: 'https://github.com/kingblessolivier',
    linkedin: 'https://www.linkedin.com/in/nsengimana-olivier-a6bb21408/',
    twitter: 'https://x.com/NSENGIMANAOLIV4',
    instagram: 'https://www.instagram.com/blessking_/',
  },
  professionalLinks: [
    { label: 'GitHub Profile', url: 'https://github.com/kingblessolivier' },
    { label: 'LinkedIn Profile', url: 'https://www.linkedin.com/in/nsengimana-olivier-a6bb21408/' },
    { label: 'Resume / CV', url: 'https://www.linkedin.com/in/nsengimana-olivier-a6bb21408/' },
  ],
  achievements: [
    {
      title: {
        EN: 'Umurava AI Hackathon — 4th Team Recognition Winner',
        KINY: 'Umurava AI Hackathon — Itsinda rya 4 ryahawe igihembo',
        FR: 'Umurava AI Hackathon — 4e équipe lauréate',
      },
      description: {
        EN: 'With team Innovatex, built TalentAI for “An Innovation Challenge to Build AI Products for the Human Resources Industry” and was recognised for the best HR-industry context and user experience — with priority vetting on the Umurava Talent Cloud.',
        KINY: 'Hamwe n’itsinda Innovatex, twubatse TalentAI mu irushanwa “An Innovation Challenge to Build AI Products for the Human Resources Industry”, duhabwa igihembo kubera gusobanukirwa neza urwego rw’abakozi (HR) n’uburambe bwiza bw’abakoresha — duhabwa n’amahirwe yo gusuzumwa mbere kuri Umurava Talent Cloud.',
        FR: 'Avec l’équipe Innovatex, création de TalentAI pour « An Innovation Challenge to Build AI Products for the Human Resources Industry », récompensée pour la meilleure compréhension du secteur RH et la meilleure expérience utilisateur — avec une évaluation prioritaire sur l’Umurava Talent Cloud.',
      },
      issuer: 'Umurava (now Competence by Jobra)',
      year: '2026',
      project: 'talentai',
      badge: '4th place',
    },
    {
      title: {
        EN: 'HATANA Hackathon - University of Rwanda',
        KINY: 'HATANA Hackathon - Kaminuza y u Rwanda',
        FR: 'Hackathon HATANA - Université du Rwanda',
      },
      description: {
        EN: 'Participated with team in HATANA hackathon organized by Mastercard and won a prize with MedLink.',
        KINY: 'Twafatanije muri HATANA hackathon yateguwe na Mastercard twigezeho igihembo hamwe na MedLink.',
        FR: 'Participation en équipe au hackathon HATANA organisé par Mastercard et gain d’un prix avec MedLink.',
      },
      issuer: 'Mastercard / University of Rwanda',
      year: '2025',
      project: 'medilink-rwanda',
      badge: 'Prize winner',
    },
    {
      title: {
        EN: 'I Star Hackathon Participant',
        KINY: 'Umunyamuryango wa I Star Hackathon',
        FR: 'Participant au Hackathon I Star',
      },
      description: {
        EN: 'Participated in I Star Hackathon and received certificate',
        KINY: 'Natanye muri I Star Hackathon maze nkagenerwa impamyabushobozi',
        FR: 'Participation au Hackathon I Star avec obtention d’un certificat',
      },
      issuer: 'I Star Hackathon',
      year: '2024',
    },
    {
      title: {
        EN: 'Cisco Cybersecurity Certificate',
        KINY: 'Impamyabushobozi ya Cisco mu Cyber Security',
        FR: 'Certificat Cisco en Cybersécurité',
      },
      description: {
        EN: 'Introduction to Cybersecurity - Cisco',
        KINY: 'Intangiriro ya Cyber Security - Cisco',
        FR: 'Introduction à la Cybersécurité - Cisco',
      },
      issuer: 'Cisco',
      year: '2024',
    },
    {
      title: {
        EN: 'FreeCodeCamp Responsive Web Design',
        KINY: 'Impamyabushobozi ya FreeCodeCamp mu Responsive Web Design',
        FR: 'Responsive Web Design - FreeCodeCamp',
      },
      description: {
        EN: 'Certified in responsive web design',
        KINY: 'Negukanye impamyabushobozi mu responsive web design',
        FR: 'Certifié en conception web responsive',
      },
      issuer: 'freeCodeCamp',
      year: '2023',
    },
    {
      title: {
        EN: 'Digital Marketing Certificate',
        KINY: 'Impamyabushobozi mu Digital Marketing',
        FR: 'Certificat en Marketing Digital',
      },
      description: {
        EN: 'UniAthena certification in digital marketing',
        KINY: 'Impamyabushobozi ya UniAthena mu digital marketing',
        FR: 'Certification UniAthena en marketing digital',
      },
      issuer: 'UniAthena',
      year: '2024',
    },
    {
      title: {
        EN: 'C# Fundamentals',
        KINY: 'Impamyabushobozi mu Bikorwa bya C#',
        FR: 'Fondamentaux C#',
      },
      description: {
        EN: 'freeCodeCamp certification in C# basics',
        KINY: 'Impamyabushobozi ya freeCodeCamp mu bikorwa bya C#',
        FR: 'Certification freeCodeCamp en bases de C#',
      },
      issuer: 'freeCodeCamp',
      year: '2023',
    },
  ],
  projects: [
    {
      name: 'TalentAI',
      category: 'AI',
      tech: ['Next.js', 'TypeScript', 'Node.js', 'MongoDB', 'Google Gemini'],
      link: 'https://github.com/kingblessolivier/Umurava-candidate-screening-system',
      demo: 'https://umurava-candidate-screening-system.vercel.app/',
      description: {
        EN: 'An AI hiring platform that screens, ranks and answers candidates with a Gemini pipeline — 4th Team Recognition Winner at the Umurava AI Hackathon.',
        KINY: 'Urubuga rukoresha AI mu gushaka abakozi: rusuzuma, rushyira ku rutonde kandi rusubiza abasaba, rwabaye itsinda rya 4 ryahawe igihembo muri Umurava AI Hackathon.',
        FR: 'Une plateforme de recrutement par IA qui filtre, classe et répond aux candidats via un pipeline Gemini — 4e équipe lauréate de l’Umurava AI Hackathon.',
      },
      caseStudy: {
        problem: {
          EN: 'Recruiters lose hours to manual resume screening, and the judgement that comes out of it is inconsistent between reviewers and hard to defend.',
          KINY: 'Abashaka abakozi bamara amasaha menshi basuzuma CV intoki, kandi ibyemezo bavamo ntibihuye hagati y’abasuzuma kandi biragoye kubisobanura.',
          FR: 'Les recruteurs perdent des heures à filtrer les CV manuellement, et le jugement qui en sort varie d’un évaluateur à l’autre et se défend mal.',
        },
        solution: {
          EN: 'A multi-stage Gemini pipeline: candidates arrive by form, CSV, Excel or PDF, are scored in parallel batches, then globally re-ranked so scores stay comparable across batches. Every score carries the reasoning behind it.',
          KINY: 'Sisitemu ikoresha Gemini mu byiciro: abasaba binjizwa banyuze ku ifishi, CSV, Excel cyangwa PDF, bagahabwa amanota mu matsinda icyarimwe, hanyuma bagashyirwa ku rutonde rusange kugira ngo amanota ahuze. Buri nota iza n’impamvu yayo.',
          FR: 'Un pipeline Gemini en plusieurs étapes : les candidats arrivent par formulaire, CSV, Excel ou PDF, sont notés par lots parallèles, puis reclassés globalement pour que les notes restent comparables. Chaque note est accompagnée de son raisonnement.',
        },
        role: {
          EN: 'Built with team Innovatex (Diane Uwamariya, Bugingo Innocent, Nizeyimana Elie). My part: the Next.js and TypeScript frontend on Vercel, the Node service on Render, the MongoDB models, the Gemini screening pipeline and the per-candidate email system.',
          KINY: 'Twarwubatse turi itsinda Innovatex (Diane Uwamariya, Bugingo Innocent, Nizeyimana Elie). Uruhare rwanjye: frontend ya Next.js na TypeScript kuri Vercel, serivisi ya Node kuri Render, imiterere ya MongoDB, sisitemu ya Gemini isuzuma, na sisitemu yohereza imeyili kuri buri musaba.',
          FR: 'Réalisé avec l’équipe Innovatex (Diane Uwamariya, Bugingo Innocent, Nizeyimana Elie). Ma part : le frontend Next.js et TypeScript sur Vercel, le service Node sur Render, les modèles MongoDB, le pipeline de filtrage Gemini et le système d’e-mails par candidat.',
        },
        architecture: ['Next.js on Vercel', 'Node + TypeScript on Render', 'MongoDB', 'Gemini screening pipeline', 'Batch scoring + global re-rank'],
        challenges: {
          EN: 'Keeping scores fair across batches, and keeping the model honest: the pipeline flags gender language, age indicators, institution prestige and name bias inside its own output, and surfaces unverified skills and employment gaps as explicit risks.',
          KINY: 'Kugumana amanota angana hagati y’amatsinda, no gutuma moderi iba indakemwa: sisitemu yerekana aho hari uburyo bubogamye ku gitsina, ku myaka, ku ishuri cyangwa ku mazina, kandi ikagaragaza ubumenyi butemejwe n’ibihe by’ubusa mu kazi.',
          FR: 'Garder des notes équitables entre les lots, et garder le modèle honnête : le pipeline signale le langage genré, les indices d’âge, le prestige des établissements et le biais de nom dans sa propre sortie, et fait remonter les compétences non vérifiées et les trous de parcours comme des risques explicites.',
        },
        impact: {
          EN: 'Screening that took hours returns a ranked shortlist in minutes, with strengths, gaps and interview questions per candidate — and a reasoning log a recruiter can audit rather than take on trust. The team placed 4th at the Umurava AI Hackathon, recognised for the best HR-industry context and user experience.',
          KINY: 'Isuzuma ryafataga amasaha ubu ritanga urutonde mu minota mike, hamwe n’imbaraga, icyuho n’ibibazo by’ikiganiro kuri buri musaba, n’inyandiko isobanura icyemezo ushobora kugenzura. Itsinda ryabaye irya 4 muri Umurava AI Hackathon, rihemberwa gusobanukirwa neza urwego rwa HR n’uburambe bwiza bw’abakoresha.',
          FR: 'Un filtrage qui prenait des heures rend une liste classée en quelques minutes, avec forces, lacunes et questions d’entretien par candidat — et un journal de raisonnement que le recruteur peut auditer plutôt que croire sur parole. L’équipe a terminé 4e de l’Umurava AI Hackathon, récompensée pour la meilleure compréhension du secteur RH et la meilleure expérience utilisateur.',
        },
      },
    },
    {
      name: 'FrameAfrica',
      category: 'Web',
      tech: ['Next.js', 'NestJS', 'PostgreSQL', 'Redis', 'Kubernetes'],
      link: 'https://github.com/kingblessolivier/FrameAfrica',
      description: {
        EN: 'A digital newspaper platform delivering AI-assisted news coverage across Rwanda and Africa — "News. Views. Africa."',
        KINY: 'Urubuga rw ikinyamakuru cya digitale rutanga amakuru afashijwe na AI mu Rwanda no muri Afurika — "News. Views. Africa."',
        FR: 'Une plateforme de journal numérique diffusant une actualité assistée par IA au Rwanda et en Afrique — « News. Views. Africa. »',
      },
      caseStudy: {
        problem: {
          EN: 'African audiences lacked a modern, fast news platform with local payment options and reliable content delivery at scale.',
          KINY: 'Abasomyi bo muri Afurika baburaga urubuga rugezweho rw amakuru rwihuta rufite uburyo bwo kwishyura bwo mu karere kandi rutanga ibintu ku rwego rwo hejuru.',
          FR: 'Le public africain manquait d’une plateforme d’actualité moderne et rapide, avec des paiements locaux et une diffusion de contenu fiable à grande échelle.',
        },
        solution: {
          EN: 'Built a scalable news platform with AI-assisted curation, editorial dashboards, full-text search, and mobile-money plus card payments.',
          KINY: 'Twubatse urubuga rw amakuru rwaguka rufite AI ifasha guhitamo, dashboards z abanditsi, ubushakashatsi bwuzuye, no kwishyura na mobile money na cards.',
          FR: 'Création d’une plateforme d’actualité évolutive avec curation assistée par IA, tableaux de bord éditoriaux, recherche plein texte et paiements mobile money et carte.',
        },
        role: {
          EN: 'Worked on the full-stack build — Next.js frontend, NestJS services, data modeling, and the containerized deployment setup.',
          KINY: 'Nakoze ku bwubatsi bwa full-stack — frontend ya Next.js, serivisi za NestJS, gukora data modeling, no gushyiraho deployment ikoresha containers.',
          FR: 'Participation au développement full-stack — frontend Next.js, services NestJS, modélisation des données et déploiement conteneurisé.',
        },
        architecture: ['Next.js Frontend', 'NestJS Services', 'PostgreSQL + Redis', 'Search (OpenSearch)', 'Kubernetes + CDN'],
        challenges: {
          EN: 'Integrating multiple local payment providers and keeping search and content delivery fast under a microservice architecture.',
          KINY: 'Guhuza abatanga uburyo bwo kwishyura benshi bo mu karere no kugumana ubushakashatsi n itangwa ry ibintu byihuta muri microservice architecture.',
          FR: 'Intégration de plusieurs fournisseurs de paiement locaux et maintien d’une recherche et d’une diffusion rapides sous une architecture microservices.',
        },
        impact: {
          EN: 'Delivered a production-grade, cloud-native foundation for regional news distribution with secure auth and multi-payment support.',
          KINY: 'Yatanze urwego rukomeye, rwa cloud-native rwo gukwirakwiza amakuru mu karere rufite umutekano wo kwinjira no kwishyura mu buryo bwinshi.',
          FR: 'Livraison d’une base cloud-native de niveau production pour la distribution d’actualité régionale, avec authentification sécurisée et paiements multiples.',
        },
      },
    },
    {
      name: 'MediLink Rwanda',
      category: 'HealthTech',
      tech: ['Django REST', 'PostgreSQL (RLS)', 'React', 'TypeScript', 'Flutter', 'Redis + Celery'],
      link: 'https://github.com/kingblessolivier/medilink-rwanda',
      demo: 'https://medilink-rwanda.vercel.app/',
      description: {
        EN: 'Healthcare access made predictable: find a facility that accepts your insurance, book or join the queue remotely and follow your turn — while facilities run the whole visit, from reception to receipt, electronically.',
        KINY: 'Kugera kwa muganga mu buryo buteganyijwe: shaka ivuriro ryakira ubwishingizi bwawe, fata umwanya cyangwa winjire ku murongo uri kure kandi ukurikirane igihe cyawe — mu gihe ibigo bikora urugendo rwose rw’umurwayi, kuva yakirwa kugeza ahawe inyemezabwishyu, mu buryo bw’ikoranabuhanga.',
        FR: 'Un accès aux soins prévisible : trouver un établissement qui accepte votre assurance, réserver ou rejoindre la file à distance et suivre votre tour — pendant que l’établissement gère toute la visite, de l’accueil au reçu, en numérique.',
      },
      caseStudy: {
        problem: {
          EN: 'Patients at Rwandan health facilities wait three to four hours to be seen. They travel without knowing whether the facility accepts their insurance (Mutuelle, RAMA/RSSB, MMI), what they will pay, or how long the queue is — and facilities still run visits on paper registers.',
          KINY: 'Abarwayi bo mu bigo nderabuzima byo mu Rwanda bategereza amasaha atatu kugeza ku ane. Bagenda batazi niba ikigo cyakira ubwishingizi bwabo (Mutuelle, RAMA/RSSB, MMI), ayo bazishyura, cyangwa uburebure bw’umurongo — kandi ibigo biracyandika abarwayi mu bitabo.',
          FR: 'Les patients des établissements de santé rwandais attendent trois à quatre heures. Ils se déplacent sans savoir si l’établissement accepte leur assurance (Mutuelle, RAMA/RSSB, MMI), ce qu’ils paieront ni la longueur de la file — et les établissements tiennent encore des registres papier.',
        },
        solution: {
          EN: 'A two-sided platform. Facilities onboard their staff and run reception, walk-ins, the live queue with triage and lab loop, consultation records, prescriptions, dispensing, billing and disputes. Patients see that data as insurance acceptance, bookable slots and their live place in the queue, on the web PWA or the Android app.',
          KINY: 'Urubuga rw’impande ebyiri. Ibigo byandika abakozi babyo kandi bigakora kwakira abarwayi, abaje batafashe umwanya, umurongo uriho n’isuzuma ry’ibanze na laboratwari, inyandiko z’isuzuma, imiti yandikwa n’itangwa, kwishyuza n’ibibazo. Abarwayi babona ayo makuru nk’ubwishingizi bwakirwa, imyanya yo gufata n’umwanya bariho ku murongo, kuri PWA cyangwa kuri porogaramu ya Android.',
          FR: 'Une plateforme à deux faces. Les établissements intègrent leur personnel et gèrent l’accueil, les visites sans rendez-vous, la file en direct avec triage et circuit labo, les dossiers de consultation, prescriptions, dispensation, facturation et litiges. Les patients voient ces données comme l’acceptation de leur assurance, des créneaux réservables et leur place en file, sur la PWA ou l’app Android.',
        },
        role: {
          EN: 'Co-built with Innocent Bugingo; I wrote most of the code (166 commits): the staff and patient web apps, the shared UI kit and API client, the Flutter patient screens, and the Django scheduling, patients, visits, clinical and facilities modules.',
          KINY: 'Nubatse uyu mushinga hamwe na Innocent Bugingo; nanditse igice kinini cya kode (commits 166): porogaramu za web z’abakozi n’iz’abarwayi, ibikoresho bya UI bisangiwe na API client, amapaji ya porogaramu ya Flutter y’abarwayi, n’ibice bya Django bya gahunda, abarwayi, gusura, ubuvuzi n’ibigo.',
          FR: 'Co-construit avec Innocent Bugingo ; j’ai écrit l’essentiel du code (166 commits) : les applications web personnel et patient, le kit UI et le client API partagés, les écrans patient Flutter, et les modules Django planification, patients, visites, clinique et établissements.',
        },
        architecture: ['Patient PWA + staff web (React, TypeScript)', 'Android patient app (Flutter)', 'Django REST API + WebSockets', 'PostgreSQL with row-level security', 'Redis + Celery background jobs'],
        challenges: {
          EN: 'The queue number only exists if reception enters it, so the facility side had to be built before the patient app. Patient data is protected in the database itself with PostgreSQL row-level security, and the API is tested against it in CI.',
          KINY: 'Nimero yo ku murongo ibaho gusa iyo uwakira abarwayi ayanditse, bityo uruhande rw’ibigo rwagombaga kubakwa mbere ya porogaramu y’abarwayi. Amakuru y’abarwayi arindirwa muri database ubwayo hakoreshejwe row-level security ya PostgreSQL, kandi API igeragezwa kuri yo muri CI.',
          FR: 'Le numéro de file n’existe que si l’accueil le saisit : le côté établissement devait précéder l’application patient. Les données patients sont protégées dans la base elle-même par la sécurité au niveau des lignes de PostgreSQL, et l’API est testée contre elle en CI.',
        },
        impact: {
          EN: 'Every web-MVP sprint is built — onboarding, live queue, booking, clinical records, pharmacy, billing, notifications, disputes, the admin console, the public site and the Android app — with a live demo. A Rwandan staging environment and clinical sign-off come next.',
          KINY: 'Ibyiciro byose bya MVP ya web byararangiye — kwiyandikisha, umurongo uriho, gufata umwanya, inyandiko z’ubuvuzi, farumasi, kwishyuza, imenyesha, ibibazo, igice cy’ubuyobozi, urubuga rusange na porogaramu ya Android — kandi hari demo ikora. Hakurikiraho gushyira sisitemu ku mbuga zo mu Rwanda no kwemezwa n’abaganga.',
          FR: 'Tous les sprints du MVP web sont livrés — intégration, file en direct, réservation, dossiers cliniques, pharmacie, facturation, notifications, litiges, console d’administration, site public et app Android — avec une démo en ligne. Prochaines étapes : un environnement de préproduction au Rwanda et la validation clinique.',
        },
      },
    },
    {
      name: 'Urugwiro',
      category: 'PropTech',
      tech: ['Django REST', 'React', 'TypeScript', 'PostgreSQL', 'Channels', 'NVIDIA NIM'],
      link: 'https://github.com/kingblessolivier/urugwiro',
      demo: 'https://urugwiro-frontend.vercel.app/',
      description: {
        EN: 'A real-estate platform for Rwanda: property discovery, seller onboarding, CRM, field work, finances and private document signing, with an AI assistant that answers from live records.',
        KINY: 'Urubuga rw’imitungo itimukanwa mu Rwanda: gushakisha imitungo, kwandika abagurisha, CRM, imirimo yo ku butaka, imari no gusinya inyandiko mu ibanga, hamwe n’umufasha wa AI usubiza akoresheje amakuru ari muri sisitemu.',
        FR: 'Une plateforme immobilière pour le Rwanda : recherche de biens, intégration des vendeurs, CRM, travail de terrain, finances et signature privée de documents, avec un assistant IA qui répond à partir des données réelles.',
      },
      caseStudy: {
        problem: {
          EN: 'A property business ran listings, sellers, buyers, agents, money and contracts across separate tools, so no one had a single view of a deal and signed documents were hard to keep private.',
          KINY: 'Ikigo gicuruza imitungo cyakoreshaga ibikoresho bitandukanye ku mitungo, abagurisha, abaguzi, abakozi, amafaranga n’amasezerano, bityo nta muntu wabonaga isoko ryose hamwe kandi inyandiko zasinywe zari zigoye kurinda.',
          FR: 'Une agence immobilière gérait annonces, vendeurs, acheteurs, agents, argent et contrats dans des outils séparés : personne n’avait de vue unique sur une affaire, et les documents signés étaient difficiles à protéger.',
        },
        solution: {
          EN: 'One platform with role-based workspaces for customers, sellers, agents, operations and finance; a property page that shows each deal’s stage, people, offers, visits, commission and documents; and a private signing flow with audit events.',
          KINY: 'Urubuga rumwe rufite ibice bitandukanye ku bakiriya, abagurisha, abakozi, ibikorwa n’imari; ipaji ya buri mutungo yerekana aho isoko rigeze, abantu, ibyifuzo, gusura, komisiyo n’inyandiko; n’uburyo bwo gusinya mu ibanga bubika ibyabaye byose.',
          FR: 'Une seule plateforme avec des espaces par rôle pour clients, vendeurs, agents, opérations et finance ; une page par bien montrant l’étape, les personnes, offres, visites, commission et documents ; et un circuit de signature privé avec journal d’audit.',
        },
        role: {
          EN: 'Built the Django REST API and the React + TypeScript app, the private document storage and signing lifecycle, and the AI assistant’s permission-scoped database tools.',
          KINY: 'Nubatse API ya Django REST na porogaramu ya React + TypeScript, ububiko bw’inyandiko bwihariye n’uburyo bwo kuzisinya, n’ibikoresho by’umufasha wa AI bigera ku makuru hakurikijwe uburenganzira.',
          FR: 'Réalisation de l’API Django REST et de l’application React + TypeScript, du stockage privé et du cycle de signature des documents, et des outils de base de données de l’assistant IA, limités par permissions.',
        },
        architecture: ['React + TypeScript SPA on Vercel', 'Django REST API on Railway', 'PostgreSQL', 'Channels + Redis', 'Private document storage + signing', 'AI assistant (NVIDIA NIM, MCP tools)'],
        challenges: {
          EN: 'Letting an AI assistant answer from live business data without leaking it: every tool is read-only and scoped to what the asking user may see, and its suggestions are reviewed by staff before they are applied.',
          KINY: 'Gutuma umufasha wa AI asubiza akoresheje amakuru y’ikigo atayasohora: buri gikoresho gisoma gusa kandi kigarukira ku byo ubaza yemerewe kubona, kandi ibyo atanga bisuzumwa n’abakozi mbere yo gushyirwa mu bikorwa.',
          FR: 'Laisser un assistant IA répondre à partir des données métier sans les divulguer : chaque outil est en lecture seule et limité à ce que l’utilisateur peut voir, et ses suggestions sont validées par l’équipe avant d’être appliquées.',
        },
        impact: {
          EN: 'Live in production, with support in Kinyarwanda, English, French and Swahili, and one shared record of every property from listing to signed transfer.',
          KINY: 'Irakora ku mugaragaro, ifasha mu Kinyarwanda, Icyongereza, Igifaransa n’Igiswahili, kandi ifite inyandiko imwe ya buri mutungo kuva ushyizwe ku isoko kugeza uhererekanyijwe.',
          FR: 'En production, avec un support en kinyarwanda, anglais, français et swahili, et un dossier unique pour chaque bien, de l’annonce au transfert signé.',
        },
      },
    },
    {
      name: 'CineRec',
      category: 'AI',
      tech: ['Python', 'Django', 'ML'],
      link: 'https://github.com/kingblessolivier/CineRec',
      description: {
        EN: 'Movie recommendation system using machine learning with dashboards.',
        KINY: 'Sisitemu itanga inama za filime hifashishijwe machine learning na dashboards.',
        FR: 'Système de recommandation de films avec machine learning et tableaux de bord.',
      },
      caseStudy: {
        problem: {
          EN: 'Users struggled to discover relevant movies quickly.',
          KINY: 'Abakoresha bagiraga ikibazo cyo kubona filime zijyanye n ibyo bakunda vuba.',
          FR: 'Les utilisateurs trouvaient difficile de découvrir rapidement les films pertinents.',
        },
        solution: {
          EN: 'Built a recommendation engine with preference signals and trend-aware suggestions.',
          KINY: 'Nubatse recommendation engine ikoresha preferences n ibigezweho.',
          FR: 'Moteur de recommandation basé sur préférences et tendances.',
        },
        role: {
          EN: 'Developed recommendation logic, API, and performance dashboard.',
          KINY: 'Nakoze logic ya recommendation, API, na dashboard y imikorere.',
          FR: 'Développement logique recommandation, API et dashboard de performance.',
        },
        architecture: ['User Signal Collector', 'Recommendation Engine', 'Django API', 'Analytics Dashboard'],
        challenges: {
          EN: 'Cold-start recommendations and balancing relevance with diversity.',
          KINY: 'Cold-start no guhuza relevance n diversity.',
          FR: 'Problème de cold start et équilibre pertinence/diversité.',
        },
        impact: {
          EN: 'Improved navigation confidence and reduced random browsing behavior.',
          KINY: 'Yafashije abakoresha gufata ibyemezo vuba no kugabanya gutembera nta ntego.',
          FR: 'Amélioration de la confiance de navigation et réduction du parcours aléatoire.',
        },
      },
    },
    {
      name: 'Property Management System',
      category: 'Web',
      tech: ['Django', 'PostgreSQL'],
      link: 'https://github.com/kingblessolivier/Property_management',
      demo: 'https://afrimaster.pythonanywhere.com/',
      description: {
        EN: 'System for managing tenants, rent, and property records.',
        KINY: 'Sisitemu yo gucunga abakodesha, ubwishyu, n amakuru y inzu.',
        FR: 'Système de gestion des locataires, loyers et biens immobiliers.',
      },
      caseStudy: {
        problem: {
          EN: 'Landlords tracked payments and tenant records manually.',
          KINY: 'Abafite inzu bakoreshaga uburyo bw intoki mu gukurikirana ubwishyu n amakuru y abakodesha.',
          FR: 'Les propriétaires suivaient paiements et dossiers locataires manuellement.',
        },
        solution: {
          EN: 'Created a centralized dashboard for rents, tenant profiles, and property history.',
          KINY: 'Nashyizeho dashboard imwe ihuza ubwishyu, profile z abakodesha, n amateka y inzu.',
          FR: 'Tableau centralisé pour loyers, profils locataires et historique immobilier.',
        },
        role: {
          EN: 'Led backend models, auth rules, and payment tracking workflows.',
          KINY: 'Nari nshinzwe models za backend, amategeko ya authentication, na workflows zo gukurikirana ubwishyu.',
          FR: 'Conduite des modèles backend, règles d’authentification et suivi des paiements.',
        },
        architecture: ['Tenant UI', 'Django Services', 'PostgreSQL', 'Notification Jobs'],
        challenges: {
          EN: 'Maintaining data consistency across tenant and billing updates.',
          KINY: 'Kubungabunga consistency y amakuru hagati y abakodesha n ubwishyu.',
          FR: 'Maintenir la cohérence des données entre locataires et facturation.',
        },
        impact: {
          EN: 'Improved clarity of rent status and reduced missed follow-ups.',
          KINY: 'Yorohereje kumenya status y ubwishyu no kugabanya follow-ups zibura.',
          FR: 'Amélioration de la visibilité des loyers et réduction des suivis manques.',
        },
      },
    },
    {
      name: 'Citizen Engagement System',
      category: 'Web',
      tech: ['Django', 'REST API'],
      link: 'https://github.com/kingblessolivier/citizen_engagement_system',
      demo: 'https://citizenmanagement.pythonanywhere.com/',
      description: {
        EN: 'Platform connecting citizens with public services and feedback systems.',
        KINY: 'Urubuga ruhuza abaturage na serivisi za leta n uburyo bwo gutanga ibitekerezo.',
        FR: 'Plateforme reliant citoyens, services publics et système de feedback.',
      },
      caseStudy: {
        problem: {
          EN: 'Citizen feedback channels were fragmented and hard to track.',
          KINY: 'Inzira zo gutanga ibitekerezo zari zitandukanye kandi bigoye gukurikirana.',
          FR: 'Les canaux de feedback citoyen étaient fragmentés et difficiles a suivre.',
        },
        solution: {
          EN: 'Built a unified ticket and response workflow between citizens and service teams.',
          KINY: 'Nubatse workflow imwe ya tickets n ibisubizo hagati y abaturage n amakipe ya serivisi.',
          FR: 'Workflow unique de tickets et réponses entre citoyens et services.',
        },
        role: {
          EN: 'Designed APIs, case lifecycle rules, and role-based access controls.',
          KINY: 'Nateguye APIs, amategeko y ubuzima bwa case, na role-based access.',
          FR: 'Conception APIs, cycle de vie des cas et contrôle d’accès par rôle.',
        },
        architecture: ['Citizen Portal', 'Case API', 'Workflow Engine', 'Admin Resolution Panel'],
        challenges: {
          EN: 'Designing transparent status updates for different user groups.',
          KINY: 'Gutegura updates za status zisobanutse ku byiciro bitandukanye by abakoresha.',
          FR: 'Concevoir des mises à jour de statut transparentes pour differents profils.',
        },
        impact: {
          EN: 'Enabled clearer communication between citizens and service operators.',
          KINY: 'Yafashije itumanaho risobanutse hagati y abaturage n abatanga serivisi.',
          FR: 'A permis une communication plus claire entre citoyens et opérateurs publics.',
        },
      },
    },
    {
      name: 'ClassHub',
      category: 'Web',
      tech: ['Django', 'MySQL'],
      link: 'https://github.com/kingblessolivier/ClassHub',
      description: {
        EN: 'Student assignment submission and academic management system.',
        KINY: 'Sisitemu yohereza assignments no gucunga ibikorwa by amashuri.',
        FR: 'Système de soumission des devoirs et gestion académique.',
      },
      caseStudy: {
        problem: {
          EN: 'Assignment workflows were inconsistent across classes.',
          KINY: 'Uburyo bwo kohereza assignments bwari butandukanye mu masomo atandukanye.',
          FR: 'Les workflows de devoirs étaient incohérents entre classes.',
        },
        solution: {
          EN: 'Developed a unified submission, grading, and feedback workflow.',
          KINY: 'Nubatse uburyo bumwe bwo kohereza, gutanga amanota, no gutanga feedback.',
          FR: 'Workflow unifié de soumission, notation et feedback.',
        },
        role: {
          EN: 'Implemented data model, instructor tools, and student assignment flow.',
          KINY: 'Nashyize mu bikorwa data model, ibikoresho by abarimu, n uburyo bw abanyeshuri.',
          FR: 'Implémentation du modèle de données, outils enseignants et parcours étudiant.',
        },
        architecture: ['Student Interface', 'Assignment Service', 'MySQL Storage', 'Instructor Dashboard'],
        challenges: {
          EN: 'Handling deadlines, versioning, and feedback history cleanly.',
          KINY: 'Gucunga deadlines, versions, n amateka ya feedback neza.',
          FR: 'Gérer échéances, versions et historique de feedback proprement.',
        },
        impact: {
          EN: 'Improved assignment visibility for both students and instructors.',
          KINY: 'Yongereye kugaragara kw ibikorwa ku banyeshuri n abarimu.',
          FR: 'Amélioration de la visibilité des devoirs pour étudiants et enseignants.',
        },
      },
    },
  ],
  gallery: [
    {
      title: {
        EN: 'I Star Hackathon Certificate Moment',
        KINY: 'Igihe cy Impamyabushobozi ya I Star Hackathon',
        FR: 'Moment du Certificat Hackathon I Star',
      },
      image: '/Olivier_istar_hackton_cerificate.webp',
      category: 'Hackathons',
    },
    {
      title: {
        EN: 'Coding Session with Team',
        KINY: 'Igihe cyo Gukora Code hamwe n Itsinda',
        FR: 'Session de Codage en Équipe',
      },
      image: '/coding_session.webp',
      category: 'Projects',
    },
    {
      title: {
        EN: 'Portfolio Profile Event Shot',
        KINY: 'Ifoto yo mu Birori bya Portfolio',
        FR: 'Photo lors d’un Événement Portfolio',
      },
      image: '/olivier_image.webp',
      category: 'Events',
    },
  ],
  systemDesign: {
    frontend: ['React UI', 'Routing', 'State + Form UX', 'Client-side validation'],
    backend: ['Django REST APIs', 'Auth & RBAC', 'Business logic services', 'Async workers'],
    data: ['PostgreSQL/MySQL', 'Feature extraction', 'Model inference', 'Monitoring insights'],
  },
  vision: {
    statement: {
      EN: 'My vision is to build intelligent and scalable systems that transform industries in Africa and beyond.',
      KINY: 'Intego yanjye ni ukubaka sisitemu zifite ubwenge, zishobora kwaguka, kandi zihinduye ubukungu bwa Afrika n isi yose.',
      FR: 'Ma vision est de construire des systèmes intelligents et évolutifs qui transforment les industries en Afrique et au-delà.',
    },
  },
}

export const uiContent = i18n

export const personalInfo = portfolioData.personal

export const labels = Object.fromEntries(
  languages.map((lang) => [
    lang,
    {
      ...i18n[lang].nav,
      visitors: i18n[lang].hero.visitors,
      viewProjects: i18n[lang].hero.viewProjects,
      contactMe: i18n[lang].hero.contactMe,
      signatureTag: i18n[lang].hero.signatureTag,
      coreFocusLabel: i18n[lang].hero.coreFocusLabel,
      coreFocusValue: i18n[lang].hero.coreFocusValue,
      visionLabel: i18n[lang].hero.visionLabel,
      projectsLabel: i18n[lang].hero.projectsLabel,
      systemsLabel: i18n[lang].hero.systemsLabel,
      certificatesLabel: i18n[lang].hero.certificatesLabel,
      heroHeadline: i18n[lang].hero.headline,
      availableForWork: i18n[lang].hero.availableForWork,
      visionStatement: portfolioData.vision.statement[lang],
      roleLines: i18n[lang].hero.roleLines,
    },
  ]),
)

export const aboutContent = {
  EN: portfolioData.personal.story.EN,
  KINY: portfolioData.personal.story.KINY,
  FR: portfolioData.personal.story.FR,
}

export const projects = portfolioData.projects

export const skills = {
  Frontend: portfolioData.skills.frontend,
  Backend: portfolioData.skills.backend,
  Database: portfolioData.skills.databases,
  'AI/ML': portfolioData.skills.ai_ml,
  DevOps: portfolioData.skills.devops,
  Mobile: portfolioData.skills.mobile,
  Other: portfolioData.skills.other,
  Professional: portfolioData.skills.professional,
}

export const awards = portfolioData.achievements

export const galleryImages = portfolioData.gallery

export const contactInfo = {
  email: portfolioData.personal.email,
  phone: portfolioData.personal.phone,
  whatsapp: portfolioData.personal.whatsapp,
}

export const socialLinks = portfolioData.social
