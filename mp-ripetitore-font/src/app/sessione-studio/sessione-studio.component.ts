import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ISessioneStudio, SessioneStudio } from '../../../../mp-classi/app/sessione-studio';
import { StrutturaPomodori } from '../../../../mp-classi/app/struttura-pomodoro';
import { ITimer } from '../../../../mp-classi/app/timer';


@Component({
  selector: 'app-sessione-studio',
  templateUrl: './sessione-studio.component.html',
  styleUrls: ['./sessione-studio.component.css']
})
export class SessioneStudioComponent extends SessioneStudio implements OnInit, ISessioneStudio {

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
  settato = false;
  @Output() onModificaSessioneStudio = new EventEmitter<ISessioneStudio>();
  @Output() onFineSessione = new EventEmitter<ISessioneStudio>();
  @Input()
  set SettaComponente(v: ISessioneStudio) {
    console.log('sono in input !!!');
    if (v) {
      if (this.settato) {
        this.onModificaSessioneStudio.emit(new SessioneStudio(this));
        this.Azzera();
        setTimeout((item: ISessioneStudio) => {
          //this.SettaPiano(item);
          this.Setta(item)
        }, 100, v);
      }
      else {
        this.Setta(v);
      }
    }
  }

  constructor() { super(); }

  ngOnInit(): void {
  }

  Test(item: any) {
    console.log(item);
  }
  Azzera() {
    this.dataInizio = new Date();
    this.strutturaPomodoro = undefined;
    this.titolo = '';

    this.commentoConciso = '';

    this.timerInterno = undefined;
    this.dataFine = undefined;
  }
  StrutturaPomodotoToString(item: StrutturaPomodori): string {
    if (item && 'tipologia' in item) {
      switch (item.tipologia) {
        case 'I': return 'I';
        case 'II': return 'II';
        case 'III': return 'III';
        default: return 'default';
      }
    }
    else {
      return 'undefined';
    }
  }
  IntercettaFineTimer(item: ITimer) {
    this.dataFine = new Date();
    this.timerInterno = item;
    const tmp = new SessioneStudio(this);
    this.onFineSessione.emit(tmp/* this */);
  }
  async Salva() {
    const tmp = new SessioneStudio();
    await tmp.Setta(this)
    this.onFineSessione.emit(tmp/* this */);
  }
}
