// const { useCssModule } = require("vue");


module.exports = {
  lintOnSave: false,
  configureWebpack: {
    resolve: {
      // alias：配置别名
      alias: {  
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views'
      }
    }
  }
}
