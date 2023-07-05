import {useEffect, useState} from 'react';
import {loginEventListener} from '@gaea-web/shared';
import RTNGaeaBusiness from 'rtn-gaea-business/js/NativeGaeaBusiness';

export const useLogin = () => {
  const [isLogin, setIsLogin] = useState<boolean>(!!RTNGaeaBusiness?.isUserLogin());

  useEffect(() => {
    const remove = loginEventListener((params: string) => {
      console.log('登陆通知: ', params);
      setIsLogin(JSON.parse(params));
    });

    return () => remove();
  }, []);

  return isLogin;
};
