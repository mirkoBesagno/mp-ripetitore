

/* 
import { PrimaryGeneratedColumn } from "typeorm"; */


import { mpClas } from "mpstation";
import { getRepository } from "typeorm";
import { ISessioneStudio, SessioneStudio } from "./sessione-studio";

@mpClas({})
export class ListaSessioniStudio extends Array<SessioneStudio> {

    async CreaNuovoPianoStudio(): Promise<ISessioneStudio| Error> {
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
}