interface Tech {
  name: string;
  color: string;
}

export type ProjectCategory = 'featured' | 'web' | 'app' | 'game';

export interface Project {
  title: string;
  description: string;
  image: string;
  urlCode?: string;
  urlDemo?: string;
  techs?: Tech[];
  state?: ProjectState;
  icons?: IconoProjectCard[];
  isWebApp?: boolean;
  categories?: ProjectCategory[];
  featuredImages?: string[];  // imágenes del carrusel (solo para destacados)
  googlePlayUrl?: string;     // enlace a Google Play Store
  steamUrl?: string;           // enlace a Steam
}

interface IconoProjectCard {
  name: string;
  url: string;        
  iconSrc: string;    
}

interface ProjectState{
  name: string;
  color: string;
}

export const STATES: Record<string, ProjectState> = {
  onprogress: { name: 'PROJECT_STATES.IN_PROGRESS', color: '#f44336'},
  finished: {name: 'PROJECT_STATES.FINISHED', color: '#4caf50'},
  published: {name: 'PROJECT_STATES.PUBLISHED', color: '#AF2CA9FF'}
}


export const TECHS: Record<string, Tech> = {
  angular: { name: 'Angular', color: '#dd0031' },
  typescript: { name: 'TypeScript', color: '#3178c6' },
  unity: { name: 'Unity', color: '#000000' },
  csharp: { name: 'C#', color: '#68217a' },
  java: { name: 'Java', color: '#f89820' },
  kotlin: { name: 'Kotlin', color: '#7f52ff' },
  flutter: { name: 'Flutter', color: '#02569b' },
  dart: { name: 'Dart', color: '#0175c2' },
  html: { name: 'HTML', color: '#e34f26' },
  css: { name: 'CSS', color: '#1572b6' },
  scss: { name: 'SCSS', color: '#c6538c' },
  javascript: { name: 'JavaScript', color: '#f7df1e' },
  postgresql: { name: 'PostgreSQL', color: '#336791' },
  nodejs: { name: 'Node.js', color: '#339933' },
  docker: { name: 'Docker', color: '#2496ed' },
  sqlite: { name: 'SQLite', color: '#4479A1'}
};