import {AppRegistry} from 'react-native';
import {lazy, Suspense, useEffect, Fragment, ExoticComponent} from 'react';
import {replaceAssetSourceLoadPath, TNativeProps} from '@gaea-web/shared';
import {T<page_name_upper>} from './types';
import RTNGaeaEventTrack from 'rtn-gaea-event-track/js/NativeGaeaEventTrack';

const BUNDLE_NAME = '<page_name_upper>';

let Component: React.FunctionComponent<any> | React.LazyExoticComponent<() => JSX.Element>;
let Wrapper: ExoticComponent<any>;

if (process.env.WEBPACK) {
  replaceAssetSourceLoadPath(BUNDLE_NAME);

  // 构建时根据注释生成文件名称，请勿修改注释
  Component = lazy(() => import(/* webpackChunkName: "<page_name>" */ './src'));

  Wrapper = Suspense;
} else {
  Component = require('./src').default;
  Wrapper = Fragment;
}

const App = (props: TNativeProps<T<page_name_upper>>) => {
  useEffect(() => {
    // 数据统计上报，勿删
    RTNGaeaEventTrack?.pageOnLayout(BUNDLE_NAME);
  });

  return (
    <Wrapper>
      <Component {...props.nativeConfig} />
    </Wrapper>
  );
};

AppRegistry.registerComponent(BUNDLE_NAME, () => App);
