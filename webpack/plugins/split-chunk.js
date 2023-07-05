const {Compilation, Template, RuntimeGlobals, RuntimeModule} = require('webpack');
const {ConcatSource, RawSource} = require('webpack-sources');
const fs = require('fs');
const path = require('path');

/**
 * 在打包完成后，生成lock.json文件，用于后续的发布流程
 * @param {string} libBundleName
 * @param {Array} pages
 * @param {string} output
 */
const createBundlesDescFile = ({libBundleName, pages, output}) => {
  const result = [];

  const libBundle = {
    md5: '',
    fileName: libBundleName,
    resourceID: '',
    downloadURL: '',
  };

  pages.forEach(page => {
    const pageChunkName = page.bundleName;
    /**
     * 从pageChunkName中获取appName
     * 如：pageChunkName = 'home-page.chunk.bundle', appName = 'HomePage'
     * appName为 AppRegistry.registerComponent 时的参数
     */
    const appName = pageChunkName
      .split('.')
      .shift()
      .split('-')
      .map(str => str.replace(/^[a-z]{1}/, char => char.toUpperCase()))
      .join('');

    const pageBundle = {
      webAppName: appName,
      webAppHash: '',
      preLoadUrl: '',
      finalLoadUrl: '',
      bundles: {
        lib: libBundle,
        entry: {
          md5: '',
          resourceID: '',
          downloadURL: '',
          fileName: pageChunkName,
          dependencies: ['lib'],
        },
        assets: {
          resourceID: '',
          downloadURL: '',
          fileName: 'assets',
          md5: '',
        },
      },
    };

    result.push(pageBundle);
  });

  fs.writeFileSync(
    path.join(output, 'lock.json'),
    JSON.stringify(
      {
        boxes: result,
      },
      null,
      4,
    ),
  );
};

class InjectRuntime extends RuntimeModule {
  constructor() {
    super('gaea/init', RuntimeModule.STAGE_BASIC);
  }

  generate() {
    return Template.asString([
      '// set __webpack_modules__ and __webpack_require__ to self',
      Template.getFunctionContent(
        `
        (function() {
          self.__webpack_modules__ = __webpack_modules__;
          self.__webpack_require__ = __webpack_require__;
        })();
      `,
      ),
    ]);
  }
}

class GaeaSplitChunk {
  /**
   * moduleName: '', module名称
   * bundleName: '', 构建后的bundle文件名称
   * moduleId: null, // 页面的模块id
   */
  pageList = [];

  platform = 'ios';

  libBundleName = 'lib.bundle';

  appEntriesModuleId = null;

  constructor(platform) {
    this.platform = platform;
  }

  apply(compiler) {
    compiler.hooks.afterEmit.tap('GaeaCreateDescFile', () => {
      createBundlesDescFile({
        libBundleName: this.libBundleName,
        pages: this.pageList,
        output: compiler.options.output.path,
      });
    });

    /**
     * 注入webpack的运行时代码，暴露__webpack_module__和__webpack_require__
     */
    compiler.hooks.compilation.tap('GaeaInjectRuntime', compilation => {
      compilation.hooks.additionalTreeRuntimeRequirements.tap('GaeaInjectRuntime', (chunk, runtimeRequirements) => {
        runtimeRequirements.add(RuntimeGlobals.startupOnlyAfter);

        compilation.addRuntimeModule(chunk, new InjectRuntime());
      });

      /**
       * 检索打包入口文件所依赖的业务文件
       * 格式为：./packages/demoPage
       */
      compilation.hooks.succeedModule.tap('GaeaSetModules', module => {
        const chunkFilename = compiler.options.output.chunkFilename;
        if (module.resource.endsWith('GaeaWeb/app-entries.js')) {
          const deps = module.dependencies;

          deps.forEach(dep => {
            if (/^\.\/packages\/[a-zA-Z]+$/.test(dep.request)) {
              const pageName = dep.request.split('/')[2];
              // [name].chunk.bundle 替换 chunk 名字
              const bundleName = chunkFilename.replace(
                '[name]',
                // 小驼峰格式转 - 分隔的格式，如 demoPage -> demo-page
                pageName.replace(/[A-Z]/g, chart => `-${chart.toLowerCase()}`),
              );

              this.pageList.push({
                modleName: pageName,
                bundleName,
                moduleId: null,
              });
            }
          });
        }
      });

      /**
       * 查找业务页面入口构建后的moduleId
       */
      compilation.hooks.afterOptimizeModuleIds.tap('GaeaSetModuleId', modules => {
        let len = this.pageList.length;

        for (let i of modules) {
          if (i.rawRequest && len > 0) {
            const index = this.pageList.findIndex(({modleName}) => i.rawRequest === `./packages/${modleName}`);

            if (index > -1) {
              this.pageList[index].moduleId = compilation.chunkGraph.getModuleId(i);

              len--;
            }
          }

          if (!this.appEntriesModuleId && i.context.endsWith('/GaeaWeb') && i.rawRequest === './app-entries') {
            this.appEntriesModuleId = compilation.chunkGraph.getModuleId(i);
          }
        }
      });

      /**
       * 修改bundle文件的依赖项，将lib bundle中引用的业务代码块移动到对应的页面文件中
       */
      compilation.hooks.processAssets.tap(
        {
          name: 'GaeaModule',
          stage: Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL,
          additionalAssets: true,
        },
        assets => {
          const libBundle = assets[this.libBundleName];

          if (!libBundle) {
            return;
          }

          const source = libBundle.original().getChildren();
          let len = this.pageList.length;

          for (let i = 0; i < source.length; i++) {
            const content = source[i].source();

            this.pageList.forEach(page => {
              if (content === `,\n\n/***/ ${page.moduleId}:\n`) {
                const pageBundle = assets[page.bundleName];

                if (!pageBundle) {
                  throw new Error(`page bundle: [${page.bundleName}] not found`);
                }

                const needMoveModules = source.splice(i, 2);

                compilation.updateAsset(page.bundleName, old => {
                  return new ConcatSource(
                    old,
                    new RawSource(`;self.__webpack_modules__['${page.moduleId}']=`),
                    needMoveModules[1],
                    new RawSource(`;self.__webpack_require__(${page.moduleId});`),
                  );
                });

                // 匹配到moduleId后修改了source长度，所以i要减1
                i -= 1;
                len--;
              }
            });

            if (len === 0) {
              break;
            }
          }

          for (let i = 0; i < source.length; i++) {
            const content = source[i].source();
            if (content === `,\n\n/***/ ${this.appEntriesModuleId}:\n`) {
              // 替换app-entries.js中的内容，防止被执行
              source[i + 1] = new RawSource('function(){console.log("[app-entries.js] had been replaced")}');

              break;
            }
          }

          compilation.updateAsset(this.libBundleName, () => {
            return new ConcatSource(...source);
          });
        },
      );
    });
  }
}

exports.GaeaSplitChunk = GaeaSplitChunk;
