import {AppRegistry} from 'react-native';
import {lazy, Suspense, useEffect, Fragment, ExoticComponent} from 'react';
import {replaceAssetSourceLoadPath, TNativeProps} from '@gaea-web/shared';
import RTNGaeaEventTrack from 'rtn-gaea-event-track/js/NativeGaeaEventTrack';

const BUNDLE_NAME = 'Voucher';

let Component: React.FunctionComponent<any> | React.LazyExoticComponent<() => JSX.Element>;
let Wrapper: ExoticComponent<any>;

if (process.env.WEBPACK) {
  replaceAssetSourceLoadPath(BUNDLE_NAME);

  Component = lazy(() => import(/* webpackChunkName: "voucher" */ './src'));

  Wrapper = Suspense;
} else {
  Component = require('./src').default;
  Wrapper = Fragment;
}

const App = (props: TNativeProps) => {
  useEffect(() => {
    RTNGaeaEventTrack?.pageOnLayout(BUNDLE_NAME);
  });
  return (
    <Wrapper>
      <Component {...props} />
    </Wrapper>
  );
};

AppRegistry.registerComponent(BUNDLE_NAME, () => App);
