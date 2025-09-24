

export interface User{
    _id : string;
    name : string;
    email: string;
    role : string;
    password? : string;
}

export interface Vehicule{
    _id : string;
    brand : string;
    model : string;
    category : string;
    available : boolean;
    images : string[];
    fuelType : string;
    seats : number;
    transmission : string;
    year : number;
    description : string;
    priceDay : number;
}

export interface Reservation{
    _id : string;
    vehiculeName : string;
    vehiculeId : string;
    userName : string;
    userId : string;
    startDate : Date;
    endDate : Date;
    totalPrice : number;
    phoneNumber : string;
    status : string;
}