import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { timer } from 'rxjs';
import { BBQS_LIGHT } from '../bbqs-animation-scene/config/bbqs-animation-config';

@Component({
  selector: 'app-bbqs-run-time-kanban',
  templateUrl: './bbqs-run-time-kanban.component.html',
  styleUrls: ['./bbqs-run-time-kanban.component.sass']
})
export class BbqsRunTimeKanbanComponent implements OnInit {
  @Input() runTimeMs: number = 0;
  @Input() light: BBQS_LIGHT = BBQS_LIGHT.GREEN;
  BBQS_LIGHT = BBQS_LIGHT
  displayRunTimeMs: number = 0;
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['runTimeMs']){
      timer(1000).subscribe(()=>{ this.displayRunTimeMs = changes['runTimeMs'].currentValue  })
    }

  }

}
