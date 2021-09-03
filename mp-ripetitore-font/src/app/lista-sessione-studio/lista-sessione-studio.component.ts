import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IListaSessioniStudio, ListaSessioniStudio } from '../../../../mp-classi/app/lista-sessioni-studio';
import { ISessioneStudio, SessioneStudio } from '../../../../mp-classi/app/sessione-studio';
import { StrutturaPomodori } from '../../../../mp-classi/app/struttura-pomodoro';
import { formataDate } from '../utility';

@Component({
  selector: 'app-lista-sessione-studio',
  templateUrl: './lista-sessione-studio.component.html',
  styleUrls: ['./lista-sessione-studio.component.css']
})
export class ListaSessioneStudioComponent extends ListaSessioniStudio implements OnInit,
  IListaSessioniStudio {

  public get VettoreSessioniStudio(): Array<ISessioneStudio> {
    return this.vettoreSessioniStudio;
  }
  switch = false;
  @Input()
  set ShowAdd(v: boolean) {
    console.log('sono in input !!!');
    if (v == undefined) v = false;
    this.chiusa = v;
  }
  @Input()
  set SettaComponente(v: IListaSessioniStudio) {
    console.log('sono in input !!!');
    this.vettoreSessioniStudio = undefined;
    if (v) {
      setTimeout(async () => {
        //this.SettaPiano(item);
        const tmp = await this.Setta(v);
        //this.vettoreSessioniStudio = tmp.vettoreSessioniStudio;
        console.log("ciao");
      }, 100);
    }
  }  
  @Input()
  set ModificaElementoSpecifico(item: { sessioneStudio: ISessioneStudio, index: number }) {
    console.log('sono in input !!!');
    super.ModificaSessione(item.index, item.sessioneStudio);
  }
  public SetDataInizio(v: any) {
    this.nuovoElemento.dataInizio = new Date(Date.parse(v));
  }
  public GetDataInizio(): string {
    let tmp = formataDate(this.nuovoElemento.dataInizio.toDateString());
    return tmp;
  }
  SetTitolo(item: any) {
    console.log("ciao");
    if (this.nuovoElemento == undefined) {
      this.elementoSelezionato = new SessioneStudio();
    }
    this.nuovoElemento.titolo = item;
  }
  @Output() onSelezionaSessioneStudio = new EventEmitter<{ piano: ISessioneStudio, index: number }>();
  @Output() onAggiungiSessioneStudio = new EventEmitter<ISessioneStudio>();
  constructor() {
    super();
  }

  ngOnInit(): void {
    this.nuovoElemento = new SessioneStudio();
    this.nuovoElemento.timerInterno.terminato = false;
  }

  SelezionaSessioneStudio(item: ISessioneStudio, index?: number) {
    console.log('seleziono');
    //this.elementoSelezionato.Setta(item);
    this.elementoSelezionato = new SessioneStudio();
    this.elementoSelezionato.Setta(item);
    this.indice = index;
    this.onSelezionaSessioneStudio.emit({
      index: index,
      piano: this.elementoSelezionato
    });
  }
  StrutturaPomodotoToString(item: StrutturaPomodori): string {
    if (item && 'tipologia' in item) {
      switch (item.tipologia) {
        case 'I':
          return 'I : [25, 5]';
        case 'II':
          return 'II : [20, 5, 20, 5]';
        case 'III':
          return 'III : [50, 10, 50, 10]';
        default:
          return 'default';
          break;
      }
    }
    else {
      return 'undefined';
    }
  }
  SchegliNuovoSelezionata(evt, cityName) {
    var i, tabcontentlistapiani, tablistapiani;
    tabcontentlistapiani = document.getElementsByClassName("tabcontentlistapiani");
    for (i = 0; i < tabcontentlistapiani.length; i++) {
      tabcontentlistapiani[i].style.display = "none";
    }
    tablistapiani = document.getElementsByClassName("tablistapiani");
    for (i = 0; i < tablistapiani.length; i++) {
      tablistapiani[i].className = tablistapiani[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
  }
  async AggiungiNuovaSessione(item?: ISessioneStudio) {
    if (item == undefined) item = this.nuovoElemento;
    /* try {
      const tmp = await superagent.post('localhost:8080/api/ListaPianiStudio/AggiungiNuovoPiano')
        .send(item);
    } catch (error) {
      console.log(error);
    } */
    try {
      const tmp = await super.AggiungiNuovaSessione(item);
      this.onAggiungiSessioneStudio.emit(tmp);
      this.nuovoElemento = new SessioneStudio();
      this.nuovoElemento.timerInterno.terminato = false;
      (<any>document.getElementById('pomodoroselezionato')).selectedIndex = 0;
      return tmp;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  SelezionaPomodoro(item: any) {
    this.SettaTimerNuovoElementoConPomodoro(item.srcElement.value);
  }

}
