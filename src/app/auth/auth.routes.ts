import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                redirectTo: 'login',
                pathMatch: 'full'
            },
            {
                path: 'login',
                loadComponent: () => import('./login/login.component'),
            },
            {
                path: 'sign-up',
                loadComponent: () => import('./sign-up/sign-up.component'),
            },
        ]
    },
];
