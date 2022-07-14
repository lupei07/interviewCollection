/*
 * @Author: lu
 * @Date: 2022-07-14 14:39:04
 * @LastEditTime: 2022-07-14 14:45:56
 * @FilePath: \interviewCollection\vue.config.js
 * @Description:
 */
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
let isProduction = process.env.NODE_ENV;
module.exports = {
  configureWebpack: (config) => {
    // 生产环境相关配置
    if (isProduction == "production") {
      // 代码压缩
      config.plugins.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            // 生产环境自动删除console
            warnings: false,
            compress: {
              drop_debugger: true,
              drop_console: true,
              pure_funcs: ["console.log"],
            },
          },
          sourceMap: false, // 不打印日志
          parallel: true, // 开启并行化，加快打包速度
        })
      );
    }
  },
};
