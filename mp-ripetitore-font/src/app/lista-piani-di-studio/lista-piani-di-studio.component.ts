import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IListaPianiStudio, IPianoStudio, ISessioneStudio } from '../../../../mp-classi/utility';
import { formataDate, IInterazioneVettoriale, PianoStudio } from '../utility';

@Component({
  selector: 'app-lista-piani-di-studio',
  templateUrl: './lista-piani-di-studio.component.html',
  styleUrls: ['./lista-piani-di-studio.component.css']
})
export class ListaPianiDiStudioComponent implements OnInit, IInterazioneVettoriale<IPianoStudio>,
  IListaPianiStudio {

  vettorePianoStudio: Array<IPianoStudio> = new Array<PianoStudio>();

  public get VettorePianoStudio(): Array<IPianoStudio> {
    if (this.vettorePianoStudio.length > 0)
      console.log('');
    if (this.vettorePianoStudio.length > 1)
      console.log('');
    if (this.vettorePianoStudio.length > 2)
      console.log('');
    return this.vettorePianoStudio;
  }

  /* listaPianiStudio: ListaPianiStudio = new ListaPianiStudio();

  public get ListaPianiStudio(): ListaPianiStudio {
    return this.listaPianiStudio;
  } */

  nuovoElemento: IPianoStudio = undefined;
  elementoSelezionato: IPianoStudio = undefined;
  elementoTmp: IPianoStudio = undefined;

  indiceTmp = -1;

  switch = false;
  constructor() {
  }
  async Setta(item: IListaPianiStudio) {
    //this.listaPianiStudio = new ListaPianiStudio();
    this.vettorePianoStudio = new Array<PianoStudio>();
    for (let index = 0; index < item.vettorePianoStudio.length; index++) {
      const element = item.vettorePianoStudio[index];
      //this.listaPianiStudio.AggiungiNuovoPiano(element);
      await this.AggiungiNuovoPiano(element);
    }
    return true;
  }

  @Input()
  set SettaComponente(v: IListaPianiStudio) {
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

  @Input()
  set ModificaElementoSpecifico(item: { piano: IPianoStudio, index: number }) {
    console.log('sono in input !!!');
    this.vettorePianoStudio[item.index].Setta(item.piano);
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

    this.indiceTmp = index;

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
  async AggiungiNuovoPiano(item?: IPianoStudio): Promise<boolean> {
    if (this.nuovoElemento)
      this.nuovoElemento.timerInterno.dataFine = undefined;
    if (item == undefined && this.nuovoElemento != undefined)
      item = this.nuovoElemento;
    if (item == undefined)
      console.log('ciao');
    /* try {
      const tmp = await superagent.post('localhost:8080/api/ListaPianiStudio/AggiungiNuovoPiano')
        .send(item);
    } catch (error) {
      console.log(error);
    } */
    try {
      const tmp = new PianoStudio();
      await tmp.Setta(item);
      this.vettorePianoStudio.push(tmp);
      this.onAggiungiPianoStudio.emit(tmp);
      this.nuovoElemento = new PianoStudio();
      this.nuovoElemento.timerInterno.terminato = false;
      (<any>document.getElementById('pomodoroselezionato')).selectedIndex = 0;
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  ModificaPiano() {
    return true;
  }
  /* async AggiungiPianoStudio() {
    try {
      await this.listaPianiStudio.AggiungiNuovoPiano(this.nuovoElemento);
      this.onAggiungiPianoStudio.emit(this.nuovoElemento);
      this.nuovoElemento = new PianoStudio();
      (<any>document.getElementById('pomodoroselezionato')).selectedIndex = 0;
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  } */

  @Output() onSelezionaPianoStudio = new EventEmitter<{ piano: IPianoStudio, index: number }>();
  @Output() onAggiungiPianoStudio = new EventEmitter<IPianoStudio>();

  public SetDataInizio(v: any) {
    this.nuovoElemento.dataInizio = new Date(Date.parse(v));
  }
  public GetDataInizio(): string {
    let tmp = formataDate(this.nuovoElemento.dataInizio.toDateString());
    return tmp;
  }
}
