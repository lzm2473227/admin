<template>
  <div class="tab">
    <div class="tab-title">
      <div class="left">
        <div class="print" @click="delstore"><img class="icon" src="../../assets/images/delete.png" alt=""><span class="axis">删除人员</span></div>
        <div class="print"><img class="icon" src="../../assets/images/print.png" alt=""><span class="axis">打印列表</span></div>
        <div class="print" @click="exportExcel"><img class="icon" src="../../assets/images/derive.png" alt=""><span class="axis">导出表格</span></div>
      </div>
      <div class="right">
        <div class="setup">
          <img class="set" src="../../assets/images/ic-设置.png" alt="系统设置" @click="setup">
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
        <el-table-column prop="index" label="序号" align="center" sortable width="70"></el-table-column>
        <el-table-column label="消费者编码" align="center" sortable width="130">
          <template v-slot="scope">
            <span class="detail-info" @click="editstore(scope.row)">{{scope.row.orgCode}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="storeName" label="身份证号码" sortable width="190" show-overflow-tooltip></el-table-column>
        <el-table-column prop="address" label="真实姓名" sortable width="130" show-overflow-tooltip></el-table-column>
        <el-table-column prop="storeType" label="用户昵称" align="center" sortable width="130"></el-table-column>
        <el-table-column prop="1" label="手机号" align="center" sortable width="130"></el-table-column>
        <el-table-column prop="2" label="联系地址" align="center" sortable width="205" show-overflow-tooltip></el-table-column>
        <el-table-column prop="3" label="消费者来源" align="center" sortable width="110"></el-table-column>
        <el-table-column prop="4" label="开户门店" align="center" sortable width="150" show-overflow-tooltip></el-table-column>
        <el-table-column prop="5" label="门店地址" align="center" sortable width="210" show-overflow-tooltip></el-table-column>
        <el-table-column prop="6" label="入会时间" align="center" sortable width="150"></el-table-column>
        <el-table-column prop="7" label="状态" align="center" sortable width="80"></el-table-column>
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
            <el-option label="直营店" value="直营店">直营店</el-option>
            <el-option label="加盟店" value="加盟店">加盟店</el-option>
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
          storeType: ''
      },
      multipleSelection: []
    };
  },
  created() {
  },
  methods: {
  
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/css/reset.scss';
@import "@/assets/css/image2.scss";
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
