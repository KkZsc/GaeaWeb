import styled from '@emotion/native';
import {Animated, ColorValue} from 'react-native';
import GaeaBackButton from 'rtn-gaea-back-button/js/GaeaBackButtonNativeComponent';

const ImageStyled = styled(Animated.Image)({
  height: 24,
  width: 24,
});

const DEFAULT_COLOR = '#333333';

type BackButtonProps = {
  arrowColor?: ColorValue | Animated.AnimatedInterpolation<string>;
};

export default ({arrowColor = DEFAULT_COLOR}: BackButtonProps) => {
  return (
    <GaeaBackButton>
      <ImageStyled style={[{tintColor: arrowColor}]} source={require('@/resource/back_button_icon.png')} />
    </GaeaBackButton>
  );
};
