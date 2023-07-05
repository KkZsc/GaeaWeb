export interface ICouponInfo {
  height: number;
  width: number;
  icon: string;
}

export interface ITopicListHead {
  image: string;
  text_mask: string;
  total: string;
  rank?: IRankInfo;
}

/**
 * 4 右下
 */
export type TLabelPosition = 4;

export interface ILable {
  background_color: string;
  font_color: string;
  height: number;
  position: TLabelPosition;
  text: string;
  width: number;
}

export interface ITopicItemRecommendItemAction {
  target_title: string;
  target_web_url: string;
  type: number;
}

export enum ETopicRecommendLabelReasonType {
  ACKRecommendReasonTypeLabel = 0, // 推荐标签
  ACKRecommendReasonTypeCatergory = 1, // 分类
}

export interface ITopicItemRecommendReason {
  title: string;
  background_color: string;
  icon_type: number;
  action_type: ITopicItemRecommendItemAction;
  behind_icon: string;
  more_page_title: string;
  text_mask: string;
  dispatch_reason_type: number;
  reason_type: ETopicRecommendLabelReasonType;
  show_type: number;
}

export interface IAppointmentDetail {
  appointment: boolean;
  business_type: number;
  disable: boolean;
  topic_id: number;
  type: number;
}

export interface ITopicItem {
  id: number;
  title: string;
  vertical_image_url: string;
  likes_count: number;
  favourite_count: number;
  is_favourite: boolean;
  description: string;
  recommend_text: string;
  recommend_reason_list: ITopicItemRecommendReason[];
  coupon?: ICouponInfo;
  label_detail?: {
    labels?: ILable[];
  };
  appointment_detail?: IAppointmentDetail;
  comic_update_text?: string;
  male_vertical_image_url: string;
  dispatch_type: number;
  rec_by?: string;
  rec_data_report_map: {
    [key: string]: any;
  };
  // 手动添加的字段
  rec_id?: string;
  hidden_favourite_count?: boolean;
}

export interface IRankItem {
  id: number;
  title: string;
  cover_image_url: string;
  coupon?: ICouponInfo;
}

export interface IRankInfo {
  title: string;
  more_action: {
    target_web_url: string;
    target_title: string;
    type: number;
  };
  topics: IRankItem[];
}

export interface ITopicList {
  head: ITopicListHead;
  rank?: IRankInfo;
  topics: ITopicItem[];
  show_appointment: boolean;
  hidden_favourite_count: boolean;
  topic_click_action_type: string;
  page_source: number;
  since: number;
  rec_id?: string;
}

export interface IPageConfig {
  page_source: string;
  show_appointment: boolean;
  hidden_favourite_count: boolean;
  topic_click_action_type: string;
}

export type TPageConstants = IPageConfig & {saParams: TSaParams};

export type TModulePage = {
  targetIndex: number;
  TriggerPage: string;
  module_id: number;
  module_type: number;
  title: string;
  ClkItemType?: string;
  hit_param: {
    recommend_type: string;
    recommend_id: string;
    tab_id: number;
  };
};

export type TLabelPage = {
  title: string;
};

export type TActionPathPage = {
  actionPath: string;
};

export type TAddParams = TModulePage | TLabelPage | TActionPathPage;

export type TSaParams = {
  [key: string]: any;
};

export type TPageParams = {
  addParams: TModulePage | TLabelPage | TActionPathPage;
  saParams: TSaParams;
};

export type PageRequestInfo = {
  url: string;
  title: string;
  params: {
    limit: number;
    since: number;
    gender: 0 | 1;
    filter_favourite: 0 | 1;
    [key: string]: string | number;
  };
};
