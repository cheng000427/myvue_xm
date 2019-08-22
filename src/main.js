import Vue from 'vue'
import App from './App.vue'
import '@/styles/index.less'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from '@/router/router.js'

Vue.use(ElementUI)
Vue.config.productionTip = false

// 添加导航守卫
router.beforeEach((to, from, next) => {
  let mytoken=localStorage.getItem('myvue_xm')
  if(mytoken||to.path=='/login'){
    next();
  }else{
    next({path:'/login'})
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
