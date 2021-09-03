import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IListaRipetizioni, ListaRipetizioni } from '../../../../mp-classi/app/lista-piani-ripetizioni';
import { IPianoRipetizione, RipetizioneStudio } from '../../../../mp-classi/app/piano-ripetizione';
import { formataDate } from '../utility';

@Component({
  selector: 'app-lista-ripetizioni',
  templateUrl: './lista-ripetizioni.component.html',
  styleUrls: ['./lista-ripetizioni.component.css']
})
export class ListaRipetizioniComponent extends ListaRipetizioni implements OnInit, IListaRipetizioni {

  switch = false;

  constructor() { super(); }

  @Input()
  set SettaComponente(v: IListaRipetizioni) {
    console.log('sono in input !!!');
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
      this.Setta(v);
    }
  }
  Setta(item: IListaRipetizioni) {
    //this.listaPianiStudio = new ListaPianiStudio();
    this.vettoreRipetizioniStudio = new Array<IPianoRipetizione>();
    for (let index = 0; index < item.vettoreRipetizioniStudio.length; index++) {
      const element = item.vettoreRipetizioniStudio[index];
      //this.listaPianiStudio.AggiungiNuovoPiano(element);
      this.AggiungiNuovoRipetizione(element);
    }
    return true;
  }
  ngOnInit(): void {
  }

  @Output() onAggiungiRipetizioneStudio = new EventEmitter<IPianoRipetizione>();
  async AggiungiNuovoRipetizione(item?: IPianoRipetizione) {
    try {
      if (item != undefined) {
        const tmp = await super.AggiungiNuovoRipetizione(item);
        /*  try {
           const tmp = await superagent.post('localhost:8080/api/ListaPianiStudio/AggiungiNuovoPiano')
             .send(item);
         } catch (error) {
           console.log(error);
         } */
        this.onAggiungiRipetizioneStudio.emit(tmp);
        (<any>document.getElementById('pomodoroselezionato')).selectedIndex = 0;
        return tmp;
      }
    } catch (error) {
      return error;
    }
  }
  async ModificaRipetizione(index: number, item: IPianoRipetizione) {

    /* try {
      const tmp = await superagent.post('localhost:8080/api/ListaPianiStudio/ModificaPiano')
        .send(item);
    } catch (error) {
      console.log(error); 
    }*/
    return await super.ModificaRipetizione(index, item);
  }
  @Output() onSelezionaRipetizioneStudio = new EventEmitter<{ piano: IPianoRipetizione, index: number }>();

  SelezionaRipetizioneStudio(item: IPianoRipetizione, index?: number) {
    console.log('seleziono');
    //this.elementoSelezionato.Setta(item);
    this.elementoSelezionato = item;
    this.onSelezionaRipetizioneStudio.emit({
      index: index,
      piano: item
    });
  }

  public SetDataInizio(v: any) {
    this.nuovoElemento.dataInizio = new Date(Date.parse(v));
  }
  public GetDataInizio(): string {
    let tmp = formataDate(this.nuovoElemento.dataInizio.toDateString());
    return tmp;
  }

}
