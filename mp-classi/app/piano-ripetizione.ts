import { IListaSessioniStudio, ListaSessioniStudio } from "./lista-sessioni-studio";
import { IPianoStudio } from "./piano-studio";
import { ISessioneRipetizione } from "./sessione-ripetizione";
import { ISessioneStudio } from "./sessione-studio";
import { StrutturaPomodori } from "./struttura-pomodoro";
import { ITimer } from "./timer";


export interface IPianoRipetizione {
    dataInizio: Date;
    dataFine?: Date;

    listaSessioniStudio: IListaSessioniStudio;

    listaParoleChiavi?: string[];

    pianoStudio: IPianoStudio;

    timerInterno: ITimer;

    titoloOpera: string;
    titoloGenerale: string;

    AggiungiSessione(item: ISessioneRipetizione): boolean | Promise<boolean>;
    Setta(item: IPianoRipetizione): boolean | Promise<boolean>;
}


/* export interface IRipetizioneStudio {
    dataInizio: Date;

    listaSessioniStudio: IListaSessioniStudio;

    titoloOpera: string; //sarebbe piu corretto libro
    titoloGenerale: string;
    dataFine?: Date;
    timerInterno: ITimer;
    AggiungiSessione(item: ISessioneStudio): boolean | Promise<boolean>;
    StrutturaPomodotoToString(item: StrutturaPomodori): string;
    Setta(item: IPianoStudio): boolean | Promise<boolean>;
} */


export class RipetizioneStudio implements IPianoRipetizione {
    dataInizio: Date;

    listaSessioniStudio: IListaSessioniStudio;
    listaParoleChiavi: [];

    pianoStudio: IPianoStudio;

    titoloOpera: string; //sarebbe piu corretto libro
    titoloGenerale: string;
    dataFine?: Date;
    timerInterno: ITimer;

    constructor(item?: IPianoRipetizione) {
        if (item == undefined) {
            this.Setta();
        }
        else {
            this.Setta(item);
        }
    }

    async Setta(item?: IPianoRipetizione) {
        if (item != undefined) {
            this.dataFine = item.dataFine;
            this.dataInizio = item.dataInizio;
            //this.listaSessioniStudio = new ListaSessioniStudio(item.listaSessioniStudio);
            this.listaSessioniStudio = new ListaSessioniStudio();
            await this.listaSessioniStudio.Setta(item.listaSessioniStudio);
            this.timerInterno = item.timerInterno;
            this.titoloOpera = item.titoloOpera;
            this.titoloGenerale = item.titoloGenerale;
        }
        else {
            this.dataFine = undefined;
            this.dataInizio = new Date();
            //this.listaSessioniStudio = new ListaSessioniStudio(item.listaSessioniStudio);
            this.listaSessioniStudio = new ListaSessioniStudio();
            this.timerInterno = { dataFine: undefined, count: 0, numeroCicli: 0, timer: '', statoTimer: false, terminato: true, dataInizio: new Date() };
            this.titoloOpera = '';
            this.titoloGenerale = '';
        }
        return true;
    }

    AggiungiSessione(item: ISessioneStudio): boolean | Promise<boolean> {
        return true;
    }
    StrutturaPomodotoToString(item: StrutturaPomodori): string {
        return '';
    }

}