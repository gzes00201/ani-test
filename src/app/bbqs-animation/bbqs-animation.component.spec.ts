import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BbqsAnimationComponent } from './bbqs-animation.component';

describe('BbqsAnimationComponent', () => {
  let component: BbqsAnimationComponent;
  let fixture: ComponentFixture<BbqsAnimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BbqsAnimationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BbqsAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
