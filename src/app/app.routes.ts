import { ExtraOptions, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home/home-component';
import { AboutMeComponent } from './features/aboutme/aboutme/aboutme';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    { path: 'aboutme', component: AboutMeComponent}
];

const routerOptions: ExtraOptions = {
  anchorScrolling: 'enabled', // habilita scroll a fragmentos
  scrollOffset: [0, 80],      // opcional: ajusta offset si tienes navbar fijo
  scrollPositionRestoration: 'enabled' // opcional: mantiene scroll al volver
};
