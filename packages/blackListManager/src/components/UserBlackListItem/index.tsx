import styled from '@emotion/native';
import {Dimensions} from 'react-native';
import {User} from '../../../types/index';

const ITEM_HEIGHT = 50;
const COVER_WIDTH = 50;
const CANCEL_WIDTH = 48;
// const MARGIN_LEFT = 12;
// const MARGIN_RIGHT = 9.5;
const PARENT_PADDING = 16;

const CENTER_WIDTH = Dimensions.get('window').width - COVER_WIDTH - CANCEL_WIDTH - PARENT_PADDING * 2 - 4;

const ItemPressable = styled.Pressable({});

const ItemContainerView = styled.View({
  paddingVertical: 12,
  flexDirection: 'row',
});

const LeftContainerView = styled.View({
  overflow: 'hidden',
  marginLeft: 16,
});

const CoverImage = styled.Image({
  width: COVER_WIDTH,
  height: ITEM_HEIGHT,
  borderRadius: 50,
});

const CoverImage2 = styled.Image({
  width: 14,
  height: 14,
  position: 'absolute',
  right: 0,
  bottom: 0,
  borderRadius: 14,
});

const RightContainer = styled.View({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  width: 48,
  height: 50 + 24,
  position: 'absolute',
  right: 0,
  marginRight: 16,
});

const RightContent = styled.TouchableHighlight({
  width: 48,
  height: 24,
  flexDirection: 'column',
  backgroundColor: '#ffe120',
  position: 'absolute',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 50,
});

const CancelBtn = styled.Text({
  fontWeight: 'bold',
  color: '#442509',
  fontSize: 11,
});

const CenterContainerView = styled.View({
  width: CENTER_WIDTH,
  flexDirection: 'column',
  left: 9,
  flexGrow: 0,
  right: 104,
});

const UserName = styled.Text({
  fontSize: 16,
  textAlign: 'left',
  textAlignVertical: 'bottom',
  color: '#333333',
  includeFontPadding: false,
  overflow: 'hidden',
  marginTop: 8,
});

const UserDesc = styled.Text({
  fontSize: 12,
  textAlign: 'left',
  textAlignVertical: 'center',
  includeFontPadding: false,
  color: '#999999',
  overflow: 'hidden',
  marginTop: 1,
});

const VImageView = ({params}: {params: number}) => {
  switch (params) {
    case 1:
      return <CoverImage2 source={require('@/resource/ic_v_medium_yellow.png')} />;
    case 2:
      return <CoverImage2 source={require('@/resource/ic_v_big_pink.png')} />;
    case 3:
      return <CoverImage2 source={require('@/resource/ic_v_medium_blue.png')} />;
    default:
      return null;
  }
};

export const UserBlackListItem = ({
  item,
  onViewClick,
  onCannel,
}: {
  item: User;
  onViewClick?: (item: User) => void;
  onCannel?: (item: User) => void;
}) => {
  console.log(item);
  const info = item.intro || '';
  return (
    <ItemPressable
      onPress={() => {
        onViewClick?.(item);
      }}>
      <ItemContainerView>
        <LeftContainerView>
          <CoverImage source={{uri: item.avatar_url}} />
          <VImageView params={item.user_role_mark} />
        </LeftContainerView>
        <CenterContainerView>
          <UserName numberOfLines={1} ellipsizeMode="tail">
            {item.nickname}
          </UserName>
          <UserDesc numberOfLines={1} ellipsizeMode="tail">
            {info ? info : '木有简介，可能在世界角落游荡'}
          </UserDesc>
        </CenterContainerView>
        <RightContainer>
          <RightContent underlayColor="#DDDDDD" onPress={() => onCannel?.(item)}>
            <CancelBtn>移出</CancelBtn>
          </RightContent>
        </RightContainer>
      </ItemContainerView>
    </ItemPressable>
  );
};
