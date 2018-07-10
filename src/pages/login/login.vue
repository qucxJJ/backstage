<template>
  <div class="login-container">
    <div class="main">
      <div class="login-con">
        <div class="title">管理员登录</div>
        <div class="content">
          <div class="input-con">
            <label class="icon"><i class="fa fa-user"></i></label>
            <input type="text" class="info" placeholder="请输入用户名" v-model="name">
          </div>
          <div class="input-con">
            <label class="icon"><i class="fa fa-lock"></i></label>
            <input type="password" class="info" placeholder="请输入密码" v-model="password">
          </div>
          <div class="submit-btn" @click="login">登录</div>
          <!--<div class="link-con">-->
            <!--<span class="link" @click="forgetPassword">忘记密码</span>-->
            <!--<span class="link" @click="register">免费注册</span>-->
          <!--</div>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Service from '@/api';
import { mapMutations } from 'vuex';
import { Message } from 'element-ui';
export default {
  data () {
    return {
      name: '',
      password: ''
    };
  },
  methods: {
    login () {
      if (!this.name) {
        Message.error({
          message: '用户名不能为空哦~'
        });
        return;
      }
      if (!this.password) {
        Message.error({
          message: '密码不能为空哦~'
        });
        return;
      }
      Service
        .login({
          adminName: this.name,
          password: this.password
        })
        .then(data => {
          this.setUserName(data.userName);
          this.setIsLogin(true);
          this.$router.push('/');
        })
        .catch(res => {
          if (res.errNo === 1) {
            Message.error({
              message: '您输入的用户名不存在~'
            });
          } else if (res.errNo === 2) {
            Message.error({
              message: '密码错误啦，再输入一遍试试呢~'
            });
          }
        });
    },
    ...mapMutations({
      setUserName: 'SET_USER_NAME',
      'setIsLogin': 'SET_IS_LOGIN'
    })
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.login-container
  width: 100%;
  min-width: 1080px;
  .main
    width: 100%;
    height: 360px;
    box-sizing: border-box;
    padding: 40px;
    position: realtive;
    .login-con
      width: 400px;
      margin: 0 auto;
      border: 1px solid #ccc;
      .title
        height: 47px;
        line-height: 47px;
        box-sizing: border-box;
        border-bottom: 1px solid #ddd;
        font-size: 18px;
        font-weight: bold;
        text-align: center;
        color: #666;
        background: #fff;
      .content
        box-sizing: border-box;
        padding: 20px;
        background: #fff;
        .input-con
          font-size: 0;
          margin-bottom: 20px;
          .icon
            display: inline-block;
            vertical-align: top;
            box-sizing: border-box;
            width: 40px;
            height: 40px;
            line-height: 36px;
            border: 1px solid #bdbdbd;
            border-right: none;
            background: #f3f3f3;
            font-size: 18px;
            color: #d3d3d3;
            text-align: center;
          .info
            box-sizing: border-box;
            width: 320px;
            height: 40px;
            padding-left: 10px;
            font-size: 15px;
            border: 1px solid #bdbdbd;
            outline: none;
        .submit-btn
          width: 360px;
          height: 44px;
          line-height: 44px;
          margin-bottom: 20px;
          font-size: 18px;
          text-align: center;
          cursor: pointer;
          color: #fff;
          background: #409eff;
        .link-con
          text-align: right;
          .link
            display: inline-block;
            margin-left: 10px;
            font-size: 13px;
            color: #999;
            cursor: pointer;
</style>
