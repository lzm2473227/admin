<template>
  <div class="tab">
    <div class="tab-title">
      <div class="left">
        <div class="print" @click="goBack"><img class="icon" src="@/assets/images/back.png" alt=""><span class="axis">返回列表</span></div>
        <div class="print" @click="scan"><img class="icon" src="@/assets/images/add.png" alt=""><span class="axis">增加单品编码</span></div>
        <div class="print" @click="statistics"><img class="icon" src="@/assets/images/statistics.png" alt=""><span class="axis">统计商品</span></div>
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
      :data="tableData"
      style="width: 100%"
      highlight-current-row
      @selection-change="handleSelectionChange"
      :default-sort="{ prop: 'date', order: 'descending' }"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="index" label="序号" align="center" sortable width="80"></el-table-column>
        <el-table-column prop="commodityCode" label="单品编码" align="center" sortable width="200"></el-table-column>
        <el-table-column prop="barcode" label="商品69编码" align="center" sortable width="140"></el-table-column>
        <el-table-column prop="commodityName" label="商品名称" sortable width="400"></el-table-column>
        <el-table-column prop="specsParameter" label="商品规格" sortable width="250"></el-table-column>
        <el-table-column prop="brandName" label="品牌" sortable width="160"></el-table-column>
        <el-table-column prop="price" label="商品单价" sortable width="120">
          <template v-slot="scope">
						{{ scope.row.price }} 元
					</template>
        </el-table-column>
        <el-table-column prop="price" label="促销价" sortable width="120">
          <template v-slot="scope">
						{{ scope.row.price }} 元
					</template>
        </el-table-column>
        <el-table-column prop="brandName" label="小活动名称" sortable width="203"></el-table-column>
      </el-table>
    </div>
    <div class="bot">
      <Page :total="total" :current="pageNum" :pageSize="pageSize" @changeCurrentPage="changeCurrentPage"></Page>
    </div>
    <div class="total">
      <div class="statistic-item1">单品编码数量：<span>{{totalNum}}</span>&nbsp;&nbsp;&nbsp;（订单商品数量：<span>{{totalNum}}</span>）</div>
      <div class="statistic-item2">商品种类：<span>{{totalNum}}</span>&nbsp;&nbsp;&nbsp;（订单商品种类：<span>{{totalNum}}</span>）</div>
      <div class="statistic-item3">商品金额：<span class="small">￥</span><span>0</span>&nbsp;&nbsp;&nbsp;（订单商品金额：<span>{{totalNum}}</span>）</div>
    </div>
    <div class="order-info">
      <div class="order">
        <div class="order-top">
          <p>订单信息</p>
        </div>
        <div class="table-main">
          <table border="1" class="">
          <tr>
            <td class="table-left">订单类型</td>
            <td class="table-right">线上商城</td>
            <td class="table-left">订单状态</td>
            <td class="table-right">
              <select placeholder="请选择门店类型" v-model="name">
                <option value="" disabled style="display:none; color: #ddd">请选择门店类型</option>
                <option value="直营">直营</option>
                <option value="加盟">加盟</option>
              </select>
            </td>
          </tr>
          <tr>
            <td class="table-left">订单编号</td>
            <td class="table-right">202106021154498797</td>
            <td class="table-left">下单时间</td>
            <td class="table-right">2021.1.15 09:12:54</td>
          </tr>
          <tr>
            <td class="table-left">支付方式</td>
            <td class="table-right">在线支付</td>
            <td class="table-left">支付时间</td>
            <td class="table-right">2021.1.15 09:12:54</td>
          </tr>
          <tr>
            <td class="table-left">业务编号</td>
            <td class="table-right">202106021154498797</td>
            <td class="table-left">订单金额</td>
            <td class="table-right">￥12.00</td>
          </tr>
          <tr>
            <td class="table-left">下单用户</td>
            <td class="table-right">海王</td>
            <td class="table-left">手机号码</td>
            <td class="table-right">13402150455</td>
          </tr>
          <tr>
            <td class="table-left">正品保单</td>
            <td class="table-right" colspan="3">PBW2021043009184985</td>
          </tr>
          <tr>
            <td class="table-left">订单备注</td>
            <td class="table-right" colspan="3">请先打电话确认是否送货上门</td>
          </tr>
        </table>
        </div>
      </div>
      <div class="distribution"></div>
    </div>
    <!-- <div class="inp-bot">
      <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="input-with-select">
        <el-form-item label="商品名称:" prop="name" class="name-search">
          <el-input v-model="ruleForm.name" placeholder="请输入商品名称或扫69码"></el-input>
          <img @click="scan" src="@/assets/images/ic-code.png" alt="">
        </el-form-item>
        <el-form-item label="收货人:" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请输入收货人"></el-input>
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
    </div> -->
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
    <div class="pay-dialog" v-show="isDialog">
      <div class="dialog-content">
        <div class="dialog-top">
          <span>新增商品</span>
          <img @click="onCancel" src="@/assets/images/close.png" alt="">
        </div>
        <div class="dialog-body">
          <input type="text" placeholder="请扫描或输入单品编码" v-model="barcode">
          <div class="scan-code">
            <button class="sure" @click="onSure">确定</button>
            <button @click="onCancel">取消</button>
          </div>
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
      radio1: '按商品69编码统计',
      centerDialogVisible: false,
      textarea: '',
      tableData: [],
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
      name: '',
      multipleSelection : [],
      isDialog: false,
      barcode: '',
      isBarcode: '',
      removeValFromIndex: []
    };
  },
  methods: {
    onSure(){
      if(this.isBarcode === this.barcode && this.barcode) return this.$message('请勿重复添加商品69编码')
      // 根据单品编码查询商品信息
      let params = {
        "commodityCode": this.barcode // 6922266454295, 6925989489919, 6901826828233, 6959315400247
      }
      httpreques("post", params, "/realbrand-management-service/CommodityMgt/CommodityInfo").then((res) => {
        console.log(res);
        if (res.data.code === "SUCCESS") {
        //   this.isDialog = false
          this.barcode = ''
          this.codeObj = res.data.data
          this.isBarcode = this.codeObj.commodityCode
          this.tableData.push(this.codeObj)
          this.tableData.forEach((item, index) => {
              item.index = index+1
            // item.scanTime = moment(item.scanTime).format(
            //     "YYYY-MM-DD HH:mm:ss"
            // )
          })
          this.tableData.reverse()
        }else{
          this.$message(res.data.msg)
        }
      })
    },
    handleSelectionChange(val){
      this.multipleSelection = val
      this.removeValFromIndex = []
        // 获取表格选中的index值
        val.forEach((val, index) => {
    　　　　　this.tableData.forEach((v, i) => {
                if(val.index == v.index){
                    this.removeValFromIndex.push(i)
                }
            })
        })
    },
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
      statistics(){
          this.$router.push('/clerk/sale/nosaleStatistics')
      },
    scan(){
      this.isDialog = true
    },
    goBack(){
        this.$router.go(-1)
    },
    onCancel(){
      this.isDialog = false
      this.barcode = ''
    }
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/reset';
@import '@/assets/css/image1';
.dialog-top{
  span{
    font-size: 16px;
    letter-spacing: 1px;
  }
  img{
    cursor: pointer;
  }
}
.dialog-content .dialog-body{
  display: flex;
  justify-content: space-between;
  padding: 40px;
  input{
    width: 380px;
    height: 44px;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 2px;
    outline: none;
  }
  button{
    height: 44px;
    padding: 0 28px;
    background: #FAFCFE;
    border: 1px solid #BBCBDF;
    border-radius: 2px;
    color: #333;
    outline: none;
    cursor: pointer;
  }
  .sure{
    margin-right: 12px;
    background: #438AFE;
    border: 1px solid #438AFE;
    color: #fff;
  }
}
</style>
