<template>
  <div class="product-detail">
    <top-head name="商品详情"></top-head>
    {{productId}}
  </div>
</template>

<script type="text/ecmascript-6">
import TopHead from '@/components/head/head.vue';
export default {
  components: {
    TopHead
  },
  data () {
    return {
      productId: ''
    };
  },
  created () {
    this.productId = this.$route.query.productId;
    console.log(this.productId);
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
