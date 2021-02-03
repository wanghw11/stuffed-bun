import Vue from 'vue'
import Vant from 'vant'
import 'vant/lib/index.css'
import './assets/styles/style.css'
import store from './store'
import VueCookie from 'vue-cookie' 
import axios from './utils/axiosConfig'   // 请求拦截器
import global from './utils/utils'
import App from './App'
import router from './router'
import './permission'   // 路由拦截器
Vue.prototype.$axios = axios
Vue.use(VueCookie)
Vue.use(Vant)
Vue.config.productionTip = false
Vue.use(router) 

Vue.prototype.global = global

//时间处理
import moment from 'moment'
window.moment = moment
//字符串处理


import S from 'string'
window.S = S




new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
