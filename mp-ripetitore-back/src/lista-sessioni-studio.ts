
import { ISessioneStudio } from "../../mp-classi/utility";
/* 
import { PrimaryGeneratedColumn } from "typeorm"; */


import { mpClas } from "mpstation";
import { getRepository } from "typeorm";
import { ListaSessioniStudio as sessioni, SessioneStudio } from "../../mp-classi/utility";

/* export interface IListaSessioniStudio {

} */

@mpClas({})
export class ListaSessioniStudio extends Array<SessioneStudio> implements sessioni {

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
        sessioni.AggiungiNuovoPiano(item, this);        
        return true;
    }
}