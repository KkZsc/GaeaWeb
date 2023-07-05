import {useCallback, useEffect} from 'react';
import {FavPlatformModel, ITopicItem} from '../../types';
import {GANotification} from '@gaea-web/shared';
import RTNGaeaBusiness from 'rtn-gaea-business/js/NativeGaeaBusiness';
import RTNGaeaEventTrack from 'rtn-gaea-event-track/js/NativeGaeaEventTrack';
import {Platform} from 'react-native';

export const useFavNotification = (updateDataList: React.Dispatch<React.SetStateAction<ITopicItem[]>>) => {
  useEffect(() => {
    const favoriteCallback = (params: string) => {
      console.log('收到关注通知: ', params);
      let isFav: boolean;
      let ids: number[];
      try {
        if (Platform.OS === 'android') {
          //android event json => {ids=[4319], fav=true, from=0}
          const {fav, idSet} = JSON.parse(params);
          isFav = fav;
          ids = idSet;
        } else {
          // const {isFav, ids} = JSON.parse(params);
          // isFav = isFav;
          // ids = ids;
        }

        if (!ids.length) {
          return;
        }

        updateDataList(oldData => {
          return oldData.map(item => {
            return {
              ...item,
              is_favourite: ids.includes(item.id) ? isFav : item.is_favourite,
            };
          });
        });
      } catch (err) {
        console.log('更新关注状态失败: ', err);
      }
    };

    const eventName = Platform.OS === 'android' ? 'com.kuaikan.comic.event.FavTopicEvent' : 'FavNotification:';
    const remove = GANotification.addEventListener(eventName, favoriteCallback);

    return () => remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const favTopicHandler = useCallback(async (params: FavPlatformModel, nativeTag: number) => {
    console.log('favTopicHandler', params, nativeTag);
    RTNGaeaEventTrack?.sensorTrack('ClickButton', {
      ButtonName: '关注',
      TriggerPage: 'ListPage',
    });
    const result = await RTNGaeaBusiness?.doFav(params, nativeTag ?? 0);
    //android result json => {"isAnonymous":false,"isFav":true}
    console.log('favTopicHandler result', result);
  }, []);

  return favTopicHandler;
};
