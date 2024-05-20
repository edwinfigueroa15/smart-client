import { Component, inject, signal } from '@angular/core';
import Modules from '@/app/shared/modules';
import { Menu } from '@/app/core/interfaces/menu.interface';
import { Router } from '@angular/router';
import { AuthService } from '@/app/core/services/auth.service';
import { UtilsService } from '@/app/shared/utils/utils.service';
import { Subscription } from 'rxjs';
import { IUser } from '@/app/core/interfaces/tables.interfaces';
import { ApiService } from '../core/services/api.service';

const count = signal(false);

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [...Modules],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export default class AdminComponent {
  showMenu = signal(false);
  currentPath: string = '';
  pages: Menu[] = [
    { title: 'Hoteles', url: '/admin/hotel', icon: 'assets/icons/hotel.svg' },
    { title: 'Habitaciones', url: '/admin/room', icon: 'assets/icons/room.svg' },
    { title: 'Reservas', url: '/admin/booking', icon: 'assets/icons/ticket.svg' },
  ]

  allSubs: Subscription[] = [];

  private _router = inject(Router);
  private _authService = inject(AuthService);
  private _utilsService = inject(UtilsService);
  private _apiService = inject(ApiService);

  async ngOnInit() {
    this.currentPath = this._router.url;
    this._router.events.subscribe((event: any) => {
      if (event?.url) this.currentPath = event?.url;
    })
    this.userDataSuscribe();
  }

  ngOnDestroy() {
    this.allSubs.forEach(sub => sub.unsubscribe());
  }

  changeShowMenu() {
    this.showMenu.update(value => !value);
  }

  closeMenu() {
    this.showMenu.update(value => false);
  }

  logout() {
    this._authService.logout()
  }

  userDataSuscribe() {
    this.allSubs[this.allSubs.length] = this._authService.user$.subscribe(async user => {
      await this._apiService.update('users', user);
      this._utilsService.saveLocalStorage('user_token', user);
    });
  }
}
