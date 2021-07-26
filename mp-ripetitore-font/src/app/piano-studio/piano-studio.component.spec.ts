import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PianoStudioComponent } from './piano-studio.component';

describe('PianoStudioComponent', () => {
  let component: PianoStudioComponent;
  let fixture: ComponentFixture<PianoStudioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PianoStudioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PianoStudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
