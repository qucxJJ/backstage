import { factory } from '@/common/http-methods';

let obj = {
  get: {
  },
  post: {
    login: '/admins/login'
  }
};

export default factory(obj);
