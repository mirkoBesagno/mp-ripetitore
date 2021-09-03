import { IInterazioneVettoriale } from "../utility";
import { ISessioneStudio, SessioneStudio } from "./sessione-studio";
import { StrutturaPomodori } from "./struttura-pomodoro";
import { ITimer } from "./timer";

export interface IListaSessioniStudio /* extends Array<ISessioneStudio> */ extends IInterazioneVettoriale<ISessioneStudio> {
    chiusa: boolean;
    vettoreSessioniStudio: Array<ISessioneStudio>;
    AggiungiNuovaSessione(item: ISessioneStudio): ISessioneStudio | Promise<ISessioneStudio> | Error;
    ModificaSessione(index: number, item: ISessioneStudio): boolean | Promise<boolean>;
    Setta(item: IListaSessioniStudio): ListaSessioniStudio | Promise<ListaSessioniStudio>;
    SettaTimerNuovoElementoConPomodoro(item: string);
}


export class ListaSessioniStudio implements IListaSessioniStudio {
    vettoreSessioniStudio = Array<SessioneStudio>();
    chiusa = false;


    nuovoElemento: ISessioneStudio = undefined;
    elementoSelezionato: ISessioneStudio = undefined;
    indice = 0;

    constructor() {
    }
    /* constructor(item?: IListaSessioniStudio) {
        super();
        if (item) {
            for (let index = 0; index < item.length; index++) {
                const element = item[index];
                this.AggiungiNuovaSessione(element);
            }
        }
    } */

    async Setta(item: IListaSessioniStudio) {
        if (item) {
            this.vettoreSessioniStudio = Array<SessioneStudio>();
            this.chiusa = item.chiusa;

            this.nuovoElemento = item.nuovoElemento;
            this.elementoSelezionato = item.elementoSelezionato;
            this.indice = item.indice;
            for (let index = 0; index < item.vettoreSessioniStudio.length; index++) {
                const element = item.vettoreSessioniStudio[index];
                try {

                    if (element.timerInterno == undefined) {
                        console.log("ciao");
                    }

                    const tmp = await this.AggiungiNuovaSessione(element);
                    
                } catch (error) {
                    console.log(error);
                }
            }
        }
        else {

            this.vettoreSessioniStudio = Array<SessioneStudio>();
            this.chiusa = false;


            this.nuovoElemento = undefined;
            this.elementoSelezionato = undefined;
            this.indice = 0;
        }
        return this;
    }

    async AggiungiNuovaSessione(item: ISessioneStudio) {
        try {

            if (this.chiusa)
                console.log('chiuso');

            if (!this.EsistoSessioniAperte()) {
                const tmp = new SessioneStudio();
                await tmp.Setta(item);
                //tmp.Setta(item);
                this.vettoreSessioniStudio.push(tmp);
                return tmp;
            }
            else {
                throw new Error("Sessioni aperte");
            }
        } catch (error) {
            return error;
        }
    }

    async ModificaSessione(index: number, item: ISessioneStudio) {
        await this.vettoreSessioniStudio[index].Setta(item);
        return true;
    }

    EsistoSessioniAperte() {

        let aperte = false;
        for (let index = 0; index < this.vettoreSessioniStudio.length && aperte == false; index++) {
            const element = this.vettoreSessioniStudio[index];
            if (element.dataFine == undefined) aperte = true;
        }
        if (aperte) {
            //this.chiusa = true;
            return true;
        }
        else {
            //this.chiusa = false;
            return false;
        }
    }
    SettaTimerNuovoElementoConPomodoro(item: string) {

        switch (item) {
            case 'I':
                this.nuovoElemento.strutturaPomodoro = <StrutturaPomodori>{
                    tipologia: "I",
                    struttura: [25, 5],
                    count: 2
                };
                break;
            case 'II':
                this.nuovoElemento.strutturaPomodoro = <StrutturaPomodori>{
                    tipologia: "II", struttura: [20, 5, 20, 5],
                    count: 4
                };
                break;
            case 'III':
                this.nuovoElemento.strutturaPomodoro = <StrutturaPomodori>{
                    tipologia: "III",
                    struttura: [50, 10, 50, 10],
                    count: 4
                };
                break;
            default:
                break;
        }
        this.nuovoElemento.timerInterno.numeroCicli = this.nuovoElemento.strutturaPomodoro.count ?? 0;
        return true;
    }
}
