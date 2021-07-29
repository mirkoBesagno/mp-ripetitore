
export interface IPianoStudio {
    dataInizio: Date;
}


export interface ISessioneStudio {
    dataInizio: Date;
    strutturaPomodoro: StrutturaPomodori;
}

export type StrutturaPomodori = undefined | {/* 30 min  */
    tipologia:"I",
    studio: 25,
    riposo: 5
} | {/* 50 min */
    tipologia:"II",
    studio1: 20,
    riposo1: 5,
    studio2: 20,
    riposo2: 5
} | {/* 120 min - 2 ore */
    tipologia:"III",
    studio1: 50,
    riposo1: 10,
    studio2: 50,
    riposo2: 10,
}