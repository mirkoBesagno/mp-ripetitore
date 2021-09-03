
/* export interface ISessioneStudio {
    dataInizio: Date;
    dataFine?: Date;
    strutturaPomodoro: StrutturaPomodori;
} */

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