<template>
  <div class="newselling">
    <div class="tab-title">
      <div class="left">
        <div class="print" @click="goBack"><img class="icon" src="@/assets/images/back.png" alt=""><span class="axis">返回列表</span></div>
        <div class="print"><img class="icon" src="@/assets/images/confirm.png" alt=""><span class="axis">保存确认</span></div>
        <div class="print" @click="exclude"><img class="icon" src="@/assets/images/delete.png" alt=""><span class="axis">排除商品</span></div>
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
        <el-table-column label="序号" align="center" sortable width="180"></el-table-column>
        <el-table-column label="商品三级类别" align="center" sortable ></el-table-column>
        <el-table-column label="商品二级类别" align="center" sortable ></el-table-column>
        <el-table-column label="商品一级类别" align="center" sortable ></el-table-column>
      </el-table>
    </div>
    <div class="bot">
      <Page :total="total" :current="pageNum" :pageSize="pageSize" @changeCurrentPage="changeCurrentPage"></Page>
    </div>
    <div class="inp-bot">
      <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="input-with-select">
        <el-form-item label="三级分类名称:" prop="name1" class="name-search" style="margin-left:16px">
          <el-input v-model="ruleForm.name"></el-input>
          <!-- <img @click="scan" src="@/assets/images/ic-code.png" alt=""> -->
        </el-form-item>
        <el-form-item label="二级分类名称:" prop="name2" class="name-search">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="一级分类名称:" prop="name3" class="name-search">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <!-- <el-form-item label="统计时间:">
          <div class="date-status">
            <span
              v-for="(item, index) in tabs"
              :key="index"
              :class="{active: active === index}"
              @click="active = index"
            >{{item}}</span>
          </div>
          <el-date-picker
            v-model="value1"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item> -->
        <el-form-item>
          <el-button class="a" type="primary" @click="submitForm('ruleForm')">查询</el-button>
          <el-button class="a" type="primary" @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog title="" v-model="centerDialogVisible" width="30%" center :close-on-click-modal="false">
        <el-input
          type="textarea"
          :rows="5"
          placeholder="请扫描或输入单品编码"
          v-model="textarea">
        </el-input>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
        <el-button @click="centerDialogVisible = false">取 消</el-button>
         </div>
    </el-dialog>
  </div>
</template>

<script>
import Page from '@/components/Pagination/page.vue'
import httpreques from '@/utils/httpreques';
export default {
   name:"Newselling",
  components: {
    Page
  },
  data() {
    return {
      total: 0,
      pageSize: 20,
      pageNum: 1,
      tabs: ['当日', '当周', '当月'],
      active: 0,
      radio1: '按商品69编码统计',
      centerDialogVisible: false,
      textarea: '',
      tabledata: [],
      totalNum: 0,
      ruleForm: {
          name1: '',
          name2: '',
          name3: '',
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
    goBack(){
        this.$router.go(-1)
    },
    exclude(){
      this.$router.push("/setting/ruleOutGoods")
    }
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/reset'
</style>