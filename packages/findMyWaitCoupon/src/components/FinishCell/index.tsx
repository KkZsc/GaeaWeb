import styled from '@emotion/native';
import {Dimensions, Pressable, TouchableOpacity} from 'react-native';
import {FindMyWaitCouponSecondaryFinishItemViewModel} from '../../hooks/useData';
import RTNGaeaNavigation from 'rtn-gaea-navigation/js/NativeGaeaNavigation';
import {useRef, useState} from 'react';
import RTNOutlineView from 'rtn-gaea-outline-view/js/GaeaOutlineViewNativeComponent';
import RTNGaeaEventTrack from 'rtn-gaea-event-track/js/NativeGaeaEventTrack';

const {width} = Dimensions.get('window');

const ContainerView = styled.View({
  flexDirection: 'row',
  height: 114,
  backgroundColor: 'white',
});

const CoverImageContainerView = styled.View({
  height: 90,
  width: 160,
  borderRadius: 6,
  marginLeft: 12,
  marginTop: 12,
  marginBottom: 12,
  backgroundColor: '#f5f5f5',
  overflow: 'hidden',
});

const WaitIconImageView = styled.Image({
  position: 'absolute',
  right: 6,
  top: 6,
});

const CoverImageView = styled.Image({
  flex: 1,
});

const RightContainerView = styled.View({
  marginLeft: 10,
  marginTop: 12,
  height: 90,
  width: width - 160 - 12 - 10 - 12,
});

const RightTitleText = styled.Text({
  fontSize: 16,
  marginTop: 8,
});

const ClockContainerView = styled.View({
  flexDirection: 'row',
  height: 17,
  marginTop: 6,
  width: '100%',
  alignItems: 'center',
});

const ClockImageView = styled.Image({
  height: 14,
  width: 14,
});

const ClockText = styled.Text({
  color: '#666666',
  marginLeft: 5,
  fontSize: 14,
});

const RightBottomText = styled.Text({
  fontSize: 13,
  color: '#999999',
  marginTop: 15,
});

const commonItemImpProperties = ['InItemPos', 'ContentID', 'ContentName', 'HL_ModuleTitle', 'HL_ModuleType', 'ClkItemType'];

export const FindMyWaitCouponFinishCell = ({viewModel}: {viewModel: FindMyWaitCouponSecondaryFinishItemViewModel}) => {
  const viewRef = useRef<TouchableOpacity | null>(null);
  const [couponIconHeight] = useState<number>(viewModel.item.labels.find(label => label.position === 3)?.height || 0);
  const [couponIconWidth] = useState<number>(viewModel.item.labels.find(label => label.position === 3)?.width || 0);
  return (
    <RTNOutlineView
      isOpenExposure={true}
      isNeedNativeTrackCommonItemImp={true}
      eventDataJSON={JSON.stringify({
        ClkItemType: '专题',
        InItemPos: viewModel.itemPosition,
        ContentID: viewModel.item.id.toString(),
        ContentName: viewModel.item.title,
        HL_ModuleType: '可免费读',
        HL_ModuleTitle: viewModel.moduleTitle,
      })}
      templateArray={commonItemImpProperties}>
      <ContainerView>
        <Pressable
          ref={viewRef}
          onPress={event => {
            const commonActionModel = {
              action: {type: 2, target_id: viewModel.item.id},
              saParams: {},
              addParams: {},
            };

            RTNGaeaNavigation?.navigateWithCommonActionClientModel(commonActionModel, (event.target as any)._nativeTag ?? 0);

            //点击埋点
            RTNGaeaEventTrack?.trackCommonItemClk({
              InItemPos: viewModel.itemPosition,
              ContentID: viewModel.item.id,
              ContentName: viewModel.item.title,
              ClkItemType: '专题',
              HL_ModuleType: '可免费读',
              HL_ModuleTitle: viewModel.moduleTitle,
            });
          }}>
          <CoverImageContainerView>
            <CoverImageView source={{uri: viewModel.item.cover_image}} />
            <WaitIconImageView
              source={{
                uri: viewModel.item.labels.find(label => label.position === 3)?.icon,
              }}
              style={{height: couponIconHeight, width: couponIconWidth}}
            />
          </CoverImageContainerView>
        </Pressable>
        <RightContainerView>
          <Pressable
            ref={viewRef}
            onPress={event => {
              const commonActionModel = {
                action: {type: 68, parent_target_id: viewModel.item.id},
                saParams: {
                  TopicID: viewModel.item.id,
                  TopicName: viewModel.item.title,
                  TriggerPage: 'MyWaitPage',
                },
                addParams: {},
              };

              RTNGaeaNavigation?.navigateWithCommonActionClientModel(commonActionModel, (event.target as any)._nativeTag ?? 0);

              RTNGaeaEventTrack?.chainModuleManagerPushNode({tabModuleType: '可免费读'}, (event.target as any)._nativeTag ?? 0);
              //点击埋点
              RTNGaeaEventTrack?.trackCommonItemClk({
                InItemPos: viewModel.itemPosition,
                ContentID: viewModel.item.id,
                ContentName: viewModel.item.title,
                ClkItemType: '专题',
                HL_ModuleType: '可免费读',
                HL_ModuleTitle: viewModel.moduleTitle,
              });
            }}>
            <RightTitleText numberOfLines={1} allowFontScaling={false}>
              {viewModel.item.title}
            </RightTitleText>
            <ClockContainerView>
              <ClockImageView source={require('@/resource/ic_find_my_wait_coupon_clock.png')} />
              <ClockText numberOfLines={1} allowFontScaling={false}>
                {viewModel.item.continue_read_comic_title}
              </ClockText>
            </ClockContainerView>
            <RightBottomText numberOfLines={1} allowFontScaling={false}>
              {viewModel.item.subtitle}
            </RightBottomText>
          </Pressable>
        </RightContainerView>
      </ContainerView>
    </RTNOutlineView>
  );
};
