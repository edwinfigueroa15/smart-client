import { IHotel } from "./tables.interfaces";

export interface DialogDataHotel {
    isEdit: boolean;
    info: any;
}

export interface DialogConfirm {
    title: string,
    subtitle?: string,
    labelBtnCancel: string,
    labelBtnSuccess: string
}