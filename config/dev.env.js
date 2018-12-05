'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // api_url: '"https://fafa.gxwhkj.cn"'
  // api_url: '"http://47.99.75.151:8080"'
  api_url: '"http://fafa.test"'
})
