<template>
  <div class="tab">
    <div class="tab-title">
      <div class="left">
        <div class="print" @click="addMachine"><img class="icon" src="../../assets/images/add.png" alt=""><span class="axis">新增机具</span></div>
        <div class="print" @click="addMachine('1')"><img class="icon" src="../../assets/images/edit.png" alt=""><span class="axis">编辑机具</span></div>
        <div class="print" @click="delMachine"><img class="icon" src="../../assets/images/delete.png" alt=""><span class="axis">删除机具</span></div>
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
        <el-table-column label="机具编码（MEID）" align="center" sortable width="200">
          <template v-slot="scope">
            <span class="detail-info" @click="addMachine('2', scope.row)">{{scope.row.meid}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="machinecode" label="机具型号" align="center" sortable width="150"></el-table-column>
        <el-table-column prop="name" label="机具名称" align="center" sortable width="160"></el-table-column>
        <el-table-column prop="frontId" label="机具供应商" sortable width="150"></el-table-column>
        <el-table-column prop="storeName" label="所属门店" sortable width="160" ></el-table-column>
        <el-table-column prop="address" label="门店地址" sortable width="300"></el-table-column>
        <el-table-column prop="imgs" label="机具图片" sortable width="150">
          <template v-slot="scope">
            <img :src="scope.row.filePath" alt="" style="height: 20px;">
          </template>
        </el-table-column>
        <el-table-column prop="bindingTime" label="启用时间" align="center"  sortable width="200" ></el-table-column>
        <el-table-column prop="status" label="状态" align="center"  sortable width="123" ></el-table-column>
      </el-table>
    </div>
    <div class="bot">
      <Page :total="total" :current="pageNum" :pageSize="pageSize" @changeCurrentPage="changeCurrentPage"></Page>
    </div>
    <div class="inp-bot">
      <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="input-with-select">
        <el-form-item label="机具编号:" prop="meid" class="name-search">
          <el-input v-model="ruleForm.meid" placeholder="请输入机具编号"></el-input>
        </el-form-item>
        <el-form-item label="机具型号:" prop="type">
          <el-input v-model="ruleForm.type" placeholder="请输入机具型号"></el-input>
        </el-form-item>
        <el-form-item label="机具名称:" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请输入机具名称"></el-input>
        </el-form-item>
        <el-form-item label="机具供应商:" prop="gongying">
          <el-input v-model="ruleForm.gongying" placeholder="请输入机具供应商"></el-input>
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
      totalNum: 0,
      filePath:"",
      ruleForm: {
          meid: '',
          storeName: '',
          name: '',
          type: '',
          gongying: ''
      },
      multipleSelection : [],
    };
  },
  created() {
   // if(localStorage.getItem("loginuser")) this.idNumber = JSON.parse(localStorage.getItem("loginuser")).userDetails.idNumber
    this.getdata();
  },
  methods: {
    //机具列表
    getdata() {
      this.tabledata = [];
      httpreques(
        "post",
        {
          meid: this.ruleForm.meid,
          storeName: this.ruleForm.storeName,
          pageNum: this.pageNum,
          pageSize: this.pageSize,
        },
        "/realbrand-management-service/EquipmentMgt/EquipmentList"
      ).then((res) => {
        console.log(res);
        let { data } = res.data;
        this.total = res.data.data? res.data.total:0
        data.forEach((item) => {
          item.bindingTime = moment(item.bindingTime).format(
            "YYYY-MM-DD HH:mm:ss"
          );
        });
        res.data.data.forEach((item,key) => {
          item.index = key + 1; //加入index
          let address = item.province + item.city + item.county;
          item.address = address + item.address;
        })
        this.tabledata = res.data.data
        this.tabledata.reverse();
      });
    },
    //删除单个机具
    delMachine() {
      if(this.multipleSelection.length <= 0) return this.$message.error('请选择需要删除的机具')
      let meid = []
      _.forEach(
        JSON.parse(JSON.stringify(this.multipleSelection)),
        function (item, key) {
          meid.push(item.meid);
        }
      )
          httpreques(
            "post",
            {
              meid: meid,
            },
            "/realbrand-management-service/EquipmentMgt/DeleteEquipment"
          ).then((result) => {
            console.log(result);
            if (result.status && result.data.data === 1) {
              this.$message.success("删除机具成功!");
              this.getdata()
              // this.tabledata.splice(index, 1);
            }
          })
    },
    // 新增机具
    addMachine(val, data) {
      if(val){
        let meid = ''
        if(data){
          meid = data.meid
        }else{
          if(this.multipleSelection.length != 1) return this.$message('请选择一项需要编辑的机具')
          meid = this.multipleSelection[0].meid
        }
        this.$router.push({
          path: "/setting/machinenew",
          query: {
            meid: meid,
          },
        });
      } else{
        this.$router.push({path: "/setting/machinenew"});
      }
    },
    submitForm(){
      this.getdata()
    },
    resetForm(){
      this.ruleForm = {}
    },
    handleSelectionChange(val){
      this.multipleSelection = val
    },
    changeCurrentPage(val) {
      this.pageNum = val
      this.getdata();
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
