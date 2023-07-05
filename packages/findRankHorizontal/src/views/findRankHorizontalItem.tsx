import styled from '@emotion/native';
import {FindInfoBannerModel} from '@gaea-web/shared/src/types/findData/findInfoBanner';
import ComicLabelView, {ComicLabelViewModel} from './comicLabelView';
import FindRankCornerMark from '@gaea-web/components/find-rank-corner-mark/findRankCornerMark';
import {FindInfoLabelDetailLabelListModel, FindLabelDetailPosition} from '@gaea-web/shared/src/types/findData/findInfoLabelDetail';
import {Platform, Pressable} from 'react-native';
import RTNGaeaNavigation, {CommonActionModel} from 'rtn-gaea-navigation/js/NativeGaeaNavigation';
import RTNOutlineView from 'rtn-gaea-outline-view/js/GaeaOutlineViewNativeComponent';
import RTNGaeaEventTrack from 'rtn-gaea-event-track/js/NativeGaeaEventTrack';
import {getContentIdByActionType, getContentType, getRelatedIdByActionType} from '@gaea-web/shared/src/comicContentTrackHelper';

const Container = styled(RTNOutlineView)<{
  isFirstItem?: boolean;
  isLastItem?: boolean;
}>(props => ({
  flex: 1,
  marginLeft: props.isFirstItem ? 9 + 3 : 3,
  marginRight: props.isLastItem ? 9 + 3 : 3,
  overflow: 'hidden',
  flexDirection: 'column',
  marginTop: 8,
}));

const CoverImageContainerView = styled.View<{
  aspect?: number;
}>(props => ({
  borderRadius: 6,
  overflow: 'hidden',
  height: 88,
  width: props.aspect ? 88 * props.aspect : 140,
  backgroundColor: 'transparent',
}));

const CoverImageView = styled.Image({
  alignSelf: 'center',
  width: '100%',
  height: '100%',
  position: 'absolute',
  backgroundColor: '#F5F5F5',
});

const RankIconImageView = styled(FindRankCornerMark)({
  width: 27,
  height: 27,
  position: 'absolute',
});

const SubView = styled.View({
  height: 18,
  flexDirection: 'row',
  top: 6,
  bottom: 12,
  backgroundColor: 'transparent',
  alignItems: 'center',
});

const LeftIconImageView = styled.Image({
  width: 14,
  height: 14,
  borderRadius: 3,
  overflow: 'hidden',
});

const TopicNameLabel = styled.Text<{
  hasImage?: boolean;
}>(props => ({
  fontSize: 14,
  color: '#222222',
  left: props.hasImage ? 14 + 4 : 0,
  right: 0,
  top: 0,
  bottom: 0,
  lineHeight: 18,
  fontWeight: Platform.OS === 'ios' ? '600' : 'normal',
  position: 'absolute',
}));

function from(labelModel: FindInfoLabelDetailLabelListModel | undefined) {
  if (labelModel === undefined) {
    return undefined;
  }
  const viewModel: ComicLabelViewModel = {
    text: labelModel.text || '',
    backgroundColor: labelModel.backgroundColor || 'transparent',
    fontColor: labelModel.fontColor || '#222222',
    icon: labelModel.icon || '',
    width: labelModel.width,
    height: labelModel.height,
    isShowLabel: (labelModel.text || '').length > 0,
    isShowImage: (labelModel.icon || '').length > 0 && labelModel.width > 0 && labelModel.height > 0 && !((labelModel.text || '').length > 0),
  };
  return viewModel;
}

const FindHorizonRankListItemCell = (props: {
  rootTag: number;
  bannerModel: FindInfoBannerModel;
  inItemPos: number;
  isFirstItem: boolean;
  isLastItem: boolean;
  isComicPage: boolean;
  saParams: {};
  HL_ModuleType: string;
  HL_ModulePos: number;
}) => {
  var leftImageUrl: string | undefined;
  if (props.bannerModel.labelDetail?.labels) {
    for (const element of props.bannerModel.labelDetail?.labels) {
      if (element.position === FindLabelDetailPosition.PreTitle) {
        if (element.icon) {
          leftImageUrl = element.icon;
        }
      }
    }
  }
  const rightTopLabelModel = from(props.bannerModel.labelDetail?.rightTopLabelModel);

  const actionClientModel: CommonActionModel = {
    ...props.bannerModel.acitonType,
  };

  const trackParms = {
    InItemPos: props.inItemPos,
    ClkItemType: Platform.OS === 'android' ? getContentType(actionClientModel) : props.bannerModel.clkItemTypeString,
    ContentID: Platform.OS === 'android' ? getContentIdByActionType(actionClientModel) : props.bannerModel.contentIDString,
    RelatedContentID: Platform.OS === 'android' ? getRelatedIdByActionType(actionClientModel) : props.bannerModel.relatedContentIDString,
    RecMap: Platform.OS === 'android' ? undefined : props.bannerModel.recDataReportMapString,
    HL_ModuleTitle: Platform.OS === 'android' ? undefined : '横滑排行榜模块',
    HL_ModuleType: Platform.OS === 'android' ? undefined : props.HL_ModuleType,
    HL_ModulePos: Platform.OS === 'android' ? undefined : props.HL_ModulePos,
  };

  return (
    <Pressable
      onPress={() => {
        RTNGaeaNavigation?.findNavigateWithCommonActionClientModel(
          JSON.stringify(actionClientModel),
          JSON.stringify(props.bannerModel),
          props.isComicPage,
          props.saParams,
          {index: props.inItemPos},
          props.rootTag,
        );
        //点击埋点
        RTNGaeaEventTrack?.trackCommonItemClk({...trackParms});
      }}>
      <Container
        isFirstItem={props.isFirstItem}
        isLastItem={props.isLastItem}
        isNeedNativeTrackCommonItemImp={true}
        isOpenExposure={true}
        templateArray={['InItemPos', 'ClkItemType', 'ContentID', 'RelatedContentID', 'RecMap', 'HL_ModuleTitle', 'HL_ModuleType', 'HL_ModulePos']}
        eventDataJSON={JSON.stringify({...trackParms})}>
        <CoverImageContainerView aspect={props.bannerModel.aspect}>
          <CoverImageView source={{uri: props.bannerModel.imageURL}} />
          <RankIconImageView pos={props.inItemPos} />
          {rightTopLabelModel ? <ComicLabelView viewModel={rightTopLabelModel} /> : null}
        </CoverImageContainerView>

        <SubView>
          {leftImageUrl ? <LeftIconImageView source={{uri: leftImageUrl}} /> : null}
          <TopicNameLabel hasImage={leftImageUrl !== undefined && leftImageUrl.length > 0} numberOfLines={1} allowFontScaling={false}>
            {props.bannerModel.title}
          </TopicNameLabel>
        </SubView>
      </Container>
    </Pressable>
  );
};

export default FindHorizonRankListItemCell;
