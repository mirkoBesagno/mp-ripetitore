import { IListaRipetizioni } from "./lista-piani-ripetizioni";
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

export class Persona implements IPersona {

    username: string;
    password: string;
    listaPianiStudio: IListaPianiStudio = undefined;
    listaRipetizioni: IListaRipetizioni = undefined;
  
    async AggiungiPianoStudio(item: IPianoStudio) {
      try {
        await this.listaPianiStudio.AggiungiNuovoPiano(item);
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    }
  
    async ModificaPianoStudio(indice: number, item: IPianoStudio) {
      try {
        console.log('modifica sessione');
        console.log(item);
        await this.listaPianiStudio.ModificaPiano(indice, item);
        console.log('dhdjdj');
        return true;
      } catch (error) {
        return false;
      }
    }
    Setta(){
        
    }
  }