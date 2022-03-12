const { merge } = require('webpack-merge');
const { resolveApp } = require('./paths');
const common = require('./webpack.common');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const smp = new SpeedMeasurePlugin();
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { webpack } = require('webpack');

module.exports = smp.wrap(
  merge(common, {
    output: {
      // bundle 文件名
      // [name]-chunk name, 如果chunk没有名称, 则会使用其id作为名称
      filename: '[name].bundle.js',
      // bundle 文件路径
      path: resolveApp('dist'),
      // 编译前清楚目录
      clean: true,
      // 删除在输出的 bundle 中生成的路径信息, 小幅提升构建速度
      pathinfo: false,
    },
    mode: 'development',
    // 开发工具, 开启source map, 编译调试
    // 生产环境不用, 影响速度
    devtool: 'eval-cheap-module-source-map',
    devServer: {
      // 告诉服务器从哪里提供内容, 只有在你想要提供静态文件时才需要
      // contentBase: './dist',
      static: './public',
      // 热更新
      hot: true,
    },
    plugins: [
      //   new webpack.HotModuleReplacementPlugin(),
      //   new ReactRefreshWebpackPlugin(),
    ],
  })
);
