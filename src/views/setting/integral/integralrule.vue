<template>
  <div class="tab">
    <div class="tab-title">
      <div class="left">
        <div class="print" @click="edit"><img class="icon" src="../../../assets/images/edit.png" alt=""><span class="axis">编辑规则</span></div>
        <div class="print" @click="printTable('printJS-table')"><img class="icon" src="../../../assets/images/print.png" alt=""><span class="axis">打印列表</span></div>
        <div class="print" @click="exportExcel"><img class="icon" src="../../../assets/images/derive.png" alt=""><span class="axis">导出表格</span></div>
      </div>
      <div class="right">
        <div class="setup">
          <img class="set" src="../../../assets/images/ic-设置.png" alt="系统设置" @click="setup">
        </div>
      </div>
    </div>
    <div class="tab-body inside-table">
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
        <el-table-column prop="index" label="序号" align="center" sortable width="80"></el-table-column>
        <el-table-column prop="ruleId" label="规则编号" align="center" sortable width="160"></el-table-column>
        <el-table-column prop="ruleName" label="规则名称" sortable width="180" show-overflow-tooltip></el-table-column>
        <el-table-column prop="ruleType" label="规则类型" sortable width="150"></el-table-column>
        <el-table-column prop="ruleDescribe" label="规则描述"  sortable width="320" show-overflow-tooltip></el-table-column>
        <el-table-column prop="validityPeriod" label="有效期/年" align="center" width="85" ></el-table-column>
      </el-table>
    </div>
    <div class="bot">
      <Page :total="total" :current="pageNum" :pageSize="pageSize" @changeCurrentPage="changeCurrentPage"></Page>
    </div>
  </div>
</template>

<script>
import Page from '@/components/Pagination/page.vue'
import httpreques from '../../../utils/httpreques';
import {export_json_to_excel} from "@/utils/Export2Excel";
import printJS from 'print-js'
export default {
  name: "Integralrule",
  components: {
    Page
  },
  data() {
    return {
      ruleType:0,
      total: 0,
      pageSize: 20,
      pageNum: 1,
      tabledata: [],
      totalNum: 0,
      dialogImageUrl:"",
      ruleForm: {
          storeName: '',
          storeType: '',
      },
      multipleSelection: [],
      // a:1,
      // b:0,
    };
  },
  created() {
    this.getdata()
  },
  methods: {
    edit(){
      this.$router.push("newintegralrule")
    },
    getdata() {
      let len = []
      httpreques(
        "post",
        {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
        },
        "/realbrand-management-service/IntegralMgt/IntegralRuleList"
      ).then((res) => {
        console.log(res.data.data);
        if (res.data.code == "SUCCESS") {
          this.total = res.data.total;
          // 序号倒序排列
          let arr=new Array(this.total).join(',').split(',').map((item,index)=>{
            return index+1;
          })
          arr = arr.reverse()
          len = arr.slice((this.pageNum-1)*this.pageSize, this.pageNum*this.pageSize) // 获取数组最后 20 个元素
          _.forEach(res.data.data, function (item, key) {
            // let ruleType
            // let a = 0
            item.index = key+1
            // item.index = len[key]
            // console.log(item);
            // ruleType = item.ruleType
            // console.log(ruleType);
            // a = item.ruleType ? "积分减少" : "积分增加"
            // res.data.data[5].ruleType = 1 ? "积分减少" : "积分增加"
            // res.data.data[0].ruleType = 0 ? "积分减少" : "积分增加"
            if(item.ruleType===0){
              item.ruleType = "积分增加"
            }else{
              item.ruleType = "积分减少"
            }
            // this.ruleType = 0 ? '积分增加' : '积分减少'
          });
          this.tabledata = res.data.data;
          // console.log(this.tabledata);
          this.tabledata.reverse()
        } else {
          this.$message(res.data.msg);
        }
      });
    },
    handleSelectionChange(val){
      this.multipleSelection = val
      // console.log(this.multipleSelection);
      console.log(val);
    }, 
    changeCurrentPage(val){
      this.pageNum = val
      this.getdata()
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
        header: '积分规则设置列表',
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
        "规则编号",
        "规则名称",
        "规则类型",
        "规则描述",
        "有效期/年"
      ];
      var filterVal = [
        "ruleId",
        "ruleName",
        "ruleType",
        "ruleDescribe",
        "validityPeriod"
      ];

      var filename = "积分规则设置列表";
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
@import '../../../assets/css/reset.scss';
@import "@/assets/css/image3.scss";
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
