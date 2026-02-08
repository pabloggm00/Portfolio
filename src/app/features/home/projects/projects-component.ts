import { Component, ElementRef, NgZone, QueryList, signal, ViewChild, ViewChildren, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectCardComponent } from '../project-card/project-card-component';
import gsap from 'gsap';
import { Project, STATES, TECHS } from '../../../models/project.model';
import { TranslatePipe } from '../../../core/translate.pipe';
import { TranslationService } from '../../../core/translation.service';



@Component({
  selector: 'app-projects',
  imports: [CommonModule, ProjectCardComponent, TranslatePipe],
  templateUrl: './projects-component.html',
  styleUrls: ['./projects-component.scss']
})
export class ProjectsComponent {
  @ViewChildren('cardRef', { read: ElementRef }) cards!: QueryList<ElementRef>;


  constructor(private ngZone: NgZone, private translationService: TranslationService) {
    effect(() => {
      if (this.translationService.isLoaded()) {
        this.updateProjects();
      }
    });
  }

  showGrid = signal<boolean>(true);
  activeCategory = signal<'games' | 'web'>('web');
  games = signal<Project[]>([]);
  webApps = signal<Project[]>([]);

  ngOnInit() {
  }

  updateProjects() {
    const t = (key: string) => this.translationService.translate(key);

    this.games.set([
      {
        title: 'Chrono Space 7', 
        description: t('PROJECT_DESCRIPTIONS.CHRONO_SPACE'),
        image: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/3784020/f2e99fa412427cdf6ac8c4a57b7191b1d809800a/header.jpg?t=1754577600',
        techs: [TECHS['unity'], TECHS['csharp']],
        icons: [
          { name: 'GitHub', url: 'https://github.com/pabloggm00/Chrono_Space_7', iconSrc: 'icons/for_projects/github.svg' },
          { name: 'Steam', url: 'https://store.steampowered.com/app/3784020/Chrono_Space_7/', iconSrc: 'icons/for_projects/steam.svg' }
        ],
        state: STATES['published'],
        isWebApp: false
      },
      {
        title: 'Mencía. A never was tale', 
        description: t('PROJECT_DESCRIPTIONS.MENCIA'),
        image: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2392660/header.jpg?t=1688542658',
        techs: [TECHS['unity'], TECHS['csharp']],
        icons: [{ name: 'Steam', url: 'https://store.steampowered.com/app/2392660/Mencia_A_never_was_tale/', iconSrc: 'icons/for_projects/steam.svg' }],
        state: STATES['published'],
        isWebApp: false
      }
    ]);

    this.webApps.set([
      {
        title: 'Pokemon Card Collector', 
        description: t('PROJECT_DESCRIPTIONS.POKEMON_CARD'),
        image: 'screenshots/005_project.webp', 
        techs: [TECHS['angular'], TECHS['nodejs'], TECHS['postgresql'], TECHS['docker']],
        icons: [{ name: 'GitHub', url: 'https://github.com/pabloggm00/pokemon-card-collector', iconSrc: 'icons/for_projects/github.svg' }],
        state: STATES['published'],
        isWebApp: true
      },
      {
        title: 'Portfolio', 
        description: t('PROJECT_DESCRIPTIONS.PORTFOLIO'),
        image: 'screenshots/001_project.webp', 
        techs: [TECHS['angular'], TECHS['typescript'], TECHS['html'], TECHS['scss']],
        icons: [{ name: 'GitHub', url: 'https://github.com/pabloggm00/Portfolio', iconSrc: 'icons/for_projects/github.svg' }],
        state: STATES['published'],
        isWebApp: true
      },
      {
        title: 'Generador de Proyecto Flutter', 
        description: t('PROJECT_DESCRIPTIONS.FLUTTER_GEN'),
        image: 'screenshots/004_project.webp', 
        techs: [TECHS['angular'], TECHS['typescript'], TECHS['html'], TECHS['scss']],
        icons: [
          { name: 'GitHub', url: 'https://github.com/pabloggm00/Flutter-Generator', iconSrc: 'icons/for_projects/github.svg' },
          { name: 'DirecTo', url: 'https://pabloggm00.github.io/Flutter-Generator/', iconSrc: 'icons/for_projects/web.svg' }
        ],
        state: STATES['published'],
        isWebApp: true
      },
      {
        title: 'PokeHub', 
        description: t('PROJECT_DESCRIPTIONS.POKEHUB'),
        image: 'screenshots/003_project.webp', 
        techs: [TECHS['flutter'], TECHS['dart'], TECHS['sqlite']],
        state: STATES['finished'],
        icons: [
          { name: 'GitHub', url: 'https://github.com/pabloggm00/PokeHub', iconSrc: 'icons/for_projects/github.svg' },
          { name: 'APK', url: 'https://github.com/pabloggm00/PokeHub/releases/download/v1.1.4/PokeHub.apk', iconSrc: 'icons/for_projects/apk.svg' }
        ],
        isWebApp: true
      },
      {
        title: 'KeepIt', 
        description: t('PROJECT_DESCRIPTIONS.KEEPIT'),
        image: 'screenshots/002_project.webp', 
        techs: [TECHS['flutter'], TECHS['dart']],
        icons: [
          { name: 'GitHub', url: 'https://github.com/pabloggm00/KeepIt', iconSrc: 'icons/for_projects/github.svg' },
          { name: 'APK', url: 'https://github.com/pabloggm00/KeepIt/releases/download/v1.0/KeepIt.apk', iconSrc: 'icons/for_projects/apk.svg' }
        ],
        state: STATES['finished'],
        isWebApp: true
      }
    ]);
  }

  setCategory(category: 'games' | 'web') {
    this.showGrid.set(false);
    setTimeout(() => {
      this.activeCategory.set(category);
      setTimeout(() => {
        this.showGrid.set(true);
        this.ngZone.runOutsideAngular(() => {
          requestAnimationFrame(() => this.animateCards());
        });
      }, 50);
    }, 100);
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
