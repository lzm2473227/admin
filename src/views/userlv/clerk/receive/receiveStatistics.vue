<template>
  <div class="tab">
    <div class="tab-title">
      <div class="left">
        <div class="print" @click="goBack"><img class="icon" src="@/assets/images/back.png" alt=""><span class="axis">返回列表</span></div>
        <div class="print"><img class="icon" src="@/assets/images/print.png" alt=""><span class="axis">打印列表</span></div>
        <div class="print" @click="exportExcel"><img class="icon" src="@/assets/images/derive.png" alt=""><span class="axis">导出表格</span></div>
      </div>
      <div class="right">
        <el-radio-group v-model="radio1" size="mini" @change="changeStatistics">
          <el-radio-button label="已收货统计"></el-radio-button>
          <el-radio-button label="退回商品统计"></el-radio-button>
        </el-radio-group>
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
        <el-table-column prop="barCode" label="商品69编码" align="center" sortable width="140"></el-table-column>
        <el-table-column prop="commodityName" label="商品名称" sortable width="400"></el-table-column>
        <el-table-column prop="specsParameter" label="商品规格" sortable width="250"></el-table-column>
        <el-table-column prop="brandName" label="品牌" sortable width="180"></el-table-column>
        <el-table-column prop="price" label="商品单价" sortable width="120">
          <template v-slot="scope">
						￥{{ scope.row.price }}
					</template>
        </el-table-column>
        <el-table-column prop="quantity" label="已收货数量" sortable width="160"></el-table-column>
        <el-table-column prop="scanTime" label="收货时间" align="center"  sortable width="203" ></el-table-column>
      </el-table>
    </div>
    <div class="bot">
      <Page :total="total" :current="pageNum" :pageSize="pageSize" @changeCurrentPage="changeCurrentPage"></Page>
    </div>
    <div class="total">
      <div>已收货商品种类：<span>{{totalNum}}</span></div>
      <div>已收货商品数量：<span>{{totalNum}}</span></div>
      <div>已收货商品金额：<span class="small">￥</span><span>0</span></div>
    </div>
    <div class="inp-bot">
      <el-form :inline="true" :model="form" :rules="rules" ref="form" label-width="100px" class="input-with-select">
        <el-form-item label="商品名称:" prop="commodityName" class="name-search">
          <el-input v-model="form.commodityName" placeholder="请输入商品名称或扫69码"></el-input>
          <img @click="scan" src="@/assets/images/ic-code.png" alt="">
        </el-form-item>
        <!-- <el-form-item label="收货人:" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请输入收货人"></el-input>
        </el-form-item> -->
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
            v-model="date"
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
import Page from '@/components/Pagination/page.vue';
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
      radio1: '已收货统计',
      centerDialogVisible: false,
      textarea: '',
      tabledata: [],
      totalNum: 0,
      form: {
          commodityName: '',
          storeName: '',
          date: ''
      },
      multipleSelection : []
    };
  },
  created() {
    this.getdata(this.pageNum)
  },
  methods: {
    getdata(){
      let parame = {
        "storeName": this.form.storeName,
        // "commodityName": this.form.commodityName,
        "pageNum": this.pageNum,
        "pageSize": this.pageSize
      }
      this.tabledata = []
      httpreques('post', parame, '/realbrand-management-service/CommodityMgt/ReceiptStatisticsList').then(res => {
        console.log(res)
        if(res.data.code === "SUCCESS"){
          let data = res.data.data
          this.totalNum = res.data.total
          this.total = res.data.total
          data.forEach((item) => {
            item.scanTime = moment(item.scanTime).format(
              "YYYY-MM-DD HH:mm:ss"
            );
          });
          for(let i = 0; i < data.length; i++){
            this.tabledata.push({
              index: i+1,
              barCode: data[i].barCode,
              brandName: data[i].brandName,
              commodityCode: data[i].commodityCode,
              commodityName: data[i].commodityName,
              filePath: data[i].filePath,
              id: data[i].id,
              quantity: data[i].quantity,
              policyNo: data[i].policyNo,
              price: data[i].price,
              specsParameter: data[i].specsParameter,
              receiptName: data[i].receiptName,
              scanTime: data[i].scanTime,
              receiptName: data[i].receiptName
            })
          }
          this.tabledata.reverse()
        }else{
          this.$message(res.data.msg)
        }
      })
    },
    changeStatistics(){
      this.getdata(this.pageNum)
    },
    handleSelectionChange(val){
      this.multipleSelection = val
    },
    currentchange(val){
      this.pageNum = val
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
    scan(){
      this.centerDialogVisible = true
    },
    goBack(){
        this.$router.go(-1)
    },
    submitForm(){
      this.getdata(this.pageNum)
    },
    resetForm(){
      this.form = {}
    }
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/reset';
@import '@/assets/css/image1'
</style>
