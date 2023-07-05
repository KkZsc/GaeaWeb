import {Platform} from 'react-native';
import {CollectTrackModel} from './trackModels';

export type AndroidFavModel = {
  fav: boolean;
  topicId?: number;
  loginTitle?: string;
  trackPage?: string;
  source?: number;
  showFavText?: boolean;
  isOutSite?: boolean;
  activity?: string;
  topicIdList?: number[];
  manualDealResult?: boolean;
  isAppointmentFav?: boolean;
  isFavAward?: boolean;
  mComicUpdateStatus?: number;
  showConfirmDialog?: boolean;
  confirmDialogTitle?: string;
};

export type IOSFavModel = {
  topicID?: number;
  topicIdList?: number[];
  isFav: boolean;
  trackModel?: CollectTrackModel;
};

export type FavPlatformModel = AndroidFavModel | IOSFavModel;

export const FAV_NOTIFICATION_NAME =
  Platform.OS === 'android' ? 'com.kuaikan.comic.event.FavTopicEvent' : 'ACKComicAlbumCollectedStateUpdateNotification';
