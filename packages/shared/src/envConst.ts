export const kNativeConfig = 'nativeConfig';
export const kIos = 'ios';
export const kAndroid = 'android';
export const kENV = 'ENV';

export interface ICustomProp {
  env?: string;
  params?: any;
  notifyId?: number;
}
