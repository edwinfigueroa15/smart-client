import { Component, inject, signal } from '@angular/core';
import { TableComponent, SpinnerComponent } from '@/app/shared/components';
import Modules from '@/app/shared/modules';
import { MatTableDataSource } from '@angular/material/table';
import { IBooking } from '@/app/core/interfaces/tables.interfaces';
import { ApiService } from '@/app/core/services/api.service';
import { AuthService } from '@/app/core/services/auth.service';
import { UtilsService } from '@/app/shared/utils/utils.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss',
  standalone: true,
  imports: [...Modules, TableComponent, SpinnerComponent],
})
export default class BookingComponent {
  isLoading = signal<boolean>(false);

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
  keyHeaderColumns: any[] = ['type_document', 'num_document', 'name', 'phone', 'email', 'start_date', 'end_date', 'cancelled', 'active', 'actions'];
  dataSource = new MatTableDataSource<IBooking>([]);

  private _authService = inject(AuthService);
  private _apiService = inject(ApiService);
  private _utilsService = inject(UtilsService);

  ngOnInit() { }
}
