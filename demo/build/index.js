// 引入 webpack 打包工具
let webpackVue = require('zz-webpack-react')
// webpack公共配置
let config = require('../config/index.js')
module.exports = webpackVue(config).then(res => {
  return res
}).catch(err => {
  console.log(err);
});