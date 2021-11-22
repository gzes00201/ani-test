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
  private _currentKeyFrame: AnimationKeyframe = new AnimationKeyframe(0, 0, 0, 1);
  get currentKeyFrame(): AnimationKeyframe {
    return this._currentKeyFrame;
  }
  private _rankOffset: BBQSTransformPosition = new BBQSTransformPosition(0, 0, 1);
  private currentMs = 0;

  constructor(no: number, config: BBQSAnimationPositionConfig, stopTime: number[]) {
    this._no = no;
    this.setBaseKeyframes(config, stopTime);
  }

  public reset() {
    this.setStatus(BBQSPeopleState.LIVE);
    this._currentKeyFrame = new AnimationKeyframe(0, 0, 0, 1);
    this._rank = 0;
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
  }

  private getOffsetByRank(offset: number): number {
    return offset * this._rankPercent[this.rank-1]
  }

  public setStatus(status: BBQSPeopleState) {
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
