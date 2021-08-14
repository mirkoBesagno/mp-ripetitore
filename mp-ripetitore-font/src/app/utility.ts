
/* export interface ISessioneStudio {
    dataInizio: Date;
    dataFine?: Date;
    strutturaPomodoro: StrutturaPomodori;
} */

import { IListaPianiStudio, IListaSessioniStudio, IPianoStudio, ISessioneStudio, ITimer, StrutturaPomodori } from "../../../mp-classi/utility";
/* import supertest from "supertest"; */
import * as superagent from "superagent";
/* export type StrutturaPomodori = undefined | {
    tipologia: "I",
    studio: 25,
    riposo: 5
} | {
    tipologia: "II",
    studio1: 20,
    riposo1: 5,
    studio2: 20,
    riposo2: 5
} | {
    tipologia: "III",
    studio1: 50,
    riposo1: 10,
    studio2: 50,
    riposo2: 10,
} */

/* export class ListaSessioniStudio extends Array<ISessioneStudio> {
    constructor() {
        super();
    }
    AggiungiNuovoPiano(item: ISessioneStudio) {
        let posso = true;
        for (let index = 0; index < this.length && posso == true; index++) {
            const element = this[index];
            if (element.dataFine == undefined) posso = false;
        }
        if (posso)
            this.push(item);
        else throw new Error("Sessioni aperte");
    }

} */

export class SessioneStudio implements ISessioneStudio {
    dataInizio: Date;
    dataFine?: Date;
    titolo: string;
    commentoConciso: string;
    strutturaPomodoro: StrutturaPomodori;

    timerInterno: ITimer = {
        statoTimer: false,
        timer: '00:00:00',
        count: 0,
        numeroCicli: 0,
        dataInizio: new Date(),
        terminato: false
    };

    constructor(item?: ISessioneStudio) {
        if (item == undefined) {
            this.dataInizio = new Date(Date.now());
        }
        else {
            this.Setta(item);
        }
    }
    Setta(item: ISessioneStudio) {
        this.dataInizio = item.dataInizio ?? new Date();
        this.strutturaPomodoro = item.strutturaPomodoro ?? undefined;
        this.titolo = item.titolo ?? '';

        this.commentoConciso = item.commentoConciso ?? '';

        this.timerInterno = item.timerInterno;
        this.dataFine = item.dataFine;
        return true;
    }
}
export class ListaSessioniStudio extends Array<ISessioneStudio> implements IListaSessioniStudio {

    constructor(item?: IListaSessioniStudio) {
        super();
        if (item) {
            for (let index = 0; index < item.length; index++) {
                const element = item[index];
                this.AggiungiNuovoPiano(<ISessioneStudio><any>element);
            }
        }
    }

    AggiungiNuovoPiano(item: ISessioneStudio) {

        let posso = true;
        for (let index = 0; index < this.length && posso == true; index++) {
            const element = this[index];
            if (element.dataFine == undefined) posso = false;
        }
        if (posso) {
            this.push(new SessioneStudio(item));
            return true;
        }
        else throw new Error("Sessioni aperte");

        return false;
    }

    /* static AggiungiNuovoPiano(item: ISessioneStudio, vet: ListaSessioniStudio) {
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
    } */

    ModificaSessione(index: number, item: ISessioneStudio) {
        this[index].Setta(item);
    }

}


export class ListaPianiStudio extends Array<IPianoStudio> implements IListaPianiStudio {

    constructor() {
        super();
    }


    async AggiungiNuovoPiano(item: IPianoStudio) {
        try {
            const tmp = await superagent.post('localhost:8080/api/ListaPianiStudio/AggiungiNuovoPiano')
                .send(item);
        } catch (error) {
            console.log(error);
        }
        try {
            this.push(new PianoStudio(item));
            return true;
        } catch (error) {
            return false;
        }
    }
    ModificaPiano(index: number, item: IPianoStudio) {
        this[index].Setta(item);
    }

}
export class PianoStudio implements IPianoStudio {

    dataInizio: Date;

    listaSessioniStudio: IListaSessioniStudio;

    listaParoleChiavi?: string[];

    titoloOpera: string; //sarebbe piu corretto libro

    titoloGenerale: string;

    dataFine?: Date;

    timerInterno: ITimer;

    constructor(item?: IPianoStudio) {
        if (item == undefined) {
            this.dataInizio = new Date(Date.now());
            this.listaSessioniStudio = new ListaSessioniStudio();
        }
        else {
            this.Setta(item);
        }
    }

    Setta(item: IPianoStudio) {
        this.dataFine = item.dataFine;
        this.dataInizio = item.dataInizio;
        this.listaParoleChiavi = item.listaParoleChiavi;
        this.listaSessioniStudio = item.listaSessioniStudio ?? new ListaSessioniStudio();
        this.timerInterno = item.timerInterno;
        this.titoloOpera = item.titoloOpera;
        this.titoloGenerale = item.titoloGenerale;
        return true;
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

export interface IInterazioneVettoriale<T> {
    nuovoElemento: T,
    elementoSelezionato: T
}


export function formataDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}