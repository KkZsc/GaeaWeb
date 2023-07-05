import {useRequest} from '@gaea-web/shared';
import {NoticeType, WaitFreeNoticeResponseData} from '../types/WaitFreeNoticeResponse';
import {useCallback, useEffect, useState} from 'react';
import {Toast} from '@gaea-web/components/toast';
import {isNotifyEnable, enableNotify} from '../notifyPermissionUtil';

export const useDate = () => {
  const [notify, setNotify] = useState(NoticeType.Loading);
  const httpFetch = useRequest();

  useEffect(() => {
    httpFetch<WaitFreeNoticeResponseData>('/v1/coupon/wait_free_notice/get', 'get', {}).then(response => {
      setNotify(response.data.wait_free_notice === 1 && isNotifyEnable() ? NoticeType.NoticeEnable : NoticeType.NoticeDisable);
    });
  }, [httpFetch]);

  const changeNotify = useCallback(
    (newNotify: boolean) => {
      const promises: (Promise<any> | undefined)[] = [
        httpFetch('/v1/coupon/wait_free_notice', 'post', {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          params: `wait_free_notice=${newNotify ? 1 : 0}`,
        }),
      ];
      if (newNotify) {
        promises.push(enableNotify('开启手机通知,才能成功收到提醒消息，去开启吧~'));
      }

      Promise.all(promises).then(([response, result]) => {
        const serverNotify = response.data.wait_free_notice === 1;
        if (newNotify !== serverNotify) {
          return;
        }
        if (serverNotify) {
          if (result === true) {
            Toast.show({text: '已开启，作品完成等待将提醒你'});
            setNotify(NoticeType.NoticeEnable);
          }
        } else {
          Toast.show({text: '已关闭，不再发送完成等待提醒'});
          setNotify(NoticeType.NoticeDisable);
        }
      });
    },
    [httpFetch],
  );

  return {notify, changeNotify};
};
