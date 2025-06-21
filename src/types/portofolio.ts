export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl: string;
}

export interface Skill {
  name: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  category:
    | "Frontend"
    | "Backend"
    | "Database"
    | "Tools"
    | "Other"
    | "Mobile"
    | "Design"
    | "Cloud";
}

export interface Experience {
  title: string;
  company: string;
  period: string;
  description: string[];
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}
