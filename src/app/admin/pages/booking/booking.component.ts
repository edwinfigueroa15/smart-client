import { Component, inject, signal } from '@angular/core';
import { TableComponent, SpinnerComponent, CustomSelectComponent } from '@/app/shared/components';
import Modules from '@/app/shared/modules';
import { MatTableDataSource } from '@angular/material/table';
import { IBooking, IHotel, IRoom } from '@/app/core/interfaces/tables.interfaces';
import { ApiService } from '@/app/core/services/api.service';
import { AuthService } from '@/app/core/services/auth.service';
import { UtilsService } from '@/app/shared/utils/utils.service';
import { FormControl, FormGroup } from '@angular/forms';
import { DetailComponent } from './components/detail/detail.component';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss',
  standalone: true,
  imports: [...Modules, TableComponent, CustomSelectComponent, SpinnerComponent],
})
export default class BookingComponent {
  isLoading = signal<boolean>(true);
  listHotels: any[] = [];

  selectForm = new FormGroup({
    hotel: new FormControl(''),
  })

  showActionsTable = { detail: true };
  nameHeaderColumns: any = {
    type_document: 'Tipo de doc.',
    num_document: 'Número de doc.',
    name: 'Nombre',
    phone: 'Celular',
    email: 'Correo',
    start_date: 'Entrada',
    end_date: 'Salida',
    cancelled: 'Cancelado',
    active: 'Estado',
  };
  keyHeaderColumns: any[] = ['type_document', 'num_document', 'name', 'phone', 'email', 'start_date', 'end_date', 'cancelled', 'actions'];
  dataSource = new MatTableDataSource<IBooking>([]);

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
      this.isLoading.update(() => false);
      this.dataSource.data = [];
      return;
    }

    const rooms = await this._apiService.getAll('rooms')
    if(!rooms.length) {
      this.isLoading.update(() => false);
      this.dataSource.data = [];
      return;
    }

    const roomsByHotel = rooms.filter((room: IRoom) => room.name_hotel == this.selectForm.controls.hotel.value);
    if(!roomsByHotel.length) {
      this.isLoading.update(() => false);
      this.dataSource.data = [];
      return;
    }

    const bookings = await this._apiService.getAll('bookings')
    const bookingsByHotel = await this._apiService.getDataJoin(roomsByHotel, bookings, 'id', 'id_room')
    this.dataSource.data = bookingsByHotel;
    this.isLoading.update(() => false);
  }

  changeSelectHotel(event: any) {
    this.getRoomsByHotel();
  }

  totalCost(cost_base: string | number, tax: string | number) {
    return Number(cost_base)*Number(tax)+Number(cost_base);
  }

  async detailItem(event: any) {
    const room: IRoom = await this._apiService.getOne('rooms', 'id', event.id_room);
    const hotel: IHotel = await this._apiService.getOne('hotels', 'name', room.name_hotel);
    const dataExtra = {
      room: {...room},
      hotel: {...hotel},
      total_cost: this.totalCost(room.cost_base, room.tax),
    }

    const data: any = {
      isEdit: false,
      info: {...event, ...dataExtra},
    }

    await this._utilsService.openModal(DetailComponent, {
      data: data,
    });
  }
}
