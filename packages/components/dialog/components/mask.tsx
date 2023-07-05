import styled from '@emotion/native';
import {Animated, TouchableWithoutFeedback} from 'react-native';

const Mask = styled(Animated.View)({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0 0 0 / 0.7)',
});

export default ({styles, disabled, onPress}: {styles: Animated.Animated; disabled: boolean; onPress?: () => void}) => {
  return (
    <TouchableWithoutFeedback disabled={disabled} onPress={onPress}>
      <Mask style={styles ?? {}} />
    </TouchableWithoutFeedback>
  );
};
