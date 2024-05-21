import { DialogDataHotel } from '@/app/core/interfaces/modal.interface';
import { IHotel } from '@/app/core/interfaces/tables.interfaces';
import { ColombiaServices } from '@/app/core/services/colombia.service';
import { CustomCheckComponent, CustomInputComponent, CustomSelectComponent, SpinnerComponent } from '@/app/shared/components';
import Modules from '@/app/shared/modules';
import { Component, Inject, inject, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
  standalone: true,
  imports: [...Modules, CustomInputComponent, CustomCheckComponent, CustomSelectComponent, SpinnerComponent],
})
export class CreateBookingComponent {
  allSubs: Subscription[] = [];
  isLoading = signal<boolean>(false);
  listHotel: any[] = [];
  documentList = [
    { id: '1', label: 'Tarjeta de Identidad', value: 'Tarjeta de Identidad' },
    { id: '2', label: 'Cédula de Ciudadanía', value: 'Cédula de Ciudadanía' },
    { id: '3', label: 'Registro Civil', value: 'Registro Civil' },
  ]

  form = new FormGroup({
    id: new FormControl(''),
    type_document: new FormControl('', [Validators.required]),
    num_document: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.maxLength(80)]),
    phone: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    start_date: new FormControl(null, [Validators.required]),
    end_date: new FormControl(null, [Validators.required]),
    emergency_name: new FormControl('', [Validators.required]),
    emergency_phone: new FormControl('', [Validators.required]),
    id_room: new FormControl('', [Validators.required]),
    cancelled: new FormControl(false, [Validators.required]),
  })

  errors = {
    type_document: {
      required: { message: 'El tipo de documento es obligatorio' },
    },
    num_document: {
      required: { message: 'El número de documento es obligatorio' },
    },
    name: {
      required: { message: 'El nombre es obligatorio' },
    },
    phone: {
      required: { message: 'El celular es obligatorio' },
    },
    email: {
      required: { message: 'El correo es obligatorio' },
    },
    emergency_name: {
      required: { message: 'El contacto es obligatorio' },
    },
    emergency_phone: {
      required: { message: 'El número de celular es obligatorio' },
    },
  }

  constructor(
    public dialogRef: MatDialogRef<CreateBookingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    this.loadData();
  }

  ngOnDestroy() {
    this.allSubs.forEach(sub => sub.unsubscribe());
  }

  loadData() {
    this.form.get('start_date')?.setValue(new Date(this.data.info.start) as any);
    this.form.get('end_date')?.setValue(new Date(this.data.info.start) as any);
    this.form.get('id_room')?.setValue(this.data.info.room.id);
  }

  onSubmit(): void {
    this.dialogRef.close({...this.form.value});
  }
}
