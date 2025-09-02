import { ExtraOptions, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home/home-component';
import { AboutMeComponent } from './features/aboutme/aboutme/aboutme';
import { NotFoundComponent } from './features/notfound/notfound';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    { path: 'aboutme', component: AboutMeComponent},
    { path: '**', component: NotFoundComponent }
];


