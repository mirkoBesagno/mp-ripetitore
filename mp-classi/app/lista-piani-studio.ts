import { IPianoStudio } from "./piano-studio";


export interface IListaPianiStudio /* extends Array<IPianoStudio> */ {

    vettorePianoStudio: Array<IPianoStudio>;
    AggiungiNuovoPiano(item: IPianoStudio): boolean | Promise<boolean>;
    ModificaPiano(index: number, item: IPianoStudio): boolean | Promise<boolean>;
}

