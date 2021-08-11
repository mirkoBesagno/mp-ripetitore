
import { PrimaryGeneratedColumn, Column } from "typeorm";
import { ValidateIf } from "class-validator";
import { ISessioneStudio, ITimer, StrutturaPomodori } from "../../mp-classi/utility";

export class SessioneStudio implements ISessioneStudio {

    @PrimaryGeneratedColumn()
    id: string;

    @Column('timestamp', { name: 'dataInizio' })
    @ValidateIf(item => item.dataInizio > new Date(Date.now()) ? true : false)
    dataInizio: Date;

    @Column('timestamp', { name: 'dataFine' })
    @ValidateIf(item => item.dataFine > new Date(Date.now()) ? true : false)
    dataFine?: Date;

    @Column('timestamp', { name: 'titolo' })
    titolo: string;

    @Column('timestamp', { name: 'commentoConciso' })
    commentoConciso: string;
    strutturaPomodoro: StrutturaPomodori;
    @Column('timestamp', { name: 'timerInterno' })
    timerInterno: ITimer = {
        statoTimer: false,
        count: 0,
        numeroCicli: 0,
        dataInizio: new Date(),
        timer: '00:00:00',
        terminato: false
    };

    constructor(item?: ISessioneStudio) {
        if (item == undefined) {
            this.dataInizio = new Date(Date.now());
        }
        else {
            this.dataInizio = item.dataInizio;
            this.dataFine = item.dataFine;
            this.strutturaPomodoro = item.strutturaPomodoro;
        }
    }
}