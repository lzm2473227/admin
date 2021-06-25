<template>
  <div class="tab">
    <div class="tab-title">
      <div class="left">
        <div class="print" @click="openAccount"><img class="icon" src="@/assets/images/commission.png" alt=""><span class="axis">佣金申请</span></div>
        <div class="print"><img class="icon" src="@/assets/images/print.png" alt=""><span class="axis">打印列表</span></div>
        <div class="print" @click="exportExcel"><img class="icon" src="@/assets/images/derive.png" alt=""><span class="axis">导出表格</span></div>
      </div>
      <div class="right">
        <!-- <el-radio-group v-model="radio1" size="mini">
          <el-radio-button label="按商品69编码统计"></el-radio-button>
          <el-radio-button label="按单品编码统计"></el-radio-button>
        </el-radio-group> -->
        <div class="setup">
          <img class="set" src="@/assets/images/ic-设置.png" alt="系统设置" @click="setup">
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
      @current-change="handleCurrentChange"
      :default-sort="{ prop: 'date', order: 'descending' }"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="index" label="序号" align="center" sortable width="80"></el-table-column>
        <el-table-column prop="commodityCode" label="开户业务编号" align="center" sortable width="180"></el-table-column>
        <el-table-column prop="yinhang" label="开户银行" align="center" sortable width="160"></el-table-column>
        <el-table-column prop="type" label="开卡类型" align="center" sortable width="120"></el-table-column>
        <el-table-column prop="barcode" label="身份证号码" align="center" sortable width="190"></el-table-column>
        <el-table-column prop="commodityName" label="开户人姓名" sortable width="130"></el-table-column>
        <el-table-column prop="specsParameter" label="手机号码" align="center" sortable width="150"></el-table-column>
        <el-table-column prop="specsParameter" label="地址" align="center" sortable width="190" show-overflow-tooltip></el-table-column>
        <el-table-column prop="time" label="开户时间" align="center"  sortable width="150" ></el-table-column>
        <el-table-column prop="time" label="开户佣金" align="center"  sortable width="110" ></el-table-column>
        <el-table-column prop="time" label="可提现佣金" align="center"  sortable width="120" ></el-table-column>
        <el-table-column prop="brandName" label="佣金状态" sortable width="110"></el-table-column>
      </el-table>
    </div>
    <div class="bot">
      <Page :total="total" :current="pageNum" :pageSize="pageSize" @changeCurrentPage="changeCurrentPage"></Page>
    </div>
    <div class="total">
      <div class="statistic-item1">已开户数量：<span>{{totalNum}}</span><span style="font-size: 16px; color: #384F71">（储蓄卡：1  信用卡：2）</span></div>
      <div class="statistic-item2">开户佣金总额：<span>{{totalNum}}</span></div>
      <div class="statistic-item3">冻结佣金金额：<span class="small">￥</span><span>0</span></div>
      <div class="statistic-item4">可提现佣金金额：<span class="small">￥</span><span>0</span></div>
    </div>
    <div class="inp-bot">
      <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="input-with-select">
        <el-form-item label="开户人姓名:" prop="name" class="name-search">
          <el-input v-model="ruleForm.name" placeholder="请输入开户人姓名"></el-input>
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
    <div class="pay-dialog" v-show="isDialog">
      <!-- 活动弹窗 -->
      <div class="dialog-content">
        <div class="dialog-top">
          <span>提示</span>
          <img @click="onCancel" src="@/assets/images/close.png" alt="">
        </div>
        <div class="dialog-body">
          <p>佣金将发放至以下银行卡</p>
          <div class="activity">
            <p>暂无银行卡信息，请先<span>添加合作银行卡或开户》</span></p>
          </div>
        </div>
        <div class="dialog-bottom">
          <button class="sure" @click="onSure">确定</button>
          <button @click="onCancel">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>
 
<script>
import Page from '@/components/Pagination/page.vue'
import httpreques from '@/utils/httpreques';
 
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
      tabs: ['当日'],
      active: 0,
      centerDialogVisible: false,
      textarea: '',
      tabledata: [],
      totalNum: 0,
      ruleForm: {
          name: '',
          region: ''
      },
      isDialog: false
    };
  },
  created() {
    this.getdata(this.pageNum)
  },
  methods: {
    getdata(){
      let param = {
        "pageNum": this.pageNum,
        "pageSize": 15,
      }
      this.tabledata = []
      httpreques('post', param, '/realbrand-management-service/CommodityMgt/SaleCommodityList').then(res => {
        console.log(res)
        if(res.data.code === "SUCCESS"){
          let data = res.data.data
          this.totalNum = res.data.total
          this.total = res.data.total
          for(let i = 0; i < data.length; i++){
            this.tabledata.push({
              index: i+1,
              barcode: data[i].barcode,
              brandName: data[i].brandName,
              commodityCode: data[i].commodityCode,
              commodityName: data[i].commodityName,
              filePath: data[i].filePath,
              id: data[i].id,
              manufacturer: data[i].manufacturer,
              policyNo: data[i].policyNo,
              price: data[i].price,
              specsParameter: data[i].specsParameter,
              guigemignc: '-',
              size: '-',
              productstandard: '-',
              weight: '-',
              volume: '-',
              type1: '-',
              type2: '-',
              type3: '-',
              baozhuangleixing: '-',
              baozhuangsize: '-',
              jianjie: '-',
              name: '-',
              time: '-',
            })
          }
          this.tabledata.reverse()
        }else{
          this.$message(res.data.msg)
        }
      })
    },
    // 佣金申请
    openAccount(){
      this.isDialog = true
    },
    changeCurrentPage(val){
      this.pageNum = val
      this.getdata()
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
    onSure(){
      this.isDialog = false
    },
    onCancel(){
      this.isDialog = false
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/reset.scss';
@import '@/assets/css/image1';
.pay-dialog{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}
.dialog-content{
  width: 680px;
  .dialog-top{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background: #438AFE;
  color: #fff;
  letter-spacing: 1px;
  font-weight: 600;
  font-size: 16px;
  img{
    width: 20px;
    height: 20px;
  }
}
.dialog-body{
  padding: 30px 60px 40px;
  background: #fff;
  font-size: 16px;
  p{
    margin-bottom: 20px;
    font-size: 18px;
  }
  .activity{
    display: flex;
    justify-content: space-between;
    height: 170px;
    border: 1px solid #DEDEDE;
    background: #FAFBFF;
    border-radius: 10px;
    p{
      padding: 20px;
      font-size: 14px;
      span{
        color: #3377FF;
        cursor: pointer;
      }
    }
  }
}
.dialog-bottom{
  display: flex;
  justify-content: center;
  padding: 20px 0;
  background: #F8F8F8;
  border-top: 1px solid #DEDEDE;
  button{
    padding: 12px 46px;
    background: #FAFCFE;
    border-radius: 2px;
    border: 1px solid #BBCBDF;
    color: #333;
    cursor: pointer;
    letter-spacing: 2px;
  }
  .sure{
    margin-right: 24px;
    background: #438AFE;
    border: 1px solid #438AFE;
    color: #fff;
  }
}
}
</style>