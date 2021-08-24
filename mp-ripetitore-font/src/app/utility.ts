
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

    constructor() {
        super();
    }
    /* constructor(item?: IListaSessioniStudio) {
        super();
        if (item) {
            for (let index = 0; index < item.length; index++) {
                const element = item[index];
                this.AggiungiNuovaSessione(element);
            }
        }
    } */

    async Setta(item: IListaSessioniStudio) {
        if (item) {
            for (let index = 0; index < item.length; index++) {
                const element = item[index];
                await this.AggiungiNuovaSessione(element);
            }
        }
        return true;
    }

    async AggiungiNuovaSessione(item: ISessioneStudio) {

        try {
            const tmp = await superagent.post('localhost:8080/api/ListaPianiStudio/AggiungiNuovoPiano')
                .send(item);
        } catch (error) {
            console.log(error);
        }

        if (!this.EsistoSessioniAperte()) {
            this.push(new SessioneStudio(item));
            return true;
        }
        else throw new Error("Sessioni aperte");
    }

    async ModificaSessione(index: number, item: ISessioneStudio) {
        try {
            const tmp = await superagent.post('localhost:8080/api/ListaPianiStudio/AggiungiNuovoPiano')
                .send(item);
        } catch (error) {
            console.log(error);
        }

        this[index].Setta(item);
        return true;
    }

    EsistoSessioniAperte() {

        let posso = true;
        for (let index = 0; index < this.length && posso == true; index++) {
            const element = this[index];
            if (element.dataFine == undefined) posso = false;
        }
        if (posso) {
            return false;
        }
        return true;
    }
}


export class ListaPianiStudio implements IListaPianiStudio {

    vettorePianoStudio: Array<IPianoStudio> = [];

    constructor() {
        /* super(); */
    }


    async AggiungiNuovoPiano(item: IPianoStudio) {
        try {
            const tmp = await superagent.post('localhost:8080/api/ListaPianiStudio/AggiungiNuovoPiano')
                .send(item);
        } catch (error) {
            console.log(error);
        }
        try {
            const tmp = new PianoStudio();
            await tmp.Setta(item);
            this.vettorePianoStudio.push(tmp);
            return true;
        } catch (error) {
            return false;
        }
    }
    async ModificaPiano(index: number, item: IPianoStudio) {
        try {
            const tmp = await superagent.post('localhost:8080/api/ListaPianiStudio/ModificaPiano')
                .send(item);
        } catch (error) {
            console.log(error);
        }
        this[index].Setta(item);
        return true;
    }

    Setta(item: IListaPianiStudio) {
        for (let index = 0; index < item.vettorePianoStudio.length; index++) {
            const element = item[index];
            this.AggiungiNuovoPiano(element);
        }
    }

}
export class PianoStudio implements IPianoStudio {

    dataInizio: Date;

    listaSessioniStudio: IListaSessioniStudio = new ListaSessioniStudio();

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

    async Setta(item: IPianoStudio) {
        this.dataFine = item.dataFine;
        this.dataInizio = item.dataInizio;
        this.listaParoleChiavi = item.listaParoleChiavi;
        //this.listaSessioniStudio = new ListaSessioniStudio(item.listaSessioniStudio);
        this.listaSessioniStudio = new ListaSessioniStudio();
        await this.listaSessioniStudio.Setta(item.listaSessioniStudio);
        this.timerInterno = item.timerInterno;
        this.titoloOpera = item.titoloOpera;
        this.titoloGenerale = item.titoloGenerale;
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