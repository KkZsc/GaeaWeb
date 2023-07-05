import {OpacityInvisible, OpacityVisible} from '@gaea-web/shared';
import {Animated} from 'react-native';

export type HeaderOverlayBehavior = HeaderOverlayBehaviorEmerge | HeaderOverlayBehaviorPin;

export class HeaderOverlayBehaviorEmerge {
  constructor(
    /* 开始浮现时的offset百分比 */
    emergeStart?: number,
    /* 浮现完全时的offset百分比 */
    emergeEnd?: number,
  ) {
    this.emergeStart = emergeStart ?? 0;
    this.emergeEnd = emergeEnd ?? 1;
  }

  emergeStart: number;
  emergeEnd: number;
}

export class HeaderOverlayBehaviorPin {
  constructor(
    /* offset百分比到达pinThresh时突然出现 */
    pinThresh?: number,
  ) {
    this.pinThresh = pinThresh ?? 0;
  }
  pinThresh: number;
}

const Visible = OpacityVisible;
const Invisible = OpacityInvisible;

export const createOpacity = (offsetPercent: Animated.AnimatedInterpolation<number>, headerOverlayBehavior: HeaderOverlayBehavior | undefined) => {
  if (!headerOverlayBehavior) {
    return undefined;
  }

  let opacity;

  if (headerOverlayBehavior instanceof HeaderOverlayBehaviorEmerge) {
    const behavior: HeaderOverlayBehaviorEmerge = headerOverlayBehavior;
    opacity = offsetPercent.interpolate({
      inputRange: [0, behavior.emergeStart, behavior.emergeEnd, 1],
      outputRange: [Invisible, Invisible, Visible, Visible],
    });
  } else if (headerOverlayBehavior instanceof HeaderOverlayBehaviorPin) {
    const behavior: HeaderOverlayBehaviorPin = headerOverlayBehavior;
    if (behavior.pinThresh === 0) {
      return new Animated.Value(Visible);
    }
    opacity = offsetPercent.interpolate({
      inputRange: [0, behavior.pinThresh, behavior.pinThresh, 1],
      outputRange: [Invisible, Invisible, Visible, Visible],
    });
  }
  return opacity;
};
