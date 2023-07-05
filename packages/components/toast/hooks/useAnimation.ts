import {useRef, useCallback} from 'react';
import {Animated} from 'react-native';
import {ToastOptions} from '../types';

type AnimatedEndCallback = (toValue: number, result: Animated.EndResult) => void;

export default (options: ToastOptions) => {
  const initAnimatedValue = useRef(new Animated.Value(0));

  const opacity = initAnimatedValue.current.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const translateY = initAnimatedValue.current.interpolate({
    inputRange: [0, 1],
    outputRange: [20 * (options.position === 'bottom' ? 1 : -1), 0],
  });

  const slide = useCallback((toValue: number, cb?: AnimatedEndCallback) => {
    Animated.spring(initAnimatedValue.current, {
      toValue,
      useNativeDriver: true,
      friction: 8,
    }).start(result => {
      cb && cb(toValue, result);
    });
  }, []);

  const slideIn = useCallback(
    (cb?: AnimatedEndCallback) => {
      slide(1, cb);
    },
    [slide],
  );

  const slideOut = useCallback(
    (cb?: AnimatedEndCallback) => {
      slide(0, cb);
    },
    [slide],
  );

  return {
    slideIn,
    slideOut,
    initAnimatedValue,
    animationStyles: {
      opacity,
      transform: [{translateY: translateY}],
    },
  };
};
