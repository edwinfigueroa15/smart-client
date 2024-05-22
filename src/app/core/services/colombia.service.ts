
import { UtilsService } from '@/app/shared/utils/utils.service';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColombiaServices {

  private _http = inject(HttpClient);
  private _utilsService = inject(UtilsService);
  constructor() { }

  getDepartments() {
    return this._http.get('https://api-colombia.com/api/v1/Department').pipe(
        map(response => this._utilsService.parseData(response as any)),
        catchError(error => error)
    )
  }

  getCities(id: number) {
    return this._http.get(`https://api-colombia.com/api/v1/Department/${id}/cities`).pipe(
        map(response => this._utilsService.parseData(response as any)),
        catchError(error => error)
    )
  }

}
