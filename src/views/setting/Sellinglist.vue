<template>
  <div class="sellinglist">
    <div class="tab-title">
      <div class="left">
        <div class="print" @click="addStore"><img class="icon" src="../../assets/images/add.png" alt=""><span class="axis">匹配商品小类</span></div>
        <div class="print" @click="delstore"><img class="icon" src="../../assets/images/delete.png" alt=""><span class="axis">删除匹配商品</span></div>
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
      @selection-change="handleSelectionChange"
      :default-sort="{ prop: 'date', order: 'descending' }"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column label="序号" align="center" sortable width="75"></el-table-column>
        <el-table-column label="小活动编号" align="center" sortable width="160"></el-table-column>
        <el-table-column label="小活动名称" sortable width="220" align="center"></el-table-column>
        <el-table-column label="大活动名称" sortable width="230" align="center"></el-table-column>
        <el-table-column label="活动对象" align="center" sortable width="115"></el-table-column>
        <el-table-column label="起止时间" sortable align="center" width="240" ></el-table-column>
        <el-table-column label="活动状态" sortable align="center" width="140" ></el-table-column>
        <el-table-column label="活动商品类别（三级分类）" sortable align="center" width="300" ></el-table-column>
        <el-table-column label="排除参加活动的商品" sortable align="center" width="190" ></el-table-column>
      </el-table>
    </div>
    <div class="bot">
      <Page :total="total" :current="pageNum" :pageSize="pageSize" @changeCurrentPage="changeCurrentPage"></Page>
      <!-- <el-pagination layout=" prev, pager, next ,total" :total="total" :page-size="pageSize" @current-change="currentchange"></el-pagination> -->
    </div>
    <div class="inp-bot">
      <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="input-with-select">
        <el-form-item label="小活动名称:" prop="storeName" class="name-search">
          <el-input v-model="ruleForm.storeName"></el-input>
        </el-form-item>
        <el-form-item label="活动状态:" prop="name">
          <el-select v-model="ruleForm.storeType">
            <el-option label="进行中" value="进行中">进行中</el-option>
            <el-option label="结束" value="结束">结束</el-option>
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
  name: "Sellinglist",
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
    addStore() {
      this.$router.push({ path: "/setting/newselling" });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/css/reset.scss'
</style>
