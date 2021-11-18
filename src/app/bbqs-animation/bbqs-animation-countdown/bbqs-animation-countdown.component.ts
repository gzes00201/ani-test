import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bbqs-animation-countdown',
  templateUrl: './bbqs-animation-countdown.component.html',
  styleUrls: ['./bbqs-animation-countdown.component.sass']
})
export class BbqsAnimationCountdownComponent implements OnInit {
  @Input() countDown: number = 0

  constructor() { }

  ngOnInit(): void {
  }

}
