import { Component, Directive, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { ISessioneStudio, StrutturaPomodori, IPianoStudio, ITimer } from '../../../../mp-classi/utility';
import { formataDate, IInterazioneVettoriale, ListaSessioniStudio } from '../utility';


@Component({
  selector: 'app-piano-studio',
  templateUrl: './piano-studio.component.html',
  styleUrls: ['./piano-studio.component.css']
})
export class PianoStudioComponent implements OnInit, IPianoStudio, IInterazioneVettoriale<ISessioneStudio> {

  timerInterno: ITimer = {
    statoTimer: false,
    timer: '00:00:00',
    count: 0,
    numeroCicli: -1,
    dataInizio: new Date(),
    terminato: false
  };

  dataInizio: Date = new Date(Date.now());

  listaSessioniStudio: ListaSessioniStudio = new ListaSessioniStudio();

  listaParoleChiavi?: string[];

  titoloOpera: string = ''; //sarebbe piu corretto libro
  public get TitoloOpera(): string {
    return this.titoloOpera;
  }
  public set TitoloOpera(v: string) {
    this.titoloOpera = v;
  }

  titoloGenerale: string = '';
  public set TitoloGenerale(v: string) {
    this.titoloGenerale = v;
  }
  public get TitoloGenerale(): string {
    return this.titoloGenerale;
  }

  dataFine?: Date;

  nuovoElemento: ISessioneStudio = undefined;
  elementoSelezionato: ISessioneStudio = undefined;
  indice = 0;

  settato = false;

  public SetDataInizio(v: any) {
    this.dataInizio = new Date(Date.parse(v));
  }
  public GetDataInizio(): string {
    let tmp = formataDate(this.dataInizio.toDateString());
    return tmp;
  }
  constructor() {
    this.dataInizio = new Date();
  }
  ngOnInit(): void {
    this.dataInizio = new Date();
  }
  Prevista(item: any) {
    const tmp = this.nuovoElemento;
    this.nuovoElemento = undefined;
    this.nuovoElemento = tmp;
  }
  AggiungiSessione() {
    try {
      this.listaSessioniStudio.AggiungiNuovoPiano(this.nuovoElemento);
      this.nuovoElemento = <ISessioneStudio>{
        dataInizio: new Date(), strutturaPomodoro: undefined,
        timerInterno: {
          count: 0, numeroCicli: 0, timer: undefined, statoTimer: false, dataInizio: new Date(), terminato: false
        }
      };
      (<any>document.getElementById('pomodoroselezionato')).selectedIndex = 0;
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
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
  SelezionaSessioneStudio(item: ISessioneStudio) {
    console.log('seleziono');
    this.elementoSelezionato = item;
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
  FineSessione(item: ISessioneStudio) {
    console.log(item);
    /* this.elementoSelezionato.dataFine = item.dataFine;
    this.elementoSelezionato.titolo = item.titolo;
    this.elementoSelezionato.commentoConciso = item.commentoConciso; */
    //this.elementoSelezionato = item;
    this.listaSessioniStudio[this.indice] = item;
    this.elementoSelezionato = undefined;
  }

  onClickMenu(item: any) {
    /* item.querySelector(".nested").classList.toggle("active");
    item.toggle("caret-down"); */
  }

  IntercettaFineTimer(item: ITimer) {
    this.dataFine = new Date();
    this.timerInterno = item;
    this.onFineSessione.emit(this);
  }

  @Output() onFineSessione = new EventEmitter<IPianoStudio>();

  @Output() onModificaPianoStudio = new EventEmitter<IPianoStudio>();

  @Input()
  set Setta(v: IPianoStudio) {
    console.log('sono in input !!!');
    if (v) {
      if (this.settato) {
        this.onModificaPianoStudio.emit(this);
        setTimeout((item: IPianoStudio) => {
          this.SettaPiano(item);
        }, 100, v);
      }
      else {
        this.SettaPiano(v);
      }
    }
  }
  SettaPiano(v: IPianoStudio) {
    this.dataInizio = v.dataInizio ?? new Date();
    this.dataFine = v.dataFine ?? undefined;
    this.listaParoleChiavi = v.listaParoleChiavi ?? [];
    this.listaSessioniStudio = v.listaSessioniStudio ?? undefined;
    this.timerInterno = v.timerInterno ?? {
      statoTimer: false,
      timer: '00:00:00',
      count: 0,
      numeroCicli: -1,
      dataInizio: new Date(),
      terminato: false
    };
    this.titoloOpera = v.titoloOpera ?? '';
    this.titoloGenerale = v.titoloGenerale ?? '';
    this.settato = true;
  }
}
