import { Component } from '@angular/core';
import { CommonModule, RouterOutlet } from '@/app/shared/modules';
import AngularMaterial from '@/app/shared/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  imports: [...AngularMaterial, CommonModule, RouterOutlet],
})
export class AppComponent { }
