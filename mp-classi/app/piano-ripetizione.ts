import { IListaSessioniStudio } from "./lista-sessioni-studio";
import { IPianoStudio } from "./piano-studio";
import { ISessioneRipetizione } from "./sessione-ripetizione";
import { ITimer } from "./timer";


export interface IPianoRipetizione {
    dataInizio: Date;
    dataFine?: Date;

    listaSessioniStudio: IListaSessioniStudio;

    listaParoleChiavi?: string[];

    pianoStudio: IPianoStudio;

    timerInterno: ITimer;
    AggiungiSessione(item: ISessioneRipetizione): boolean | Promise<boolean>;
    Setta(item: IPianoStudio): boolean;
}


/* export interface IRipetizioneStudio {
    dataInizio: Date;

    listaSessioniStudio: IListaSessioniStudio;

    titoloOpera: string; //sarebbe piu corretto libro
    titoloGenerale: string;
    dataFine?: Date;
    timerInterno: ITimer;
    AggiungiSessione(item: ISessioneStudio): boolean | Promise<boolean>;
    StrutturaPomodotoToString(item: StrutturaPomodori): string;
    Setta(item: IPianoStudio): boolean | Promise<boolean>;
} */