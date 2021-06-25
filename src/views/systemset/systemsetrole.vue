<template>
  <div class="tab">
    <div class="tab-title">
      <div class="left">
        <div class="print" @click="$router.push('/systemset/newsystemsetrole')"><img class="icon" src="@/assets/images/add.png" alt=""><span class="axis">新增人员</span></div>
        <div class="print"><img class="icon" src="../../assets/images/edit.png" /><span class="axis">编辑人员</span></div>
        <div class="print"><img class="icon" src="@/assets/images/delete.png" alt=""><span class="axis">删除人员</span></div>
        <div class="print"><img class="icon" src="@/assets/images/print.png" alt=""><span class="axis">打印列表</span></div>
        <div class="print" @click="exportExcel"><img class="icon" src="@/assets/images/derive.png" alt=""><span class="axis">导出表格</span></div>
      </div>
      <div class="right">
        <div class="setup">
          <img class="set" src="@/assets/images/ic-设置.png" alt="系统设置" @click="setup">
        </div>
      </div>
    </div>
    <div class="tab-body">
      <el-table
      :row-class-name="tableRowClassName"
    
      ref="singleTable"
      :data="tableData"
      style="width: 100%"
      highlight-current-row
      @current-change="handleCurrentChange"
      :default-sort="{ prop: 'date', order: 'descending' }"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="index" label="序号" align="center" sortable width="80"></el-table-column>
        <el-table-column prop="commodityCode" label="身份证号码" align="center" sortable width="350"></el-table-column>
        <el-table-column prop="barcode" label="姓名" align="center" sortable width="180"></el-table-column>
        <el-table-column prop="commodityName" label="手机号码" sortable width="300" align="center"></el-table-column>
        <el-table-column prop="brandName" label="岗位" sortable width="240" align="center"></el-table-column>
        <el-table-column prop="brandName" label="创建时间" sortable width="240" align="center"></el-table-column>
      </el-table>
    </div>
    <div class="bot">
      <Page :total="total" :current="pageNum" :pageSize="pageSize" @changeCurrentPage="changeCurrentPage"></Page>
    </div>
    <div class="inp-bot">
      <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="input-with-select">
        <el-form-item label="姓名" prop="name" class="name-search">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="岗位">
          <el-select v-model="ruleForm.region">
          <el-option label="管理员" value="shanghai"></el-option>
          <el-option label="超级管理员" value="beijing"></el-option>
          <el-option label="普通用户" value="shenzhen"></el-option>
        </el-select>
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
import Page from '@/components/Pagination/page.vue'
import httpreques from '@/utils/httpreques';
export default {
  name:"Systemsetrole",
  components: {
    Page
  },
  data() {
    return {
      total: 0,
      pageSize: 15,
      pageNum: 1,
      tabs: ['当日', '当周', '当月'],
      active: 0,
      // centerDialogVisible: false,
      textarea: '',
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
  methods: {
    currentchange(val){
      this.pageNum = val
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
      },
    handleCurrentChange(val) {
        this.currentRow = val;
      },
    // scan(){
    //   this.centerDialogVisible = true
    // },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/reset';
@import "@/assets/css/image2.scss";
.header {
  height: 42px;
  line-height: 44px;
  background: #ecf3fb;
  border: 1px solid #b8d0f2;
  font-size: 14px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: #222222;
  ul {
    display: flex;
    height: 44px;
    line-height: 44px;
    align-items: center;
    margin: 0;
    padding: 0;
    li {
      width: 112px;
      height: 16px;
      line-height: 16px;
      list-style: none;
      text-align: center;
      border-right: 1px solid #99bbe8;
      display: flex;
      justify-content: center;
      cursor: pointer;
      // align-items: center;
      img {
        margin-right: 4px;
      }
      &:last-child {
        border-right: none;
      }
    }
  }
}
.main {
  border: 1px solid #cccccc;
  padding: 28px;
  box-sizing: border-box;
  margin-top: 16px;
}
table {
  border: 1px solid #b8d0f2;
  border-collapse: collapse;
  font-size: 12px;
  font-family: Source Han Sans CN;
  font-weight: 400;
}
td {
  padding-left: 20px;
}
.bg {
  background: #ecf3fb;
}
.clerk-imgs {
  display: flex;
}
.imgs-title {
  display: flex;
  flex-direction: column;
}
/deep/.el-form-item--small.el-form-item {
  margin-bottom: 0px;
}
/deep/.el-input__inner {
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: none;
  color: #333;
  font-size: 14px;
  font-family: Source Han Sans CN;
  border: 1px solid #ddd !important;
}
</style>
