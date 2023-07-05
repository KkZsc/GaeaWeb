import {memo, useRef, useState, useEffect, useCallback} from 'react';
import {Animated, FlatList, Platform} from 'react-native';
import styled from '@emotion/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {usePageData} from '../../hooks/usePageData';
import {useFavNotification} from '../../hooks/useFavNotification';
import {useTrackParams} from '../../hooks/useTrackParams';
import {ITopicItem, TPageParams} from '../../../types';
import Header from '../Header';
import TopicItem from '../TopicItem';
import Loading from '../LoadMore';
import ToolsRow from '../ToolsRow';
import EmptyView from '../EmptyView';
import Toolbar from '@gaea-web/components/toolbar';
import {OnePixel, loginEventListener} from '@gaea-web/shared';
import {getPageName, EPageType} from '../../../utils/getPageName';
import {Loading as LoadingFn} from '@gaea-web/components';
import RTNGaeaEventTrack from 'rtn-gaea-event-track/js/NativeGaeaEventTrack';

const Container = styled.View({
  flex: 1,
});

const TopicListStickyContainer = styled(Animated.View)({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  backgroundColor: 'white',
});

const TopicListStickyContainerDesc = styled.View({
  height: 36,
  justifyContent: 'center',
  borderWidth: OnePixel,
  borderLeftColor: 'transparent',
  borderRightColor: 'transparent',
  borderTopColor: '#F5F5F5',
  borderBottomColor: '#F5F5F5',
  borderStyle: 'solid',
});

const AnimatedFlatList = styled(Animated.FlatList<ITopicItem>)({
  flex: 1,
});

const MemoizedTopicItem = memo(TopicItem, (prevProps, nextProps) => {
  return prevProps.item.id === nextProps.item.id && prevProps.item.is_favourite === nextProps.item.is_favourite;
});

/**
 * 优先module_id ---> topic/discovery_v2/module_list
 * title  ----> freestyle/tag/more
 * server api
 */
const TopicList = (props: TPageParams) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList>(null);
  const [pageTitle, setPageTitle] = useState<string>('');
  const [filterFavourite, setFilterFavourite] = useState<boolean>(false);
  const {title, head, data, isEnd, pageConfig, setData, nextPage, filterFavouriteData} = usePageData(props.addParams);
  const favTopicHandler = useFavNotification(setData);
  const {trackParams, setTrackParams} = useTrackParams(props.saParams);
  const nativeTag = (flatListRef.current as any)?._nativeTag;

  const filterFavouriteTopic = useCallback(
    async (selected: boolean) => {
      LoadingFn.show({mask: false});

      setFilterFavourite(selected);
      flatListRef.current?.scrollToOffset({
        offset: 0,
      });
      filterFavouriteData(selected ? 1 : 0);
    },
    [filterFavouriteData],
  );

  useEffect(() => {
    setPageTitle(title);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const remove = loginEventListener(params => {
      console.log('登陆状态发生变化：', params);
      // TODO
    });

    return () => remove();
  }, []);

  useEffect(() => {
    const triggerPage = getPageName(EPageType.ACKCommonSecondListPageTypeModuleList);
    const pageSource = pageConfig.current?.page_source;

    if (!pageSource) {
      return;
    }

    RTNGaeaEventTrack?.sensorTrack?.('SecondVisitPage', {
      TriggerPage: trackParams.current.TriggerPage,
      ClkItemType: pageSource,
      TabName: title,
      PageType: triggerPage,
    });

    setTrackParams({
      ...trackParams.current,
      ClkItemType: pageSource,
      TriggerPage: triggerPage,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageConfig.current?.page_source]);

  return (
    <Container>
      {data.length > 0 || isEnd ? (
        <AnimatedFlatList
          ref={flatListRef}
          data={data}
          ListFooterComponent={
            <SafeAreaView edges={['bottom']}>
              <Loading loading={!isEnd} end={isEnd} text={data.length && isEnd ? '木有了，不要再拉啦～' : ''} />
            </SafeAreaView>
          }
          ListEmptyComponent={<EmptyView />}
          ListHeaderComponent={<Header head={head} title={pageTitle} isFilterFav={filterFavourite} onChange={filterFavouriteTopic} />}
          renderItem={({item, index}) => {
            return (
              <MemoizedTopicItem
                key={index}
                idx={index}
                item={item}
                config={pageConfig}
                track={trackParams}
                onUpdate={status =>
                  favTopicHandler(
                    Platform.OS === 'android'
                      ? {
                          topicId: item.id,
                          fav: status,
                          trackPage: getPageName(EPageType.ACKCommonSecondListPageTypeModuleList),
                        }
                      : {topicID: item.id},
                    nativeTag,
                  )
                }
              />
            );
          }}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          onEndReachedThreshold={0.5}
          getItemLayout={(_data, index) => ({
            length: 157,
            offset: 157 * index,
            index,
          })}
          onEndReached={() => nextPage()}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    y: opacity,
                  },
                },
              },
            ],
            {
              useNativeDriver: true,
            },
          )}
        />
      ) : null}
      <TopicListStickyContainer
        style={{
          opacity: opacity.interpolate({
            inputRange: [0, 20, 120],
            outputRange: [0, 0, 1],
            extrapolate: 'clamp',
          }),
        }}>
        <SafeAreaView edges={['top']}>
          <Toolbar title={pageTitle} />
        </SafeAreaView>
        <TopicListStickyContainerDesc>
          <ToolsRow theme="gray" total={head?.total} selected={filterFavourite} onChange={filterFavouriteTopic} />
        </TopicListStickyContainerDesc>
      </TopicListStickyContainer>
    </Container>
  );
};

export default TopicList;
