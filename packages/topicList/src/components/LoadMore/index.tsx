import {useEffect, useRef} from 'react';
import {Animated, Easing} from 'react-native';
import styled from '@emotion/native';

type TProps = {
  loading: boolean;
  end: boolean;
  text?: string;
};

const LoadingContainer = styled.View({
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  height: 40,
});

const LoadEndText = styled.Text({
  fontSize: 14,
  lineHeight: 40,
  textAlign: 'center',
  color: '#999999',
});

const LoadingIcon = styled(Animated.Image)({
  width: 20,
  height: 20,
});

export default (props: TProps) => {
  const {loading, end, text} = props;
  const rotateZ = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(rotateZ, {
          toValue: 720,
          duration: 4000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]),
    );

    loading ? anim.start() : anim.stop();

    return () => {
      anim.stop();
    };
  }, [loading, rotateZ]);
  return (
    <LoadingContainer>
      {loading ? (
        <LoadingIcon
          source={require('@/resource/loading_icon_gray.png')}
          style={{
            transform: [
              {
                rotate: rotateZ.interpolate({
                  inputRange: [0, 720],
                  outputRange: ['0deg', '720deg'],
                }),
              },
            ],
          }}
        />
      ) : end && text ? (
        <LoadEndText>{text}</LoadEndText>
      ) : null}
    </LoadingContainer>
  );
};
