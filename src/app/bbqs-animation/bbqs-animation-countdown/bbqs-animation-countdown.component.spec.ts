import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BbqsAnimationCountdownComponent } from './bbqs-animation-countdown.component';

describe('BbqsAnimationCountdownComponent', () => {
  let component: BbqsAnimationCountdownComponent;
  let fixture: ComponentFixture<BbqsAnimationCountdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BbqsAnimationCountdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BbqsAnimationCountdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
