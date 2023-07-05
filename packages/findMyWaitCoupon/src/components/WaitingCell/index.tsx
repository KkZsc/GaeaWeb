import styled from '@emotion/native';
import {FindMyWaitCouponSecondaryWaitingListViewModel, FindMyWaitCouponSecondaryWaitingItemViewModel} from '../../hooks/useData';
import {FlatList, Pressable, TouchableOpacity} from 'react-native';
import RTNGaeaNavigation from 'rtn-gaea-navigation/js/NativeGaeaNavigation';
import RTNOutlineView from 'rtn-gaea-outline-view/js/GaeaOutlineViewNativeComponent';
import {useRef} from 'react';
import RTNGaeaEventTrack from 'rtn-gaea-event-track/js/NativeGaeaEventTrack';
import CircleProgress from '@gaea-web/components/circle-progress';

const HorizontalListContainerView = styled.View({
  height: 94,
  width: '100%',
  marginTop: 0,
  backgroundColor: '#f5f5f5',
});

const HorizontalList = styled(FlatList<FindMyWaitCouponSecondaryWaitingItemViewModel>)({
  paddingHorizontal: 12,
});

const ItemContainerView = styled.View({
  height: 78,
  width: 64,
  alignItems: 'center',
  marginRight: 12,
});

const ItemImageView = styled.ImageBackground({
  width: 54,
  height: 54,
  borderRadius: 27,
  overflow: 'hidden',
});

const CircleProgressStyled = styled(CircleProgress)({
  position: 'absolute',
});

const ItemText = styled.Text({
  fontSize: 13,
  top: 8,
  width: 64,
  color: '#999999',
  textAlign: 'center',
});

const commonItemImpProperties = ['InItemPos', 'ContentID', 'ContentName', 'HL_ModuleTitle', 'HL_ModuleType', 'ClkItemType'];

export const FindMyWaitCouponWaitingItemCell = ({
  item,
  viewTapped,
}: {
  item: FindMyWaitCouponSecondaryWaitingItemViewModel;
  viewTapped?: (item: FindMyWaitCouponSecondaryWaitingItemViewModel, nativeTag: number) => void;
}) => {
  const viewRef = useRef<TouchableOpacity | null>(null);
  console.log('img url', item.item.cover_image);
  return (
    <RTNOutlineView
      isOpenExposure={true}
      isNeedNativeTrackCommonItemImp={true}
      eventDataJSON={JSON.stringify({
        ClkItemType: '专题',
        InItemPos: item.itemPosition,
        ContentID: item.item.id.toString(),
        ContentName: item.item.title,
      })}
      templateArray={commonItemImpProperties}>
      <Pressable
        ref={viewRef}
        onPress={event => {
          viewTapped?.(item, (event.target as any)._nativeTag ?? 0);
        }}>
        <ItemContainerView>
          <ItemImageView source={{uri: item.item.cover_image}}>
            <CircleProgressStyled percent={item.item.wait_progress / 100} strokeWidth={3} size={54} />
          </ItemImageView>

          <ItemText numberOfLines={1} allowFontScaling={false}>
            {item.item.title}
          </ItemText>
        </ItemContainerView>
      </Pressable>
    </RTNOutlineView>
  );
};

export const FindMyWaitCouponWaitingListCell = ({viewModel}: {viewModel: FindMyWaitCouponSecondaryWaitingListViewModel}) => {
  return (
    <RTNOutlineView
      eventDataJSON={JSON.stringify({
        HL_ModuleTitle: viewModel.title,
        HL_ModuleType: '免费读生成中',
      })}>
      <HorizontalListContainerView>
        <HorizontalList
          horizontal={true}
          data={viewModel.list}
          renderItem={({item}) => (
            <FindMyWaitCouponWaitingItemCell
              item={item}
              viewTapped={(_, nativeTag) => {
                const commonActionModel = {
                  action: {type: 2, target_id: item.item.id},
                  saParams: {},
                  addParams: {},
                };

                RTNGaeaNavigation?.navigateWithCommonActionClientModel(commonActionModel, nativeTag);
                //点击埋点
                RTNGaeaEventTrack?.trackCommonItemClk({
                  InItemPos: item.itemPosition,
                  ContentID: item.item.id,
                  ContentName: item.item.title,
                  ClkItemType: '专题',
                  HL_ModuleType: '免费读生成中',
                  HL_ModuleTitle: viewModel.title,
                });
              }}
            />
          )}
          keyExtractor={(item, itemIndex) => itemIndex.toString()}
          showsHorizontalScrollIndicator={false}
        />
      </HorizontalListContainerView>
    </RTNOutlineView>
  );
};
