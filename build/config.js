/*
 * @Autor: lycheng
 * @Date: 2019-12-26 15:28:53
 * @Description: 
 */
var path = require('path')
const fs = require('fs')

module.exports = {
  build: {
    mode: 'production',
    env: { NODE_ENV: '"production"' },
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: false,
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report,
    devtool: false,
  },
  dev: {
    mode: 'development',
    env: { NODE_ENV: '"development"' },
    autoOpenBrowser: false,
    assetsRoot: path.resolve(__dirname, '../dev'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    cssSourceMap: true,
    devtool: 'source-map',
    devServer: {
      port: '8080',
      host: '0.0.0.0',
      open: true,
      https: {
        cert: fs.readFileSync(path.join(__dirname, '../src/ssl/cert.crt')),
        key: fs.readFileSync(path.join(__dirname, '../src/ssl/cert.key'))
      }
    }
  }

}
