import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UtilsService } from '@/app/shared/utils/utils.service';

@Injectable({
    providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {
    private utilsService = inject(UtilsService);

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
        const user = localStorage.getItem('user_token');
        if (user) {
            this.utilsService.routerLink('/admin', { replaceUrl: true });
            return false;
        } else {
            return true;
        }
    }

}
