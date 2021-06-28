<template>
  <div class="tab">
    <div class="tab-title">
      <div class="left">
        <div class="print" @click="goBack"><img class="icon" src="@/assets/images/back.png" alt=""><span class="axis">返回列表</span></div>
        <div class="print" @click="add('1')"><img class="icon" src="@/assets/images/add.png" alt=""><span class="axis">增加商品</span></div>
        <div class="print" @click="add('2')"><img class="icon" src="@/assets/images/delete.png" alt=""><span class="axis">删除商品</span></div>
        <div class="print" @click="backCommodity"><img class="icon" src="@/assets/images/back-commodity.png" alt=""><span class="axis">确认退货</span></div>
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
      :data="tabledata"
      style="width: 100%"
      highlight-current-row
      @selection-change="handleSelectionChange"
      :default-sort="{ prop: 'date', order: 'descending' }"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="index" label="序号" align="center" sortable width="80"></el-table-column>
        <el-table-column prop="commodityCode" label="单品编码" align="center" sortable width="200">
          <template v-slot="scope">
            <span class="detail-info" @click="codeDetail(scope.row)">{{scope.row.commodityCode}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="barcode" label="商品69编码" align="center" sortable width="140"></el-table-column>
        <el-table-column prop="commodityName" label="商品名称" sortable width="230" show-overflow-tooltip></el-table-column>
        <el-table-column prop="specsParameter" label="商品规格" sortable width="160" show-overflow-tooltip></el-table-column>
        <el-table-column prop="brandName" label="品牌" sortable width="140"></el-table-column>
        <el-table-column prop="manufacturer" label="生产厂家" sortable width="200" show-overflow-tooltip></el-table-column>
        <el-table-column prop="price" label="商品单价" sortable width="120">
          <template v-slot="scope">
						{{ scope.row.price }} 元
					</template>
        </el-table-column>
        <el-table-column prop="time" label="退货时间" align="center"  sortable width="160" ></el-table-column>
        <el-table-column label="" align="center" width="255" ></el-table-column>
      </el-table>
    </div>
    <div class="bot">
      <Page :total="total" :current="pageNum" :pageSize="pageSize" @changeCurrentPage="changeCurrentPage"></Page>
    </div>
    <div class="total">
      <div class="statistic-item1">退货单品编码数量：<span>{{codeCount}}</span></div>
      <div class="statistic-item2">退货商品种类：<span>{{barcodeCount}}</span></div>
      <div class="statistic-item3">退货商品金额：<span class="small">￥</span><span>{{price}}</span></div>
    </div>
    <div class="inp-bot">
      <el-form :inline="true" :model="form" :rules="rules" ref="ruleForm" label-width="100px" class="input-with-select">
        <div class="search-item">
          <el-input v-model="form.commodityName" placeholder="请输入商品名称或扫69码"></el-input>
          <img @click="scan" src="@/assets/images/ic-code.png" alt="">
        </div>
        <!-- <el-form-item label="收货人:" prop="name">
          <el-input v-model="form.name" placeholder="请输入收货人"></el-input>
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
            v-model="date"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button class="a" type="primary" @click="submitForm()">查询</el-button>
          <el-button class="a" type="primary" @click="resetForm()">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog title="" v-model="centerDialogVisible" width="30%" center :close-on-click-modal="false">
        <el-input
          type="textarea"
          :rows="5"
          placeholder="请扫描或输入单品编码"
          v-model="codeInfo">
        </el-input>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="backCommodity('1')">确 定</el-button>
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
import moment from "moment";
export default {
  name: "tab",
  components: {
    Page
  },
  data() {
    return {
      total: 0,
      pageSize: 20,
      pageNum: 1,
      tabs: ['当日'],
      active: 0,
      radio1: '按商品69编码统计',
      centerDialogVisible: false,
      codeInfo: '',
      tabledata: [],
      barcodeCount: 0, // 条形码总数
      codeCount: 0, // 单品编码总数
      price: 0, // 总金额
      form: {
          commodityName: '',
          barcode: '',
          date: '',
          codeState: '',
          commodityCode: ''
      },
      multipleSelection : [],
      isDialog: false,
      barcode: '',
      isBarcode: '',
      removeValFromIndex: []
    };
  },
  created() {
    // this.getdata()
    this.getTotal()
  },
  methods: {
    getdata(){
      let parame = {
        "barcode": this.form.barcode,
        "codeState": this.form.codeState,
        "commodityCode": this.form.commodityCode,
        "commodityName": this.form.commodityName,
        "pageNum": this.pageNum,
        "pageSize": this.pageSize
      }
      this.tabledata = []
      httpreques('post', parame, '/realbrand-management-service/CommodityMgt/queryReceivedCommodityList').then(res => {
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
    getTotal(){
      let params = {
        "barcode": this.form.barcode,
        "codeState": 0,
        "commodityCode": this.form.commodityCode,
        "commodityName": this.form.commodityName,
        "pageNum": 0,
        "pageSize": 0
      }
      httpreques('post', params, '/realbrand-management-service/CommodityMgt/queryReceivedCommodityStatistics').then(res => {
        if(res.data.code === "SUCCESS"){
          this.barcodeCount = res.data.data.barcodeCount
          this.codeCount = res.data.data.codeCount
          this.price = res.data.data.price
        }else{
          this.$message(res.data.msg)
        }
      })
    },
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
    add(index){
        if(index === '1'){
            this.isDialog = true
        }else{
            if(this.multipleSelection.length <= 0) return this.$message('请选择需要删除的商品')
            this.$nextTick(function(){
              for (let i = this.removeValFromIndex.length -1; i >= 0; i--){
                this.tabledata.splice(this.removeValFromIndex[i],1);
              }
            })
        }
    },
    // 单品编码详情
    codeDetail(data){
      this.$router.push({
        path: '/clerk/receive/codeDetail',
        query: {
          commodityCode: data.commodityCode
        }
      })
    },
    // 退回商品
    backCommodity(val){
      let commodityCodeList = []
      if(val === '1'){
        commodityCodeList = this.codeInfo.split(',')
        this.centerDialogVisible = false
      }else{
        if(this.multipleSelection.length <= 0) return this.$message('请选择需要退回的商品')
        _.forEach(
          JSON.parse(JSON.stringify(this.multipleSelection)),
          function (item, key) {
            commodityCodeList.push(item.commodityCode);
          }
        )
      }
      httpreques(
        "post",
        {
          commodityCodeList: commodityCodeList,
        },
        "/realbrand-store-service/Receipt/returnCommodity"
      ).then((res) => {
        console.log(res);
        if (res.data.code === "SUCCESS") {
            this.$message.success("退回商品成功!");
            this.$nextTick(function(){
              for (let i = this.removeValFromIndex.length -1; i >= 0; i--){
                this.tabledata.splice(this.removeValFromIndex[i],1);
              }
            })
        }else{
          this.$message(res.data.msg)
        }
      })
    },
    toReturnGoods(){
      this.$router.push('/clerk/receive/returnGoods')
    },
    handleSelectionChange(val){
      this.multipleSelection = val
      this.removeValFromIndex = []
        // 获取表格选中的index值
        val.forEach((val, index) => {
    　　　　　this.tabledata.forEach((v, i) => {
                if(val.index == v.index){
                    this.removeValFromIndex.push(i)
                }
            })
        })
    },
    submitForm(){
      this.getdata()
      this.getTotal()
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
    handleCurrentChange(val) {
        this.currentRow = val;
      },
    scan(){
      this.centerDialogVisible = true
    },
    statistics(){
      this.$router.push('/clerk/receive/receiveStatistics')
    },
    goBack(){
        this.$router.go(-1)
    },
    onCancel(){
      this.isDialog = false
      this.barcode = ''
    },
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/reset.scss';
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
