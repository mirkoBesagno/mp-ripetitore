import { ISessioneStudio } from "./sessione-studio";
import { StrutturaPomodori } from "./struttura-pomodoro";
import { ITimer } from "./timer";


export interface IListaSessioniRipetizione extends Array<ISessioneRipetizione> {
    AggiungiNuovoSessione(item: ISessioneRipetizione): boolean | Promise<boolean>;
    ModificaSessione(index: number, item: ISessioneRipetizione): boolean | Promise<boolean>;
}
export interface ISessioneRipetizione {
    dataInizio: Date;
    dataFine?: Date;
    strutturaPomodoro: StrutturaPomodori | undefined;

    sessioneStudio: ISessioneStudio;

    timerInterno: ITimer,

    Setta(item: ISessioneRipetizione): boolean;
}