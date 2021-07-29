import { Component, Directive, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IPianoStudio, ISessioneStudio } from '../utility';


@Component({
  selector: 'app-piano-studio',
  templateUrl: './piano-studio.component.html',
  styleUrls: ['./piano-studio.component.css']
})
export class PianoStudioComponent implements OnInit, IPianoStudio {

  nuovaSessione: ISessioneStudio = { dataInizio: new Date(Date.now()), strutturaPomodoro: undefined };
  sessioneSelezionata: ISessioneStudio = { dataInizio: new Date(Date.now()), strutturaPomodoro: undefined };

  dataInizio: Date = new Date(Date.now());
  listaSessioni: ISessioneStudio[] = [];

  public SetDataInizio(v: any) {
    console.log(v);
    this.dataInizio = new Date(Date.parse(v));
  }
  public GetDataInizio(): string {
    let tmp = formatDate(this.dataInizio.toDateString());
    return tmp;
  }

  constructor() {
    this.dataInizio = new Date();
  }

  ngOnInit(): void {
    this.dataInizio = new Date();
  }
  Prevista(item: any) {
    const tmp = this.nuovaSessione;
    this.nuovaSessione = undefined;
    this.nuovaSessione = tmp;
  }

  AggiungiSessione(item: any) {
    console.log(item);
    this.listaSessioni.push(this.sessioneSelezionata);
  }
  SelezionaPomodoro(item: any) {
    switch (item) {
      case 'I':
        this.nuovaSessione.strutturaPomodoro = {
          tipologia: "I",
          studio: 25,
          riposo: 5
        };
        break;
      case 'II':
        this.nuovaSessione.strutturaPomodoro = {
          tipologia: "II",
          studio1: 20,
          riposo1: 5,
          studio2: 20,
          riposo2: 5
        };
        break;
      case 'II':
        this.nuovaSessione.strutturaPomodoro = {
          tipologia: "III",
          studio1: 50,
          riposo1: 10,
          studio2: 50,
          riposo2: 10,
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