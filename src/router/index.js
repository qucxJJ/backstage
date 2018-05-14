import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/pages/index/index.vue';
import Login from '@/pages/login/login.vue';
import Category from '@/pages/category/category.vue';
import ProductList from '@/pages/product/product-list.vue';
import ProductDetail from '@/pages/product/product-detail.vue';
import ProductEdit from '@/pages/product/product-edit.vue';
import Order from '@/pages/order/order.vue';

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
      redirect: '/index/product-list',
      children: [
        {
          path: 'category',
          component: Category
        },
        {
          path: 'product-list',
          component: ProductList
        },
        {
          path: 'product-detail',
          component: ProductDetail
        },
        {
          path: 'product-edit',
          component: ProductEdit
        },
        {
          path: 'order',
          component: Order
        }
      ]
    },
    {
      path: '/login',
      component: Login
    }
  ]
});
