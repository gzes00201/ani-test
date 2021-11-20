import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BbqsRankMapComponent } from './bbqs-rank-map.component';

describe('BbqsRankMapComponent', () => {
  let component: BbqsRankMapComponent;
  let fixture: ComponentFixture<BbqsRankMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BbqsRankMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BbqsRankMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
