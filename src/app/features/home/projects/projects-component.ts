import { Component, ElementRef, NgZone, QueryList, signal, ViewChild, ViewChildren, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectCardComponent } from '../project-card/project-card-component';
import { FeaturedCardComponent } from '../featured-card/featured-card-component';
import gsap from 'gsap';
import { Project, ProjectCategory, STATES, TECHS } from '../../../models/project.model';
import { TranslatePipe } from '../../../core/translate.pipe';
import { TranslationService } from '../../../core/translation.service';

@Component({
  selector: 'app-projects',
  imports: [CommonModule, ProjectCardComponent, FeaturedCardComponent, TranslatePipe],
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
  activeCategory = signal<ProjectCategory>('featured');
  allProjects = signal<Project[]>([]);

  readonly categories: { key: ProjectCategory; label: string }[] = [
    { key: 'featured', label: 'PROJECTS.FEATURED' },
    { key: 'web',      label: 'PROJECTS.WEB' },
    { key: 'app',      label: 'PROJECTS.APP' },
    { key: 'game',     label: 'PROJECTS.GAMES' },
  ];

  updateProjects() {
    const t = (key: string) => this.translationService.translate(key);

    this.allProjects.set([
      {
        title: 'Chrono Space 7',
        description: t('PROJECT_DESCRIPTIONS.CHRONO_SPACE'),
        image: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/3784020/f2e99fa412427cdf6ac8c4a57b7191b1d809800a/header.jpg?t=1754577600',
        techs: [TECHS['unity'], TECHS['csharp']],
        icons: [
          { name: 'GitHub', url: 'https://github.com/pabloggm00/Chrono_Space_7', iconSrc: 'icons/for_projects/github.svg' },
        ],
        steamUrl: 'https://store.steampowered.com/app/3784020/Chrono_Space_7/',
        state: STATES['published'],
        isWebApp: false,
        categories: ['game']
      },
      {
        title: 'BiDex App',
        description: t('PROJECT_DESCRIPTIONS.BIDEX'),
        image: 'screenshots/003_bidex/1.webp',
        techs: [TECHS['flutter'], TECHS['dart'], TECHS['sqlite']],
        state: STATES['published'],
        icons: [],
        googlePlayUrl: 'https://play.google.com/store/apps/details?id=com.pabnauts.bidex&pcampaignid=web_share',
        isWebApp: true,
        categories: ['featured', 'app'],
        featuredImages: [
          'screenshots/003_bidex/1.webp',
          'screenshots/003_bidex/2.webp',
          'screenshots/003_bidex/3.webp',
          'screenshots/003_bidex/4.webp',
        ]
      },
      {
        title: 'BiDex Web',
        description: t('PROJECT_DESCRIPTIONS.BIDEX_WEB'),
        image: 'screenshots/003_bidex/1.webp',
        techs: [TECHS['angular'], TECHS['typescript'], TECHS['scss'], TECHS['supabase']],
        state: STATES['published'],
        icons: [
          { name: 'Web', url: 'https://bidex.app', iconSrc: 'icons/for_projects/web.svg' },
        ],
        isWebApp: true,
        categories: ['featured', 'web'],
        featuredImages: [
          'screenshots/003_bidex_web/1.webp',
          'screenshots/003_bidex_web/2.webp',
          'screenshots/003_bidex_web/3.webp',
        ]
      },
      {
        title: 'Pokemon Card Collector',
        description: t('PROJECT_DESCRIPTIONS.POKEMON_CARD'),
        image: 'screenshots/005_cardcollector/1.webp',
        techs: [TECHS['angular'], TECHS['nodejs'], TECHS['postgresql'], TECHS['docker']],
        icons: [{ name: 'GitHub', url: 'https://github.com/pabloggm00/pokemon-card-collector', iconSrc: 'icons/for_projects/github.svg' }],
        state: STATES['published'],
        isWebApp: true,
        categories: ['web'],
        featuredImages: [
          'screenshots/005_cardcollector/1.webp',
          'screenshots/005_cardcollector/2.webp',
          'screenshots/005_cardcollector/3.webp',
          'screenshots/005_cardcollector/4.webp',
          'screenshots/005_cardcollector/5.webp',
        ]
      },
      {
        title: 'Mencía. A never was tale',
        description: t('PROJECT_DESCRIPTIONS.MENCIA'),
        image: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2392660/header.jpg?t=1688542658',
        techs: [TECHS['unity'], TECHS['csharp']],
        icons: [],
        state: STATES['published'],
        steamUrl: 'https://store.steampowered.com/app/2392660/Mencia_A_never_was_tale/',
        isWebApp: false,
        categories: ['featured', 'game'],
        featuredImages: [
          'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2392660/header.jpg?t=1688542658',
        ]
      },
      {
        title: 'Portfolio',
        description: t('PROJECT_DESCRIPTIONS.PORTFOLIO'),
        image: 'screenshots/001_project.webp',
        techs: [TECHS['angular'], TECHS['typescript'], TECHS['html'], TECHS['scss']],
        icons: [{ name: 'GitHub', url: 'https://github.com/pabloggm00/Portfolio', iconSrc: 'icons/for_projects/github.svg' }],
        state: STATES['published'],
        isWebApp: true,
        categories: ['web']
      },
      {
        title: 'Generador de Proyecto Flutter',
        description: t('PROJECT_DESCRIPTIONS.FLUTTER_GEN'),
        image: 'screenshots/004_project.webp',
        techs: [TECHS['angular'], TECHS['typescript'], TECHS['html'], TECHS['scss']],
        icons: [
          { name: 'GitHub', url: 'https://github.com/pabloggm00/Flutter-Generator', iconSrc: 'icons/for_projects/github.svg' },
          { name: 'Demo', url: 'https://pabloggm00.github.io/Flutter-Generator/', iconSrc: 'icons/for_projects/web.svg' }
        ],
        state: STATES['published'],
        isWebApp: true,
        categories: ['web']
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
        isWebApp: true,
        categories: ['app']
      }
    ]);
  }

  setCategory(category: ProjectCategory) {
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

  get activeProjects(): Project[] {
    return this.allProjects().filter(p => p.categories?.includes(this.activeCategory()));
  }

  ngAfterViewInit() {
    this.animateCards();
  }

  animateCards() {
    if (!this.cards || this.cards.length === 0) return;
    gsap.from(this.cards.map(c => c.nativeElement), {
      opacity: 0,
      y: 40,
      duration: 0.7,
      stagger: 0.15,
      ease: 'power3.out'
    });
  }
}
