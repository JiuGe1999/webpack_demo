const fs = require('fs');
const path = require('path');

// 将文件或目录的相对路径解析为绝对路径
const appDirectory = fs.realpathSync(process.cwd());
// 将路径解析序列化（cd xx的那种路径）
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

module.exports = {
  resolveApp,
  appPublic: resolveApp('public'),
  appHtml: resolveApp('public/index.html'),
  appSrc: resolveApp('src'),
  appDist: resolveApp('dist'),
  appTsConfig: resolveApp('tsconfig.json'),
};
