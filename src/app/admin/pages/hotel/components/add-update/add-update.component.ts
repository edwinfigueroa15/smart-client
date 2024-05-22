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
  listDepartment = []
  listCities = []

  form = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    description: new FormControl('', [Validators.required, Validators.maxLength(250)]),
    department: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required, Validators.maxLength(250)]),
    active: new FormControl(true),
  })

  errors = {
    name: {
      required: { message: 'El nombre es obligatorio' },
      maxlength: { message: 'Máximo 50 caracteres' },
    },
    description: {
      required: { message: 'La descripción es obligatoria' },
      maxlength: { message: 'Máximo 250 caracteres' },
    },
    department: {
      required: { message: 'El departamento es obligatorio' },
    },
    city: {
      required: { message: 'La ciudad es obligatoria' },
    },
    address: {
      required: { message: 'La dirección es obligatoria' },
      maxlength: { message: 'Máximo 250 caracteres' },
    },
  }

  private _colombiaServices = inject(ColombiaServices);
  constructor(
    public dialogRef: MatDialogRef<AddUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataHotel,
  ) { }

  ngOnInit() {
    this.getDepartments();
  }

  ngOnDestroy() {
    this.allSubs.forEach(sub => sub.unsubscribe());
  }

  getDepartments() {
    this.allSubs[this.allSubs.length] = this._colombiaServices.getDepartments().subscribe((response: any) => {
      this.listDepartment = response;
      if (this.data.isEdit) {
        this.isLoading.update(() => true);
        this.loadData();
      }
    })
  }

  getCities(id: number) {
    this.allSubs[this.allSubs.length] = this._colombiaServices.getCities(id).subscribe((response: any) => {
      this.listCities = response;
    })
  }

  changeDepartmentSelect(event: any) {
    this.form.controls['city'].setValue('');
    if(event) {
      this.getCities(event.id);
    } else {
      this.listCities = [];
    }
  }

  loadData() {
    const dataForm: IHotel = { ...this.data.info }
    this.form.patchValue(dataForm);

    if(dataForm.department) {
      const departmentFound: any = this.listDepartment.find((item: any) => item.label == dataForm.department);
      if(departmentFound) this.getCities(departmentFound.id);
    }

    this.isLoading.update(() => false);
  }

  onSubmit(): void {
    this.dialogRef.close({...this.form.value});
  }
}
