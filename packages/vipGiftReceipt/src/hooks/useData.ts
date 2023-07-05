import {useMount, useRequest, useEnv} from '@gaea-web/shared';
import {useCallback, useRef, useState} from 'react';
import {basePayUrl} from '@gaea-web/shared/src/baseUrlConst';

export interface VipGiftReceiptModel {
  big_bag_title: string;
  assigned_title: string;
  receive_time: number;
  received_time_str: string;
  topic_title: string;
}

export interface VipGiftReceiptListModel {
  next_since: number;
  gift_bag_view_list: VipGiftReceiptModel[];
}

interface VipGiftReceiptModelResponse {
  code: number;
  message: string;
  data: VipGiftReceiptListModel;
}

const twoDigitFormat = (value: number): string => {
  return value.toString().padStart(2, '0');
};

const receiveTimeStr = (receiveTime: number): string => {
  const date = new Date(receiveTime);
  const year: number = date.getFullYear();
  const month: number = date.getMonth() + 1;
  const day: number = date.getDate();
  const hour: number = date.getHours();
  const minute: number = date.getMinutes();

  const formattedDate: string = `${year}-${twoDigitFormat(month)}-${twoDigitFormat(day)} ${twoDigitFormat(hour)}:${twoDigitFormat(minute)}`;
  return formattedDate;
};

export const useData = () => {
  const controller = useRef(new AbortController());
  const httpFetch = useRequest<VipGiftReceiptModelResponse>(false);
  const [resultData, setResultData] = useState<VipGiftReceiptModel[]>([]);
  const [refreshStatus, setRefreshStatus] = useState(false);
  const [hasLoadedStatus, setHasLoadedStatus] = useState(false);
  const [isNetworkError, setIsNetworkError] = useState(false);
  const [sinceStatus, setSinceStatus] = useState(0);
  const [isEnd, setIsEnd] = useState(false);
  const {env} = useEnv();
  const recordUrl = basePayUrl(env) + '/v1/vip/gift/record_list';
  const refresh = useCallback(async () => {
    setRefreshStatus(true);
    setSinceStatus(0);
    try {
      const data = await httpFetch(recordUrl, 'get', {
        params: {since: 0, limit: 20},
        signal: controller.current.signal,
      }).then(response => {
        response.data.gift_bag_view_list.map(item => {
          item.received_time_str = receiveTimeStr(item.receive_time);
        });
        return response;
      });
      setSinceStatus(data?.data.next_since ?? -1);
      setResultData(data?.data.gift_bag_view_list ?? []);
      if ((data?.data.next_since ?? -1) <= 0) {
        console.log('refresh:' + data?.data.next_since);
        setIsEnd(true);
      } else {
        console.log('refresh:' + data?.data.next_since);
        setIsEnd(false);
      }
      setIsNetworkError(false);
    } catch (error) {
      console.log(error);
      setIsNetworkError(true);
    }
    setRefreshStatus(false);
    setHasLoadedStatus(true);
  }, [httpFetch, recordUrl]);

  const loadNextPage = useCallback(async () => {
    const data = await httpFetch(recordUrl, 'get', {
      params: {since: sinceStatus, limit: 20},
      signal: controller.current.signal,
    }).then(response => {
      response.data.gift_bag_view_list.map(item => {
        item.received_time_str = receiveTimeStr(item.receive_time);
      });
      return response;
    });
    try {
      let combinedData = resultData.concat(data?.data.gift_bag_view_list ?? []);
      setSinceStatus(data?.data.next_since ?? -1);
      setResultData(combinedData);
      if ((data?.data.next_since ?? -1) <= 0) {
        console.log('loadNextPage:' + data?.data.next_since);
        setIsEnd(true);
      } else {
        console.log('loadNextPage:' + data?.data.next_since);
        setIsEnd(false);
      }
      setIsNetworkError(false);
    } catch (error) {
      console.log(error);
      setIsNetworkError(true);
    }
  }, [httpFetch, resultData, sinceStatus, recordUrl]);

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
    loadNextPage,
    isEnd,
  };
};
