<template>
  <div class="product-list">
    <top-head name="商品列表"></top-head>
    <div class="top">
      商品ID: <el-input v-model="productId" placeholder="输入商品ID"></el-input>
      商品关键字： <el-input v-model="keyword" placeholder="输入商品关键字"></el-input>
      <el-button type="primary" size="small" @click="getProductList">查询</el-button>
      <el-button type="primary" size="small" @click="addProduct">新增</el-button>
    </div>
    <el-table
      :data="productList"
      border
      style="width: 100%">
      <el-table-column
        prop="productId"
        label="商品ID"
        width="100">
      </el-table-column>
      <el-table-column
        prop="productName"
        label="商品名称"
        width="450">
      </el-table-column>
      <el-table-column
        label="代表图片"
        width="150">
        <template slot-scope="scope">
          <img :src="'http://localhost:3000/images/product/' + scope.row.mainImage" alt="" style="width:100px; height:100px;">
        </template>
      </el-table-column>
      <el-table-column
        prop="price"
        label="价格（元）"
        width="100">
      </el-table-column>
      <el-table-column
        prop="payNum"
        label="总销量"
        width="100">
      </el-table-column>
      <el-table-column
        prop="stockNum"
        label="库存（件）"
        width="100">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="showDetail(scope.row.productId)" type="text" size="small">查看</el-button>
          <el-button @click="editProduct(scope.row.productId)" type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script type="text/ecmascript-6">
import TopHead from '@/components/head/head.vue';
import Service from '@/api';
export default {
  components: {
    TopHead
  },
  data () {
    return {
      keyword: '',
      productId: '',
      productList: []
    };
  },
  created () {
    this.getProductList();
  },
  methods: {
    getProductList () {
      Service.get_all_product_list({
        productId: this.productId,
        keyword: this.keyword
      }).then(data => {
        this.productList = data;
        console.log(this.productList);
      });
    },
    showDetail (productId) {
      this.$router.push(`/index/product-detail?productId=${productId}`);
    },
    editProduct (productId) {
      this.$router.push(`/index/product-edit?productId=${productId}&type=2`);
    },
    addProduct () {
      this.$router.push('/index/product-edit?type=1');
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.product-list
  .el-input
    width: 200px;
  .el-table
    margin-top: 30px;
</style>
