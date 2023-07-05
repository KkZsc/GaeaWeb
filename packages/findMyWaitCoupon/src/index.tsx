import React, {useRef} from 'react';
import {Animated, Dimensions, NativeEventEmitter, NativeModules} from 'react-native';
import styled from '@emotion/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {FindMyWaitCouponFinishCell} from './components/FinishCell';
import {FindMyWaitCouponFinishTitleCell} from './components/FinishTitleCell';
import {FindMyWaitCouponWaitingListCell} from './components/WaitingCell';
import {FindMyWaitCouponWaitingTitleCell} from './components/WaitingTitleCell';
import {
  FindMyWaitCouponSecondaryFinishItemViewModel,
  FindMyWaitCouponSecondaryFinishTitleViewModel,
  FindMyWaitCouponSecondaryViewModel,
  FindMyWaitCouponSecondaryViewModelType,
  FindMyWaitCouponSecondaryWaitingListViewModel,
  FindMyWaitCouponSecondaryWaitingTitleViewModel,
  useData,
} from './hooks/useData';
import {EnvProvider, TNativeProps} from '@gaea-web/shared';
import Toolbar from '@gaea-web/components/toolbar';
import {SafeAreaContainer} from '@gaea-web/components';
import {FindMyWaitCouponNoDataEmptyView} from './components/Empty/NoDataEmpty';
import {FindMyWaitCouponNoNetworkEmptyView} from './components/Empty/NoNetworkEmpty';
import {FindMyWaitCouponNoFinishListEmptyView} from './components/Empty/NoFinishListEmpty';
import {RootView} from '@gaea-web/components/root-view';
import NotificationButton from './components/NotificationButton';
import RTNGaeaPullRefreshView from 'rtn-gaea-pull-refresh-view/js/GaeaPullRefreshViewNativeComponent';

const {width} = Dimensions.get('window');
const {GAViewEventEmitter} = NativeModules;
const viewDidAppearEmitter = new NativeEventEmitter(GAViewEventEmitter);

const Container = styled.View({
  flex: 1,
  width: width,
});

const FlatListContainer = styled.View({
  flex: 1,
  width: width,
  backgroundColor: 'white',
  overflow: 'hidden',
});

const FlatListTopAnimatedView = styled(Animated.View)({
  position: 'absolute',
  top: -500,
  backgroundColor: '#F5F5F5',
  height: 500,
  width: '100%',
});

const FlatListAnimatedContainer = styled(Animated.FlatList)({
  paddingVertical: 0,
  flex: 1,
  width: '100%',
  backgroundColor: 'transparent',
  top: 0,
});

const ListItem = ({viewModel}: {viewModel: FindMyWaitCouponSecondaryViewModel}) => {
  switch (viewModel.type) {
    case FindMyWaitCouponSecondaryViewModelType.waitingTitle:
      return <FindMyWaitCouponWaitingTitleCell viewModel={viewModel as FindMyWaitCouponSecondaryWaitingTitleViewModel} />;
    case FindMyWaitCouponSecondaryViewModelType.waitingList:
      return <FindMyWaitCouponWaitingListCell viewModel={viewModel as FindMyWaitCouponSecondaryWaitingListViewModel} />;
    case FindMyWaitCouponSecondaryViewModelType.finishTitle:
      return <FindMyWaitCouponFinishTitleCell viewModel={viewModel as FindMyWaitCouponSecondaryFinishTitleViewModel} />;
    case FindMyWaitCouponSecondaryViewModelType.noFinishListEmpty:
      return <FindMyWaitCouponNoFinishListEmptyView />;
    default:
      return <FindMyWaitCouponFinishCell viewModel={viewModel as FindMyWaitCouponSecondaryFinishItemViewModel} />;
  }
};

const FlatListMainView = ({
  refreshStatus,
  noLimitRefresh,
  resultData,
}: {
  refreshStatus: boolean;
  noLimitRefresh: () => void;
  resultData: FindMyWaitCouponSecondaryViewModel[] | undefined;
}) => {
  const offset = useRef(new Animated.Value(0)).current;
  return (
    <FlatListContainer>
      <FlatListTopAnimatedView
        style={{
          transform: [
            {
              translateY: offset.interpolate({
                inputRange: [-500, 0, 500],
                outputRange: [500, 0, 0],
              }),
            },
          ],
        }}
      />
      <FlatListAnimatedContainer
        data={resultData}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: offset,
                },
              },
            },
          ],
          {
            useNativeDriver: true,
          },
        )}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => <ListItem viewModel={item as FindMyWaitCouponSecondaryViewModel} />}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RTNGaeaPullRefreshView
            refreshing={refreshStatus}
            onRefresh={() => {
              noLimitRefresh();
            }}
          />
        }
      />
    </FlatListContainer>
  );
};

const MainView = ({rootTag}: {rootTag: number}) => {
  const {resultData, refreshStatus, hasLoadedStatus, isNetworkError, refresh, noLimitRefresh} = useData();
  React.useEffect(() => {
    if (rootTag > 0) {
      const subscription = viewDidAppearEmitter.addListener('GaeaViewDidAppear', event => {
        if (event?.rootTag === rootTag) {
          refresh();
        }
      });
      return () => subscription.remove();
    }
  }, [rootTag, refresh]);

  return (
    <Container>
      <Toolbar title="我的等免" renderRight={() => <NotificationButton />} />
      {isNetworkError ? (
        <FindMyWaitCouponNoNetworkEmptyView refreshTapped={refresh} />
      ) : hasLoadedStatus && resultData?.length === 0 ? (
        <FindMyWaitCouponNoDataEmptyView />
      ) : (
        <FlatListMainView refreshStatus={refreshStatus} noLimitRefresh={noLimitRefresh} resultData={resultData} />
      )}
    </Container>
  );
};

const StyledSafeAreaProvider = styled(SafeAreaProvider)({
  backgroundColor: '#f5f5f5',
});

export const PageComponent = (props: TNativeProps) => {
  return (
    <RootView>
      <EnvProvider value={props.nativeConfig}>
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
            <MainView rootTag={props.rootTag ?? 0} />
          </SafeAreaContainer>
        </StyledSafeAreaProvider>
      </EnvProvider>
    </RootView>
  );
};

export default PageComponent;
