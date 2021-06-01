<template>
  <div class="tab">
    <div class="tab-title">
      <div class="left">
        <div class="print" @click="addAdvert()"><img class="icon" src="../../assets/images/add.png" alt=""><span class="axis">新增广告</span></div>
        <div class="print" @click="editadvertment(scope.row.storeName)"><img class="icon" src="../../assets/images/edit.png" alt=""><span class="axis">编辑广告</span></div>
        <div class="print" @click="deladvertment(scope.row.storeName)"><img class="icon" src="../../assets/images/delete.png" alt=""><span class="axis">删除广告</span></div>
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
      @current-change="handleCurrentChange"
      :default-sort="{ prop: 'date', order: 'descending' }"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="index" label="序号" align="center" sortable width="80"></el-table-column>
        <el-table-column prop="advertisementNumber" label="广告编码" align="center" sortable width="230"></el-table-column>
        <el-table-column prop="advertisementName" label="广告名称" align="center" width="200"></el-table-column>
        <el-table-column prop="type" label="广告类型" align="center" width="200"></el-table-column>
        <el-table-column label="广告描述" align="center" sortable width="250">
          <template v-slot="scope">
            <img :src="scope.row.linkPosition" alt="" style="height: 20px;">
          </template>
        </el-table-column>
        <el-table-column prop="positionName" label="广告位置" align="center" width="170" ></el-table-column>
        <el-table-column prop="startTime" label="起始时间" align="center" sortable width="210" ></el-table-column>
        <el-table-column prop="endTime" label="截止时间" align="center" sortable width="210" ></el-table-column>
        <el-table-column label="状态" align="center"  sortable width="123" >
          <template #default="scope">
            <span v-if="scope.row.enableState == '0'">禁用</span>
            <span v-else>启用</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="bot">
      <Page :total="total" :current="pageNum" :pageSize="pageSize" @changeCurrentPage="changeCurrentPage"></Page>
    </div>
    <div class="inp-bot">
      <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="input-with-select">
        <el-form-item label="广告名称:" prop="name" class="name-search">
          <el-input v-model="ruleForm.name" placeholder="请输入广告名称"></el-input>
        </el-form-item>
        <el-form-item label="广告类型:" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请输入广告类型"></el-input>
        </el-form-item>
        <el-form-item label="广告位置:" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请输入广告位置"></el-input>
        </el-form-item>
        <el-form-item label="状态:" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请输入状态"></el-input>
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
import Page from '@/components/Pagination/page'
import httpreques from '../../utils/httpreques';
import moment from "moment";
import _ from "lodash";

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
    getdata() {
      let t = this;
      let params = {
        pageNum: t.pageNum,
        pageSize: t.pageSize,
      };
      httpreques(
        "post",
        params,
        "/realbrand-management-service/AdvertisementMgt/AdvertisementInfoList"
      ).then((res) => {
        console.log(res);
        if (res.data.code == "SUCCESS") {
          _.forEach(res.data.data, function (item, key) {
            item.startTime = moment(item.startTime).format(
              "YYYY-MM-DD HH:mm:ss"
            );
            item.endTime = moment(item.endTime).format("YYYY-MM-DD HH:mm:ss");
            item.index = key + 1;
            // console.log(item.enableState)
          });
          t.total = res.data.total;
          t.tabledata = res.data.data;
          t.tabledata.reverse()
        } else {
          //接口错误处理
          t.$message.error(res.data.msg);
        }
      });
    },
    addAdvert() {
      let t = this;
      t.$router.push({ path: "/setting/newadvertmenttwo" });
    },
    deladvertment(id) {
      let t = this;

      httpreques(
        "post",
        { id: id },
        "/realbrand-management-service/AdvertisementMgt/DeleteAdvertisement"
      ).then((res) => {
        if (res.data.code == "SUCCESS") {
          t.$message({
            message: "广告已删除",
            type: "success",
          });
          t.getdata();
        } else {
          //接口错误处理
          t.$message.error(res.data.msg);
        }
      });
    },
    editadvertment(id) {
      let t = this;
      t.$router.push({
        path: "/setting/newadvertment",
        query: {
          advertmentid: id,
        },
      });
    },
    //状态更改
    editstatus(stu, id) {
      let t = this;
      let params = {
        enableState: stu,
        id: id,
      };
      httpreques(
        "post",
        params,
        "/realbrand-management-service/AdvertisementMgt/EnableAdvertisement"
      ).then((res) => {
        if (res.data.code == "SUCCESS") {
          console.log(res);
          t.$message({
            message: stu == 0 ? "广告已禁用" : "广告已启用",
            type: "success",
          });
          t.getdata();
        } else {
          //接口错误处理
          t.$message.error(res.data.msg);
        }
      });
    },
    changeCurrentPage(val){
      this.pageNum = val
      this.getdata()
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
/deep/.el-table--small td{
  padding: 0;
}
@import '../../assets/css/reset.scss';
@import "@/assets/css/image2.scss";
</style>
