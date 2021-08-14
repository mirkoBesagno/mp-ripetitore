

/* class PianoStudio {
    constructor(parameters) {
        
    }
} */

export interface IListaSessioniStudio extends Array<ISessioneStudio> {
    AggiungiNuovoPiano(item: ISessioneStudio): boolean;
    
}
export interface IListaPianiStudio extends Array<IPianoStudio> {
   AggiungiNuovoPiano(item: IPianoStudio): boolean |Promise<boolean>;
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
    
    Setta(item:ISessioneStudio):boolean;
}

export interface IPianoStudio {
    dataInizio: Date;

    listaSessioniStudio: IListaSessioniStudio;

    listaParoleChiavi?: string[];

    titoloOpera: string; //sarebbe piu corretto libro
    titoloGenerale: string;
    dataFine?: Date;
    timerInterno: ITimer;
    AggiungiSessione(item: ISessioneStudio): boolean;
    StrutturaPomodotoToString(item: StrutturaPomodori): string;
    Setta(item:IPianoStudio):boolean;
}

export type StatoTimer = 'start' | 'stop' | 'terminato' | 'vuoto';