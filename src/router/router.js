import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/login.vue'
import Index from '@/views/index.vue'
import Welcome from '@/views/welcome.vue'
import Users from '@/users/users-list.vue'
import Roles from '@/roles/roles.vue'
import Right from '@/roles/right.vue'
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
      component: Index,
      redirect: { name: 'welcome' },
      children: [{
        name: 'welcome',
        path: 'welcome',
        component: Welcome
      },
      {
        name: 'users-list',
        path: 'users-list',
        component: Users
      },
      {
        name: 'roles',
        path: 'roles',
        component: Roles
      },
      {
        name: 'right',
        path: 'right',
        component: Right
      }]
    }]
})
