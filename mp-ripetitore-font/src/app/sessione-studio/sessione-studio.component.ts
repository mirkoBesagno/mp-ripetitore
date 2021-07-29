import { Component, Input, OnInit } from '@angular/core';
import { ISessioneStudio, StrutturaPomodori } from '../utility';



@Component({
  selector: 'app-sessione-studio',
  templateUrl: './sessione-studio.component.html',
  styleUrls: ['./sessione-studio.component.css']
})
export class SessioneStudioComponent implements OnInit, ISessioneStudio {

  strutturaPomodoro: StrutturaPomodori = undefined; // { studio: 25, riposo: 5, tipologia: 'I' };

  dataInizio: Date;

  constructor() { }

  ngOnInit(): void {
  }

  @Input()
  public set Setta(v: ISessioneStudio) {
    this.dataInizio = v.dataInizio;
    this.strutturaPomodoro = v.strutturaPomodoro;
  }

}
