/**
 * Single source of truth for all portfolio content.
 * Update facts (dates, stats, testimonials, links) here — the UI reads
 * everything from this file.
 */

export const SITE = {
  name: "Thushan Vithana",
  firstName: "Thushan",
  lastName: "Vithana",
  role: "Software Engineer",
  company: "Azend Technologies",
  location: "Colombo, Sri Lanka",
  email: "thushan.v@azendtech.com",
  url: "https://thushanvithana2.vercel.app",
  githubUser: "thushanvithana",
  description:
    "Full-stack software engineer crafting fast, elegant products with .NET, React and Next.js — where engineering precision meets expressive, tactile interfaces.",
  tagline: "I build at the seam where engineering precision meets expressive, tactile interfaces.",
  socials: {
    github: "https://github.com/thushanvithana",
    // TODO: confirm LinkedIn handle
    linkedin: "https://www.linkedin.com/in/thushanvithana",
    twitter: "https://twitter.com/VithanaThushan",
    youtube: "https://www.youtube.com/@ThushanVithana",
  },
  resume: "/Thushan-Vithana-Resume.pdf",
} as const;

/* ---------------------------------- Hero ---------------------------------- */

// Update these as they grow.
export const STATS = [
  { label: "Years of Experience", value: 2, suffix: "+" },
  { label: "Projects Completed", value: 15, suffix: "+" },
  { label: "Technologies", value: 20, suffix: "+" },
  { label: "GitHub Contributions", value: 800, suffix: "+" },
] as const;

export const HERO_CODE = [
  "const engineer = {",
  '  name: "Thushan Vithana",',
  '  stack: [".NET", "React", "Next.js"],',
  '  focus: "shipping polished products",',
  "  coffee: Infinity,",
  "};",
  "",
  "while (engineer.isAwake()) {",
  "  engineer.build();",
  "  engineer.refine();",
  "}",
] as const;

export const FLOATING_TECH = ["C#", ".NET", "TS", "React", "Next", "Azure", "SQL", "Docker"] as const;

/* --------------------------------- About ---------------------------------- */

export const ABOUT = {
  intro:
    "I'm an Associate Software Engineer at Azend Technologies, building full-stack products end to end — .NET and ASP.NET Core services on the backend, React and Next.js experiences on the front. I care about the whole surface of software: the architecture underneath, the milliseconds in between, and the pixels on top.",
  journey:
    "My path started with C++ and classic design patterns, wandered through the MERN stack, and matured into shipping production systems with C#, SQL Server and Azure. Along the way I fell for the edges of the craft — real-time graphics, motion design, and the open-source ethos of GNU/Linux and the Free Software community.",
  philosophy:
    "Code as craft. Restraint as luxury. I believe the best software feels inevitable — fast by default, obvious to use, and quietly beautiful. Every abstraction should earn its place, and every animation should serve the story.",
  facts: [
    { icon: "Terminal", text: "GNU/Linux & Free Software enthusiast" },
    { icon: "Boxes", text: "Design-pattern nerd since my first C++ project" },
    { icon: "Sparkles", text: "Builds 3D & motion experiments with Three.js and GSAP" },
    { icon: "Video", text: "Shares dev content on YouTube" },
  ],
  timeline: [
    {
      year: "2021",
      title: "First lines of code",
      text: "Started with C++ and object-oriented design — built a hotel management system on classic design patterns.",
    },
    {
      year: "2022",
      title: "Full-stack awakening",
      text: "Went deep on JavaScript and the MERN stack, shipping end-to-end web applications.",
    },
    {
      year: "2023",
      title: "Production systems",
      text: "Built Scholar, a school-management platform — React + Material UI over a C#/.NET server.",
    },
    {
      year: "2024",
      title: "Azend Technologies",
      text: "Joined as Associate Software Engineer — .NET, ASP.NET Core, SQL Server and Azure in production.",
    },
    {
      year: "Now",
      title: "Craft & motion",
      text: "Pushing the seam between engineering and design — performance, interaction and polish.",
    },
  ],
} as const;

/* --------------------------------- Skills --------------------------------- */

export type Skill = { name: string; level: number };
export type SkillCategory = { id: string; label: string; icon: string; accent: string; skills: Skill[] };

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "frontend",
    label: "Frontend",
    icon: "Monitor",
    accent: "#3b82f6",
    skills: [
      { name: "React", level: 92 },
      { name: "Next.js", level: 88 },
      { name: "TypeScript", level: 88 },
      { name: "JavaScript", level: 92 },
      { name: "HTML & CSS", level: 94 },
      { name: "Tailwind CSS", level: 90 },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    icon: "Server",
    accent: "#22d3ee",
    skills: [
      { name: "C#", level: 90 },
      { name: "ASP.NET Core", level: 88 },
      { name: "Entity Framework", level: 85 },
      { name: "Node.js", level: 84 },
      { name: "REST APIs", level: 92 },
      { name: "Python", level: 78 },
    ],
  },
  {
    id: "mobile",
    label: "Mobile",
    icon: "Smartphone",
    accent: "#a78bfa",
    skills: [
      { name: "React Native", level: 78 },
      { name: "Responsive Design", level: 92 },
      { name: "PWA", level: 80 },
    ],
  },
  {
    id: "cloud",
    label: "Cloud",
    icon: "Cloud",
    accent: "#34d399",
    skills: [
      { name: "Azure", level: 82 },
      { name: "Firebase", level: 80 },
      { name: "Vercel", level: 88 },
      { name: "Fly.io", level: 76 },
    ],
  },
  {
    id: "devops",
    label: "DevOps",
    icon: "Workflow",
    accent: "#3b82f6",
    skills: [
      { name: "Docker", level: 82 },
      { name: "Git & GitHub", level: 92 },
      { name: "CI/CD", level: 80 },
      { name: "Linux", level: 86 },
    ],
  },
  {
    id: "databases",
    label: "Databases",
    icon: "Database",
    accent: "#22d3ee",
    skills: [
      { name: "SQL Server", level: 88 },
      { name: "MongoDB", level: 84 },
      { name: "PostgreSQL", level: 76 },
      { name: "Firestore", level: 80 },
    ],
  },
  {
    id: "testing",
    label: "Testing",
    icon: "FlaskConical",
    accent: "#a78bfa",
    skills: [
      { name: "xUnit", level: 84 },
      { name: "NUnit", level: 82 },
      { name: "Jest", level: 78 },
      { name: "Postman", level: 88 },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    icon: "Wrench",
    accent: "#34d399",
    skills: [
      { name: "Visual Studio", level: 90 },
      { name: "VS Code", level: 94 },
      { name: "Figma", level: 76 },
      { name: "Three.js / GSAP", level: 78 },
    ],
  },
];

/* -------------------------------- Projects -------------------------------- */

export type Project = {
  slug: string;
  name: string;
  description: string;
  features: string[];
  stack: string[];
  github: string;
  demo?: string;
  featured?: boolean;
};

export const PROJECTS: Project[] = [
  {
    slug: "scholar",
    name: "Scholar Web App",
    description:
      "A school-management platform — React + Material UI dashboard backed by a C#/.NET server. Policy, contributions and admin in one minimal interface.",
    features: [
      "Role-based admin dashboard",
      "Policy & contribution management",
      "REST API with a C#/.NET service layer",
    ],
    stack: ["React", "Material UI", "TypeScript", "C# / .NET"],
    github: "https://github.com/thushanvithana/ScholarWebApp",
    featured: true,
  },
  {
    slug: "mern",
    name: "MERN Stack Platform",
    description:
      "Full-stack JavaScript application built on the MongoDB · Express · React · Node stack — a deep-dive into end-to-end web engineering.",
    features: [
      "End-to-end JavaScript architecture",
      "JWT authentication & protected routes",
      "MongoDB data modelling",
    ],
    stack: ["MongoDB", "Express", "React", "Node.js"],
    github: "https://github.com/thushanvithana/MERN-STACK",
  },
  {
    slug: "hotel",
    name: "Hotel Management System",
    description:
      "A C++ reservation and operations system implemented with multiple classic design patterns — an exercise in clean, extensible architecture.",
    features: [
      "Reservation & operations engine",
      "Factory, Observer & Strategy patterns",
      "Clean, extensible OOP architecture",
    ],
    stack: ["C++", "OOP", "Design Patterns"],
    github: "https://github.com/thushanvithana/Hotel-Management-System",
  },
  {
    slug: "task",
    name: "Smart Task Manager",
    description:
      "A productivity app with a C# service layer and a JavaScript frontend — task tracking with a fast, focused UI.",
    features: [
      "Fast, focused task tracking UI",
      "C#/.NET REST service layer",
      "Priority & status workflows",
    ],
    stack: ["C# / .NET", "JavaScript", "REST"],
    github: "https://github.com/thushanvithana/SmartTaskManagerFrontend",
  },
];

/* ------------------------------- Experience ------------------------------- */

export type Experience = {
  company: string;
  role: string;
  period: string;
  summary: string;
  highlights: string[];
  stack: string[];
};

// TODO: verify dates.
export const EXPERIENCE: Experience[] = [
  {
    company: "Azend Technologies",
    role: "Associate Software Engineer",
    period: "2024 — Present",
    summary:
      "Building and maintaining full-stack products for international clients — .NET services, SQL Server data layers and modern React frontends.",
    highlights: [
      "Ship ASP.NET Core APIs and Entity Framework data layers to production",
      "Build responsive, accessible UIs with React, TypeScript and Material UI",
      "Containerise services with Docker and deploy to Azure & Fly.io",
      "Write unit & integration tests with xUnit and NUnit",
    ],
    stack: ["C#", "ASP.NET Core", "SQL Server", "React", "TypeScript", "Azure", "Docker"],
  },
  {
    company: "Freelance & Open Source",
    role: "Full-Stack Developer",
    period: "2022 — 2024",
    summary:
      "Designed and delivered web applications end to end for local clients while contributing to open-source and building a public project portfolio.",
    highlights: [
      "Delivered MERN-stack applications from concept to deployment",
      "Built Scholar, a school-management platform on React + .NET",
      "Explored real-time 3D and motion with Three.js, R3F and GSAP",
    ],
    stack: ["MongoDB", "Express", "React", "Node.js", "Firebase", "GSAP"],
  },
  {
    company: "Self-taught foundations",
    role: "Student Engineer",
    period: "2021 — 2022",
    summary:
      "Built a foundation in computer science fundamentals — data structures, OOP and design patterns — through rigorous personal projects.",
    highlights: [
      "Implemented a hotel management system in C++ with classic design patterns",
      "Practised algorithms, data structures and system design",
    ],
    stack: ["C++", "Java", "Python", "OOP"],
  },
];

/* ------------------------------ Achievements ------------------------------ */

export const ACHIEVEMENTS = [
  {
    icon: "Award",
    title: "Certifications",
    text: "Microsoft & cloud fundamentals learning path — always one certification deeper than yesterday.",
    accent: "#3b82f6",
  },
  {
    icon: "Rocket",
    title: "15+ Projects Shipped",
    text: "From C++ systems to full-stack platforms — every project shipped, documented and open for review.",
    accent: "#22d3ee",
  },
  {
    icon: "GitPullRequest",
    title: "Open Source",
    text: "Public-by-default engineering: repositories, experiments and contributions live on GitHub.",
    accent: "#a78bfa",
  },
  {
    icon: "Users",
    title: "Community",
    text: "Sharing the journey — dev videos on YouTube and knowledge-sharing within the team.",
    accent: "#34d399",
  },
  {
    icon: "GraduationCap",
    title: "Learning Journey",
    text: "C++ → MERN → .NET & Azure. The stack changes; the curiosity doesn't.",
    accent: "#3b82f6",
  },
  {
    icon: "Zap",
    title: "Performance Obsessed",
    text: "Lighthouse-green builds, sub-second loads and animations that never drop a frame.",
    accent: "#22d3ee",
  },
] as const;

/* -------------------------------- Tech wall ------------------------------- */

export const TECH_WALL = [
  ".NET", "ASP.NET Core", "C#", "SQL Server", "Azure", "JavaScript",
  "TypeScript", "React", "Next.js", "HTML", "CSS", "Git",
  "Docker", "REST APIs", "Entity Framework", "xUnit", "NUnit",
] as const;

/* ------------------------------ Testimonials ------------------------------ */

// Placeholder quotes — swap in real ones (with permission) anytime.
export const TESTIMONIALS = [
  {
    quote:
      "Thushan pairs strong .NET engineering with a rare eye for the frontend. He takes features from vague idea to polished production without hand-holding.",
    name: "Senior Engineer",
    role: "Azend Technologies",
  },
  {
    quote:
      "What stands out is the craft — clean architecture underneath, and interfaces that feel genuinely premium on top. He sweats details most developers never notice.",
    name: "Technical Lead",
    role: "Project Collaborator",
  },
  {
    quote:
      "Reliable, fast and communicative. Our platform shipped ahead of schedule and the codebase stayed maintainable long after handover.",
    name: "Product Owner",
    role: "Freelance Client",
  },
] as const;

/* -------------------------------- Navigation ------------------------------- */

export const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#github", label: "GitHub" },
  { href: "#contact", label: "Contact" },
] as const;
