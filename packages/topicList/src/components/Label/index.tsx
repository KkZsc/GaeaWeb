import {GestureResponderEvent} from 'react-native';
import styled from '@emotion/native';
import {ITopicItemRecommendReason} from '../../../types';

const LabelContainer = styled.Pressable(({index, backgroundColor = '#F9F3E8'}: {index: number; backgroundColor: string}) => ({
  flexDirection: 'row',
  flexWrap: 'nowrap',
  alignItems: 'center',
  height: 20,
  borderRadius: 10,
  backgroundColor,
  paddingLeft: 6,
  paddingRight: 6,
  paddingTop: 3,
  paddingBottom: 3,
  marginLeft: index === 0 ? 0 : 4,
}));

const LabelText = styled.Text(({color}: {color: string}) => ({
  color,
  fontSize: 11,
  lineHeight: 14,
}));

const LabelIcon = styled.Image({
  width: 7,
  height: 8,
  marginLeft: 3,
});

const Label = ({item, index, onPress}: {item: ITopicItemRecommendReason; index: number; onPress: (event: GestureResponderEvent) => void}) => {
  return (
    <LabelContainer index={index} backgroundColor={item.background_color} onPress={onPress}>
      <LabelText color={item.text_mask || '#B89668'}>{item.title}</LabelText>
      <LabelIcon source={{uri: item.behind_icon}} />
    </LabelContainer>
  );
};

export default Label;
