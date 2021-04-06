<template>
  <div class="yy_storelist">
    <ListTile titlename="门店"></ListTile>
    <div class="tools-btn">
      <div class="tools-new">
        <el-button type="primary" @click="addyy_store">新增账号</el-button>
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
        <el-table-column prop="index" label="序号" align="center" width="50">
        </el-table-column>
        <el-table-column prop="enterpriseName" align="center" label="企业名称">
        </el-table-column>
        <el-table-column prop="industryName" align="center" label="所属行业">
        </el-table-column>
        <el-table-column prop="idNumber" align="center" label="企业账号">
        </el-table-column>
        <el-table-column prop="city" align="center" label="企业地址">
        </el-table-column>
        <el-table-column prop="businessLicense" align="center" label="营业执照">
        </el-table-column>
        <el-table-column prop="legalPerson" align="center" label="联系人">
        </el-table-column>
        <el-table-column prop="userMobile" align="center" label="联系人手机号">
        </el-table-column>
        <el-table-column prop="registertime" align="center" label="注册时间">
        </el-table-column>

        <el-table-column label="操作" align="center">
          <div class="operation">
            <div class="operation-title">重置密码</div>
          </div>
        </el-table-column>
      </el-table>
      <div class="com-bottom">
        <div class="bot">
          <el-pagination background layout="prev, pager, next" :total="total" :page-size="pageSize" @current-change="handleCurrentChange"></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import _ from "lodash";
import ListTile from "../../layouts/IndexLayout/components/ListTitle";
import httpreques from "../../utils/httpreques";
import moment from "moment";
export default {
  data() {
    return {
      enterpriseItemList: [],
      total:0,
      pageSize:10,
      pageNum:1,
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
      // console.log(res)
      console.log(params);
      _.forEach(
            res.data,
            function (item, key) {
              item.registertime = item.registertime?moment(item.registertime).format(
                "YYYY-MM-DD HH:mm:ss"
              ):"";
               item.index = key +1;
              // item.endTime = moment(item.endTime).format("YYYY-MM-DD HH:mm:ss");
              console.log(item.registertime)
            }
          
          );
          this.total = res.total;
          console.log(res.total)
      this.enterpriseItemList = res.data;
    },
    addyy_store() {
      this.$router.replace("/storeapproval");
    },
    handleCurrentChange(index){
            this.pageNum = index;
            this.ObtainenterpriseItemList()
    }
  },
  components: { ListTile },
};
</script>
<style lang="scss" scoped>
.yy_storelist {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  height: 100%;
}
.tools-btn {
  padding-left: 12px;
}
.tools-new {
  padding-bottom: 30px;
}
.storetlist {
  padding-left: 12px;
}
.operation-title {
  color: #3daeff;
  cursor: pointer;
  padding: 0 10px 0 10px;
}
.operation {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.delfont {
  color: red;
}
.bot {
  display: flex;
  justify-content: center;
}
.bot {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
</style>