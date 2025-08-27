import { ExtraOptions, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home/home-component';
import { AboutMeComponent } from './features/aboutme/aboutme/aboutme';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    { path: 'aboutme', component: AboutMeComponent}
];


