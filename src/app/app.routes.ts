import { Routes } from '@angular/router';
import { AuthGuard } from '@/app/core/guards/auth.guard';
import { NoAuthGuard } from '@/app/core/guards/no-auth.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'traveler',
        pathMatch: 'full'
    },
    {
        path: 'traveler',
        loadChildren: () => import('./traveler/traveler.routes').then(r => r.routes),
        canActivate: [NoAuthGuard]
    },
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.routes').then(r => r.routes),
        canActivate: [NoAuthGuard]
    },
    {
        path: 'admin',
        loadChildren: () => import('./admin/admin.routes').then(r => r.routes),
        canActivate: [AuthGuard]
    },
    {
        path: '**',
        redirectTo: 'traveler',
        pathMatch: 'full'
    },
];
