import styled from '@emotion/native';
import Toolbar, {SafeAreaViewContainer} from '@gaea-web/components/toolbar';
import {FlatList, Dimensions} from 'react-native';
import {useData} from '../blackDataPresenter';
import {User} from '../../../types/index';
import {UserBlackListItem} from '../UserBlackListItem';
import {PAGE_PERSON_CENTER} from '@gaea-web/shared/src/navActionType';
import RTNGaeaNavigation from 'rtn-gaea-navigation/js/NativeGaeaNavigation';
import {Modal} from '@gaea-web/components/modal';
import EmptyView from '@gaea-web/components/empty-data-view';
import NetErrorView from '@gaea-web/components/net-error-view';

export const StyledFlatList = styled(FlatList<User>)({
  backgroundColor: '#FFFFFF',
});

const Container = styled.View({
  width: Dimensions.get('screen').width,
  height: Dimensions.get('screen').height,
  backgroundColor: '#FFFFFF',
});

const navUserCenter = (user: User) => {
  const commonActionModel = {
    type: PAGE_PERSON_CENTER,
    action_type: PAGE_PERSON_CENTER,
    target_id: user.id,
    nav_action_triggerPage: 'UserBlackListManagerPage',
  };
  RTNGaeaNavigation?.navigateWithCommonActionModel(commonActionModel);
};

const showCancelDialog = (user: User, removeBlackUserById: (id: number) => Promise<void>) => {
  Modal.show({
    title: '移出黑名单',
    content: '是否确认将其移出黑名单',
    cancelText: '取消',
    confirmText: '确认',
    onConfirm: () => {
      removeBlackUserById(user.id);
    },
    maskClosable: true,
  });
};

const BlackListManagerFragment = ({params}: {params: string}) => {
  const {resultData, refreshStatus, refresh, loadNextPage, isEnd, hasLoadedStatus, isNetworkError, removeBlackUserById} = useData();
  return (
    <Container>
      <SafeAreaViewContainer>
        <Toolbar title={params} />
        {isNetworkError ? (
          <NetErrorView title="哎哟～过程出了点意外，刷新试试看" refreshTapped={refresh} />
        ) : hasLoadedStatus && resultData?.length === 0 ? (
          <EmptyView params="暂无数据" />
        ) : (
          <StyledFlatList
            data={resultData}
            keyExtractor={(item: User, index: number) => item.id.toString() + index.toString()}
            renderItem={({item}: {item: User}) => {
              return (
                <UserBlackListItem
                  item={item}
                  onViewClick={() => {
                    console.log('跳转到用户中心，uid：' + item.id);
                    navUserCenter(item);
                  }}
                  onCannel={() => {
                    showCancelDialog(item, removeBlackUserById);
                    console.log('取消黑名单');
                  }}
                />
              );
            }}
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
        )}
      </SafeAreaViewContainer>
    </Container>
  );
};

export default BlackListManagerFragment;
