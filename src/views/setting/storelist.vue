<template>
  <div class="tab">
    <div class="tab-title">
      <div class="left">
        <div class="print" @click="addStore"><img class="icon" src="../../assets/images/add.png" alt=""><span class="axis">新增门店</span></div>
        <div class="print" @click="editstore"><img class="icon" src="../../assets/images/edit.png" alt=""><span class="axis">编辑门店</span></div>
        <div class="print" @click="delstore"><img class="icon" src="../../assets/images/delete.png" alt=""><span class="axis">删除门店</span></div>
        <div class="print"><img class="icon" src="../../assets/images/print.png" alt=""><span class="axis">打印列表</span></div>
        <div class="print" @click="exportExcel"><img class="icon" src="../../assets/images/derive.png" alt=""><span class="axis">导出表格</span></div>
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
      @selection-change="handleSelectionChange"
      :default-sort="{ prop: 'date', order: 'descending' }"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="index" label="序号" align="center" sortable width="80"></el-table-column>
        <el-table-column prop="orgCode" label="门店机构代码" align="center" sortable width="330"></el-table-column>
        <el-table-column prop="storeName" label="门店名称" sortable width="350"></el-table-column>
        <el-table-column prop="address" label="门店地址" sortable width="480"></el-table-column>
        <el-table-column prop="storeType" label="门店类别" align="center" sortable width="190"></el-table-column>
        <el-table-column label="门店许可证" align="center" width="243" >
          <template v-slot="scope">
            <img :src="scope.row.storeLicence" alt="" style="height: 20px;">
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="bot">
      <Page :total="total" :current="pageNum" :pageSize="pageSize" @changeCurrentPage="changeCurrentPage"></Page>
      <!-- <el-pagination layout=" prev, pager, next ,total" :total="total" :page-size="pageSize" @current-change="currentchange"></el-pagination> -->
    </div>
    <div class="inp-bot">
      <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="input-with-select">
        <el-form-item label="门店名称:" prop="storeName" class="name-search">
          <el-input v-model="ruleForm.storeName" placeholder="请输入门店名称"></el-input>
        </el-form-item>
        <el-form-item label="门店类别:" prop="name">
          <el-select v-model="ruleForm.storeType" placeholder="请选择门店类别">
            <el-option label="直营" value="直营">直营</el-option>
            <el-option label="加盟" value="加盟">加盟</el-option>
          </el-select>
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
import httpreques from '../../utils/httpreques';
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
      totalNum: 0,
      dialogImageUrl:"",
      ruleForm: {
          storeName: '',
          storeType: ''
      },
      multipleSelection: []
    };
  },
  created() {
    this.getdata()
  },
  methods: {
    getdata(){
      let t = this;
      let params = {
        "storeName": this.ruleForm.storeName,
        "storeType": this.ruleForm.storeType,
        "pageNum": this.pageNum,
        "pageSize": this.pageSize,
      };
      this.tabledata = []
      httpreques(
        "post",
        params,
        "/realbrand-management-service/StoreMgt/StoreInfoList"
      ).then((res) => {
        // console.log(res);
        if (res.data.code === "SUCCESS") {
          res.data.data.forEach((item,key) => {
             item.index = key + 1; //加入index
            let address = item.province + item.city + item.county;
            item.address = address + item.address;
          });
          t.tabledata = res.data.data;
          t.total= res.data.total;
          t.tabledata.reverse()
        } else {
          this.$message(res.data.msg)
        }
      });
    },
    // 搜索
    submitForm(){
      this.getdata()
    },
    // 重置
    resetForm(){
      this.ruleForm = {}
    },
    addStore() {
      this.$router.push({ path: "/setting/newstore" });
    },
    delstore() {
      if(this.multipleSelection.length <= 0) return this.$message.error({message: '请选择需要删除的门店'})
      let t = this;
      let storeName = []
      _.forEach(
        JSON.parse(JSON.stringify(this.multipleSelection)),
        function (item, key) {
          storeName.push(item.storeName);
        }
      )
      let params = {
        storeName: storeName,
      };
      httpreques(
        "post",
        params,
        "/realbrand-management-service/StoreMgt/DeleteStore"
      ).then((res) => {
        if (res.data.code === "SUCCESS") {
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
    editstore() {
      if(this.multipleSelection.length !== 1) return this.$message('请选择一个需要编辑的门店')
      let storename = this.multipleSelection[0].storeName
      this.$router.push({
        path: "/setting/newstore",
        query: {
          storename: storename,
        },
      });
    },
    changeCurrentPage(val){
      this.pageNum = val
      this.getdata()
    },
    handleSelectionChange(val){
      this.multipleSelection = val
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
    }
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/css/reset.scss';
@import "@/assets/css/image2.scss";
</style>
