import {useRef} from 'react';

export interface ITrackParams {
  TriggerPage?: string;
  TabModuleType?: string;
  ClkItemType?: string;
  SourceModule?: string;
  ClkItemName?: string;
}

export const useTrackParams = (initParams: ITrackParams = {}) => {
  const trackParams = useRef<ITrackParams>(initParams);

  const setTrackParams = (params: {}) => {
    trackParams.current = params;
  };

  return {
    trackParams,
    setTrackParams,
  };
};
