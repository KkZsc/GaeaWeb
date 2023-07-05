import {useEnv} from './useEnv';
import {useCallback} from 'react';
import RTNGaeaNetwork from 'rtn-gaea-network/js/NativeGaeaNetwork';

export interface IResponse<T = undefined> {
  code: number;
  message: string;
  data: T;
}

export interface BaseResponse<Data> extends IResponse<Data> {}

export interface EmptyDataResponse extends IResponse {}

export const baseUrl = (env: string | undefined) => {
  switch (env) {
    case 'stag':
      return 'https://api.quickcan.cn';
    default:
      return 'https://api.kkmh.com';
  }
};

interface IConfig extends RequestInit {
  customerHeader?: {[key: string]: string} | undefined;
  params?: {[key: string]: string | number} | string;
}

const request = async <T>(url: string, dataEncrypt: boolean, {method, customerHeader, headers, params, ...other}: IConfig) => {
  const config = {
    method: method,
    headers: {...headers, ...customerHeader},
    ...other,
  };
  if (config.method?.toUpperCase() === 'GET') {
    if (params && Object.keys(params).length > 0) {
      url += '?' + RTNGaeaNetwork?.getRequestQueryParameters(params);
    }
  } else {
    config.body = typeof params === 'string' ? params : JSON.stringify(params || {});
  }
  const response: Response = await fetch(url, config);
  const dataRes = await response.json();
  if (response.ok) {
    try {
      if (dataRes.code === 200) {
        if (dataEncrypt) {
          return await RTNGaeaNetwork?.decryptResponseObject<T>(dataRes);
        } else {
          const result: T = dataRes;
          return result;
        }
      } else {
        if (dataRes.code === 401) {
          console.log('需要登录'); //后续补充该处逻辑
        }
        throw new Error('code error: ' + dataRes.code);
      }
    } catch (error) {
      throw error;
    }
  } else {
    throw new Error('response status: ' + response.status);
  }
};

export const useRequest = (dataEncrypt: boolean = false) => {
  const {env} = useEnv();
  return useCallback(
    <T>(url: string, method: string, config: IConfig) => {
      let fullUrl = '';
      if (url.startsWith('http://') || url.startsWith('https://')) {
        fullUrl = url;
      } else {
        fullUrl = baseUrl(env) + url;
      }
      return request<IResponse<T>>(fullUrl, dataEncrypt, {
        method,
        customerHeader: RTNGaeaNetwork?.requestFullHttpHeaderFields(dataEncrypt),
        ...config,
      });
    },
    [dataEncrypt, env],
  );
};
