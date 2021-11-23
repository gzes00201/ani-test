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
    endTransform: {translateX: 0, translateY: 70, scale: 3.3},
  },
  people1: {
    endTransform: {translateX: 190, translateY: -160, scale: 0.28},
  },
  people2: {
    endTransform: {translateX: 130, translateY: -160, scale: 0.28},
  },
  people3: {
    endTransform: {translateX: 70, translateY: -160, scale: 0.28},
  },
  people4: {
    endTransform: {translateX: 10, translateY: -160, scale: 0.28},
  },
  people5: {
    endTransform: {translateX: -20, translateY: -160, scale: 0.28},
  },
  people6: {
    endTransform: {translateX: -78, translateY: -160, scale: 0.28},
  },
  people7: {
    endTransform: {translateX: -137, translateY: -160, scale: 0.28},
  },
  people8: {
    endTransform: {translateX: -198, translateY: -160, scale: 0.28},
  }
}

