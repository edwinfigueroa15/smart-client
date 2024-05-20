import { Injectable, inject } from '@angular/core';
import { NavigationBehaviorOptions, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  private router = inject(Router);

  isNumber(value: any) {
    const regex = /^-?[0-9.]*$/;
    return regex.test(value);
  }

  routerLink(url: string, extras?: NavigationBehaviorOptions) {
    return this.router.navigateByUrl(url, extras);
  }
}
