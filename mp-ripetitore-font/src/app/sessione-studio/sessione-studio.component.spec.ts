import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessioneStudioComponent } from './sessione-studio.component';

describe('SessioneStudioComponent', () => {
  let component: SessioneStudioComponent;
  let fixture: ComponentFixture<SessioneStudioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SessioneStudioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SessioneStudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
