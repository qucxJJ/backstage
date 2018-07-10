<template>
  <div class="category">
    <top-head name="品类管理"></top-head>
    <div class="add-cate" @click="showAddCateDialog = true"><i class="el-icon-plus"></i>添加品类</div>
    <ul class="cate-list">
      <li v-for="(item, index) in data" :key="index">
        <h2 class="title">{{item.categoryName}}</h2>
        <el-tag
          :key="tag"
          v-for="tag in item.children"
          closable
          :disable-transitions="false"
          @close="handleClose(tag, item.categoryId)">
          {{tag}}
        </el-tag>
        <div class="add-btn" @click="handleAddChild(item.categoryId)">+</div>
      </li>
    </ul>
    <el-dialog
      title="新增品类"
      :visible.sync="showAddCateDialog"
      width="30%">
      <el-input v-model="addCateInfo" placeholder="请输入品类名称"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showAddCateDialog = false">取 消</el-button>
        <el-button type="primary" @click="addCate">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="新增子品类"
      :visible.sync="showAddChildDialog"
      width="30%">
      <el-input v-model="addChildInfo.name" placeholder="请输入子品类名称"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showAddChildDialog = false">取 消</el-button>
        <el-button type="primary" @click="addChild">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="删除子类"
      :visible.sync="showConfirmDeleteDialog"
      width="30%">
      <span>确认删除该子类吗？此操作不可逆哦~</span>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showConfirmDeleteDialog = false">取 消</el-button>
        <el-button type="primary" @click="deleteCategory">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import TopHead from '@/components/head/head.vue';
import Service from '@/api';
import { Message } from 'element-ui';
import { mapGetters } from 'vuex';
export default {
  data () {
    return {
      data: [],
      showConfirmDeleteDialog: false,
      showAddChildDialog: false,
      showAddCateDialog: false,
      deleteInfo: {
        categoryId: '',
        name: ''
      },
      addChildInfo: {
        categoryId: '',
        name: ''
      },
      addCateInfo: ''
    };
  },
  components: {
    TopHead
  },
  created () {
    if (!this.isLogin) {
      this.$router.push('/login');
    }
    this.getCategoryList();
  },
  computed: {
    ...mapGetters([
      'isLogin'
    ])
  },
  methods: {
    addCate () {
      if (!this.addCateInfo) {
        Message.error({
          message: '请输入品类名称哦~'
        });
        return;
      }
      Service.add_category({
        name: this.addCateInfo
      }).then(() => {
        Message.success({
          message: '添加成功'
        });
        this.getCategoryList();
        this.showAddCateDialog = false;
      }).catch(res => {
        Message.error({
          message: res.errStr
        });
      });
    },
    addChild () {
      if (!this.addChildInfo.name) {
        Message.error({
          message: '请输入子品类名称哦~'
        });
        return;
      }
      Service.add_child_category({
        categoryId: this.addChildInfo.categoryId,
        name: this.addChildInfo.name
      }).then(() => {
        Message.success({
          message: '添加成功'
        });
        this.getCategoryList();
        this.showAddChildDialog = false;
      }).catch(res => {
        Message.error({
          message: res.errStr
        });
      });
    },
    handleAddChild (categoryId) {
      this.addChildInfo.categoryId = categoryId;
      this.showAddChildDialog = true;
    },
    handleClose (name, categoryId) {
      this.showConfirmDeleteDialog = true;
      this.deleteInfo.name = name;
      this.deleteInfo.categoryId = categoryId;
    },
    deleteCategory () {
      Service.delete_child_category({
        categoryId: this.deleteInfo.categoryId,
        name: this.deleteInfo.name
      }).then(() => {
        Message.success({
          message: '删除成功'
        });
        this.showConfirmDeleteDialog = false;
        this.getCategoryList();
      }).catch(res => {
        Message.error({
          message: res.errStr
        });
        this.showConfirmDeleteDialog = false;
        this.getCategoryList();
      });
    },
    getCategoryList () {
      Service.get_category_list().then(data => {
        this.data = data.list;
      });
    }
  },
  watch: {
    showAddChildDialog (newVal) {
      if (!newVal) {
        this.addChildInfo.name = '';
      }
    },
    showAddCateDialog (newVal) {
      if (!newVal) {
        this.addCateInfo = '';
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
.category
  .add-cate
    height: 30px;
    line-height: 30px;
    width: 100px;
    text-align: center;
    color: #fff;
    background: #409EFF;
    border-radius: 3px;
    font-size: 14px;
    cursor: pointer;
  .cate-list
    .title
      height: 20px;
      line-height: 20px;
      font-size: 14px;
      font-weight: bold;
      margin: 15px 0;
    .el-tag
      margin-right: 10px;
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
</style>
