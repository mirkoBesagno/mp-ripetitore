import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IListaSessioniStudio, ISessioneStudio, StrutturaPomodori } from '../../../../mp-classi/utility';
import { formataDate, IInterazioneVettoriale, ListaSessioniStudio, SessioneStudio } from '../utility';

@Component({
  selector: 'app-lista-sessione-studio',
  templateUrl: './lista-sessione-studio.component.html',
  styleUrls: ['./lista-sessione-studio.component.css']
})
export class ListaSessioneStudioComponent implements OnInit, IInterazioneVettoriale<ISessioneStudio>,
  IListaSessioniStudio {
  chiusa = false;
  vettoreSessioniStudio: Array<ISessioneStudio> = new Array<SessioneStudio>();

  public get VettoreSessioniStudio(): Array<ISessioneStudio> {
    return this.vettoreSessioniStudio;
  }

  /* listaPianiStudio: ListaPianiStudio = new ListaPianiStudio();

  public get ListaPianiStudio(): ListaPianiStudio {
    return this.listaPianiStudio;
  } */

  nuovoElemento: ISessioneStudio = undefined;
  elementoSelezionato: ISessioneStudio = undefined;
  elementoTmp: ISessioneStudio = undefined;

  switch = false;
  constructor() {
  }
  async Setta(item: IListaSessioniStudio) {
    //this.listaPianiStudio = new ListaPianiStudio();
    this.nuovoElemento = new SessioneStudio();
    const tmp = new Array<ISessioneStudio>();
    this.vettoreSessioniStudio = new Array<ISessioneStudio>();
    for (let index = 0; index < item.vettoreSessioniStudio.length; index++) {
      const element = item.vettoreSessioniStudio[index];
      //this.listaPianiStudio.AggiungiNuovoPiano(element);
      await this.AggiungiNuovaSessione(element);
    }
    return true;
  }

  @Input()
  set SettaComponente(v: IListaSessioniStudio) {
    console.log('sono in input !!!');
    this.vettoreSessioniStudio = undefined;
    if (v) {
      /* if (this.settato) {
        this.onModificaPianoStudio.emit(new PianoStudio(this));
        setTimeout((item: IPianoStudio) => {
          //this.SettaPiano(item);
          this.Setta(item)
        }, 100, v);
      }
      else {
        this.Setta(v);
      } */
      setTimeout(async () => {
        //this.SettaPiano(item);
        await this.Setta(v)
      }, 100);
      //this.Setta(v);
    }
  }

  ngOnInit(): void {
    this.nuovoElemento = new SessioneStudio();
    this.nuovoElemento.timerInterno.terminato = false;
  }

  SelezionaSessioneStudio(item: ISessioneStudio, index?: number) {
    console.log('seleziono');
    //this.elementoSelezionato.Setta(item);
    this.elementoSelezionato = item;
    this.onSelezionaSessioneStudio.emit({
      index: index,
      piano: item
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
  async AggiungiNuovaSessione(item?: ISessioneStudio): Promise<boolean> {
    this.nuovoElemento.timerInterno.dataFine = undefined;
    if (item == undefined) item = this.nuovoElemento;
    /* try {
      const tmp = await superagent.post('localhost:8080/api/ListaPianiStudio/AggiungiNuovoPiano')
        .send(item);
    } catch (error) {
      console.log(error);
    } */
    try {
      const tmp = new SessioneStudio();
      await tmp.Setta(item);
      this.vettoreSessioniStudio.push(tmp);
      this.onAggiungiSessioneStudio.emit(tmp);
      this.nuovoElemento = new SessioneStudio();
      this.nuovoElemento.timerInterno.terminato = false;
      (<any>document.getElementById('pomodoroselezionato')).selectedIndex = 0;
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  ModificaSessione() {
    return true;
  }
  /* async AggiungiPianoStudio() {
    try {
      await this.listaPianiStudio.AggiungiNuovoPiano(this.nuovoElemento);
      this.onAggiungiPianoStudio.emit(this.nuovoElemento);
      this.nuovoElemento = new PianoStudio();
      (<any>document.getElementById('pomodoroselezionato')).selectedIndex = 0;
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  } */

  @Output() onSelezionaSessioneStudio = new EventEmitter<{ piano: ISessioneStudio, index: number }>();
  @Output() onAggiungiSessioneStudio = new EventEmitter<ISessioneStudio>();

  public SetDataInizio(v: any) {
    this.nuovoElemento.dataInizio = new Date(Date.parse(v));
  }
  public GetDataInizio(): string {
    let tmp = formataDate(this.nuovoElemento.dataInizio.toDateString());
    return tmp;
  }
  SetTitolo(item: any) {
    console.log("ciao");
    /*  if (this.nuovoElemento != undefined && this.nuovoElemento.titolo == undefined) {
       this.nuovoElemento.titolo = item;
     } */
    if (this.nuovoElemento == undefined) {
      this.elementoSelezionato = new SessioneStudio();
    }
    this.nuovoElemento.titolo = item;
  }
  /* GetTitolo() {
    let tmp = '';
    if (this.nuovoElemento != undefined && this.nuovoElemento.titolo == undefined) {
      this.nuovoElemento.titolo = '';
    }
    if (this.nuovoElemento == undefined) {
      tmp = '';
    }
    else {
      tmp = this.nuovoElemento.titolo;
    }

    return tmp;
  } */

  SelezionaPomodoro(item: any) {
    if (this.nuovoElemento == undefined) this.nuovoElemento = <ISessioneStudio>{
      dataInizio: new Date(), strutturaPomodoro: undefined,
      timerInterno: {
        count: 0, numeroCicli: 0, timer: undefined, statoTimer: false,
        dataInizio: new Date(), terminato: false
      }
    };
    switch (item.srcElement.value) {
      case 'I':
        this.nuovoElemento.strutturaPomodoro = <StrutturaPomodori>{
          tipologia: "I",
          struttura: [25, 5],
          count: 2
        };
        break;
      case 'II':
        this.nuovoElemento.strutturaPomodoro = <StrutturaPomodori>{
          tipologia: "II", struttura: [20, 5, 20, 5],
          count: 4
        };
        break;
      case 'III':
        this.nuovoElemento.strutturaPomodoro = <StrutturaPomodori>{
          tipologia: "III",
          struttura: [50, 10, 50, 10],
          count: 4
        };
        break;
      default:
        break;
    }
    this.nuovoElemento.timerInterno.numeroCicli = this.nuovoElemento.strutturaPomodoro.count ?? 0;
  }

  @Input()
  set ShowAdd(v: boolean) {
    console.log('sono in input !!!');
    if (v== undefined) v = false;
    this.chiusa = v;
  }
}
