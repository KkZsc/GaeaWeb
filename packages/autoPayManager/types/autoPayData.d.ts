import {BaseResponse} from '@gaea-web/shared';

/*User*/
export interface User {
  pub_feed: number;
  nickname: string;
  reg_type: string;
  grade: number;
  id: number;
  avatar_url_jpg: string;
  avatar_url: string;
}

/*Special_offer*/
export interface Special_offer {}

/*Topics*/
export interface Topic {
  cover_image_url: string;
  description: string;
  male_vertical_image_url: string;
  title: string;
  update_status: string;
  update_day: string;
  updated_at: number;
  vertical_image_url: string;
  label_id: number;
  id: number;
  user: User;
  discover_image_url: string;
  comics_count: number;
  special_offer?: Special_offer | null;
  purchased_comic_count: number;
  created_at: number;
  order: number;
  male_cover_image_url: string;
  purchased_comic_info: string;
}

/*Data*/
export interface TopicData {
  since: number;
  topics: Topic[];
}

export interface AutoPayResponse extends BaseResponse<TopicData> {}
