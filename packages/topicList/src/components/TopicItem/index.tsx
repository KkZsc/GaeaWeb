import {useCallback, useMemo} from 'react';
import {Dimensions, GestureResponderEvent} from 'react-native';
import styled from '@emotion/native';
import {OnePixel} from '@gaea-web/shared';
import RTNGaeaNavigation from 'rtn-gaea-navigation/js/NativeGaeaNavigation';
import RTNOutlineView from 'rtn-gaea-outline-view/js/GaeaOutlineViewNativeComponent';
import RTNGaeaEventTrack, {THLItemImp} from 'rtn-gaea-event-track/js/NativeGaeaEventTrack';
import RTNGaeaBusiness from 'rtn-gaea-business/js/NativeGaeaBusiness';
import Label from '../Label';
import {ITrackParams} from '../../hooks/useTrackParams';
import {transformNumber} from '../../../utils';
import {ITopicItem, ITopicItemRecommendReason, ETopicRecommendLabelReasonType, IPageConfig} from '../../../types';

const windowWidth = Dimensions.get('window').width;
// 100: image width, 12: item padding, 14: info padding
const topicInfoWidth = windowWidth - 100 - 12 * 2 - 14;
const ITEM_HEIGHT = 157;

const Container = styled.Pressable({
  flexDirection: 'row',
  height: ITEM_HEIGHT,
  padding: 12,
  backgroundColor: 'white',
});

const TopicImageContainer = styled.ImageBackground({
  width: 100,
  height: 133,
  borderRadius: 2,
  overflow: 'hidden',
});

const TopicImageCoupon = styled.Image({
  position: 'absolute',
  top: 6,
  right: 6,
});

const TopicImageRightBottomLabel = styled.Text({
  position: 'absolute',
  right: 0,
  bottom: 6,
  fontSize: 10,
  lineHeight: 16,
  fontWeight: '500',
  paddingLeft: 4,
  paddingRight: 4,
  borderRadius: 2,
});

const TopicInfo = styled.View({
  width: topicInfoWidth,
  paddingLeft: 14,
});

const TopicHeader = styled.View({
  width: '100%',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const TopicHeaderTitle = styled.Text(({width}: {width: number}) => ({
  width,
  fontSize: 16,
  lineHeight: 20,
  fontWeight: '500',
}));

const TopicFollowButton = styled.Pressable(({favourite, width}: {favourite: boolean; width: number}) => ({
  justifyContent: 'center',
  alignItems: 'center',
  width,
  flexGrow: 0,
  height: 28,
  borderRadius: 14,
  borderColor: '#CCCCCC',
  borderStyle: 'solid',
  borderWidth: favourite ? 0 : OnePixel,
  backgroundColor: favourite ? '#F5F5F5' : 'white',
  marginLeft: 12,
}));

const TopicFollowButtonText = styled.Text(({favourite}: {favourite: boolean}) => ({
  fontSize: 13,
  fontWeight: '500',
  color: favourite ? '#CCCCCC' : '#222222',
}));

const TopicDesc = styled.View({
  marginTop: 8,
});

const TopicDescText = styled.Text({
  width: topicInfoWidth,
  color: '#999999',
  fontSize: 12,
  lineHeight: 17,
});

const TopicRecommends = styled.View({
  flexDirection: 'row',
  justifyContent: 'flex-start',
  marginTop: 8,
});

const TopicBottomTips = styled.View({
  position: 'absolute',
  bottom: 5,
  left: 10,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  height: 17,
});

const TopicBottomTipsFavoriteNumber = styled.Text({
  fontSize: 14,
  color: '#222',
  includeFontPadding: false,
  textAlignVertical: 'center',
  paddingRight: 3,
});

const TopicBottomTipsText = styled.Text({
  fontSize: 14,
  color: '#999999',
  includeFontPadding: false,
  textAlignVertical: 'center',
});

const TopicBottomTipsSeparator = styled.View({
  width: 1,
  height: 8,
  backgroundColor: '#999999',
  marginLeft: 4,
  marginRight: 4,
});

// 用于赫拉埋点的自增id
let ItemImpID = 0;

const TopicImage = ({item}: {item: ITopicItem}) => {
  const topicImage = useMemo(() => {
    if (RTNGaeaBusiness?.isMaleGender()) {
      if (item.vertical_image_url) {
        return item.vertical_image_url;
      } else {
        return item.male_vertical_image_url;
      }
    } else {
      return item.vertical_image_url;
    }
  }, [item.vertical_image_url, item.male_vertical_image_url]);

  const rightBottomLabel = useMemo(() => {
    return item.label_detail?.labels?.find(label => label.position === 4);
  }, [item.label_detail?.labels]);

  return (
    <TopicImageContainer source={{uri: topicImage}}>
      {item.coupon?.icon && <TopicImageCoupon source={{uri: item.coupon.icon}} style={{width: item.coupon.width, height: item.coupon.height}} />}
      {rightBottomLabel && (
        <TopicImageRightBottomLabel
          style={{
            backgroundColor: rightBottomLabel.background_color,
            color: rightBottomLabel.font_color,
          }}>
          {rightBottomLabel.text}
        </TopicImageRightBottomLabel>
      )}
    </TopicImageContainer>
  );
};

const TopicItem = ({
  idx,
  item,
  config,
  track,
  onUpdate,
}: {
  idx: number;
  item: ITopicItem;
  config: React.MutableRefObject<IPageConfig | null>;
  track: React.MutableRefObject<ITrackParams>;
  onUpdate: (status: boolean) => void;
}) => {
  const onTopicItemClick = useCallback(
    (event: GestureResponderEvent) => {
      console.log(item.id, config.current);
      RTNGaeaNavigation?.navigateWithCommonActionClientModel(
        {
          action: {
            // 漫画续读：https://wiki.quickcan.com/pages/viewpage.action?pageId=16265340
            type:
              config.current?.topic_click_action_type === 'half_screen_comic'
                ? 69 // 全屏续读
                : 2, // 专题详情页
            target_id: item.id,
          },
          saParams: {
            ...track.current,
          },
          addParams: {},
        },
        (event?.target as any)?._nativeTag ?? 0,
      );
    },
    [item, track, config],
  );

  const onRecommendLabelClick = useCallback(
    (label: ITopicItemRecommendReason, event: GestureResponderEvent) => {
      console.log(track.current);
      if (label.reason_type === ETopicRecommendLabelReasonType.ACKRecommendReasonTypeCatergory) {
        // TODO 补充安卓埋点
        RTNGaeaNavigation?.navigateToGaea('TopicList', {
          addParams: {
            title: label.title,
          },
          saParams: {
            ...track.current,
            ClkItemName: label.title,
          },
        });
      } else {
        RTNGaeaNavigation?.navigateWithCommonActionClientModel(
          {
            action: {
              type: label.action_type.type,
              target_title: label.action_type.target_title,
              target_web_url: label.action_type.target_web_url,
            },
            addParams: {},
            saParams: {
              ...track.current,
              ClkItemName: label.title,
            },
          },
          (event?.target as any)?._nativeTag ?? 0,
        );
      }
    },
    [track],
  );

  const trackHLItemImp = useCallback(() => {
    const params: THLItemImp = {
      Label: '无',
      ItemName: '无',
      ItemPos: idx + 1,
      InItemPos: 0,
      time: new Date().getTime(),
      ItemType: '专题',
      ComicID: 0,
      ComicName: '无',
      GenderType: RTNGaeaBusiness?.genderType() ?? '',
      MembershipClassify: RTNGaeaBusiness?.memberShipRole() ?? '',
      TopicID: item.id,
      TopicName: item.title,
      DispatchType: item.dispatch_type,
      RecBy: item.rec_by || '无法获取',
      RecId: item.rec_id || '无法获取',
      CurPage: 'CurrencyVisitPage',
      createTime: new Date().getTime(),
      ItemImpID: ++ItemImpID,
    };
    RTNGaeaEventTrack?.trackHLItemImp('ItemImp', params);
  }, [item, idx]);

  const isShowAppointment = config.current?.show_appointment && !item.appointment_detail?.disable;
  const isUnAppointAndUnFollow = !item.appointment_detail?.appointment && !item.is_favourite;
  return (
    <RTNOutlineView
      isOpenExposure={true}
      templateArray={['ContentID', 'ContentName', 'ClkItemType', 'InItemPos', 'RecMap']}
      eventDataJSON={JSON.stringify({
        ClkItemType: '专题',
        ContentID: item.id,
        ContentName: item.title,
        InItemPos: idx,
        RecMap: item.rec_data_report_map,
      })}
      isNeedNativeTrackCommonItemImp={true}
      onExposure={trackHLItemImp}>
      <Container onPress={onTopicItemClick}>
        <TopicImage item={item} />
        <TopicInfo>
          <TopicHeader>
            <TopicHeaderTitle width={topicInfoWidth - 12 - (isShowAppointment && isUnAppointAndUnFollow ? 105 : 66)} numberOfLines={1}>
              {item.title}
            </TopicHeaderTitle>
            {isShowAppointment ? (
              <TopicFollowButton width={105} favourite={item.is_favourite} onPress={() => onUpdate(!item.is_favourite)}>
                <TopicFollowButtonText favourite={item.is_favourite}>
                  {!item.appointment_detail?.appointment ? (!item.is_favourite ? '预约并关注' : '预约') : '已预约'}
                </TopicFollowButtonText>
              </TopicFollowButton>
            ) : (
              <TopicFollowButton width={66} favourite={item.is_favourite} onPress={() => onUpdate(!item.is_favourite)}>
                <TopicFollowButtonText favourite={item.is_favourite}>{item.is_favourite ? '已关注' : '关注'}</TopicFollowButtonText>
              </TopicFollowButton>
            )}
          </TopicHeader>
          <TopicDesc>
            <TopicDescText numberOfLines={1}>{item.recommend_text || item.description}</TopicDescText>
          </TopicDesc>
          <TopicRecommends>
            {item.recommend_reason_list.map((row, index) => (
              <Label key={index} item={row} index={index} onPress={event => onRecommendLabelClick(row, event)} />
            ))}
          </TopicRecommends>
          <TopicBottomTips>
            {item.comic_update_text ? (
              <>
                <TopicBottomTipsText>{item.comic_update_text}</TopicBottomTipsText>
                {!item.hidden_favourite_count && (
                  <>
                    <TopicBottomTipsSeparator />
                    <TopicBottomTipsText>{transformNumber(item.favourite_count)}关注</TopicBottomTipsText>
                  </>
                )}
              </>
            ) : (
              <>
                <TopicBottomTipsFavoriteNumber>{transformNumber(item.favourite_count)}</TopicBottomTipsFavoriteNumber>
                <TopicBottomTipsText>关注</TopicBottomTipsText>
              </>
            )}
          </TopicBottomTips>
        </TopicInfo>
      </Container>
    </RTNOutlineView>
  );
};

export default TopicItem;
