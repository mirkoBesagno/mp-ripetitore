
import { PrimaryGeneratedColumn, Column } from "typeorm";
import { mpClas } from "mpstation";
import { ValidateIf } from "class-validator";
import { Pomodoro } from "./pomodoro";

export interface ISessioneStudio {
    dataInizio: Date;
}

@mpClas({})
export class SessioneStudio implements ISessioneStudio {

    @PrimaryGeneratedColumn()
    id: string;

    @Column('timestamp', { name: 'dataInizio' })
    @ValidateIf(item => item.dataInizio > new Date(Date.now()) ? true : false)
    dataInizio: Date;

    dataFine:Date;

    titolo:string;

    commentoConciso:string;

    listaPomodori:Pomodoro[];

    constructor() {
        this.dataInizio = new Date(Date.now());
    }
}