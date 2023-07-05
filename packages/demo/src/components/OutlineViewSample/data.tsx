export interface FindMyWaitCouponFinishLabelModel {
  icon: string;
  width: number;
  height: number;
  position: number;
}

export interface FindMyWaitCouponFinishItemModel {
  id: number;
  title: string;
  subtitle: string;
  continue_read_comic_title: string;
  cover_image: string;
  labels: [FindMyWaitCouponFinishLabelModel];
}

export interface FindMyWaitCouponFinishModel {
  title: string;
  list: [FindMyWaitCouponFinishItemModel];
}

export interface FindMyWaitCouponWaitingItemModel {
  id: number;
  title: string;
  wait_progress: number;
  cover_image: string;
}

export interface FindMyWaitCouponWaitingModel {
  title: string;
  speedup_available: boolean;
  list: [FindMyWaitCouponWaitingItemModel];
}

export interface FindMyWaitCouponSecondaryModel {
  waiting_list: [FindMyWaitCouponWaitingModel];
  finish_list: [FindMyWaitCouponFinishModel];
}

export interface FindMyWaitCouponSecondaryResponse {
  code: number;
  message: string;
  data: FindMyWaitCouponSecondaryModel;
}
