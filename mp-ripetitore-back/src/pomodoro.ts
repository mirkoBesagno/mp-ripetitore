
import { PrimaryGeneratedColumn, Column, Timestamp } from "typeorm";
import { mpClas } from "mpstation";
import { ValidateIf } from "class-validator";

export interface IPomodoro {
    durataStudio: Date;
    durataRiposo: Timestamp;
}

/* 
il pomodoro è un tempo determinato di esecuzione e puo essere:
{ [ ( 20 min - 2 min ) * 2 ] -5 min } = 50 min
 { [ ( 25 minuti - 5 minuti ) * 3 ] - 10 minuti pausa } = 110 min
 { [ ( 35 minuti - 10 minuti ) * 2 ] - 20 min } = 110 min
 { [ ( 40 minuti - 15 minuti ) ] * 1 } = 45 min
*/
@mpClas({})
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