import { IInterazioneVettoriale } from "../utility";
import { IPianoStudio, PianoStudio } from "./piano-studio";


export interface IListaPianiStudio /* extends Array<IPianoStudio> */ extends IInterazioneVettoriale<IPianoStudio> {

    vettorePianoStudio: Array<IPianoStudio>;
    AggiungiNuovoPiano(item: IPianoStudio): IPianoStudio | Promise<IPianoStudio>;
    ModificaPiano(index: number, item: IPianoStudio): boolean | Promise<boolean>;
    Setta(item: IListaPianiStudio): Promise<boolean>
}



export class ListaPianiStudio implements IListaPianiStudio,
    IInterazioneVettoriale<IPianoStudio> {

    vettorePianoStudio: Array<IPianoStudio> = [];

    nuovoElemento: IPianoStudio = undefined;
    elementoSelezionato: IPianoStudio = undefined;
    elementoTmp: IPianoStudio = undefined;
    indice = 0;

    constructor() {
        /* super(); */
    }


    async AggiungiNuovoPiano(item: IPianoStudio) {

        if (this.nuovoElemento == undefined) {
            this.nuovoElemento = new PianoStudio();
        }
        if (this.nuovoElemento)
            this.nuovoElemento.timerInterno.dataFine = undefined;
        if (item == undefined && this.nuovoElemento != undefined)
            item = this.nuovoElemento;
        try {
            const tmp = new PianoStudio();
            const t = await tmp.Setta(item);
            this.vettorePianoStudio.push(tmp);

            this.nuovoElemento = new PianoStudio();
            this.nuovoElemento.timerInterno.terminato = false;
            return tmp;
        } catch (error) {
            return error;
        }
    }
    async ModificaPiano(index: number, item: IPianoStudio) {
        await this.vettorePianoStudio[index].Setta(item);
        return true;
    }

    async Setta(item: IListaPianiStudio): Promise<boolean> {
        try {
            this.vettorePianoStudio = new Array<PianoStudio>();
            for (let index = 0; index < item.vettorePianoStudio.length; index++) {
                const element = item.vettorePianoStudio[index];
                const t = await this.AggiungiNuovoPiano(element);
            }
            return true;
        } catch (error) {
            return false;
        }
    }

}