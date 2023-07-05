export enum VoucheRedPacketType {
  canUse = 1, // 可使用
  canNotUse = 2, // 不可使用
  expire = 3, // 过期
}

export interface VoucherRedPacketCommonDiscountRule {
  sum_count: number;
  usable_count: number;
  discount: number;
  type: VoucheRedPacketType;
}

export interface VoucherRedPacketLatestDiscountRule {
  latest_count: number;
  discount: number;
}

export interface VoucheRedPacketInfoModel {
  type: VoucheRedPacketType;
  topic_id: number;
  topic_title: string;
  cover_image_url: string;
  total: number;
  consumed: number;
  expire_at: number;
  next_discount: string;
  lasted_discount_rule: VoucherRedPacketLatestDiscountRule;
  common_discount_rules: VoucherRedPacketCommonDiscountRule[];
  expire_at_string: string;
  index: number;
}

export interface VoucheRedPacketListModel {
  since: number;
  red_packets: VoucheRedPacketInfoModel[];
}

// 本地自定义模型
export interface VoucheClientDataSourceModel {
  canUseVouchers: VoucherClientSectionModel;
  cannotUseVouchers: VoucherClientSectionModel;
  expireVouchers: VoucherClientSectionModel;
  isEmpty: boolean;
}

export interface VoucherClientSectionModel {
  sectionTitle: string;
  type: VoucheRedPacketType;
  data: VoucheRedPacketInfoModel[];
}
