<template>
  <div class="tab">
    <div class="tab-title">
      <div class="left">
        <div class="print" id="addStoreClass" @click="addclerk()">
          <img
            class="icon"
            src="../../assets/images/add.png"
            alt=""
          /><span class="axis">新增人员</span>
        </div>
        <div class="print" @click="editclerk()">
          <img
            class="icon"
            src="../../assets/images/edit.png"
            alt=""
          /><span class="axis">编辑人员</span>
        </div>
        <div class="print" @click="delclerk">
          <img
            class="icon"
            src="../../assets/images/delete.png"
            alt=""
          /><span class="axis">删除人员</span>
        </div>
        <div class="print" @click="printTable('printJS-table')">
          <img
            class="icon"
            src="../../assets/images/print.png"
            alt=""
          /><span class="axis">打印列表</span>
        </div>
        <div class="print" @click="exportExcel">
          <img
            class="icon"
            src="../../assets/images/derive.png"
            alt=""
          /><span class="axis">导出表格</span>
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
        ref="singleTable"
        :data="tabledata"
        style="width: 100%"
        highlight-current-row
        @selection-change="handleSelectionChange"
        :default-sort="{ prop: 'date', order: 'descending' }"
      >
        <el-table-column
          type="selection"
          width="55"
          align="center"
        ></el-table-column>
        <el-table-column prop="index" label="序号" align="center" sortable width="80"></el-table-column>
        <el-table-column label="身份证号码" align="center" sortable width="200">
          <template v-slot="scope">
            <span class="detail-info" @click="clerkDetail(scope.row)">{{scope.row.idNumber}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="姓名" show-overflow-tooltip sortable width="130"></el-table-column>
        <el-table-column
          prop="telNum"
          label="手机号码"
          align="center"
          sortable
          width="160"
        ></el-table-column>
        <el-table-column
          label="证件照"
          align="center"
          sortable
          width="160"
        >
        <template v-slot="scope">
          <el-image class="preview-img" v-for="url in scope.row.urls" :src="url" :key="url" :fit="contain" :preview-src-list="srcList" @click="onPre(scope.row)"></el-image>
            <!-- <img :src="scope.row.frontId" alt="" style="height: 20px;">
            <img :src="scope.row.reverseId" alt="" style="height: 20px;"> -->
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="个人住址"
          sortable
          width="300"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="storeName"
          label="所属门店"
          sortable
          width="220"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="station"
          label="角色"
          sortable
          show-overflow-tooltip
          width="120"
        ></el-table-column>
        <el-table-column
          prop="city"
          label="所在市"
          align="center"
          sortable
          width="110"
        ></el-table-column>
        <el-table-column
          prop="province"
          label="所在省"
          align="center"
          sortable
          width="110"
        ></el-table-column>
        <el-table-column label="" align="center" width="83" ></el-table-column>
      </el-table>
    </div>
    <div class="bot">
      <Page :total="total" :current="pageNum" :pageSize="pageSize" @changeCurrentPage="changeCurrentPage"></Page>
    </div>
    <div class="inp-bot">
      <div class="search-ipt">
        <span class="ipt-left">姓名</span>
        <input type="text" placeholder="请输入姓名" v-model="ruleForm.name">
      </div>
      <div class="search-ipt">
        <span class="ipt-left">手机号码</span>
        <input type="text" placeholder="请输入手机号码" v-model="ruleForm.equipmentModel">
      </div>
      <div class="search-ipt">
        <span class="ipt-left">门店名称</span>
        <input type="text" placeholder="请输入门店名称" v-model="ruleForm.storeName">
      </div>
      <div class="search-ipt">
        <span class="ipt-left">角色</span>
        <select name="" id="" v-model="ruleForm.storeType">
          <option value="店长">店长</option>
          <option value="全国经销商">全国经销商</option>
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
import store from "../../store";
import httpreques from "../../utils/httpreques";
import { export_json_to_excel } from "@/utils/Export2Excel";

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
      tabs: ["当日", "当周", "当月"],
      active: 0,
      radio1: "按商品69编码统计",
      textarea: "",
      tabledata: [],
      totalNum: 0,
      multipleSelection: [],
      ruleForm: {
        name: "",
        tel: "",
        station: ""
      },
      srcList: []
    };
  },
  mounted() {
    this.getdata();
    console.log(this.$store);
    let codes = this.$store.state.user.currentUser.identities[0].role.code
    console.log(codes);
    if(codes == "CLERK"){
      let addStoreClass = document.getElementById("addStoreClass")
      // console.log(addStoreClass);
      addStoreClass.style.display = "none"
    }
  },
  methods: {
    //店员列表
    getdata() {
      let len = []
      this.tabledata = []
      httpreques(
        "post",
        {
          name: this.ruleForm.name,
          pageNum: this.pageNum,
          pageSize: this.pageSize,
        },
        "/realbrand-management-service/StoreUserMgt/StoreUserList"
      ).then((res) => {
        console.log(res);
        if ((res.data.code === "SUCCESS")) {
          let { data } = res.data;
          this.total = res.data.total;
          let arr=new Array(this.total).join(',').split(',').map((item,index)=>{
            return index+1;
          })
          arr = arr.reverse()
          len = arr.slice((this.pageNum-1)*this.pageSize, this.pageNum*this.pageSize) // 获取数组最后 20 个元素
          data.forEach((item, key) => {
            item.urls = []
            item.index = len[key]
            item.address = item.province + item.city + item.county + item.address
            item.urls = (`${item.frontId},${item.reverseId}`).split(',')
          })
          console.log(data)
          this.tabledata = data
          // this.tabledata.reverse();
        } else {
          this.$message(res.data.msg);
        }
      });
    },
    // 查询
    submitForm(){
      this.getdata()
    },
    // 重置
    resetForm(){
      this.ruleForm = {}
    },
    //删除
    delclerk() {
      if(this.multipleSelection.length <= 0) return this.$message.error('请选择需要删除的人员')
      let list = []
      _.forEach(
        JSON.parse(JSON.stringify(this.multipleSelection)),
        function (item, key) {
          list.push(item.uuid);
        }
      )
        httpreques(
          "post",
          {
            list: list,
          },
          "/realbrand-management-service/StoreUserMgt/DeleteStoreUser"
        ).then((result) => {
          console.log(result);
          if (result.data.code === "SUCCESS") {
            this.$message.success("删除员工成功!");
            this.getdata()
            // this.tabledata.splice(index, 1);
          } else {
            this.$message.error("删除员工失败");
          }
        })
    },
    // 证件预览
    onPre(data){
      this.srcList = []
      let list = `${data.frontId},${data.reverseId}`
      this.srcList = list.split(',')
    },
    addclerk() {
      this.$router.push({path: "/setting/newclerktwo",})
    },
    //编辑
    editclerk() {
      if(this.multipleSelection.length != 1) return this.$message('请选择一项数据进行编辑')
      let uuid = this.multipleSelection[0].uuid
      this.$router.push({
        path: "/setting/newclerktwo",
        query: { uuid: uuid },
      })
    },
    clerkDetail(data){
      this.$router.push({
        path: "/setting/newclerktwo",
        query: { uuid: data.uuid },
      })
    },
    changeCurrentPage(val) {
      this.pageNum = val;
      this.getdata();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //添加class样式
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 0) {
        return "warning-row";
      }
      return "";
    },
    formatter(row, column) {
      return row.address;
    },
    handleCurrentChange(val) {
      this.currentRow = val;
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
        header: '门店列表',
        headerStyle: 'text-align:center;color:#000;width:100%;border:1px #000 solid;',
        // targetStyles: ['border', 'padding: 15px'],
        scanStyles: false,
        style: 'table tr td,th { border-collapse: collapse;padding: 15px;border:1px #000 solid; }' // 表格样式
      })

      div.remove()
    },
    exportExcel() {
      //将对应的属性名转换成中文
      const tHeader = [
        '身份证号码', 
        '姓名', 
        '手机号码', 
        '证件照',
        '个人住址',
        '所属门店',
        '角色',
        '所在市',
        '所在省'
      ];
      //table表格中对应的属性名
      const filterVal = [
        'idNumber', 
        'name', 
        'telNum', 
        'urls', 
        'address', 
        'storeName',
        'station',
        'city',
        'province'
      ];
      const filename = "人员列表"
      const list = this.tabledata;
      const data = this.formatJson(filterVal, list);
      export_json_to_excel({header: tHeader, data, filename})
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/reset.scss";
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
