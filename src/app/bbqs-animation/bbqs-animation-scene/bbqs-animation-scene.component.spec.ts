import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BbqsAnimationSceneComponent } from './bbqs-animation-scene.component';

describe('BbqsAnimationSceneComponent', () => {
  let component: BbqsAnimationSceneComponent;
  let fixture: ComponentFixture<BbqsAnimationSceneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BbqsAnimationSceneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BbqsAnimationSceneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
