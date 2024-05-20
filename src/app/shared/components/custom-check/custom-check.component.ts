import { Component, Input, inject } from '@angular/core';
import Modules from '@/app/shared/modules';
import { FormControl } from '@angular/forms';
import { UtilsService } from '@/app/shared/utils/utils.service';

@Component({
  selector: 'app-custom-check',
  templateUrl: './custom-check.component.html',
  styleUrls: ['./custom-check.component.scss'],
  standalone: true,
  imports: [...Modules],
})
export class CustomCheckComponent {
  nameError: string = '';

  @Input({ required: true }) control!: FormControl;
  @Input({ required: true }) label!: string;

}
