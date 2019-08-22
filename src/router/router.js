import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/login.vue'
import Index from '@/views/index.vue'
Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      name: 'defalut',
      path: '/',
      redirect: { name: 'login' }
    },
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'index',
      path: '/index',
      component: Index
    }]
})
