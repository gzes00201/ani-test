export enum BBQS_LIGHT {
  GREEN,
  RED
}

export class AnimationKeyframe {
  constructor(
  public duration: number,
  public translateX: number,
  public translateY: number,
  public scale: number,
  ){}
}

export  interface AnimationConfig {
  stopTime: number[];
  bg: BBQSAnimationPositionConfig;
  people1: BBQSAnimationPositionConfig;
  people2: BBQSAnimationPositionConfig;
  people3: BBQSAnimationPositionConfig;
  people4: BBQSAnimationPositionConfig;
  people5: BBQSAnimationPositionConfig;
  people6: BBQSAnimationPositionConfig;
  people7: BBQSAnimationPositionConfig;
  people8: BBQSAnimationPositionConfig;
}

export class BBQSTransformPosition {
  constructor(
    public translateX: number,
    public translateY: number,
    public scale: number) {
  }
}

export interface BBQSAnimationPositionConfig {
  endTransform: BBQSTransformPosition;
}
// 轉頭後會停止兩秒 進行射殺
export const BBQS_Animation_Config: AnimationConfig = {
  stopTime:[3000],
  bg: {
    endTransform: {translateX: 0, translateY: 67, scale: 3.1},
  },
  people1: {
    endTransform: {translateX: 204, translateY: -155, scale: 0.2},
  },
  people2: {
    endTransform: {translateX: 145, translateY: -155, scale: 0.2},
  },
  people3: {
    endTransform: {translateX: 84, translateY: -155, scale: 0.2},
  },
  people4: {
    endTransform: {translateX: 25, translateY: -155, scale: 0.2},
  },
  people5: {
    endTransform: {translateX: -35, translateY: -155, scale: 0.2},
  },
  people6: {
    endTransform: {translateX: -96, translateY: -155, scale: 0.2},
  },
  people7: {
    endTransform: {translateX: -156, translateY: -155, scale: 0.2},
  },
  people8: {
    endTransform: {translateX: -215, translateY: -155, scale: 0.2},
  }
}

