<template>
  <div class="tab">
    <div class="tab-title">
      <div class="left">
        <div class="print" @click="edit"><img class="icon" src="../../../assets/images/edit.png" alt=""><span class="axis">积分明细</span></div>
        <div class="print"><img class="icon" src="../../../assets/images/print.png" alt=""><span class="axis">打印列表</span></div>
        <div class="print" @click="exportExcel"><img class="icon" src="../../../assets/images/derive.png" alt=""><span class="axis">导出表格</span></div>
      </div>
      <div class="right">
        <div class="setup">
          <img class="set" src="../../../assets/images/ic-设置.png" alt="系统设置" @click="setup">
        </div>
      </div>
    </div>
    <div class="tab-body inside-table">
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
        <el-table-column prop="orgCode" label="消费者编码" align="center" sortable width="180"></el-table-column>
        <el-table-column prop="storeName" label="用户昵称" sortable width="150"></el-table-column>
        <el-table-column prop="address" label="手机号" sortable width="160"></el-table-column>
        <el-table-column prop="storeType" label="联系地址" sortable width="220" show-overflow-tooltip></el-table-column>
        <el-table-column prop="storeType" label="消费者来源" align="center" sortable width="120"></el-table-column>
        <el-table-column prop="storeType" label="入会时间" align="center" sortable width="160"></el-table-column>
        <el-table-column prop="storeType" label="性别" align="center" sortable width="90"></el-table-column>
        <el-table-column prop="storeType" label="积分余额" align="center" sortable width="110"></el-table-column>
        <el-table-column prop="storeType" label="会员等级" align="center" sortable width="110"></el-table-column>
        <el-table-column label="" align="center" width="300" ></el-table-column>
      </el-table>
    </div>
    <div class="bot">
      <Page :total="total" :current="pageNum" :pageSize="pageSize" @changeCurrentPage="changeCurrentPage"></Page>
    </div>
    <div class="inp-bot">
      <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="input-with-select">
        <div class="search-item">
          <el-input v-model="ruleForm.name" placeholder="请输入昵称"></el-input>
        </div>
        <el-form-item label="手机号码" prop="storeName" class="name-search">
          <el-input v-model="ruleForm.storeName" placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="ruleForm.sex" placeholder="请选择性别">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="注册来源" prop="source">
          <el-select v-model="ruleForm.source" placeholder="请选择注册来源">
            <el-option label="app" value="app"></el-option>
            <el-option label="扫码" value="扫码"></el-option>
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
import httpreques from '../../../utils/httpreques';
export default {
  name: "Integralobj",
  components: {
    Page
  },
  data() {
    return {
      total: 0,
      pageSize: 20,
      pageNum: 1,
      tabledata: [],
      totalNum: 0,
      dialogImageUrl:"",
      ruleForm: {
          storeName: '',
          storeType: '',
          sex: '',
          source: '',
      },
      multipleSelection: []
    };
  },
  created() {
    // this.getdata()
  },
  methods: {
    edit(){
      this.$router.push("newintegralobj")
    }
  },
};
</script>

<style lang="scss" scoped>
@import '../../../assets/css/reset.scss';
@import "@/assets/css/image3.scss";
/deep/.tab-body{
  height: 676px;
}
/deep/.inside-table .el-table .el-table__header th{
  padding: 5px 0;
}
/deep/.inside-table .el-table .el-table__body td{
  padding: 2px 0;
}
</style>
