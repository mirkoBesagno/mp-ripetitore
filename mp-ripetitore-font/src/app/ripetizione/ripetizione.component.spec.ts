import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RipetizioneComponent } from './ripetizione.component';

describe('RipetizioneComponent', () => {
  let component: RipetizioneComponent;
  let fixture: ComponentFixture<RipetizioneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RipetizioneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RipetizioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
