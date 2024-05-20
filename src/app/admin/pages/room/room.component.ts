import { Component, ElementRef, ViewChild, inject, signal } from '@angular/core';
import { TableComponent, SpinnerComponent } from '@/app/shared/components';
import Modules from '@/app/shared/modules';
import { MatTableDataSource } from '@angular/material/table';
import { IHotel, IUser } from '@/app/core/interfaces/tables.interfaces';
import { ApiService } from '@/app/core/services/api.service';
import { AuthService } from '@/app/core/services/auth.service';
import { UtilsService } from '@/app/shared/utils/utils.service';
import { DialogDataHotel } from '@/app/core/interfaces/modal.interface';
import { AddUpdateComponent } from './components/add-update/add-update.component';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrl: './room.component.scss',
  standalone: true,
  imports: [...Modules, TableComponent, SpinnerComponent],
})
export default class RoomComponent {
  isLoading = signal<boolean>(true);

  nameHeaderColumns: any = {
    name: 'Nombre',
    description: 'Descripción',
    department: 'Departamento',
    city: 'Ciudad',
    address: 'Dirección',
    active: 'Estado',
  };
  keyHeaderColumns: any[] = ['name', 'description', 'department', 'city', 'address', 'active', 'actions'];
  dataSource = new MatTableDataSource<IHotel>([]);

  @ViewChild('contentModal') contentModal!: ElementRef;

  private _authService = inject(AuthService);
  private _apiService = inject(ApiService);
  private _utilsService = inject(UtilsService);

  async ngOnInit() {
    await this.getHotels();
  }

  async getHotels() {
    const hotelsOfUser = this._authService.user$.getValue()?.hotels || [];
    if(!hotelsOfUser.length) {
      this.dataSource.data = [];
      this.isLoading.update(() => false);
      return;
    }
  
    const allHotels = await this._apiService.getAll('rooms');
    if(!allHotels.length) {
      this.dataSource.data = [];
      this.isLoading.update(() => false);
      return;
    }

    const hotels = await this._apiService.getDataJoin(hotelsOfUser, allHotels);
    this.dataSource.data = hotels;
    this.isLoading.update(() => false);
  }

  async addRoom() {
    const data: DialogDataHotel = {
      isEdit: false,
      info: {},
    }
    const response = await this._utilsService.openModal(AddUpdateComponent, {
      data: data,
    });

    if(response) {
      this.isLoading.update(() => true);
      await this._apiService.create('rooms', response)

      const user: IUser = { ...this._authService.user$.value! }
      user.hotels.push({ id: response.id });
      this._authService.user$.next(user);

      await this.getHotels();
    }
  }

  async editItem(event: any) {
    if(event) {
      const data: DialogDataHotel = {
        isEdit: true,
        info: event,
      }
      const response = await this._utilsService.openModal(AddUpdateComponent, {
        data: data,
      });
  
      if(response) {
        this.isLoading.update(() => true);
        await this._apiService.update('rooms', response)
        await this.getHotels();
      }
    }
  }

  async deleteItem(event: any) {
    const confrim = await this._utilsService.openModalConfirm({
      title: "Eliminar Hotel",
      subtitle: "Esta acción sera permanente",
      labelBtnCancel: "Cancelar",
      labelBtnSuccess: "Si, eliminar"
    });

    if(event && confrim) {
      const response = await this._apiService.delete('rooms', event.id);
      if(!!response) {
        const user: IUser = { ...this._authService.user$.value! }
        user.hotels = user.hotels.filter(hotel => hotel.id != event.id);
        this._authService.user$.next(user);
        this.getHotels();
      }
    }
  }
}