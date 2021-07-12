<template>
  <div class="tab">
    <div class="tab-title">
      <div class="left">
        <div class="print" @click="add"><img class="icon" src="../../../assets/images/add.png" alt=""><span class="axis">增加等级</span></div>
        <div class="print" @click="edit"><img class="icon" src="../../../assets/images/edit.png" alt=""><span class="axis">编辑等级</span></div>
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
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="index" label="序号" align="center" sortable width="80"></el-table-column>
        <el-table-column prop="orgCode" label="等级编号" align="center" sortable width="140"></el-table-column>
        <el-table-column prop="storeName" label="等级名称" sortable width="150"></el-table-column>
        <el-table-column prop="address" label="所需成长值" sortable width="140"></el-table-column>
        <el-table-column prop="storeType" label="等级折扣" align="center" sortable width="140"></el-table-column>
        <el-table-column label="" align="center" width="1022" ></el-table-column>
      </el-table>
    </div>
    <div class="bot">
      <Page :total="total" :current="pageNum" :pageSize="pageSize" @changeCurrentPage="changeCurrentPage"></Page>
    </div>
    <el-dialog
      title="增加等级"
      v-model="centerDialogVisible"
      width="30%"
      center
      :close-on-click-modal="false"
    >
    <el-form :model="ruleForm">
      <el-form-item label="等级编号：" style="display:flex">
        <el-input v-model="ruleForm.sortName" placeholder="请输入等级编号"></el-input>
      </el-form-item>
      <el-form-item label="等级名称：" style="display:flex">
        <el-input v-model="ruleForm.sortName" placeholder="请输入等级名称"></el-input>
      </el-form-item>
      <el-form-item label="所需成长值：" style="display:flex">
        <el-input v-model="ruleForm.sortName" placeholder="请输入所需成长值"></el-input>
      </el-form-item>
      <div class="a">线上订单每满<span class="red">10元</span>增加<span class="red">1</span>个成长值</div>
      <el-form-item label="等级名称：" style="display:flex">
        <el-input v-model="ruleForm.sortName" placeholder="请输入等级名称"></el-input>
      </el-form-item>
      <div class="a red">在售价基础上享受的折扣，10表示不打折，即按商品单价销售</div>
    </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="add"
          >确 定</el-button
        >
        <el-button @click="centerDialogVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Page from '@/components/Pagination/page.vue'
import httpreques from '../../../utils/httpreques';
import {export_json_to_excel} from "@/utils/Export2Excel";
import printJS from 'print-js'
export default {
  name: "Memberset",
  components: {
    Page
  },
  data() {
    return {
      total: 0,
      pageSize: 20,
      pageNum: 1,
      tabledata: [],
      totalNum: 0,
      dialogImageUrl:"",
      centerDialogVisible:false,
      ruleForm: {
          storeName: '',
          storeType: ''
      },
      multipleSelection: []
    };
  },
  created() {
    // this.getdata()
  },
  methods: {
    edit(){},
    add(){
      this.centerDialogVisible = true
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
        header: '会员等级设置列表',
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
        "等级编号",
        "等级名称",
        "所需成长值",
        "等级折扣"
      ];
      var filterVal = [
        "ruleId",
        "ruleName",
        "ruleType",
        "ruleDescribe"
      ];

      var filename = "会员等级设置列表";
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
/deep/.el-form-item--small .el-form-item__label {
    width: 96px;
    padding: 0;
}
.a{
  font-size: 12px;
  margin-left: 124px;
  margin-bottom: 10px;
}
.red{
  color: #F53836;
}
</style>
