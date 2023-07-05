import {useCallback, useRef, useState} from 'react';
import {useMount, useRequest} from '@gaea-web/shared';

export interface SecondaryBookListContentTextModel {
  right_bottom: string;
}

export interface SecondaryBookListTopicModel {
  id: number;
  title: string;
  vertical_image_url: string;
  text: SecondaryBookListContentTextModel;
  action_protocol: SecondaryBookListActionProtocol;
}

export interface SecondaryBookListActionProtocol {
  type: number;
  target_web_url: string;
  target_id: number;
}

export interface SecondaryBookListModel {
  id: number;
  title: string;
  sub_title: string;
  topics: SecondaryBookListTopicModel[];
  action_protocol: SecondaryBookListActionProtocol;
}

export interface SecondaryBookListPageModel {
  since: number;
  books: SecondaryBookListModel[];
}

export const useData = () => {
  const controller = useRef(new AbortController());
  const httpFetch = useRequest();
  const [resultData, setResultData] = useState<SecondaryBookListModel[]>([]);
  const [refreshStatus, setRefreshStatus] = useState(false);
  const [sinceStatus, setSinceStatus] = useState(0);
  const [isEnd, setIsEnd] = useState(false);
  const refresh = useCallback(async () => {
    setRefreshStatus(true);
    setSinceStatus(0);
    try {
      const data = await httpFetch<SecondaryBookListPageModel>('/v2/topic/rec_book/second_page', 'get', {
        params: {since: 0, limit: 20},
        signal: controller.current.signal,
      });
      setSinceStatus(data?.data.since ?? -1);
      setResultData(data?.data.books ?? []);
      if ((data?.data.since ?? -1) <= 0) {
        console.log('refresh:' + data?.data.since);
        setIsEnd(true);
      } else {
        console.log('refresh:' + data?.data.since);
        setIsEnd(false);
      }
    } catch (error) {
      console.log(error);
    }
    setRefreshStatus(false);
  }, [httpFetch]);

  const loadNextPage = useCallback(async () => {
    const data = await httpFetch<SecondaryBookListPageModel>('/v2/topic/rec_book/second_page', 'get', {
      params: {since: sinceStatus, limit: 20},
    });
    try {
      let combinedData = resultData.concat(data?.data.books ?? []);
      setSinceStatus(data?.data.since ?? -1);
      setResultData(combinedData);
      if ((data?.data.since ?? -1) <= 0) {
        console.log('loadNextPage:' + data?.data.since);
        setIsEnd(true);
      } else {
        console.log('loadNextPage:' + data?.data.since);
        setIsEnd(false);
      }
    } catch (error) {
      console.log(error);
    }
  }, [httpFetch, resultData, sinceStatus]);

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
    refresh,
    loadNextPage,
    isEnd,
  };
};
