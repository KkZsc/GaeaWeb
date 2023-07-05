import styled from '@emotion/native';
import Toolbar, {SafeAreaViewContainer} from '@gaea-web/components/toolbar';
import {FlatList, Dimensions, View} from 'react-native';
import {Topic} from '../../../types/autoPayData';
import {useData} from '../AutoPayPersenter';
import AutoPayListItem from '../ListiItemAutoPay';
import {Modal} from '@gaea-web/components/modal';
import {Siblings} from '@gaea-web/components/root-view';
import RTNGaeaNavigation from 'rtn-gaea-navigation/js/NativeGaeaNavigation';
import {PAGE_TOPIC} from '@gaea-web/shared/src/navActionType';

export const PARENT_PADDING = 14;

export const StyledFlatList = styled(FlatList<Topic>)({
  paddingLeft: PARENT_PADDING,
  paddingRight: PARENT_PADDING,
  backgroundColor: '#FFFFFF',
});

const Container = styled.View({
  width: Dimensions.get('screen').width,
  height: Dimensions.get('screen').height,
});

const FooterText = styled.Text({
  width: Dimensions.get('screen').width,
  height: 15,
  marginTop: 12,
  marginBottom: 100,
  fontSize: 12,
  color: '#999999',
  alignContent: 'center',
});

const footer = () => {
  return (
    <View>
      <FooterText numberOfLines={1}>取消后，每次购买章节都会出现支付kk币的确认弹窗</FooterText>
    </View>
  );
};

const cacheTopic = (topic: Topic) => {
  const commonActionModel = {
    type: PAGE_TOPIC,
    action_type: PAGE_TOPIC,
    target_id: topic.id,
    target_title: topic.title,
    nav_action_triggerPage: 'AutoPayPage',
  };
  RTNGaeaNavigation?.navigateWithCommonActionModel(commonActionModel);
};

const showCancelDialog = (topic: Topic, cancelAutoPay: (topicId: number, topicName: string) => Promise<void>) => {
  Modal.show({
    title: '取消自动购买',
    content: '是否取消该作品的自动购买',
    cancelText: '取消',
    confirmText: '确认',
    onConfirm: () => {
      cancelAutoPay(topic.id, topic.title);
    },
    maskClosable: true,
  });
};

const dissmiss = (model: Siblings) => {
  Modal.hide(model);
};

const delayCancleDialog = () => {
  let timer: number;
  const model = Modal.show({
    title: '取消自动购买',
    content: '已取消,谢谢您的支持~',
    confirmText: '确认',
    maskClosable: true,
    onClose: () => {
      clearTimeout(timer);
    },
  });

  timer = setTimeout(() => dissmiss(model), 2000);
};

export const AutoPayManagerFragment = ({params}: {params: string}) => {
  const {resultData, refreshStatus, refresh, loadNextPage, isEnd, useCancelAutoPay} = useData(delayCancleDialog);
  return (
    <Container>
      <SafeAreaViewContainer>
        <Toolbar title={params} />
        <StyledFlatList
          data={resultData}
          keyExtractor={(item: Topic, index: number) => item.id.toString() + index.toString()}
          renderItem={({item}: {item: Topic}) => {
            return <AutoPayListItem item={item} onViewClick={() => cacheTopic(item)} onCannel={() => showCancelDialog(item, useCancelAutoPay)} />;
          }}
          numColumns={1}
          refreshing={refreshStatus}
          onRefresh={refresh}
          onEndReached={() => {
            if (!isEnd) {
              loadNextPage();
            }
          }}
          ListFooterComponent={resultData.length > 0 ? footer : null}
          onEndReachedThreshold={0.7}
        />
      </SafeAreaViewContainer>
    </Container>
  );
};
