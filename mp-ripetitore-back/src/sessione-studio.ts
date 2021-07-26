
import { PrimaryGeneratedColumn, Column } from "typeorm";
import { mpClas } from "mpstation";
import { ValidateIf } from "class-validator";

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

    constructor() {
        this.dataInizio = new Date(Date.now());
    }
}