import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ITimer } from '../../../../mp-classi/app/timer';

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

  dataTmp = new Date();
  StartTimer() {
    this.dataTmp = new Date();
    if (this.statoTimer == false)
      if (this.count < this.numeroCicli || this.numeroCicli < 0) {
        this.intervallo = setInterval(() => {

          const dataOra = new Date().getTime();
          const temp = this.dataTmp.getTime();

          let millisecondi = 0;
          let secondi = 0;
          let minuti = 0;
          let ore = 0;

          const contatore = (dataOra - temp);

          const x = this.CalcoloMillisecondi(contatore);
          millisecondi = x.ritorno;
          ore = Math.floor(x.resto / (60 * 60));
          var div_for_min = x.resto % (60 * 60);
          minuti = Math.floor(div_for_min / 60);
          var div_for_sec = div_for_min % 60;
          secondi = Math.ceil(div_for_sec);

          this.timer = '';
          const tmp = new Date();
          if (String(secondi).length == 1) this.timer = this.timer + '0' + String(secondi);
          else this.timer = this.timer + String(secondi);
          this.timer = ':' + this.timer;
          if (String(minuti).length == 1) this.timer = '0' + String(minuti) + this.timer;
          else this.timer = String(minuti) + this.timer;
          this.timer = ':' + this.timer;
          if (String(ore).length == 1) this.timer = '0' + ore + this.timer;
          else this.timer = ore + this.timer;

          if (String(millisecondi).length == 1) this.timer = this.timer + '..00' + millisecondi;
          else if (String(millisecondi).length == 2) this.timer = this.timer + '..0' + millisecondi;
          else this.timer = this.timer + '..' + millisecondi;

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
      if (this.numeroCicli != -1)
        this.onFineTimer.emit({
          count: this.count,
          dataInizio: this.dataInizio,
          numeroCicli: this.numeroCicli,
          statoTimer: this.statoTimer,
          terminato: this.terminato,
          timer: this.timer,
          dataFine:undefined
        });
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
      this.numeroCicli = item.numeroCicli ?? 0;
    }
  }

  public get determinaDisabilita(): boolean {
    if (this.terminato == false) {
      if (this.statoTimer == false) return false;
      if (this.statoTimer == true) return true;
      else return true;
    }
    else {
      return true;
    }
  }

  CalcoloMillisecondi(numeroDaDividere: number) {
    let appoggio = numeroDaDividere / 1000; // divido per trovare quanti millisecondi ci sono
    let restante = parseInt('' + appoggio); // prendo restante 
    let ritorno = 0;
    if ((appoggio + '').split('.').length > 0)
      ritorno = Number((appoggio + '').split('.')[1]);
    return {
      ritorno: Number(ritorno),
      resto: Number(restante)
    };
  }
}
