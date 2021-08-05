import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ISessioneStudio, StrutturaPomodori } from '../../../../mp-classi/utility';



@Component({
  selector: 'app-sessione-studio',
  templateUrl: './sessione-studio.component.html',
  styleUrls: ['./sessione-studio.component.css']
})
export class SessioneStudioComponent implements OnInit, ISessioneStudio {

  /* ISessioneStudio */
  strutturaPomodoro: StrutturaPomodori = undefined; // { studio: 25, riposo: 5, tipologia: 'I' };
  dataInizio: Date;
  dataFine: Date;
  titolo: string = '';
  commentoConciso: string = '';

  /* utility */

  statoTime: boolean = false;
  timer = '00:00:00';
  intervallo: any;
  count = 0;
  terminato: boolean = false;

  constructor() { }

  Test(item: any) {
    console.log(item);
  }

  ngOnInit(): void {
  }

  @Input()
  set Setta(v: ISessioneStudio) {
    console.log('sono in input !!!');
    if (v) {
      this.dataInizio = v.dataInizio ?? new Date();
      this.strutturaPomodoro = v.strutturaPomodoro ?? undefined;
      this.titolo = v.titolo ?? '';
      this.commentoConciso = v.commentoConciso ?? '';

      this.dataFine = undefined;

      this.statoTime = v.statoTime ?? false;
      this.timer = v.timer ?? '00:00:00';
      this.count = v.count ?? 0;
      this.terminato = v.terminato ?? false;
    }
  }

  StrutturaPomodotoToString(item: StrutturaPomodori): string {
    if (item && 'tipologia' in item) {
      switch (item.tipologia) {
        case 'I':
          return 'I';
        case 'II':
          return 'II';
        case 'III':
          return 'III';
        default:
          return 'default';
          break;
      }
    }
    else {
      return 'undefined';
    }
  }
  StartTimer() {
    if (this.statoTime == false)
      if (this.count < this.strutturaPomodoro.count) {
        this.intervallo = setInterval(() => {
          const tmp = new Date();
          let sec = tmp.getSeconds() + '';
          if (Number(sec) < 10 && Number(sec) != 0) sec = '0' + Number(sec);
          else if (Number(sec) == 0) sec = '00';

          let min = tmp.getMinutes() + '';
          if (Number(min) < 10 && Number(min) != 0) min = '0' + Number(min);
          else if (Number(min) == 0) min = '00';

          let ore = tmp.getHours() + '';
          if (Number(ore) < 10 && Number(ore) != 0) ore = '0' + ore;
          else if (Number(ore) == 0) ore = '00';

          this.timer = ore + ':' + min + ':' + sec;

          const tmp1 = tmp.getTime();
          const tmp2 = this.dataInizio.getTime()
          this.statoTime = true;
          if ((tmp1 - tmp2) < this.strutturaPomodoro.struttura[this.count]) {
            this.StopTimer();
          }
        }
        )
      }
      else {
        alert('Troppo avanti');
      }
    else {
      alert('Stoppare prima');
    }
  }
  StopTimer() {
    if (this.intervallo != undefined)
      clearInterval(this.intervallo);
    this.intervallo = undefined;
    this.statoTime = false;
    if (this.count < this.strutturaPomodoro.count) {
      this.count++;
    }
    if (this.count >= this.strutturaPomodoro.count && this.dataFine == undefined) {
      this.dataFine = new Date();
      this.onFineSessione.emit(this);
      this.terminato = true;
    }
  }
  @Output() onFineSessione = new EventEmitter<ISessioneStudio>();

  GetIsDisability(item: boolean) {
    if (item) {
      if (!this.statoTime)
        return true;
      else return false;
    } else {
      if (this.statoTime)
        return true;
      else return false;
    }
  }

  GetStrutturaPomodoroString() {
    if (this.strutturaPomodoro && this.strutturaPomodoro.tipologia) {
      switch (this.strutturaPomodoro.tipologia) {
        case 'I':
          return 'I (20 - 2 * 2 - 20)';
        case 'II':
          return 'II (35 - 2 * 2 - 20)';
        case 'III':
          return 'III (40 - 2 * 2 - 20)';
        default:
          return '';
      }
    }
    return '';
  }
}
