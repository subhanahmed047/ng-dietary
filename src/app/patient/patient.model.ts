import {Dietitian} from "../dietitian/dietitian.model";

export interface Patient {
    id?: string,
    first_name: string,
    last_name: string,
    phone: string,
    email?: string,
    dob: Date,
    race: string,
    gender: string,
    dietitian: Dietitian
}