<template>
  <div class="tab">
      <!-- <BarCodeScan @handle="handleBarcode"></BarCodeScan>
    <p>测试{{value}}</p> -->
    <div class="tab-title">
      <div class="left">
        <div class="print" @click="scan"><img class="icon" src="@/assets/images/add.png" alt=""><span class="axis">新增商品</span></div>
        <div class="print" @click="del"><img class="icon" src="@/assets/images/delete.png" alt=""><span class="axis">删除商品</span></div>
        <div class="print"><img class="icon" src="@/assets/images/pay.png" alt=""><span class="axis">启动支付</span></div>
        <div class="print"><img class="icon" src="@/assets/images/print.png" alt=""><span class="axis">打印列表</span></div>
        <div class="print" @click="exportExcel"><img class="icon" src="@/assets/images/derive.png" alt=""><span class="axis">导出表格</span></div>
      </div>
      <div class="right">
        <!-- <el-radio-group v-model="radio1" size="mini">
          <el-radio-button label="按商品69编码统计"></el-radio-button>
          <el-radio-button label="按单品编码统计"></el-radio-button>
        </el-radio-group> -->
        <div class="setup">
          <img class="set" src="@/assets/images/ic-设置.png" alt="系统设置" @click="setup">
        </div>
      </div>
    </div>
    <div class="tab-body">
      <el-table
      :row-class-name="tableRowClassName"
      ref="singleTable"
      :data="tabledata"
      style="width: 100%"
      highlight-current-row
      @selection-change="handleSelectionChange"
      :default-sort="{ prop: 'date', order: 'descending' }"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="index" label="序号" align="center" sortable width="80"></el-table-column>
        <el-table-column prop="barcode" label="商品69编码" align="center" sortable width="140"></el-table-column>
        <el-table-column prop="commodityName" label="商品名称" sortable width="280"></el-table-column>
        <el-table-column prop="specsParameter" label="商品规格" width="160"></el-table-column>
        <el-table-column prop="brandName" label="品牌" width="120"></el-table-column>
        <!-- <el-table-column prop="manufacturer" label="生产厂家" sortable width="210"></el-table-column> -->
        <el-table-column label="商品单价" sortable width="120">
          <template v-slot="scope">
            ￥{{ scope.row.price }}
          </template>
        </el-table-column>
        <el-table-column label="促销价" sortable width="120">
          <template v-slot="scope">
            ￥{{ scope.row.price }}
          </template>
        </el-table-column>
        <el-table-column prop="time" label="小活动名称"  sortable width="140" ></el-table-column>
        <el-table-column prop="sum" label="待售出数量"  sortable width="140" ></el-table-column>
        <el-table-column prop="createTime" label="售出时间" align="center"  sortable width="180" ></el-table-column>
        <el-table-column label="订单号" align="center"  sortable width="160" class="aaaa">
          <template v-slot="scope">
            <span @click="onDetail(scope.row)" class="table-button">{{ scope.row.dealNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="dealType" label="订单类型" align="center"  sortable width="130" ></el-table-column>
        <el-table-column prop="transactionalNumber" label="支付业务编号" align="center"  sortable width="173" ></el-table-column>
      </el-table>
    </div>
    <div class="bot">
      <Page :total="total" :current="pageNum" :pageSize="pageSize" @changeCurrentPage="changeCurrentPage"></Page>
    </div>
    <div class="total">
      <div>待售出单品编码数量：<span>{{sku}}</span></div>
      <div>待售出商品种类：<span>{{sku}}</span></div>
      <div>待售出商品金额：<span class="small">￥</span><span>{{total}}</span></div>
    </div>
    <div class="inp-bot">
      <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="input-with-select">
        <el-form-item label="商品名称:" prop="name" class="name-search">
          <el-input v-model="ruleForm.name" placeholder="请输入商品名称或扫69码"></el-input>
          <img @click="scan" src="@/assets/images/ic-code.png" alt="">
        </el-form-item>
        <el-form-item label="订单号:" prop="num" class="name-search">
          <el-input v-model="ruleForm.num" placeholder="请输入订单号"></el-input>
        </el-form-item>
        <el-form-item label="统计时间:">
          <div class="date-status">
            <span
              v-for="(item, index) in tabs"
              :key="index"
              :class="{active: active === index}"
              @click="active = index"
            >{{item}}</span>
          </div>
          <el-date-picker
            v-model="value1"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button class="a" type="primary" @click="submitForm('ruleForm')">查询</el-button>
          <el-button class="a" type="primary" @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog title="" v-model="centerDialogVisible" width="30%" center :close-on-click-modal="false">
        <el-input
          type="textarea"
          :rows="5"
          placeholder="请扫描或输入单品编码"
          v-model="codeInfo">
        </el-input>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addCommodify">确 定</el-button>
        <el-button @click="centerDialogVisible = false">取 消</el-button>
         </div>
    </el-dialog>
  </div>
</template>
 
<script>
import Page from '@/components/Pagination/page.vue'
import BarCodeScan from '@/components/BarCodeScan/index.vue'
import httpreques from '@/utils/httpreques';
import moment from "moment";
 
export default {
  name: "tab",
  components: {
    Page,
    BarCodeScan
  },
  data() {
    return {
      total: 0,
      pageSize: 15,
      pageNum: 1,
      tabs: ['当日'],
      active: 0,
      radio1: '按商品69编码统计',
      centerDialogVisible: false,
      textarea: '',
      tabledata: [],
      sku: 0, // 商品种类
      sum: 0, // 销售数量
      total: 0, // 销售总计
      multipleSelection: [],
      codeInfo: '',
      ruleForm: {
          name: '',
          num: '',
          date1: '',
          date2: ''
      },
      value: undefined
    };
  },
  created() {
    this.getdata()
    this.getTotal()
  },
  methods: {
    handleBarcode(barcodeMap) {
      console.log(1111, barcodeMap)
      this.value = barcodeMap;
    },
    getdata(){
      let parame = {
        "commodityName": "",
        "dealNumber": "",
        "dealType": 1,
        "pageNum": this.pageNum,
        "pageSize": this.pageSize,
        "transactionalNumber": ""
      }
      this.tabledata = []
      httpreques('post', parame, '/realbrand-management-service/Sale/onlinePendingOrder').then(res => {
        console.log(res)
        if(res.data.code === "SUCCESS"){
          let data = res.data.data
          this.total = res.data.total
          data.forEach((item, index) => {
            item.index = index+1
            item.createTime = moment(item.createTime).format(
              "YYYY-MM-DD HH:mm:ss"
            )
            if(item.dealType === 0) item.dealType = '门店销售'
            if(item.dealType === 1) item.dealType = '线上商城'
          })
          this.tabledata = data
          this.tabledata.reverse()
        }else{
          this.$message(res.data.msg)
        }
      })
    },
    getTotal(){
      httpreques('post', { }, '/realbrand-management-service/CommodityMgt/SaleStatistics').then(res => {
        if(res.data.code === "SUCCESS"){
          this.sum = res.data.data.sum
          this.sku = res.data.data.sku
          this.total = res.data.data.total
        }else{
          this.$message(res.data.msg)
        }
      })
    },
    del(){
      if(this.multipleSelection.length <= 0) return this.$message('请选择需要删除的商品')
    },
    addCommodify(){
      let commodityCodeList = []
      commodityCodeList = this.codeInfo.split(',')
      let params = {
        "commodityList": commodityCodeList,
        "pageNum": this.pageNum,
        "pageSize": this.pageSize
      } 
      httpreques("post", params, "/realbrand-store-service/Commodity/batchQueryCommodity").then((res) => {
        console.log(res);
        if (res.data.code === "SUCCESS") {
          this.centerDialogVisible = false
          this.codeInfo = ''
          let data = res.data.data
          data.forEach((item, index) => {
            item.index = this.tabledata.length+1
            item.scanTime = moment(item.scanTime).format(
              "YYYY-MM-DD HH:mm:ss"
            )
            this.tabledata.unshift(item) // 数组最前面新增数据
          })
        }else{
          this.$message(res.data.msg)
        }
      })
    },
    // 订单详情
    onDetail(data){
      console.log(data.dealNumber)
      this.$router.push({
        path: '/clerk/sale/noSaleOrderDetail',
        query: {
          dealNumber: data.dealNumber
        }
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    changeCurrentPage(val){
      this.pageNum = val
      this.getdata()
    },
    //添加class样式
    tableRowClassName({row, rowIndex}){
      if (rowIndex === 0) {
        return 'warning-row';
      }
      return '';
    },
    formatter(row, column) {
      return row.address;
    },
    scan(){
      this.centerDialogVisible = true
    }
  },
};
</script>
 
<style lang="scss" scoped>
@import '@/assets/css/reset.scss';
@import '@/assets/css/image1'
</style>