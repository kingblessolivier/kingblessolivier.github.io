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
    hackathons: 2,
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
    other: [
      { name: 'C#', level: 72 },
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
      name: 'MedLink System',
      category: 'HealthTech',
      tech: ['React', 'Django', 'PostgreSQL', 'Maps API'],
      link: 'https://github.com/kingblessolivier/medlink-system',
      description: {
        EN: 'A platform that helps patients book doctor appointments and find nearby hospitals without waiting in long queues.',
        KINY: 'Urubuga rufasha abantu gufata rendez-vous kwa muganga no kubona ibitaro bibari hafi batarinze gutonda imirongo miremire.',
        FR: 'Une plateforme qui aide les patients à réserver des rendez-vous médicaux et trouver les hôpitaux proches sans longues files d’attente.',
      },
      caseStudy: {
        problem: {
          EN: 'Patients were spending too much time in hospital queues just to secure appointments or basic guidance.',
          KINY: 'Abarwayi batakarizaga igihe kinini mu mirongo y ibitaro bashaka appointment cyangwa amakuru y ibanze.',
          FR: 'Les patients perdaient beaucoup de temps dans les files d’hôpitaux pour obtenir un rendez-vous ou des informations de base.',
        },
        solution: {
          EN: 'Built MedLink to support appointment booking, hospital discovery by proximity, and faster navigation to care services.',
          KINY: 'Twubatse MedLink ifasha gufata appointment, kubona ibitaro byegereye umuntu, no kugera kuri serivisi z ubuvuzi byihuse.',
          FR: 'Création de MedLink pour la réservation de rendez-vous, la recherche d’hôpitaux proches et un accès plus rapide aux soins.',
        },
        role: {
          EN: 'Contributed to product design, backend API flows, and end-to-end user journey optimization with my team.',
          KINY: 'Natanze uruhare muri product design, backend API flows, no kunoza urugendo rw umukoresha hamwe n itsinda ryanjye.',
          FR: 'Contribution au design produit, aux flux API backend et à l’optimisation du parcours utilisateur avec mon équipe.',
        },
        architecture: ['Client App', 'Appointment API', 'Hospital Locator Service', 'PostgreSQL'],
        challenges: {
          EN: 'Ensuring reliable booking flow while keeping location-based results fast and accurate.',
          KINY: 'Kugira booking flow yizewe no gutanga ibisubizo by aho ibitaro biri vuba kandi neza.',
          FR: 'Assurer un flux de réservation fiable tout en gardant des résultats géolocalisés rapides et précis.',
        },
        impact: {
          EN: 'The project won a prize and demonstrated a practical path to reducing wait-time pressure in healthcare access.',
          KINY: 'Uyu mushinga wegukanye igihembo kandi werekanye uburyo bufatika bwo kugabanya igihe cyo gutegereza muri serivisi z ubuvuzi.',
          FR: 'Le projet a remporté un prix et a démontré une voie concrète pour réduire l’attente dans l’accès aux soins.',
        },
      },
    },
    {
      name: 'Candidate Screening System',
      category: 'AI',
      tech: ['Python', 'Django', 'AI/ML'],
      link: 'https://github.com/kingblessolivier/candidate_screening_system',
      description: {
        EN: 'AI-powered system for HR recruitment automation and candidate evaluation.',
        KINY: 'Sisitemu ifashwa na AI yihutisha kwakira no gusuzuma abakandida.',
        FR: 'Système basé sur IA pour automatiser le tri des candidats en recrutement.',
      },
      caseStudy: {
        problem: {
          EN: 'Manual CV review was slow and inconsistent for recruitment teams.',
          KINY: 'Gusoma CV intoki byafataga igihe kinini kandi bitangira ibisubizo bitandukana.',
          FR: 'La revue manuelle des CV était lente et peu cohérente.',
        },
        solution: {
          EN: 'Built a scoring pipeline that extracts profile signals and ranks candidates by fit.',
          KINY: 'Nubatse pipeline isuzuma amakuru yingenzi maze ikagena urutonde rw abakandida.',
          FR: 'Création d’un pipeline de scoring qui extrait les signaux et classe les profils.',
        },
        role: {
          EN: 'Designed backend logic, ranking API, and recruiter dashboard integration.',
          KINY: 'Nateguye logic ya backend, ranking API, no guhuza dashboard y abashaka abakozi.',
          FR: 'Conception de la logique backend, API de classement et intégration dashboard.',
        },
        architecture: ['Django API', 'Scoring Service', 'PostgreSQL', 'Dashboard Client'],
        challenges: {
          EN: 'Balancing fairness, explainability, and ranking speed.',
          KINY: 'Guhuza ubutabera, gusobanurira neza ibisubizo, n umuvuduko.',
          FR: 'Équilibrer équité, explicabilité et rapidité du classement.',
        },
        impact: {
          EN: 'Improved recruiter workflow consistency and reduced repetitive screening effort.',
          KINY: 'Yongereye consistency mu kazi k abashaka abakozi kandi igabanya imirimo yisubiramo.',
          FR: 'Amélioration de la cohérence du workflow et réduction du tri répétitif.',
        },
      },
    },
    {
      name: 'AI Profile Screening System',
      category: 'AI',
      tech: ['Python', 'Machine Learning'],
      link: 'https://github.com/kingblessolivier/Ai-Profile-Screening-System',
      description: {
        EN: 'Machine learning system for analyzing and ranking candidate profiles.',
        KINY: 'Sisitemu ya ML isesengura profile z abakandida ikazishyira ku rutonde.',
        FR: 'Système ML pour analyser et classer les profils candidats.',
      },
      caseStudy: {
        problem: {
          EN: 'Recruiters needed structured profile comparison rather than subjective sorting.',
          KINY: 'Abashaka abakozi bakeneye uburyo bushingiye ku bipimo aho guhitamo ku marangamutima.',
          FR: 'Besoin d’une comparaison structurée des profils au lieu d’un tri subjectif.',
        },
        solution: {
          EN: 'Implemented feature extraction and weighted ranking based on role requirements.',
          KINY: 'Nashyizeho extraction y ibimenyetso no ranking ishingiye ku bisabwa n akazi.',
          FR: 'Mise en place d’extraction de features et de classement pondéré par rôle.',
        },
        role: {
          EN: 'Owned data preparation, model experimentation, and API output format.',
          KINY: 'Nari nshinzwe gutegura data, kugerageza model, no gutunganya output ya API.',
          FR: 'Responsable préparation des données, expérimentation modèle et format API.',
        },
        architecture: ['Data Preprocessor', 'ML Ranker', 'Inference API', 'Result Renderer'],
        challenges: {
          EN: 'Handling incomplete resumes and ensuring stable ranking behavior.',
          KINY: 'Gucunga CV zituzuye no gutanga ranking ihamye.',
          FR: 'Gestion de CV incomplets et stabilité du classement.',
        },
        impact: {
          EN: 'Provided clearer candidate prioritization for interview decisions.',
          KINY: 'Yatanze uburyo busobanutse bwo gushyira imbere abakandida mu guhamagara interviews.',
          FR: 'A fourni une priorisation plus claire pour les décisions d’entretien.',
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
