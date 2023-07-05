import {ICustomProp} from '../envConst';

export type TNativeProps<T = ICustomProp> = {
  concurrentRoot?: boolean;
  nativeConfig: T;
  rootTag?: number;
  versionInfo?: string;
};
