import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BbqsCurrentRankComponent } from './bbqs-current-rank.component';

describe('BbqsCurrentRankComponent', () => {
  let component: BbqsCurrentRankComponent;
  let fixture: ComponentFixture<BbqsCurrentRankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BbqsCurrentRankComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BbqsCurrentRankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
