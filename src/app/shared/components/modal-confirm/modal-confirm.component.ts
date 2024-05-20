import { Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild, booleanAttribute } from '@angular/core';
import Modules from '@/app/shared/modules';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.scss'],
  standalone: true,
  imports: [...Modules]
})
export class ModalConfirmComponent {

  constructor(
    public dialogRef: MatDialogRef<ModalConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  OnSuccess() {
    this.dialogRef.close(true);
  }

  OnCancel() {
    this.dialogRef.close(false);
  }
}
