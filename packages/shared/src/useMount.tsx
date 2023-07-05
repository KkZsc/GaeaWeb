import {useEffect} from 'react';

export const useMount = (mount: () => void, unmount?: () => void) => {
  useEffect(() => {
    mount();
    return unmount;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
