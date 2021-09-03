import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IListaPianiStudio, ListaPianiStudio } from '../../../../mp-classi/app/lista-piani-studio';

import * as superagent from "superagent";
import { formataDate } from '../utility';
import { IPianoStudio, PianoStudio } from '../../../../mp-classi/app/piano-studio';
import { IInterazioneVettoriale } from '../../../../mp-classi/utility';

@Component({
  selector: 'app-lista-piani-di-studio',
  templateUrl: './lista-piani-di-studio.component.html',
  styleUrls: ['./lista-piani-di-studio.component.css']
})
export class ListaPianiDiStudioComponent extends ListaPianiStudio implements OnInit,
  IListaPianiStudio {


  public SetDataInizio(v: any) {
    this.nuovoElemento.dataInizio = new Date(Date.parse(v));
  }
  public GetDataInizio(): string {
    let tmp = formataDate(this.nuovoElemento.dataInizio.toDateString());
    return tmp;
  }
  public get VettorePianiStudio(): Array<IPianoStudio> {
    return this.vettorePianoStudio;
  }
  @Input()
  set SettaComponente(v: IListaPianiStudio) {
    console.log('sono in input !!!');
    if (v) {
      super.Setta(v);
    }
  }

  @Input()
  set ModificaElementoSpecifico(item: { piano: IPianoStudio, index: number }) {
    console.log('sono in input !!!');
    super.ModificaPiano(item.index, item.piano);
  }

  switch = false;

  @Output() onSelezionaPianoStudio = new EventEmitter<{ piano: IPianoStudio, index: number }>();
  @Output() onAggiungiPianoStudio = new EventEmitter<IPianoStudio>();

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.nuovoElemento = new PianoStudio();
    this.nuovoElemento.timerInterno.terminato = false;
  }

  async SelezionaPianoStudio(item: IPianoStudio, index?: number) {
    console.log('seleziono');
    //this.elementoSelezionato.Setta(item);
    /* this.elementoSelezionato = item; */
    this.elementoSelezionato = new PianoStudio();
    await this.elementoSelezionato.Setta(item);
    this.indice = index;
    this.onSelezionaPianoStudio.emit({
      index: index,
      piano: this.elementoSelezionato
    });
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
  async eventoAggiungiNuovoPiano(item?: IPianoStudio) {
    try {
      const tmp = await super.AggiungiNuovoPiano(item);
      /* try {
        const tmp = await superagent.post('localhost:8080/api/ListaPianiStudio/AggiungiNuovoPiano')
          .send(item);
      } catch (error) {
        console.log(error);
      } */
      this.onAggiungiPianoStudio.emit(tmp);
      this.nuovoElemento = new PianoStudio();
      this.nuovoElemento.timerInterno.terminato = false;
      (<any>document.getElementById('pomodoroselezionato')).selectedIndex = 0;
      return tmp;
    } catch (error) {
      return error;
    }
  }
  async ModificaPiano(index: number, item: IPianoStudio) {

    try {
      const tmp = await superagent.post('localhost:8080/api/ListaPianiStudio/ModificaPiano')
        .send(item);
    } catch (error) {
      console.log(error);
    }

    return await super.ModificaPiano(index, item);
    return true;
  }
}
