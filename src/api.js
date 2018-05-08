import { factory } from '@/common/http-methods';

let obj = {
  get: {
    get_category_list: '/categories/get_category_list',
    get_product_list: '/products/get_product_list'
  },
  post: {
    login: '/admins/login',
    delete_child_category: '/categories/delete_child_category',
    add_child_category: '/categories/add_child_category',
    add_category: '/categories/add_category',
    add_product: 'products/add_product',
    edit_product_info: '/products/edit_product_info'
  }
};

export default factory(obj);
