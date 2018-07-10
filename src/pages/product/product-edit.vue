<template>
  <div class="product-edit">
    <top-head :name="type === '1' ? '添加商品' : '编辑商品'"></top-head>
    <ul class="item-list">
      <li>
        <label>商品名称</label>
        <el-input v-model="product.productName" placeholder="请输入商品名称"></el-input>
      </li>
      <li>
        <label>单价</label>
        <el-input v-model="product.price" placeholder="请输入商品单价，单位：元"></el-input>
      </li>
      <li>
        <label>商品库存</label>
        <el-input v-model="product.stockNum" placeholder="请输入商品库存，单位： 件"></el-input>
      </li>
      <li>
        <label>代表图片</label>
        <el-upload
          class="avatar-uploader"
          :action="config.uploadProductInfoUrl"
          :show-file-list="false"
          :on-success="handleMainImgSuccess">
          <img v-if="product.mainImage.url" :src="product.mainImage.url" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </li>
      <li>
        <label>商品尺码</label>
        <el-tag
          v-for="(tag, index) in product.sizes"
          :key="index"
          closable
          @close="deleteSize(index)">
          {{tag}}
        </el-tag>
        <div class="add-btn" @click="sizeDialogVisible = true">+</div>
      </li>
      <li>
        <label>商品属性</label>
        <ul class="attr-list">
          <li v-for="(item, index) in product.attributes" :key="index">
            <span>{{item.name}}</span>
            <img :src="item.url">
          </li>
        </ul>
        <div class="add-attr-btn" @click="attrDialogVisible = true">+</div>
      </li>
      <li>
        <label>商品参数</label>
        <el-tag
          v-for="(tag, index) in product.params"
          :key="index"
          closable
          @close="deleteParam(index)">
          {{tag.name}}: {{tag.value}}
        </el-tag>
        <div class="add-btn" @click="paramDialogVisible = true">+</div>
      </li>
      <li>
        <label>详情图片</label>
        <el-upload
          class="upload-detail"
          :action="config.uploadProductInfoUrl"
          list-type="picture-card"
          :file-list="product.detailPics"
          :on-success="handleDetailSuccess"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="detailPicDialogVisible">
          <img width="100%" :src="detailDialogImageUrl" alt="">
        </el-dialog>
      </li>
      <li><el-button type="primary" @click="submitData">提交</el-button></li>
    </ul>
    <el-dialog
      title="添加尺码"
      :visible.sync="sizeDialogVisible"
      width="40%">
      <div>
        <label>尺码</label>
        <el-input v-model="addSizeInfo" placeholder="请输入尺码信息"></el-input>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="sizeDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAddSize">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="添加属性"
      :visible.sync="attrDialogVisible"
      width="40%">
      <div>
        <label>属性名</label>
        <el-input v-model="addAttrInfo.name" placeholder="请输入属性名"></el-input>
        <br>
        <br>
        <label>图片上传</label>
        <el-upload
          class="avatar-uploader"
          :action="config.uploadProductInfoUrl"
          :show-file-list="false"
          :on-success="handleAttrImgSuccess">
          <img v-if="addAttrInfo.url" :src="addAttrInfo.url" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="attrDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAddAttr">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="添加参数"
      :visible.sync="paramDialogVisible"
      width="40%">
      <div>
        <label>参数名称</label>
        <el-input v-model="addParamInfo.name" placeholder="请输入参数名称"></el-input>
        <br>
        <br>
        <label>参数内容</label>
        <el-input v-model="addParamInfo.value" placeholder="请输入参数内容"></el-input>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="paramDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAddParam">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import TopHead from '@/components/head/head.vue';
import config from '@/common/js/config';
import { Message } from 'element-ui';
import Service from '@/api';
import { mapGetters } from 'vuex';
export default {
  components: {
    TopHead
  },
  data () {
    return {
      type: '1',
      config: config,
      productId: '',
      product: {
        productName: '',
        price: '',
        stockNum: '',
        mainImage: {
          url: '',
          name: ''
        },
        sizes: [],
        attributes: [],
        params: [],
        detailPics: []
      },
      sizeDialogVisible: false,
      addSizeInfo: '',
      attrDialogVisible: false,
      addAttrInfo: {
        name: '',
        image: '',
        url: ''
      },
      paramDialogVisible: false,
      addParamInfo: {
        name: '',
        value: ''
      },
      detailDialogImageUrl: '',
      detailPicDialogVisible: false,
      submitErrorTip: ''
    };
  },
  created () {
    if (!this.isLogin) {
      this.$router.push('/login');
    }
    this.type = this.$route.query.type;
    if (this.type === '2') {
      this.productId = this.$route.query.productId;
      this.getProductDetail();
    }
  },
  computed: {
    ...mapGetters([
      'isLogin'
    ])
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
    },
    submitData () {
      let url = this.type === '1' ? 'add_product' : 'edit_product_info';
      if (!this.validateData()) {
        Message.error({
          message: this.submitErrorTip
        });
        return;
      }
      console.log(this.product);
      let obj = {
        productName: this.product.productName,
        price: this.product.price,
        stockNum: this.product.stockNum,
        mainImage: this.product.mainImage.name,
        sizes: this.product.sizes,
        attributes: this.product.attributes.map(item => {
          return {
            name: item.name,
            image: item.image
          };
        }),
        params: this.product.params,
        detailPics: this.product.detailPics.map(item => {
          return item.response ? item.response.data : item.name;
        })
      };
      if (this.type === '2') {
        obj.productId = this.productId;
      }
      Service[url](obj).then(() => {
        Message.success({
          message: this.type === '1' ? '添加成功' : '修改成功'
        });
        this.$router.push('/index/product-list');
      }).catch(res => {
        Message.error({
          message: res.errStr
        });
      });
    },
    validateData () {
      if (!this.product.productName) {
        this.submitErrorTip = '请输入商品名称';
        return false;
      }
      if (!this.product.price) {
        this.submitErrorTip = '请输入商品单价';
        return false;
      }
      if (!this.product.stockNum) {
        this.submitErrorTip = '请输入库存数量';
        return false;
      }
      if (!this.product.mainImage.name) {
        this.submitErrorTip = '请上传代表图片';
        return false;
      }
      if (!this.product.sizes.length) {
        this.submitErrorTip = '请至少添加一个商品尺码信息';
        return false;
      }
      if (!this.product.attributes.length) {
        this.submitErrorTip = '请至少添加一个商品属性';
        return false;
      }
      if (!this.product.params) {
        this.submitErrorTip = '至少输入一个商品参数';
        return false;
      }
      if (!this.product.detailPics.length) {
        this.submitErrorTip = '请至少上传一张详情图片';
        return false;
      }
      return true;
    },
    handleRemove (file, fileList) {
      this.product.detailPics = fileList;
      console.log(this.product.detailPics);
    },
    handlePictureCardPreview (file) {
      this.detailDialogImageUrl = file.url;
      this.detailPicDialogVisible = true;
    },
    handleDetailSuccess (res, file, fileList) {
      this.product.detailPics = fileList;
      console.log(this.product.detailPics);
    },
    deleteParam (index) {
      this.product.params.splice(index, 1);
    },
    handleAddParam () {
      if (!this.addParamInfo.name || !this.addParamInfo.value) {
        Message.error({
          message: '请输入参数名称和内容'
        });
        return;
      }
      this.product.params.push({
        name: this.addParamInfo.name,
        value: this.addParamInfo.value
      });
      this.paramDialogVisible = false;
    },
    handleAddAttr () {
      if (!this.addAttrInfo.name || !this.addAttrInfo.image) {
        Message.error({
          message: '请输入属性名并上传相应图片'
        });
        return;
      }
      this.product.attributes.push({
        name: this.addAttrInfo.name,
        image: this.addAttrInfo.image,
        url: this.addAttrInfo.url
      });
      this.attrDialogVisible = false;
    },
    handleAttrImgSuccess (res) {
      this.addAttrInfo.image = res.data;
      this.addAttrInfo.url = config.getProductPicUrl(res.data);
    },
    deleteSize (index) {
      this.product.sizes.splice(index, 1);
    },
    handleAddSize () {
      if (!this.addSizeInfo) {
        Message.error({
          message: '请输入尺寸信息'
        });
        return;
      }
      this.product.sizes.push(this.addSizeInfo);
      this.sizeDialogVisible = false;
    },
    handleMainImgSuccess (res) {
      this.product.mainImage.url = config.getProductPicUrl(res.data);
      this.product.mainImage.name = res.data;
    }
  },
  watch: {
    sizeDialogVisible (newVal) {
      if (!newVal) {
        this.addSizeInfo = '';
      }
    },
    attrDialogVisible (newVal) {
      if (!newVal) {
        this.addAttrInfo.name = '';
        this.addAttrInfo.image = '';
        this.addAttrInfo.url = '';
      }
    },
    paramDialogVisible (newVal) {
      if (!newVal) {
        this.addParamInfo.name = '';
        this.addParamInfo.value = '';
      }
    },
    isLogin (newVal) {
      if (!newVal) {
        this.$router.push('/login');
      }
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.product-edit
  .item-list
    li
      margin-bottom: 15px;
      .add-btn
        display: inline-block;
        width: 32px;
        height: 32px;
        line-height: 30px;
        text-align: center;
        font-size: 18px;
        box-sizing: border-box;
        background: rgba(64,158,255,.1);
        border: 1px solid rgba(64,158,255,.2);
        color: #409EFF;
        cursor: pointer;
      .add-attr-btn
        display: inline-block;
        width: 100px;
        height: 130px;
        line-height: 130px;
        text-align: center;
        font-size: 40px;
        box-sizing: border-box;
        background: rgba(64,158,255,.1);
        border: 1px solid rgba(64,158,255,.2);
        color: #409EFF;
        cursor: pointer;
      .attr-list
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
  label
    display: inline-block;
    width: 100px;
    text-align: right;
    padding-right: 20px;
  .el-input
    width: 300px;
  .el-tag
    margin: 0 15px 10px 0;
  .avatar-uploader
    display: inline-block;
    border: 1px dashed #ccc;
    .el-upload
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    .el-upload:hover
      border-color: #409EFF;
    .avatar-uploader-icon
      font-size: 28px;
      color: #8c939d;
      width: 120px;
      height: 120px;
      line-height: 120px;
      text-align: center;
    .avatar
      width: 120px;
      height: 120px;
      display: block;
  .upload-detail
    display: inline-block;
</style>
