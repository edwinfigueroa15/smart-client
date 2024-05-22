import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'login',
                loadComponent: () => import('./login/login.component'),
            },
            {
                path: 'sign-up',
                loadComponent: () => import('./sign-up/sign-up.component'),
            },
            {
                path: '',
                redirectTo: 'login',
                pathMatch: 'full'
            },
            {
                path: '**',
                redirectTo: 'login',
                pathMatch: 'full'
            },
        ],
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    },
];
