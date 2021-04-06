<template>
  <div class="indexlayout-main-conent">
    <el-card
      shadow="never"
      class="cus-card"
      style="margin-bottom: 15px"
      :body-style="{ 'padding-bottom': '0' }"
    >
      <el-form :model="searchModelRef" ref="searchFormRef" label-width="80px">
        <el-row :gutter="18" type="flex" justify="end" class="flex-wrap-wrap">
          <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
            <el-form-item label="订单号：">
              <el-input placeholder="请输入订单号" v-model="orderno" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
            <el-form-item label="下单时间">
              <el-date-picker
                v-model="orderdate"
                type="date"
                placeholder="选择日期"
                @change="ordertimes"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
            <el-form-item label="订单状态">
              <SelectType
                placeholder="请选择"
                :arrdata="orderstatus"
                @typekey="ordertype"
              />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
            <el-form-item label="收款状态">
              <SelectType
                placeholder="请选择"
                :arrdata="receivestatus"
                @typekey="rectivetype"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row
          :gutter="18"
          type="flex"
          justify="space-between"
          class="flex-wrap-wrap"
        >
          <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
            <el-form-item label="下单门店">
              <el-input placeholder="请输入下单门店" v-model="orderstore" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
            <el-form-item label="收货信息">
              <el-input placeholder="请输入收货信息" v-model="storename" />
            </el-form-item>
          </el-col>

          <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
            <el-form-item label="店铺名称">
              <el-input placeholder="请输入店铺名称" v-model="storename" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <div>
      <el-radio-group
        v-model="orderstatus2"
        size="medium"
        @change="status2change"
      >
        <el-radio-button label="全部"></el-radio-button>
        <el-radio-button label="待确认"></el-radio-button>
        <el-radio-button label="待发货"></el-radio-button>
        <el-radio-button label="待收货"></el-radio-button>
        <el-radio-button label="交易完成"></el-radio-button>
      </el-radio-group>
    </div>
    <el-table
      row-key="id"
      :data="orderlist"
      ref="multipleTable"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column
        type="index"
        label="序号"
        :index="orderlist.index"
        width="80"
      >
      </el-table-column>
      <el-table-column label="订单编号" prop="orderno"> </el-table-column>
      <el-table-column label="下单时间" prop="ordertime"></el-table-column>
      <el-table-column label="下单门店" prop="orderstore"> </el-table-column>
      <el-table-column label="订单金额" prop="orederamount"> </el-table-column>
      <el-table-column label="订单状态" prop="orederstatus"> </el-table-column>
      <el-table-column label="收货人" prop="orederconsignee"> </el-table-column>
      <el-table-column label="店铺名称" prop="storename"> </el-table-column>

      <el-table-column label="操作" width="150">
        <div style="color: blue">查看</div>
      </el-table-column>
    </el-table>
    <div class="padding-t10 text-align-right">
      <el-pagination
        background
        :page-size="pageSize"
        :total="total"
        @current-change="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        layout="  prev, pager, next,sizes, jumper"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";
import SelectType from "../../components/order/SelectType.vue";
import _ from "lodash";
import moment from "moment";
export default defineComponent({
  name: "ListSearchTablePage",
  components: {
    SelectType,
  },
  data() {
    return {
      pageSize: 10,
      total: 20,
      orderno: "",
      orderstore: "",
      orderstatu: "-1",
      ordertime: "-1",
      orderdate: "",
      orderstatus: [
        {
          value: "0",
          label: "待确认",
        },
        {
          value: "1",
          label: "待发货",
        },
        {
          value: "2",
          label: "待收货",
        },
        {
          value: "3",
          label: "交易完成",
        },
        {
          value: "4",
          label: "交易关闭",
        },
      ],
      orderstatus2: "全部",
      orderlist: [] as any[], //typescript 写法必须定义数组类型
      multipleSelection: [] as any[],

      receivestatus: [
        {
          value: "0",
          label: "未收款",
        },
        {
          value: "1",
          label: "部分收款",
        },
        {
          value: "2",
          label: "已收款",
        },
      ],
      storename: "",
    };
  },
  mounted() {
    this.getdata();
  },
  methods: {
    //获取数据
    getdata() {
      let t = this;
      let arr = [
        {
          index: 1,
          orderno: "112233",
          orderstore: "A门店",
          orederamount: "99.00",
          orederstatus: "0",
          orederconsignee: "张三",
          storename: "贵州茅台",
          ordertime: moment("2021-03-15"),
        },
        {
          index: 2,
          orderno: "112233",
          orderstore: "A门店",
          orederamount: "99.00",
          orederstatus: "1",
          orederconsignee: "张三",
          storename: "贵州茅台",
          ordertime: moment("2021-03-15"),
        },
        {
          index: 3,
          orderno: "112233",
          orderstore: "A门店",
          orederamount: "99.00",
          orederstatus: "2",
          orederconsignee: "张三",
          storename: "贵州茅台",
          ordertime: moment("2021-03-16"),
        },
        {
          index: 4,
          orderno: "112233",
          orderstore: "A门店",
          orederamount: "99.00",
          orederstatus: "3",
          orederconsignee: "张三",
          storename: "贵州茅台",
          ordertime: moment("2021-03-16"),
        },
        {
          index: 4,
          orderno: "112233",
          orderstore: "A门店",
          orederamount: "99.00",
          orederstatus: "4",
          orederconsignee: "张三",
          storename: "贵州茅台",
          ordertime: moment("2021-03-16"),
        },
      ] as any[];

      // 订单状态筛选
      if (t.orderstatu != -1) {
        arr = _.filter(JSON.parse(JSON.stringify(arr)), function (o) {
          return o.orederstatus == t.orderstatu;
        });
      }
      //下单时间筛选
      if (t.ordertime != "-1") {
        arr = _.filter(JSON.parse(JSON.stringify(arr)), function (o) {
          return moment(o.ordertime).format("YYYY-MM-DD") == t.ordertime;
        });
      }
      arr.forEach((item, key) => {
        let stutxt = "";
        switch (item.orederstatus) {
          case "0":
            stutxt = "待确认";
            break;
          case "1":
            stutxt = "待发货";
            break;
          case "2":
            stutxt = "待收货";
            break;
          case "3":
            stutxt = "交易完成";
            break;
          case "4":
            stutxt = "交易关闭";
            break;
        }
        item.orederstatus = stutxt;
        item.ordertime = moment(item.ordertime).format("YYYY-MM-DD HH:mm:ss");
      });
      t.orderlist = [];
      t.orderlist = arr;
    },
    //分页跳转
    currentPage() {},
    //列表选中
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //订单状态 单选
    status2change(val) {
      //更新数据
      let t = this;
      let stukey = -1;
      switch (val) {
        case "待确认":
          stukey = 0;
          break;
        case "待发货":
          stukey = 1;
          break;
        case "待收货":
          stukey = 2;
          break;
        case "交易完成":
          stukey = 3;
          break;
        case "交易关闭":
          stukey = 4;
          break;
      }
      t.orderstatu = stukey;
      t.getdata();
    },
    //订单状态下拉
    ordertype(stu) {
      let t = this;
      t.orderstatu = stu;
      t.getdata();
    },
    //付款状态下拉
    rectivetype(stu) {},
    //订单时间
    ordertimes(val) {
      let t = this;
      t.ordertime = moment(val).format("YYYY-MM-DD");
      this.getdata();
    },
  },
});
</script>
<style lang="scss" scoped>
 
</style>