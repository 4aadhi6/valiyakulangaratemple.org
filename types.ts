// frontend/src/types.ts

export interface Pooja {
  id: string;
  name: string;
  nameMalayalam: string;
  description: string;
  descriptionMalayalam: string;
  uses: string;
  image: string; // URL
  price?: string; // Optional
}

export interface Festival {
  id: string;
  name: string;
  nameMalayalam: string;
  date: string; // Could be a specific date or a period
  description: string;
  descriptionMalayalam: string;
  image: string; // URL
  countdownTo?: string; // ISO date string for countdown
}

export interface GalleryImage {
  id: string;
  url: string;
  description: string;
  descriptionMalayalam: string;
  cloudinaryId?: string; // CHANGED: Added optional cloudinaryId
}

export interface NewsAlert {
  id: string;
  title: string;
  titleMalayalam: string;
  content: string;
  contentMalayalam: string;
  date: string; // ISO date string
}

export interface TempleInfo {
  history: string;
  historyMalayalam: string;
  specialties: string;
  specialtiesMalayalam: string;
}

export interface TempleData {
  info: TempleInfo;
  poojas: Pooja[];
  festivals: Festival[];
  galleryImages: GalleryImage[];
  newsAlerts: NewsAlert[];
}

export enum Language {
  EN = "EN",
  ML = "ML",
}

// ... rest of your types file is fine
