import Vue from 'vue'
import Router from 'vue-router'

import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Home from '../views/Home.vue';

import firebase from '../firebase';


Vue.use(Router)



const router =  new Router({
  mode:'history',
  routes: [
   /* {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }*/


    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: { requireAuth: true }
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login,
      meta: { requireAuth: false }
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register,
      meta: { requireAuth: false }

    }
  ]
});

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser;
  let requireAuth = to.matched.some(record => record.meta.requireAuth);
  if(requireAuth && !currentUser) next('Login');
  else if(!requireAuth && currentUser) next('/');
  else next();
});
export default router;