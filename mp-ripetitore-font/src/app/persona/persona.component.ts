import { Component, OnInit } from '@angular/core';
import { IListaPianiStudio, IPianoStudio, ISessioneStudio, IPersona } from '../../../../mp-classi/utility';
import { IInterazioneVettoriale, ListaPianiStudio, PianoStudio } from '../utility';

@Component({
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit, IInterazioneVettoriale<IPianoStudio>, IPersona {

  username: string;
  password: string;
  listaPianiStudio: ListaPianiStudio = undefined;

  public get ListaPianiStudio(): ListaPianiStudio {
    return this.listaPianiStudio;
  }


  constructor() {

    try {
      const lista = new ListaPianiStudio();
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
      /* piano.timerInterno = {
        count: 2, numeroCicli: 2, timer: undefined, statoTimer: false, dataInizio: new Date(), terminato: true
      }; */
      piano.dataFine = new Date();
      piano.titoloOpera = 'primo ooo iii';
      piano.titoloGenerale = 'primo oooo';
      lista.AggiungiNuovoPiano(piano).then(result => {

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
        piano.titoloOpera = 'secondo ooo iiii'
        piano.titoloGenerale = 'secodo ooo';
        lista.AggiungiNuovoPiano(piano).then(reslut2 => {

          this.listaPianiStudio = lista;
          console.log(this.listaPianiStudio);
        });
      });


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

  ngOnInit(): void {
  }

  SelezionaPianoStudio(item: { piano: IPianoStudio, index: number }) {
    console.log('seleziono');
    //this.elementoSelezionato.Setta(item);
    this.elementoSelezionato = item.piano;
    if (item.index)
      this.indice = item.index;
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

  FineSessione(item: IPianoStudio) {
    console.log('fine sessione');
    console.log(item);
    /* this.elementoSelezionato.dataFine = item.dataFine;
    this.elementoSelezionato.titolo = item.titolo;
    this.elementoSelezionato.commentoConciso = item.commentoConciso; */
    //this.elementoSelezionato = item;
    this.elementoSelezionato.Setta(item);
    //this.listaPianiStudio.ModificaPiano(this.indice, item);//[this.indice] = item;

    /* this.indiceTmp = this.Indice;
    this.elementoSelezionato = undefined; */
  }
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
