<template>
  <div class="tab">
    <div class="tab-title">
      <div class="left">
        <div class="print" @click="scan"><img class="icon" src="@/assets/images/add.png" alt=""><span class="axis">新增单位</span></div>
        <div class="print"><img class="icon" src="@/assets/images/delete.png" alt=""><span class="axis">删除单位</span></div>
        <div class="print"><img class="icon" src="@/assets/images/print.png" alt=""><span class="axis">打印列表</span></div>
        <div class="print" @click="exportExcel"><img class="icon" src="@/assets/images/derive.png" alt=""><span class="axis">导出表格</span></div>
      </div>
      <div class="right">
        <div class="setup">
          <img class="set" src="@/assets/images/ic-设置.png" alt="系统设置" @click="setup">
        </div>
      </div>
    </div>
    <div class="storelist">
      <el-table
        border
        :data="enterpriseItemList"
        stripe="true"
        header-cell-style="background:#f6faff"
        style="width: 100%"
         :default-sort="{ prop: 'index', order: 'descending' }" 
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="index" label="序号" align="center" width="50">
        </el-table-column>
        <el-table-column prop="2" align="center" label="机构代码" width="150">
        </el-table-column>
        <el-table-column prop="enterpriseName" align="center" label="单位名称" width="150">
        </el-table-column>
        <el-table-column prop="city" align="center" label="单位地址" width="150">
        </el-table-column>
        <el-table-column prop="1" align="center" label="法人代表" width="150">
        </el-table-column>
        <el-table-column prop="legalPerson" align="center" label="代理人" width="150">
        </el-table-column>
        <el-table-column prop="1" align="center" label="代理人身份证号" width="150">
        </el-table-column>
        <el-table-column prop="userMobile" align="center" label="代理人手机号" width="150">
        </el-table-column>
      </el-table>
      <div class="bot">
        <Page :total="total" :current="pageNum" :pageSize="pageSize" @changeCurrentPage="changeCurrentPage"></Page>
      </div>
      <div class="inp-bot">
      <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="input-with-select">
        <el-form-item label="单位名称" prop="name" class="name-search">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="a" type="primary" @click="submitForm('ruleForm')">查询</el-button>
          <el-button class="a" type="primary" @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    </div>
  </div>
</template>
<script>
import _ from "lodash";
import Page from '@/components/Pagination/page.vue'
import ListTile from "../../layouts/IndexLayout/components/ListTitle";
import httpreques from "../../utils/httpreques";
import moment from "moment";
export default {
  data() {
    return {
      enterpriseItemList: [],
      total:0,
      pageSize:15,
      pageNum:1,
      ruleForm:{
        name:"",
      }
    };
  },
  created() {
    this.ObtainenterpriseItemList();
  },
  methods: {

    async ObtainenterpriseItemList() {

      let params =  {
          "idNumber": '1111',
          "pageNum": this.pageNum,
          "pageSize": this.pageSize,
        };
      const { data: res } = await httpreques(
        "post",
         params,
        "/realbrand-management-service//EnterpriseMgt/EnterpriseList"
      );
      console.log(res)
      // console.log(params);
      _.forEach(
            res.data,
            function (item, key) {
              item.registertime = item.registertime?moment(item.registertime).format(
                "YYYY-MM-DD HH:mm:ss"
              ):"";
               item.index = key +1;
              // item.endTime = moment(item.endTime).format("YYYY-MM-DD HH:mm:ss");
              // console.log(item.registertime)
            }
          
          );
          this.total = res.total;
          this.pageNum = res.pageNum;
          this.pageSize = res.pageSize;
          // console.log(res.total)
      this.enterpriseItemList = res.data;
    },
    //分页
    changeCurrentPage(val) {
      this.pageNum = val;
      this.ObtainenterpriseItemList();
    },
    scan(){
      this.$router.push("/storeapproval")
    },
    addyy_store() {
      this.$router.replace("/storeapproval");
    },
    handleCurrentChange(index){
            this.pageNum = index;
            this.ObtainenterpriseItemList()
    }
  },
  components: { ListTile ,Page},
};
</script>
<style lang="scss" scoped>
@import '@/assets/css/reset.scss';
/deep/.el-pagination.is-background .el-pager li:not(.disabled).active{
  color:#409eff
}
</style>