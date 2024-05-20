import { Injectable, inject } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { NavigationBehaviorOptions, Router } from '@angular/router';
import * as bcrypt from 'bcryptjs';
import { firstValueFrom } from 'rxjs';
import { ModalConfirmComponent } from '@/app/shared/components';
import { DialogConfirm } from '@/app/core/interfaces/modal.interface';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  private router = inject(Router);
  private _snackBar = inject(MatSnackBar);
  private _dialog = inject(MatDialog);

  isNumber(value: any) {
    const regex = /^-?[0-9.]*$/;
    return regex.test(value);
  }

  routerLink(url: string, extras?: NavigationBehaviorOptions) {
    return this.router.navigateByUrl(url, extras);
  }

  getLocalStorage(key: string) {
    return JSON.parse(localStorage.getItem(key)!);
  }

  saveLocalStorage(key: string, value: any) {
    return localStorage.setItem(key, JSON.stringify(value));
  }

  hashSync(plainText: string) {
    const salt = bcrypt.genSaltSync(10);
    const hashed = bcrypt.hashSync(plainText, salt);
    return hashed;
  }

  compareSync(plainText: string, hashedText: string) {
    return bcrypt.compareSync(plainText, hashedText);
  }

  // COMPONENTS
  openSnackBar(message: string, config?: MatSnackBarConfig) {
    this._snackBar.open(message, '', {
      ...config,
      duration: config?.duration || 3000,
      horizontalPosition: config?.horizontalPosition || "end",
      verticalPosition: config?.verticalPosition || "top",
      panelClass: config?.panelClass || "",
    });
  }

  async openModal(component: any, config?: MatDialogConfig) {
    const dialogRef = this._dialog.open(component, config);

    const modal$ =  dialogRef.afterClosed();
    const data = await firstValueFrom(modal$)
    return data;
  }

  async openModalConfirm(dataModal: DialogConfirm, config?: MatDialogConfig) {
    const dialogRef = this._dialog.open(ModalConfirmComponent, {...config, data: { ...config?.data, ...dataModal } });

    const modal$ =  dialogRef.afterClosed();
    const data = await firstValueFrom(modal$)
    return data;
  }
}
