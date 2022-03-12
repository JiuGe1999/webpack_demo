const { merge } = require('webpack-merge');
const { resolveApp } = require('./paths');
const common = require('./webpack.common');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// 压缩 js
const TerserPlugin = require('terser-webpack-plugin');
// 压缩 css
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
// css shaking 先用 mini-css-extract-plugin 分离, 再 saking
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PurgeCssPlugin = require('purgecss-webpack-plugin');
const glob = require('glob');
const paths = require('./paths');

module.exports = merge(common, {
  output: {
    // [contenthash]-输出文件内容的md4-hash
    filename: '[name].[contenthash].bundle.js',
    path: resolveApp('dist'),
    clean: true,
  },
  mode: 'production',
  plugins: [
    // 打包体积分析
    new BundleAnalyzerPlugin(),
    new MiniCssExtractPlugin({
      filename: '[hash].[name].css',
    }),
    // css tree shaking
    new PurgeCssPlugin({
      paths: glob.sync(`${paths.appSrc}/**/*`, { nodir: true }),
    }),
  ],
  // 打包体积压缩
  optimization: {
    minimizer: [
      new TerserPlugin({
        // 使用多进程并发运行压缩以提高构建速度
        parallel: 4,
        terserOptions: {
          parse: {
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            // comparisions: false,
            inline: 2,
          },
          mangle: {
            safari10: true,
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true,
          },
        },
      }),
      new CssMinimizerPlugin({
        parallel: 4,
      }),
    ],
    // 为运行时代码创建一个额外的 chunk, 减少 entry chunk 体积, 提高性能
    runtimeChunk: true,
    // 抽离重复代码
    splitChunks: {
      // 包括所有类型的 chunks
      chunks: 'all',
      // 重复打包问题
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          // 不要为 cacheGroups 定义 name
          // 指定 name 后, 会将所有常见模块和 vendor 合并为一个 chunk
          // 导致更大的初始下载量并减慢页面加载速度
          // name: 'vendors',
          // 优先级
          priority: 10,
          enforce: true,
        },
      },
    },
    // webpack 支持根据资源内容, 创建 hash id
    // 当资源内容发生变化时, 将会创建新的 hash id
    // 实现浏览器缓存, 加快加载速度
    moduleIds: 'deterministic',
  },
});
