


import { getRepository } from "typeorm";
import { IListaSessioniStudio, ISessioneStudio } from "../../mp-classi/utility";
import { SessioneStudio } from "./sessione-studio";

/* export interface IListaSessioniStudio {

} */

export class ListaSessioniStudio extends Array<ISessioneStudio> implements IListaSessioniStudio {

    async CreaNuovoPianoStudio(): Promise<ISessioneStudio | Error> {
        try {
            const item = new SessioneStudio();
            const risultato = await getRepository(SessioneStudio).save(item);
            return risultato;
        } catch (error: any) {
            return error;
        }
    }

    constructor() {
        super();
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
}