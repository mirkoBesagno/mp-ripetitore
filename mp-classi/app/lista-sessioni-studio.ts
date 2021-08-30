import { ISessioneStudio } from "./sessione-studio";
import { StrutturaPomodori } from "./struttura-pomodoro";
import { ITimer } from "./timer";

export interface IListaSessioniStudio /* extends Array<ISessioneStudio> */ {
    chiusa:boolean;
    vettoreSessioniStudio: Array<ISessioneStudio>;
    AggiungiNuovaSessione(item: ISessioneStudio): boolean | Promise<boolean>;
    ModificaSessione(index: number, item: ISessioneStudio): boolean | Promise<boolean>;
    Setta(item: IListaSessioniStudio): boolean | Promise<boolean>;
}
