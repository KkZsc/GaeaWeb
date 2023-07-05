/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
const path = require('path');
const {makeMetroConfig} = require('@rnx-kit/metro-config');
const MetroSymlinksResolver = require('@rnx-kit/metro-resolver-symlinks');

const symlinkResolver = MetroSymlinksResolver();

module.exports = makeMetroConfig({
  projectRoot: __dirname,
  watchFolders: [
    path.resolve('../react-native'),
    path.resolve('../react-kkmh/native_modules'),
    path.resolve('../react-kkmh/native_ui_modules'),
  ],
  transformer: {
    minifierPath: require.resolve('metro-minify-uglify'),
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  resolver: {
    resolveRequest: (context, moduleName, platform) => {
      /**
       * 指定 native_ui_modules 目录的babel地址
       */
      if (
        moduleName.indexOf('@babel/runtime') > -1 &&
        context.originModulePath.indexOf('react-kkmh') > -1
      ) {
        moduleName = moduleName.replace(
          '@babel',
          path.resolve(__dirname, '../react-native/node_modules/@babel'),
        );
      }

      return symlinkResolver(context, moduleName, platform);
    },
  },
});
