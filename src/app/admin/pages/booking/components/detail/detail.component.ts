import { SpinnerComponent } from '@/app/shared/components';
import Modules from '@/app/shared/modules';
import { Component, Inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  standalone: true,
  imports: [...Modules, SpinnerComponent],
})
export class DetailComponent {
  isLoading = signal<boolean>(true);
  bookingInfo: any;

  constructor(
    public dialogRef: MatDialogRef<DetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.isLoading.update(() => false);
  }
}
