import {useEffect} from 'react';
import styled from '@emotion/native';
import {Animated} from 'react-native';
import useAnimation from '../hooks/useAnimation';
import {LoadingTheme} from '../types';

const LoadingBox = styled.View(({theme, shadow}: {theme: LoadingTheme; shadow: boolean}) => ({
  justifyContent: 'center',
  alignItems: 'center',
  width: 70,
  minHeight: 70,
  padding: 10,
  backgroundColor: theme === 'light' ? 'white' : 'rgba(0 0 0 / 0.7)',
  borderRadius: 4,
  ...(shadow
    ? {
        elevation: 5,
        shadowColor: '#cccccc',
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 0.8,
        shadowRadius: 3,
      }
    : {}),
}));

const LoadingIcon = styled(Animated.Image)({
  flex: 0,
  width: 30,
  height: 30,
});

const LoadingText = styled.Text(({theme}: {theme: LoadingTheme}) => ({
  flex: 0,
  fontSize: 14,
  lineHeight: 17,
  marginTop: 10,
  color: theme === 'light' ? '#999' : 'white',
  textAlign: 'center',
}));

export default ({text, theme, shadow = false}: {text: string; theme: LoadingTheme; shadow: boolean}) => {
  const {animation, animationStyle} = useAnimation();

  useEffect(() => {
    animation.start();

    return () => {
      animation.stop();
    };
  }, [animation]);

  return (
    <LoadingBox theme={theme} shadow={shadow}>
      <LoadingIcon
        source={theme === 'light' ? require('@/resource/loading_icon_gray.png') : require('@/resource/loading_icon_white.png')}
        style={animationStyle}
      />
      {text && <LoadingText theme={theme}>{text}</LoadingText>}
    </LoadingBox>
  );
};
