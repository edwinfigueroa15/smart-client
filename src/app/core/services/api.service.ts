
import { Injectable, inject } from '@angular/core';
import { UtilsService } from '@/app/shared/utils/utils.service';
import short from 'short-uuid';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private _utilsService = inject(UtilsService);
  private _http = inject(HttpClient);
  constructor() { }

  async loadDataBase() {
    const observer$ = this._http.get('assets/mocks/database.json');
    const response: any = await firstValueFrom(observer$)
    const keys = Object.keys(response);
    keys.forEach(key => {
      this._utilsService.saveLocalStorage(key, response[key])
    })
  }

  deleteDataBase() {
    localStorage.removeItem('users');
    localStorage.removeItem('user_token');
    localStorage.removeItem('hotels');
    localStorage.removeItem('rooms');
    localStorage.removeItem('bookings');
  }

  async getAll(table: string, attrActive?: string) {
    const response: any[] = this._utilsService.getLocalStorage(table) || [];
    if(!response.length) return response;
    if(attrActive) {
      return response.filter((item: any) => item[attrActive]);
    }
    return response;
  }

  async getOne(table: string, attrBase: string, value: string, attrActive?: string) {
    const response = this._utilsService.getLocalStorage(table) || [];
    if(!response.length) return null;

    const element = response.find((item: any) => item[attrBase] === value);
    if(!element) return null;

    if(attrActive) {
      if(element[attrActive]) return element;
      return null;
    }
    return element;
  }

  async create(table: string, data: any) {
    try {
      const dateTable = this._utilsService.getLocalStorage(table) || [];
      data.id = short.generate();
      dateTable.push(data);
      this._utilsService.saveLocalStorage(table, dateTable);
      return 1;
    } catch (error) {
      return 0;
    }
  }

  async update(table: string, data: any) {
    const dateTable = this._utilsService.getLocalStorage(table) || [];
    if (!dateTable) return 0;

    const indexUser = dateTable.findIndex((item: any) => item.id === data.id);
    dateTable[indexUser] = data;

    this._utilsService.saveLocalStorage(table, dateTable);
    return 1;
  }

  async delete(table: string, id: string) {
    const dateTable = this._utilsService.getLocalStorage(table) || [];
    if (!dateTable) return 0;

    const indexUser = dateTable.findIndex((item: any) => item.id == id);
    dateTable.splice(indexUser, 1);
    this._utilsService.saveLocalStorage(table, dateTable);
    return 1;
  }

  async getDataJoin(arrayMain: any, arraySearch: any, attrMain: string =  'id', attrSearch: string = 'id') {
    return arrayMain.reduce((commonObjects: any, itemMain: any) => {
      const response = arraySearch.find((item: any) => itemMain[attrMain] == item[attrSearch]);
      if (response) {
        commonObjects.push(response);
      }
      return commonObjects;
    }, []);
  }

  async getDataJoinFilter(arrayMain: any, arraySearch: any, attrMain: string =  'id', attrSearch: string = 'id') {
    return arrayMain.reduce((commonObjects: any, itemMain: any) => {
      const response: any[] = arraySearch.filter((item: any) => itemMain[attrMain] == item[attrSearch]);
      if (response.length) {
        commonObjects = [...commonObjects, ...response]
      }
      return commonObjects;
    }, []);
  }

}
