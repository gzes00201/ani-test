import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BbqsRunTimeKanbanComponent } from './bbqs-run-time-kanban.component';

describe('BbqsRunTimeKanbanComponent', () => {
  let component: BbqsRunTimeKanbanComponent;
  let fixture: ComponentFixture<BbqsRunTimeKanbanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BbqsRunTimeKanbanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BbqsRunTimeKanbanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
