import {useEffect} from 'react';
import styled from '@emotion/native';
import useAnimation from '../hooks/useAnimation';
import useTimeout from '../hooks/useTimeout';
import TextRow from './TextRow';
import {ToastOptions} from '../types';
import {Animated} from 'react-native';

type TAnimatedContainerProps = {
  options: ToastOptions;
  onClose: () => void;
};

const AnimatedContainer = styled(Animated.View)(({position}: {position: 'top' | 'bottom'}) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  ...(position === 'top'
    ? {
        top: 100,
      }
    : {
        bottom: 100,
      }),
}));

export default ({options, onClose}: TAnimatedContainerProps) => {
  const {slideIn, slideOut, animationStyles} = useAnimation(options);
  const {startTimer, clearTimer} = useTimeout(() => {
    slideOut((toValue: number, result: Animated.EndResult) => {
      if (result.finished) {
        clearTimer();
        onClose();
      }
    });
  }, options.duration);

  useEffect(() => {
    slideIn((toValue, result) => {
      if (result.finished) {
        startTimer();
      }
    });

    return () => {
      clearTimer();
    };
  }, [slideIn, slideOut, startTimer, clearTimer]);

  return (
    <AnimatedContainer position={options.position ?? 'bottom'} style={animationStyles} pointerEvents="box-none">
      {TextRow({
        text: options.text,
        numberOfLines: options.numberOfLines,
        onPress: options.onPress,
      })}
    </AnimatedContainer>
  );
};
