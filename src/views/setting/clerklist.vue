<template>
  <div class="tab">
    <div class="tab-title">
      <div class="left">
        <div class="print" @click="addclerk()"><img class="icon" src="../../assets/images/ic-打印列表.png" alt=""><span class="axis">新增人员</span></div>
        <div class="print" @click="editclerk(scope.row.storeName)"><img class="icon" src="../../assets/images/ic-打印列表.png" alt=""><span class="axis">编辑人员</span></div>
        <div class="print" @click="delclerk(scope.row.storeName)"><img class="icon" src="../../assets/images/ic-打印列表.png" alt=""><span class="axis">删除人员</span></div>
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
        <el-table-column prop="idNumber" label="身份证号码" align="center" sortable width="230"></el-table-column>
        <el-table-column prop="name" label="姓名" align="center" sortable width="150"></el-table-column>
        <el-table-column prop="telNum" label="手机号码" align="center" sortable width="160"></el-table-column>
        <el-table-column prop="frontId" label="证件照" align="center" sortable width="160"></el-table-column>
        <el-table-column prop="storeName" label="所属门店" align="center"  sortable width="240" ></el-table-column>
        <el-table-column prop="station" label="角色" align="center"  sortable width="150" ></el-table-column>
        <el-table-column prop="storeName" label="市级经销商" align="center"  sortable width="200" ></el-table-column>
        <el-table-column prop="storeName" label="省级经销商" align="center"  sortable width="200" ></el-table-column>
      </el-table>
    </div>
    <div class="bot">
      <el-pagination layout=" prev, pager, next ,total" :total="total" :page-size="pageSize" @current-change="currentchange"></el-pagination>
    </div>
    <div class="inp-bot">
      <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="input-with-select">
        <el-form-item label="姓名:" prop="name" class="name-search">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="手机号码:" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="角色:" prop="name">
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
      tabs: ['当日', '当周', '当月'],
      active: 0,
      radio1: '按商品69编码统计',
      textarea: '',
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
    this.getdata(this.pageNum)
  },
  methods: {
    //店员列表
    getdata() {
      this.tabledata = [];
      httpreques(
        "post",
        {
          name: "",
          pageNum: this.pageNum,
          pageSize: this.pageSize,
        },
        "/realbrand-management-service/StoreUserMgt/StoreUserList"
      ).then((res) => {
        console.log(res);
        if ((res.data.code = "SUCCESS")) {
          let { data } = res.data;
          this.total = res.data.total;
          this.pages = res.data.pages;
          // this.tabledata = res.data.data;
          console.log(data);
          for (let i = 0; i < data.length; i++) {
            this.tabledata.push({
              index: i + 1,
              idNumber: data[i].idNumber,
              name: data[i].name,
              telNum: data[i].telNum,
              station: data[i].station,
              frontId: data[i].frontId,
              reverseId: data[i].reverseId,
              storeName: data[i].storeName,
            });
          }
          this.tabledata.reverse();
        }else{
          this.$message(res.data.msg)
        }
      });
    },
    //删除
    delclerk(index, idNumber) {
      this.$confirm("此操作将永久删除该条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        httpreques(
          "post",
          {
            isDelete: 1
          },
          "/realbrand-management-service/StoreUserMgt/DeleteStoreUser"
        ).then((result) => {
          console.log(result);
          if (result.data.code === "SUCCESS") {
            this.$message.success("删除员工成功!");
            this.tabledata.splice(index, 1);
          } else {
            this.$message.error("删除员工失败");
          }
        });
      });
    },
    addclerk(idNumber) {
      if (idNumber) {
        this.$router.push({
          path: "/setting/newclerktwo",
          query: { idNumber: idNumber },
        });
      } else {
        this.$router.push({
          path: "/setting/newclerktwo",
        });
      }
    },
    //编辑
    editclerk(){

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
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/css/reset.scss'
</style>
