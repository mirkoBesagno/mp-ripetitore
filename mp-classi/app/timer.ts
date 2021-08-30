

export interface ITimer {
    statoTimer: boolean,
    count: number,
    numeroCicli: number,
    dataInizio: Date,
    dataFine: Date | undefined,
    timer: string,
    terminato: boolean
}
export type StatoTimer = 'start' | 'stop' | 'terminato' | 'vuoto';