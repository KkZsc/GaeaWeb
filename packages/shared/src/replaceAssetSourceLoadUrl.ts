import {Image} from 'react-native';

/**
 * jsbundleUrl 的值为lib.bundle的所在路径，其格式为：
 * file:///Devices/Bundle/Application/demo.app/d4d4bda0cee1b9775a306d63ddaa0eb6/
 * RN在资源加载时以 lib.bundle 所在目录为起始位置，但我们将资源文件和 lib.bundle 文件存储在了不同目录下
 * 因此需要替换jsbundleUrl中的md5值为 assets.bundle 的resourceID值
 */
export const replaceAssetSourceLoadPath = (bundleName: string) => {
  if (__DEV__ || !bundleName || typeof ga === 'undefined' || !ga.webAppConfig) {
    return;
  }

  const path = ga.webAppConfig.boxes.find(app => app.webAppName === bundleName)?.bundles?.assets?.resourceID ?? null;

  if (!path) {
    return;
  }

  // @ts-ignore
  Image.resolveAssetSource.setCustomSourceTransformer(resolver => {
    if (resolver.jsbundleUrl && !resolver.serverUrl) {
      const jsbundleUrlSplitList = resolver.jsbundleUrl.split('/');
      jsbundleUrlSplitList[jsbundleUrlSplitList.length - 2] = path;

      resolver.jsbundleUrl = jsbundleUrlSplitList.join('/');
    }

    return resolver.defaultAsset();
  });
};
