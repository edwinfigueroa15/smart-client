
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColombiaServices {

  private _http = inject(HttpClient);
  constructor() { }

  parseData(array: any[]) {
    return array.map(data => ({ id: data.id, value: data.name, label: data.name }))
  }

  getDepartments() {
    return this._http.get('https://api-colombia.com/api/v1/Department').pipe(
        map(response => this.parseData(response as any)),
        catchError(error => error)
    )
  }

  getCities(id: number) {
    return this._http.get(`https://api-colombia.com/api/v1/Department/${id}/cities`).pipe(
        map(response => this.parseData(response as any)),
        catchError(error => error)
    )
  }

}
