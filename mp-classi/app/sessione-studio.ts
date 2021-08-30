import { StrutturaPomodori } from "./struttura-pomodoro";
import { ITimer } from "./timer";


export interface ISessioneStudio {
    dataInizio: Date;
    dataFine?: Date;
    strutturaPomodoro: StrutturaPomodori | undefined;

    titolo?: string;
    commentoConciso?: string;

    timerInterno: ITimer,

    Setta(item: ISessioneStudio): boolean | Promise<boolean>;
}


export class SessioneStudio implements ISessioneStudio {
    dataInizio: Date;
    dataFine?: Date;
    titolo: string;
    commentoConciso: string;
    strutturaPomodoro: StrutturaPomodori;

    timerInterno: ITimer = {
        statoTimer: false,
        timer: '00:00:00',
        count: 0,
        numeroCicli: 0,
        dataInizio: new Date(),
        terminato: false,
        dataFine: undefined
    };

    constructor(item?: ISessioneStudio) {
        if (item == undefined) {
            this.dataInizio = new Date(Date.now());
        }
        else {
            this.Setta(item);
        }
    }
    Setta(item: ISessioneStudio) {
        this.dataInizio = item.dataInizio ?? new Date();
        this.strutturaPomodoro = item.strutturaPomodoro ?? undefined;
        this.titolo = item.titolo ?? '';

        this.commentoConciso = item.commentoConciso ?? '';

        this.timerInterno = item.timerInterno;
        this.dataFine = item.dataFine;
        return true;
    }
}