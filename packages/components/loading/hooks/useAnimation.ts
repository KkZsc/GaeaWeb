import {useMemo, useRef} from 'react';
import {Animated, Easing} from 'react-native';

export default () => {
  const initValue = useRef(new Animated.Value(0));

  const rotate = initValue.current.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const animation = useMemo(
    () =>
      Animated.loop(
        Animated.timing(initValue.current, {
          toValue: 1,
          duration: 1500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ),
    [initValue],
  );

  return {
    animation,
    animationStyle: {
      transform: [
        {
          rotate,
        },
      ],
    },
  };
};
