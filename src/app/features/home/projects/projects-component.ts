import { Component, ElementRef, NgZone, QueryList, signal, ViewChild, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectCardComponent } from '../project-card/project-card-component';
import gsap from 'gsap';
import { Project, STATES, TECHS } from '../../../models/project.model';



@Component({
  selector: 'app-projects',
  imports: [CommonModule, ProjectCardComponent],
  templateUrl: './projects-component.html',
  styleUrls: ['./projects-component.scss']
})
export class ProjectsComponent {
  @ViewChildren('cardRef', { read: ElementRef }) cards!: QueryList<ElementRef>;


  constructor(private ngZone: NgZone) { }

  showGrid = signal<boolean>(true);
  // Signal para categoría activa
  activeCategory = signal<'games' | 'web'>('web');

  // Signals para las listas de proyectos
  games = signal<Project[]>([
    {
      title: 'Chrono Space 7', description: 'Rol como jefe de desarrollo y programación. Desarrollado por 8 alumnos en 3 meses',
      image: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/3784020/f2e99fa412427cdf6ac8c4a57b7191b1d809800a/header.jpg?t=1754577600',
      techs: [TECHS['unity'], TECHS['csharp']],
      icons: [{ name: 'GitHub', url: 'https://github.com/pabloggm00/Chrono_Space_7', iconSrc: 'icons/for_projects/github.svg' },
      { name: 'Steam', url: 'https://store.steampowered.com/app/3784020/Chrono_Space_7/', iconSrc: 'icons/for_projects/steam.svg' }
      ],
      state: STATES['published'],
      isWebApp: false
    },
    {
      title: 'Mencía. A never was tale', description: 'Rol como líder de programación. Desarrollado por 30 alumnos en 3 meses',
      image: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2392660/header.jpg?t=1688542658',
      techs: [TECHS['unity'], TECHS['csharp']],
      icons: [{ name: 'Steam', url: 'https://store.steampowered.com/app/2392660/Mencia_A_never_was_tale/', iconSrc: 'icons/for_projects/steam.svg' }],
      state: STATES['published'],
      isWebApp: false
    },


  ]);

  webApps = signal<Project[]>([
    {
      title: 'Pokemon Card Collector', description: 'Gestor de colecciones Pokémon TCG',
      image: 'screenshots/005_project.webp', techs: [TECHS['angular'], TECHS['nodejs'], TECHS['postgresql'], TECHS['docker']],
      icons: [{ name: 'GitHub', url: 'https://github.com/pabloggm00/pokemon-card-collector', iconSrc: 'icons/for_projects/github.svg' }],
      state: STATES['published'],
      isWebApp: true
    },
    {
      title: 'Portfolio', description: 'Mi presentación en página web hecha con Angular 20',
      image: 'screenshots/001_project.webp', techs: [TECHS['angular'], TECHS['typescript'], TECHS['html'], TECHS['scss']],
      icons: [{ name: 'GitHub', url: 'https://github.com/pabloggm00/Portfolio', iconSrc: 'icons/for_projects/github.svg' }],
      state: STATES['published'],
      isWebApp: true
    },
    {
      title: 'Generador de Proyecto Flutter', description: 'Generador básico de un proyecto Flutter. Genera un archivo .bat. Ejecutar en la carpeta deseada',
      image: 'screenshots/004_project.webp', techs: [TECHS['angular'], TECHS['typescript'], TECHS['html'], TECHS['scss']],
      icons: [{ name: 'GitHub', url: 'https://github.com/pabloggm00/Flutter-Generator', iconSrc: 'icons/for_projects/github.svg' },
      { name: 'DirecTo', url: 'https://pabloggm00.github.io/Flutter-Generator/', iconSrc: 'icons/for_projects/web.svg' }
      ],
      state: STATES['published'],
      isWebApp: true
    },
    {
      title: 'PokeHub', description: 'Pokédex completa con información de cada Pokémon. Desarrollado con base de datos local.',
      image: 'screenshots/003_project.webp', techs: [TECHS['flutter'], TECHS['dart'], TECHS['sqlite']],
      state: STATES['finished'],
      icons: [{ name: 'GitHub', url: 'https://github.com/pabloggm00/PokeHub', iconSrc: 'icons/for_projects/github.svg' },
      { name: 'APK', url: 'https://github.com/pabloggm00/PokeHub/releases/download/v1.1.4/PokeHub.apk', iconSrc: 'icons/for_projects/apk.svg' }],
      isWebApp: true
    },
    {
      title: 'KeepIt', description: 'App para saber donde guardé objetos. Desarrollado con local storage.',
      image: 'screenshots/002_project.webp', techs: [TECHS['flutter'], TECHS['dart']],
      icons: [{ name: 'GitHub', url: 'https://github.com/pabloggm00/KeepIt', iconSrc: 'icons/for_projects/github.svg' },
      { name: 'APK', url: 'https://github.com/pabloggm00/KeepIt/releases/download/v1.0/KeepIt.apk', iconSrc: 'icons/for_projects/apk.svg' }],
      state: STATES['finished'],
      isWebApp: true
    },
  ]);

  setCategory(category: 'games' | 'web') {
    this.showGrid.set(false); // Ocultamos el grid
    setTimeout(() => {
      this.activeCategory.set(category);

      // Esperamos un ciclo más para que el DOM actualice los nuevos proyectos
      setTimeout(() => {
        this.showGrid.set(true);

        // Animamos solo cuando están visibles
        this.ngZone.runOutsideAngular(() => {
          requestAnimationFrame(() => this.animateCards());
        });
      }, 50);
    }, 100); // Tiempo para "fade out"
  }


  get activeProjects() {
    return this.activeCategory() === 'web' ? this.webApps() : this.games();
  }

  ngAfterViewInit() {
    this.animateCards();
  }
  animateCards() {
    if (!this.cards || this.cards.length === 0) return;

    const elements = this.cards.map(c => c.nativeElement);

    gsap.from(elements, {
      opacity: 0,
      y: 40,
      duration: 0.7,
      stagger: 0.15,
      ease: 'power3.out'
    });
  }

}
