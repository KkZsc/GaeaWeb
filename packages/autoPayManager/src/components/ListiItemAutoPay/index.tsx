import styled from '@emotion/native';
import {Topic} from '../../../types/autoPayData';
import {Dimensions} from 'react-native';

const ITEM_HEIGHT = 70;
const COVER_WIDTH = 112;
const CANCEL_WIDTH = 64;
const MARGIN_LEFT = 12;
const MARGIN_RIGHT = 9.5;
const PARENT_PADDING = 14;

const CENTER_WIDTH = Dimensions.get('window').width - COVER_WIDTH - CANCEL_WIDTH - PARENT_PADDING * 2 - MARGIN_LEFT - MARGIN_RIGHT;

const ItemContainerView = styled.View({
  paddingVertical: 7,
  flexDirection: 'row',
});

const LeftContainerView = styled.View({
  borderRadius: 2,
  overflow: 'hidden',
});

const CoverImage = styled.Image({
  width: COVER_WIDTH,
  height: ITEM_HEIGHT,
});

const LabelImage = styled.Image({
  width: 44,
  height: 44,
  right: 0,
  position: 'absolute',
  alignContent: 'flex-end',
  alignItems: 'flex-end',
  opacity: 0,
});

const CenterContainerView = styled.View({
  width: CENTER_WIDTH,
  flexDirection: 'column',
  left: 12,
  flexGrow: 0,
  right: 104,
});

const TopicTitle = styled.Text({
  fontSize: 18,
  fontWeight: 'bold',
  textAlign: 'left',
  textAlignVertical: 'center',
  color: '#222222',
  includeFontPadding: false,
  height: 20,
  overflow: 'hidden',
});

const AuthorName = styled.Text({
  fontSize: 14,
  textAlign: 'left',
  textAlignVertical: 'center',
  includeFontPadding: false,
  color: '#999999',
  height: 16,
  overflow: 'hidden',
});

const PayedComicsCount = styled.Text({
  fontSize: 12,
  textAlign: 'left',
  textAlignVertical: 'center',
  includeFontPadding: false,
  color: '#999999',
  height: 16,
  bottom: 1,
  position: 'absolute',
  overflow: 'hidden',
});

const RightContent = styled.View({
  flexDirection: 'column',
  top: 7,
  right: 0,
  height: ITEM_HEIGHT,
  position: 'absolute',
  justifyContent: 'center',
});

const CancelBtn = styled.Text({
  width: 64,
  height: 30,
  fontWeight: 'bold',
  textAlignVertical: 'center',
  textAlign: 'center',
  backgroundColor: '#F5F5F5',
  color: '#222222',
  borderRadius: 50,
});

const ItemPressable = styled.Pressable({});

const AutoPayListItem = ({item, onViewClick, onCannel}: {item: Topic; onViewClick?: (item: Topic) => void; onCannel?: (item: Topic) => void}) => {
  console.log(item);

  return (
    <ItemPressable
      onPress={() => {
        onViewClick?.(item);
      }}>
      <ItemContainerView>
        <LeftContainerView>
          <CoverImage source={{uri: item.vertical_image_url}} />

          <LabelImage source={require('@/resource/ic_comic_shelf.png')} />
        </LeftContainerView>
        <CenterContainerView>
          <TopicTitle numberOfLines={1} ellipsizeMode="tail">
            {item.title}
          </TopicTitle>
          <AuthorName numberOfLines={1} ellipsizeMode="tail">
            {item.user.nickname}
          </AuthorName>
          <PayedComicsCount numberOfLines={1}>{item.comics_count}</PayedComicsCount>
        </CenterContainerView>
        <RightContent>
          <CancelBtn onPress={() => onCannel?.(item)}>{'取消'}</CancelBtn>
        </RightContent>
      </ItemContainerView>
    </ItemPressable>
  );
};

export default AutoPayListItem;
