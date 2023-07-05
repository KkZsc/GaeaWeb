import {useCallback, useRef, useState} from 'react';
import {useMount, useRequest, useEnv} from '@gaea-web/shared';
import {AutoPayResponse, Topic, TopicData} from '../../../types/autoPayData';
import {basePayUrl} from '@gaea-web/shared/src/baseUrlConst';
import {DEFAULT_STRING_VALUE} from '@gaea-web/shared/src/trackConstant';
import RTNGaeaEventTrack from 'rtn-gaea-event-track/js/NativeGaeaEventTrack';

const PAGE_COUNT = 20;

export const useData = (delayCancleDialog: () => void) => {
  const controller = useRef(new AbortController());

  const httpFetch = useRequest();

  const [resultData, setResultData] = useState<Topic[]>([]);
  const [refreshStatus, setRefreshStatus] = useState(false);
  const [sinceStatus, setSinceStatus] = useState(0);
  const [isEnd, setIsEnd] = useState(false);
  const {env} = useEnv();
  const autoPaymanagerPath = basePayUrl(env) + '/v2/comicbuy/auto_pay/list';
  const cancelAutoPayPath = basePayUrl(env) + '/v2/comicbuy/auto_pay';

  const payResponseResult = useCallback(
    (response: AutoPayResponse) => {
      try {
        let topicListData = resultData.concat(response.data.topics ?? []);
        console.log(response.data.topics);
        console.log('start since :' + sinceStatus);
        console.log('response since :' + response?.data.since);
        setSinceStatus(response?.data.since ?? -1);
        setResultData(topicListData);
        if ((response?.data.since ?? -1) <= 0) {
          setIsEnd(true);
        } else {
          setIsEnd(false);
        }
      } catch (error) {
        console.log(error);
      }
    },
    [sinceStatus, resultData, setIsEnd],
  );

  const refresh = useCallback(async () => {
    setRefreshStatus(true);
    setSinceStatus(0);
    console.log(autoPaymanagerPath);
    try {
      let response = await httpFetch<TopicData>(autoPaymanagerPath, 'get', {
        params: {since: sinceStatus, limit: PAGE_COUNT},
        signal: controller.current.signal,
      });
      payResponseResult(response);
    } catch (error) {
      console.log(error);
    }
    setRefreshStatus(false);
  }, [httpFetch, sinceStatus, autoPaymanagerPath, payResponseResult]);

  const loadNextPage = useCallback(async () => {
    try {
      const response = await httpFetch<TopicData>(autoPaymanagerPath, 'get', {
        params: {since: sinceStatus, limit: PAGE_COUNT},
      });
      payResponseResult(response);
    } catch (error) {
      console.log(error);
    }
  }, [httpFetch, sinceStatus, payResponseResult, autoPaymanagerPath]);

  //取消自动购买埋点
  const trackCancelAutoPay = useCallback((topicName?: string | null) => {
    RTNGaeaEventTrack?.sensorTrack('CancelAutoPay', {
      TopicName: topicName ?? DEFAULT_STRING_VALUE,
      TriggerPage: 'AutoPayPage',
    });
  }, []);

  const useCancelAutoPay = useCallback(
    async (topicId: number, topicName: string) => {
      try {
        await httpFetch(cancelAutoPayPath, 'get', {
          params: {topic_id: topicId},
          signal: controller.current.signal,
        });

        let afterDeleteData = resultData.filter(element => {
          element.id !== topicId;
        });
        trackCancelAutoPay(topicName);
        setResultData(afterDeleteData);
        delayCancleDialog;
      } catch (error) {
        console.log(error);
      }
    },
    [httpFetch, resultData, cancelAutoPayPath, trackCancelAutoPay, delayCancleDialog],
  );

  useMount(
    () => {
      refresh();
    },
    () => {
      controller.current.abort();
    },
  );

  return {
    resultData,
    refreshStatus,
    refresh,
    loadNextPage,
    isEnd,
    useCancelAutoPay,
  };
};
