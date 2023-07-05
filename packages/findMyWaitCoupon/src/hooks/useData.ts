import {useCallback, useRef, useState} from 'react';
import {useMount, useRequest} from '@gaea-web/shared';

export interface FindMyWaitCouponFinishLabelModel {
  icon: string;
  width: number;
  height: number;
  position: number;
}

export interface FindMyWaitCouponFinishItemModel {
  id: number;
  title: string;
  subtitle: string;
  continue_read_comic_title: string;
  cover_image: string;
  labels: FindMyWaitCouponFinishLabelModel[];
}

export interface FindMyWaitCouponFinishModel {
  title: string;
  list: FindMyWaitCouponFinishItemModel[];
}

export interface FindMyWaitCouponWaitingItemModel {
  id: number;
  title: string;
  wait_progress: number;
  cover_image: string;
}

export interface FindMyWaitCouponWaitingModel {
  title: string;
  speedup_available: boolean;
  list: [FindMyWaitCouponWaitingItemModel];
}

export interface FindMyWaitCouponSecondaryModel {
  waiting_list: FindMyWaitCouponWaitingModel | null;
  finish_list: FindMyWaitCouponFinishModel | null;
}

export enum FindMyWaitCouponSecondaryViewModelType {
  finishItem = 0,
  finishTitle = 1,
  waitingTitle = 2,
  waitingList = 3,
  noFinishListEmpty = 4, //无已完成列表占位
}

export interface FindMyWaitCouponSecondaryViewModel {
  type: FindMyWaitCouponSecondaryViewModelType;
}

export interface FindMyWaitCouponSecondaryFinishItemViewModel extends FindMyWaitCouponSecondaryViewModel {
  moduleTitle: string; //在这里赋值
  item: FindMyWaitCouponFinishItemModel;
  itemPosition: number;
}
export interface FindMyWaitCouponSecondaryFinishTitleViewModel extends FindMyWaitCouponSecondaryViewModel {
  title: string;
}
export interface FindMyWaitCouponSecondaryWaitingTitleViewModel extends FindMyWaitCouponSecondaryViewModel {
  title: string;
  canSpeedUp: boolean;
}
export interface FindMyWaitCouponSecondaryWaitingItemViewModel {
  item: FindMyWaitCouponWaitingItemModel;
  itemPosition: number;
}
export interface FindMyWaitCouponSecondaryWaitingListViewModel extends FindMyWaitCouponSecondaryViewModel {
  title: string;
  speedupAvailable: boolean;
  list: FindMyWaitCouponSecondaryWaitingItemViewModel[];
}
export interface findMyWaitCouponSecondaryNoFinishListViewModel extends FindMyWaitCouponSecondaryViewModel {}

function throttle(func: (...args: any) => {}, delay: number) {
  let lastCall = 0;
  return function (...args: any) {
    const now = new Date().getTime();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    return func(...args);
  };
}

export const useData = () => {
  const controller = useRef(new AbortController());
  const httpFetch = useRequest();
  const [resultData, setResultData] = useState<FindMyWaitCouponSecondaryViewModel[]>([]);
  const [refreshStatus, setRefreshStatus] = useState(false);
  const [hasLoadedStatus, setHasLoadedStatus] = useState(false);
  const [isNetworkError, setIsNetworkError] = useState(false);
  const refreshFunc = async () => {
    setRefreshStatus(true);
    try {
      const data = await httpFetch<FindMyWaitCouponSecondaryModel>('/v1/ironman/wait_coupon/more', 'GET', {
        params: {},
        signal: controller.current.signal,
      });

      console.log(data);

      const resultArray: FindMyWaitCouponSecondaryViewModel[] = [];
      //是否有正在等待的等免漫画
      if (data.data.waiting_list && (data.data.waiting_list?.list?.length ?? 0) > 0) {
        //增加正在等免的标题
        const waitingTitle: FindMyWaitCouponSecondaryWaitingTitleViewModel = {
          title: data.data.waiting_list.title,
          canSpeedUp: data.data.waiting_list.speedup_available,
          type: FindMyWaitCouponSecondaryViewModelType.waitingTitle,
        };
        const waitingList: FindMyWaitCouponSecondaryWaitingListViewModel = {
          title: data.data.waiting_list.title,
          speedupAvailable: data.data.waiting_list.speedup_available,
          list: data.data.waiting_list.list.map((item, index) => {
            const waitingItem: FindMyWaitCouponSecondaryWaitingItemViewModel = {
              item,
              itemPosition: index,
            };
            return waitingItem;
          }),
          type: FindMyWaitCouponSecondaryViewModelType.waitingList,
        };
        resultArray.push(waitingTitle);
        resultArray.push(waitingList);
      }

      if (data.data.finish_list && (data.data.finish_list.list?.length ?? 0) > 0) {
        //增加已经完成的标题
        const finishTitle: FindMyWaitCouponSecondaryFinishTitleViewModel = {
          title: data.data.finish_list.title,
          type: FindMyWaitCouponSecondaryViewModelType.finishTitle,
        };
        resultArray.push(finishTitle);

        //增加已经完成的列表
        if ((data.data.finish_list.list?.length ?? 0) > 0) {
          const finishList: FindMyWaitCouponSecondaryFinishItemViewModel[] = data.data.finish_list.list.map((item, index) => {
            const finishItem: FindMyWaitCouponSecondaryFinishItemViewModel = {
              moduleTitle: data.data.finish_list?.title ?? '',
              item,
              itemPosition: index,
              type: FindMyWaitCouponSecondaryViewModelType.finishItem,
            };
            return finishItem;
          });
          resultArray.push(...finishList);
        } else {
          const noFinishListViewModel: findMyWaitCouponSecondaryNoFinishListViewModel = {
            type: FindMyWaitCouponSecondaryViewModelType.noFinishListEmpty,
          };
          resultArray.push(noFinishListViewModel);
        }
      } else {
        if (data.data.waiting_list && (data.data.waiting_list?.list?.length ?? 0) > 0) {
          //如果正在等免中有数据，这里插入仅有已完成列表的占位
          const noFinishListViewModel: findMyWaitCouponSecondaryNoFinishListViewModel = {
            type: FindMyWaitCouponSecondaryViewModelType.noFinishListEmpty,
          };
          resultArray.push(noFinishListViewModel);
        }
      }
      setIsNetworkError(false);
      setResultData(resultArray);
    } catch (error) {
      //网络错误，插入一个网络错误的占位
      console.log(error);
      setIsNetworkError(true);
    }
    setRefreshStatus(false);
    setHasLoadedStatus(true);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const refresh = useCallback(throttle(refreshFunc, 800), [httpFetch]);
  const noLimitRefresh = useCallback(refreshFunc, [httpFetch]);

  const cancelRequest = () => {
    controller.current.abort();
  };

  useMount(
    () => {
      refresh();
    },
    () => {
      cancelRequest();
    },
  );

  return {
    resultData,
    refreshStatus,
    hasLoadedStatus,
    isNetworkError,
    refresh,
    noLimitRefresh,
  };
};
