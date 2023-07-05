import {useRequest} from '@gaea-web/shared';
import {LimitedFreeRequestInfo, LimitedFreeModel, NetStatus, TLimitedFree, Topics} from '../../types';
import {useCallback, useEffect, useRef, useState} from 'react';
import {NativeEventEmitter, NativeModules} from 'react-native';

const {GAViewEventEmitter} = NativeModules;
const viewDidAppearEmitter = new NativeEventEmitter(GAViewEventEmitter);

const initPageRequest = (initParams: TLimitedFree): LimitedFreeRequestInfo => {
  return {
    url: '/v1/ironman/discovery_v2/time_free/more',
    params: {
      module_id: initParams.module_id,
      tab_id: initParams.tab_id,
      last_time: initParams.last_time,
    },
  };
};

export const usePageData = (initParams: TLimitedFree) => {
  const httpFetch = useRequest();

  const [topics, setTopics] = useState<Topics | null>(null);
  const [netStatus, setNetStatus] = useState<NetStatus>('loading');
  const requestInfo = useRef<LimitedFreeRequestInfo>(initPageRequest(initParams)).current;
  const getPageData = useCallback(async () => {
    if (topics === null) {
      setNetStatus('loading');
    }
    try {
      const response = await httpFetch<LimitedFreeModel>(requestInfo.url, 'get', {
        params: {
          ...requestInfo.params,
        },
      });
      setNetStatus('success');
      setTopics(response?.data?.topic_list ?? null);
    } catch (error) {
      setNetStatus('error');
    }
    //todo 保存server_time
  }, [httpFetch, requestInfo, topics]);

  useEffect(() => {
    getPageData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const notifyId = initParams.notifyId;

  useEffect(() => {
    const subscription = viewDidAppearEmitter.addListener('GaeaViewDidAppear', event => {
      if (event?.notifyId === notifyId) {
        getPageData();
      }
    });
    return () => subscription.remove();
  }, [getPageData, notifyId]);

  return {
    topics,
    netStatus,
    setTopics,
  };
};
