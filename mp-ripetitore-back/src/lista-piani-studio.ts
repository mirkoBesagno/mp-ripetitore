

/* 
import { PrimaryGeneratedColumn } from "typeorm"; */


import { mpClas } from "mpstation";
import { PianoStudio } from "./piano-studio";
import { getRepository } from "typeorm";
import { IPianoStudio } from "../../mp-classi/utility";

@mpClas({})
export class ListaPianiStudio extends Array<PianoStudio> {

    async CreaNuovoPianoStudio(): Promise<IPianoStudio| Error> {
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
}