import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import("./traveler.component")
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    },
];
