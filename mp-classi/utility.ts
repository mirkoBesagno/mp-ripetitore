

/* class PianoStudio {
    constructor(parameters) {
        
    }
} */

export class SessioneStudio implements ISessioneStudio {
    id: string;
    dataInizio: Date;
    dataFine?: Date;
    titolo: string;
    commentoConciso: string;
    strutturaPomodoro: StrutturaPomodori;
    statoTime: boolean = false;
    timer = '00:00:00';
    intervallo: any;
    count = 0;
    terminato: boolean = false;

    constructor(item?: ISessioneStudio) {
        if (item == undefined) {
            this.dataInizio = new Date(Date.now());
        }
        else {
            this.commentoConciso = item.commentoConciso ?? '';
            this.dataInizio = item.dataInizio;
            this.dataFine = item.dataFine;
            this.strutturaPomodoro = item.strutturaPomodoro;
            this.titolo = item.titolo ?? '';

            this.strutturaPomodoro = item.strutturaPomodoro;
            this.statoTime = item.statoTime;
            this.timer = item.timer;
            this.count = item.count;
            this.terminato = item.terminato;
        }
    }
}
export interface IListaSessioniStudio extends Array<SessioneStudio> {
    AggiungiNuovoPiano(item: ISessioneStudio): boolean;
}
export class ListaSessioniStudio extends Array<SessioneStudio> implements IListaSessioniStudio {

    constructor() {
        super();
    }

    AggiungiNuovoPiano(item: ISessioneStudio) {
        /* let posso = true;
        for (let index = 0; index < this.length && posso == true; index++) {
            const element = this[index];
            if (element.dataFine == undefined) posso = false;
        }
        if (posso) {
            this.push(new SessioneStudio(item));
        }
        else throw new Error("Sessioni aperte"); */
        ListaSessioniStudio.AggiungiNuovoPiano(item, this);
        return true;
    }

    static AggiungiNuovoPiano(item: ISessioneStudio, vet: ListaSessioniStudio) {
        let posso = true;
        for (let index = 0; index < vet.length && posso == true; index++) {
            const element = vet[index];
            if (element.dataFine == undefined) posso = false;
        }
        if (posso) {
            vet.push(new SessioneStudio(item));
            return vet;
        }
        else throw new Error("Sessioni aperte");
    }
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

export interface ISessioneStudio {
    dataInizio: Date;
    dataFine?: Date;
    strutturaPomodoro: StrutturaPomodori | undefined;

    titolo?: string;
    commentoConciso?: string;

    statoTime: boolean;
    timer: string;
    count: number;
    terminato: boolean;
}

export interface IPianoStudio {
    dataInizio: Date;

    listaSessioniStudio: IListaSessioniStudio;

    listaParoleChiavi?: string[];

    titoloOpera: string; //sarebbe piu corretto libro

    lunghezzaPagine: string;

    dataFine?: Date;
    AggiungiSessione(item: ISessioneStudio): boolean;
    StrutturaPomodotoToString(item: StrutturaPomodori): string;
}