import {useCallback, useRef} from 'react';
import {Animated} from 'react-native';

type AnimationInitVal = {
  opacity: number;
  translateY: number;
};

type AnimatedEndCallback = (toValue: number, result: Animated.EndResult) => void;

const DEFAULT_ANIMATION_VAL: AnimationInitVal = {
  opacity: 0,
  translateY: -20,
};

export default (animationInitVal?: AnimationInitVal | null) => {
  const initAnim = useRef(new Animated.Value(0));

  const opacity = initAnim.current.interpolate({
    inputRange: [0, 1],
    outputRange: [animationInitVal?.opacity ?? DEFAULT_ANIMATION_VAL.opacity, 1],
  });

  const translateY = initAnim.current.interpolate({
    inputRange: [0, 1],
    outputRange: [animationInitVal?.translateY ?? DEFAULT_ANIMATION_VAL.translateY, 0],
  });

  const fade = useCallback((toValue: number, cb?: AnimatedEndCallback) => {
    Animated.spring(initAnim.current, {
      toValue,
      useNativeDriver: true,
    }).start(result => cb?.(toValue, result));
  }, []);

  const fadeIn = useCallback(
    (cb?: AnimatedEndCallback) => {
      fade(1, cb);
    },
    [fade],
  );

  const fadeOut = useCallback(
    (cb?: AnimatedEndCallback) => {
      fade(0, cb);
    },
    [fade],
  );

  return {
    initAnim,
    fadeIn,
    fadeOut,
    animationStyle: {
      opacity,
      translateY,
    },
  };
};
