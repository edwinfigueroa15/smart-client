import { Component, Input, inject } from '@angular/core';
import Modules from '@/app/shared/modules';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.scss'],
  standalone: true,
  imports: [...Modules],
})
export class DateRangePickerComponent {
  nameError: string = '';

  @Input({ required: true }) controlGroup!: FormGroup;
  @Input({ required: true }) label!: string;
  @Input() errors: any = {};

  minDate: Date = new Date();

  getKeyError(value: any) {
    if(value != null) this.nameError = Object.keys(value)[0];
    else this.nameError = "";
    return this.nameError;
  }

}
