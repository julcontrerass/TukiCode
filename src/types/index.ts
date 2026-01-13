export type Language = 'es' | 'en';

export interface TeamMember {
  name: string;
  role: string;
  initials: string;
  image?: string;
}

export interface NavItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  color: string;
  bgGlow: string;
}

export interface ServiceCard {
  title: string;
  desc: string;
  tags: string[];
}

export interface ProcessStep {
  title: string;
  desc: string;
  deliverable: string;
}

export interface TechStack {
  name: string;
  icon: React.ReactNode;
}

export interface Translation {
  hero: { tag: string; title: string; subtitle: string; rotatingTexts: string[] };
  nav: { home: string; about: string; services: string; projects: string; process: string; contact: string };
  about: {
    title: string;
    subtitle: string;
    desc: string;
    missionTitle: string;
    missionDesc: string;
    visionTitle: string;
    visionDesc: string;
    teamTitle: string;
  };
  services: {
    title: string;
    subtitle: string;
    intro: string;
    cards: ServiceCard[];
    techTitle: string;
  };
  projects: {
    title: string;
    subtitle: string;
    desc: string;
    btn: string;
    p1: { title: string; desc: string };
    p2: { title: string; desc: string };
    p3: { title: string; desc: string };
  };
  process: {
    title: string;
    subtitle: string;
    desc: string;
    steps: ProcessStep[];
    delivTitle: string;
  };
  contact: {
    title: string;
    subtitle: string;
    desc: string;
    nameLabel: string;
    subjectLabel: string;
    ideaLabel: string;
    btn: string;
    whatsapp: string;
    card1Title: string;
    card1Desc: string;
    card2Title: string;
    card2Desc: string;
    card3Title: string;
    card3Desc: string;
  };
}

export type Translations = Record<Language, Translation>;
