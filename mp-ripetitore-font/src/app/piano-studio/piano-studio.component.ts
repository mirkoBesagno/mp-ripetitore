import { Component, Directive, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IListaSessioniStudio, ListaSessioniStudio } from '../../../../mp-classi/app/lista-sessioni-studio';
import { IPianoStudio, PianoStudio } from '../../../../mp-classi/app/piano-studio';
import { ISessioneStudio, SessioneStudio } from '../../../../mp-classi/app/sessione-studio';
import { StrutturaPomodori } from '../../../../mp-classi/app/struttura-pomodoro';
import { ITimer } from '../../../../mp-classi/app/timer';
import { IInterazioneVettoriale } from '../../../../mp-classi/utility';
import { formataDate } from '../utility';



@Component({
  selector: 'app-piano-studio',
  templateUrl: './piano-studio.component.html',
  styleUrls: ['./piano-studio.component.css']
})
export class PianoStudioComponent extends PianoStudio
  implements OnInit, IPianoStudio {

  settato = false;

  mostra_nascondi_aggiungiSessione = false;
  mostra_nascondi_terminaSessione = false;
  
  public get GetListaSessioniStudio(): IListaSessioniStudio {
    return this.listaSessioniStudio;
  }
  public get TitoloOpera(): string {
    return this.titoloOpera;
  }
  public set TitoloOpera(v: string) {
    this.titoloOpera = v;
  }
  public set TitoloGenerale(v: string) {
    this.titoloGenerale = v;
  }
  public get TitoloGenerale(): string {
    return this.titoloGenerale;
  }

  @Output() onFinePiano = new EventEmitter<IPianoStudio>();
  @Output() onModificaPianoStudio = new EventEmitter<IPianoStudio>();
  @Input()
  set SettaComponente(v: IPianoStudio) {
    console.log('sono in input !!!');
    this.elementoSelezionato = undefined;
    this.nuovoElemento = undefined;
    this.listaSessioniStudio = undefined;
    this.timerInterno = undefined;
    if (v) {
      setTimeout(async () => {
        if (this.settato) {
          await this.Setta(v);/* .finally(() => {
            this.onModificaPianoStudio.emit(new PianoStudio(this));
          }); */
        }
        else {
          await this.Setta(v);
        }
      });
    }
  }
  async Setta(item: IPianoStudio) {
    this.mostra_nascondi_aggiungiSessione = false;
    this.mostra_nascondi_terminaSessione = false;
    const tmp = await super.Setta(item);
    return true;
  }
  public SetDataInizio(v: any) {
    this.dataInizio = new Date(Date.parse(v));
  }
  public GetDataInizio(): string {
    let tmp = formataDate(this.dataInizio.toDateString());
    return tmp;
  }
  public GetDataFine(): string {
    let tmp = formataDate(this.dataFine.toDateString());
    return tmp;
  }

  constructor() {
    super();
  }

  /* altezza = 0;
  larghezza = 0; */
  ngOnInit(): void {
    this.dataInizio = new Date();

    /* const tmp = document.getElementById('idPianiStudioMenu');
    this.altezza = tmp.scrollHeight;
    this.larghezza = tmp.scrollWidth;
    console.log(tmp); */

  }
  Prevista(item: any) {
    const tmp = this.nuovoElemento;
    this.nuovoElemento = undefined;
    this.nuovoElemento = tmp;
  }
  async AggiungiSessione(item?: ISessioneStudio) {
    try {
      await super.AggiungiSessione(item);
      //await this.listaSessioniStudio.AggiungiNuovaSessione(this.nuovoElemento);
      this.nuovoElemento = new SessioneStudio();
      (<any>document.getElementById('pomodoroselezionato')).selectedIndex = 0;
      this.mostra_nascondi_aggiungiSessione = false;
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  async SelezionaPomodoro(item: any) {
    if (this.nuovoElemento == undefined) {
      this.nuovoElemento = new SessioneStudio();
      await this.nuovoElemento.Setta();
    }
    super.listaSessioniStudio.SettaTimerNuovoElementoConPomodoro(item.srcElement.value);
  }
  SelezionaSessioneStudio(item: {
    piano: ISessioneStudio,
    index: number
  }) {
    console.log('seleziono');
    this.elementoSelezionato = undefined;
    setTimeout((tmp) => {
      this.elementoSelezionato = tmp.piano;
    }, 100, item);
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
  async IntercettaFineSessione(item: ISessioneStudio) {
    console.log(item);
    await this.elementoSelezionato.Setta(item);
    await this.listaSessioniStudio.ModificaSessione(this.indice, item);
    await this.Salva();
  }
  onClickMenu(item: any) {
    /* item.querySelector(".nested").classList.toggle("active");
    item.toggle("caret-down"); */
  }
  IntercettaFineTimer(item: ITimer) {
    this.dataFine = new Date();
    this.timerInterno = item;
    const tmp = new PianoStudio();
    tmp.Setta(this);
    this.onFinePiano.emit(tmp);
  }
  async Salva() {
    const tmp = new PianoStudio();
    await tmp.Setta(this);
    
    this.elementoModificato = {
      index: this.indice,
      sessioneStudio: this.elementoSelezionato
    }
    this.onFinePiano.emit(tmp);
  }
  
  elementoModificato: { sessioneStudio: ISessioneStudio, index: number };
  async ClickFineSessione() {
    this.dataFine = new Date();
    await this.Salva();
  }


  SchegliNuovoSelezionata(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
  }
}
