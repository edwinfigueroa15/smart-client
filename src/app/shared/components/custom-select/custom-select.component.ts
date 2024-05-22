import { Component, EventEmitter, Input, Output } from '@angular/core';
import Modules from '@/app/shared/modules';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.scss'],
  standalone: true,
  imports: [...Modules],
})
export class CustomSelectComponent {
  nameError: string = '';

  @Input({ required: true }) label!: string;
  @Input({ required: true }) control!: FormControl;
  @Input({ required: true }) list!: { value: string | number, label: string }[];
  @Input({ required: true }) errors: any = {};

  @Output() changeEvent = new EventEmitter<any>();

  getKeyError(value: any) {
    if(value != null) this.nameError = Object.keys(value)[0];
    else this.nameError = "";
    return this.nameError;
  }

  OnChangeSelect(event: any) {
    const item = this.list.find(item => item.value == event.value);
    this.changeEvent.emit(item);
  }

}
