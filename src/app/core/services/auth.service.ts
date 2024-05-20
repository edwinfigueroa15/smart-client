import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { UtilsService } from '@/app/shared/utils/utils.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient)
  private utilsService = inject(UtilsService)

  constructor() { }

  login(data: any) {
    console.log("Login", data);
  }

  signUp(data: any) {
    console.log("SignUp", data);
  }

  logout() {
    localStorage.removeItem('token');
    this.utilsService.routerLink('/auth/login')
  }

}
