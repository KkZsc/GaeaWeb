export enum EPageType {
  ACKCommonSecondListPageTypeModuleList = 0,
  ACKCommonSecondListPageTypeRankList = 1,
  ACKCommonSecondListPageTypeRankHotList = 2,
  ACKCommonSecondListPageTypeOperationNormal = 3,
  ACKCommonSecondListPageTypeOperationAward = 4,
  ACKCommonSecondListPageTypeOperationHot = 5,
  ACKCommonSecondListPageTypeBrandTopicList = 6,
  ACKCommonSecondListPageTypeComicVideoModule = 7,
  ACKCommonSecondListPageTypeComicVideosubscribe = 8,
}

export const getPageName = (pageType: EPageType): string | undefined => {
  switch (pageType) {
    case EPageType.ACKCommonSecondListPageTypeModuleList:
      return 'AllList_Normal';
    case EPageType.ACKCommonSecondListPageTypeRankList:
    case EPageType.ACKCommonSecondListPageTypeRankHotList:
      return 'AllList_Rank';
    case EPageType.ACKCommonSecondListPageTypeOperationNormal:
      return 'AllList_OperationNormal';
    case EPageType.ACKCommonSecondListPageTypeOperationAward:
      return 'AllList_OperationAward';
    case EPageType.ACKCommonSecondListPageTypeOperationHot:
      return 'AllList_OperationHot';
    case EPageType.ACKCommonSecondListPageTypeBrandTopicList:
      return 'AllList_Compilation';
    case EPageType.ACKCommonSecondListPageTypeComicVideoModule:
      return '6ModuleListPage';
    case EPageType.ACKCommonSecondListPageTypeComicVideosubscribe:
      return 'ChaseComicVideoPage';
    default:
      return undefined;
  }
};
