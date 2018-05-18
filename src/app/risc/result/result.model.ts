export enum RISC_FACTOR {
    VERY_LOW = 'Very Low',
    LOW = 'Low',
    MODERATE = 'Moderate',
    HIGH = 'High',
    VERY_HIGH = 'Very High'
}

export class Result {
    risc: RISC_FACTOR;
    percentage: number;
    value: number;
}