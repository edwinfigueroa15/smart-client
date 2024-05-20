import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import("./admin.component")
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    },
];
