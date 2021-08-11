

/* 
import { PrimaryGeneratedColumn } from "typeorm"; */


import { mpClas, mpMet, mpPar } from "mpstation";
import { PianoStudio } from "./piano-studio";
import { getRepository } from "typeorm";
import { IListaPianiStudio, IPianoStudio } from "../../mp-classi/utility";

@mpClas({percorso:'ListaPianiStudio'})
export class ListaPianiStudio extends Array<IPianoStudio> implements IListaPianiStudio {

    async CreaNuovoPianoStudio(): Promise<IPianoStudio | Error> {
        try {
            const item = new PianoStudio();
            const risultato = await getRepository(PianoStudio).save(item);
            return risultato;
        } catch (error: any) {
            return error;
        }
    }

    constructor() {
        super();
    }

    @mpMet({ path: 'AggiungiNuovoPiano', tipo: 'post' })
    AggiungiNuovoPiano(@mpPar({ posizione: 'body', tipo: 'object', nome:'item' }) item: IPianoStudio) {
        let posso = true;
        for (let index = 0; index < this.length && posso == true; index++) {
            const element = this[index];
            if (element.dataFine == undefined) posso = false;
        }
        if (posso) {
            this.push(new PianoStudio(item));
            return true;
        }
        else throw new Error("Sessioni aperte");

        return false;
    }
}