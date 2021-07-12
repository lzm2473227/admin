<template>
  <div class="tab">
    <div class="tab-title">
      <div class="left">
        <div class="print" @click="addMachine"><img class="icon" src="../../assets/images/add.png" alt=""><span class="axis">新增主题活动</span></div>
        <div class="print" @click="editMachine"><img class="icon" src="../../assets/images/edit.png" alt=""><span class="axis">编辑主题活动</span></div>
        <div class="print" @click="delMachine"><img class="icon" src="../../assets/images/delete.png" alt=""><span class="axis">删除主题活动</span></div>
        <div class="print" @click="printTable('printJS-table')"><img class="icon" src="../../assets/images/print.png" alt=""><span class="axis">打印列表</span></div>
        <div class="print" @click="exportExcel"><img class="icon" src="../../assets/images/derive.png" alt=""><span class="axis">导出表格</span></div>
      </div>
      <div class="right">
        <div class="setup">
          <img class="set" src="../../assets/images/ic-设置.png" alt="系统设置" @click="setup">
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
        <el-table-column prop="titleNumber" label="主题编号" align="center" sortable width="150"></el-table-column>
        <el-table-column prop="titleName" label="活动主题名称" align="center" sortable width="200"></el-table-column>
        <el-table-column prop="c" label="描述" align="center" sortable width="300"></el-table-column>
        <el-table-column label="" align="center" width="940" ></el-table-column>
      </el-table>
    </div>
    <div class="bot">
      <Page :total="total" :current="pageNum" :pageSize="pageSize" @changeCurrentPage="changeCurrentPage"></Page>
    </div>
    <el-dialog
      title="新增活动主题"
      v-model="centerDialogVisible"
      width="30%"
      center
      :close-on-click-modal="false"
    >
    <el-form :model="ruleForm">
      <el-form-item label="主题编号：" style="display:flex">
        <el-input v-model="ruleForm.sortName" placeholder="请输入主题编号" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="主题名称：" style="display:flex">
        <el-input v-model="ruleForm.sortName" placeholder="请输入主题名称" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="主题描述：" style="display:flex">
        <el-input v-model="ruleForm.sortName" :autosize="{ minRows: 6, maxRows: 10}" type="textarea" placeholder="请输入主题描述" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="add"
          >确 定</el-button
        >
        <el-button @click="centerDialogVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <div class="inp-bot">
      <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="input-with-select">
        <el-form-item label="主题活动编号:" prop="meid" class="name-search">
          <el-input v-model="ruleForm.meid"></el-input>
        </el-form-item>
        <el-form-item label="活动主题名称:" prop="type">
          <el-input v-model="ruleForm.type"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="a" type="primary" @click="submitForm">查询</el-button>
          <el-button class="a" type="primary" @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Page from '@/components/Pagination/page.vue'
import httpreques from '../../utils/httpreques';
import moment from "moment";
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
      tabledata: [],
      filePath:"",
      ruleForm: {
        a:"",
      },
      multipleSelection : [],
      centerDialogVisible:false
    };
  },
  created() {
    this.getdata();
  },
  methods: {
    
    // 主题活动列表
    getdata() {
      this.tabledata = [];
      httpreques(
        "post",
        {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
        },
        "/realbrand-management-service/Activity/ActivityTitle"
      ).then((res) => {
        console.log(res);
        let { data } = res.data;
        this.total = res.data.data? res.data.total:0
        data.forEach((item) => {
          item.bindingTime = moment(item.bindingTime).format(
            "YYYY-MM-DD HH:mm:ss"
          );
        });
        res.data.data.forEach((item,key) => {
          item.index = key + 1; //加入index
        })
        this.tabledata = res.data.data
        this.tabledata.reverse();
      });
    },
    //新增主题
    addMachine(){
      this.centerDialogVisible = true
    },
    changeCurrentPage(val) {
      this.pageNum = val
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
        header: '主题设置列表',
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
        "主题编号",
        "活动主题名称",
        "描述"
      ];
      var filterVal = [
        "titleNumber",
        "titleName",
        "c"
      ];

      var filename = "主题设置列表";
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
@import '../../assets/css/reset.scss';
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
/deep/.el-textarea__inner{
  width: 152%;
}
</style>
