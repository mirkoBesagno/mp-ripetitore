import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimerStartStopComponent } from './timer-start-stop.component';

describe('TimerStartStopComponent', () => {
  let component: TimerStartStopComponent;
  let fixture: ComponentFixture<TimerStartStopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimerStartStopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimerStartStopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
