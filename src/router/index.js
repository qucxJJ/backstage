import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/pages/index/index.vue';
import Login from '@/pages/login/login.vue';
import Category from '@/pages/category/category.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      component: Index,
      children: [
        {
          path: 'category',
          component: Category
        }
      ]
    },
    {
      path: '/login',
      component: Login
    }
  ]
});
