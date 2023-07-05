import {useCallback, useRef, useState} from 'react';
import {useMount, useRequest, useEnv} from '@gaea-web/shared';
import {UserBlackListResponce, User, UserBlackListData} from '../../../types/index';
import {baseSocialUrl} from '@gaea-web/shared/src/baseUrlConst';

const PAGE_COUNT = 20;

export const useData = () => {
  const controller = useRef(new AbortController());
  const userBlackListRequest = useRequest();
  const removeBlackUserRequest = useRequest();

  const [resultData, setResultData] = useState<User[]>([]);
  const [refreshStatus, setRefreshStatus] = useState(false);
  const [sinceStatus, setSinceStatus] = useState(0);
  const [isEnd, setIsEnd] = useState(false);
  const [isNetworkError, setIsNetworkError] = useState(false);
  const [hasLoadedStatus, setHasLoadedStatus] = useState(false);
  const {env} = useEnv();
  const userBlackListPath = baseSocialUrl(env) + '/v1/graph/users/blacklist';
  const removeBlackUserPath = baseSocialUrl(env) + '/v1/graph/users/blacklist/';

  const userBlackListResponseResult = useCallback(
    (response: UserBlackListResponce) => {
      try {
        let userBlackList = resultData.concat(response.data.blacklist ?? []);
        console.log(response.data.blacklist);
        console.log('start since :' + sinceStatus);
        console.log('response since :' + response?.data.since);
        setSinceStatus(response?.data.since ?? -1);
        setResultData(userBlackList);
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
    console.log(userBlackListPath);
    try {
      let response = await userBlackListRequest<UserBlackListData>(userBlackListPath, 'get', {
        params: {since: sinceStatus, limit: PAGE_COUNT},
        signal: controller.current.signal,
      });
      setIsNetworkError(false);
      userBlackListResponseResult(response);
    } catch (error) {
      setIsNetworkError(true);
      console.log(error);
    }
    setRefreshStatus(false);
    setHasLoadedStatus(true);
  }, [userBlackListRequest, sinceStatus, userBlackListPath, userBlackListResponseResult]);

  const loadNextPage = useCallback(async () => {
    try {
      const response = await userBlackListRequest<UserBlackListData>(userBlackListPath, 'get', {
        params: {since: sinceStatus, limit: PAGE_COUNT},
        signal: controller.current.signal,
      });
      userBlackListResponseResult(response);
    } catch (error) {
      console.log(error);
    }
  }, [userBlackListRequest, sinceStatus, userBlackListResponseResult, userBlackListPath]);

  const removeBlackUserById = useCallback(
    async (id: number) => {
      try {
        const requestPath = removeBlackUserPath + id;
        await removeBlackUserRequest(requestPath, 'delete', {
          params: {uid: id},
          signal: controller.current.signal,
        });
        const afterDeleteData = resultData.filter(element => element.id !== id);
        setResultData(afterDeleteData);
      } catch (error) {
        if ((error + '').includes('200')) {
          const afterDeleteData = resultData.filter(element => element.id !== id);
          setResultData(afterDeleteData);
        }
        console.log(error);
      }
    },
    [removeBlackUserRequest, resultData, removeBlackUserPath],
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
    isNetworkError,
    removeBlackUserById,
    hasLoadedStatus,
  };
};
