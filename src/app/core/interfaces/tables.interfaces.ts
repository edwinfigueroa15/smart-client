export interface IUser {
    id: string;
    name: string;
    email: string;
    password?: string;
    active: boolean;
    hotels: {id: string}[];
}

export interface IHotel {
    id: string;
    name: string;
    description: string;
    department: string;
    city: string;
    address: string;
    active: boolean;
}

export interface IRoom {
    id: string;
    floor: string;
    num_room: string;
    capacity: number;
    cost_base: number;
    tax: number;
    type: string;
    active: boolean;
    available: boolean;
    name_hotel: string;
}

export interface IBooking {
    id: string;
    type_document: string;
    num_document: string;
    name: string;
    phone: string;
    email: string;
    start_date: Date;
    end_date: Date;
    cancelled: boolean;
    id_room: string;
}

export interface ITypeRoom {
    id: string;
    name: string;
    hotels: {id: string}[];
    active: boolean;
}