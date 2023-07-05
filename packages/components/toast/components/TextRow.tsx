import styled from '@emotion/native';
import {Animated, Pressable} from 'react-native';

const TextContainer = styled.View({
  flexDirection: 'row',
  flexGrow: 0,
  justifyContent: 'center',
  backgroundColor: 'rgba(0 0 0 / 0.7)',
  paddingRight: 12,
  paddingLeft: 12,
  paddingTop: 9,
  paddingBottom: 9,
  borderRadius: 8,
});

const Text = styled(Animated.Text)({
  maxWidth: 276,
  minWidth: 100,
  flexDirection: 'row',
  alignItems: 'center',
  flexWrap: 'wrap',
  textAlign: 'center',
  fontSize: 14,
  lineHeight: 17,
  color: 'white',
});

export default ({text, numberOfLines = 1, onPress}: {text: string; numberOfLines?: number; onPress?: () => void}) => {
  return (
    <Pressable
      onPress={() => {
        onPress?.();
      }}>
      <TextContainer>
        <Text numberOfLines={numberOfLines} ellipsizeMode="tail">
          {text}
        </Text>
      </TextContainer>
    </Pressable>
  );
};
