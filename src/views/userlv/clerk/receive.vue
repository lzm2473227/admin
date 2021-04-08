<template>
  <div class="tab">
    <div class="tab-title">
      <div class="left">
        <div class="print"><img class="icon" src="../../../assets/images/ic-打印列表.png" alt=""><span class="axis">退回商品</span></div>
        <div class="print"><img class="icon" src="../../../assets/images/ic-打印列表.png" alt=""><span class="axis">统计商品</span></div>
        <div class="print"><img class="icon" src="../../../assets/images/ic-打印列表.png" alt=""><span class="axis">打印列表</span></div>
        <div class="print" @click="exportExcel"><img class="icon" src="../../../assets/images/ic-导出表格.png" alt=""><span class="axis">导出表格</span></div>
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
        <el-table-column type="selection" width="55" align="center">
        </el-table-column>
        <el-table-column prop="index" label="序号" align="center" sortable width="80">
        </el-table-column>
        <el-table-column prop="name" label="单品编码" align="center" sortable width="280">
        </el-table-column>
        <el-table-column prop="name" label="商品69编码" align="center" sortable width="280">
        </el-table-column>
        <el-table-column prop="address" label="商品名称" align="center" sortable width="400">
        </el-table-column>
        <el-table-column prop="price" label="商品单价" align="center" sortable width="240" class="underline">
        </el-table-column>
        <el-table-column prop="time" label="盘货时间" align="center"  sortable width="240" >
        </el-table-column>
      </el-table>
    </div>
    <div class="bot">
      <el-pagination layout=" prev, pager, next ,total" :total="total" :page-size="pageSize" @current-change="currentchange"></el-pagination>
    </div>
    <div class="total">
      <div>待收货单品编码数量：<span>3565</span></div>
      <div>待收货商品种类：<span>356</span></div>
      <div>待收货商品金额：<span class="small">￥</span><span>36565.00</span></div>
    </div>
    <div class="inp-bot">
      <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="input-with-select">
        <el-form-item label="商品名称:" prop="name" class="name-search">
          <el-input v-model="ruleForm.name"></el-input>
          <img @click="scan" src="../../../assets/images/ic-code.png" alt="">
        </el-form-item>
        <el-form-item label="收货人:" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
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
export default {
  name: "tab",
  data() {
    return {
      total:100,
      tabs: ['当日', '当周', '当月'],
      active: 0,
      radio1: '按商品69编码统计',
      centerDialogVisible: false,
      textarea: '',
      tableData: [
        {
          index: "1",
          name: "6920210331001",
          address: "星鲨  维生素AD软胶囊  100粒  国药控股星鲨 ",
          receiving: "300",
          price: "23.8",
          time: "-",
        },
        {
          index: "2",
          name: "6920210331001",
          address: "星鲨  维生素AD软胶囊  100粒  国药控股星鲨 ",
          receiving: "300",
          price: "23.8",
          time: "-",
        },
        {
          index: "3",
          name: "6920210331001",
          address: "星鲨  维生素AD软胶囊  100粒  国药控股星鲨 ",
          receiving: "300",
          price: "23.8",
          time: "-",
        },
        {
          index: "4",
          name: "6920210331001",
          address: "星鲨  维生素AD软胶囊  100粒  国药控股星鲨 ",
          receiving: "300",
          price: "23.8",
          time: "-",
        },
      ],
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
    num(){
      console.log(2222)
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
@import '../../../assets/css/reset.scss'
</style>
