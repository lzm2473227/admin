<template>
  <div class="tab">
    <div class="tab-title">
      <div class="left">
        <div class="print" @click="addMachine()"><img class="icon" src="../../assets/images/add.png" alt=""><span class="axis">新增机具</span></div>
        <div class="print" @click="addMachine('1')"><img class="icon" src="../../assets/images/edit.png" alt=""><span class="axis">编辑机具</span></div>
        <div class="print" @click="delMachine"><img class="icon" src="../../assets/images/delete.png" alt=""><span class="axis">删除机具</span></div>
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
        <el-table-column label="机具编码（MEID）" show-overflow-tooltip align="center" sortable width="170">
          <template v-slot="scope">
            <span class="detail-info" @click="addMachine('2', scope.row)">{{scope.row.meid}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="equipmentModel" show-overflow-tooltip label="机具型号" align="center" sortable width="120"></el-table-column>
        <el-table-column prop="equipmentName" label="机具名称" show-overflow-tooltip align="center" sortable width="150"></el-table-column>
        <el-table-column prop="equipmentSupplier" label="机具供应商" sortable width="180" show-overflow-tooltip></el-table-column>
        <el-table-column prop="storeName" label="所属门店" sortable width="180" show-overflow-tooltip></el-table-column>
        <el-table-column prop="address" label="门店地址" sortable width="220" show-overflow-tooltip></el-table-column>
        <el-table-column prop="imgs" label="机具图片" sortable width="110">
          <template v-slot="scope">
            <el-image class="preview-img" :src="scope.row.filePath" :preview-src-list="srcList" @click="onPre(scope.row)"></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="bindingTime" label="启用时间" align="center"  sortable width="160" ></el-table-column>
        <el-table-column prop="state" label="状态" align="center"  sortable width="100" >
          <template v-slot="scope">
            <el-tag v-if="scope.row.state === 0" type="success" disable-transitions>正常</el-tag>
            <el-tag v-if="scope.row.state === 1" type="danger" disable-transitions>异常</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="city" label="所在市" align="center"  sortable width="110" ></el-table-column>
        <el-table-column prop="province" label="所在省" align="center"  sortable width="94" ></el-table-column>
      </el-table>
    </div>
    <div class="bot">
      <Page :total="total" :current="pageNum" :pageSize="pageSize" @changeCurrentPage="changeCurrentPage"></Page>
    </div>
    <div class="inp-bot">
      <div class="search-ipt">
        <span class="ipt-left">机具编号</span>
        <input type="text" placeholder="请输入机具编号" v-model="ruleForm.meid">
      </div>
      <div class="search-ipt">
        <span class="ipt-left">机具型号</span>
        <input type="text" placeholder="请输入机具型号" v-model="ruleForm.equipmentModel">
      </div>
      <div class="search-ipt">
        <span class="ipt-left">机具名称</span>
        <input type="text" placeholder="请输入机具名称" v-model="ruleForm.equipmentName">
      </div>
      <div class="search-ipt">
        <span class="ipt-left">机具供应商</span>
        <input type="text" placeholder="请输入机具供应商" v-model="ruleForm.equipmentSupplier">
      </div>
      <div class="search-ipt">
        <span class="ipt-left">所属门店</span>
        <input type="text" placeholder="请输入所属门店" v-model="ruleForm.storeName">
      </div>
      <div class="search-btn">
        <button @click="submitForm">查询</button>
        <button @click="resetForm" class="reset-btn">重置</button>
      </div>
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
      totalNum: 0,
      filePath:"",
      ruleForm: {
          meid: '',
          storeName: '',
          equipmentName: '',
          equipmentModel: '',
          equipmentSupplier: ''
      },
      multipleSelection : [],
      srcList: []
    };
  },
  created() {
   // if(localStorage.getItem("loginuser")) this.idNumber = JSON.parse(localStorage.getItem("loginuser")).userDetails.idNumber
    this.getdata();
  },
  methods: {
    //机具列表
    getdata() {
      let len = []
      this.tabledata = []
      httpreques(
        "post",
        {
          meid: this.ruleForm.meid,
          storeName: this.ruleForm.storeName,
          equipmentName: this.ruleForm.equipmentName,
          equipmentModel: this.ruleForm.equipmentModel,
          equipmentSupplier: this.ruleForm.equipmentSupplier,
          pageNum: this.pageNum,
          pageSize: this.pageSize,
        },
        "/realbrand-management-service/EquipmentMgt/EquipmentList"
      ).then((res) => {
        console.log(res);
        let { data } = res.data;
        this.total = res.data.data? res.data.total:0
        data.forEach((item) => {
          item.bindingTime = moment(item.bindingTime).format(
            "YYYY-MM-DD HH:mm:ss"
          );
        });
        // 序号倒序排列
        let arr=new Array(this.total).join(',').split(',').map((item,index)=>{
          return index+1;
        })
        arr = arr.reverse()
        len = arr.slice((this.pageNum-1)*this.pageSize, this.pageNum*this.pageSize) // 获取数组最后 20 个元素
        res.data.data.forEach((item,key) => {
          item.index = len[key];
          let address = item.province + item.city + item.county;
          item.address = address + item.address;
        })
        this.tabledata = res.data.data
        // this.tabledata.reverse();
      });
    },
    //删除单个机具
    delMachine() {
      if(this.multipleSelection.length <= 0) return this.$message.error('请选择需要删除的机具')
      let meid = []
      _.forEach(
        JSON.parse(JSON.stringify(this.multipleSelection)),
        function (item, key) {
          meid.push(item.meid);
        }
      )
          httpreques(
            "post",
            {
              meid: meid,
            },
            "/realbrand-management-service/EquipmentMgt/DeleteEquipment"
          ).then((result) => {
            console.log(result);
            if (result.status && result.data.data === 1) {
              this.$message.success("删除机具成功!");
              this.getdata()
              // this.tabledata.splice(index, 1);
            }
          })
    },
    // 新增机具
    addMachine(val, data) {
      if(val){
        let meid = ''
        if(data){
          meid = data.meid
        }else{
          if(this.multipleSelection.length != 1) return this.$message('请选择一项需要编辑的机具')
          meid = this.multipleSelection[0].meid
        }
        this.$router.push({
          path: "/setting/machinenew",
          query: {
            meid: meid,
          },
        });
      } else{
        this.$router.push({path: "/setting/machinenew"});
      }
    },
    // 机具图片预览
    onPre(data){
      this.srcList = []
      let list = `${data.filePath}`
      this.srcList = list.split(',')
    },
    submitForm(){
      this.getdata()
    },
    resetForm(){
      this.ruleForm = {}
    },
    handleSelectionChange(val){
      this.multipleSelection = val
    },
    changeCurrentPage(val) {
      this.pageNum = val
      this.getdata();
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
        header: '机具列表',
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
        "机具编码（MEID）",
        "机具型号",
        "机具名称",
        "机具供应商",
        "所属门店",
        "门店地址",
        "机具图片",
        "启用时间",
        "状态",
        "所在市",
        "所在省"
      ];
      var filterVal = [
        "meid",
        "equipmentModel",
        "equipmentName",
        "equipmentSupplier",
        "storeName",
        "address",
        "filePath",
        "bindingTime",
        "state",
        "city",
        "province"
      ];

      var filename = "机具列表";
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
</style>
