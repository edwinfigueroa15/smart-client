import { Component, inject, signal } from '@angular/core';
import Modules from '@/app/shared/modules';
import { CustomInputComponent, CustomSelectComponent, DateRangePickerComponent, SpinnerComponent } from '@/app/shared/components';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Subscription } from 'rxjs';
import { ColombiaServices } from '@/app/core/services/colombia.service';
import { UtilsService } from '@/app/shared/utils/utils.service';
import { ApiService } from '@/app/core/services/api.service';
import { IHotel, IRoom } from '@/app/core/interfaces/tables.interfaces';
import { CreateBookingComponent } from './components/create-booking/create-booking.component';
import { DialogDataHotel } from '@/app/core/interfaces/modal.interface';

@Component({
  selector: 'app-traveler',
  templateUrl: './traveler.component.html',
  styleUrl: './traveler.component.scss',
  standalone: true,
  imports: [...Modules, DateRangePickerComponent, CustomInputComponent, CustomSelectComponent, SpinnerComponent],
  providers: [provideNativeDateAdapter()],
})
export default class TravelerComponent {
  allSubs: Subscription[] = [];
  isLoading = signal<boolean>(false);
  listDepartment = [];
  listCities = [];
  listRoomsAvailable: IRoom[] = [];
  
  form = new FormGroup({
    capacity: new FormControl(2, [Validators.required]),
    department: new FormControl('Santander', [Validators.required]),
    city: new FormControl('Bucaramanga', [Validators.required]),
  });

  formDate = new FormGroup({
    start: new FormControl(new Date(), [Validators.required]),
    end: new FormControl(new Date(), [Validators.required]),
  });

  errors = {
    start: {
      required: { message: "La fecha de entrada es obligatoria" },
    },
    end: {
      required: { message: 'La fecha de salida es obligatoria' },
    },
    capacity: {
      required: { message: 'La capacidad es obligatoria' },
    },
    department: {
      required: { message: 'El departamento es obligatorio' },
    },
    city: {
      required: { message: 'La ciudad es obligatoria' },
    },
  }

  private _colombiaServices = inject(ColombiaServices);
  private _apiService = inject(ApiService);
  private _utilsService = inject(UtilsService);

  ngOnInit() {
    this.getDepartments();
  }

  ngOnDestroy() {
    this.allSubs.forEach(sub => sub.unsubscribe());
  }

  totalCost(cost_base: string | number, tax: string | number) {
    return Number(cost_base)*Number(tax)+Number(cost_base);
  }

  getDepartments() {
    this.allSubs[this.allSubs.length] = this._colombiaServices.getDepartments().subscribe((response: any) => {
      this.listDepartment = response;
      this.changeDepartmentSelect({
        "id": 28,
        "value": "Santander",
        "label": "Santander"
      })
    })
  }

  getCities(id: number) {
    this.allSubs[this.allSubs.length] = this._colombiaServices.getCities(id).subscribe((response: any) => {
      this.listCities = response;
    })
  }

  changeDepartmentSelect(event: any) {
    this.form.controls['city'].setValue('Bucaramanga');
    if(event) {
      this.getCities(event.id);
    } else {
      this.listCities = [];
    }
  }

  async searchRooms() {
    this.isLoading.update(() => true);
    
    const hotels: IHotel[] = await this._apiService.getAll('hotels', 'active');
    const filterHotels = hotels.filter(hotel => hotel.city == this.form.controls["city"].value);
    if(!filterHotels.length) {
      this.listRoomsAvailable = [];
      this.isLoading.update(() => false);
      return;
    }

    const rooms: IRoom[] = await this._apiService.getAll('rooms', 'active');
    const filterRooms = rooms.filter(room => Number(room.capacity) >= Number(this.form.controls["capacity"].value) && room.available);
    if(!filterRooms.length) {
      this.listRoomsAvailable = [];
      this.isLoading.update(() => false);
      return;
    }

    this.listRoomsAvailable = await this._apiService.getDataJoinFilter(filterHotels, filterRooms, 'name', 'name_hotel');
    this.isLoading.update(() => false);
  }

  async createBooking(room: IRoom) {
    const data: DialogDataHotel = {
      isEdit: false,
      info: { ...this.form.value, ...this.formDate.value, room: room, totalCost: this.totalCost(room.cost_base, room.tax) },
    }
    const response = await this._utilsService.openModal(CreateBookingComponent, {
      data: data,
    });

    if(response) {
      this.isLoading.update(() => true);
      const createSuccess = await this._apiService.create('bookings', response);
      if(createSuccess) {
        room.available = false;
        await this._apiService.update('rooms', room);
      }

      this.listRoomsAvailable = [];
      this.searchRooms();
    }
  }

}
