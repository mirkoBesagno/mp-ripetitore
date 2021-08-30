

export type StrutturaPomodori = undefined | {
    tipologia: "I",
    struttura: [25, 5],
    count: 2
} | {
    tipologia: "II", struttura: [20, 5, 20, 5],
    count: 4
} | {
    tipologia: "III",
    struttura: [50, 10, 50, 10],
    count: 4
}