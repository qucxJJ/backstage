import * as types from './mutation-types';

const mutations = {
  [types.SET_USER_NAME] (state, userName) {
    state.userName = userName;
  },
  [types.SET_IS_LOGIN] (state, isLogin) {
    state.isLogin = isLogin;
  }
};

export default mutations;
