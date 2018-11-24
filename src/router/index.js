import Vue from 'vue'
import Router from 'vue-router'

import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Home from '../views/Home.vue';
Vue.use(Router)

export default new Router({
  routes: [
   /* {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }*/


    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register
    }
  ]
})
