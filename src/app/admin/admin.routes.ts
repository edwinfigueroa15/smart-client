import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import("./admin.component"),
        children: [
            {
                path: 'hotel',
                loadComponent: () => import('./pages/hotel/hotel.component'),
            },
            {
                path: 'room',
                loadComponent: () => import('./pages/room/room.component'),
            },
            {
                path: 'booking',
                loadComponent: () => import('./pages/booking/booking.component'),
            },
            {
                path: '',
                redirectTo: 'hotel',
                pathMatch: 'full'
            },
            {
                path: '**',
                redirectTo: 'hotel',
                pathMatch: 'full'
            },
        ]
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    },
];
