import { IListaSessioniStudio } from "./lista-sessioni-studio";
import { ISessioneStudio } from "./sessione-studio";
import { StrutturaPomodori } from "./struttura-pomodoro";
import { ITimer } from "./timer";

export interface IPianoStudio {
    dataInizio: Date;

    listaSessioniStudio: IListaSessioniStudio;

    listaParoleChiavi?: string[];

    titoloOpera: string; //sarebbe piu corretto libro
    titoloGenerale: string;
    dataFine?: Date | undefined;
    timerInterno: ITimer;
    AggiungiSessione(item: ISessioneStudio): boolean | Promise<boolean>;
    StrutturaPomodotoToString(item: StrutturaPomodori): string;
    Setta(item: IPianoStudio): boolean | Promise<boolean>;
}

