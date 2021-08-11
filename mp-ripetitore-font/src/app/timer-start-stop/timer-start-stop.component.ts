import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ITimer } from '../../../../mp-classi/utility';


@Component({
  selector: 'app-timer-start-stop',
  templateUrl: './timer-start-stop.component.html',
  styleUrls: ['./timer-start-stop.component.css']
})
export class TimerStartStopComponent implements OnInit, ITimer {

  constructor() { }

  ngOnInit(): void {
  }

  statoTimer = false;
  count = 0;
  numeroCicli = 0;
  dataInizio: Date = new Date();
  dataFine = undefined;
  intervallo: any;
  timer = '00:00:00';
  terminato = false;

  @Output() onFineTimer = new EventEmitter<ITimer>();
  StartTimer() {
    if (this.statoTimer == false)
      if (this.count < this.numeroCicli || this.numeroCicli < 0) {
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
          if ((tmp1 - tmp2) < this.numeroCicli) {
            this.StopTimer();
          }
        });
        this.statoTimer = true;
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
    this.statoTimer = false;
    if (this.count < this.numeroCicli || this.numeroCicli < 0) {
      this.count++;
    }
    if (this.count >= this.numeroCicli && (this.dataFine == undefined || this.numeroCicli < 0)) {
      this.dataFine = new Date();
      if (this.numeroCicli >= 0)
        this.terminato = true;
      this.onFineTimer.emit(this);
    }
  }
  VerificaStatoTimerIsTerminato() {
    if (this.count >= this.numeroCicli && this.dataFine == undefined) return true;
    else return false;
  }
  @Input()
  set Setta(item: ITimer) {
    console.log('sono in input !!!');
    if (item) {
      this.dataInizio = item.dataInizio ?? new Date();
      this.count = item.count ?? 0;

      this.dataFine = undefined;

      this.statoTimer = item.statoTimer ?? false;
      this.timer = item.timer ?? '00:00:00';
      this.count = item.count ?? 0;
      this.terminato = item.terminato ?? false;
      this.numeroCicli = item.numeroCicli ?? this.count;
    }
  }
}
