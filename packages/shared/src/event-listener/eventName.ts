import {Platform} from 'react-native';

export const LOGIN_NOTIFICATION_EVENT_NAME = Platform.OS === 'android' ? 'com.kuaikan.gaea.modules.notification.GALoginEvent' : 'AccountNotification';
