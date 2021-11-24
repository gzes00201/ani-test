import { Sound } from 'src/app/sound';
import { PeopleAnimationConfigFactory, PeopleRankOffsetConfigFactory } from "./bbqs-helper";
import { AnimationKeyframe, BBQSAnimationPositionConfig, BBQSTransformPosition } from "./config/bbqs-animation-config";
export enum BBQSPeopleState {
  LIVE,
  DIE
}

export class BBQSPeople {

  private _rankPercent = [1, 0.875, 0.75, 0.625, 0.5, 0.375, 0.25, 0.125];

  private _no: number = 0;
  get no(): number {
    return this._no;
  }
  private _keyframes: AnimationKeyframe[] = [];
  get keyframes(): AnimationKeyframe[] {
    return this._keyframes;
  }
  private _status: BBQSPeopleState = BBQSPeopleState.LIVE;
  get status(): BBQSPeopleState {
    return this._status;
  }
  private _rank: number = 0;
  get rank(): number {
    return this._rank;
  }
  private _runProess: number = 0;
  get runProess(): number {
    return this._runProess;
  }
  private _currentKeyFrame: AnimationKeyframe = new AnimationKeyframe(0, 0, 0, 1);
  get currentKeyFrame(): AnimationKeyframe {
    return this._currentKeyFrame;
  }
  private _rankOffset: BBQSTransformPosition = new BBQSTransformPosition(0, 0, 1);
  private dieAudio?: Sound;
  constructor(no: number, config: BBQSAnimationPositionConfig, stopTime: number[]) {
    this._no = no;

    if(this._no === 1 || this._no === 2 ){
      this.dieAudio = new Sound('assets/audio/kill_boy_1.mp3');
    }
    if(this._no === 3 || this._no === 4 ){
      this.dieAudio = new Sound('assets/audio/kill_boy_2.mp3');
    }

    if(this._no === 5 || this._no === 6 ){
      this.dieAudio = new Sound('assets/audio/kill_girl_1.mp3');
    }
    if(this._no === 7 || this._no === 8 ){
      this.dieAudio = new Sound('assets/audio/kill_girl_2.mp3');
    }
    this.setBaseKeyframes(config, stopTime);
  }

  public reset() {
    this.setStatus(BBQSPeopleState.LIVE);
    this._currentKeyFrame = new AnimationKeyframe(0, 0, 0, 1);
    this._rank = 0;
    this._runProess = 0;
  }

  public tickRunTime(ms: number){
    if(this.status === BBQSPeopleState.DIE){
      console.log(`no ${this.no} die`)
    } else {
      this.handelRun(ms);
    }
  }

  private handelRun(ms: number): void {
    const keyframesIndex = Math.round(ms/1000);
    let currentKeyFrame = this._keyframes[keyframesIndex];

    let newKeyFrame = new AnimationKeyframe(currentKeyFrame.duration, currentKeyFrame.translateX, currentKeyFrame.translateY, currentKeyFrame.scale);

    // 開頭結束 都是同樣位子
    if(ms !== 0 && ms !== 10000 ){
      newKeyFrame.translateX = newKeyFrame.translateX + this.getOffsetByRank(this._rankOffset.translateX)  ;
      newKeyFrame.translateY = newKeyFrame.translateY +  this.getOffsetByRank(this._rankOffset.translateY)  ;
      newKeyFrame.scale = newKeyFrame.scale -  this.getOffsetByRank(this._rankOffset.scale)  ;

    }

    this._currentKeyFrame  = newKeyFrame
    this._runProess = Math.abs(this._currentKeyFrame.translateY) / Math.abs(this._keyframes[this._keyframes.length-1].translateY );

  }

  private getOffsetByRank(offset: number): number {
    return offset * this._rankPercent[this.rank-1]
  }

  public setStatus(status: BBQSPeopleState) {

    if(this._status===  BBQSPeopleState.LIVE && status === BBQSPeopleState.DIE && this.dieAudio){
      this.dieAudio.currentTime = 0;
      this.dieAudio.play();

    }
    this._status = status;

  }

  public setRankOffset(rank: number) {
    this._rank = rank;
  }

  private setBaseKeyframes(config: BBQSAnimationPositionConfig, stopTime: number[]) {
    this._keyframes = PeopleAnimationConfigFactory(config, stopTime);
    console.log(this._keyframes )
    this._rankOffset = PeopleRankOffsetConfigFactory(config, stopTime);
  }
}
