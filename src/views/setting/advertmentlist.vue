<template>
  <div class="tab">
    <div class="tab-title">
      <div class="left">
        <div class="print" @click="addAdvert()"><img class="icon" src="../../assets/images/add.png" alt=""><span class="axis">新增广告</span></div>
        <div class="print" @click="editadvertment()"><img class="icon" src="../../assets/images/edit.png" alt=""><span class="axis">编辑广告</span></div>
        <div class="print" @click="deladvertment()"><img class="icon" src="../../assets/images/delete.png" alt=""><span class="axis">删除广告</span></div>
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
        <el-table-column label="广告编码" align="center" sortable width="180">
          <template v-slot="scope">
            <span class="detail-info" @click="editadvertment(scope.row)">{{scope.row.advertisementNumber}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="advertisementName" label="广告名称" show-overflow-tooltip sortable align="center" width="180"></el-table-column>
        <el-table-column prop="type" label="广告类型" align="center" sortable width="130" show-overflow-tooltip></el-table-column>
        <el-table-column label="广告描述" align="center" sortable width="110" show-overflow-tooltip>
          <template v-slot="scope">
            <el-image class="preview-img" :src="scope.row.linkPosition" alt="" :preview-src-list="srcList" @click="onPre(scope.row)"></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="positionName" label="广告位置" sortable align="center" width="150" ></el-table-column>
        <el-table-column prop="startTime" label="起始时间" align="center" sortable width="160" ></el-table-column>
        <el-table-column prop="endTime" label="截止时间" align="center" sortable width="160" ></el-table-column>
        <el-table-column label="状态" align="center"  sortable width="123" >
          <template #default="scope">
            <el-tag v-if="scope.row.enableState === 0" type="danger" disable-transitions>禁用</el-tag>
            <el-tag v-if="scope.row.enableState === 1" type="success" disable-transitions>启用</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="" align="center" width="275" ></el-table-column>
      </el-table>
    </div>
    <div class="bot">
      <Page :total="total" :current="pageNum" :pageSize="pageSize" @changeCurrentPage="changeCurrentPage"></Page>
    </div>
    <div class="inp-bot">
      <div class="search-ipt">
        <span class="ipt-left">广告名称</span>
        <input type="text" placeholder="请输入广告名称" v-model="ruleForm.advertisementName">
      </div>
      <div class="search-ipt">
        <span class="ipt-left">广告类型</span>
        <select name="" id="" v-model="ruleForm.type">
          <option value="图片">图片</option>
          <option value="文字">文字</option>
          <option value="视频">视频</option>
        </select>
      </div>
      <div class="search-ipt">
        <span class="ipt-left">广告位置</span>
        <select name="" id="" v-model="ruleForm.positionName">
          <option value="首页">首页</option>
          <option value="消费者首页">消费者首页</option>
          <option value="门店首页">门店首页</option>
          <option value="待销售">待销售</option>
        </select>
      </div>
      <div class="search-ipt">
        <span class="ipt-left">状态</span>
        <select name="" id="" v-model="ruleForm.enableState">
          <option value="0">未开始</option>
          <option value="1">进行中</option>
          <option value="0">已结束</option>
        </select>
      </div>
      <div class="search-btn">
        <button @click="submitForm">查询</button>
        <button @click="resetForm" class="reset-btn">重置</button>
      </div>
    </div>
  </div>
</template>

<script>
import Page from '@/components/Pagination/page'
import httpreques from '../../utils/httpreques';
import moment from "moment";
import _ from "lodash";
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
      ruleForm: {
          advertisementName: '',
          enableState: '',
          positionName: '',
          type: ''
      },
      multipleSelection: []
    };
  },
  created() {
    this.getdata()
  },
  methods: {
    getdata() {
      let len = []
      let t = this;
      let params = {
            "advertisementName": this.ruleForm.advertisementName,
            "enableState": this.ruleForm.enableState,
            "pageNum": this.pageNum,
            "pageSize": this.pageSize,
            "positionName": this.ruleForm.positionName,
            "type": this.ruleForm.type,
            "advertisementDescribe": this.ruleForm.advertisementDescribe
          }
      httpreques(
        "post",
        params,
        "/realbrand-management-service/AdvertisementMgt/AdvertisementInfoList"
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
            item.index = len[key]
          });
          t.tabledata = res.data.data;
          // t.tabledata.reverse()
        } else {
          //接口错误处理
          t.$message.error(res.data.msg);
        }
      });
    },
    addAdvert() {
      this.$router.push({ path: "/setting/newadvertmenttwo" });
    },
    deladvertment() {
      if(this.multipleSelection.length <= 0) return this.$message.error({message: '请选择需要删除的广告'})
      let t = this;
      httpreques(
        "post",
        { advertisementNumber: this.multipleSelection[0].advertisementNumber },
        "/realbrand-management-service/AdvertisementMgt/DeleteAdvertisement"
      ).then((res) => {
        if (res.data.code === "SUCCESS") {
          t.$message.success("广告已删除")
          t.getdata();
        } else {
          //接口错误处理
          t.$message.error(res.data.msg);
        }
      });
    },
    editadvertment(data) {
      let advertisementNumber = ''
      if(data){
        advertisementNumber = data.advertisementNumber
      }else{
        if(this.multipleSelection.length !== 1) return this.$message('请选择一个需要编辑的广告')
        advertisementNumber = this.multipleSelection[0].advertisementNumber
      }
      this.$router.push({
        path: "/setting/newadvertmenttwo",
        query: {
          advertmentid: advertisementNumber,
        },
      });
    },
    //状态更改
    editstatus(stu, id) {
      let t = this;
      let params = {
        enableState: stu,
        id: id,
      };
      httpreques(
        "post",
        params,
        "/realbrand-management-service/AdvertisementMgt/EnableAdvertisement"
      ).then((res) => {
        if (res.data.code === "SUCCESS") {
          console.log(res);
          t.$message({
            message: stu == 0 ? "广告已禁用" : "广告已启用",
            type: "success",
          });
          t.getdata();
        } else {
          //接口错误处理
          t.$message.error(res.data.msg);
        }
      });
    },
    submitForm(){
      this.getdata()
    },
    resetForm(){
      this.ruleForm = {}
    },
    changeCurrentPage(val){
      this.pageNum = val
      this.getdata()
    },
    // 图片预览
    onPre(data){
      this.srcList = []
      let list = `${data.linkPosition}`
      this.srcList = list.split(',')
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
        header: '广告列表',
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
        "广告编码",
        "广告名称",
        "广告类型",
        "广告描述",
        "广告位置",
        "起始时间",
        "截止时间",
        "状态"
      ];
      var filterVal = [
        "advertisementNumber",
        "advertisementName",
        "type",
        "linkPosition",
        "positionName",
        "startTime",
        "endTime",
        "enableState"
      ];

      var filename = "广告列表";
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
// /deep/.el-table--small td{
//   padding: 0;
// }
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
