import { Component, OnInit } from '@angular/core';
import { interval, take } from 'rxjs';
import { BBQS_LIGHT } from './bbqs-animation-scene/config/bbqs-animation-config';
export enum BBQSResultKey {
  RANK1 = '01',
  RANK2 = '02',
  RANK3 = '03',
  RANK4 = '04',
  RANK5 = '05',
  RANK6 = '06',
  RANK7 = '07',
  RANK8 = '08',
  DIECOUNT = '09',
}
export interface BBQSResult {
  [BBQSResultKey.RANK1]: number
  [BBQSResultKey.RANK2]: number
  [BBQSResultKey.RANK3]: number
  [BBQSResultKey.RANK4]: number
  [BBQSResultKey.RANK5]: number
  [BBQSResultKey.RANK6]: number
  [BBQSResultKey.RANK7]: number
  [BBQSResultKey.RANK8]: number
  [BBQSResultKey.DIECOUNT]: number
}


@Component({
  selector: 'app-bbqs-animation',
  templateUrl: './bbqs-animation.component.html',
  styleUrls: ['./bbqs-animation.component.sass']
})
export class BbqsAnimationComponent implements OnInit {
  countDown = 0
  runTimeMs = 3000
  result: BBQSResult = {"01":1,"02":2,"03":3,"04":4,"05":5,"06":6,"07":7,"08":8,"09":5}
  light: BBQS_LIGHT = BBQS_LIGHT.GREEN
  draw_num = '202111110002'
  constructor() { }

  ngOnInit(): void {

  }

  runCountDown() {
    this.countDown--
  }

  run(ms: number) {
    this.runTimeMs = this.runTimeMs + ms
  }

  handelLightChange(light: BBQS_LIGHT){
    this.light = light;
  }
  autoRun() {
    this.runTimeMs = 0
    interval(1000).pipe(
      take(10)
    ).subscribe(()=>{
      this.runTimeMs = this.runTimeMs  + 1000
    })
  }
  reset() {
    this.countDown = 0
    this.runTimeMs = 0
  }
}
