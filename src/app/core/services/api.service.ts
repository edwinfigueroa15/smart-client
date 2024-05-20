
import { Injectable, inject } from '@angular/core';
import { UtilsService } from '@/app/shared/utils/utils.service';
import short from 'short-uuid';

interface ILogin {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private _utilsService = inject(UtilsService);
  constructor() { }

  async getAll(table: string, attrActive?: string) {
    const response = this._utilsService.getLocalStorage(table) || [];
    if(attrActive) {
      return response.filter((item: any) => item[attrActive]);
    }
    return response;
  }

  async create(table: string, data: any) {
    const dateTable = this._utilsService.getLocalStorage(table) || [];
    data.id = short.generate();
    dateTable.push(data);
    this._utilsService.saveLocalStorage(table, dateTable);
    return 1;
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
    console.log("dateTable", dateTable)
    this._utilsService.saveLocalStorage(table, dateTable);
    return 1;
  }

  async getDataJoin(arrayMain: any, arraySearch: any) {
    return arrayMain.reduce((commonObjects: any, itemMain: any) => {
      const response = arraySearch.find((item: any) => item.id === itemMain.id);
      if (response) {
        commonObjects.push(response);
      }
      return commonObjects;
    }, []);
  }

}
