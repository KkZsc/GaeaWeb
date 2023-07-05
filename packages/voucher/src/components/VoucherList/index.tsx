import styled from '@emotion/native';
import {SafeAreaContainer} from '@gaea-web/components/container';
import Toolbar from '@gaea-web/components/toolbar';
import {Dimensions, SectionList, SectionListData, SectionListRenderItemInfo} from 'react-native';
import {useData} from '../../hooks/useData';
import {VoucherHeaderView, VoucherItemView} from '../ItemView';
import {VoucheRedPacketInfoModel, VoucherClientSectionModel} from '../../../types';
import RTNGaeaEventTrack from 'rtn-gaea-event-track/js/NativeGaeaEventTrack';
import RTNGaeaNavigation, {CommonActionClientModel} from 'rtn-gaea-navigation/js/NativeGaeaNavigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const voucherInfoUrl = 'http://www.kuaikanmanhua.com/webapp/voucher_intro.html';
const pageName = 'VoucherList';
const {width} = Dimensions.get('window');
const rightButtonWidth = 50;
const StyledSectionList = styled(SectionList<VoucheRedPacketInfoModel, VoucherClientSectionModel>)({
  paddingLeft: 0,
  paddingRight: 0,
  backgroundColor: '#F5F5F5',
});

const renderVoucherItem = (info: SectionListRenderItemInfo<VoucheRedPacketInfoModel, VoucherClientSectionModel>) => {
  return (
    <VoucherItemView
      item={info.item}
      onCoverViewTapped={(item: VoucheRedPacketInfoModel, nativeTag: number) => {
        RTNGaeaEventTrack?.sensorTrack('VoucherListClk', {
          ClkPos: item.index + 1,
          ItemName: item.topic_title,
          ItemState: item.type,
          TriggerPage: pageName,
        });
        let saParams = {
          TriggerPage: pageName,
          TopicID: item.topic_id,
          TopicName: item.topic_title,
        };
        let actionModel: CommonActionClientModel = {
          action: {
            type: 2,
            target_id: item.topic_id,
            nav_action_triggerPage: pageName,
          },
          saParams: saParams,
          addParams: {},
        };
        RTNGaeaNavigation?.navigateWithCommonActionClientModel(actionModel, nativeTag);
      }}
      onDetailRuleTapped={(item: VoucheRedPacketInfoModel) => {
        RTNGaeaEventTrack?.sensorTrack('VisitVoucherList', {
          TriggerButton: 2,
          TriggerPage: pageName,
        });
        RTNGaeaNavigation?.navigateToVoucherDetailWithModel(item);
      }}
    />
  );
};

const renderVoucherSection = (info: {section: SectionListData<VoucheRedPacketInfoModel, VoucherClientSectionModel>}) => {
  if (info.section.data.length === 0 || info.section.sectionTitle.length === 0) {
    return null;
  }
  return <VoucherHeaderView section={info.section} />;
};

const HelpContentView = styled.TouchableOpacity({
  position: 'absolute',
  width: rightButtonWidth,
  height: 44,
  right: 0,
  justifyContent: 'center',
});

const HelpContentText = styled.Text({
  fontSize: 14,
  height: 17,
  lineHeight: 17,
  fontWeight: 'normal',
  textAlign: 'center',
  textAlignVertical: 'center',
  color: '#000',
});

const renderVoucherHelperView = () => {
  return (
    <HelpContentView
      activeOpacity={1}
      onPress={() => {
        RTNGaeaNavigation?.navigateToH5(voucherInfoUrl, '', false);
      }}>
      <HelpContentText>帮助</HelpContentText>
    </HelpContentView>
  );
};

const EmptyImageView = styled.Image({
  position: 'absolute',
  width: 210,
  height: 210,
  top: 200,
  left: (width - 210) / 2,
});

const VoucherPage = () => {
  const {onRefresh, resultData, refreshing, since, loadMore, loadMoreRequesting} = useData();
  return (
    <SafeAreaProvider
      initialMetrics={{
        insets: {top: 0, bottom: 0, left: 0, right: 0},
        frame: {
          x: 0,
          y: 0,
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
        },
      }}>
      <SafeAreaContainer edges={['left', 'right', 'top']}>
        <Toolbar title={'代金券'} enableBackButton={true} renderRight={renderVoucherHelperView} />
        {resultData.isEmpty ? (
          <EmptyImageView source={require('@/resource/ic_voucher_empty.png')} />
        ) : (
          <StyledSectionList
            contentInset={{bottom: 34}}
            sections={[resultData.canUseVouchers, resultData.cannotUseVouchers, resultData.expireVouchers]}
            renderItem={renderVoucherItem}
            renderSectionHeader={renderVoucherSection}
            keyExtractor={(item, index) => {
              return item.topic_id.toString() + index?.toString();
            }}
            stickySectionHeadersEnabled={false}
            refreshing={refreshing}
            onRefresh={onRefresh}
            onEndReached={() => {
              if (since > 0 && !loadMoreRequesting) {
                loadMore();
              }
            }}
          />
        )}
      </SafeAreaContainer>
    </SafeAreaProvider>
  );
};

export default VoucherPage;
