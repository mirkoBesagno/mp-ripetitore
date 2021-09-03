import { StrutturaPomodori } from "./struttura-pomodoro";
import { ITimer } from "./timer";


export interface ISessioneStudio {
    dataInizio: Date;
    dataFine?: Date;
    strutturaPomodoro: StrutturaPomodori | undefined;

    titolo?: string;
    commentoConciso?: string;

    timerInterno: ITimer,

    Setta(item?: ISessioneStudio): boolean | Promise<boolean>;
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
    Setta(item?: ISessioneStudio) {
        if (item != undefined) {
            this.dataInizio = item.dataInizio ?? new Date();
            this.strutturaPomodoro = item.strutturaPomodoro ?? undefined;
            this.titolo = item.titolo ?? '';

            this.commentoConciso = item.commentoConciso ?? '';

            this.timerInterno = <ITimer>item.timerInterno ?? <ITimer>{
                count: 0, numeroCicli: 0, timer: '00:00:00', statoTimer: false,
                dataInizio: new Date(), terminato: false
            };
            this.dataFine = item.dataFine;
        }
        else {

            this.dataInizio = new Date();
            this.strutturaPomodoro = undefined;
            this.titolo = '';

            this.commentoConciso = '';

            this.timerInterno = <ITimer>{
                count: 0, numeroCicli: 0, timer: '00:00:00', statoTimer: false,
                dataInizio: new Date(), terminato: false
            };
            this.dataFine = new Date();
        }
        return true;
    }
}