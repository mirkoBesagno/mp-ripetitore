
import { PrimaryGeneratedColumn, Column, Timestamp } from "typeorm";
import { ValidateIf } from "class-validator";

export interface IPomodoro {
    durataStudio: Date;
    durataRiposo: Timestamp;
}

export class Pomodoro implements IPomodoro {

    @PrimaryGeneratedColumn()
    id: string;

    @Column('timestamp', { name: 'durataStudio' })
    @ValidateIf(item => item.dataInizio > new Date(Date.now()) ? true : false)
    durataStudio: Date;

    @Column('timestamp', { name: 'durataRiposo' })
    @ValidateIf(item => item.dataInizio > new Date(Date.now()) ? true : false)
    durataRiposo: Timestamp;

    constructor() {

    }
}