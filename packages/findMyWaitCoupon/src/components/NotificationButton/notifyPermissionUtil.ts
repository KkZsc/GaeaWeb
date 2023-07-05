import {AppState} from 'react-native';
import RTNSystemSetting from 'rtn-gaea-system-setting';
import {Modal} from '@gaea-web/components/modal';

export const isNotifyEnable = () => RTNSystemSetting!.isNotifyEnable();

export const enableNotify = (
  title: string = '开启手机通知,才能成功收到提醒消息，去开启吧~',
  confirmText: string = '去开启',
  cancelText: string = '取消',
) =>
  new Promise<boolean>((resolve, _) => {
    if (isNotifyEnable()) {
      resolve(true);
      return;
    }
    Modal.show({
      title,
      cancelText,
      confirmText,
      onConfirm: () => {
        RTNSystemSetting!.requestNotifySetting();
        const subscription = AppState.addEventListener('change', state => {
          if (state === 'active') {
            if (isNotifyEnable()) {
              resolve(true);
            } else {
              resolve(false);
            }
            subscription.remove();
          }
        });
      },
      onCancel: () => {
        resolve(false);
      },
      maskClosable: false,
    });
  });
