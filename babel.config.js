module.exports = process.env.WEBPACK
  ? {
      comments: true,
      presets: ['module:metro-react-native-babel-preset'],
      plugins: [['transform-inline-environment-variables']],
    }
  : {
      presets: ['@rnx-kit/babel-preset-metro-react-native'],
      plugins: [
        ['transform-inline-environment-variables'],
        [
          'module-resolver',
          {
            alias: {
              '@/resource': './resource',
            },
          },
        ],
      ],
    };
