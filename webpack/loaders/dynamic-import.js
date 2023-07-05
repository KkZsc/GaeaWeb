module.exports = function (source) {
  if (!/GaeaWeb\/packages\/[a-zA-Z]+\/index\.tsx?$/.test(this.resourcePath)) {
    return source;
  }

  /**
   * 匹配出lazy语句，使用import替换，避免被webpack构建多个文件
   * 格式为：
   * Component = lazy(() => import('./src'));
   */
  const reg = /([A-Za-z]+)\s=\slazy\(\n?.+(\'.+\')\)(,\n)?\)/;

  let result;

  if ((result = source.match(reg))) {
    const componentName = result[1];
    const componentPath = result[2];

    source = source.replace(result[0], `${componentName} = require(${componentPath}).default`);
  }

  return source;
};
