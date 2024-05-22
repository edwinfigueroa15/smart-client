import { Component, inject, signal } from '@angular/core';
import { TableComponent, SpinnerComponent, CustomSelectComponent } from '@/app/shared/components';
import Modules from '@/app/shared/modules';
import { MatTableDataSource } from '@angular/material/table';
import { IBooking, IHotel, IRoom } from '@/app/core/interfaces/tables.interfaces';
import { ApiService } from '@/app/core/services/api.service';
import { AuthService } from '@/app/core/services/auth.service';
import { UtilsService } from '@/app/shared/utils/utils.service';
import { AddUpdateComponent } from './components/add-update/add-update.component';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrl: './room.component.scss',
  standalone: true,
  imports: [...Modules, TableComponent, SpinnerComponent, CustomSelectComponent],
})
export default class RoomComponent {
  isLoading = signal<boolean>(true);
  listHotels: any[] = [];

  selectForm = new FormGroup({
    hotel: new FormControl(''),
  })

  showActionsTable = { edit: true, status: true, delete: true };
  nameHeaderColumns: any = {
    floor: 'Piso',
    num_room: 'Nº habitación',
    capacity: 'Capacidad',
    cost_base: 'Costo base',
    tax: 'Impuesto',
    type: 'Tipo',
    available: 'Disponible',
    active: 'Estado',
  };
  keyHeaderColumns: any[] = ['floor', 'num_room', 'capacity', 'cost_base', 'tax', 'type', 'available', 'active', 'actions'];
  dataSource = new MatTableDataSource<IRoom>([]);

  private _authService = inject(AuthService);
  private _apiService = inject(ApiService);
  private _utilsService = inject(UtilsService);

  ngOnInit() {
    this.getHotels();
  }

  async getHotels() {
    const hotelsOfUser = this._authService.user$.getValue()?.hotels || [];
    if(!hotelsOfUser.length) {
      this.listHotels = [];
      this.isLoading.update(() => false);
      return;
    }
  
    const allHotels: IHotel[] = await this._apiService.getAll('hotels', 'active');
    if(!allHotels.length) {
      this.listHotels = [];
      this.isLoading.update(() => false);
      return;
    }

    const hotels = await this._apiService.getDataJoin(hotelsOfUser, allHotels);
    this.listHotels = this._utilsService.parseData(hotels);
    this.isLoading.update(() => false);
  }

  async getRoomsByHotel() {
    if(!this.selectForm.controls.hotel.value) {
      this.dataSource.data = [];
      this.isLoading.update(() => false);
      return;
    }

    const rooms = await this._apiService.getAll('rooms')
    if(!rooms.length) {
      this.dataSource.data = [];
      this.isLoading.update(() => false);
      return;
    }

    this.dataSource.data = rooms.filter((room: IRoom) => room.name_hotel == this.selectForm.controls.hotel.value);
    this.isLoading.update(() => false);
  }

  changeSelectHotel(event: any) {
    this.getRoomsByHotel();
  }

  async addRoom() {
    const data: any = {
      isEdit: false,
      info: {},
      listHotels: this.listHotels
    }
    const response = await this._utilsService.openModal(AddUpdateComponent, {
      data: data,
    });

    if(response) {
      this.isLoading.update(() => true);
      await this._apiService.create('rooms', response)
      await this.getRoomsByHotel();
    }
  }

  async editItem(event: any) {
    if(event) {
      const data: any = {
        isEdit: true,
        info: event,
        listHotels: this.listHotels
      }
      const response = await this._utilsService.openModal(AddUpdateComponent, {
        data: data,
      });
  
      if(response) {
        this.isLoading.update(() => true);
        await this._apiService.update('rooms', response)
        await this.getRoomsByHotel();
      }
    }
  }

  async changeStatusEvent(event: any) {
    if(event) {
      this.isLoading.update(() => true);
      event.active = !event.active;
      await this._apiService.update('rooms', event)
      await this.getRoomsByHotel();
    }
  }

  async deleteItem(event: any) {
    const confrim = await this._utilsService.openModalConfirm({
      title: "Eliminar Habitación",
      subtitle: "Esta acción sera permanente",
      labelBtnCancel: "Cancelar",
      labelBtnSuccess: "Si, eliminar"
    });

    if(event && confrim) {
      const response = await this._apiService.delete('rooms', event.id);
      if(!!response) {
        let bookings: IBooking[] = await this._apiService.getAll('bookings') || [];
        if(bookings.length) {
          bookings = bookings.filter(booking => booking.id_room != event.id);
          this._utilsService.saveLocalStorage('bookings', bookings);
        }
        this.getRoomsByHotel();
      }
    }
  }

}
