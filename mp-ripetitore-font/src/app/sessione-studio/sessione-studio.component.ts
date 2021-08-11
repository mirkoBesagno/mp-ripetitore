import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ISessioneStudio, ITimer, StrutturaPomodori } from '../../../../mp-classi/utility';



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


  timerInterno: ITimer = {
    statoTimer: false,
    timer: '00:00:00',
    count: 0,
    numeroCicli: 0,
    dataInizio: new Date(),
    terminato: false
  };

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

      this.timerInterno = v.timerInterno;
      this.dataFine = undefined;
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
  IntercettaFineTimer(item: ITimer) {
    this.dataFine = new Date();
    this.timerInterno = item;
    this.onFineSessione.emit(this);
  }

  @Output() onFineSessione = new EventEmitter<ISessioneStudio>();

  GetIsDisability(item: boolean) {
    if (item) {
      if (!this.timerInterno.statoTimer)
        return true;
      else return false;
    } else {
      if (this.timerInterno.statoTimer)
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

  SetTitolo(item: any) {
    this.titolo = item.srcElement.value;
  }
  SetCommentoConciso(item: any) {
    this.commentoConciso = item.srcElement.value; //event.srcElment.value
  }
}
