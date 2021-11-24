import { Component, Input, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Sound } from 'src/app/sound';

@Component({
  selector: 'app-bbqs-animation-countdown',
  templateUrl: './bbqs-animation-countdown.component.html',
  styleUrls: ['./bbqs-animation-countdown.component.sass']
})
export class BbqsAnimationCountdownComponent implements OnInit, OnDestroy {
  @Input() countDown: number = 0
  @Input() isMute: boolean = false

  countDown3 = new Sound('assets/audio/count_down_3.mp3');
  countDown2 = new Sound('assets/audio/count_down_2.mp3');
  countDown1 = new Sound('assets/audio/count_down_1.mp3');

  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.countDown3.pause();
    this.countDown2.pause();
    this.countDown1.pause();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['countDown']){
      switch (changes['countDown'].currentValue ) {
        case 3:
          this.playSound(this.countDown3);
          break;
        case 2:
          this.playSound(this.countDown2);
          break;
        case 1:
          this.playSound(this.countDown1);
          break;
        default:
          break;
      }
    }
  }

  playSound(audio: Sound) {
    if (this.isMute) {
      return;
    }

    audio.currentTime = 0;
    audio.loop = false;
    audio.play();
  }

}
