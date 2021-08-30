import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaSessioneStudioComponent } from './lista-sessione-studio.component';

describe('ListaSessioneStudioComponent', () => {
  let component: ListaSessioneStudioComponent;
  let fixture: ComponentFixture<ListaSessioneStudioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaSessioneStudioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaSessioneStudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
