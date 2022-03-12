const HtmlWebpackPlugin = require('html-webpack-plugin');
const paths = require('./paths');
const chalk = require('chalk');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
// css 文件分离, 为每个包含 css 的 js 文件创建一个 css 文件
// 支持 css 和 sourceMaps 的按需加载
const MiniCssExtraactPlugin = require('mini-css-extract-plugin');

const ctx = {
  isEnvDevelopment: process.env.NODE_ENV === 'development',
  isEnvProduction: process.env.NODE_ENV === 'production',
};

const { isEnvDevelopment, isEnvProduction } = ctx;

module.exports = {
  entry: {
    index: './src/index.js',
  },
  output: {
    // 仅在生产环境添加 hash
    filename: ctx.isEnvProduction
      ? '[name].[contenthash].bundle.js'
      : '[name].bundle.js',
    // CDN 域名
    // publicPath: ctx.isEnvProduction ? 'https://xxx.com' : '',
  },
  plugins: [
    // 生成html, 自动引入所有bundle
    new HtmlWebpackPlugin({
      title: 'release_v0',
    }),
    // 进度条
    new ProgressBarPlugin({
      format: `   :msg [:bar] ${chalk.green.bold(':percent')} (:elapsed s)`,
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        include: paths.appSrc,
        type: 'asset/resource',
      },
      {
        test: /.(woff|woff2|eot|ttf|otf)&/i,
        include: paths.appSrc,
        type: 'asset/resource',
      },
      {
        test: /\.css$/,
        include: paths.appSrc,
        use: [
          // 将 Js 字符串生成为 style 节点
          'style-loader',
          // 将 CSS 转化为 CommonJS 模块
          'css-loader',
        ],
      },
      {
        test: /\.module\.(scss|sass)$/,
        include: paths.appSrc,
        use: [
          'style-loader',
          // 仅生产环境
          isEnvProduction && MiniCssExtraactPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              // Enable CSS Modules features
              modules: true,
              // 0 => no loaders (default);
              // 1 => postcss-loader;
              // 2 => postcss-loader, sass-loader
              importLoaders: 2,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    // postcss-preset-env 包含 autoprefixer
                    'postcss-preset-env',
                  ],
                ],
              },
            },
          },
          {
            // thread-loader 将耗时的 loader 放在一个独立的 worker 池中运行
            // 加快构建速度, 仅在非常耗时的 loader 前引入 thread-loader
            loader: 'thread-loader',
            options: {
              workerParallelJobs: 2,
            },
          },
          // 将 Sass 编译成 CSS
          'sass-loader',
        ].filter(Boolean),
      },
      {
        test: /\.(js|ts|jsx|tsx)$/,
        include: paths.appSrc,
        use: [
          {
            loader: 'esbuild-loader',
            options: {
              loader: 'tsx',
              target: 'es2015',
            },
          },
        ],
      },
    ],
  },
  cache: {
    // 使用文件缓存
    type: 'filesystem',
  },
  resolve: {
    alias: {
      // @ 代表 src 路径
      '@': paths.appSrc,
    },
    extensions: ['.js', '.ts'],
    modules: ['node_modules', paths.appSrc],
    symlinks: false,
  },
};
