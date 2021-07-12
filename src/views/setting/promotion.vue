<template>
  <div class="promotion">
    <div class="tab-title">
      <div class="left">
        <div class="print" @click="addStore1"><img class="icon" src="../../assets/images/add.png" alt=""><span class="axis">新增折扣活动</span></div>
        <div class="print" @click="addStore2"><img class="icon" src="../../assets/images/add.png" alt=""><span class="axis">新增买赠活动</span></div>
        <div class="print" @click="addStore3"><img class="icon" src="../../assets/images/add.png" alt=""><span class="axis">新增满赠活动</span></div>
        <div class="print" @click="del"><img class="icon" src="../../assets/images/delete.png" alt=""><span class="axis">删除活动</span></div>
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
        <el-table-column prop="activityNumber" label="活动编号" align="center" sortable width="180"></el-table-column>
        <el-table-column prop="titleName" label="活动主题" align="center" sortable width="180"></el-table-column>
        <el-table-column prop="activityName" label="活动名称" sortable width="160" align="center"></el-table-column>
        <el-table-column prop="activeObjects" label="活动对象" sortable align="center" width="140"></el-table-column>
        <el-table-column prop="startTime" label="起止时间" sortable align="center" width="300" ></el-table-column>
        <el-table-column prop="activityState" label="活动状态" sortable align="center" width="150" >
          <!-- <template #default="scope"> -->
            <!-- <el-tag v-if="scope.row.enableState === 0" type="danger" disable-transitions>禁用</el-tag> -->
            <el-tag type="success" disable-transitions>启用</el-tag>
          <!-- </template> -->
        </el-table-column>
        <el-table-column prop="" label="" align="center" width="675" ></el-table-column>
      </el-table>
    </div>
    <div class="bot">
      <Page :total="total" :current="pageNum" :pageSize="pageSize" @changeCurrentPage="changeCurrentPage"></Page>
    </div>
    <div class="inp-bot">
      <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="input-with-select">
        <el-form-item label="小活动名称:" prop="storeName" class="name-search">
          <el-input v-model="ruleForm.subActivityName"></el-input>
        </el-form-item>
        <el-form-item label="活动状态:" prop="name">
          <el-select v-model="ruleForm.activityState">
            <el-option label="进行中" value="进行中">进行中</el-option>
            <el-option label="关闭" value="关闭">关闭</el-option>
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
import moment from "moment";
import {export_json_to_excel} from "@/utils/Export2Excel";
import printJS from 'print-js'
export default {
  name: "Promotion",
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
          subActivityName: '',  //活动名称
          activityState: ''     //活动状态
      },
      multipleSelection: []
    };
  },
  created() {
    this.getdata()
  },
  methods: {
    handleSelectionChange(val){
      this.multipleSelection = val
    },
    getdata(){
      let len = []
      let t = this;
      let params = {
        "activityState": this.ruleForm.activityState,
        "subActivityName": this.ruleForm.subActivityName,
        "pageNum": this.pageNum,
        "pageSize": this.pageSize,
      };
      this.tabledata = []
      httpreques(
        "post",
        params,
        "/realbrand-management-service/Activity/ActivityList"
      ).then((res) => {
        console.log(res);
        if (res.data.code === "SUCCESS") {
          t.total = res.data.total;
          // 序号倒序排列
          let arr=new Array(this.total).join(',').split(',').map((item,index)=>{
            return index+1;
          })
          arr = arr.reverse()
          len = arr.slice((this.pageNum-1)*this.pageSize, this.pageNum*this.pageSize) // 获取数组最后 20 个元素
          _.forEach(res.data.data, function (item, key) {
            item.startTime = moment(item.startTime).format(
              "YYYY-MM-DD HH:mm:ss"
            );
            item.endTime = moment(item.endTime).format("YYYY-MM-DD HH:mm:ss");
            // item.index = key+1;
            item.activityState = "启用"
            item.index = len[key];
          });
          t.tabledata = res.data.data;
          // t.tabledata.reverse()
        }else {
          this.$message(res.data.msg)
        }
      });
    },
    //删除
    del() {
      if(this.multipleSelection.length <= 0) return this.$message.error({message: '请选择需要删除活动'})
      let t = this;
      let activityNumber = []
      _.forEach(
        JSON.parse(JSON.stringify(this.multipleSelection)),
        function (item, key) {
          activityNumber.push(item.activityNumber);
        }
      )
      let params = {
        activityNumber: activityNumber,
      };
      httpreques(
        "post",
        params,
        "/realbrand-management-service/Activity/DeleteActivity"
      ).then((res) => {
        if (res.data.code === "SUCCESS") {
          t.$message({
            message: "删除成功",
            type: "success",
          });
          t.getdata();
        } else {
          //接口错误处理
          t.$message.error(res.data.msg);
        }
      });
    },
    // 搜索
    submitForm(){
      this.getdata()
    },
    // 重置
    resetForm(){
      this.ruleForm = {}
    },


    addStore1() {
      this.$router.push({ path: "/setting/newactivity" });
    },
    addStore2() {
      this.$router.push({ path: "/setting/newactivity2" });
    },
    addStore3() {
      this.$router.push({ path: "/setting/newactivity3" });
    },


    // delstore() {
    //   if(this.multipleSelection.length <= 0) return this.$message.error({message: '请选择需要删除的门店'})
    //   let t = this;
    //   let storeName = []
    //   _.forEach(
    //     JSON.parse(JSON.stringify(this.multipleSelection)),
    //     function (item, key) {
    //       storeName.push(item.storeName);
    //     }
    //   )
    //   let params = {
    //     storeName: storeName,
    //   };
    //   httpreques(
    //     "post",
    //     params,
    //     "/realbrand-management-service/StoreMgt/DeleteStore"
    //   ).then((res) => {
    //     if (res.data.code == "SUCCESS") {
    //       t.$message({
    //         message: "删除成功",
    //         type: "success",
    //       });
    //       t.getdata();
    //     } else {
    //       //接口错误处理
    //       t.$message.error(res.data.msg);
    //     }
    //   });
    // },
    // editstore() {
    //   if(this.multipleSelection.length !== 1) return this.$message('请选择一个需要编辑的门店')
    //   let storename = this.multipleSelection[0].storeName
    //   this.$router.push({
    //     path: "/setting/newstore",
    //     query: {
    //       storename: storename,
    //     },
    //   });
    // },
    changeCurrentPage(val){
      this.pageNum = val
      this.getdata()
    },
    handleSelectionChange(val){
      this.multipleSelection = val
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
        header: '活动列表',
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
        "活动主题",
        "活动名称",
        "活动对象",
        "所属门店",
        "起止时间",
        "活动状态"
      ];
      var filterVal = [
        "activityNumber",
        "titleName",
        "activityName",
        "activeObjects",
        "startTime",
        "activityState"
      ];

      var filename = "活动列表";
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
