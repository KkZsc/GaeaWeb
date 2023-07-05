export enum NoticeType {
  NoticeEnable = 1,
  NoticeDisable = 0,
  Loading = 2,
}

export interface WaitFreeNoticeResponseData {
  wait_free_notice: number;
}
