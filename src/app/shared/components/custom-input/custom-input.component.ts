import { Component, Input, inject } from '@angular/core';
import Modules from '@/app/shared/modules';
import { FormControl } from '@angular/forms';
import { UtilsService } from '@/app/shared/utils/utils.service';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],
  standalone: true,
  imports: [...Modules],
})
export class CustomInputComponent {
  nameError: string = '';

  @Input() control!: FormControl;
  @Input() label!: string;
  @Input() type: 'text' | 'password' | 'email' | 'number' = 'text';
  @Input() value: any = null;
  @Input() icon!: string;
  @Input() iconPosition: 'start' | 'end' = 'start';
  @Input() placeholder: string = '';
  @Input() autocomplete: string = 'false';
  @Input() errors: any = {};

  private utilsService = inject(UtilsService); 

  validators(event: any) {
    if (this.type === "number") return this.utilsService.isNumber(event.key);
    return true;
  }

  getKeyError(value: any) {
    if(value != null) this.nameError = Object.keys(value)[0];
    else this.nameError = "";
    return this.nameError;
  }

}
