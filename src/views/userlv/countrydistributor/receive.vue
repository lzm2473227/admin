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
        <el-radio-group v-model="radio1" size="mini">
          <el-radio-button label="按商品69编码统计"></el-radio-button>
          <el-radio-button label="按单品编码统计"></el-radio-button>
        </el-radio-group>
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
        <el-table-column prop="name" label="商品69编码" align="center" sortable width="280">
        </el-table-column>
        <el-table-column prop="address" label="商品名称" align="center" sortable width="400">
        </el-table-column>
        <el-table-column prop="receiving" label="待收货数量" align="center" sortable width="240">
        </el-table-column>
        <el-table-column prop="price" label="商品单价" align="center" sortable width="240" class="underline">
        </el-table-column>
        <el-table-column prop="time" label="收货时间" align="center"  sortable width="240" >
        </el-table-column>
      </el-table>
    </div>
    <div class="bot">
      <el-pagination layout=" prev, pager, next ,total" :total="total"
        :page-size="pageSize" @current-change="currentchange">
        
      </el-pagination>
      <!-- <div><span>第一页</span>共10页</div> -->
    </div>
    <div class="total">
      <div>待收货单品编码数量：<span>3565</span></div>
      <div>待收货商品种类：<span>356</span></div>
      <div>待收货商品金额：<span class="small">￥</span><span>36565.00</span></div>
    </div>
    <div class="inp-bot">
      <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="input-with-select">
        <!-- <el-form-item>
          <el-input
            placeholder="请输入内容"
            v-model="input3"
            class="input-with-select"
          >
            <template #prepend>
              <el-select v-model="select" placeholder="请选择">
                <el-option label="餐厅名" value="1"></el-option>
                <el-option label="订单号" value="2"></el-option>
                <el-option label="用户电话" value="3"></el-option>
              </el-select>
            </template>
          </el-input>
        </el-form-item> -->
        <el-form-item label="商品名称:" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
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
      }
  },
};
</script>

<style lang="scss" scoped>
.tab-title{
  display: flex;
  justify-content: space-between;
  background: #E8F1FB;
  border: 1px solid #B8D0F2 ;
  padding: 5px 15px;
  .left{
    display: flex;
    align-items: center;
    font-size: 14px;
    color:black;
    font-weight: 400;
    .derive{
      display: flex;
      align-items: center;
    }
    .print{
      cursor: pointer;
      display: flex;
      align-items: center;
    }
  }
  .right{
    display: flex;
    align-items: center;
    .setup{
      margin-left: 20px;
    }
  }
}
.bot{
  background: #E8F1FB;
}
.total{
  height: 48px;
  background: #F1FFF1;
  border: 1px solid #CFE8CF;
  color: #333333;
  font-size: 14px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  div{
    display: flex;
    align-items: center;
    span{
    font-size: 30px;
    color: #70BB61;
    }
    .small{
      font-size: 16px;
    }
  }
}
/deep/.el-table thead{
  background-color: #B8D0F2;
}
/deep/.el-button + .el-button{
  margin-left: 0;
}
/deep/.el-table_1_column_5 .cell{
  text-decoration:underline;
  color: #2A78D2;
}
/deep/.el-pagination{
  padding: 0;
  height: 42px;  
  display: flex;
  align-items: center;
}
/deep/.el-pagination button:disabled{
  background: #E8F1FB;
}
/deep/.el-pagination .btn-prev{
  background: #E8F1FB;
}
/deep/.el-pagination .btn-next{
  background: #E8F1FB;
}
/deep/.el-pager li{
  background: #E8F1FB;
}
/deep/.el-pagination.is-background .btn-prev{
  margin: 0;
}
/deep/.el-pagination.is-background .btn-next{
  margin: 0;
}
/deep/.el-pagination.is-background .el-pager li{
  margin: 0;
}
.a{
  margin: 0 10px;
}
/deep/{
.el-table th.is-leaf, .el-table td {
  border: 1px solid #E8F1FB;
 }
}
/deep/.el-input__inner{
  width: 220px;
  background: #fff;
  border: 1px solid #ddd;
}
/deep/.el-input-group__prepend .el-input__inner{
  width: 120px;
}
/deep/.el-input__inner:hover{
  border: 1px solid #ddd;
  color: #333;
}
/deep/.el-input__inner{
  border-radius: 2px;
}
/deep/.el-radio-button__orig-radio:checked + .el-radio-button__inner{
  background-color: #146ED6;
  border-color: #146ED6;
}
/deep/.el-radio-button:first-child .el-radio-button__inner{
  border-radius: 0;
}
/deep/.el-radio-button:last-child .el-radio-button__inner{
  border-radius: 0;
}
/deep/.el-button--primary{
  width: 80px;
  background-color: #146ED6;
  border-color: #146ED6;
}
/deep/.el-button--small{
  border-radius: 2px;
}
.inp-bot{
  background: #fff;
  padding: 40px 0 ;
  border: 1px solid #B8D0F2;
  border-top: none;
}
// /deep/.el-table__body{
//    border-collapse: collapse;
// }
// /deep/.has-gutter tr th{
//    border-collapse: collapse;
// }
.date-status {
  display: inline-block;
  margin-right: 12px;;
    span {
      height: 30px;
      display: inline-block;
      padding: 0 12px;
      background: #fff;
      border: 1px solid #ddd;
      color: #333;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.2s ease-in-out;
      line-height: 30px;
    }
    span:nth-child(1) {
      border-right: none;
      border-top-left-radius: 2px;
      border-bottom-left-radius: 2px;
    }
    span:last-child {
      border-left: none;
      border-top-right-radius: 2px;
      border-bottom-right-radius: 2px;
    }
    .active {
      background: #146ED6;
      border: 1px solid #146ED6;
      color: #fff;
    }
  }
  .set{
    vertical-align: middle;
  }
  .icon{
    padding-left: 14px;
    padding-right: 4px;
  }
  .print:first-child .icon{
    padding-left: 0;
  }
  .axis{
    padding-right: 14px;
    border-right: 1px solid #B8D0F2;
  }
  .print:last-child .axis{
    border-right: 0;
  }
</style>
