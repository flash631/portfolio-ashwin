export interface Project {
  title: string;
  year: string;
  images: string[];
  link?: string;
  linkText?: string;
  tag?: string;
  tagColor?: 'uiuc' | 'vssc' | 'default';
}

export interface Experience {
  role: string;
  company: string;
  type: string;
  duration: string;
  dates: string;
  location: string;
  mode: string;
  bullets: string[];
  image?: string;
  imageCaption?: string;
}

export interface Publication {
  title: string;
  authors: string; // Keeping as string to preserve formatting
  venue: string;
  link?: string;
  type: 'journal' | 'conference' | 'patent';
  image?: string; // For patents
}