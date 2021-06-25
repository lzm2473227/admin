<template>
  <div class="promotion">
    <div class="tab-title">
      <div class="left">
        <div class="print" @click="addStore1"><img class="icon" src="../../assets/images/add.png" alt=""><span class="axis">新增折扣活动</span></div>
        <div class="print" @click="addStore2"><img class="icon" src="../../assets/images/add.png" alt=""><span class="axis">新增买赠活动</span></div>
        <div class="print" @click="addStore3"><img class="icon" src="../../assets/images/add.png" alt=""><span class="axis">新增满赠活动</span></div>
        <div class="print" @click="delstore"><img class="icon" src="../../assets/images/delete.png" alt=""><span class="axis">删除活动</span></div>
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
        <el-table-column label="序号" align="center" sortable width="80"></el-table-column>
        <el-table-column label="活动编号" align="center" sortable width="180"></el-table-column>
        <el-table-column label="活动名称" sortable width="160" align="center"></el-table-column>
        <el-table-column label="活动对象" sortable align="center" width="140"></el-table-column>
        <el-table-column label="起止时间" sortable align="center" width="300" ></el-table-column>
        <el-table-column label="活动状态" sortable align="center" width="150" >  </el-table-column>
        <el-table-column label="" align="center" width="675" ></el-table-column>
      </el-table>
    </div>
    <div class="bot">
      <Page :total="total" :current="pageNum" :pageSize="pageSize" @changeCurrentPage="changeCurrentPage"></Page>
      <!-- <el-pagination layout=" prev, pager, next ,total" :total="total" :page-size="pageSize" @current-change="currentchange"></el-pagination> -->
    </div>
    <div class="inp-bot">
      <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="input-with-select">
        <el-form-item label="小活动名称:" prop="storeName" class="name-search">
          <el-input v-model="ruleForm.subActivityName"></el-input>
        </el-form-item>
        <el-form-item label="活动状态:" prop="name">
          <el-select v-model="ruleForm.activityState">
            <el-option label="进行中" value="进行中">进行中</el-option>
            <el-option label="关闭" value="关闭">关闭</el-option>
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
  name: "Promotion",
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
          subActivityName: '',  //小活动名称
          activityState: ''     //活动状态
      },
      multipleSelection: []
    };
  },
  created() {
    this.getdata()
  },
  methods: {
    getdata(){
      let t = this;
      let params = {
        // "subActivityName": this.ruleForm.subActivityName,
        "pageNum": this.pageNum,
        "pageSize": this.pageSize,
      };
      this.tabledata = []
      httpreques(
        "post",
        params,
        "realbrand-management-service/Activity/ActivityList"
      ).then((res) => {
        console.log(res);
        if (res.data.code == "SUCCESS") {
          res.data.data.forEach((item,key) => {
             item.index = key + 1; //加入index
            let address = item.province + item.city + item.county;
            item.address = address + item.address;
          });
          t.tabledata = res.data.data;
          t.total= res.data.total;
          t.tabledata.reverse()
        } else {
          this.$message(res.data.msg)
        }
      });
    },
    // 搜索
    submitForm(){
      this.getdata()
    },
    // 重置
    resetForm(){
      this.ruleForm = {}
    },


    addStore1() {
      this.$router.push({ path: "/setting/newactivity" });
    },
    addStore2() {
      this.$router.push({ path: "/setting/newactivity2" });
    },
    addStore3() {
      this.$router.push({ path: "/setting/newactivity3" });
    },


    // delstore() {
    //   if(this.multipleSelection.length <= 0) return this.$message.error({message: '请选择需要删除的门店'})
    //   let t = this;
    //   let storeName = []
    //   _.forEach(
    //     JSON.parse(JSON.stringify(this.multipleSelection)),
    //     function (item, key) {
    //       storeName.push(item.storeName);
    //     }
    //   )
    //   let params = {
    //     storeName: storeName,
    //   };
    //   httpreques(
    //     "post",
    //     params,
    //     "/realbrand-management-service/StoreMgt/DeleteStore"
    //   ).then((res) => {
    //     if (res.data.code == "SUCCESS") {
    //       t.$message({
    //         message: "删除成功",
    //         type: "success",
    //       });
    //       t.getdata();
    //     } else {
    //       //接口错误处理
    //       t.$message.error(res.data.msg);
    //     }
    //   });
    // },
    // editstore() {
    //   if(this.multipleSelection.length !== 1) return this.$message('请选择一个需要编辑的门店')
    //   let storename = this.multipleSelection[0].storeName
    //   this.$router.push({
    //     path: "/setting/newstore",
    //     query: {
    //       storename: storename,
    //     },
    //   });
    // },
    changeCurrentPage(val){
      this.pageNum = val
      this.getdata()
    },
    handleSelectionChange(val){
      this.multipleSelection = val
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
