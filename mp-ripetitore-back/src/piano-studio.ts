
import { PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { mpClas } from "mpstation";
import { ValidateIf } from "class-validator";
import { ListaSessioniStudio } from "./lista-sessioni-studio";
import { IPianoStudio, ISessioneStudio, StrutturaPomodori, IListaSessioniStudio } from "../../mp-classi/utility";


@mpClas({})
export class PianoStudio implements IPianoStudio {

    @PrimaryGeneratedColumn()
    id: string;

    @Column('timestamp', { name: 'dataInizio' })
    @ValidateIf(item => item.dataInizio > new Date(Date.now()) ? true : false)
    dataInizio: Date;


    @OneToOne(type => ListaSessioniStudio, { nullable: false, eager: true, cascade: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: "fkCredenzialiLogin" })
    listaSessioniStudio: IListaSessioniStudio;

    listaParoleChiavi: string[];

    @Column('varchar', { name: 'titoloOpera' })
    titoloOpera: string; //sarebbe piu corretto libro

    @Column('varchar', { name: 'lunghezzaPagine' })
    lunghezzaPagine: string;

    @Column('timestamp', { name: 'dataFine' })
    dataFine?: Date;

    constructor() {
        this.dataInizio = new Date(Date.now());
    }


    AggiungiSessione(item: ISessioneStudio): boolean {
        try {
            this.listaSessioniStudio.AggiungiNuovoPiano(item);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    StrutturaPomodotoToString(item: StrutturaPomodori): string {
        if (item && 'tipologia' in item) {
            switch (item.tipologia) {
                case 'I':
                    return 'I : [25, 5]';
                case 'II':
                    return 'II : [20, 5, 20, 5]';
                case 'III':
                    return 'III : [50, 10, 50, 10]';
                default:
                    return 'default';
                    break;
            }
        }
        else {
            return 'undefined';
        }
    }
}