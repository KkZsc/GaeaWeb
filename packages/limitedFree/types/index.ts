export type NetStatus = 'loading' | 'success' | 'error';

export type TLimitedFree = {
  module_id: number;
  tab_id: number;
  last_time: number;
  tabName: string;
  notifyId: number;
};

export type PayingInfo = {
  icon?: string;
  width?: number;
  height?: number;
  countdown?: number;
  text?: string;
};

export type Label = {
  position?: number;
  icon?: string;
  width?: number;
  height?: number;
};

export type BatchFavourite = {
  favourite?: boolean;
};

export type RecommendReason = {
  title?: string;
  type?: number;
  icon?: string;
  background_color?: string;
  action_type?: {};
};

export type FreeTopic = {
  id: number;
  title?: string;
  vertical_image_url?: string;
  is_favourite?: boolean;
  favourite_count?: number;
  description?: string;
  labels?: Label[];
  recommend_reason_list?: RecommendReason[];
};

export type Topics = {
  paying_info?: PayingInfo;
  batch_favourite?: BatchFavourite;
  topic_list?: FreeTopic[];
};

export type LimitedFreeModel = {
  head_image?: string;
  server_time?: number;
  topic_list?: Topics;
};

export type LimitedFreeRequestInfo = {
  url: string;
  params: {
    module_id: number;
    tab_id: number;
    last_time: number;
  };
};

export type AndroidFavResultModel = {
  isAnonymous?: boolean;
  isFav?: boolean;
};
