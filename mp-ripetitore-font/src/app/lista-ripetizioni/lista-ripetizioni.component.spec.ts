import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaRipetizioniComponent } from './lista-ripetizioni.component';

describe('ListaRipetizioniComponent', () => {
  let component: ListaRipetizioniComponent;
  let fixture: ComponentFixture<ListaRipetizioniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaRipetizioniComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaRipetizioniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
