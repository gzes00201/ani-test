import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { interval, take } from 'rxjs';
import { Sound } from '../sound';
import { BBQSPeople } from './bbqs-animation-scene/bbqs-people';
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
export class BbqsAnimationComponent implements OnInit, OnDestroy {
  countDownSec = 5
  runTimeMs = 0
  result: BBQSResult = {"01":2,"02":4,"03":7,"04":6,"05":1,"06":5,"07":8,"08":3,"09":4}
  light: BBQS_LIGHT = BBQS_LIGHT.GREEN
  draw_num = '202111110002';
  currentPeopleRank: BBQSPeople[] = [];
  @Input() displayOriginWapper = true;
  isGameOver = false;
  isMute = false;
  bgm = new Sound('assets/audio/bbqs_bgm.mp3');

  constructor() { }

  ngOnInit(): void {
    // this.runCountDown();
    this.changeCountDown(this.countDownSec);
    this.playBGM();
    //this.autoRun2();

  }

  ngOnDestroy(): void {
    this.bgm.pause();
  }

  playBGM() {
    if(this.isMute || this.runTimeMs > 0){
      return;
    }
    this.bgm.currentTime = 0;
    this.bgm.loop = true;
    this.bgm.play();
  }

  stopBGM() {
    this.bgm.currentTime = 0;
    this.bgm.pause();
  }

  changeCountDown(newCountDown: number){
    this.countDownSec = newCountDown;
    if(this.countDownSec > 0 && this.bgm.currentTime > 0){
      this.playBGM();
    }

    if (this.countDownSec === 0) {
      timer(1000).subscribe(()=> this.stopBGM());
    }
  }

  runCountDown() {
    this.changeCountDown(this.countDownSec - 1);
  }
  runCountDownAuto() {
    console.log(this.countDownSec)
    interval(1000).pipe(take(this.countDownSec)).subscribe(()=>{
      this.changeCountDown(this.countDownSec - 1);
      console.log(this.countDownSec)
    },()=>{}, ()=>{
      this.autoRun()
    });

  }

  run(ms: number) {
    this.runTimeMs = this.runTimeMs + ms
  }

  handelLightChange(light: BBQS_LIGHT){
    this.light = light;
  }

  handelPeopleRankChange(peoples: BBQSPeople[]) {
    this.currentPeopleRank = peoples;
  }

  autoRun() {
    this.runTimeMs = 0
    interval(1000).pipe(
      take(10)
    ).subscribe(()=>{
      this.runTimeMs = this.runTimeMs  + 1000
    })
  }

  autoRun2() {
    interval(1000).pipe(
      take(((10000 - this.runTimeMs ) / 1000))
    ).subscribe(()=>{
      this.runTimeMs = this.runTimeMs  + 1000
    })
  }
  reset() {
    this.changeCountDown(0);
    this.runTimeMs = 0
  }
}
