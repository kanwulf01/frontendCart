import Vue from 'vue'
import Router from 'vue-router'
import Carrito from '../components/Carrito';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue')
    },
   
 

     {
      path: '/detalles',
      name: 'detalles',
      component: () => import('../components/Detalles.vue')

     },
     {
       path: '/carrito',
       name: '/carrito',
       component: Carrito,
      beforeEnter: (to, from, next) => {
        let tokenValidation = window.localStorage.getItem("access_token");
        if (tokenValidation) {
          next();
        } else {
          next({ name: "/" });
        }
      }
     }
  
  ],
  mode: 'history'
})