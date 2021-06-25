<template>
  <div class="tab">
    <div class="tab-title">
      <div class="left">
        <div class="print" @click="addMachine"><img class="icon" src="../../../assets/images/add.png" alt=""><span class="axis">添加佣金规则</span></div>
        <div class="print" @click="delMachine"><img class="icon" src="../../../assets/images/delete.png" alt=""><span class="axis">删除规则</span></div>
        <div class="print"><img class="icon" src="../../../assets/images/print.png" alt=""><span class="axis">打印列表</span></div>
        <div class="print" @click="exportExcel"><img class="icon" src="../../../assets/images/derive.png" alt=""><span class="axis">导出表格</span></div>
      </div>
      <div class="right">
        <div class="setup">
          <img class="set" src="../../../assets/images/ic-设置.png" alt="系统设置" @click="setup">
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
        <el-table-column prop="commodityCode" label="规则编号" align="center" sortable width="130"></el-table-column>
        <el-table-column prop="barcode" label="经销商" align="center" sortable width="240"></el-table-column>
        <el-table-column prop="commodityName" label="开户银行" sortable width="140"></el-table-column>
        <el-table-column prop="brandName" label="开卡类型" sortable width="140"></el-table-column>
        <el-table-column prop="manufacturer" label="开户佣金(元)" sortable width="140"></el-table-column>
        <el-table-column prop="manufacturer" label="凯华分佣比例(%)" sortable width="150"></el-table-column>
        <el-table-column prop="manufacturer" label="经销商分佣比例(%)" sortable width="160"></el-table-column>
        <el-table-column prop="manufacturer" label="门店分佣比例(%)" sortable width="150"></el-table-column>
        <el-table-column prop="manufacturer" label="店员分佣比例(%)" sortable width="150"></el-table-column>
        <el-table-column prop="manufacturer" label="规则有效时间" sortable width="180"></el-table-column>
      </el-table>
    </div>
    <div class="bot">
      <Page :total="total" :current="pageNum" :pageSize="pageSize" @changeCurrentPage="changeCurrentPage"></Page>
    </div>
    <div class="inp-bot">
      <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="input-with-select">
        <el-form-item label="主题活动编号:" prop="meid" class="name-search">
          <el-input v-model="ruleForm.meid"></el-input>
        </el-form-item>
        <el-form-item label="活动主题名称:" prop="type">
          <el-input v-model="ruleForm.type"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="a" type="primary" @click="submitForm">查询</el-button>
          <el-button class="a" type="primary" @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Page from '@/components/Pagination/page.vue'
import httpreques from '../../../utils/httpreques';
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
      tabledata: [],
      filePath:"",
      ruleForm: {
        a:"",
      },
      multipleSelection : [],
    };
  },
  created() {
    // this.getdata();
  },
  methods: {
    
    //主题活动列表
    // getdata() {
    //   this.tabledata = [];
    //   httpreques(
    //     "post",
    //     {
    //       meid: this.ruleForm.meid,
    //       storeName: this.ruleForm.storeName,
    //       pageNum: this.pageNum,
    //       pageSize: this.pageSize,
    //     },
    //     "/realbrand-management-service/EquipmentMgt/EquipmentList"
    //   ).then((res) => {
    //     console.log(res);
    //     let { data } = res.data;
    //     this.total = res.data.data? res.data.total:0
    //     data.forEach((item) => {
    //       item.bindingTime = moment(item.bindingTime).format(
    //         "YYYY-MM-DD HH:mm:ss"
    //       );
    //     });
    //     res.data.data.forEach((item,key) => {
    //       item.index = key + 1; //加入index
    //       let address = item.province + item.city + item.county;
    //       item.address = address + item.address;
    //     })
    //     this.tabledata = res.data.data
    //     this.tabledata.reverse();
    //   });
    // },

    changeCurrentPage(val) {
      this.pageNum = val
      this.getdata();
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../../assets/css/reset.scss';
@import "@/assets/css/image3.scss";
</style>
