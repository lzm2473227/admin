<template>
  <div class="tab">
      <!-- <BarCodeScan @handle="handleBarcode"></BarCodeScan>
    <p>测试{{value}}</p> -->
    <div class="tab-title">
      <div class="left">
        <div class="print" @click="scan"><img class="icon" src="@/assets/images/add.png" alt=""><span class="axis">新增商品</span></div>
        <div class="print" @click="del"><img class="icon" src="@/assets/images/delete.png" alt=""><span class="axis">删除商品</span></div>
        <div class="print" @click="onPay"><img class="icon" src="@/assets/images/pay.png" alt=""><span class="axis">启动支付</span></div>
        <div class="print" @click="printTable('printJS-table')"><img class="icon" src="@/assets/images/print.png" alt=""><span class="axis">打印列表</span></div>
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
      id="printJS-table"
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
        <el-table-column prop="barcode" label="商品69编码" align="center" sortable width="130"></el-table-column>
        <el-table-column prop="commodityName" label="商品名称" sortable width="200" show-overflow-tooltip></el-table-column>
        <el-table-column prop="specsParameter" label="商品规格" sortable width="160" show-overflow-tooltip></el-table-column>
        <el-table-column prop="brandName" label="品牌" sortable width="140" show-overflow-tooltip></el-table-column>
        <!-- <el-table-column prop="manufacturer" label="生产厂家" sortable width="210" show-overflow-tooltip></el-table-column> -->
        <el-table-column label="单价（元）" sortable width="110" align="right">
          <template v-slot="scope">
            {{ scope.row.price }}
          </template>
        </el-table-column>
        <el-table-column label="促销价（元）" sortable width="130" align="right">
          <template v-slot="scope">
            <span class="table-price">{{ scope.row.price }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="活动名称"  sortable width="140" ></el-table-column>
        <el-table-column prop="sum" label="待售出数量"  sortable width="120" ></el-table-column>
        <!-- <el-table-column prop="createTime" label="售出时间" align="center"  sortable width="180" ></el-table-column> -->
        <el-table-column label="订单号" align="center"  sortable width="160" class="aaaa">
          <template v-slot="scope">
            <span @click="onDetail(scope.row)" class="table-button">{{ scope.row.dealNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="dealType" label="订单类型" align="center"  sortable width="120" ></el-table-column>
        <el-table-column prop="transactionalNumber" label="支付业务编号" align="center"  sortable width="170" ></el-table-column>
        <!-- <el-table-column label="" align="center" width="100" ></el-table-column> -->
      </el-table>
    </div>
    <div class="bot">
      <Page :total="total" :current="pageNum" :pageSize="pageSize" @changeCurrentPage="changeCurrentPage"></Page>
    </div>
    <div class="total">
      <div class="statistic-item1">待售出单品编码数量：<span>{{sku}}</span></div>
      <div class="statistic-item2">待售出商品种类：<span>{{sku}}</span></div>
      <div class="statistic-item3">待售出商品金额：<span class="small">￥</span><span>{{total}}</span></div>
    </div>
    <div class="inp-bot">
      <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="input-with-select">
        <div class="search-item">
          <el-input v-model="ruleForm.name" placeholder="请输入商品名称或扫69码"></el-input>
          <img @click="scan" src="@/assets/images/ic-code.png" alt="">
        </div>
        <el-form-item label="订单号:" prop="num" class="name-search">
          <el-input v-model="ruleForm.num" placeholder="请输入订单号"></el-input>
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
          v-model="codeInfo">
        </el-input>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addCommodify">确 定</el-button>
        <el-button @click="centerDialogVisible = false">取 消</el-button>
         </div>
    </el-dialog>
    <div class="pay-dialog1" v-show="isAdd">
      <div class="dialog-content">
        <div class="dialog-top">
          <span>新增商品</span>
          <img @click="onCancel" src="@/assets/images/close.png" alt="">
        </div>
        <div class="dialog-body">
          <input type="text" placeholder="请扫描或输入单品编码" v-model="barcode">
          <div class="scan-code">
            <button class="sure" @click="onSure('1')">确定</button>
            <button @click="onCancel">取消</button>
          </div>
        </div>
      </div>
    </div>
    <div class="pay-dialog" v-show="isDialog">
      <!-- 活动弹窗 -->
      <div class="dialog-content" v-show="isShowActivity">
        <div class="dialog-top">
          <span>提示</span>
          <img @click="onCancel" src="@/assets/images/close.png" alt="">
        </div>
        <div class="dialog-body">
          <p>以下促销活动指定消费者，购买方是否符合活动条件</p>
          <div class="activity">
            <div class="activity-item">
              <div class="item-left">
                <span>促销活动：</span>
                <span>活动商品：</span>
                <span>指定消费者：</span>
                <span>是否符合：</span>
              </div>
              <div class="item-right">
                <span>五一节8折</span>
                <span>复方感冒灵颗粒</span>
                <span>医生</span>
                <span>
                  <el-radio-group v-model="radio2">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="2">否</el-radio>
                  </el-radio-group></span>
              </div>
            </div>
            <div class="activity-item">
              <div class="item-left">
                <span>促销活动：</span>
                <span>活动商品：</span>
                <span>指定消费者：</span>
                <span>是否符合：</span>
              </div>
              <div class="item-right">
                <span>五一节8折</span>
                <span>复方感冒灵颗粒</span>
                <span>医生</span>
                <span>
                  <el-radio-group v-model="radio3">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="2">否</el-radio>
                  </el-radio-group></span>
              </div>
            </div>
          </div>
        </div>
        <div class="dialog-bottom">
          <button class="sure" @click="onSure">确定</button>
          <button @click="onCancel">取消</button>
        </div>
      </div>
      <!-- 付款弹窗 -->
      <div class="dialog-pay-type" v-show="isPayMoney">
        <div class="dialog-top">
          <div><span>应收：<span class="price">￥<span>{{totalAmount}}</span></span></span></div>
          <div><span>实收：<span class="price" style="color: #FB2915">￥<span>{{totalAmount}}</span></span></span></div>
          <div><span>找零：<span class="price" style="color: #3377FF">￥<span>0.00</span></span></span></div>
        </div>
        <div class="dialog-body">
          <div class="item-left">
            <div class="pay-type">选择支付方式</div>
            <div class="card">
              <div class="card-item" @click="onSelect('1')" :class="{active: isShow === '1'}"><img src="@/assets/images/chuxu.png" alt="">储蓄卡</div>
              <div class="card-item" @click="onSelect('2')" :class="{active: isShow === '2'}"><img src="@/assets/images/shebao.png" alt="">社保卡</div>
              <div class="card-item" @click="onSelect('3')" :class="{active: isShow === '3'}"><img src="@/assets/images/rmb.png" alt="">现金</div>
              <div class="card-item" @click="onSelect('4')" :class="{active: isShow === '4'}"><img src="@/assets/images/zhifubao.png" alt="">支付宝</div>
              <div class="card-item" @click="onSelect('5')" :class="{active: isShow === '5'}"><img src="@/assets/images/wx.png" alt="">微信</div>
              <div class="card-item" @click="onSelect('6')" :class="{active: isShow === '6'}"><img src="@/assets/images/pos.png" alt="">POS收银</div>
            </div>
            <div class="back" @click="onList">
              <img src="@/assets/images/ic-back.png" alt="">
              <span>返回列表</span>
            </div>
          </div>
          <div class="item-right">
            <div class="right-bg" v-show="isShow == '' || isShow == '1'">
              <img src="@/assets/images/ic-pay.png" alt="">
              <span class="pay-text">请选择支付方式</span>
            </div>
            <div class="chuxu" v-show="isShow === '1'">
              <div class="pay-type" style="color: #333; font-size: 16px">选择银行储蓄卡</div>
              <div class="selece-bank">
                <div class="bank-list">
                  <div class="item">
                    <img src="@/assets/images/guangzhou.png" alt="">
                    <span>广州银行</span>
                  </div>
                  <el-radio v-model="radio" @click="showCode"></el-radio>
                </div>
                <div class="bank-list">
                  <div class="item">
                    <img src="@/assets/images/huishang.png" alt="">
                    <span>徽商银行</span>
                  </div>
                  <el-radio v-model="radio"></el-radio>
                </div>
                <div class="bank-list">
                  <div class="item">
                    <img src="@/assets/images/guizhou.png" alt="">
                    <span>贵州银行</span>
                  </div>
                  <el-radio v-model="radio"></el-radio>
                </div>
                <div class="bank-list">
                  <div class="item">
                    <img src="@/assets/images/pingan.png" alt="">
                    <span>平安银行</span>
                  </div>
                  <el-radio v-model="radio"></el-radio>
                </div>
              </div>
            </div>
            <div class="xianjin" v-show="isShow === '3'">
              <div class="num-item">
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>￥10</span>
              </div>
              <div class="num-item">
                <span>4</span>
                <span>5</span>
                <span>6</span>
                <span>￥20</span>
              </div>
              <div class="num-item">
                <span>7</span>
                <span>8</span>
                <span>9</span>
                <span>￥50</span>
              </div>
              <div class="num-item">
                <span>0</span>
                <span>00</span>
                <span>.</span>
                <span>￥100</span>
              </div>
              <div class="num-item">
                <span><img src="@/assets/images/del.png" alt=""></span>
                <span style="font-size: 22px; letter-spacing: 2px">清空</span>
                <!-- <span></span> -->
                <span style="width: 56%; color: #fff; background:#438AFE; font-size: 22px; letter-spacing: 2px">结算</span>
              </div>
            </div>
            <div class="xianjin weixin" v-show="isShow === '5'">
              <input type="text" v-model="orderNum" placeholder="请输入微信付款码">
              <button @click="onSurePayr">确定</button>
            </div>
          </div>
        </div>
      </div>
      <!-- 扫码弹窗 -->
      <div class="dialog-scan" v-show="isShowScan">
        <!-- 扫用户付款码 -->
        <div class="pay-code" v-if="!isShowCreateCode">
          <img src="@/assets/images/scan.png" alt="" @click="onPaySuccess">
          <p>请扫描顾客广州银行APP页面的付款码</p>
          <div class="pay-btn">
            <button @click="cancelPay">取消支付</button>
            <button @click="createCode">生成收款二维码</button>
          </div>
        </div>
        <!-- 生成收款码 -->
        <div class="create-code" v-if="isShowCreateCode" @click="onPaySuccess">
          <img src="@/assets/images/code.png" alt="">
          <p>请顾客使用广州银行APP页面扫码付款</p>
        </div>
      </div>
      <!-- 支付完成 -->
      <div class="pay-success" v-show="!isPay">
        <div class="pay-success-left">
          <div class="text-order">
            <span>订单编号：</span>
            <span>支付方式：</span>
            <span>应收金额：</span>
          </div>
          <div class="text-order text-right">
            <span>{{ dealNumber }}</span>
            <span>微信</span>
            <span>￥{{totalAmount}}</span>
          </div>
        </div>
        <div class="pay-success-right">
          <div>
            <div class="success-tip">
              <img src="@/assets/images/success.png" alt="">
              <p class="text-success">支付成功</p>
            </div>
            <div class="order-price">
              <p class="total-price">￥<span>{{totalAmount}}</span></p>
              <p>实收金额：{{totalAmount}}&nbsp;&nbsp;&nbsp;&nbsp;找零金额：<span style="color: #438AFE;">0.00</span></p>
            </div>
          </div>
          <div class="success-btn">
            <button class="print">打印小票</button>
            <button @click="onList">返回列表</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
 
<script>
import Page from '@/components/Pagination/page.vue'
import BarCodeScan from '@/components/BarCodeScan/index.vue'
import httpreques from '@/utils/httpreques';
import moment from "moment";
import {export_json_to_excel} from "@/utils/Export2Excel";
import printJS from 'print-js'
 
export default {
  name: "tab",
  components: {
    Page,
    BarCodeScan
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
      textarea: '',
      tabledata: [],
      sku: 0, // 商品种类
      sum: 0, // 销售数量
      total: 0, // 销售总计
      multipleSelection: [],
      codeInfo: '',
      ruleForm: {
          name: '',
          num: '',
          date1: '',
          date2: ''
      },
      value: undefined,
      radio: '1',
      radio2: 1,
      radio3: 2,
      isDialog: false,
      isShow: '',
      isShowActivity: false, // 是否显示活动弹窗
      isPayMoney: false, // 是否显示付款页面
      isShowCreateCode: false, // 是否生成收款码
      isShowScan: false, // 是否显示扫用户付款码页面
      isPay: true, // 是否支付成功
      isAdd: false,
      isBarcode: '',
      codeObj: {},
      totalAmount: '', // 订单金额
      orderNum: '', // 微信付款码
      dealNumber: ''
    };
  },
  created() {
    // this.getdata()
    this.getTotal()
    if(sessionStorage.getItem('noSaleList')){
        let list = JSON.parse(sessionStorage.getItem('noSaleList'))
        this.tabledata = this.tabledata.concat(list)
      }
  },
  methods: {
    handleBarcode(barcodeMap) {
      this.value = barcodeMap;
    },
    getdata(){
      let parame = {
        "commodityName": "",
        "dealNumber": "",
        "dealType": 1,
        "pageNum": this.pageNum,
        "pageSize": this.pageSize,
        "transactionalNumber": ""
      }
      this.tabledata = []
      httpreques('post', parame, '/realbrand-management-service/Sale/onlinePendingOrder').then(res => {
        console.log(res)
        if(res.data.code === "SUCCESS"){
          let data = res.data.data
          this.total = res.data.total
          data.forEach((item, index) => {
            item.index = index+1
            if(item.price) item.price = item.price.toFixed(2)
            item.createTime = moment(item.createTime).format(
              "YYYY-MM-DD HH:mm:ss"
            )
            if(item.dealType === 0) item.dealType = '门店销售'
            if(item.dealType === 1) item.dealType = '线上商城'
          })
          this.tabledata = data
          console.log(this.tabledata.sku);
          if(sessionStorage.getItem('noSaleList')){
            let list = JSON.parse(sessionStorage.getItem('noSaleList'))
            this.tabledata = this.tabledata.concat(list)
          }
          this.tabledata.reverse()
        }else{
          this.$message(res.data.msg)
        }
      })
    },
    getTotal(){
      httpreques('post', { }, '/realbrand-management-service/CommodityMgt/SaleStatistics').then(res => {
        if(res.data.code === "SUCCESS"){
          this.sum = res.data.data.sum
          this.sku = res.data.data.sku
          this.total = res.data.data.total
        }else{
          this.$message(res.data.msg)
        }
      })
    },
    del(){
      if(this.multipleSelection.length <= 0) return this.$message('请选择需要删除的商品')
      let arr = this.multipleSelection
      let data = this.tabledata
      if(arr){
        arr.forEach((item, index) => {
          data.forEach((itemI, indexI) => {
            if(item.index === itemI.index){
              this.tabledata.splice(indexI, 1)
            }
          })
        })
      }
      sessionStorage.setItem('noSaleList', JSON.stringify(this.tabledata))
    },
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
            item.index = this.tabledata.length+1
            item.scanTime = moment(item.scanTime).format(
              "YYYY-MM-DD HH:mm:ss"
            )
            this.tabledata.push(item) // 数组最前面新增数据
            // this.tabledata.unshift(item) // 数组最前面新增数据
          })
          sessionStorage.setItem('noSaleList', JSON.stringify(this.tabledata))
        }else{
          this.$message(res.data.msg)
        }
      })
    },
    // 订单详情
    onDetail(data){
      console.log(data.dealNumber)
      this.$router.push({
        path: '/clerk/sale/noSaleOrderDetail',
        query: {
          dealNumber: data.dealNumber
        }
      })
    },
    showCode(){
      this.isShowScan = true
      this.isShow = false
      this.isShowCreateCode = false
    },
    // 生成收款码
    createCode(){
      this.isShowCreateCode = true
    },
    // 取消支付
    cancelPay(){
      this.isShowScan = false
    },
    // 启动支付
    onPay(){
      if(this.multipleSelection.length <= 0) return this.$message('请选择需要支付的商品')
      this.isDialog = true
      this.isPayMoney = true
      this.onOrder()
      // this.isShowActivity = true
    },
    // 确定购买, 确定查询商品信息
    onSure(val){
      if(val === '1'){
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
              item.dealType = '门店销售'
            // item.scanTime = moment(item.scanTime).format(
            //     "YYYY-MM-DD HH:mm:ss"
            // )
          })
          sessionStorage.setItem('noSaleList', JSON.stringify(this.tabledata))
          this.tabledata.reverse()
        }else{
          this.$message(res.data.msg)
        }
      })
      }else{
        this.isPayMoney = true
        this.isShowActivity = false
      }
    },
    onCancel(){
      this.isAdd = false
      this.isDialog = false
    },
    // 返回列表
    onList(){
      this.isDialog = false
      this.isPayMoney = false
      this.isShow = false
      this.isPay = true
    },
    // 支付成功
    onPaySuccess(){
      this.isPay = false
      this.isShowScan = false
      this.isPayMoney = false
    },
    // 选择支付方式
    onSelect(val){
      this.isShow = val
    },
    // 生成订单
    onOrder(){
      let arr = this.multipleSelection
      let obj = {}
      arr.forEach((item, index) => {
        let { barcode } = item
        if(!obj[barcode]){
          obj[barcode] = {
            barcode,
            price: item.price,
            commodityCodeList: []
          }
        }
        obj[barcode].commodityCodeList.push(item.commodityCode)
      })
      let list = Object.values(obj)
      console.log(list)
      let params = {
        "itemList": list,
        "payMethod": 4
      }
      httpreques("post", params, "/realbrand-store-service/Sale/generateOrder").then((res) => {
        console.log(res);
        if (res.data.code === "SUCCESS") {
          this.$message.success('生成订单成功')
          let data = res.data.data
          this.totalAmount = data.totalAmount
          this.dealNumber = data.dealNumber
        }else{
          this.$message(res.data.msg)
        }
      })
    },
    // 门店扫码支付
    onSurePayr(){
      let params = {
        "code": this.orderNum, // 微信付款码
        "dealNumber": this.dealNumber // 订单号
      }
      httpreques("post", params, "/realbrand-store-service/Sale/storeScanCodePay").then((res) => {
        console.log(res);
        if (res.data.code === "SUCCESS") {
          this.$message.success('支付成功')
          this.queryPayOrder()
        }else{
          this.$message(res.data.msg)
        }
      })
    },
    // 查询支付结果
    queryPayOrder(){
      httpreques("post", {"dealNumber": this.dealNumber}, "/realbrand-store-service/Sale/storeScanCodePay").then((res) => {
        console.log(res);
        if (res.data.code === "SUCCESS") {
          this.$message.success('支付成功')
          this.isPay = false
          this.isPayMoney = false
        }else{
          this.$message(res.data.msg)
        }
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
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
    scan(){
      this.isAdd = true
    },
    printTable(id) {
      const html = document.querySelector('#' + id).innerHTML
      // 新建一个 DOM
      const div = document.createElement('div')
      const printDOMID = 'printDOMElement'
      div.id = printDOMID
      div.innerHTML = html

      // 提取第一个表格的内容 即表头
      const ths = div.querySelectorAll('.el-table__header-wrapper th')
      const ThsTextArry = []
      for (let i = 0, len = ths.length; i < len; i++) {
        // if (ths[i].innerText !== '') 
        ThsTextArry.push(ths[i].innerText)
      }

      // 删除多余的表头
      div.querySelector('.hidden-columns').remove()
      // 第一个表格的内容提取出来后已经没用了 删掉
      div.querySelector('.el-table__header-wrapper').remove()

      // 将第一个表格的内容插入到第二个表格
      let newHTML = '<tr>'
      for (let i = 0, len = ThsTextArry.length; i < len; i++) {
        newHTML += '<td style="text-align: center; font-weight: bold">' + ThsTextArry[i] + '</td>'
      }
      newHTML += '</tr>'
      div.querySelector('.el-table__body-wrapper table').insertAdjacentHTML('afterbegin', newHTML)
      // 将新的 DIV 添加到页面 打印后再删掉
      document.querySelector('body').appendChild(div)

      printJS({
        printable: printDOMID,
        type: 'html',
        header: '待售出商品列表',
        headerStyle: 'text-align:center;color:#000;width:100%;border:1px #000 solid;',
        // targetStyles: ['border', 'padding: 15px'],
        scanStyles: false,
        style: 'table tr td,th { border-collapse: collapse;padding: 5px;border:1px #000 solid; }' // 表格样式
      })

      div.remove()
    },
    exportExcel() {
      let t = this;
      var tHeader = [
        "商品69编码",
        "商品名称",
        "商品规格",
        "品牌",
        "单价（元）",
        "促销价（元）",
        "活动名称",
        "待售出数量",
        "订单号",
        "订单类型",
        "支付业务编号"
      ];
      var filterVal = [
        "barcode",
        "commodityName",
        "specsParameter",
        "brandName",
        "price",
        "price",
        "name",
        "sum",
        "dealNumber",
        "dealType",
        "transactionalNumber"
      ];

      var filename = "待售出商品列表";
      const list = this.tabledata;
      var data = t.formatJson(filterVal, list);
      export_json_to_excel({header: tHeader, data, filename});
    },
    //序列化json数据
    formatJson(filterVal, tableData) {
      return tableData.map((v) => {
        return filterVal.map((j) => {
          return v[j];
        });
      });
    }
  },
};
</script>
 
<style lang="scss" scoped>
@import '@/assets/css/reset.scss';
@import '@/assets/css/image1';
.pay-dialog1{
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
}
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
  letter-spacing: 6px;
  font-weight: 600;
  img{
    width: 20px;
    height: 20px;
  }
}
.dialog-body{
  padding: 20px 30px 30px;
  background: #fff;
  font-size: 16px;
  p{
    text-align: center;
    margin-bottom: 20px;
    font-size: 18px;
  }
  .activity{
    display: flex;
    justify-content: space-between;
  }
  .activity-item{
    display: flex;
    margin-right: 20px;
    width: 50%;
    background: #FAFBFF;
    border-radius: 4px;
    border: 1px solid #DEDEDE;
    span{
      display: inline-block;
      padding-top: 16px;
    }
    span:last-child{
      padding-bottom: 16px;
    }
    .item-left{
      display: flex;
      flex-flow: column;
      padding-left: 16px;
      color: #384F71;
    }
    .item-right{
      color: #666;
      display: flex;
      flex-flow: column;
      margin-left: 10px;
    }
  }
  .activity-item:last-child{
    margin-right: 0;
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
.dialog-pay-type{
  width: 930px;
  .dialog-top{
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 12px 0;
    background: #fff;
    color: #333;
    font-size: 18px;
    div{
      width: 33%;
      border-right: 1px solid #E7E9EC;
      text-align: center;
    }
    div:last-child{
      border-right: 0;
      padding-right: 0;
    }
    .price{
      span{
        font-size: 32px;
      }
    }
  }
  .dialog-body{
    display: flex;
    margin-top: 10px;
    .item-left{
      width: 200px;
      margin-right: 10px;
      .back{
        margin-top: 10px;
        background: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        img{
          margin-right: 10px;
          padding: 16px 0;
        }
      }
    }
    .pay-type{
      padding: 15px 0;
      background: #F6F7FB;
      text-align: center;
      font-size: 18px;
      color: #384F71;
    }
    .card{
      display: flex;
      flex-direction: column;
      background: #fff;
      .card-item{
        display: flex;
        align-items: center;
        padding: 20px 30px;
        border-top: 1px solid #E7E9EC;
        font-size: 16px;
        cursor: pointer;
        img{
          margin-right: 8px;
        }
      }
      .card-item:first-child{
        border-top: none;
      }
    }
    .item-right{
      position: relative;
      width: 100%;
      background: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .right-bg{
        display: flex;
        align-items: center;
        flex-direction: column;
      }
      .pay-text{
        margin-top: 12px;
        font-size: 20px;
        color: #666;
      }
    }
  }
}
.chuxu{
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  font-size: 16px;
  box-shadow: 0px 0px 8px 0px rgba(2, 9, 25, 0.2);
  .bank-list{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 24px;
      border-bottom: 1px solid #E7E9EC;
      .item span{
        margin-top: 0;
        font-size: 16px;
      }
      .item{
        display: flex;
        align-items: center;
        margin-right: 40px;
        img{
          margin-right: 10px;
        }
      }
      
    }
}
.xianjin{
  width: 100%;
  height: 100%;
  padding: 26px;
  .num-item{
    height: 18%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
    span{
      display: flex;
      justify-content: center;
      align-items: center;
      width: 22%;
      height: 100%;
      margin-right: 10px;
      background: #F5F9FC;
      box-shadow: 0px 2px 4px rgba(4, 24, 39, 0.12);
      font-size: 30px;
      cursor: pointer;
    }
    span:last-child{
      width: 34%;
      margin-right: 0;
      border-radius: 6px;
      color: #FCB51A;
    }
  }
}
.dialog-scan{
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  .pay-code{
    display: flex;
    align-items: center;
    flex-direction: column;
    color: #fff;
    p{
      padding: 20px 0 40px 0;
      font-size: 20px;
    }
    button{
      width: 170px;
      height: 50px;
      line-height: 50px;
      background: transparent;
      border: 1px solid #fff;
      border-radius: 4px;
      outline: none;
      color: #fff;
      cursor: pointer;
    }
    button:last-child{
      margin-left: 20px;
      background: #438AFE;
      border: 1px solid #438AFE;
    }
  }
  .create-code{
    display: flex;
    align-items: center;
    flex-direction: column;
    color: #fff;
    font-size: 20px;
    img{
      width: 300px;
      height: 300px;
      margin-bottom: 20px;
    }
  }
}
.pay-success{
  height: 620px;
  display: flex;
  justify-content: space-between;
  .pay-success-left{
    display: flex;
    background: #fff;
    height: 100%;
    padding: 10px;
    font-size: 14px;
    .text-order{
      display: flex;
      flex-direction: column;
      span{
        padding: 10px 0;
      }
    }
    .text-right{
      color: #384F71;
    }
  }
  .pay-success-right{
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    width: 650px;
    margin-left: 10px;
    padding: 60px 0;
    background: #fff;
    font-size: 16px;
    color: #666;
    .success-tip{
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      margin-bottom: 30px;
    }
    img{
      width: 68px;
      height: 68px;
      margin-bottom: 10px;
    }
    .text-success{
      color: #3DC637;
    }
    .order-price{
      .total-price{
        margin-bottom: 12px;
        text-align: center;
        color: #FB2915;
        span{
          font-size: 40px;
        }
      }
    }
    .success-btn{
      display: flex;
      flex-direction: column;
      button{
        width: 450px;
        padding: 15px 0;
        background: #FAFCFE;
        border: 1px solid #BBCBDF;
        border-radius: 4px;
        font-size: 16px;
        outline: none;
        cursor: pointer;
      }
      .print{
        margin-bottom: 20px;
        background: #438AFE;
        border: 1px solid #438AFE;
        color: #fff;
      }
    }
  }
}
.dialog-content .dialog-body .activity-item .el-radio-group span{
  padding: 0;
}
.dialog-content .dialog-body .activity-item .el-radio-group .el-radio__label{
  padding-left: 8px;
}
.dialog-content .dialog-body .activity-item .el-radio-group .el-radio{
  padding-left: 20px;
}
.dialog-content .dialog-body .activity-item .el-radio-group .el-radio:first-child{
  padding-left: 0;
}
.dialog-pay-type .dialog-body .card >.card-item.active{
  border: 1px solid #3175FC;
  border-top: 1px solid #3175FC;
  background: #EBF0FB;
}
.weixin{
  input{
    width: 200px;
    height: 30px;
    padding: 10px;
    border: 1px solid #3175FC;
    outline: none;
    font-size: 14px;
  }
  button{
    height: 30px;
    padding: 0 20px;
    margin-left: 20px;
    border: 1px solid #3175FC;
    border-radius: 2px;
    background: #3175FC;
    color: #fff;
    outline: none;
  }
}
</style>