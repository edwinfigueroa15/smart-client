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
  selector: 'app-add-update',
  templateUrl: './add-update.component.html',
  styleUrls: ['./add-update.component.scss'],
  standalone: true,
  imports: [...Modules, CustomInputComponent, CustomCheckComponent, CustomSelectComponent, SpinnerComponent],
})
export class AddUpdateComponent {
  allSubs: Subscription[] = [];
  isLoading = signal<boolean>(false);
  listHotel: any[] = [];

  form = new FormGroup({
    id: new FormControl(''),
    floor: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(3)]),
    num_room: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(3)]),
    capacity: new FormControl(null, [Validators.required]),
    cost_base: new FormControl(null, [Validators.required]),
    tax: new FormControl(null, [Validators.required]),
    type: new FormControl('', [Validators.required]),
    available: new FormControl(true),
    active: new FormControl(true),
    name_hotel: new FormControl('', [Validators.required]),
  })

  errors = {
    floor: {
      required: { message: 'El piso es obligatorio' },
      minlength: { message: 'Minimo 1 caracter' },
      maxlength: { message: 'Máximo 3 caracteres' },
    },
    num_room: {
      required: { message: 'El número de habitación es obligatorio' },
      minlength: { message: 'Minimo 1 caracter' },
      maxlength: { message: 'Máximo 3 caracteres' },
    },
    capacity: {
      required: { message: 'La capacidad es obligatoria' },
    },
    cost_base: {
      required: { message: 'El costo base es obligatorio' },
    },
    tax: {
      required: { message: 'El impuesto es obligatorio' },
    },
    type: {
      required: { message: 'El tipo de habitación es obligatorio' },
    },
    name_hotel: {
      required: { message: 'El hotel es obligatorio' },
    },
  }

  constructor(
    public dialogRef: MatDialogRef<AddUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    if(this.data.isEdit) this.loadData();
  }

  ngOnDestroy() {
    this.allSubs.forEach(sub => sub.unsubscribe());
  }

  loadData() {
    const dataForm: IHotel = { ...this.data.info }
    this.form.patchValue(dataForm);
    this.isLoading.update(() => false);
  }

  onSubmit(): void {
    this.dialogRef.close({...this.form.value});
  }
}
