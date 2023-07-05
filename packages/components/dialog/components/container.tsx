import {ReactElement, useCallback, useEffect} from 'react';
import styled from '@emotion/native';
import {Animated, Dimensions} from 'react-native';
import useAnimation from '../hooks/useAnimation';
import DialogMask from './mask';
import {DialogOptions} from '../types';

const DialogView = styled.View({
  position: 'absolute',
  left: 0,
  top: 0,
  width: Dimensions.get('window').width,
  height: Dimensions.get('screen').height,
});

const Wrapper = styled.View({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
});

const Container = styled(Animated.View)({});

export const Dialog = ({visible, options, children}: {visible: boolean; options: DialogOptions; children: ReactElement}) => {
  const {fadeIn, fadeOut, animationStyle} = useAnimation();
  const animatEnd = useCallback(
    (toValue: number, result: Animated.EndResult) => {
      if (result.finished) {
        visible ? options?.onOpen?.() : options?.onClose?.();
      }
    },
    [visible, options],
  );

  useEffect(() => {
    if (visible) {
      fadeIn(animatEnd);
    } else {
      fadeOut(animatEnd);
    }
  }, [visible, fadeIn, fadeOut, animatEnd]);

  return (
    <DialogView>
      <DialogMask
        disabled={!options.maskClosable}
        styles={{
          opacity: animationStyle.opacity,
        }}
        onPress={options?.onMaskClick}
      />
      <Wrapper>
        <Container
          style={{
            opacity: animationStyle.opacity,
            transform: [
              {
                translateY: animationStyle.translateY,
              },
            ],
          }}>
          {children}
        </Container>
      </Wrapper>
    </DialogView>
  );
};
