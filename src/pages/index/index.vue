<template>
  <div class="index">
    <el-row class="tac">
      <el-col :span="4">
        <h2 class="title">后台管理系统</h2>
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose">
          <el-menu-item index="1">
            <i class="el-icon-goods"></i>
            <span slot="title">
              <router-link to="/index/product-list" tag="span">
                商品管理
              </router-link>
            </span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">
              <router-link to="/index/category" tag="span">
                品类管理
              </router-link>
            </span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-tickets"></i>
            <span slot="title">
              <router-link to="/index/order" tag="span">
                订单管理
              </router-link>
            </span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="20">
        <div class="right">
          <div class="user">欢迎{{userName}},<span class="logout" @click="logout">退出</span></div>
          <router-view></router-view>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters, mapMutations } from 'vuex';
export default {
  computed: {
    ...mapGetters([
      'userName'
    ])
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath);
    },
    logout () {
      this.setUserName('');
      this.setIsLogin(false);
    },
    ...mapMutations({
      setUserName: 'SET_USER_NAME',
      setIsLogin: 'SET_IS_LOGIN'
    })
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.index
  .title
    box-sizing : border-box;
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: left;
    padding-left: 20px;
    font-size: 20px;
    font-weight: bold;
    color: #409EFF;
  .right
    box-sizing: border-box;
    width: 100%;
    padding: 30px 20px;
    .user
      margin-bottom: 15px;
      font-size: 14px;
      .logout
        cursor: pointer;
</style>
