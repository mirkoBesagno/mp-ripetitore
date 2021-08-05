import { Component, Directive, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { ISessioneStudio, StrutturaPomodori, IPianoStudio, ListaSessioniStudio } from '../../../../mp-classi/utility';

@Component({
  selector: 'app-piano-studio',
  templateUrl: './piano-studio.component.html',
  styleUrls: ['./piano-studio.component.css']
})
export class PianoStudioComponent /* extends ListaSessioniStudio */ implements OnInit, IPianoStudio {


  dataInizio: Date = new Date(Date.now());

  listaSessioniStudio: ListaSessioniStudio = new ListaSessioniStudio();

  listaParoleChiavi?: string[];

  titoloOpera: string; //sarebbe piu corretto libro

  lunghezzaPagine: string;

  dataFine?: Date;



  nuovaSessione: ISessioneStudio = undefined; //{ dataInizio: new Date(Date.now()), strutturaPomodoro: undefined };
  sessioneSelezionata: ISessioneStudio = undefined//{ dataInizio: new Date(Date.now()), strutturaPomodoro: undefined };

  public SetDataInizio(v: any) {
    this.dataInizio = new Date(Date.parse(v));
  }
  public GetDataInizio(): string {
    let tmp = formatDate(this.dataInizio.toDateString());
    return tmp;
  }
  constructor() {
    this.dataInizio = new Date();

    this.listaSessioniStudio.AggiungiNuovoPiano(<ISessioneStudio>{
      dataInizio: new Date(), strutturaPomodoro:
        { tipologia: 'I', count: 2, struttura: [25, 5] },
      dataFine: new Date(),
      commentoConciso: '',
      titolo: 'lettura coscienza di zeno',
      statoTime: false, count: 2, terminato: true
    });

    this.listaSessioniStudio.AggiungiNuovoPiano(<ISessioneStudio>{
      dataInizio: new Date(), strutturaPomodoro:
        { tipologia: 'II', count: 4, struttura: [20, 5, 20, 5] },
      dataFine: new Date(),
      commentoConciso: '',
      titolo: 'lettura il socrate',
      statoTime: false, count: 4, terminato: true
    });

    this.listaSessioniStudio.AggiungiNuovoPiano(<ISessioneStudio>{
      dataInizio: new Date(), strutturaPomodoro:
        { tipologia: 'III', count: 4, struttura: [50, 10, 50, 10] },
      dataFine: new Date(),
      commentoConciso: '',
      titolo: 'lettura il capitale',
      statoTime: false, count: 2, terminato: true
    });

    this.listaSessioniStudio.AggiungiNuovoPiano(<ISessioneStudio>{
      dataInizio: new Date(), strutturaPomodoro:
        { tipologia: 'I', count: 2, struttura: [25, 5] },
      dataFine: new Date(),
      commentoConciso: '',
      titolo: 'lettura teste tonde teste a punta',
      statoTime: false, count: 2, terminato: true
    });
  }
  ngOnInit(): void {
    this.dataInizio = new Date();
  }
  Prevista(item: any) {
    const tmp = this.nuovaSessione;
    this.nuovaSessione = undefined;
    this.nuovaSessione = tmp;
  }
  AggiungiSessione(item: ISessioneStudio) {
    try {
      this.listaSessioniStudio.AggiungiNuovoPiano(this.nuovaSessione);
      this.nuovaSessione = <ISessioneStudio>{
        dataInizio: new Date(), strutturaPomodoro: undefined,
        statoTime: false, count: 2, terminato: true
      };
      (<any>document.getElementById('pomodoroselezionato')).selectedIndex = 0;
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  SelezionaPomodoro(item: any) {
    if (this.nuovaSessione == undefined) this.nuovaSessione = <ISessioneStudio>{
      dataInizio: new Date(), strutturaPomodoro: undefined,
      statoTime: false, count: 2, terminato: true
    };
    switch (item.srcElement.value) {
      case 'I':
        this.nuovaSessione.strutturaPomodoro = <StrutturaPomodori>{
          tipologia: "I",
          struttura: [25, 5],
          count: 2
        };
        break;
      case 'II':
        this.nuovaSessione.strutturaPomodoro = <StrutturaPomodori>{
          tipologia: "II", struttura: [20, 5, 20, 5],
          count: 4
        };
        break;
      case 'III':
        this.nuovaSessione.strutturaPomodoro = <StrutturaPomodori>{
          tipologia: "III",
          struttura: [50, 10, 50, 10],
          count: 4
        };
        break;
      default:
        break;
    }

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
    this.sessioneSelezionata = item;
    /*  this.sessioneSelezionata = undefined;
     setTimeout((tmp) => {
       console.log('seleziono 2 :');
       console.log(tmp);
       this.sessioneSelezionata = tmp;
       console.log(this.sessioneSelezionata);
     }, 100, item); */
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
    this.sessioneSelezionata.dataFine = item.dataFine;
    this.sessioneSelezionata.titolo = item.titolo;
    this.sessioneSelezionata.commentoConciso = item.commentoConciso;
  }

  onClickMenu(item: any) {
    /* item.querySelector(".nested").classList.toggle("active");
    item.toggle("caret-down"); */
  }
}


function formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;

  return [year, month, day].join('-');
}