
import { PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
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

    
    @OneToOne(type => ListaSessioniStudio, { nullable: false, eager: true, cascade: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: "fkCredenzialiLogin" })
    listaSessioniStudio: ListaSessioniStudio;

    listaParoleChiavi: string[];

    constructor() {
        this.dataInizio = new Date(Date.now());
    }
}