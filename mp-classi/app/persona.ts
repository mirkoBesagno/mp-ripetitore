import { IListaPianiStudio } from "./lista-piani-studio";
import { IPianoStudio } from "./piano-studio";

export interface IPersona {
    username: string;
    password: string;
    listaPianiStudio: IListaPianiStudio;

    AggiungiPianoStudio(item: IPianoStudio): boolean | Promise<boolean>
    ModificaPianoStudio(indice: number, item: IPianoStudio): boolean | Promise<boolean>
    /* listaRipetizioniStudio: I */
}