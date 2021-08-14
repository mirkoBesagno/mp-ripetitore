
import { PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { ValidateIf } from "class-validator";
import { ListaSessioniStudio } from "./lista-sessioni-studio";
import { IPianoStudio, ISessioneStudio, StrutturaPomodori, IListaSessioniStudio, ITimer } from "../../mp-classi/utility";

export interface IInformazioniBasePianoStudio {

    titoloOpera: string; //sarebbe piu corretto libro

    titoloGenerale: string;

    dataFine?: Date;

    dataInizio: Date;
}

export class InformazioniBasePianoStudio {

    titoloOpera: string; //sarebbe piu corretto libro

    titoloGenerale: string;

    dataFine?: Date;

    dataInizio: Date;
}

export class PianoStudio implements IPianoStudio {

    @PrimaryGeneratedColumn()
    id: string;

    @Column('timestamp', { name: 'dataInizio' })
    @ValidateIf(item => item.dataInizio > new Date(Date.now()) ? true : false)
    dataInizio: Date;

    @Column('varchar', { name: 'titoloOpera' })
    titoloOpera: string; //sarebbe piu corretto libro

    @Column('varchar', { name: 'titoloGenerale' })
    titoloGenerale: string;

    @Column('timestamp', { name: 'dataFine' })
    dataFine?: Date;

    @OneToOne(type => ListaSessioniStudio, { nullable: false, eager: true, cascade: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: "fkCredenzialiLogin" })
    listaSessioniStudio: IListaSessioniStudio;

    listaParoleChiavi?: string[];

    timerInterno: ITimer;

    constructor(item?: IPianoStudio) {
        if (item == undefined) {
            this.dataInizio = new Date(Date.now());
        }
        else {
            this.dataFine = item.dataFine;
            this.dataInizio = item.dataInizio;
            this.listaParoleChiavi = item.listaParoleChiavi;
            this.listaSessioniStudio = item.listaSessioniStudio;
            this.timerInterno = item.timerInterno;
            this.titoloOpera = item.titoloOpera;
        }
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