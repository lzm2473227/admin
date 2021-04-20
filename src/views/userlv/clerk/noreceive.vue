<template>
  <div class="tab">
    <div class="tab-title">
      <div class="left">
        <div class="print" @click="scan"><img class="icon" src="../../../assets/images/add.png" alt=""><span class="axis">新增商品</span></div>
        <div class="print"><img class="icon" src="../../../assets/images/delete.png" alt=""><span class="axis">删除商品</span></div>
        <div class="print"><img class="icon" src="../../../assets/images/confirm.png" alt=""><span class="axis">确认货物</span></div>
        <div class="print"><img class="icon" src="../../../assets/images/statistics.png" alt=""><span class="axis">统计商品</span></div>
        <div class="print"><img class="icon" src="../../../assets/images/print.png" alt=""><span class="axis">打印列表</span></div>
        <div class="print" @click="exportExcel"><img class="icon" src="../../../assets/images/derive.png" alt=""><span class="axis">导出表格</span></div>
      </div>
      <div class="right">
        <!-- <el-radio-group v-model="radio1" size="mini">
          <el-radio-button label="按商品69编码统计"></el-radio-button>
          <el-radio-button label="按单品编码统计"></el-radio-button>
        </el-radio-group> -->
        <div class="setup">
          <img class="set" src="../../../assets/images/ic-设置.png" alt="系统设置" @click="setup">
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
        <el-table-column prop="commodityCode" label="单品编码" align="center" sortable width="200"></el-table-column>
        <el-table-column prop="barcode" label="商品69编码" align="center" sortable width="140"></el-table-column>
        <el-table-column prop="commodityName" label="商品名称" sortable width="400"></el-table-column>
        <el-table-column prop="specsParameter" label="商品规格" sortable width="250"></el-table-column>
        <el-table-column prop="brandName" label="品牌" sortable width="140"></el-table-column>
        <el-table-column prop="manufacturer" label="生产厂家" sortable width="160"></el-table-column>
        <el-table-column prop="price" label="商品单价" sortable width="120">
          <template v-slot="scope">
						￥{{ scope.row.price }}
					</template>
        </el-table-column>
        <el-table-column prop="time" label="收货时间" align="center"  sortable width="183" ></el-table-column>
      </el-table>
    </div>
    <div class="bot">
      <Page :total="total" :current="pageNum" :pageSize="pageSize" @changeCurrentPage="changeCurrentPage"></Page>
    </div>
    <div class="total">
      <div>待收货单品编码数量：<span>{{totalNum}}</span></div>
      <div>待收货商品种类：<span>{{totalNum}}</span></div>
      <div>待收货商品金额：<span class="small">￥</span><span>0</span></div>
    </div>
    <div class="inp-bot">
      <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="input-with-select">
        <el-form-item label="商品名称:" prop="name" class="name-search">
          <el-input v-model="ruleForm.name" placeholder="请输入商品名称或扫69码"></el-input>
          <img @click="scan" src="../../../assets/images/ic-code.png" alt="">
        </el-form-item>
        <!-- <el-form-item label="收货人:" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请输入收货人"></el-input>
        </el-form-item> -->
        <el-form-item label="统计时间:">
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
        </el-form-item>
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
import httpreques from '../../..//utils/httpreques';
export default {
  name: "tab",
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
      radio1: '按商品69编码统计',
      centerDialogVisible: false,
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
    scan(){
      this.centerDialogVisible = true
    }
  },
};
</script>

<style lang="scss" scoped>
@import '../../../assets/css/reset'
</style>
