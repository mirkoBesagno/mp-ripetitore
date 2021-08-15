

/* class PianoStudio {
    constructor(parameters) {
        
    }
} */

import { Tracing } from "trace_events";

export interface IListaSessioniStudio extends Array<ISessioneStudio> {
    AggiungiNuovaSessione(item: ISessioneStudio): boolean | Promise<boolean>;
    ModificaSessione(index: number, item: ISessioneStudio): boolean | Promise<boolean>;

}
export interface IListaPianiStudio extends Array<IPianoStudio> {
    AggiungiNuovoPiano(item: IPianoStudio): boolean | Promise<boolean>;
    ModificaPiano(index: number, item: IPianoStudio): boolean | Promise<boolean>;
}

export type StrutturaPomodori = undefined | {
    tipologia: "I",
    struttura: [25, 5],
    count: 2
} | {
    tipologia: "II", struttura: [20, 5, 20, 5],
    count: 4
} | {
    tipologia: "III",
    struttura: [50, 10, 50, 10],
    count: 4
}

export interface ITimer {
    statoTimer: boolean,
    count: number,
    numeroCicli: number,
    dataInizio: Date,
    timer: string,
    terminato: boolean
}
export interface ISessioneStudio {
    dataInizio: Date;
    dataFine?: Date;
    strutturaPomodoro: StrutturaPomodori | undefined;

    titolo?: string;
    commentoConciso?: string;

    timerInterno: ITimer,

    Setta(item: ISessioneStudio): boolean;
}

export interface IPianoStudio {
    dataInizio: Date;

    listaSessioniStudio: IListaSessioniStudio;

    listaParoleChiavi?: string[];

    titoloOpera: string; //sarebbe piu corretto libro
    titoloGenerale: string;
    dataFine?: Date;
    timerInterno: ITimer;
    AggiungiSessione(item: ISessioneStudio): boolean | Promise<boolean>;
    StrutturaPomodotoToString(item: StrutturaPomodori): string;
    Setta(item: IPianoStudio): boolean;
}

export type StatoTimer = 'start' | 'stop' | 'terminato' | 'vuoto';

export interface IPianoRipetizione {
    dataInizio: Date;
    dataFine?: Date;

    listaSessioniStudio: IListaSessioniStudio;

    listaParoleChiavi?: string[];

    pianoStudio: IPianoStudio;

    timerInterno: ITimer;
    AggiungiSessione(item: ISessioneRipetizione): boolean | Promise<boolean>;
    Setta(item: IPianoStudio): boolean;
}

export interface IListaSessioniRipetizione extends Array<ISessioneRipetizione> {
    AggiungiNuovoSessione(item: ISessioneRipetizione): boolean | Promise<boolean>;
    ModificaSessione(index: number, item: ISessioneRipetizione): boolean | Promise<boolean>;
}

export interface ISessioneRipetizione {
    dataInizio: Date;
    dataFine?: Date;
    strutturaPomodoro: StrutturaPomodori | undefined;

    sessioneStudio: ISessioneStudio;

    timerInterno: ITimer,

    Setta(item: ISessioneRipetizione): boolean;
}

export interface IPersona {
    username: string;
    password:string;
    listaPianiStudio: IListaPianiStudio;

}