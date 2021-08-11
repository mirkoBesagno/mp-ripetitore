import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPianiDiStudioComponent } from './lista-piani-di-studio.component';

describe('ListaPianiDiStudioComponent', () => {
  let component: ListaPianiDiStudioComponent;
  let fixture: ComponentFixture<ListaPianiDiStudioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaPianiDiStudioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaPianiDiStudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
