import {AppRegistry} from 'react-native';
import NestScrollSample from './NestScrollSample';
import NotificationSample from './NotificationSamples';
import TestNotificationPage from './TestNotificationPage';
import OultineExposureSample from './OutlineViewSample';
import SvgComponent from './SVGSample';
import GARefreshControlSample from './GARefreshControlSample';
import MarqueeViewSample from './MarqueeViewSample';
import PageUnitDemo from './PageUnitDemo';

const testPage = {
  //想要测试的页面往这里填入就行,不需要手动注册也不需要在demoPage中填入名称
  NestScrollSample,
  NotificationSample,
  TestNotificationPage,
  OultineExposureSample,
  SvgComponent,
  GARefreshControlSample,
  MarqueeViewSample,
  PageUnitDemo,
};

export const testPageNames: string[] = [];

for (const [pageName, page] of Object.entries(testPage)) {
  AppRegistry.registerComponent(pageName, () => page);
  pageName.toLowerCase();
  testPageNames.push(pageName);
}
