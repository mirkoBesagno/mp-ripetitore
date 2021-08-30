import { IPianoRipetizione } from "./piano-ripetizione";
import { IPianoStudio } from "./piano-studio";


export class ListaRipetizioni {

    vettoreRipetizioniStudio: Array<IPianoRipetizione>;
    AggiungiNuovoRipetizione(item: IPianoRipetizione): boolean | Promise<boolean> {
        return true;
    }
    ModificaRipetizione(index: number, item: IPianoStudio): boolean | Promise<boolean> {
        return true;
    }
}
export interface IListaRipetizioni /* extends Array<IPianoStudio> */ {

    vettoreRipetizioniStudio: Array<IPianoRipetizione>;
    AggiungiNuovoRipetizione(item: IPianoRipetizione): boolean | Promise<boolean>;
    ModificaRipetizione(index: number, item: IPianoStudio): boolean | Promise<boolean>;
}