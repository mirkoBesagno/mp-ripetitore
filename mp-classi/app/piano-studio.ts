import { IInterazioneVettoriale } from "../utility";
import { IListaSessioniStudio, ListaSessioniStudio } from "./lista-sessioni-studio";
import { ISessioneStudio } from "./sessione-studio";
import { StrutturaPomodori } from "./struttura-pomodoro";
import { ITimer } from "./timer";

export interface IPianoStudio {
    dataInizio: Date;

    listaSessioniStudio: IListaSessioniStudio;

    listaParoleChiavi?: string[];

    titoloOpera: string; //sarebbe piu corretto libro
    titoloGenerale: string;
    dataFine?: Date | undefined;
    timerInterno: ITimer;
    AggiungiSessione(item: ISessioneStudio): boolean | Promise<boolean>;
    StrutturaPomodotoToString(item: StrutturaPomodori): string;
    Setta(item: IPianoStudio): boolean | Promise<boolean>;
}


export class PianoStudio implements IPianoStudio, IInterazioneVettoriale<ISessioneStudio> {

    nuovoElemento: ISessioneStudio = undefined;
    elementoSelezionato: ISessioneStudio = undefined;
    elementoTmp: ISessioneStudio = undefined;
    indice = 0;

    dataInizio: Date;

    listaSessioniStudio: IListaSessioniStudio = new ListaSessioniStudio();

    listaParoleChiavi?: string[];

    titoloOpera: string; //sarebbe piu corretto libro

    titoloGenerale: string;

    dataFine?: Date;

    timerInterno: ITimer;

    sessioniAperte: boolean = false;

    constructor(item?: IPianoStudio) {
        if (item == undefined) {
            this.Setta();
        }
        else {
            this.Setta(item);
        }
    }

    async Setta(item?: IPianoStudio) {
        if (item != undefined) {
            this.dataFine = item.dataFine ?? undefined;
            this.dataInizio = item.dataInizio ?? new Date();
            this.listaParoleChiavi = item.listaParoleChiavi ?? [];
            this.listaSessioniStudio = new ListaSessioniStudio();
            const t = await this.listaSessioniStudio.Setta(item.listaSessioniStudio);
            this.timerInterno = item.timerInterno ?? { count: 0, dataInizio: new Date(), dataFine: undefined, numeroCicli: 0, statoTimer: false, terminato: false, timer: '00:00:00' };
            this.titoloOpera = item.titoloOpera ?? '';
            this.titoloGenerale = item.titoloGenerale ?? '';
        }
        else {
            this.dataFine = undefined;
            this.dataInizio = new Date();
            this.listaParoleChiavi = [];
            //this.listaSessioniStudio = new ListaSessioniStudio(item.listaSessioniStudio);
            this.listaSessioniStudio = new ListaSessioniStudio();
            this.timerInterno = { dataFine: undefined, count: 0, numeroCicli: 0, timer: '', statoTimer: false, terminato: true, dataInizio: new Date() };
            this.titoloOpera = '';
            this.titoloGenerale = '';
        }
        if (this.dataFine != undefined && this.timerInterno.numeroCicli != -1 && this.timerInterno.terminato == false) this.timerInterno.terminato = true;

        return true;
    }

    async AggiungiSessione(item: ISessioneStudio): Promise<boolean> {
        try {
            await this.listaSessioniStudio.AggiungiNuovaSessione(item);
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