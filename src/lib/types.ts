export interface Stat {
  value: string;
  label: string;
}

export interface Profile {
  name: string;
  role: string;
  degree: string;
  bio: string;
  email: string;
  github: string;
  linkedin: string;
  phone: string;
  stats: Stat[];
}

export interface Section {
  id: string;
  title: string;
  isActive: boolean;
}

export interface QuickFact {
  label: string;
  value: string;
  highlight?: boolean;
}

export interface AboutData {
  quote: string;
  paragraphs: string[];
  quickFacts: QuickFact[];
  interests: string[];
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  id: string;
  typeBadge: string;
  title: string;
  description: string;
  stack: string[];
  links: ProjectLink[];
  image?: string;
}

export interface ExperienceData {
  company: string;
  role: string;
  period: string;
  description: string;
  stack?: string[];
  github?: string;
}

export interface Certification {
  title: string;
  issuer: string;
  icon: string;
  image?: string;
}

export interface EducationData {
  school: string;
  degree: string;
  period: string;
  result: string;
  icon: string;
}

export interface PortfolioData {
  profile: Profile;
  sections: Section[];
  about: AboutData;
  skills: SkillCategory[];
  projects: Project[];
  experience: ExperienceData[];
  certifications: Certification[];
  education: EducationData[];
}
