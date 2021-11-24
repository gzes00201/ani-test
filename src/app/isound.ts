export interface ISound {
  muted: boolean;
  loop: boolean;
  currentTime: number;
  playbackRate: number;
  isPlaying: boolean;

  play(): void;
  pause(): void ;
}
