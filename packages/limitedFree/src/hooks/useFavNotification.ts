import {useCallback, useEffect} from 'react';
import {CollectTrackModel, FAV_NOTIFICATION_NAME, FavPlatformModel, GANotification} from '@gaea-web/shared';
import RTNGaeaBusiness from 'rtn-gaea-business/js/NativeGaeaBusiness';
import {Platform} from 'react-native';
import {AndroidFavResultModel, Topics} from 'packages/limitedFree/types';

export const useFavNotification = (updateTopics: React.Dispatch<React.SetStateAction<Topics | null>>) => {
  useEffect(() => {
    const favoriteCallback = (params: string) => {
      let isFav: boolean;
      let ids: number[] | undefined;
      if (Platform.OS === 'android') {
        const {fav, idSet} = JSON.parse(params);
        isFav = fav;
        ids = idSet;
      } else {
        const notificationParams = JSON.parse(params);
        const userInfo = notificationParams.userInfo;
        isFav = userInfo.ACKComicAlbumCollectedStateUpdateNotificationIsCollectedKey;
        ids = [userInfo.ACKComicAlbumCollectedStateUpdateNotificationAlbumIdKey];
      }

      updateTopics(oldData => {
        let allFav = oldData?.batch_favourite?.favourite ?? false;
        if (ids && ids.length > 0) {
          const tempTopicList = oldData?.topic_list ? [...oldData.topic_list] : [];
          ids.forEach(id => {
            tempTopicList.map(item => {
              if (item.id === id) {
                item.is_favourite = isFav;
              }
              return item;
            });
          });
          allFav = tempTopicList.every(item => item.is_favourite === true);
        }

        return {
          ...oldData,
          batch_favourite: {
            ...oldData?.batch_favourite,
            favourite: allFav,
          },
          topic_list: oldData?.topic_list?.map(item => {
            return {
              ...item,
              is_favourite: ids?.includes(item.id) ? isFav : item.is_favourite,
            };
          }),
        };
      });
    };
    const remove = GANotification.addEventListener(FAV_NOTIFICATION_NAME, favoriteCallback);
    return () => remove();
  }, [updateTopics]);

  const postFavHandler = useCallback(
    async (
      params: FavPlatformModel,
      nativeTag: number,
      favTrackParams?: {
        TopicID?: number;
        TopicName?: string;
        TriggerPage?: string;
      },
    ) => {
      const result = await RTNGaeaBusiness?.doFav(params, nativeTag ?? 0);
      if (Platform.OS === 'android' && result) {
        const {isFav} = result as AndroidFavResultModel;
        const trackFavModel: CollectTrackModel = {
          ...favTrackParams,
        };
        if (isFav !== undefined) {
          RTNGaeaBusiness?.trackFavorite(isFav, trackFavModel);
        }
      }
    },
    [],
  );

  return {
    postFavHandler,
  };
};
