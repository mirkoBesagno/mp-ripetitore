
import { PrimaryGeneratedColumn, Column } from "typeorm";
import { mpClas } from "mpstation";
import { ValidateIf } from "class-validator";
import { ISessioneStudio, StrutturaPomodori } from "../../mp-classi/utility";

@mpClas({})
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

    /* Informazioni sullo stato */

    @Column('timestamp', { name: 'statoTime' })
    statoTime: boolean = false;    
    @Column('timestamp', { name: 'timer' })
    timer = '00:00:00';
    @Column('timestamp', { name: 'count' })
    count = 0;
    @Column('timestamp', { name: 'terminato' })
    terminato: boolean = false;
    
    /*  */

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