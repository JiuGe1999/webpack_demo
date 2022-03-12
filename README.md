# webpack_demo

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Lints and fixes files

```
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### 其他

##### 在开发过程中，切忌在开发环境使用生产环境才会用到的工具，如在开发环境下，应该排除 [fullhash]/[chunkhash]/[contenthash] 等工具。

##### 同样，在生产环境，也应该避免使用开发环境才会用到的工具，如 webpack-dev-server 等插件。

### 总结

#### webpack 优化相关

##### 加快构建速度方面, webpack 持久化缓存 cache 最有效, 二次构建也会从缓存中拉取, 和 vuex 的持久化缓存有异曲同工之妙

##### 减小打包体积方面, 压缩代码、分离重复代码、tree shaking 最有效, 可大幅度减小打包体积

##### 加快加载速度方面, 项目中按需加载、通过 hashId 拉取缓存资源非常有效, CDN 加速没有实际使用, 有待后续尝试
