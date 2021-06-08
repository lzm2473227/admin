<template>
  <div class="tab">
    <div class="tab-title">
      <div class="left">
        <div class="print" @click="edit"><img class="icon" src="../../../assets/images/edit.png" alt=""><span class="axis">编辑等级</span></div>
        <div class="print"><img class="icon" src="../../../assets/images/print.png" alt=""><span class="axis">打印列表</span></div>
        <div class="print" @click="exportExcel"><img class="icon" src="../../../assets/images/derive.png" alt=""><span class="axis">导出表格</span></div>
      </div>
      <div class="right">
        <div class="setup">
          <img class="set" src="../../../assets/images/ic-设置.png" alt="系统设置" @click="setup">
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
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="index" label="序号" align="center" sortable width="80"></el-table-column>
        <el-table-column prop="orgCode" label="等级编号" align="center" sortable width="330"></el-table-column>
        <el-table-column prop="storeName" label="等级名称" sortable width="350"></el-table-column>
        <el-table-column prop="address" label="所需成长值" sortable width="480"></el-table-column>
        <el-table-column prop="storeType" label="等级折扣" align="center" sortable width="190"></el-table-column>
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
  name: "Memberset",
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
      dialogImageUrl:"",
      ruleForm: {
          storeName: '',
          storeType: ''
      },
      multipleSelection: []
    };
  },
  created() {
    // this.getdata()
  },
  methods: {
    edit(){
      this.$router.push("newmemberset")
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../../assets/css/reset.scss';
@import "@/assets/css/image3.scss";
</style>
