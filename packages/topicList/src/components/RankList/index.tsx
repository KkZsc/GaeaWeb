import {useCallback} from 'react';
import styled from '@emotion/native';
import {FlatList, GestureResponderEvent} from 'react-native';
import RTNGaeaNavigation from 'rtn-gaea-navigation/js/NativeGaeaNavigation';
import RTNGaeaEventTrack from 'rtn-gaea-event-track/js/NativeGaeaEventTrack';
import {IRankInfo, IRankItem} from '../../../types';

const Container = styled.View({
  height: 164,
  backgroundColor: 'white',
});

const Header = styled.View({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: 45,
  paddingLeft: 12,
  paddingRight: 12,
});

const HeaderTitle = styled.Text({
  fontSize: 17,
  color: '#333',
  fontWeight: '500',
});

const HeaderButton = styled.Pressable({
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
});

const HeaderButtonText = styled.Text({
  fontSize: 13,
  color: 'rgb(153, 153, 153)',
});

const HeaderButtonIcon = styled.Image({
  width: 12,
  height: 12,
});

const RankList = styled(FlatList<IRankItem>)({
  paddingLeft: 12,
  height: 119,
});

const FlatListItem = styled.Pressable({
  height: 119,
  marginRight: 4,
});

const FlatListItemImage = styled.ImageBackground({
  width: 124,
  height: 78,
  borderRadius: 2,
  overflow: 'hidden',
  backgroundColor: '#F5F5F5',
});

const FlatItemRankIndex = styled.ImageBackground({
  position: 'absolute',
  left: 0,
  top: 0,
  width: 24,
  height: 25,
});

const FlatItemRankIndexNumber = styled.Text({
  color: 'white',
  fontSize: 14,
  fontWeight: '500',
  textAlign: 'center',
  lineHeight: 20,
});

const FlatItemRankCoupon = styled.Image({
  position: 'absolute',
  top: 6,
  right: 10,
  width: 23,
  height: 27,
});

const FlatListItemTitle = styled.View({
  height: 17,
  marginTop: 10,
});

const FlatListItemTitleText = styled.Text({
  width: 124,
  fontSize: 15,
  textAlign: 'left',
  color: 'black',
  paddingLeft: 2,
});

const Separator = styled.View({
  width: 20,
  height: 119,
});

const RankIndexIcons = [
  require('@/resource/find_rank_icon_1.png'),
  require('@/resource/find_rank_icon_2.png'),
  require('@/resource/find_rank_icon_3.png'),
  require('@/resource/rank_4_more.png'),
];

const Item = ({item, index}: {item: IRankItem; index: number}) => {
  const onTopicItemClick = useCallback(
    (event: GestureResponderEvent) => {
      RTNGaeaNavigation?.navigateWithCommonActionClientModel(
        {
          action: {
            // 漫画续读：https://wiki.quickcan.com/pages/viewpage.action?pageId=16265340
            type: 68,
            action_type: 68,
            parent_target_id: item.id,
            target_id: item.id,
          },
          saParams: {},
          addParams: {},
        },
        (event?.target as any)?._nativeTag ?? 0,
      );
    },
    [item],
  );

  return (
    <FlatListItem onPress={onTopicItemClick}>
      <FlatListItemImage source={{uri: item.cover_image_url}}>
        <FlatItemRankIndex source={RankIndexIcons[index < 3 ? index : 3]}>
          <FlatItemRankIndexNumber>{index + 1}</FlatItemRankIndexNumber>
        </FlatItemRankIndex>
        {item.coupon?.icon && <FlatItemRankCoupon source={{uri: item.coupon.icon}} />}
      </FlatListItemImage>
      <FlatListItemTitle>
        <FlatListItemTitleText numberOfLines={1}>{item.title}</FlatListItemTitleText>
      </FlatListItemTitle>
    </FlatListItem>
  );
};

export default ({rank}: {rank: IRankInfo}) => {
  const onMoreClick = useCallback(
    (event: GestureResponderEvent) => {
      RTNGaeaEventTrack?.sensorTrack('SecondPageModuleClick', {
        ButtonName: '更多',
      });

      RTNGaeaNavigation?.navigateWithCommonActionClientModel(
        {
          action: {
            ...rank.more_action,
          },
          saParams: {},
          addParams: {},
        },
        (event?.target as any)?._nativeTag ?? 0,
      );
    },
    [rank],
  );

  return (
    <Container>
      <Header>
        <HeaderTitle>{rank.title}</HeaderTitle>
        {rank.more_action && (
          <HeaderButton onPress={onMoreClick}>
            <HeaderButtonText>更多</HeaderButtonText>
            <HeaderButtonIcon source={require('@/resource/arrow_right.png')} />
          </HeaderButton>
        )}
      </Header>
      <RankList
        horizontal
        initialNumToRender={4}
        data={rank.topics}
        renderItem={({item, index}: {item: IRankItem; index: number}) => <Item key={item.id} item={item} index={index} />}
        ListFooterComponent={<Separator />}
      />
    </Container>
  );
};
