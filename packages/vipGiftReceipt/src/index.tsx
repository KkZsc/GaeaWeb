import styled from '@emotion/native';
import {Animated, Dimensions} from 'react-native';
import {VipGiftReceiptModel, useData} from './hooks/useData';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {EnvProvider, ICustomProp} from '@gaea-web/shared';
import {RootView} from '@gaea-web/components/root-view';
import Toolbar from '@gaea-web/components/toolbar';
import {SafeAreaContainer} from '@gaea-web/components';
import {NoGiftEmptyView, NoNetworkEmptyView} from './components/EmptyHintView';
// import {ToastContent} from './components/Toast';
import {VipGiftReceiptCell, CellLine} from './components/VipGiftReceiptCell';
import RTNGaeaPullRefreshView from 'rtn-gaea-pull-refresh-view/js/GaeaPullRefreshViewNativeComponent';
// import Modal from '@gaea-web/components/modal';

const {width} = Dimensions.get('window');

const Container = styled.View({
  flex: 1,
  width: width,
});

const FlatListAnimatedContainer = styled(Animated.FlatList<VipGiftReceiptModel>)({
  paddingVertical: 0,
  flex: 1,
  width: '100%',
  backgroundColor: 'transparent',
  top: 4.5,
});

const StyledSafeAreaProvider = styled(SafeAreaProvider)({
  backgroundColor: '#ffffff',
});

const FlatListContainer = styled.View({
  flex: 1,
  width: width,
  backgroundColor: '#f5f5f5',
  overflow: 'hidden',
});

const FlatListMainView = ({
  refreshStatus,
  refresh,
  loadNextPage,
  resultData,
  isEnd,
}: {
  refreshStatus: boolean;
  refresh: () => void;
  loadNextPage: () => void;
  resultData: VipGiftReceiptModel[] | undefined;
  isEnd: boolean;
}) => {
  return (
    <FlatListContainer>
      <FlatListAnimatedContainer
        data={resultData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => <VipGiftReceiptCell viewModel={item} />}
        ItemSeparatorComponent={() => <CellLine />}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RTNGaeaPullRefreshView
            refreshing={refreshStatus}
            onRefresh={() => {
              refresh();
            }}
          />
        }
        onEndReached={() => {
          if (!isEnd) {
            loadNextPage();
          }
        }}
      />
    </FlatListContainer>
  );
};

const MainView = () => {
  const {resultData, refreshStatus, hasLoadedStatus, isNetworkError, refresh, loadNextPage, isEnd} = useData();

  // useEffect(() => {
  //   let _model: Siblings;
  //   if (isNetworkError) {
  //     _model = Modal.show({
  //       content: (
  //         <ToastContent
  //           title="展示一个网络错误弹窗"
  //           detail="网络错误弹窗详细信息"
  //         />
  //       ),
  //     });
  //   }

  //   return () => Modal.hide(_model);
  // }, [isNetworkError]);

  return (
    <Container>
      <Toolbar title="会员礼包领取" />
      {isNetworkError ? (
        <NoNetworkEmptyView />
      ) : hasLoadedStatus && resultData?.length === 0 ? (
        <NoGiftEmptyView />
      ) : (
        <FlatListMainView refreshStatus={refreshStatus} refresh={refresh} resultData={resultData} loadNextPage={loadNextPage} isEnd={isEnd} />
      )}
    </Container>
  );
};

export const PageComponent = (props: ICustomProp) => {
  return (
    <RootView>
      <EnvProvider value={props}>
        <StyledSafeAreaProvider
          initialMetrics={{
            insets: {top: 0, bottom: 0, left: 0, right: 0},
            frame: {
              x: 0,
              y: 0,
              width: Dimensions.get('window').width,
              height: Dimensions.get('window').height,
            },
          }}>
          <SafeAreaContainer edges={['top']}>
            <MainView />
          </SafeAreaContainer>
        </StyledSafeAreaProvider>
      </EnvProvider>
    </RootView>
  );
};

export default PageComponent;
