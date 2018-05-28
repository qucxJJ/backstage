<template>
  <div class="order">
    <top-head name="订单管理"></top-head>
    <div class="top">
      订单编号: <el-input v-model="orderNumberInput" placeholder="输入商品ID"></el-input>
      订单状态:
      <el-select v-model="statusInput" placeholder="输入商品关键字">
        <el-option
          v-for="item in orderStatus"
          :key="item.code"
          :label="item.txt"
          :value="item.code"></el-option>
      </el-select>
      <el-button type="primary" size="small" @click="getOrderList">查询</el-button>
    </div>
    <el-table
      :data="orderList"
      border
      style="width: 100%">
      <el-table-column
        prop="orderNumber"
        label="订单编号"
        width="250">
      </el-table-column>
      <el-table-column
        label="状态"
        width="100">
        <template slot-scope="scope">
          {{orderStatus[scope.row.status - 1].txt}}
        </template>
      </el-table-column>
      <el-table-column
        prop="address"
        label="收货地址"
        width="300">
      </el-table-column>
      <el-table-column
        prop="express"
        label="快递信息"
        width="100">
      </el-table-column>
      <el-table-column
        label="创建时间"
        width="200">
        <template slot-scope="scope">
          {{getDate(scope.row.createTime)}}
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="showDetail(scope.row.productId)" type="text" size="small">查看</el-button>
          <el-button @click="showDialog(scope.row.orderNumber)" type="text" size="small" v-if="scope.row.status === 2">发货</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="确认发货"
      :visible.sync="dialogVisible"
      width="30%">
      <span>如果确认该订单已发货，请录入快递单号并提交</span><br>
      快递单号: <el-input v-model="expressNumber" placeholder="输入快递单号"></el-input>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="sendConfirm">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import TopHead from '@/components/head/head.vue';
import Service from '@/api';
import { Message } from 'element-ui';
export default {
  components: {
    TopHead
  },
  data () {
    return {
      orderList: [],
      orderNumberInput: '',
      statusInput: '',
      orderStatus: [{
        code: 1,
        txt: '待付款'
      }, {
        code: 2,
        txt: '待发货'
      }, {
        code: 3,
        txt: '待收货'
      }, {
        code: 4,
        txt: '已完成'
      }, {
        code: 5,
        txt: '已取消'
      }],
      sendOrder: '',
      dialogVisible: false,
      expressNumber: ''
    };
  },
  created () {
    this.getOrderList();
  },
  methods: {
    getOrderList () {
      Service.get_all_order_list({
        orderNumber: this.orderNumberInput,
        status: this.statusInput
      }).then(data => {
        this.orderList = data;
      }).catch(res => [
        Message.error({
          message: res.errStr
        })
      ]);
    },
    getDate (time) {
      let date = new Date(time);
      let year = date.getFullYear();
      let month = date.getMonth() + 1 + '';
      let day = date.getDate() + '';
      let hour = date.getHours() + '';
      let minutes = date.getMinutes() + '';
      let seconds = date.getSeconds() + '';
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')} ${hour.padStart(2, '0')}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
    },
    showDialog (orderNumber) {
      this.sendOrder = orderNumber;
      this.dialogVisible = true;
    },
    sendConfirm () {
      Service.send_order({
        orderNumber: this.sendOrder,
        expressNumber: this.expressNumber
      }).then(() => {
        Message.success({
          message: '发货成功'
        });
        this.dialogVisible = false;
        this.getOrderList();
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
.order
  .el-input
    width: 200px;
  .el-table
    margin-top: 30px;
</style>
