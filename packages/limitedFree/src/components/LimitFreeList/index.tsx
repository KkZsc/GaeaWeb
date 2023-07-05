import {FreeTopic} from '../../../types';
import React from 'react';
import {FlatList, Platform, View} from 'react-native';
import {LimitedFreeItem} from '../LimitFreeItem';
import {LimitedFreeItemHeader} from '../LimitFreeItemHeader';
import {usePageData} from '../../hooks/usePageData';
import styled from '@emotion/native';
import {useFavNotification} from '../../hooks/useFavNotification';
import {AndroidFavModel, ICustomProp, IOSFavModel} from '@gaea-web/shared';
import RTNGaeaEventTrack from 'rtn-gaea-event-track/js/NativeGaeaEventTrack';

const FREE_ITEM_HEIGHT = 157;

const EmptyContainer = styled.View({
  flexDirection: 'column',
  alignItems: 'center',
});

const EmptyImage = styled.Image({
  marginTop: 138,
});

const EmptyText = styled.Text({
  fontSize: 14,
  color: '#999999',
});

const Item = React.memo(
  ({
    item,
    index,
    tabName,
    onFavClicked,
  }: {
    item: FreeTopic;
    index: number;
    tabName: string;
    onFavClicked: (fav: boolean, nativeTag: number) => void;
  }) => {
    return <LimitedFreeItem item={item} position={index} tabName={tabName} onFavClicked={onFavClicked} />;
  },
);

export const LimitFreeList = (props: ICustomProp) => {
  const {topics, netStatus, setTopics} = usePageData(props?.params);
  const {postFavHandler} = useFavNotification(setTopics);
  if (netStatus !== 'success') {
    return (
      <View>
        {netStatus === 'error' && (
          <EmptyContainer>
            <EmptyImage source={require('@/resource/icon_limit_free_empty.png')} />
            <EmptyText>再等等，马上就能免费读啦</EmptyText>
          </EmptyContainer>
        )}
      </View>
    );
  }
  return (
    <FlatList
      gaeaNestedScrollChild={true}
      style={{flex: 1}}
      ListHeaderComponent={
        topics &&
        topics.paying_info && (
          <LimitedFreeItemHeader
            payInfo={topics.paying_info}
            favourite={topics.batch_favourite?.favourite ?? false}
            tabName={props?.params?.tabName}
            onAllFavClicked={(fav: boolean, nativeTag: number) => {
              const ids = topics.topic_list?.map(item => {
                return item.id;
              });

              if (!ids) {
                return;
              }

              const androidModel: AndroidFavModel = {
                topicIdList: ids,
                fav: fav,
              };
              const iosModel: IOSFavModel = {
                topicIdList: ids,
                isFav: fav,
              };
              postFavHandler(Platform.OS === 'android' ? androidModel : iosModel, nativeTag);
            }}
          />
        )
      }
      data={topics?.topic_list ?? []}
      keyExtractor={item => item.id.toString()}
      renderItem={({item, index}: {item: FreeTopic; index: number}) => {
        return (
          <Item
            item={item}
            index={index}
            tabName={props?.params?.tabName}
            onFavClicked={(fav: boolean, nativeTag: number) => {
              const trackParams = {
                TopicID: item.id,
                TopicName: item.title,
                TriggerPage: 'FreeingPage',
              };
              const androidModel: AndroidFavModel = {
                topicId: item.id,
                fav: fav,
              };
              const iosModel: IOSFavModel = {
                topicID: item.id,
                isFav: fav,
                trackModel: {...trackParams},
              };
              postFavHandler(Platform.OS === 'android' ? androidModel : iosModel, nativeTag, trackParams);
              //点击埋点
              if (Platform.OS === 'ios') {
                RTNGaeaEventTrack?.trackCommonElementClk({
                  HL_ModuleType: 'FreeingPage',
                  HL_ModuleTitle: '限时免费',
                  HL_SubModuleType: '限免预告页Tab',
                  HL_SubModuleTitle: props?.params?.tabName,
                  ClkItemType: '专题',
                  ContentName: item.title,
                  ElementShowText: fav ? '关注' : '已关注',
                  ElementName: '关注按钮',
                });
              }
            }}
          />
        );
      }}
      getItemLayout={(_, index) => ({
        length: FREE_ITEM_HEIGHT,
        offset: FREE_ITEM_HEIGHT * index,
        index,
      })}
    />
  );
};
