<template>
  <div class="tab">
    <div class="tab-title">
      <div class="left">
        <div class="print" @click="scan"><img class="icon" src="@/assets/images/again.png" alt=""><span class="axis">重新盘货</span></div>
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
      :data="tableData"
      style="width: 100%"
      highlight-current-row
      @current-change="handleCurrentChange"
      :default-sort="{ prop: 'date', order: 'descending' }"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="index" label="序号" align="center" sortable width="80"></el-table-column>
        <el-table-column label="单品编码" align="center" sortable width="200">
          <template v-slot="scope">
            <span class="detail-info" @click="codeDetail(scope.row)">{{scope.row.commodityCode}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="barCode" label="商品69编码" align="center" sortable width="140"></el-table-column>
        <el-table-column prop="commodityName" label="商品名称" sortable width="230" show-overflow-tooltip></el-table-column>
        <el-table-column prop="specsParameter" label="商品规格" sortable width="160" show-overflow-tooltip></el-table-column>
        <el-table-column prop="brandName" label="品牌" sortable width="140" show-overflow-tooltip></el-table-column>
        <el-table-column prop="manufacturer" label="生产厂家" sortable width="200" show-overflow-tooltip></el-table-column>
        <el-table-column prop="price" label="单价（元）" sortable width="110" align="right">
          <template v-slot="scope">
						{{ scope.row.price }}
					</template>
        </el-table-column>
        <el-table-column prop="scanTime" label="盘货时间" align="center"  sortable width="160" ></el-table-column>
        <el-table-column label="" align="center" width="255" ></el-table-column>
      </el-table>
    </div>
    <div class="bot">
      <Page :total="total" :current="pageNum" :pageSize="pageSize" @getPageSize="getPageSize" @changeCurrentPage="changeCurrentPage"></Page>
      <!-- <el-pagination layout=" prev, pager, next ,total" :total="total" :page-size="pageSize" @current-change="currentchange"></el-pagination> -->
    </div>
    <div class="total">
      <div class="statistic-item1">已盘货单品编码数量：<span>{{count}}</span></div>
      <div class="statistic-item2">已盘货商品种类：<span>{{barCount}}</span></div>
      <div class="statistic-item3">已盘货商品金额：<span class="small">￥</span><span>{{price}}</span></div>
    </div>
    <div class="inp-bot">
      <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="input-with-select">
        <div class="search-item">
          <el-input v-model="ruleForm.commodityName" placeholder="请输入商品名称或扫69码"></el-input>
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
            v-model="ruleForm.date"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button class="a" type="primary" @click="submitForm">查询</el-button>
          <el-button class="a" type="primary" @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog title="" v-model="centerDialogVisible" width="30%" center :close-on-click-modal="false">
        <el-input
          type="textarea"
          :rows="5"
          placeholder="请扫描或输入单品编码"
          v-model="textarea">
        </el-input>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
        <el-button @click="centerDialogVisible = false">取 消</el-button>
         </div>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination/index.vue";
import Page from '@/components/Pagination/page.vue'
import httpreques from '@/utils/httpreques';
import moment from "moment";

export default {
  name: "tab",
  components: {
    Pagination,
    Page
  },
  data() {
    return {
      pageNum: 1,
      total: 0,
      pageSize: 20,
      price: 0,
      barCount: 0,
      count: 0,
      tabs: ['当日'],
      active: 0,
      radio1: '按商品69编码统计',
      centerDialogVisible: false,
      textarea: '',
      tableData: [],
      ruleForm: {
          commodityName: '',
          region: '',
          date: '',
      },
    };
  },
  created() {
    this.getdata()
    this.getTotal()
  },
  methods: {
    getdata(){
      let param = {
        "barcode": "",
        "city": "",
        "fdate": "",
        "flag": "1",
        "inventoryTime": "",
        "ldate": "",
        "like": "",
        "pageNum": this.pageNum,
        "pageSize": this.pageSize,
        "province": "",
        "storeId": "",
        "storeName": "",
        "userIdNumber": "",
        "userName": ""
      }
      this.tableData = []
      httpreques('post', param, '/realbrand-management-service/Inventory/inventoryRecordsApi').then(res => {
        console.log(res)
        if(res.data.code === 'SUCCESS'){
          let data = res.data.data
          data.length == 0 ? this.total = 0 : this.total = res.data.total
          data.forEach((item, index) => {
            item.index = index+1
            if(item.price) item.price = item.price.toFixed(2)
            item.scanTime = moment(item.scanTime).format(
              "YYYY-MM-DD HH:mm:ss"
            );
          })
          this.totalNum = res.data.total
          this.tableData = data
          this.tableData.reverse()
        }else{
          this.$message(res.data.msg)
        }
      })
    },
    // 获取单品编码数量、商品种类、金额
    getTotal(){
      let parame = {
        "city": "string",
        "fdate": "",
        "ldate": "",
        "like": "string",
        "pageNum": 0,
        "pageSize": 0,
        "province": "string",
        "storeId": "string",
        "userIdNumber": "string"
      }
      httpreques('post', parame, '/realbrand-management-service/Inventory/YesInventoryCount').then(res => {
        console.log(res)
        if(res.data.code === "SUCCESS"){
          this.barCount = res.data.data.barCount
          this.count = res.data.data.count
          this.price = res.data.data.price
        }else{
          this.$message(res.data.msg)
        }
      })
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
    //选中你选择的条件列表
    setCurrent(row) {
        this.$refs.singleTable.setCurrentRow(row);
      },
    handleCurrentChange(val) {
        this.currentRow = val;
      },
    scan(){
      this.centerDialogVisible = true
    },
    getPageSize(val){

    },
    changeCurrentPage(val){
      this.pageNum=val
      this.getdata()
    },
    statistics(){
      this.$router.push('/clerk/check/checkproductStatistics')
    }
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/reset.scss';
@import '@/assets/css/image1';
/deep/.tab-body{
  height: 630px;
}
</style>