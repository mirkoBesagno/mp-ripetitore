import { Column, Entity } from "typeorm";
import { ITimer } from "../../mp-classi/utility"


@Entity({ name: "SessioneStudio" })
export class Timer implements ITimer {

    @Column('boolean', { name: 'statoTimer' })
    statoTimer: boolean;
    @Column('int', { name: 'count' })
    count: number;
    @Column('int', { name: 'numeroCicli' })
    numeroCicli: number;
    @Column('timestamp', { name: 'dataInizio' })
    dataInizio: Date;
    @Column('varchar', { name: 'timer' })
    timer: string;
    @Column('boolean', { name: 'terminato' })
    terminato: boolean;

    constructor() {
        this.statoTimer; false;
        this.count; 0;
        this.numeroCicli; 0;
        this.dataInizio; new Date();
        this.timer= '00:00:00';
        this.terminato= false;
    }

}