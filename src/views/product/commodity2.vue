<template>
  <div class="tab">
    <div class="tab-title">
      <div class="left">
        <div class="print" @click="soldout()">
          <img class="icon" src="../../assets/images/delete.png" alt="" /><span class="axis">线上商城下架</span>
        </div>
        <div class="print" @click="printTable('printJS-table')">
          <img class="icon" src="../../assets/images/print.png" alt="" /><span class="axis">打印列表</span>
        </div>
        <div class="print" @click="exportExcel">
          <img class="icon" src="../../assets/images/derive.png" alt="" /><span class="axis">导出表格</span>
        </div>
      </div>
      <div class="right">
        <div class="setup">
          <img
            class="set"
            src="../../assets/images/ic-设置.png"
            alt="系统设置"
            @click="setup"
          />
        </div>
      </div>
    </div>
    <div class="tab-body inside-table">
      <el-table
        id="printJS-table"
        :row-class-name="tableRowClassName"
        ref="multipleTable2"
        :data="tabledata"
        style="width: 100%"
        highlight-current-row
        @selection-change="handleSelectionChange"
        :default-sort="{ prop: 'date', order: 'descending' }"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="index" label="序号" align="center" sortable width="80"></el-table-column>
        <el-table-column prop="barcode" label="商品69编码" align="center" sortable width="150">
          <template v-slot="scope">
            <span>{{scope.row.barcode}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="commodityName" label="商品名称" sortable width="180" show-overflow-tooltip></el-table-column>
        <el-table-column prop="specsParameter" label="规格" width="120" sortable show-overflow-tooltip></el-table-column>
        <el-table-column prop="brandName" show-overflow-tooltip label="品牌"   width="120" sortable></el-table-column>
        <el-table-column prop="manufacturer" label="生产厂商" width="180" sortable show-overflow-tooltip></el-table-column>
        <el-table-column prop="classifyRsp.m" label="商品一级类别" width="160" sortable></el-table-column>
        <el-table-column prop="classifyRsp.p" label="商品二级类别" width="160" sortable></el-table-column>
        <el-table-column prop="classifyRsp.b" label="商品三级类别" width="160" sortable></el-table-column>
        <el-table-column label="单价（元）" sortable width="110" align="right">
          <template v-slot="scope"> {{ scope.row.price }}</template>
        </el-table-column>
        <el-table-column label="图片" align="center" sortable width="150">
          <template v-slot="scope">
            <el-image class="preview-img" :src="scope.row.classifyRsp.image" :preview-src-list="srcList" @click="onPre(scope.row)"></el-image>
          </template>
        </el-table-column>
        <el-table-column label="" align="center" width="105" ></el-table-column>
      </el-table>
    </div>
    <div class="bot">
      <Page :total="total" :current="pageNum" :pageSize="pageSize" @changeCurrentPage="changeCurrentPage"></Page>
    </div>
    <div class="inp-bot">
      <div class="search-ipt search-select">
        <select v-model="name">
          <option value="1">商品名称</option>
          <option value="2">69码</option>
        </select>
        <input v-if="name === '1'" type="text" placeholder="请输入商品名称" v-model="ruleForm.commodityName">
        <input v-else type="text" placeholder="请输入或扫描商品69码" v-model="ruleForm.barCode">
        <img v-show="name === '2'" @click="scan" src="@/assets/images/ic-code.png" alt="">
      </div>
      <div class="search-ipt">
        <span class="ipt-left">商品单价</span>
        <input type="text" placeholder="请输入商品单价" v-model="ruleForm.price">
      </div>
      <div class="search-ipt">
        <span class="ipt-left">商品品牌</span>
        <input type="text" placeholder="请输入商品品牌" v-model="ruleForm.brandName">
      </div>
      <div class="search-ipt">
        <span class="ipt-left">商品类别</span>
        <select name="" id="" v-model="ruleForm.category">
          <option value="一级类别">一级类别</option>
          <option value="二级类别">二级类别</option>
          <option value="三级类别">三级类别</option>
        </select>
      </div>
      <div class="search-btn">
        <button @click="submitForm">查询</button>
        <button @click="resetForm" class="reset-btn">重置</button>
      </div>
    </div>
    <div class="pay-dialog" v-show="isDialog">
      <div class="dialog-content">
        <div class="dialog-top">
          <span>新增商品</span>
          <img @click="onBtn('1')" src="@/assets/images/close.png" alt="">
        </div>
        <div class="dialog-body">
          <input type="text" placeholder="请扫描或输入单品编码" v-model="barcode">
          <div class="scan-code">
            <button class="sure" @click="onBtn('2')">确定</button>
            <button @click="onBtn('1')">取消</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Page from '@/components/Pagination/page'
import httpreques from "../../utils/httpreques"
import {export_json_to_excel} from "@/utils/Export2Excel"
import printJS from 'print-js'

export default {
  name: "commodity2",
  components: {
    Page
  },
  data() {
    return {
      radio1: "按商品69编码统计",
      textarea: "",
      tabledata: [],
      totalNum: 0,
      multipleSelection: [],
      ruleForm: {
        commodityName: "",
        price: "",
        brandName:"",
        category:"",
        barCode: ''
      },
      name: '1',
      total: 0,
      pageSize: 20,
      pageNum: 1,
      srcList: [],
      isDialog: false
    };
  },
  mounted() {
    this.getdata()
  },
  methods: {
    getdata() {
      let len = []
      let t = this;
      let params= {
        brandName: this.ruleForm.brandName,
        categoryId: this.ruleForm.category,
        commodityName: this.ruleForm.commodityName,
        pageNum: t.pageNum,
        pageSize: t.pageSize,
        price: this.ruleForm.price
      }
      httpreques(
        "post",
         params,
        "/realbrand-management-service/CommodityMgt/OnSaleCommodityList"
      ).then((res) => {
        console.log(res);
        if (res.data.code == "SUCCESS") {
          t.total = res.data.total;
          t.pageSize = res.data.pageSize;
          t.pageNum = res.data.pageNum;
          // 序号倒序排列
          let arr=new Array(this.total).join(',').split(',').map((item,index)=>{
            return index+1;
          })
          arr = arr.reverse()
          len = arr.slice((this.pageNum-1)*this.pageSize, this.pageNum*this.pageSize) // 获取数组最后 20 个元素
          _.forEach(res.data.data, function (item, key) {
            item.index = len[key]
            item.b = item.classifyRsp.b
            item.m = item.classifyRsp.m
            item.p = item.classifyRsp.p
          });
          t.tabledata = res.data.data;
          // t.categoryImage = res.data.data.categoryImage;
          // t.tabledata.reverse()
        } else {
          this.$message(res.data.msg);
        }
      });
    },
    //下架
    soldout(){
      if(this.multipleSelection.length <= 0) return this.$message.error('请选择需要下架的商品')
      let t = this;
      let codearr = [];
      _.forEach(
        JSON.parse(JSON.stringify(t.multipleSelection)),
        function (item, key) {
          codearr.push(item.barcode);
        }
      );
      // console.log(codearr);  //要进行数据转换，把数组变为字符串
      // codearr = codearr.toString();
      // console.log(t.multipleSelection);
      // console.log(codearr);
      let params = {
        barcode: codearr,commodityState:0
      };
      httpreques(
        "post",
        params,
        "/realbrand-management-service/CommodityMgt/ChangeCommodityState"
      ).then((res) => {
        console.log(res);
        if (res.data.code == "SUCCESS") {
          this.$message.success("下架成功!");
          this.getdata()
        } else {
          this.$message(res.data.msg);
        }
      });
    },
    // 图片预览
    onPre(data){
      this.srcList = []
      let list = `${data.classifyRsp.image}`
      this.srcList = list.split(',')
    },
    scan() {
      this.isDialog = true;
    },
    onBtn(val){
      if(val === '1') this.isDialog = false;
      if(val === '2') this.getdata()
    },
    //获取表格的所有值
    handleSelectionChange(val){
      this.multipleSelection = val
      // console.log(this.multipleSelection);
      // console.log(val);
    },  
    //分页
    changeCurrentPage(val) {
      this.pageNum = val;
      this.getdata();
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
        header: '上架中商品列表',
        headerStyle: 'text-align:center;color:#000;width:100%;border:1px #000 solid;',
        // targetStyles: ['border', 'padding: 15px'],
        scanStyles: false,
        style: 'table tr td,th { border-collapse: collapse;padding: 15px;border:1px #000 solid; }' // 表格样式
      })

      div.remove()
    },
    exportExcel() {
      let t = this;
      var tHeader = [
        "商品69编码",
        "商品名称",
        "规格",
        "品牌",
        "生产厂商",
        "商品一级类别",
        "商品二级类别",
        "商品三级类别",
        "单价（元）",
        "图片",
      ];
      var filterVal = [
        "barcode",
        "commodityName",
        "specsParameter",
        "brandName",
        "manufacturer",
        "m",
        "p",
        "b",
        "price",
        "filePath"
      ];

      var filename = "上架中商品列表";
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
    },
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/reset.scss";
@import "@/assets/css/image2.scss";
/deep/.tab-body{
  height: 676px;
}
/deep/.inside-table .el-table .el-table__header th{
  padding: 5px 0;
}
/deep/.inside-table .el-table .el-table__body td{
  padding: 2px 0;
}
</style>
