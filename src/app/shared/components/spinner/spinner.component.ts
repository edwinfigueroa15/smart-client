import { Component, OnInit } from '@angular/core';
import Modules from '@/app/shared/modules';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  standalone: true,
  imports: [...Modules]
})
export class SpinnerComponent  implements OnInit {
  constructor() { }

  ngOnInit() { }

}
