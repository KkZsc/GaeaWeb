import {useCallback, useEffect, useRef} from 'react';

export default <CbParams>(cb: (params?: CbParams) => void, delay: number) => {
  const timer = useRef<number | undefined>();

  const clearTimer = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = undefined;
    }
  }, []);

  const startTimer = useCallback(() => {
    clearTimer();

    timer.current = setTimeout(() => {
      cb();
      timer.current = undefined;
    }, delay);
  }, [cb, delay, clearTimer]);

  useEffect(() => {
    return () => clearTimer();
  }, [clearTimer]);

  return {
    startTimer,
    clearTimer,
    isActive: timer.current !== undefined,
  };
};
