<template>
  <div class="tab">
    <div class="tab-title">
      <div class="left">
        <div class="print" @click="scan"><img class="icon" src="@/assets/images/add.png" alt=""><span class="axis">新增商品</span></div>
        <div class="print"><img class="icon" src="@/assets/images/delete.png" alt=""><span class="axis">删除商品</span></div>
        <div class="print"><img class="icon" src="@/assets/images/confirm.png" alt=""><span class="axis">确认货物</span></div>
        <div class="print" @click="statistics"><img class="icon" src="@/assets/images/statistics.png" alt=""><span class="axis">统计商品</span></div>
        <div class="print"><img class="icon" src="@/assets/images/print.png" alt=""><span class="axis">打印列表</span></div>
        <div class="print" @click="exportExcel"><img class="icon" src="@/assets/images/derive.png" alt=""><span class="axis">导出表格</span></div>
      </div>
      <div class="right">
        <div class="setup">
          <img class="set" src="@/assets/images/ic-设置.png" alt="系统设置" @click="setup">
        </div>
      </div>
    </div>
    <div class="mian-content">
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
        <el-table-column label="单品编码" align="center" sortable width="200">
          <template v-slot="scope">
            <span class="detail-info" @click="codeDetail(scope.row)">{{scope.row.commodityCode}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="barcode" label="商品69编码" align="center" sortable width="140"></el-table-column>
        <el-table-column prop="commodityName" label="商品名称" sortable width="430"></el-table-column>
        <el-table-column prop="specsParameter" label="商品规格" sortable width="280"></el-table-column>
        <el-table-column prop="brandName" label="品牌" sortable width="190"></el-table-column>
        <!-- <el-table-column prop="manufacturer" label="生产厂家" sortable width="160"></el-table-column> -->
        <el-table-column prop="price" label="商品单价" sortable width="140">
          <template v-slot="scope">
						￥{{ scope.row.price }}
					</template>
        </el-table-column>
        <!-- <el-table-column label="待收货数量" sortable width="160">
          <template v-slot="scope" @click="toCodeList(scope.row.num)">
						{{ scope.row.num }}
					</template>
        </el-table-column> -->
        <el-table-column prop="scanTime" label="收货时间" align="center"  sortable width="213" ></el-table-column>
      </el-table>
    </div>
    <div class="bot">
      <Page :total="total" :current="pageNum" :pageSize="pageSize" @changeCurrentPage="changeCurrentPage"></Page>
    </div>
    <div class="total">
      <div class="statistic-item1">待收货单品编码数量：<span>{{totalNum}}</span></div>
      <div class="statistic-item2">待收货商品种类：<span>{{totalNum}}</span></div>
      <div class="statistic-item3">待收货商品金额：<span class="small">￥</span><span>0</span></div>
    </div>
    <div class="inp-bot">
      <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="input-with-select">
        <div class="search-item">
          <el-input v-model="ruleForm.name" placeholder="请输入商品名称或扫69码"></el-input>
          <img @click="scan" src="@/assets/images/ic-code.png" alt="">
        </div>
        <!-- <el-form-item label="收货人:" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请输入收货人"></el-input>
        </el-form-item> -->
        <el-form-item label="统计时间:">
          <div class="date-status">
            <!-- <span
              v-for="(item, index) in tabs"
              :key="index"
              :class="{active: active === index}"
              @click="active = index"
            >{{item}}</span> -->
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
    <el-dialog title="" v-model="centerDialogVisible" width="30%" center :close-on-click-modal="false">
        <el-input
          type="textarea"
          :rows="5"
          placeholder="请扫描或输入单品编码"
          v-model="codeInfo">
        </el-input>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addCommodify">确 定</el-button>
        <el-button @click="centerDialogVisible = false">取 消</el-button>
         </div>
    </el-dialog>
    <div class="pay-dialog" v-show="isDialog">
      <!-- 活动弹窗 -->
      <div class="dialog-content">
        <div class="dialog-top">
          <span>新增商品</span>
          <img @click="onCancel" src="@/assets/images/close.png" alt="">
        </div>
        <div class="dialog-body">
          <input type="text" placeholder="请扫描或输入商品69码后，再扫描或输入单品编码" v-model="barcode">
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
import moment from "moment";
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
      tabledata: [],
      totalNum: 0,
      codeInfo: '',
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
      isDialog: false,
      barcode: '',
      isBarcode: '',
      codeObj: {},
      codeList: []
    };
  },
  methods: {
    addCommodify(){
      let commodityCodeList = []
      commodityCodeList = this.codeInfo.split(',')
      let params = {
        "commodityList": commodityCodeList,
        "pageNum": this.pageNum,
        "pageSize": this.pageSize
      } 
      httpreques("post", params, "/realbrand-store-service/Commodity/batchQueryCommodity").then((res) => {
        console.log(res);
        if (res.data.code === "SUCCESS") {
          this.centerDialogVisible = false
          this.codeInfo = ''
          let data = res.data.data
          data.forEach((item, index) => {
            item.index = index+1
            item.scanTime = moment(item.scanTime).format(
              "YYYY-MM-DD HH:mm:ss"
            )
          })
          this.tabledata = data
        }else{
          this.$message(res.data.msg)
        }
      })
    },
    onSure(){
      if(this.isBarcode === this.barcode) {
        return this.$message('请勿重复添加商品69编码')
      }else{
      }
      let len = this.barcode.split('')
      // 先添加69码后添加单品编码
      if(len.length === 20) { // 判断是否为20位单品编码
        if(this.tabledata.length > 0){
          if(this.codeList.indexOf(this.barcode)>-1) return this.$message('请勿重复添加相同的单品编码')
          this.tabledata = []
          this.codeList.push(this.barcode)
          this.codeList.forEach((item, index) => {
            this.tabledata.push({
              index: index+1,
              commodityCode: item,
              barcode: this.codeObj.barcode,
              brandName: this.codeObj.brandName,
              commodityName: this.codeObj.commodityName,
              filePath: this.codeObj.filePath,
              manufacturer: this.codeObj.manufacturer,
              price: this.codeObj.price,
              specsParameter: this.codeObj.specsParameter,
            })
          })
          if(!this.tabledata[0].commodityCode){
            this.codeList = []
            this.codeList.push(this.barcode)
            let arr = localStorage.getItem(JSON.parse(data))
            let a = []
            this.codeList.forEach((item, index) => {
              a.push({
                index: index+1,
                commodityCode: item,
                barcode: this.codeObj.barcode,
                brandName: this.codeObj.brandName,
                commodityName: this.codeObj.commodityName,
                filePath: this.codeObj.filePath,
                manufacturer: this.codeObj.manufacturer,
                price: this.codeObj.price,
                specsParameter: this.codeObj.specsParameter,
              })
            })
            this.tabledata = a.concat(arr)
          }else{
          
          }
          console.log(this.tabledata)
          localStorage.setItem('data', JSON.stringify(this.tabledata))
          this.tabledata.reverse()
          this.barcode = ''
        }else{
          return this.$message('请先添加商品69编码')
        }
        return false
      } 
      // 根据69码查询商品信息
      let params = {
        "barcode": this.barcode // 6922266454295, 6925989489919, 6901826828233, 6959315400247
      }
      httpreques("post", params, "/realbrand-store-service/Commodity/queryCommodityInfo").then((res) => {
        console.log(res);
        if (res.data.code === "SUCCESS") {
          this.isDialog = false
          this.barcode = ''
          this.codeObj = res.data.data
          this.isBarcode = this.codeObj.barcode
          this.tabledata.push(this.codeObj)
          this.tabledata.forEach((item, index) => {
              item.index = index+1
            // item.scanTime = moment(item.scanTime).format(
            //     "YYYY-MM-DD HH:mm:ss"
            // )
          })
          this.tabledata.reverse()
        }else{
          this.$message(res.data.msg)
        }
      })
    },
    // 单品编码详情
    codeDetail(data){
      this.$router.push({
        path: '/receive/codeDetail',
        query: {
          commodityCode: data.commodityCode
        }
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
    handleCurrentChange(val) {
        this.currentRow = val;
      },
    toCodeList(num){
      this.$router.push({
        path: '/clerk/receive/codeList',
        query: {
          num: num
        }
      })
    },
    scan(){
      this.isDialog = true
    },
    onCancel(){
      this.isDialog = false
      this.barcode = ''
    },
    statistics(){
      this.$router.push('/clerk/receive/noreceiveStatistics')
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
