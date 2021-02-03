module.exports = {
  proxy: {
    '/newwofortg': {    //将www.exaple.com印射为/apis
      // target: 'http://192.168.0.107:8080/newwofortg',  // 接口域名
      target: 'https://wxxapp.chinaunicom.cn/newwofortg',  // 接口域名
      // target: 'https://wxxapp.chinaunicom.cn/newwofortg_gray',  // 接口域名
      secure: false,  // 如果是https接口，需要配置这个参数
      changeOrigin: true,  //是否跨域
      pathRewrite: {
        '^/newwofortg': ''   //需要rewrite的,
      }
    },
    '/api': {    //将www.exaple.com印射为/apis
      // target: 'http://192.168.0.114:8080/newwofortg',  // 接口域名
      target: 'http://192.168.0.107:8080/api',  // 接口域名
      secure: false,  // 如果是https接口，需要配置这个参数
      changeOrigin: true,  //是否跨域
      pathRewrite: {
        '^/api': ''   //需要rewrite的,
      }
    },
    '/touch-qrcode': {    //将www.exaple.com印射为/apis
      // target: 'http://192.168.0.113:9001/touch-qrcode',  // 接口域名
      target: 'https://wxxapp.chinaunicom.cn/touch-qrcode',  // 接口域名
      // target: 'http://10.124.225.55:8080/touch-qrcode',  // 接口域名
      // target: 'http://192.168.0.145:9280/touch_qrcode',  // 接口域名
      secure: false,  // 如果是https接口，需要配置这个参数
      changeOrigin: true,  //是否跨域
      pathRewrite: {
        '^/touch-qrcode': ''   //需要rewrite的,
      },
    }
  }
}
