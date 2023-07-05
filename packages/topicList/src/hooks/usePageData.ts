import {useEffect, useRef, useState, useCallback} from 'react';
import {useRequest} from '@gaea-web/shared';
import {Loading as LoadingFn} from '@gaea-web/components';
import {
  TAddParams,
  PageRequestInfo,
  TModulePage,
  TLabelPage,
  TActionPathPage,
  ITopicListHead,
  ITopicItem,
  ITopicList,
  IPageConfig,
} from '../../types';

export const isModulePageType = (params: TAddParams): params is TModulePage => {
  return (<TModulePage>params).module_id !== undefined;
};

export const isLabelPageType = (params: TAddParams): params is TLabelPage => {
  return (<TLabelPage>params).title !== undefined;
};

export const isActionPathPageType = (params: TAddParams): params is TActionPathPage => {
  return (<TActionPathPage>params).actionPath !== undefined;
};

const initPageRequest = (pageParams: TAddParams): PageRequestInfo => {
  if (isModulePageType(pageParams)) {
    return {
      url: `/v2/topic/discovery_v2/module_list/${pageParams.module_id}`,
      title: pageParams.title,
      params: {
        filter_free: 0,
        gender: 0,
        limit: 20,
        module_id: pageParams.module_id,
        module_type: pageParams.module_type,
        recommend_type: pageParams.hit_param.recommend_type,
        recommend_id: pageParams.hit_param.recommend_id,
        since: 0,
        tab_id: pageParams.hit_param.tab_id,
        filter_favourite: 0,
      },
    };
  } else if (isLabelPageType(pageParams)) {
    return {
      url: '/v1/freestyle/tag/more',
      title: pageParams.title,
      params: {
        tag_name: pageParams.title,
        gender: 0,
        limit: 20,
        since: 0,
        filter_favourite: 0,
      },
    };
  } else {
    return {
      url: pageParams.actionPath,
      title: '',
      params: {
        style: 3,
        gender: 0,
        limit: 20,
        since: 0,
        filter_favourite: 0,
      },
    };
  }
};

export const usePageData = (initParams: TAddParams) => {
  const httpFetch = useRequest();
  const initRequestInfo = useRef<PageRequestInfo>(initPageRequest(initParams)).current;
  const pageNum = useRef<number>(0);
  const pageSize = useRef<number>(initRequestInfo.params.limit || 20);
  const isLoading = useRef<boolean>(false);
  const [headData, setHeadData] = useState<ITopicListHead | null>(null);
  const [data, setData] = useState<ITopicItem[]>([]);
  const [isEnd, setEnd] = useState<boolean>(false);
  const pageConfig = useRef<IPageConfig | null>(null);

  const getPageData = useCallback(
    async (reset = false) => {
      if ((isLoading.current || isEnd) && !reset) {
        return;
      }

      isLoading.current = true;

      try {
        const result = await httpFetch<ITopicList>(initRequestInfo.url, 'get', {
          params: {
            ...initRequestInfo.params,
            since: pageNum.current * pageSize.current,
          },
        });

        if (result?.data) {
          const topics = result.data.topics.map(item => ({
            ...item,
            hidden_favourite_count: result.data.hidden_favourite_count,
            rec_id: result.data.rec_id,
          }));
          if (pageNum.current === 0) {
            pageConfig.current = {
              page_source: String(result.data.page_source),
              show_appointment: result.data.show_appointment,
              topic_click_action_type: result.data.topic_click_action_type,
              hidden_favourite_count: result.data.hidden_favourite_count,
            };

            result.data.head &&
              setHeadData({
                ...result.data.head,
                rank: result.data.rank,
              });
          }

          setData(d => (pageNum.current === 0 ? topics : [...d, ...topics]));

          pageNum.current += 1;
        } else {
          setEnd(true);
          LoadingFn.hide();
          return;
        }

        LoadingFn.hide();
        setEnd(result.data.topics.length < pageSize.current);
      } catch (err) {
        console.log(err);
        LoadingFn.hide();
      }

      isLoading.current = false;
    },
    [httpFetch, isEnd, initRequestInfo],
  );

  const filterFavouriteData = useCallback(
    (filter_favourite: 0 | 1) => {
      pageNum.current = 0;
      initRequestInfo.params = Object.assign({}, initRequestInfo.params, {
        filter_favourite,
      });

      getPageData(true);
    },
    [getPageData, initRequestInfo],
  );

  useEffect(() => {
    pageNum.current = 0;
    getPageData(true);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    title: initRequestInfo.title,
    data,
    head: headData,
    isEnd,
    pageConfig,
    setData,
    nextPage: getPageData,
    filterFavouriteData,
  };
};
