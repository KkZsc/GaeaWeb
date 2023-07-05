import {useCallback, useRef, useState} from 'react';
import {useMount, useRequest, useEnv, IResponse} from '@gaea-web/shared';
import {VoucheRedPacketListModel, VoucheRedPacketType, VoucheClientDataSourceModel} from '../../types';
import {Toast} from '@gaea-web/components/toast';
import {basePayUrl} from '@gaea-web/shared/src/baseUrlConst';

export const useData = () => {
  const abortController = useRef(new AbortController());
  const httpFetch = useRequest();
  const [refreshing, setRefreshing] = useState(false);
  const [loadMoreRequesting, setLoadMoreRequesting] = useState(false);
  const [since, setSince] = useState(0);
  const {env} = useEnv();
  const voucherUrl = basePayUrl(env) + '/v2/kb/rp_assigned';
  const [resultData, setResultData] = useState<VoucheClientDataSourceModel>({
    isEmpty: false,
    canUseVouchers: {
      type: VoucheRedPacketType.canNotUse,
      sectionTitle: '',
      data: [],
    },
    cannotUseVouchers: {
      type: VoucheRedPacketType.canNotUse,
      sectionTitle: '用完的代金券',
      data: [],
    },
    expireVouchers: {
      type: VoucheRedPacketType.canNotUse,
      sectionTitle: '过期的代金券',
      data: [],
    },
  });

  const preprocessData = useCallback(
    (data: IResponse<VoucheRedPacketListModel> | undefined, refresh: boolean) => {
      let canUseVouchers = [...resultData.canUseVouchers.data];
      let cannotUseVouchers = [...resultData.cannotUseVouchers.data];
      let expireVouchers = [...resultData.expireVouchers.data];
      if (refresh) {
        canUseVouchers = [];
        cannotUseVouchers = [];
        expireVouchers = [];
      }
      data?.data.red_packets.forEach((item, index) => {
        item.index = index;
        let date = new Date(item.expire_at);
        item.expire_at_string =
          date.getFullYear() + '年' + (date.getMonth() + 1).toString().padStart(2, '0') + '月' + date.getDate().toString().padStart(2, '0') + '日';
        item.common_discount_rules?.forEach(element => {
          element.type = item.type;
        });
        if (item.type === VoucheRedPacketType.canUse) {
          canUseVouchers.push(item);
        } else if (item.type === VoucheRedPacketType.canNotUse) {
          cannotUseVouchers.push(item);
        } else if (item.type === VoucheRedPacketType.expire) {
          expireVouchers.push(item);
        }
      });
      setResultData(() => {
        resultData.canUseVouchers.data = canUseVouchers;
        resultData.cannotUseVouchers.data = cannotUseVouchers;
        resultData.expireVouchers.data = expireVouchers;
        resultData.isEmpty = canUseVouchers.length === 0 && cannotUseVouchers.length === 0 && expireVouchers.length === 0;
        return {...resultData};
      });
    },
    [resultData],
  );

  const fetchData = useCallback(async () => {
    try {
      const data = await httpFetch<VoucheRedPacketListModel>(voucherUrl, 'get', {
        params: {since: 0, limit: 20},
        signal: abortController.current.signal,
      });
      setSince(data?.data.since ?? -1);
      preprocessData(data, true);
    } catch (error) {
      Toast.show({text: '请求失败', position: 'bottom'});
    }
    setRefreshing(false);
  }, [httpFetch, preprocessData, voucherUrl]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    fetchData();
  }, [fetchData]);

  const loadMore = useCallback(async () => {
    setLoadMoreRequesting(true);
    try {
      const data = await httpFetch<VoucheRedPacketListModel>(voucherUrl, 'get', {
        params: {since: since, limit: 20},
      });
      setSince(data?.data.since ?? -1);
      preprocessData(data, false);
    } catch (error) {
      Toast.show({text: '请求失败', position: 'bottom'});
    }
    setLoadMoreRequesting(false);
  }, [since, httpFetch, preprocessData, voucherUrl]);

  const cancelRefresh = () => {
    abortController.current.abort();
  };

  useMount(
    () => {
      fetchData();
    },
    () => {
      cancelRefresh();
    },
  );

  return {
    onRefresh,
    resultData,
    refreshing,
    since,
    loadMore,
    loadMoreRequesting,
  };
};
