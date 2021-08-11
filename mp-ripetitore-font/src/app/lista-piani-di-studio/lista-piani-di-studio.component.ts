import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IPianoStudio, ISessioneStudio } from '../../../../mp-classi/utility';
import { formataDate, IInterazioneVettoriale, ListaPianiStudio, ListaSessioniStudio, PianoStudio } from '../utility';

@Component({
  selector: 'app-lista-piani-di-studio',
  templateUrl: './lista-piani-di-studio.component.html',
  styleUrls: ['./lista-piani-di-studio.component.css']
})
export class ListaPianiDiStudioComponent implements OnInit, IInterazioneVettoriale<IPianoStudio> {

  listaPianiStudio: ListaPianiStudio = new ListaPianiStudio();

  nuovoElemento: IPianoStudio = undefined;
  elementoSelezionato: IPianoStudio = undefined;
  elementoTmp: IPianoStudio = undefined;
  indice = 0;
  switch = false;
  constructor() {
    try {
      let piano = new PianoStudio();

      piano.AggiungiSessione(<ISessioneStudio>{
        dataInizio: new Date(), strutturaPomodoro:
          { tipologia: 'I', count: 2, struttura: [25, 5] },
        dataFine: new Date(),
        commentoConciso: '',
        titolo: 'lettura coscienza di zeno',
        timerInterno: {
          count: 2, numeroCicli: 2, timer: undefined, statoTimer: false, dataInizio: new Date(), terminato: true
        }
      });
      piano.AggiungiSessione(<ISessioneStudio>{
        dataInizio: new Date(), strutturaPomodoro:
          { tipologia: 'II', count: 4, struttura: [20, 5, 20, 5] },
        dataFine: new Date(),
        commentoConciso: '',
        titolo: 'lettura il socrate',
        timerInterno: {
          count: 4, numeroCicli: 4, timer: undefined, statoTimer: false, dataInizio: new Date(), terminato: true
        }
      });
      piano.AggiungiSessione(<ISessioneStudio>{
        dataInizio: new Date(), strutturaPomodoro:
          { tipologia: 'III', count: 4, struttura: [50, 10, 50, 10] },
        dataFine: new Date(),
        commentoConciso: '',
        titolo: 'lettura il capitale',
        timerInterno: {
          count: 4, numeroCicli: 4, timer: undefined, statoTimer: false, dataInizio: new Date(), terminato: true
        }
      });
      piano.AggiungiSessione(<ISessioneStudio>{
        dataInizio: new Date(), strutturaPomodoro:
          { tipologia: 'I', count: 2, struttura: [25, 5] },
        dataFine: new Date(),
        commentoConciso: '',
        titolo: 'lettura teste tonde teste a punta',
        timerInterno: {
          count: 2, numeroCicli: 2, timer: undefined, statoTimer: false, dataInizio: new Date(), terminato: true
        }
      });
      piano.dataFine = new Date();
      piano.titoloGenerale = '';
      this.listaPianiStudio.AggiungiNuovoPiano(piano);

      piano = new PianoStudio();

      piano.AggiungiSessione(<ISessioneStudio>{
        dataInizio: new Date(), strutturaPomodoro:
          { tipologia: 'I', count: 2, struttura: [25, 5] },
        dataFine: new Date(),
        commentoConciso: '',
        titolo: 'primo capitolo',
        timerInterno: {
          count: 2, numeroCicli: 2, timer: undefined, statoTimer: false, dataInizio: new Date(), terminato: true
        }
      });
      piano.AggiungiSessione(<ISessioneStudio>{
        dataInizio: new Date(), strutturaPomodoro:
          { tipologia: 'II', count: 4, struttura: [20, 5, 20, 5] },
        dataFine: new Date(),
        commentoConciso: '',
        titolo: 'secondo capitolo',
        timerInterno: {
          count: 4, numeroCicli: 4, timer: undefined, statoTimer: false, dataInizio: new Date(), terminato: true
        }
      });
      piano.AggiungiSessione(<ISessioneStudio>{
        dataInizio: new Date(), strutturaPomodoro:
          { tipologia: 'III', count: 4, struttura: [50, 10, 50, 10] },
        dataFine: new Date(),
        commentoConciso: '',
        titolo: 'terzo capitolo',
        timerInterno: {
          count: 4, numeroCicli: 4, timer: undefined, statoTimer: false, dataInizio: new Date(), terminato: true
        }
      });
      piano.AggiungiSessione(<ISessioneStudio>{
        dataInizio: new Date(), strutturaPomodoro:
          { tipologia: 'I', count: 2, struttura: [25, 5] },
        dataFine: new Date(),
        commentoConciso: '',
        titolo: 'quarto capitolo',
        timerInterno: {
          count: 2, numeroCicli: 2, timer: undefined, statoTimer: false, dataInizio: new Date(), terminato: true
        }
      });

      piano.titoloGenerale = '';
      this.listaPianiStudio.AggiungiNuovoPiano(piano);
    } catch (er) {
      console.log(er);

    }
  }


  ngOnInit(): void {
    this.nuovoElemento = <IPianoStudio>{
      dataInizio: new Date(),
      listaSessioniStudio: {},
      timerInterno: {
        count: 0,
        dataInizio: new Date(),
        numeroCicli: 0,
        statoTimer: false,
        terminato: false,
        timer: '00:00:00'
      },
      titoloOpera: '',
      dataFine: undefined,
      listaParoleChiavi: []
    };
  }

  SelezionaPianoStudio(item: IPianoStudio) {
    console.log('seleziono');
    this.elementoSelezionato = item;
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
  AggiungiPianoStudio() {
    try {
      this.listaPianiStudio.AggiungiNuovoPiano(this.nuovoElemento);
      this.nuovoElemento = <IPianoStudio>{
        dataInizio: new Date(),
        listaSessioniStudio: {},
        timerInterno: {
          count: 0,
          dataInizio: new Date(),
          numeroCicli: 0,
          statoTimer: false,
          terminato: false,
          timer: '00:00:00'
        },
        titoloOpera: '',
        dataFine: undefined,
        listaParoleChiavi: []
      };
      (<any>document.getElementById('pomodoroselezionato')).selectedIndex = 0;
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  FineSessione(item: IPianoStudio) {
    console.log(item);
    /* this.elementoSelezionato.dataFine = item.dataFine;
    this.elementoSelezionato.titolo = item.titolo;
    this.elementoSelezionato.commentoConciso = item.commentoConciso; */
    //this.elementoSelezionato = item;
    this.listaPianiStudio[this.indice] = item;
    this.elementoSelezionato = undefined;
  }
  ModificaSessione(item: IPianoStudio) {
    console.log(item);
    /* this.elementoSelezionato.dataFine = item.dataFine;
    this.elementoSelezionato.titolo = item.titolo;
    this.elementoSelezionato.commentoConciso = item.commentoConciso; */
    //this.elementoSelezionato = item;
    this.listaPianiStudio[this.indice] = item;
    this.elementoSelezionato = undefined;
  }


  public SetDataInizio(v: any) {
    this.nuovoElemento.dataInizio = new Date(Date.parse(v));
  }
  public GetDataInizio(): string {
    let tmp = formataDate(this.nuovoElemento.dataInizio.toDateString());
    return tmp;
  }
}
