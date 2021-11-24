/* eslint-disable no-console */
import { ISound } from './isound';

export class Sound implements ISound {
  private audio: HTMLAudioElement;

  private _muted: boolean = false;
  set muted(val: boolean) {
    if (this.audio) {
      this.audio.muted = val;
    }
    this._muted = val;
  }
  get muted(): boolean {
    return this._muted;
  }

  private _loop: boolean = false;
  set loop(val: boolean) {
    if (this.audio) {
      this.audio.loop = val;
    }
    this._loop = val;
  }
  get loop(): boolean {
    return this._loop;
  }
  private _playbackRate: number = 1;
  set playbackRate(val: number) {
    if (this.audio) {
      this.audio.playbackRate = val;
    }
    this._playbackRate = val;
  }
  get playbackRate(): number {
    return this._playbackRate;
  }


  private _currentTime: number = 0;
  set currentTime(val: number) {
    if (this.audio) {
      this.audio.currentTime = val;
    }
    this._currentTime = val;
  }
  get currentTime(): number {
    return this._currentTime;
  }

  get isPlaying(): boolean{
    if (this.audio) {
      return !this.audio.paused;
    }

    return false
  }

  get duration(): number {
    if (this.audio) {
      return this.audio.duration;
    }

    return 0
  }

  constructor(path: string) {
    this.audio = new Audio(path);
    this.muted = false;
  }

  play(): void {
    try {
      if(this.audio && this.audio.play){
        audioPlayWrapper(this.audio.play());
      }
    } catch (err) {
    }
  }

  pause(): void {
    try {
      this.audio.pause();
    } catch (error) {
    }
  }
}

export function audioPlayWrapper(testPlay: any) {
  if (
    testPlay &&
    typeof Promise !== 'undefined' &&
    (testPlay instanceof Promise || typeof testPlay.then === 'function')
  ) {
    testPlay.catch(function () {
      console.warn(
        'HTML5 Audio pool exhausted, returning potentially locked audio object.'
      );
    });

    return testPlay;
  }
}
