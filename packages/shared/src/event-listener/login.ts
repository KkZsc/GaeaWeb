import {GANotification} from '../gaNotification';
import {LOGIN_NOTIFICATION_EVENT_NAME} from './eventName';

export const loginEventListener = (callback: (p: string) => void) => {
  return GANotification.addEventListener(LOGIN_NOTIFICATION_EVENT_NAME, callback);
};
