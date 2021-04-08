<template>
  <div class="tab">
    <div class="tab-title">
      <div class="left">
        <div class="print" @click="addMachine()"><img class="icon" src="../../assets/images/ic-打印列表.png" alt=""><span class="axis">新增机具</span></div>
        <div class="print" @click="editMachine(scope.row.storeName)"><img class="icon" src="../../assets/images/ic-打印列表.png" alt=""><span class="axis">编辑机具</span></div>
        <div class="print" @click="delMachine(scope.row.storeName)"><img class="icon" src="../../assets/images/ic-打印列表.png" alt=""><span class="axis">删除机具</span></div>
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
        <el-table-column prop="meid" label="机具编码（MEID）" align="center" sortable width="230"></el-table-column>
        <el-table-column prop="machinecode" label="机具型号" align="center" sortable width="150"></el-table-column>
        <el-table-column prop="name" label="机具名称" align="center" sortable width="160"></el-table-column>
        <el-table-column prop="frontId" label="机具供应商" align="center" sortable width="160"></el-table-column>
        <el-table-column prop="storeName" label="所属门店" align="center"  sortable width="240" ></el-table-column>
        <el-table-column prop="station" label="门店地址" align="center" width="150" ></el-table-column>
        <el-table-column prop="bindingTime" label="启用时间" align="center"  sortable width="200" ></el-table-column>
        <el-table-column prop="status" label="状态" align="center"  sortable width="200" ></el-table-column>
      </el-table>
    </div>
    <div class="bot">
      <el-pagination layout=" prev, pager, next ,total" :total="total" :page-size="pageSize" @current-change="currentchange"></el-pagination>
    </div>
    <div class="inp-bot">
      <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="input-with-select">
        <el-form-item label="机具编号:" prop="name" class="name-search">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="机具型号:" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="机具名称:" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="机具供应商:" prop="name">
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
import moment from "moment";

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
   // if(localStorage.getItem("loginuser")) this.idNumber = JSON.parse(localStorage.getItem("loginuser")).userDetails.idNumber
    this.getdata();
  },
  methods: {
    currentchange(val) {
      this.pageNum = val
      this.getdata();
    },
    //机具列表
    getdata() {
      this.tabledata = [];
      httpreques(
        "post",
        {
          meid: "",
          storeName: "",
          pageNum: this.pageNum,
          pageSize: this.pageSize,
        },
        "/realbrand-management-service/EquipmentMgt/EquipmentList"
      ).then((res) => {
        console.log(res);
        let { data } = res.data;
        this.total = res.data.data? res.data.total:0;
        console.log(res.data);
        data.forEach((item) => {
          item.bindingTime = moment(item.bindingTime).format(
            "YYYY-MM-DD HH:mm:ss"
          );
        });
        for (let i = 0; i < data.length; i++) {
          this.tabledata.push({
            index: i+1,
            meid: data[i].meid,
            machinecode: "-",
            name: "-",
            storeName: data[i].storeName,
            idNumber: data[i].idNumber,
            status: "-",
            bindingTime: data[i].bindingTime,
          });
        }
        this.tabledata.reverse();
      });
    },
    //删除单个机具
    delMachine(index, meid) {
      this.$confirm("此操作将永久删除该条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
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
              this.tabledata.splice(index, 1);
              console.log(index);
            }
          });
        })
    },
    //点击触发新增机具
    addMachine() {
      if (this.index === "1") {
        // 新增机具
        httpreques(
          "post",
          {
            meid: this.ruleForm.name,
            storeName: this.ruleForm.affiliation,
          },
          "/realbrand-management-service/EquipmentMgt/BindingEquipment"
        ).then((result) => {
          console.log(result);
          if (result.status && result.data.data === 1) {
            this.centerDialogVisible = false;
            this.$message.success("新增机具成功");
            this.getdata();
          } else {
            this.$message.error("新增机具失败");
          }
        });
      }
      if (this.index === "2") {
        // 编辑机具
        httpreques(
          "post",
          {
            meid: this.ruleForm.name,
            storeName: this.ruleForm.affiliation,
          },
          "/realbrand-management-service/EquipmentMgt/UpdateEquipment"
        ).then((result) => {
          if (result.status && result.data.data === 1) {
            this.centerDialogVisible = false;
            this.getdata(); //更新后刷新页面
            this.$message.success("更新机具成功");
            // console.log(result);
          } else {
            this.$message.error("更新机具失败");
          }
        });
      }
    },
    editMachine(index, val) {
      this.index = index; // 判断是新增还是编辑机具
      this.centerDialogVisible = true;
      this.StoreNameList(); //点击新增获取门店名称列表
      if (index === "1") {
        this.ruleForm = {
          name: "",
        };
      } else {
        this.ruleForm = {
          name: val.meid,
          machinecode: val.machinecode,
          affiliation: val.storeName,
        };
      }
    },
    //获取店名列表
    StoreNameList() {
      httpreques(
        "post",
        {
          idNumber: this.idNumber,
        },
        "/realbrand-management-service/StoreMgt/StoreNameList"
      ).then((result) => {
        console.log(result);
        if (result.data.code == "SUCCESS") {
          this.storeNameItemList = result.data.data.storeNameItemList;
        } else {
          this.$message.error(result.data.msg);
        }
      });
    },
    handleCurrentChange(val){
      // this.pageNum = val
      // this.getdata()
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
