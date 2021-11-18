import { Component, Input, OnInit } from '@angular/core';
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
  constructor() { }

  ngOnInit(): void {
  }

}
