import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IListaRipetizioni, IRipetizioneStudio } from '../../../../mp-classi/utility';
import { formataDate, IInterazioneVettoriale, RipetizioneStudio } from '../utility';

@Component({
  selector: 'app-lista-ripetizioni',
  templateUrl: './lista-ripetizioni.component.html',
  styleUrls: ['./lista-ripetizioni.component.css']
})
export class ListaRipetizioniComponent implements OnInit, IInterazioneVettoriale<IRipetizioneStudio>,
  IListaRipetizioni {

  nuovoElemento: IRipetizioneStudio = undefined;
  elementoSelezionato: IRipetizioneStudio = undefined;
  elementoTmp: IRipetizioneStudio = undefined;

  vettoreRipetizioniStudio: Array<IRipetizioneStudio> = new Array<RipetizioneStudio>();

  switch = false;

  constructor() { }

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
    this.vettoreRipetizioniStudio = new Array<IRipetizioneStudio>();
    for (let index = 0; index < item.vettoreRipetizioniStudio.length; index++) {
      const element = item.vettoreRipetizioniStudio[index];
      //this.listaPianiStudio.AggiungiNuovoPiano(element);
      this.AggiungiNuovoRipetizione(element);
    }
    return true;
  }
  ngOnInit(): void {
  }
  
  @Output() onAggiungiRipetizioneStudio = new EventEmitter<IRipetizioneStudio>();
  AggiungiNuovoRipetizione(item?: IRipetizioneStudio): boolean {
    this.nuovoElemento.timerInterno.dataFine = undefined;
    if (item == undefined) item = this.nuovoElemento;
    /* try {
      const tmp = await superagent.post('localhost:8080/api/ListaPianiStudio/AggiungiNuovoPiano')
        .send(item);
    } catch (error) {
      console.log(error);
    } */
    try {
      const tmp = new RipetizioneStudio(item);
      this.vettoreRipetizioniStudio.push(tmp);
      this.onAggiungiRipetizioneStudio.emit(tmp);
      this.nuovoElemento = new RipetizioneStudio();
      this.nuovoElemento.timerInterno.terminato = false;
      (<any>document.getElementById('pomodoroselezionato')).selectedIndex = 0;
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  ModificaRipetizione() {
    return true;
  }
  @Output() onSelezionaRipetizioneStudio = new EventEmitter<{ piano: IRipetizioneStudio, index: number }>();

  SelezionaRipetizioneStudio(item: IRipetizioneStudio, index?: number) {
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
