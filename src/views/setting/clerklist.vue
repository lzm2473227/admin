<template>
  <div class="tab">
    <div class="tab-title">
      <div class="left">
        <div class="print" @click="addclerk()">
          <img
            class="icon"
            src="../../assets/images/add.png"
            alt=""
          /><span class="axis">新增人员</span>
        </div>
        <div class="print" @click="editclerk">
          <img
            class="icon"
            src="../../assets/images/edit.png"
            alt=""
          /><span class="axis">编辑人员</span>
        </div>
        <div class="print" @click="delclerk">
          <img
            class="icon"
            src="../../assets/images/delete.png"
            alt=""
          /><span class="axis">删除人员</span>
        </div>
        <div class="print">
          <img
            class="icon"
            src="../../assets/images/print.png"
            alt=""
          /><span class="axis">打印列表</span>
        </div>
        <div class="print" @click="exportExcel">
          <img
            class="icon"
            src="../../assets/images/derive.png"
            alt=""
          /><span class="axis">导出表格</span>
        </div>
      </div>
      <div class="right">
        <div class="setup">
          <img
            class="set"
            src="../../assets/images/ic-设置.png"
            alt="系统设置"
            @click="setup"
          />
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
        <el-table-column
          type="selection"
          width="55"
          align="center"
        ></el-table-column>
        <el-table-column prop="index" label="序号" align="center" sortable width="80"></el-table-column>
        <el-table-column prop="idNumber" label="身份证号码" align="center" sortable width="230"></el-table-column>
        <el-table-column prop="name" label="姓名" align="center" sortable width="150"></el-table-column>
        <el-table-column
          prop="telNum"
          label="手机号码"
          align="center"
          sortable
          width="160"
        ></el-table-column>
        <el-table-column
          label="证件照"
          align="center"
          sortable
          width="160"
        >
        <template v-slot="scope">
            <img :src="scope.row.frontId" alt="" style="height: 20px;">
            <img :src="scope.row.reverseId" alt="" style="height: 20px;">
          </template>
        </el-table-column>
        <el-table-column
          prop="storeName"
          label="所属门店"
          sortable
          width="320"
        ></el-table-column>
        <el-table-column
          prop="station"
          label="角色"
          align="center"
          sortable
          width="150"
        ></el-table-column>
        <el-table-column
          prop="storeName"
          label="市级经销商"
          align="center"
          sortable
          width="210"
        ></el-table-column>
        <el-table-column
          prop="storeName"
          label="省级经销商"
          align="center"
          sortable
          width="213"
        ></el-table-column>
      </el-table>
    </div>
    <div class="bot">
      <Page :total="total" :current="pageNum" :pageSize="pageSize" @changeCurrentPage="changeCurrentPage"></Page>
    </div>
    <div class="inp-bot">
      <el-form
        :inline="true"
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="input-with-select"
      >
        <el-form-item label="姓名:" prop="name" class="name-search">
          <el-input v-model="ruleForm.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="手机号码:" prop="tel">
          <el-input v-model="ruleForm.tel" placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <el-form-item label="角色:" prop="station">
          <el-input v-model="ruleForm.station" placeholder="请输入角色"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="a" type="primary" @click="submitForm"
            >查询</el-button
          >
          <el-button class="a" type="primary" @click="resetForm"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Page from '@/components/Pagination/page'
import httpreques from "../../utils/httpreques";

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
      tabs: ["当日", "当周", "当月"],
      active: 0,
      radio1: "按商品69编码统计",
      textarea: "",
      tabledata: [],
      totalNum: 0,
      multipleSelection: [],
      ruleForm: {
        name: "",
        tel: "",
        station: ""
      },
    };
  },
  created() {
    this.getdata();
  },
  methods: {
    //店员列表
    getdata() {
      this.tabledata = [];
      httpreques(
        "post",
        {
          name: this.ruleForm.name,
          pageNum: this.pageNum,
          pageSize: this.pageSize,
        },
        "/realbrand-management-service/StoreUserMgt/StoreUserList"
      ).then((res) => {
        console.log(res);
        if ((res.data.code = "SUCCESS")) {
          let { data } = res.data;
          this.total = res.data.total;
          // this.pages = res.data.pages;
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
        } else {
          this.$message(res.data.msg);
        }
      });
    },
    // 查询
    submitForm(){
      this.getdata()
    },
    // 重置
    resetForm(){
      this.ruleForm = {}
    },
    //删除
    delclerk() {
      if(this.multipleSelection.length <= 0) return this.$message.error('请选择需要删除的人员')
      let idNumber = []
      _.forEach(
        JSON.parse(JSON.stringify(this.multipleSelection)),
        function (item, key) {
          idNumber.push(item.idNumber);
        }
      )
        httpreques(
          "post",
          {
            idNumber: idNumber,
          },
          "/realbrand-management-service/StoreUserMgt/DeleteStoreUser"
        ).then((result) => {
          console.log(result);
          if (result.data.code === "SUCCESS") {
            this.$message.success("删除员工成功!");
            this.getdata()
            // this.tabledata.splice(index, 1);
          } else {
            this.$message.error("删除员工失败");
          }
        })
    },
    addclerk() {
      this.$router.push({path: "/setting/newclerktwo",})
    },
    //编辑
    editclerk() {
      if(this.multipleSelection.length === 1){
        let idNumber = this.multipleSelection[0].idNumber
        this.$router.push({
          path: "/setting/newclerktwo",
          query: { idNumber: idNumber },
        })
      }else{
        this.$message('请选择一项数据进行编辑')
      }
    },
    changeCurrentPage(val) {
      this.pageNum = val;
      this.getdata();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //添加class样式
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 0) {
        return "warning-row";
      }
      return "";
    },
    formatter(row, column) {
      return row.address;
    },
    handleCurrentChange(val) {
      this.currentRow = val;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/reset.scss";
@import "@/assets/css/image2.scss";
</style>
