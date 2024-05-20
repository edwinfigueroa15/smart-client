import short from 'short-uuid';
import { Injectable, inject } from '@angular/core';
import { UtilsService } from '@/app/shared/utils/utils.service';
import { IUser } from '../interfaces/tables.interfaces';
import { BehaviorSubject } from 'rxjs';

interface ILogin {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$ = new BehaviorSubject<IUser | null>(null);

  private _utilsService = inject(UtilsService);
  constructor() {
    const user_token = this._utilsService.getLocalStorage('user_token') || null;
    this.user$.next(user_token);
  }

  login(data: ILogin) {
    let users = this._utilsService.getLocalStorage('users') || [];
    if (!users) {
      this._utilsService.openSnackBar('No existen usuarios', { panelClass: "snackbar-danger" });
      return;
    }

    const currentUser = users.find((user: IUser) => user.email === data.email);
    if (!currentUser) {
      this._utilsService.openSnackBar('Usuario no registrado', { panelClass: "snackbar-danger" });
      return;
    }

    const passwordCorrect = this._utilsService.compareSync(data.password, currentUser.password!);
    if(!passwordCorrect) {
      this._utilsService.openSnackBar('No coinciden los datos', { panelClass: "snackbar-danger" });
      return;
    }

    this.user$.next(currentUser);
    this._utilsService.saveLocalStorage('user_token', currentUser);
    this._utilsService.routerLink('/admin');
  }

  signUp(data: IUser) {
    let users = this._utilsService.getLocalStorage('users') || [];
    if (users) {
      const userExist = users.find((user: IUser) => user.email === data.email);
      if (userExist) {
        this._utilsService.openSnackBar('El usuario ya existe', { panelClass: "snackbar-danger" });
        return;
      }
    }

    data.password = this._utilsService.hashSync(data.password!);
    data.id = short.generate();
    data.active = true;
    data.hotels = [];
    users.push(data);

    this.user$.next(data);
    this._utilsService.saveLocalStorage('user_token', data);
    this._utilsService.saveLocalStorage('users', users);
    this._utilsService.routerLink('/admin');
  }

  logout() {
    localStorage.removeItem('user_token');
    this._utilsService.routerLink('/auth/login');
  }

}
