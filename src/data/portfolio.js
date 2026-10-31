// All portfolio content lives here, so updating the site never means touching layout code.
import kindredImg from "@/assets/projects/kindred.jpg";
import matchbdImg from "@/assets/projects/matchbd.jpg";
import munchiesImg from "@/assets/projects/munchies.jpg";
import ventsportsImg from "@/assets/projects/ventsports.jpg";
import fitandkitImg from "@/assets/projects/fitandkit.jpg";
import symptoseekImg from "@/assets/projects/symptoseek.jpg";

export const profile = {
  name: "Md Abu Bakar Siddik",
  firstLine: "Abu Bakar",
  lastLine: "Siddik",
  role: "Full Stack Software Engineer",
  location: "Dhaka, Bangladesh",
  email: "official.siddik@gmail.com",
  phone: "+880 1748495499",
  phoneHref: "tel:+8801748495499",
  github: "https://github.com/siddik-official",
  linkedin: "https://www.linkedin.com/in/msiddik31",
  resume: "/assets/Software Engineer Resume Md Abu Bakar Siddik.pdf",
  resumeFileName: "Md-Abu-Bakar-Siddik-CV.pdf",
  tagline:
    "I design and build production web, mobile and backend systems — APIs, apps and AI features that real people use every day.",
};

// Hero grid: three labels on the first row, two on the second, plus marks between.
export const heroTags = [
  ["Full Stack", "React Native", "NestJS"],
  ["Go", "AI & LLM"],
];

export const stats = [
  { label: "Years in production", value: "2.5", suffix: "+" },
  { label: "API endpoints on Kindred", value: "150", suffix: "+" },
  { label: "Automated tests written", value: "1,400", suffix: "+" },
  { label: "Daily orders served at Munchies", value: "500", suffix: "+" },
];

// Words wrapped in *asterisks* render in the italic serif accent face.
export const aboutStatement =
  "I'm a *full stack engineer* who designs *APIs*, builds *mobile apps*, and ships *AI features* people actually use.";

export const aboutBio = [
  "I work end to end: NestJS and Go services on PostgreSQL, React Native and Next.js front ends, Redis job queues, payment gateways, realtime chat and LLM-powered features.",
  "Right now I'm a core engineer at Cookspace Technologies, a Canadian product studio, building Kindred, MatchBD and the Munchies platform rebuild.",
];

export const aboutFacts = [
  ["Based in", "Dhaka, Bangladesh"],
  ["Works", "Remote, worldwide"],
  ["Studied", "BSc CSE, United International University"],
];

export const projects = [
  {
    title: "Kindred",
    category: "Dating app · Mobile, API & Admin",
    year: "2026",
    image: kindredImg,
    description:
      "A behavioural-science dating app. I'm the largest code contributor: a React Native app with 50+ screens, a NestJS API with 150+ endpoints, a Next.js admin, and an AI compatibility engine.",
    stack: ["React Native", "NestJS", "PostgreSQL", "Drizzle", "LangChain"],
    links: [{ label: "Visit site", href: "https://www.findkindred.app" }],
  },
  {
    title: "MatchBD",
    category: "Matrimony app · Live on Google Play",
    year: "2026",
    image: matchbdImg,
    fit: "contain",
    description:
      "Swipe matchmaking with NID and selfie verification, realtime chat, Gemini-generated bios, and SSLCommerz/Nagad payments with reconciliation.",
    stack: ["Expo", "NestJS", "TypeORM", "Next.js", "Gemini"],
    links: [
      { label: "Visit site", href: "https://matchbd.com" },
      {
        label: "Google Play",
        href: "https://play.google.com/store/apps/details?id=com.munchies.matchbd",
      },
    ],
  },
  {
    title: "Munchies",
    category: "Food delivery · Platform rebuild",
    year: "2024–26",
    image: munchiesImg,
    description:
      "Migrated legacy MongoDB data into Supabase PostgreSQL with an idempotent ETL, co-built the Go backend with bKash, SSLCommerz and aamarPay, and the multi-tenant ops dashboard.",
    stack: ["Go", "Gin", "Asynq", "Supabase", "Flutter"],
    links: [{ label: "Visit site", href: "https://www.munchies.com.bd" }],
  },
  {
    title: "Vent Sports",
    category: "E-commerce · Sports jerseys",
    year: "2026",
    image: ventsportsImg,
    description:
      "A Next.js store with checkout, delivery zones, coupons and COD/advance payments, plus an admin with POS, courier APIs and fraud rules that cut fake COD orders by ~30%.",
    stack: ["Next.js", "TypeScript", "Supabase"],
    links: [{ label: "Visit site", href: "https://www.ventsports.shop" }],
  },
  {
    title: "Fit & Kit",
    category: "E-commerce · Sportswear",
    year: "2026",
    image: fitandkitImg,
    description:
      "A Next.js 16 storefront for jerseys, t-shirts and sportswear, with Supabase, cart and order tracking, cash on delivery nationwide, and Meta Pixel analytics.",
    stack: ["Next.js 16", "React 19", "Supabase", "Zustand"],
    links: [{ label: "Visit site", href: "https://fitandkit.shop" }],
  },
  {
    title: "SymptoSeek",
    category: "Health AI · IoT",
    year: "2025",
    image: symptoseekImg,
    description:
      "An AI medical assistant with ML models predicting 40+ conditions, doctor matching and booking, plus an ESP32 fall-detection device that sends alerts over Telegram and SMS.",
    stack: ["Python", "Machine learning", "Node.js", "React", "ESP32"],
    links: [{ label: "GitHub", href: "https://github.com/siddik-official/symptoseek" }],
  },
];

export const experience = [
  {
    company: "Cookspace Technologies Limited",
    role: "Full Stack Software Engineer (Level 1)",
    period: "Jun 2026 — Present",
    place: "Remote · Canadian product studio",
    points: [
      "Kindred: largest code contributor across the React Native app (50+ screens), NestJS API (150+ endpoints on Drizzle and PostgreSQL) and Next.js admin (30+ pages).",
      "Integrated an AI compatibility engine (Python/FastAPI microservice with LangChain, Claude/OpenAI and pgvector) with BullMQ workers for push and email, backed by 1,400+ Jest tests.",
      "MatchBD: core contributor to the NestJS API, Expo app and Next.js admin — swipe matchmaking, NID and selfie verification, realtime chat and reconciled payments.",
      "Munchies: wrote the MongoDB-to-Supabase ETL, co-developed the Go (Gin, GORM, Asynq) backend and moved the Flutter apps onto the new API and realtime push.",
    ],
    stack: ["React Native", "NestJS", "Next.js", "Go", "PostgreSQL", "Redis"],
  },
  {
    company: "Stealth Intelligence, LLC",
    role: "Junior Software Engineer",
    period: "Dec 2025 — May 2026",
    place: "Remote · US team",
    points: [
      "Contributed to backend services, internal APIs and automation scripts across 3+ services in Node.js and Python.",
      "Debugged production issues and profiled bottlenecks, reducing recurring incidents by ~25–30%.",
      "Collaborated with senior engineers on system design, ~15+ code reviews a month and incremental refactoring.",
    ],
    stack: ["Node.js", "Python", "System design"],
  },
  {
    company: "Munchies Deliveries Ltd.",
    role: "Junior Full Stack Engineer",
    period: "Apr 2024 — Dec 2025",
    place: "Dhaka, Bangladesh",
    points: [
      "Built customer-facing and internal tools in React, Node.js and PostgreSQL serving ~500+ daily orders and 10K+ monthly customers.",
      "Designed 20+ REST APIs for orders, auth, 3 payment providers, SMS/email and logistics partners.",
      "Tuned SQL queries and indexes: p95 latency down ~40–50%, key API responses from ~800 ms to under 250 ms.",
    ],
    stack: ["React", "Node.js", "PostgreSQL", "REST APIs"],
  },
];

// The photo band between Experience and Stack.
export const now = {
  heading: "Building *Kindred*, *MatchBD* and the *Munchies* rebuild at Cookspace.",
  body: "Open to full-time roles and freelance work — remote or in Dhaka.",
};

export const education = {
  degree: "BSc in Computer Science and Engineering",
  school: "United International University",
  period: "Jan 2020 — Oct 2025",
  coursework: "Software Architecture, Software Engineering, Human-Computer Interaction, Data Structures",
};

export const marqueeWords = [
  "TypeScript",
  "React Native",
  "NestJS",
  "Go",
  "PostgreSQL",
  "Next.js",
  "Python",
  "Redis",
  "AWS",
];

export const skillGroups = [
  ["Languages", ["TypeScript", "JavaScript", "Python", "Go", "Dart", "SQL", "PHP", "C/C++"]],
  ["Frontend & Mobile", ["React", "Next.js", "React Native (Expo)", "Flutter", "TanStack Query", "Redux", "Zustand", "Tailwind CSS"]],
  ["Backend", ["Node.js", "Express", "NestJS", "Gin", "FastAPI", "REST APIs", "Webhooks", "JWT", "Redis", "BullMQ", "Asynq"]],
  ["Databases & ORMs", ["PostgreSQL", "Supabase", "MySQL", "MongoDB", "Drizzle", "TypeORM", "GORM", "pgvector"]],
  ["AI & LLM", ["Claude API", "OpenAI API", "Gemini", "LangChain", "pandas"]],
  ["Payments", ["bKash", "SSLCommerz", "Nagad", "aamarPay", "FCM", "Resend"]],
  ["DevOps & Testing", ["GitHub Actions", "Docker", "AWS", "GCP", "Vercel", "Expo EAS", "Sentry", "Jest", "Vitest", "Playwright"]],
];
