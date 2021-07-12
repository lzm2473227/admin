<template>
  <div class="tab">
    <div class="tab-title">
      <div class="left">
        <div class="print" @click="goBack"><img class="icon" src="@/assets/images/back.png" alt=""><span class="axis">返回列表</span></div>
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
      :row-class-name="tableRowClassName"
      id="printJS-table"
      ref="singleTable"
      :data="tableData"
      style="width: 100%"
      highlight-current-row
      @current-change="handleCurrentChange"
      :default-sort="{ prop: 'date', order: 'descending' }"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="index" label="序号" align="center" sortable width="80"></el-table-column>
        <el-table-column prop="barcode" label="商品69编码" align="center" sortable width="140"></el-table-column>
        <el-table-column prop="commodityName" label="商品名称" sortable width="230" show-overflow-tooltip></el-table-column>
        <el-table-column prop="price" label="单价（元）" sortable width="110" align="right">
          <template v-slot="scope">
						{{ scope.row.price }}
					</template>
        </el-table-column>
        <el-table-column prop="time" label="上次盘货时间" align="center" sortable width="160" ></el-table-column>
        <el-table-column prop="specsParameter" label="上次盘货员" sortable width="120"></el-table-column>
        <el-table-column prop="brandName" label="上次账存数" sortable width="120"></el-table-column>
        <el-table-column prop="manufacturer" label="上次盘货数" sortable width="120"></el-table-column>
        <el-table-column prop="manufacturer" label="本次盘货时间" sortable width="160"></el-table-column>
        <el-table-column prop="manufacturer" label="本次盘货员" sortable width="120"></el-table-column>
        <el-table-column prop="manufacturer" label="本次账存数" sortable width="120"></el-table-column>
        <el-table-column prop="manufacturer" label="本次盘货数" sortable width="120"></el-table-column>
        <el-table-column label="" align="center" width="75" ></el-table-column>
      </el-table>
    </div>
    <div class="bot">
      <Page :total="total" :current="pageNum" :pageSize="pageSize" @changeCurrentPage="changeCurrentPage"></Page>
    </div>
    <div class="total">
      <div class="statistic-item1">已盘货商品种类：<span>{{barCount}}</span></div>
      <div class="statistic-item2">已盘货商品数量：<span>{{count}}</span></div>
      <div class="statistic-item3">已盘货商品金额：<span class="small">￥</span><span>{{price}}</span></div>
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
import httpreques from '@/utils/httpreques';
import {export_json_to_excel} from "@/utils/Export2Excel";
import printJS from 'print-js'
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
      textarea: '',
      tabledata: [],
      price: 0,
      barCount: 0,
      count: 0,
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
  created() {
    this.getdata()
    this.getTotal()
  },
  methods: {
    getdata(){
      let parame = {
        "barcode": '',
        "flag": "1",
        "inventoryTime": '',
        "like": '',
        "flag": '',
        "flag": '',
        "storeName": '',
        "userName": '',
        "pageNum": this.pageNum,
        "pageSize": this.pageSize
      }
      this.tabledata = []
      httpreques('post', parame, '/realbrand-store-service/StoreInventory/commodityCount').then(res => {
        console.log(res)
        if(res.data.code === "SUCCESS"){
          let data = res.data.data
          data.length == 0 ? this.total = 0 : this.total = res.data.total
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
    // 获取单品编码数量、商品种类、金额
    getTotal(){
      let parame = {
        "city": "",
        "fdate": "",
        "ldate": "",
        "like": "",
        "pageNum": 0,
        "pageSize": 0,
        "province": "",
        "storeId": "",
        "userIdNumber": ""
      }
      httpreques('post', parame, '/realbrand-management-service/Inventory/YesInventoryCount').then(res => {
        console.log(res)
        if(res.data.code === "SUCCESS"){
          this.barCount = res.data.data.barCount
          this.count = res.data.data.count
          this.price = res.data.data.price
        }else{
          this.$message(res.data.msg)
        }
      })
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
    scan(){
      this.centerDialogVisible = true
    },
    goBack(){
        this.$router.go(-1)
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
        header: '待盘货统计商品列表',
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
        "单价（元）",
        "上次盘货时间",
        "上次盘货员",
        "上次账存数",
        "上次盘货数",
        "本次盘货时间",
        "本次盘货员",
        "本次账存数",
        "本次盘货数"
      ];
      var filterVal = [
        "commodityCode",
        "barcode",
        "commodityName",
        "specsParameter",
        "brandName",
        "manufacturer",
        "price",
        "time"
      ];

      var filename = "待盘货统计商品列表";
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
@import '@/assets/css/reset';
@import '@/assets/css/image1'
</style>
