import {SecondaryBookListActionProtocol, SecondaryBookListModel, SecondaryBookListTopicModel, useData} from '../../hooks/useData';
import styled from '@emotion/native';
import {FlatList, Dimensions} from 'react-native';
import Toolbar from '@gaea-web/components/toolbar';
import {SafeAreaContainer} from '@gaea-web/components/container';
import {SecondaryBookModule} from '../SecondaryBookListItem';
import RTNGaeaNavigation from 'rtn-gaea-navigation/js/NativeGaeaNavigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import RTNGaeaEventTrack from 'rtn-gaea-event-track/js/NativeGaeaEventTrack';
import {useMount} from '@gaea-web/shared';

const itemLeftRightPadding = 12;

export const StyledFlatList = styled(FlatList<SecondaryBookListModel>)({
  paddingLeft: itemLeftRightPadding,
  paddingRight: itemLeftRightPadding,
  backgroundColor: '#F5F5F5',
});

const trackBookListPageClk = (bookName: string, buttonName: string, topicId: number) => {
  console.log(`track:${bookName}/${buttonName}/${topicId}`);
  //埋点
  RTNGaeaEventTrack?.sensorTrack('RecBookLandingPageClk', {
    BookName: bookName,
    ButtonName: buttonName,
    TopicID: topicId,
    TriggerPage: '书单-书单页',
  });
};

const trackVisitPage = (tabName: string, triggerPage: string) => {
  RTNGaeaEventTrack?.sensorTrack('SecondVisitPage', {
    TabName: tabName,
    TriggerPage: triggerPage,
    ClkItemType: '书单-书单页',
  });
};

const jumpWithAction = (actionModel: SecondaryBookListActionProtocol) => {
  console.log(`jump:${actionModel.target_id}/${actionModel.type}/${actionModel.target_web_url}`);
  //通跳
  const commonActionModel = {
    type: actionModel.target_id,
    targetId: actionModel.target_id,
    targetWebUrl: actionModel.target_web_url,
  };
  RTNGaeaNavigation?.navigateWithCommonActionModel(commonActionModel);
};

const renderListModule = ({item}: {item: SecondaryBookListModel}) => {
  return (
    <SecondaryBookModule
      list={item}
      itemTapped={(topic: SecondaryBookListTopicModel, list: SecondaryBookListModel) => {
        trackBookListPageClk(list.title, '其他', topic.id);
        jumpWithAction(topic.action_protocol);
      }}
      moreTapped={(list: SecondaryBookListModel) => {
        trackBookListPageClk(list.title, '更多', -1);
        jumpWithAction(list.action_protocol);
      }}
    />
  );
};

interface SecondBookListParams {
  triggerPage: string;
  title: string;
}

const isSecondBookListParams = (params: any): params is SecondBookListParams => {
  return typeof params?.title === 'string' && typeof params?.triggerPage === 'string';
};

export const checkSecondBookListParams = (params: any) => {
  if (isSecondBookListParams(params)) {
    return params;
  }
  return undefined;
};

const SecondaryBookListPage = ({initialParams}: {initialParams?: SecondBookListParams}) => {
  const {resultData, refreshStatus, refresh, loadNextPage, isEnd} = useData();
  useMount(() => {
    trackVisitPage(initialParams?.title ?? '', initialParams?.triggerPage ?? '');
  });
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
      <SafeAreaContainer>
        <Toolbar title={'书单二级页'} />
        <StyledFlatList
          data={resultData}
          keyExtractor={(item: SecondaryBookListModel, index: number) => item.id.toString() + index.toString()}
          renderItem={renderListModule}
          numColumns={1}
          refreshing={refreshStatus}
          onRefresh={refresh}
          onEndReached={() => {
            if (!isEnd) {
              loadNextPage();
            }
          }}
          onEndReachedThreshold={0.7}
        />
      </SafeAreaContainer>
    </SafeAreaProvider>
  );
};

export default SecondaryBookListPage;
