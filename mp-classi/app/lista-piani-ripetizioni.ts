import { IInterazioneVettoriale } from "../utility";
import { IPianoRipetizione, RipetizioneStudio } from "./piano-ripetizione";
import { IPianoStudio } from "./piano-studio";

export interface IListaRipetizioni /* extends Array<IPianoStudio> */ extends IInterazioneVettoriale<IPianoRipetizione> {

    vettoreRipetizioniStudio: Array<IPianoRipetizione>;
    AggiungiNuovoRipetizione(item: IPianoRipetizione): IPianoRipetizione | Promise<IPianoRipetizione> | Error;
    ModificaRipetizione(index: number, item: IPianoRipetizione): boolean | Promise<boolean>;
}

export class ListaRipetizioni implements IListaRipetizioni {

    nuovoElemento: IPianoRipetizione = undefined;
    elementoSelezionato: IPianoRipetizione = undefined;
    elementoTmp: IPianoRipetizione = undefined;

    indice = -1;

    vettoreRipetizioniStudio: Array<IPianoRipetizione>;
    AggiungiNuovoRipetizione(item: IPianoRipetizione) {

        this.nuovoElemento.timerInterno.dataFine = undefined;
        if (item == undefined) item = this.nuovoElemento;
        try {
            const tmp = new RipetizioneStudio(item);
            this.vettoreRipetizioniStudio.push(tmp);
            this.nuovoElemento = new RipetizioneStudio();
            this.nuovoElemento.timerInterno.terminato = false;
            return tmp;
        } catch (error) {
            console.log(error);
            return error;
        }
    }
    async ModificaRipetizione(index: number, item: IPianoRipetizione) {
        await this.vettoreRipetizioniStudio[index].Setta(item);
        return true;
    }
}