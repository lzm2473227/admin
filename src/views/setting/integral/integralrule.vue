<template>
  <div class="tab">
    <div class="tab-title">
      <div class="left">
        <div class="print" @click="edit"><img class="icon" src="../../../assets/images/edit.png" alt=""><span class="axis">编辑规则</span></div>
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
        <el-table-column prop="index" label="序号" align="center" sortable width="80"></el-table-column>
        <el-table-column prop="ruleId" label="规则编号" align="center" sortable width="160"></el-table-column>
        <el-table-column prop="ruleName" label="规则名称" sortable width="180" show-overflow-tooltip></el-table-column>
        <el-table-column prop="ruleType" label="规则类型" sortable width="150"></el-table-column>
        <el-table-column prop="ruleDescribe" label="规则描述"  sortable width="320" show-overflow-tooltip></el-table-column>
        <el-table-column prop="validityPeriod" label="有效期/年" align="center" width="85" ></el-table-column>
      </el-table>
    </div>
    <div class="bot">
      <Page :total="total" :current="pageNum" :pageSize="pageSize" @changeCurrentPage="changeCurrentPage"></Page>
    </div>
  </div>
</template>

<script>
import Page from '@/components/Pagination/page.vue'
import httpreques from '../../../utils/httpreques';
export default {
  name: "Integralrule",
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
      },
      multipleSelection: []
    };
  },
  created() {
    this.getdata()
  },
  methods: {
    edit(){
      this.$router.push("newintegralrule")
    },
    getdata() {
      httpreques(
        "post",
        {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
        },
        "/realbrand-management-service/IntegralMgt/IntegralRuleList"
      ).then((res) => {
        // console.log(res.data.code);
        if (res.data.code == "SUCCESS") {
          _.forEach(res.data.data, function (item, key) {
            item.index = key + 1; //加入index
          });
          console.log(res.data)
          this.total = res.data.total;
          this.tabledata = res.data.data;
          // this.tabledata.reverse()
        } else {
          this.$message(res.data.msg);
        }
      });
    },
    handleSelectionChange(val){
      this.multipleSelection = val
      // console.log(this.multipleSelection);
      console.log(val);
    }, 
    changeCurrentPage(val){
      this.pageNum = val
      this.getdata()
    },
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
