<template>
  <div class="tab">
    <div class="tab-title">
      <div class="left">
        <div class="print" @click="addStore"><img class="icon" src="../../assets/images/ic-打印列表.png" alt=""><span class="axis">新增门店</span></div>
        <div class="print" @click="editstore(scope.row.storeName)"><img class="icon" src="../../assets/images/ic-打印列表.png" alt=""><span class="axis">编辑门店</span></div>
        <div class="print" @click="delstore(scope.row.storeName)"><img class="icon" src="../../assets/images/ic-打印列表.png" alt=""><span class="axis">删除门店</span></div>
        <div class="print"><img class="icon" src="../../assets/images/ic-打印列表.png" alt=""><span class="axis">打印列表</span></div>
        <div class="print" @click="exportExcel"><img class="icon" src="../../assets/images/ic-导出表格.png" alt=""><span class="axis">导出表格</span></div>
      </div>
      <div class="right">
        <div class="setup">
          <img class="set" src="../../assets/images/ic-设置.png" alt="系统设置" @click="setup">
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
      @current-change="handleCurrentChange"
      :default-sort="{ prop: 'date', order: 'descending' }"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="index" label="序号" align="center" sortable width="80"></el-table-column>
        <el-table-column prop="orgCode" label="门店机构代码" align="center" sortable width="220"></el-table-column>
        <el-table-column prop="storeName" label="门店名称" align="center" sortable width="280"></el-table-column>
        <el-table-column prop="address" label="门店地址" align="center" sortable width="400"></el-table-column>
        <el-table-column prop="store_type" label="门店类别" align="center" sortable width="150"></el-table-column>
        <el-table-column prop="storeLicence" label="门店许可证" align="center"  sortable width="240" ></el-table-column>
      </el-table>
    </div>
    <div class="bot">
      <el-pagination layout=" prev, pager, next ,total" :total="total" :page-size="pageSize" @current-change="currentchange"></el-pagination>
    </div>
    <div class="inp-bot">
      <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="input-with-select">
        <el-form-item label="门店名称:" prop="name" class="name-search">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="门店类型:" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        
        <el-form-item>
          <el-button class="a" type="primary" @click="submitForm('ruleForm')">查询</el-button>
          <el-button class="a" type="primary" @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import httpreques from '../../utils/httpreques';

export default {
  name: "tab",
  data() {
    return {
      total: 0,
      pageSize: 15,
      pageNum: 1,
      tabledata: [],
      totalNum: 0,
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
    };
  },
  created() {
    this.getdata()
  },
  methods: {
    getdata(){
      let t = this;
      let params = {
        "storeName": "",
        "pageNum": this.pageNum,
        "pageSize": this.pageSize,
      };
      this.tabledata = []
      httpreques(
        "post",
        params,
        "/realbrand-management-service/StoreMgt/StoreInfoList"
      ).then((res) => {
        if (res.data.code == "SUCCESS") {
       
          res.data.data.forEach((item,key) => {
             item.index = key + 1; //加入index
            let address = item.province + item.city + item.county;
            item.address = address + item.address;
          });
          t.tabledata = res.data.data;
          t.total= res.data.total;
        } else {
          this.$message(res.data.msg)
        }
      });
    },
    addStore() {
      let t = this;
      t.$router.push({ path: "/setting/newstoretwo" });
    },
    delstore(storename) {
      let t = this;
      let params = {
        storeName: storename,
      };
      httpreques(
        "post",
        params,
        "/realbrand-management-service/StoreMgt/DeleteStore"
      ).then((res) => {
        if (res.data.code == "SUCCESS") {
          t.$message({
            message: "删除成功",
            type: "success",
          });
          t.getdata();
        } else {
          //接口错误处理
          t.$message.error(res.data.msg);
        }
      });
    },
    editstore(storename) {
      let t = this;
      t.$router.push({
        path: "/setting/newstore",
        query: {
          storename: storename,
        },
      });
    },
    handleCurrentChange(val){
      // this.pageNum = val
      // this.getdata()
    },
    currentchange(val){
      this.pageNum = val
      this.getdata()
    },
    handleCurrentChange(val){
      
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
      }
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/css/reset.scss'
</style>
