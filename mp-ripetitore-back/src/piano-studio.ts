
import { PrimaryGeneratedColumn, Column } from "typeorm";
import { mpClas } from "mpstation";
import { ValidateIf } from "class-validator";
import { ListaSessioniStudio } from "./lista-sessioni-studio";

export interface IPianoStudio {
    dataInizio: Date;
}


@mpClas({})
export class PianoStudio implements IPianoStudio {

    @PrimaryGeneratedColumn()
    id: string;

    @Column('timestamp', { name: 'dataInizio' })
    @ValidateIf(item => item.dataInizio > new Date(Date.now()) ? true : false)
    dataInizio: Date;

    listaSessioniStudioAperte: ListaSessioniStudio;
    constructor() {
        this.dataInizio = new Date(Date.now());
    }
}