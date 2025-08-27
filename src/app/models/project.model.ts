interface Tech {
  name: string;
  color: string;
}

export interface Project {
  title: string;
  description: string;
  image: string;
  urlCode?: string;
  urlDemo?: string;
  techs?: Tech[]; // array de tecnologías
  state?: ProjectState; // true = finalizado, false = en proceso
  icons?: IconoProjectCard[];
  isWebApp?: boolean;
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
  onprogress: { name: 'En proceso', color: '#f44336'},
  finished: {name: 'Finalizado', color: '#4caf50'},
  published: {name: 'Publicado', color: '#AF2CA9FF'}
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
};