import { BBQSBackground } from './bbqs-background';
import { Component, Input, OnInit, Output, SimpleChanges, EventEmitter } from '@angular/core';

import { BBQSResult, BBQSResultKey } from '../bbqs-animation.component';
import { BBQSGameRoundSortByNum, BgAnimationConfigFactory, getKillTimes, PeopleAnimationConfigFactory, sortArrWithSeed } from './bbqs-helper';
import { BBQSPeople, BBQSPeopleState } from './bbqs-people';
import { BBQS_Animation_Config, AnimationKeyframe, BBQS_LIGHT } from './config/bbqs-animation-config';
import { interval, timer } from 'rxjs';
import { take } from 'rxjs';

@Component({
  selector: 'app-bbqs-animation-scene',
  templateUrl: './bbqs-animation-scene.component.html',
  styleUrls: ['./bbqs-animation-scene.component.sass']
})
export class BbqsAnimationSceneComponent implements OnInit {
  @Input() draw_num: string = '';
  @Input() countDown: number = 0;
  @Input() runTimeMs: number = 0;
  @Input() result?: BBQSResult;
  @Output() onLightChange =  new EventEmitter<BBQS_LIGHT>();
  @Output() onPeoplesRankChange =  new EventEmitter<BBQSPeople[]>();

  public BBQSPeopleState = BBQSPeopleState
  private config = BBQS_Animation_Config;
  public killTimes: number[] = []

  public peoples: BBQSPeople[] = [];
  public bgAni: BBQSBackground = new BBQSBackground(this.config.bg, this.config.stopTime);;
  public bgKeyframes: AnimationKeyframe[] = [];

  public isLastkeyframes = false;
  public realRankNo: number[] = [];
  public dieRankNo: number[] = [];
  public currentRankNo: number[] = [];

  light: BBQS_LIGHT = BBQS_LIGHT.GREEN;
  BBQS_LIGHT = BBQS_LIGHT
  isShoot = false;
  shootingNo: number[] = []
  isInited = false;

  constructor() {
    this.initConfig()
   }

  ngOnInit(): void {
    this.handelCheckCurrentTime();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['result']){
      this.resetAni(changes['result'].currentValue)
    }
    if(changes['runTimeMs']){
      this.handelRunTimeMs(changes['runTimeMs'].currentValue)
    }
  }

  private handelCheckCurrentTime() {
    if(this.runTimeMs > 0 ){
      this.tickToCurrentMs();
      this.bgAni.tickRunTime(this.runTimeMs);
    }

    this.isInited = true
  }

  private tickToCurrentMs() {
    if(this.result){
      this.resetAni(this.result);
      new Array(Math.round(this.runTimeMs / 1000)).fill('').forEach((_, index) => {
        this.handelRunTimeMs((index + 1) * 1000);
      });
    }
  }

  private handelRunTimeMs(runTimeMs: number) {
    console.log('handelRunTimeMs', runTimeMs)
    this.isLastkeyframes = Math.round(runTimeMs/1000) === 10;
    this.bgAni.tickRunTime(runTimeMs);
    this.handelLightChange(runTimeMs)
    this.handelPeoplesRank(runTimeMs);
    this.updatePeoplesRunTime(runTimeMs);

  }

  handelPeoplesRank(runTimeMs: number) {
    if(this.light === BBQS_LIGHT.RED){
      return
    }

    if(runTimeMs > 8000){
      this.handelPlayRealRank();
    } else {
      this.handelPlayRoundRankByNum(this.draw_num+ String(runTimeMs));
    }
  }

  handelLightChange(runTimeMs: number) {
    const newLight = this.killTimes.includes(runTimeMs) ? BBQS_LIGHT.RED : BBQS_LIGHT.GREEN;
    if(newLight == this.light){
      return;
    }

    this.light = newLight;
    this.onLightChange.emit(this.light);

  }

  updatePeoplesRunTime(runTimeMs: number) {
    console.log('updatePeoplesRunTime', runTimeMs)
    if(this.killTimes[0]===(runTimeMs)){
      // 0.8秒後再開始殺 // 預設時 不能進入非同步
      if(this.isInited){
        timer( 500).subscribe(()=>this.handelPeopleDie(this.dieRankNo));
      } else {
        this.handelPeopleDie(this.dieRankNo)
      }
    }

    this.peoples.forEach(people=> {
      if(runTimeMs === 0){
        people.reset();
      }else {
        people.tickRunTime(runTimeMs);
      }
    })

    if(runTimeMs === 0){
      this.resetCurrentRank();
    }
  }

  resetAni(result: BBQSResult) {
    this.bgAni.reset();
    this.handelRankConfig(result);
    this.updatePeoplesRunTime(0);

    console.log('done')
  }

  private handelRankConfig(result: BBQSResult) {
    this.realRankNo = [
      result[BBQSResultKey.RANK1],
      result[BBQSResultKey.RANK2],
      result[BBQSResultKey.RANK3],
      result[BBQSResultKey.RANK4],
      result[BBQSResultKey.RANK5],
      result[BBQSResultKey.RANK6],
      result[BBQSResultKey.RANK7],
      result[BBQSResultKey.RANK8],
    ]
    this.dieRankNo = this.realRankNo.slice(this.realRankNo.length - result[BBQSResultKey.DIECOUNT] ,this.realRankNo.length)
  }

  private handelPlayRealRank() {
    this.handelPeopleRoundRank(this.realRankNo);
    this.setCurrentRank(this.realRankNo);
  }

  private handelPlayRoundRankByNum(num: string) {
    var displayRankNo = []
    if(this.config.stopTime.includes(this.runTimeMs)){
      displayRankNo = BBQSGameRoundSortByNum(this.realRankNo, this.dieRankNo, num)
    } else {
      displayRankNo = sortArrWithSeed(this.realRankNo, num )
    }
    this.handelPeopleRoundRank(displayRankNo);

    // 當已殺完人 已死人員停在原地 顯示的當下排序要特別計算
    if(this.runTimeMs > this.config.stopTime[0]) {
      // 顯示用排序 濾掉死亡排序  之後串接就是真正的排序
      this.setCurrentRank(displayRankNo.filter(no=> !this.dieRankNo.includes(no))
      .concat(this.dieRankNo));
    }else {
      this.setCurrentRank(displayRankNo);
    }
  }

  private setCurrentRank(newRank: number[]) {
    this.currentRankNo = newRank;
    let newPeopleRanks: BBQSPeople[]  = []

    this.currentRankNo.forEach(no=>{

      let cuurent = this.getPeopleFromNo(no)
      if(cuurent){
        newPeopleRanks.push(cuurent)
      }
    })
    console.log(newPeopleRanks)
    this.onPeoplesRankChange.emit(newPeopleRanks);
  }

  private handelPeopleDie(dieRankNo: number[]) {
    const roundSortDieRank = sortArrWithSeed(dieRankNo, this.draw_num);

    this.isShoot = true;
    if(this.isInited) {
      // 依序殺死玩家
      interval(1200/roundSortDieRank.length).pipe(
        take(roundSortDieRank.length),
      ).subscribe({
        next: (ind)=>{
          let currentPeople = this.getPeopleFromNo(roundSortDieRank[ind]);
          if(currentPeople) {
            currentPeople.setStatus(BBQSPeopleState.DIE);
            this.shootingNo.push(currentPeople.no)
          }
        },
        complete: ()=>{
          timer(250).subscribe(()=>{
            this.isShoot = false;
           this.shootingNo = [];
          });
        }
      })
    } else {
      // 預設時 不能進入非同步
      roundSortDieRank.forEach(no=>{
        let currentPeople = this.getPeopleFromNo(no);
          if(currentPeople) {
            currentPeople.setStatus(BBQSPeopleState.DIE);
            this.shootingNo.push(currentPeople.no)
          }
      });

      this.isShoot = false;
      this.shootingNo = [];
    }


  }

  private handelPeopleRoundRank(roundSort: number[]) {
    roundSort.forEach((no: number, rankIndex: number) => {
      let currentPeople = this.getPeopleFromNo(no);
      if(currentPeople) {
        currentPeople.setRankOffset(rankIndex+1);
      }
    });

  }

  private getPeopleFromNo(no: number): BBQSPeople | undefined{
    return this.peoples.find(item=> item.no === no)
  }

  private initConfig() {
    [this.config.people1,
      this.config.people2,
      this.config.people3,
      this.config.people4,
      this.config.people5,
      this.config.people6,
      this.config.people7,
      this.config.people8].forEach((config, index)=>{
      this.peoples.push(new BBQSPeople(index+1, config , this.config.stopTime))
    })

    this.resetCurrentRank();

    this.bgKeyframes = BgAnimationConfigFactory(this.config.bg, this.config.stopTime)
    this.killTimes = getKillTimes(this.config.stopTime);
  }

  private resetCurrentRank(){
    this.setCurrentRank([1,2,3,4,5,6,7,8]);
  }
}
