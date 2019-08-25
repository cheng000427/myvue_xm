import Vue from 'vue'
import App from './App.vue'
import '@/styles/index.less'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from '@/router/router.js'
import axios from '@/utils/myaxios.js'

Vue.use(ElementUI)
Vue.config.productionTip = false
// 添加导航守卫
router.beforeEach((to, from, next) => {
  let mytoken = localStorage.getItem('myvue_xm')
  if (mytoken || to.path === '/login') {
    next()
  } else {
    next({ path: '/login' })
  }
})
// 拦截器
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  let mytoken = localStorage.getItem('myvue_xm')
  if (mytoken) {
    config.headers.Authorization = mytoken
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
