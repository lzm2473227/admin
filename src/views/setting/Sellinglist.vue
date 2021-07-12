<template>
  <div class="sellinglist">
    <div class="tab-title">
      <div class="left">
        <div class="print" @click="addStore"><img class="icon" src="../../assets/images/add.png" alt=""><span class="axis">匹配商品小类</span></div>
        <div class="print" @click="delstore"><img class="icon" src="../../assets/images/delete.png" alt=""><span class="axis">删除匹配商品</span></div>
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
        <el-table-column prop="index" label="序号" align="center" sortable width="75"></el-table-column>
        <el-table-column prop="barcode" label="活动编号" align="center" sortable width="160"></el-table-column>
        <el-table-column prop="" label="活动名称" sortable width="160" align="center"></el-table-column>
        <el-table-column prop="" label="活动对象" align="center" sortable width="120"></el-table-column>
        <el-table-column prop="" label="起止时间" sortable align="center" width="300" ></el-table-column>
        <el-table-column prop="activityState" label="活动状态" sortable align="center" width="140" >
          <el-tag type="success" disable-transitions>启用</el-tag>
        </el-table-column>
        <el-table-column prop="categoryName" label="活动商品类别（三级分类）" sortable align="center" width="230" ></el-table-column>
        <el-table-column prop="commodityName" label="排除参加活动的商品" sortable align="center" width="190" ></el-table-column>
        <el-table-column prop="" label="" align="center" width="296" ></el-table-column>
      </el-table>
    </div>
    <div class="bot">
      <Page :total="total" :current="pageNum" :pageSize="pageSize" @changeCurrentPage="changeCurrentPage"></Page>
    </div>
    <div class="inp-bot">
      <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="input-with-select">
        <el-form-item label="小活动名称:" prop="storeName" class="name-search">
          <el-input v-model="ruleForm.storeName"></el-input>
        </el-form-item>
        <el-form-item label="活动状态:" prop="name">
          <el-select v-model="ruleForm.storeType">
            <el-option label="进行中" value="进行中">进行中</el-option>
            <el-option label="结束" value="结束">结束</el-option>
          </el-select>
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
import {export_json_to_excel} from "@/utils/Export2Excel";
import printJS from 'print-js'
export default {
  name: "Sellinglist",
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
      ruleForm: {
          storeName: '',
          storeType: ''
      },
      multipleSelection: [],
      activityNumber:"",
    };
  },
  created() {
    this.getdata()
  },
  methods: {
    getdata() {
      let t = this;
      httpreques(
        "post",
        {
          activityNumber:t.activityNumber,
          pageNum: t.pageNum,
          pageSize: t.pageSize,
        },
        "/realbrand-management-service/Activity/ExcludeCommodityList"
      ).then((res) => {
        console.log(res);
        if (res.data.code == "SUCCESS") {
          _.forEach(res.data.data, function (item, key) {
            item.index = key + 1; //加入index
            item.activityState = "启用"
          });
          t.total = res.data.total;
          t.pageSize = res.data.pageSize;
          t.tabledata = res.data.data;
          t.tabledata.reverse()
        } else {
          this.$message(res.data.msg);
        }
      });
    },
    addStore() {
      this.$router.push({ path: "/setting/newselling" });
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
        header: '活动商品列表',
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
        "活动编号",
        "活动名称",
        "活动对象",
        "起止时间",
        "活动状态",
        "活动商品类别（三级分类）",
        "排除参加活动的商品"
      ];
      var filterVal = [
        "activityNumber",
        "titleName",
        "activityName",
        "activeObjects",
        "startTime",
        "activityState"
      ];

      var filename = "活动商品列表";
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
