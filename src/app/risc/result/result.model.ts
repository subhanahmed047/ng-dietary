import {Patient} from "../../patient/patient.model";
import {RiscScore} from "../risc.mode";

export enum RISC_FACTOR {
    VERY_LOW = 'Very Low',
    LOW = 'Low',
    MODERATE = 'Moderate',
    HIGH = 'High',
    VERY_HIGH = 'Very High'
}

export class Result {
    risc: RISC_FACTOR;
    riscScore: RiscScore;
    percentage: number;
    value: number;
    patient: Patient;
    created: Date
}