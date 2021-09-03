import { Component, OnInit } from '@angular/core';
import { Persona, IPersona } from "../../../../mp-classi/app/persona";

import * as superagent from "superagent";
import { ListaPianiStudio } from '../../../../mp-classi/app/lista-piani-studio';
import { IPianoStudio, PianoStudio } from '../../../../mp-classi/app/piano-studio';
import { ISessioneStudio } from '../../../../mp-classi/app/sessione-studio';
import { IInterazioneVettoriale } from '../../../../mp-classi/utility';



@Component({
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent extends Persona
  implements OnInit, IInterazioneVettoriale<IPianoStudio>, IPersona {

  constructor() {
    super();
    setTimeout(async () => {
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
            count: 2, numeroCicli: 2, timer: '00:00:00', statoTimer: false, dataInizio: new Date(), terminato: true
          }
        });
        await piano.AggiungiSessione(<ISessioneStudio>{
          dataInizio: new Date(), strutturaPomodoro:
            { tipologia: 'II', count: 4, struttura: [20, 5, 20, 5] },
          dataFine: new Date(),
          commentoConciso: '',
          titolo: 'lettura il socrate',
          timerInterno: {
            count: 4, numeroCicli: 4, timer: '00:00:00', statoTimer: false, dataInizio: new Date(), terminato: true
          }
        });
        await piano.AggiungiSessione(<ISessioneStudio>{
          dataInizio: new Date(), strutturaPomodoro:
            { tipologia: 'III', count: 4, struttura: [50, 10, 50, 10] },
          dataFine: new Date(),
          commentoConciso: '',
          titolo: 'lettura il capitale',
          timerInterno: {
            count: 4, numeroCicli: 4, timer: '00:00:00', statoTimer: false, dataInizio: new Date(), terminato: true
          }
        });
        await piano.AggiungiSessione(<ISessioneStudio>{
          dataInizio: new Date(), strutturaPomodoro:
            { tipologia: 'I', count: 2, struttura: [25, 5] },
          dataFine: new Date(),
          commentoConciso: '',
          titolo: 'lettura teste tonde teste a punta',
          timerInterno: {
            count: 2, numeroCicli: 2, timer: '00:00:00', statoTimer: false, dataInizio: new Date(), terminato: true
          }
        });
        /* piano.timerInterno = {
          count: 2, numeroCicli: 2, timer: '00:00:00', statoTimer: false, dataInizio: new Date(), terminato: true
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
            count: 2, numeroCicli: 2, timer: '00:00:00', statoTimer: false, dataInizio: new Date(), terminato: true
          }
        });
        await piano.AggiungiSessione(<ISessioneStudio>{
          dataInizio: new Date(), strutturaPomodoro:
            { tipologia: 'II', count: 4, struttura: [20, 5, 20, 5] },
          dataFine: new Date(),
          commentoConciso: '',
          titolo: 'secondo capitolo',
          timerInterno: {
            count: 4, numeroCicli: 4, timer: '00:00:00', statoTimer: false, dataInizio: new Date(), terminato: true
          }
        });
        await piano.AggiungiSessione(<ISessioneStudio>{
          dataInizio: new Date(), strutturaPomodoro:
            { tipologia: 'III', count: 4, struttura: [50, 10, 50, 10] },
          dataFine: new Date(),
          commentoConciso: '',
          titolo: 'terzo capitolo',
          timerInterno: {
            count: 4, numeroCicli: 4, timer: '00:00:00', statoTimer: false, dataInizio: new Date(), terminato: true
          }
        });
        await piano.AggiungiSessione(<ISessioneStudio>{
          dataInizio: new Date(), strutturaPomodoro:
            { tipologia: 'I', count: 2, struttura: [25, 5] },
          dataFine: new Date(),
          commentoConciso: '',
          titolo: 'quarto capitolo',
          timerInterno: {
            count: 2, numeroCicli: 2, timer: '00:00:00', statoTimer: false, dataInizio: new Date(), terminato: true
          }
        });
        piano.titoloOpera = 'secondo ooo iiii';
        piano.titoloGenerale = 'secodo ooo';
        piano.timerInterno = { timer: '00:00:00', dataInizio: new Date(), dataFine: undefined, terminato: false, statoTimer: false, numeroCicli: -1, count: 0 };
        await tmp.AggiungiNuovoPiano(piano);
        //this.listaPianiStudio = lista;
        console.log(this.listaPianiStudio);
        tmp.elementoSelezionato = undefined;
        tmp.nuovoElemento= undefined;
        tmp.indice = 0;
        this.listaPianiStudio = tmp;
      } catch (er) {
        console.log(er);

      }
    });
  }

  nuovoElemento: IPianoStudio = undefined;
  elementoSelezionato: IPianoStudio = undefined;
  indice = 0;

  indiceTmp = 0;

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

  SelezionaRipetizioneStudio(item: { piano: IPianoStudio, index: number }) {
    console.log('seleziono');
    //this.elementoSelezionato.Setta(item);
    this.elementoSelezionato = undefined;
    setTimeout(() => {
      this.elementoSelezionato = item.piano;
      if (item.index)
        this.indice = item.index;
    }, 100);
  }

  async FinePiano(item: IPianoStudio) {
    console.log('fine sessione');
    console.log(item);
    await this.elementoSelezionato.Setta(item);
    if (this.indice >= 0)
      await this.listaPianiStudio.ModificaPiano(this.indice, item);
    this.elementoModificato = {
      index: this.indice,
      piano: this.elementoSelezionato
    }
  }

  elementoModificato: { piano: IPianoStudio, index: number };

  async ModificaSessione(item: IPianoStudio) {
    console.log('modifica sessione');
    console.log(item);
    await this.listaPianiStudio.ModificaPiano(this.indiceTmp, item);
    console.log('dhdjdj');

  }
}
