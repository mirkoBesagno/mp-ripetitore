import { Component, OnInit } from '@angular/core';
import { IListaPianiStudio, IPianoStudio, ISessioneStudio, IPersona, IRipetizioneStudio, IListaRipetizioni, ListaRipetizioni } from '../../../../mp-classi/utility';
import { IInterazioneVettoriale, ListaPianiStudio, PianoStudio } from '../utility';

import * as superagent from "superagent";

@Component({
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit, IInterazioneVettoriale<IPianoStudio>, IPersona {

  username: string;
  password: string;
  listaPianiStudio: IListaPianiStudio = undefined;
  listaRipetizioni: IListaRipetizioni = undefined;

  /* public get ListaPianiStudio(): ListaPianiStudio {
    return this.listaPianiStudio;
  } */


  constructor() {

    this.Setta();


  }
  async Setta() {
    try {
      const tmp = new ListaPianiStudio();

      let piano = new PianoStudio();

      await piano.AggiungiSessione(<ISessioneStudio>{
        dataInizio: new Date(), strutturaPomodoro:
          { tipologia: 'I', count: 2, struttura: [25, 5] },
        dataFine: new Date(),
        commentoConciso: '',
        titolo: 'lettura coscienza di zeno',
        timerInterno: {
          count: 2, numeroCicli: 2, timer: undefined, statoTimer: false, dataInizio: new Date(), terminato: true
        }
      });
      await piano.AggiungiSessione(<ISessioneStudio>{
        dataInizio: new Date(), strutturaPomodoro:
          { tipologia: 'II', count: 4, struttura: [20, 5, 20, 5] },
        dataFine: new Date(),
        commentoConciso: '',
        titolo: 'lettura il socrate',
        timerInterno: {
          count: 4, numeroCicli: 4, timer: undefined, statoTimer: false, dataInizio: new Date(), terminato: true
        }
      });
      await piano.AggiungiSessione(<ISessioneStudio>{
        dataInizio: new Date(), strutturaPomodoro:
          { tipologia: 'III', count: 4, struttura: [50, 10, 50, 10] },
        dataFine: new Date(),
        commentoConciso: '',
        titolo: 'lettura il capitale',
        timerInterno: {
          count: 4, numeroCicli: 4, timer: undefined, statoTimer: false, dataInizio: new Date(), terminato: true
        }
      });
      await piano.AggiungiSessione(<ISessioneStudio>{
        dataInizio: new Date(), strutturaPomodoro:
          { tipologia: 'I', count: 2, struttura: [25, 5] },
        dataFine: new Date(),
        commentoConciso: '',
        titolo: 'lettura teste tonde teste a punta',
        timerInterno: {
          count: 2, numeroCicli: 2, timer: undefined, statoTimer: false, dataInizio: new Date(), terminato: true
        }
      });
      /* piano.timerInterno = {
        count: 2, numeroCicli: 2, timer: undefined, statoTimer: false, dataInizio: new Date(), terminato: true
      }; */
      piano.dataFine = new Date();
      piano.titoloOpera = 'primo ooo iii';
      piano.titoloGenerale = 'primo oooo';
      piano.timerInterno = { timer: '00:00:00', dataInizio: new Date(), dataFine: undefined, terminato: true, statoTimer: false, numeroCicli: 0, count: 0 };
      await tmp.AggiungiNuovoPiano(piano);
      piano = new PianoStudio();

      await piano.AggiungiSessione(<ISessioneStudio>{
        dataInizio: new Date(), strutturaPomodoro:
          { tipologia: 'I', count: 2, struttura: [25, 5] },
        dataFine: new Date(),
        commentoConciso: '',
        titolo: 'primo capitolo',
        timerInterno: {
          count: 2, numeroCicli: 2, timer: undefined, statoTimer: false, dataInizio: new Date(), terminato: true
        }
      });
      await piano.AggiungiSessione(<ISessioneStudio>{
        dataInizio: new Date(), strutturaPomodoro:
          { tipologia: 'II', count: 4, struttura: [20, 5, 20, 5] },
        dataFine: new Date(),
        commentoConciso: '',
        titolo: 'secondo capitolo',
        timerInterno: {
          count: 4, numeroCicli: 4, timer: undefined, statoTimer: false, dataInizio: new Date(), terminato: true
        }
      });
      await piano.AggiungiSessione(<ISessioneStudio>{
        dataInizio: new Date(), strutturaPomodoro:
          { tipologia: 'III', count: 4, struttura: [50, 10, 50, 10] },
        dataFine: new Date(),
        commentoConciso: '',
        titolo: 'terzo capitolo',
        timerInterno: {
          count: 4, numeroCicli: 4, timer: undefined, statoTimer: false, dataInizio: new Date(), terminato: true
        }
      });
      await piano.AggiungiSessione(<ISessioneStudio>{
        dataInizio: new Date(), strutturaPomodoro:
          { tipologia: 'I', count: 2, struttura: [25, 5] },
        dataFine: new Date(),
        commentoConciso: '',
        titolo: 'quarto capitolo',
        timerInterno: {
          count: 2, numeroCicli: 2, timer: undefined, statoTimer: false, dataInizio: new Date(), terminato: true
        }
      });
      piano.titoloOpera = 'secondo ooo iiii';
      piano.titoloGenerale = 'secodo ooo';
      piano.timerInterno = { timer: '00:00:00', dataInizio: new Date(), dataFine: undefined, terminato: false, statoTimer: false, numeroCicli: -1, count: 0 };
      await tmp.AggiungiNuovoPiano(piano);
      //this.listaPianiStudio = lista;
      console.log(this.listaPianiStudio);
      this.listaPianiStudio = tmp;
    } catch (er) {
      console.log(er);

    }
  }

  nuovoElemento: IPianoStudio = undefined;
  elementoSelezionato: IPianoStudio = undefined;

  indice = 0;
  indiceTmp = 0;
  public set Indice(v: number) {
    this.indiceTmp = this.indice;
    this.indice = v;
  }

  async ngOnInit(): Promise<void> {
    /* try {
      const tmp = await superagent.get('localhost:8080/api/Persona/GetPersona')
        .query('id:1');
      this.username = tmp.body.username;
      this.password = tmp.body.password;
      this.listaPianiStudio = new ListaPianiStudio();
      this.listaPianiStudio.Setta(tmp.body.listaPianiStudio);
    } catch (error) {
      console.log(error);
    } */
  }

  SelezionaPianoStudio(item: { piano: IPianoStudio, index: number }) {
    console.log('seleziono');
    //this.elementoSelezionato.Setta(item);
    this.elementoSelezionato = undefined;
    setTimeout(async () => {
      const tmp = new PianoStudio();
      await tmp.Setta(item.piano);
      this.elementoSelezionato = tmp;
      if (item.index != undefined)
        this.indice = item.index;
    }, 100);
  }

  SelezionaRipetizioneStudio(item: { piano: IRipetizioneStudio, index: number }) {
    console.log('seleziono');
    //this.elementoSelezionato.Setta(item);
    this.elementoSelezionato = undefined;
    setTimeout(() => {
      this.elementoSelezionato = item.piano;
      if (item.index)
        this.indice = item.index;
    }, 100);
  }
  async AggiungiPianoStudio(item: IPianoStudio) {
    try {
      await this.listaPianiStudio.AggiungiNuovoPiano(item);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async FinePiano(item: IPianoStudio) {
    console.log('fine sessione');
    console.log(item);
    /* this.elementoSelezionato.dataFine = item.dataFine;
    this.elementoSelezionato.titolo = item.titolo;
    this.elementoSelezionato.commentoConciso = item.commentoConciso; */
    //this.elementoSelezionato = item;
    await this.elementoSelezionato.Setta(item);
    if (this.indice >= 0)
      await this.listaPianiStudio.ModificaPiano(this.indice, item);//[this.indice] = item;
    //this.listaPianiStudio = this.listaPianiStudio;
    this.elementoModificato = {
      index:this.indice,
      piano:this.elementoSelezionato
    }
    /* this.indiceTmp = this.Indice;
    this.elementoSelezionato = undefined; */
  }

  elementoModificato: { piano: IPianoStudio, index: number };

  async ModificaSessione(item: IPianoStudio) {
    console.log('modifica sessione');
    console.log(item);
    /* this.elementoSelezionato.dataFine = item.dataFine;
    this.elementoSelezionato.titolo = item.titolo;
    this.elementoSelezionato.commentoConciso = item.commentoConciso; */
    //this.elementoSelezionato = item;
    await this.listaPianiStudio.ModificaPiano(this.indiceTmp, item);//[this.indiceTmp] = item;
    //this.elementoSelezionato = undefined;
    console.log('dhdjdj');

  }
}
