import styled from '@emotion/native';
import {FreeTopic} from 'packages/limitedFree/types';
import {Pressable, TouchableOpacity} from 'react-native';
import RTNGaeaNavigation, {CommonActionClientModel} from 'rtn-gaea-navigation/js/NativeGaeaNavigation';
import RTNOutlineView from 'rtn-gaea-outline-view/js/GaeaOutlineViewNativeComponent';
import RTNGaeaEventTrack from 'rtn-gaea-event-track/js/NativeGaeaEventTrack';
import {TopicFollowButton, TopicFollowButtonText} from '../FollowButton';
import {useMemo, useRef} from 'react';

const ItemContainer = styled.View({
  width: '100%',
  height: 157,
  padding: 12,
  backgroundColor: 'white',
  flexDirection: 'row',
});

const CoverContainer = styled.View({
  width: 100,
  height: 133,
});

const CoverImage = styled.Image({
  width: 100,
  height: 133,
  borderRadius: 6,
});

const TitleContainer = styled.View({
  flexDirection: 'row',
  alignItems: 'center',
});

const RightAreaContainer = styled.View({
  flex: 1,
  marginLeft: 10,
});

const LabelContainer = styled.View({
  flexDirection: 'row',
  marginTop: 9,
  gap: 4,
});

const BottomContainer = styled.View({
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 5,
});

const EmptyHolder = styled.View({
  flex: 1,
});

const TopicImageCoupon = styled.Image({
  position: 'absolute',
  top: 6,
  right: 6,
});

const LabelView = styled.View({
  backgroundColor: '#F4F5F9',
  borderRadius: 33,
  paddingHorizontal: 6,
  justifyContent: 'center',
  alignItems: 'center',
  height: 20,
});

const TitleText = styled.Text({
  fontSize: 16,
  color: '#222222',
  flex: 1,
  marginRight: 12,
  fontWeight: '600',
});

const DescText = styled.Text({
  fontSize: 12,
  color: '#999999',
  marginTop: 4,
  lineHeight: 17,
});

const LabelText = styled.Text({
  fontSize: 11,
  color: '#717171',
});

const FavCountText = styled.Text({
  fontSize: 14,
  color: '#222222',
});

const FavCountTextDesc = styled.Text({
  fontSize: 14,
  color: '#999999',
});

const formatFavoriteCount = (count: number) => {
  if (count < 100000) {
    return count;
  }
  return `${(count / 10000.0).toFixed()}万`;
};

const commonItemImpProperties = [
  'InItemPos',
  'ContentID',
  'ContentName',
  'HL_ModuleTitle',
  'HL_ModuleType',
  'HL_SubModuleType',
  'HL_SubModuleTitle',
  'ClkItemType',
];

export const LimitedFreeItem = ({
  item,
  position,
  tabName,
  onFavClicked,
}: {
  item: FreeTopic;
  position: number;
  tabName: string;
  onFavClicked: (fav: boolean, nativeTag: number) => void;
}) => {
  const viewRef = useRef<TouchableOpacity | null>(null);
  const recommed_list = useMemo(() => {
    return item.recommend_reason_list ? item.recommend_reason_list.filter(recommend => recommend.title).slice(0, 2) : null;
  }, [item.recommend_reason_list]);

  return (
    <RTNOutlineView
      isOpenExposure={true}
      isNeedNativeTrackCommonItemImp={true}
      eventDataJSON={JSON.stringify({
        ClkItemType: '专题',
        HL_ModuleTitle: '限时免费',
        HL_ModuleType: 'FreeingPage',
        HL_SubModuleType: '限免预告页Tab',
        HL_SubModuleTitle: tabName,
        InItemPos: position,
        ContentID: item.id,
        ContentName: item.title,
      })}
      templateArray={commonItemImpProperties}>
      <Pressable
        ref={viewRef}
        onPress={() => {
          let actionModel: CommonActionClientModel = {
            action: {
              action_type: 69,
              type: 69,
              target_id: item.id,
              nav_action_topicId: item.id,
            },
            saParams: {},
            addParams: {},
          };
          const nativeTag = (viewRef.current as any)?._nativeTag;
          RTNGaeaNavigation?.navigateWithCommonActionClientModel(actionModel, nativeTag);
          //点击埋点
          RTNGaeaEventTrack?.trackCommonItemClk({
            InItemPos: position,
            ContentID: item.id,
            ContentName: item.title,
            ClkItemType: '专题',
            HL_ModuleType: 'FreeingPage',
            HL_ModuleTitle: '限时免费',
            HL_SubModuleType: '限免预告页Tab',
            HL_SubModuleTitle: tabName,
          });
        }}>
        <ItemContainer>
          <CoverContainer>
            <CoverImage
              source={{
                uri: item.vertical_image_url,
              }}
            />

            {item.labels && item.labels[0] && (
              <TopicImageCoupon
                source={{uri: item.labels[0].icon}}
                style={{
                  width: item.labels[0].width,
                  height: item.labels[0].height,
                }}
              />
            )}
          </CoverContainer>
          <RightAreaContainer>
            <TitleContainer>
              <TitleText numberOfLines={1} ellipsizeMode="tail" allowFontScaling={false}>
                {item.title}
              </TitleText>
              <TopicFollowButton
                favourite={item.is_favourite ?? false}
                width={66}
                onPress={() => {
                  onFavClicked(!item.is_favourite, (viewRef.current as any)?._nativeTag);
                }}>
                <TopicFollowButtonText allowFontScaling={false} favourite={item.is_favourite ?? false}>
                  {item.is_favourite ? '已关注' : '关注'}
                </TopicFollowButtonText>
              </TopicFollowButton>
            </TitleContainer>
            <DescText numberOfLines={1} ellipsizeMode="tail" allowFontScaling={false}>
              {item.description}
            </DescText>
            <LabelContainer>
              {recommed_list &&
                recommed_list.map((recommend, index) => {
                  return (
                    <Pressable
                      key={index}
                      onPress={() => {
                        if (recommend.action_type) {
                          const commonActionModel = {
                            ...recommend.action_type,
                          };

                          let actionModel: CommonActionClientModel = {
                            action: commonActionModel,
                            saParams: {},
                            addParams: {},
                          };
                          const nativeTag = (viewRef.current as any)?._nativeTag;
                          RTNGaeaNavigation?.navigateWithCommonActionClientModel(actionModel, nativeTag);
                        }
                      }}>
                      <LabelView>
                        <LabelText allowFontScaling={false}>{recommend.title}</LabelText>
                      </LabelView>
                    </Pressable>
                  );
                })}
            </LabelContainer>
            <EmptyHolder />
            <BottomContainer>
              <FavCountText allowFontScaling={false}>{formatFavoriteCount(item.favourite_count ?? 0)}</FavCountText>
              <FavCountTextDesc allowFontScaling={false}>关注</FavCountTextDesc>
            </BottomContainer>
          </RightAreaContainer>
        </ItemContainer>
      </Pressable>
    </RTNOutlineView>
  );
};
