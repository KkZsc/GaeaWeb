import styled from '@emotion/native';
import {IITem} from '../../data';
import RTNNavigation from 'rtn-gaea-navigation/js/NativeGaeaNavigation';

const ProtocolContainer = styled.View({
  height: 56,
  width: '100%',
  flexDirection: 'row',
  alignItems: 'center',
});

const ProtocolPressable = styled.Pressable({
  flex: 1,
  backgroundColor: '#FFF',
  paddingHorizontal: 16,
});

const ProtocolText = styled.Text({
  fontSize: 16,
  color: '#303030',
  flex: 1,
});

const RightArrow = styled.Image({
  width: 16,
  height: 16,
});

export const ProtocolView = (item: IITem) => (
  <ProtocolPressable key={item.name} onPress={() => RTNNavigation?.navigateToH5ByKey(item.key, item.name, true, item.param)}>
    <ProtocolContainer>
      <ProtocolText allowFontScaling={false}>{item.name}</ProtocolText>
      <RightArrow source={require('@/resource/arrow_right.png')} />
    </ProtocolContainer>
  </ProtocolPressable>
);
