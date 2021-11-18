import { BgAnimationConfigFactory } from "./bbqs-helper";
import { AnimationKeyframe, BBQSAnimationPositionConfig } from "./config/bbqs-animation-config";

export class BBQSBackground {
  private _keyframes: AnimationKeyframe[] = [];
  get keyframes(): AnimationKeyframe[] {
    return this._keyframes;
  }

  private _currentKeyFrame: AnimationKeyframe = new AnimationKeyframe(0, 0, 0, 1);
  get currentKeyFrame(): AnimationKeyframe {
    return this._currentKeyFrame;
  }

  constructor(config: BBQSAnimationPositionConfig, stopTime: number[]){
    this.setBaseKeyframes(config, stopTime);
  }
  public reset(){
    this._currentKeyFrame.duration = 0;
    this._currentKeyFrame.translateX = 0;
    this._currentKeyFrame.translateY = 0;
    this._currentKeyFrame.scale = 1;
  }
  public tickRunTime(ms: number){
    const keyframesIndex = Math.round(ms/1000);
    const currentKeyFrame = this._keyframes[keyframesIndex];

    this._currentKeyFrame.duration = currentKeyFrame.duration;
    this._currentKeyFrame.translateX = currentKeyFrame.translateX;
    this._currentKeyFrame.translateY = currentKeyFrame.translateY;
    this._currentKeyFrame.scale = currentKeyFrame.scale;
  }

  private setBaseKeyframes(config: BBQSAnimationPositionConfig, stopTime: number[]) {
    this._keyframes = BgAnimationConfigFactory(config, stopTime);
  }
}
