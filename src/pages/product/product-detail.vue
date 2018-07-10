<template>
  <div class="product-detail">
    <top-head name="商品详情"></top-head>
    <ul class="item-list">
      <li>
        <label>商品名称</label>
        <span class="info">{{product.productName}}</span>
      </li>
      <li>
        <label>单价</label>
        <span class="info">{{product.price}}元</span>
      </li>
      <li>
        <label>商品库存</label>
        <span class="info">{{product.stockNum}}件</span>
      </li>
      <li>
        <label>代表图片</label>
        <img v-if="product.mainImage" :src="product.mainImage.url">
      </li>
      <li>
        <label>商品尺码</label>
        <el-tag
          v-for="(tag, index) in product.sizes"
          :key="index">
          {{tag}}
        </el-tag>
      </li>
      <li>
        <label>商品属性</label>
        <ul class="attr-list">
          <li v-for="(item, index) in product.attributes" :key="index" v-if="product.attributes">
            <span>{{item.name}}</span>
            <img :src="item.url">
          </li>
        </ul>
      </li>
      <li>
        <label>商品参数</label>
        <el-tag
          v-for="tag in product.params"
          :key="tag.name">
          {{tag.name}}: {{tag.value}}
        </el-tag>
      </li>
      <li>
        <label>详情图片</label>
        <ul>
          <li v-for="(item, index) in product.detailPics" :key="index" v-if="product.detailPics">
            <img :src="item.url" alt="">
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
import TopHead from '@/components/head/head.vue';
import Service from '@/api';
import { Message } from 'element-ui';
import { mapGetters } from 'vuex';
export default {
  components: {
    TopHead
  },
  data () {
    return {
      productId: '',
      product: {}
    };
  },
  created () {
    if (!this.isLogin) {
      this.$router.push('/login');
    }
    this.productId = this.$route.query.productId;
    this.getProductDetail();
  },
  computed: {
    ...mapGetters([
      'isLogin'
    ])
  },
  watch: {
    isLogin (newVal) {
      if (!newVal) {
        this.$router.push('/login');
      }
    }
  },
  methods: {
    getProductDetail () {
      Service.get_all_product_detail({
        productId: this.productId
      }).then(data => {
        this.product = data;
      }).catch(res => {
        Message.error({
          message: res.errStr
        });
      });
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.product-detail
  .item-list
    li
      margin: 20px 0;
      img
        width: 100px;
        height: 100px;
      .el-tag
        margin: 0 10px 10px 0;
    label
      display: inline-block;
      width: 100px;
      text-align: right;
      padding-right: 20px;
    ul
      display: inline-block;
      vertical-align: top;
      li
        display: inline-block;
        width: 100px;
        height: 130px;
        span
          display: inline-block
          box-sizing: border-box;
          margin-bottom: 2px;
          width: 100px;
          height: 28px;
          line-height: 26px;
          font-size: 14px;
          text-align: center;
          color: #409EFF;
          border: 1px solid #409EFF;
        img
          width: 100px;
          height: 100px;
</style>
