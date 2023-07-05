import {BaseResponse} from '@gaea-web/shared';
export type TBlacklistManager = {};

export interface UserBlackListData {
  since: number;
  blacklist: User[];
}

export interface User {
  intro: string;
  pub_feed: number;
  nickname: string;
  reg_type: string;
  grade: number;
  id: number;
  avatar_url_jpg: string;
  avatar_url: string;
  headCharm: HeadCharm;
  user_role_mark: number;
}

export interface HeadCharm {
  id: number;
  url: string;
}

export interface UserBlackListResponce extends BaseResponse<UserBlackListData> {
  data: UserBlackListData;
}
