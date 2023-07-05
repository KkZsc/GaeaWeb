import {FindBannerShowType, ImageType} from './const';
import {FindInfoLabelDetailModel} from './findInfoLabelDetail';

interface FindfavouriteDetail {} // 使用实际接口替换
interface FindInfoButtonModel {} // 使用实际接口替换
interface FindInfoBannerIconListModel {} // 使用实际接口替换
interface CommonActionModel {} // 使用实际接口替换
interface UserModel {} // 使用实际接口替换
interface HomePersonalizedRecommendReasonModel {} // 使用实际接口替换
interface InteractiveBarModel {} // 使用实际接口替换
interface VoteModel {} // 使用实际接口替换
interface RecReportDataModel {} // 使用实际接口替换
interface FindInfoCouponModel {} // 使用实际接口替换
interface FindInfoAppointmentDetailModel {} // 使用实际接口替换
interface FindLikeDetailModel {} // 使用实际接口替换
interface FindCommentDetailModel {} // 使用实际接口替换
interface ComicBadgeModel {} // 使用实际接口替换
interface FindInfoSubtitleModel {} // 使用实际接口替换
interface FindInfoCheckinDetail {} // 使用实际接口替换
interface FindInfoVIPUserInfo {} // 使用实际接口替换

export interface FindInfoBannerModel {
  moduleType: number;
  bannerID: number;
  title?: string;
  imageURL?: string;
  subTitle?: string;
  aspect?: number;
  imageHeight?: number;
  imageWidth?: number;
  imageMainColor?: string;
  dynamicImage?: string;
  dynamicImageType?: ImageType;
  lastImage?: string;
  dynamicUrl?: string;
  dynamicUrlType?: ImageType;
  favouriteDetail?: FindfavouriteDetail;
  rightSlipButtonModel?: FindInfoButtonModel;
  refreshTab?: boolean;
  bgroundColor?: string;
  fontColor?: string;
  text?: string;
  descriptionContent?: string;
  iconList?: FindInfoBannerIconListModel[];
  buttonList?: FindInfoButtonModel[];
  bottomButtonList?: FindInfoButtonModel[];
  topButtonModel?: FindInfoButtonModel;
  acitonType?: CommonActionModel;
  labelDetail?: FindInfoLabelDetailModel;
  childListColumn?: number;
  childList?: FindInfoBannerModel[];
  isExposure?: boolean;
  unreadComicIds?: any[];
  subtitleType?: number;
  isAlreadyReportServer?: boolean;
  userModel?: UserModel;
  recommendReasonList?: HomePersonalizedRecommendReasonModel[];
  interactiveBars?: InteractiveBarModel[];
  vote?: VoteModel;
  selected?: boolean;
  recReportModel?: RecReportDataModel;
  recDataReportMap?: any;
  recDataReportMapString?: string;
  dispatchType?: number;
  recBy?: string;
  distributeType?: string;
  playTime?: number;
  latestComicId?: number;
  bannerShowType?: FindBannerShowType;
  coupon?: FindInfoCouponModel;
  targetSourceModuleTitle?: string;
  appointmentDetail?: FindInfoAppointmentDetailModel;
  countdown?: number;
  countdownPercentage?: number;
  localCountDown?: number;
  likeDetailModel?: FindLikeDetailModel;
  commentDetailModel?: FindCommentDetailModel;
  isComicVideo?: boolean;
  isMute?: boolean;
  badgeModelArr?: ComicBadgeModel[];
  subtitleDetail?: FindInfoSubtitleModel;
  updateTopicCount?: number;
  newTopicCount?: number;
  weekNewTopicCount?: number;
  checkinDetail?: FindInfoCheckinDetail;
  vipUser?: FindInfoVIPUserInfo;
  imageUrlSuffix?: string;
  checkedImage?: string;
  clkItemTypeString?: string;
  contentIDString?: string;
  relatedContentIDString?: string;
}
