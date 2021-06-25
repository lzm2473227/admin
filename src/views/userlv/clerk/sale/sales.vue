<template>
  <div class="tab">
    <div class="tab-title">
      <div class="left">
        <div class="print" @click="toReturnGoods"><img class="icon" src="@/assets/images/sale-return.png" alt=""><span class="axis">增加销售退货</span></div>
        <div class="print" @click="refund"><img class="icon" src="@/assets/images/sale-return.png" alt=""><span class="axis">销售退货</span></div>
        <div class="print" @click="statistics"><img class="icon" src="@/assets/images/statistics.png" alt=""><span class="axis">统计商品</span></div>
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
        <el-table-column label="单品编码" align="center" sortable width="200">
          <template v-slot="scope">
            <span class="detail-info" @click="codeDetail(scope.row)">{{scope.row.commodityCode}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="barcode" label="商品69编码" align="center" sortable width="140"></el-table-column>
        <el-table-column prop="commodityName" label="商品名称" sortable width="210" show-overflow-tooltip></el-table-column>
        <el-table-column prop="specsParameter" label="商品规格" sortable width="140" show-overflow-tooltip></el-table-column>
        <!-- <el-table-column prop="brandName" label="品牌" sortable width="120" show-overflow-tooltip></el-table-column> -->
        <!-- <el-table-column prop="manufacturer" label="生产厂家" sortable width="200"></el-table-column> -->
        <el-table-column label="销售单价" sortable width="110">
          <template v-slot="scope">
            {{ scope.row.price }} 元
          </template>
        </el-table-column>
        <el-table-column prop="zengpin" label="是否赠品" align="center" sortable width="110" ></el-table-column>
        <el-table-column label="促销价" align="center" sortable width="100" >
          <template v-slot="scope">
            {{ scope.row.price }} 元
          </template>
        </el-table-column>
        <el-table-column prop="time" label="售出时间" align="center" sortable width="150" ></el-table-column>
        <el-table-column label="订单号" align="center"  sortable width="160" >
          <template v-slot="scope">
            <span @click="onDetail(scope.row)" class="table-button">{{ scope.row.dealNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="time" label="订单类型" align="center"  sortable width="120" ></el-table-column>
        <el-table-column prop="time" label="支付业务编号" align="center"  sortable width="170" ></el-table-column>
      </el-table>
    </div>
    <div class="bot">
      <Page :total="total" :current="pageNum" :pageSize="pageSize" @changeCurrentPage="changeCurrentPage"></Page>
    </div>
    <div class="total">
      <div class="statistic-item1">已售出单品编码数量：<span>{{sum}}</span></div>
      <div class="statistic-item2">已售出商品种类：<span>{{sku}}</span></div>
      <div class="statistic-item3">已售出商品金额：<span class="small">￥</span><span>{{total}}</span></div>
    </div>
    <div class="inp-bot">
      <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="input-with-select">
        <div class="search-item">
          <el-input v-model="ruleForm.name" placeholder="请输入商品名称或扫69码"></el-input>
          <img @click="scan" src="@/assets/images/ic-code.png" alt="">
        </div>
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
import httpreques from '@/utils/httpreques';
import moment from "moment";
 
export default {
  name: "tab",
  components: {
    Page
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
      codeInfo: '',
      tabledata: [],
      sku: 0, // 商品种类
      sum: 0, // 销售数量
      total: 0, // 销售总计
      ruleForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
      },
      multipleSelection: []
    };
  },
  created() {
    this.getdata()
    this.getTotal()
  },
  methods: {
    getdata(){
      let param = {
        "pageNum": this.pageNum,
        "pageSize": 15,
      }
      this.tabledata = []
      httpreques('post', param, '/realbrand-management-service/CommodityMgt/SaleCommodityList').then(res => {
        console.log(res)
        if(res.data.code === "SUCCESS"){
          let data = res.data.data
          this.totalNum = res.data.total
          this.total = res.data.total
          data.forEach((item, index) => {
            item.index = index+1
            if(item.price) item.price = item.price.toFixed(2)
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
    // 销售退货
    refund(){
      if(this.multipleSelection.length <= 0) return this.$message('请选择需要退货的商品')
    },
    changeCurrentPage(val){
      this.pageNum = val
      this.getdata()
    },
    // 单品编码详情
    codeDetail(data){
      this.$router.push({
        path: '/clerk/receive/codeDetail',
        query: {
          commodityCode: data.commodityCode
        }
      })
    },
    toReturnGoods(){
      this.$router.push('/clerk/sale/saleReturnGoods')
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
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    statistics(){
      this.$router.push('/clerk/sale/saleStatistics')
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