import { Component, Directive, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';


export interface IPianoStudio {
  dataInizio: Date;
}


@Component({
  selector: 'app-piano-studio',
  templateUrl: './piano-studio.component.html',
  styleUrls: ['./piano-studio.component.css']
})
export class PianoStudioComponent implements OnInit, IPianoStudio {

  dataInizio: Date = new Date(Date.now());
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