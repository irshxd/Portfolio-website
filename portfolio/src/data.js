// src/data.js
import { Code, Database, Cloud, Wrench } from 'lucide-react';

export const portfolioData = {
  name: "Mohammed Adil",
  title: "Software Engineer",
  slogan: "Building seamless web experiences & transforming data with AI/ML.",
  // --- NEW: Added resumeUrl and summary from your PDF ---
  resumeUrl: "/Mohammed_Adil_resume.pdf", // Make sure your PDF is in the `public` folder
  summary: "Software Engineer proficient in full-stack development and AI/ML integration. Skilled in JavaScript, TypeScript, MERN stack, RESTful APIs, authentication, and database optimization. Experienced in security (JWT, CORS), cloud deployment, and performance tuning, with a strong foundation in data structures & algorithms.",
  // --- End of new data ---
  bio: "Hello! I'm Mohammed Adil, a Software Engineer passionate about crafting robust full-stack applications and integrating intelligent AI/ML solutions. With a strong foundation in JavaScript, TypeScript, and the MERN stack, I focus on building scalable, secure, and performant web platforms. My expertise extends to cloud deployment, performance tuning, and leveraging data structures & algorithms to solve complex problems.",
  contact: {
    email: "adildxi10@gmail.com",
    linkedin: "https://www.linkedin.com/in/irshadxd/",
    github: "https://github.com/irshxd",
  },
  photoUrl: "/profile.jpeg", 
  skills: {
    "Languages": { icon: Code, items: ["JavaScript", "TypeScript", "Java", "Python"] },
    "Web & Backend": { icon: Code, items: ["Node.js", "Express.js", "React.js", "REST APIs", "JWT"] },
    "Databases": { icon: Database, items: ["MongoDB", "SQL"] },
    "Cloud & DevOps": { icon: Cloud, items: ["Vercel", "Firebase", "CI/CD", "Docker"] },
    "Tools": { icon: Wrench, items: ["Git", "GitHub", "VS Code"] },
  },
  projects: [
    {
      title: "GrowSense - Plant Monitoring Dashboard",
      description: "An intelligent plant monitoring system featuring a clean, real-time dashboard. It tracks key environmental metrics like temperature, soil pH, and humidity to provide an at-a-glance status for optimal plant health.",
      image: "growsense.png",
      liveUrl: "https://grow-sense-6aixv6urw-irshad-mohammeds-projects.vercel.app/",
      githubUrl: "https://github.com/irshxd/GrowSense",
      tags: ["React", "Vite", "IoT", "Data Viz"]
    },
    {
      title: "Secure Space - Women's Safety Platform",
      description: "A comprehensive safety platform designed to protect and empower. Features include community-reviewed safe routing, an emergency SOS button for alerts, and other services like a virtual companion.",
      image: "securespace.jpeg",
      liveUrl: null,
      githubUrl: "https://github.com/irshxd/women_Safety_platform",
      tags: ["Node.js", "Express", "Twilio API", "WebSockets"]
    },
    {
      title: "AR Smart Glasses",
      description: "Developed real-time gesture-controlled AR glasses using OpenCV and Raspberry Pi; improved responsiveness by 40% via optimized multi-threading.",
      image: "glasses.jpeg",
      liveUrl: null,
      githubUrl: "https://github.com/irshxd",
      tags: ["Python", "OpenCV", "Raspberry Pi", "ML"]
    },
    {
      title: "React Admin Dashboard",
      description: "Created a role-based MERN admin dashboard with JWT authentication and Chart.js visualizations; deployed on Vercel with a 30% speed boost.",
      image: "dashboard.jpeg",
      liveUrl: null,
      githubUrl: "https://github.com/irshxd",
      tags: ["MERN Stack", "JWT", "Chart.js", "Vercel"]
    },
  ],
  experience: [
    {
      role: "Tech Head",
      company: "IEEE Geoscience and Remote Sensing Society (GRSS)",
      period: "2024 - 2025",
      description: "Led the technical direction of IEEE GRSS, overseeing the development and deployment of web platforms and digital infrastructure for events and initiatives. Coordinated tech teams to execute seminars and hackathons."
    },
    {
      role: "Freelance E-Commerce Developer",
      company: "Confidential Client",
      period: "2023 - 2025",
      description: "Developed a custom MERN stack e-commerce platform, featuring secure JWT authentication, product filtering, and an integrated payment gateway. Improved site performance and UX, achieving a 25% reduction in load time."
    }
  ],
  education: {
    degree: "B.E. in Artificial Intelligence & Machine Learning",
    institution: "Muffakham Jah College of Engineering and Technology",
    period: "2021 - 2025"
  }
};
