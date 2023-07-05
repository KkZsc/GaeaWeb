export enum FindLabelDetailPosition {
  Unknown = 0,
  LeftTop = 1,
  LeftBottom = 2,
  RightTop = 3,
  RightBottom = 4,
  PreTitle = 5,
}

export enum FindInfoLeftTopLabelType {
  NoSpacing = 0,
  ComicVideo = 1,
  QuickUpdate = 2,
}

export enum FindInfoLabelShowType {
  Unknow = 0,
  Follow = 1,
  Comment = 2,
  Hot = 3,
  Data = 4,
  Vote = 5,
  Category = 6,
  ComicVideoUpdate = 7,
  ComicVideo = 8,
  AppointNumber = 9,
  MoreUpdate = 10,
}

export interface FindInfoLabelDetailLabelListModel {
  text?: string;
  position: FindLabelDetailPosition;
  colorType: number;
  isLabelsInsideValue: boolean;
  icon?: string;
  backgroundColor?: string;
  fontColor?: string;
  recommendLabelId?: string;
  showType: number;
  width: number;
  height: number;
}

interface FindInfoSubTitleLineModel {} // 使用实际接口替换
interface FindInfoStrategyRecommendModel {} // 使用实际接口替换

export interface FindInfoLabelDetailModel {
  labels?: FindInfoLabelDetailLabelListModel[];
  topText: string;
  leftTopIcon: string;
  leftTopBackgroundColor: string;
  leftTopFontColor: string;
  leftTopType: FindInfoLeftTopLabelType;
  leftTopText: string;
  leftTopLabelModel: FindInfoLabelDetailLabelListModel;

  rightTopText: string;
  rightTopIcon: string;
  rightTopFontColor: string;
  rightTopBackgroundColor: string;
  rightTopBigIcon: string;
  rightTopLabelModel: FindInfoLabelDetailLabelListModel;

  leftBottomText: string;
  leftBottomFontColor: string;
  labelBottomBackgroundColor: string;
  leftBottomLabelModel: FindInfoLabelDetailLabelListModel;

  rightBottomText: string;
  rightBottomLabelModel: FindInfoLabelDetailLabelListModel;

  strategyRecommendation: string;
  subTitleLine: FindInfoSubTitleLineModel[];
  strategyRecommend: FindInfoStrategyRecommendModel;

  text: string;
  backgroundColor: string;
  fontColor: string;
  borderColor: string;
  leftBottomType: FindInfoLabelShowType;
  leftTopBigIcon: string;

  showLeftTopCouponView(): boolean;
}
