/**
 * 关注/取关的埋点model
 */
export interface CollectTrackModel {
  TriggerPage?: string;
  TopicID?: number;
  TopicName?: string;
  ComicID?: number;
  ComicName?: string;
  AuthorID?: number;
  NickName?: string;
  FavNumber?: number;
  Category?: string;
  ClkItemType?: string;
  IsPaidComic?: boolean;
  SourceModule?: string;
  SourceModuleTitle?: string;
  RankingName?: string;
  SlgorithmSource?: string;
  IsLight?: boolean;
  SearchKeyword?: string;
  Follow?: string;
  TabModuleType?: string;
  CurModule?: string;
  DispatchType?: number;
  DistributeType?: string;
  RecId?: string;
  RecTargetID?: string;
  RecMap?: string;
  IsFavAward?: boolean;
}
