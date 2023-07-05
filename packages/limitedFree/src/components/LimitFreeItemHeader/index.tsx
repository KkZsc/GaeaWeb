import styled from '@emotion/native';
import {useEffect, useRef, useState} from 'react';
import CountDownTimer from '../CountDownTimer';
import {PayingInfo} from 'packages/limitedFree/types';
import {Image, Pressable, TouchableOpacity} from 'react-native';
import {TopicFollowButton, TopicFollowButtonText} from '../FollowButton';
import RTNGaeaEventTrack from 'rtn-gaea-event-track/js/NativeGaeaEventTrack';

const HeaderItemContainer = styled.View({
  width: '100%',
  height: 52,
  flexDirection: 'row',
  alignItems: 'center',
  paddingHorizontal: 12,
  backgroundColor: 'white',
  justifyContent: 'space-between',
});

const FavCountTextDesc = styled.Text({
  fontSize: 14,
  color: '#999999',
});

const LeftContainer = styled.View({
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
});

const LimitStatusImage = styled.Image(({width}: {width: number}) => ({
  width,
  height: 16,
  marginRight: 6,
}));

const calculateWidth = (width: number, height: number) => {
  return (width / (height * 1.0)) * 16;
};

export const LimitedFreeItemHeader = ({
  payInfo,
  favourite,
  tabName,
  onAllFavClicked,
}: {
  payInfo: PayingInfo;
  favourite: boolean;
  tabName: string;
  onAllFavClicked: (fav: boolean, nativeTag: number) => void;
}) => {
  const [hasCountDown, setHasCountDown] = useState<boolean>(!!(payInfo.countdown && payInfo.countdown > 0));

  const [imageWidth, setImageWidth] = useState<number>(0);
  useEffect(() => {
    Image.getSize(payInfo.icon ?? '', (width, height) => {
      if (width !== 0 && height !== 0) {
        setImageWidth(calculateWidth(width, height));
      } else if (payInfo.width && payInfo.width > 0 && payInfo.height && payInfo.height > 0) {
        setImageWidth(calculateWidth(payInfo.width, payInfo.height));
      }
    });
  }, [payInfo.height, payInfo.icon, payInfo.width]);
  const viewRef = useRef<TouchableOpacity | null>(null);

  return (
    <Pressable ref={viewRef}>
      <HeaderItemContainer>
        <LeftContainer>
          {payInfo.icon && payInfo.width && payInfo.height && <LimitStatusImage source={{uri: payInfo.icon}} width={imageWidth} />}
          {hasCountDown ? (
            <CountDownTimer
              initialTime={payInfo.countdown ?? 0}
              onFinish={() => {
                setHasCountDown(false);
              }}
              format="距结束 HH:mm:ss"
            />
          ) : (
            <FavCountTextDesc>{payInfo.text ?? '限免活动已结束'}</FavCountTextDesc>
          )}
        </LeftContainer>
        <TopicFollowButton
          favourite={favourite ?? false}
          width={84}
          onPress={() => {
            const nativeTag = (viewRef.current as any)?._nativeTag;
            onAllFavClicked(!favourite, nativeTag);
            //点击埋点
            RTNGaeaEventTrack?.trackCommonElementClk({
              HL_ModuleType: 'FreeingPage',
              HL_ModuleTitle: '限时免费',
              HL_SubModuleType: '限免预告页Tab',
              HL_SubModuleTitle: tabName,
              ElementName: '关注全部按钮',
              ElementShowText: favourite ? '已关注全部' : '关注全部',
            });
          }}>
          <TopicFollowButtonText allowFontScaling={false} favourite={favourite ?? false}>
            {favourite ? '已关注全部' : '关注全部'}
          </TopicFollowButtonText>
        </TopicFollowButton>
      </HeaderItemContainer>
    </Pressable>
  );
};
