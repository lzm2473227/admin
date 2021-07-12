<template>
  <div class="newactivity">
    <div class="tab-title">
      <div class="left">
        <div class="print" @click="goBack"><img class="icon" src="@/assets/images/back.png" alt=""><span class="axis">返回列表</span></div>
        <div class="print" @click="addActivity2"><img class="icon" src="@/assets/images/confirm.png" alt=""><span class="axis">保存确认</span></div>
        <div class="print"><img class="icon" src="@/assets/images/print.png" alt=""><span class="axis">打印列表</span></div>
        <div class="print" @click="exportExcel"><img class="icon" src="@/assets/images/derive.png" alt=""><span class="axis">导出表格</span></div>
      </div>
      <div class="right">
        <div class="setup">
          <img class="set" src="@/assets/images/ic-设置.png" alt="系统设置" @click="setup">
        </div>
      </div>
    </div>
    <div class="table-main">
      <div class="table-title">
        <p>新增买赠活动</p>
      </div>
      <form action="#">
        <table border="1" class="">
          <tr>
            <td class="table-left">活动主题</td>
            <td class="table-right">
              <select
                v-model="ruleForm.titleNumber"
                placeholder="请选择活动主题" style="width:100%"
                @change="changeStore(ruleForm.titleNumber)"
              >
                <option 
                  v-for="item in themelist"
                  :key="item.value"
                  :label="item.titleName"
                  :value="item.titleNumber"
                ></option>
              </select>
            </td>
            <td class="table-left">促销活动</td>
            <td class="table-right mini">
              <input
                type="text"
                placeholder="促销活动"
                v-model="ruleForm.name"
              />
            </td>
          </tr>

          <tr>
            <td class="table-left">起始时间</td>
            <td class="table-right">
              <el-date-picker
                v-model="ruleForm.startTime"
                type="datetime"
                format="YYYY-MM-DD HH:mm:ss"
                prefix-icon="none"
                placeholder="请选择起始时间"
              >
              </el-date-picker>
            </td>
            <td class="table-left">截止时间</td>
            <td class="table-right">
              <el-date-picker
                v-model="ruleForm.endTime"
                type="datetime"
                format="YYYY-MM-DD HH:mm:ss"
                prefix-icon="none"
                placeholder="请选择截至时间"
              >
              </el-date-picker>
            </td>
          </tr>

          <tr>
            <td class="table-left">小活动编号</td>
            <td class="table-right mini">
              <input
                type="text"
                placeholder="活动编号由系统自动生成"
                v-model="ruleForm.serialNumber"
              />
            </td>
            <td class="table-left">小活动名称</td>
            <td class="table-right mini">
              <input
                type="text"
                placeholder="小活动名称"
                v-model="ruleForm.activityName"
              />
            </td>
          </tr>

          <tr>
            <td class="table-left" >活动规则</td>
            <td class="table-right" colspan="3" >
            <div class="a">
              <div>买<input type="text"/>个同品类商品，赠送<input type="text"/>个商品。</div>
              <div class="b">赠送的商品名称<input type="text" v-model="a" @click=" centerDialogVisible2 = true" placeholder="请单击进行选择商品"/></div>
              <div class="b">赠送的商品编码<input type="text" v-model="b" placeholder="选择好商品后，商品编码将自动填写"/></div>
            </div>
          </td>
          </tr>

          <tr>
            <td class="table-left">活动对象</td>
            <td class="table-right" colspan="3">
              <el-radio-group v-model="ruleForm.customer">
                <el-radio label="1" style="margin-right:40px">全部</el-radio>
                <el-radio label="2" style="margin-right:40px" @click="appoint">指定消费者</el-radio>
              </el-radio-group>
            </td>

          </tr>

          <tr>
            <td class="table-left" style="height:540px">活动内容</td>
            <td class="table-right" colspan="3">
              <textarea
                style="height:534px"
                class="table-item"
                placeholder="此段文字是关于五一节活动折扣促销的文字描述"
                v-model="ruleForm.activityContent"
              ></textarea>
            </td>
          </tr>
        </table>
      </form>
    </div>
    <el-dialog title="" v-model="centerDialogVisible" width="30%" :close-on-click-modal="false">
      <tr class="h">
        <td class="table-left">性别</td>
        <td class="table-right" style="margin-right:18px">
          <el-radio-group v-model="ruleForm.sex">
            <el-radio label="1" class="rad">男</el-radio>
            <el-radio label="2" class="rad">女</el-radio>
            <el-radio label="3" class="rad">未知</el-radio>
          </el-radio-group>
        </td>
      </tr>
      <tr class="h">
        <td class="table-left">年龄区间</td>
        <td class="table-right" style="margin-right:18px">
          <el-radio-group v-model="ruleForm.age">
            <el-radio label="1" class="rad">≥18周岁</el-radio>
            <el-radio label="2" class="rad">≥50周岁</el-radio>
          </el-radio-group>
        </td>
      </tr>
      <tr class="h">
        <td class="table-left">生日</td>
        <td class="table-right" style="margin-right:18px">
          <el-radio-group v-model="ruleForm.birthday">
            <el-radio label="1" class="rad">本月生日</el-radio>
            <el-radio label="2" class="rad">本周生日</el-radio>
            <el-radio label="3" class="rad">本日生日</el-radio>
          </el-radio-group>
        </td>
      </tr>
      <tr class="h">
        <td class="table-left">职业</td>
        <td class="table-right" style="margin-right:18px">
          <el-radio-group v-model="ruleForm.profession">
            <el-radio label="1" class="rad">医生</el-radio>
            <el-radio label="2" class="rad">教师</el-radio>
            <el-radio label="3" class="rad">其他</el-radio>
          </el-radio-group>
        </td>
      </tr>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="centerDialogVisible = false">确定</el-button>
        <el-button @click="centerDialogVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog title="赠送商品" v-model="centerDialogVisible2" width="30%" center>
      <div class="inp">
        <input type="text" v-model="ruleForm.a" placeholder="请输入商品名称进行搜索" />
        <span class="el-icon-search"></span>
      </div>
      <el-table
      :row-class-name="tableRowClassName"
      ref="singleTable"
      :data="tabledata"
      style="width: 100%"
      highlight-current-row
      @selection-change="handleSelectionChange"
      :default-sort="{ prop: 'date', order: 'descending' }"
      >
        <el-table-column type="selection" width="45" align="center"></el-table-column>
        <el-table-column prop="index" label="序号" align="center" sortable width="80"></el-table-column>
        <el-table-column prop="a" label="商品名称" align="center" sortable width="230"></el-table-column>
        <el-table-column prop="b" label="商品69编码" align="center" sortable width="150"></el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="presentGoods">确 定</el-button>
      </div>
    </el-dialog>
 </div>
</template>

<script>
import httpreques from "../../utils/httpreques";
export default {
  name:"newactivity",
  data(){
    return{
      themelist:[],
      ruleForm: {
        titleNumber: "",
        startTime: "",
        endTime: "",
        activityContent: "",
        discountRatio: 10,
        activityContent: "",
        // activeObjects: 0,
        customer: [
          { id: 0, name: "全部" },
          { id: 1, name: "指定消费者" },
        ],
        sex: 1,
      },
      titleName:"",  //选中的主题
      radio:"0",     //单选框默认值
      centerDialogVisible:false,
      centerDialogVisible2:false,
      tabledata:[
        {a:'大茅台',b:"4897077590017",index:1},
        {a:'小茅台',b:"4897077590018",index:2}
      ],
      multipleSelection:[],
      send:"",
      sendcode:"",
      a:"",   //买赠的商品
      b:"",   //买赠的商品的编码
    }
  },
  mounted(){
    this.StoreNameList();
  },
  methods:{
    //赠送
    presentGoods(){
      this.centerDialogVisible2 = false
    },
    appoint(){
      this.centerDialogVisible = true
    },
    goBack(){
      this.$router.go(-1)
    },
    //获取表格的所有值
    handleSelectionChange(val){
      this.multipleSelection = val
      // console.log(this.multipleSelection);
      console.log(val);
      this.a = this.multipleSelection[0].a
      this.b = this.multipleSelection[0].b
      console.log(this.a);
      console.log(this.b);
    },  
    addActivity2() {
      if(!this.ruleForm.titleNumber) return this.$message("请选择主题活动")
      if(!this.ruleForm.activityName) return this.$message("请填写活动名称")
      if(!this.ruleForm.startTime) return this.$message("请填写起始时间")
      if(!this.ruleForm.endTime) return this.$message("请填写结束时间")
      if(!this.ruleForm.activityContent) return this.$message("请填写促销活动")
      if(!this.b) return this.$message("请选择买赠的商品")
      let params = {
        titleNumber: this.ruleForm.titleNumber, // 活动主题
        startTime: this.ruleForm.startTime, //起始时间
        endTime: this.ruleForm.endTime, // 结束时间
        activityName: this.ruleForm.activityName, // 活动名称
        activityContent: this.ruleForm.activityContent, //促销活动
        discountRatio: this.ruleForm.discountRatio, //折扣比列
        activeObjects: this.radio, //活动对像
        activityType: 0, //活动类型
        ageGroup: "", //年龄段，0-≥18周岁、1-≥50周岁
        barcode: this.b, //商品编码
        birthday: "", //0-本月生日，1-本周生日，2-当天生日
        freeQuantity: 0, //赠送数量
        fullQuantity: 0, //满足数量
        gender: "", //0-男，1-女
        occupation: "", //职业
      };
      console.log(params);
      httpreques(
        "post",
        params,
        "/realbrand-management-service/Activity/InsertActivity"
      ).then((res) => {
        if ((res.data.code = "SUCCESS")) {
          this.$message.success("新增活动成功");
          this.$router.replace("/setting/promotion");
        } else {
          this.$message.error("新增活动失败");
        }
      });
    },
    changeStore(data){
      let index = this.themelist.map(item => item.titleNumber).indexOf(data)
      this.ruleForm.titleNumber = this.themelist[index].titleNumber
      console.log(this.ruleForm.titleNumber);
      // this.storeid = this.storeNameItemList[index].storeId
    },
    //主题列表
    StoreNameList() {
      httpreques(
        "post",
        {},
        "/realbrand-management-service/Activity/ActivityTitle"
      ).then((res) => {
        if (res.data.code === "SUCCESS") {
          this.themelist = res.data.data;
          console.log(res);
          // this.pageSize = res.data.total;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/reset.scss';
// @import "@/assets/css/image2.scss";
/deep/.el-input--small .el-input__inner{
  height: 20px;
  line-height: 20px;
}
 /deep/.el-input__inner,/deep/.el-input{
  line-height: 20px;
  width: 196px;
}
.rad{
  margin-right:40px
}
.table-left{
  width: 80px;
}
/deep/.h{
  margin: 18px;
}
/deep/.el-dialog__body {
  height: 300px;
  display: flex;
  flex-direction: column;
}
.a input{
  width: 50px !important;
  margin: 0px 5px;
}
.b input{
  width: 168px !important;
}
.a{
  margin: 0;
  color: #384F71;
}
.a div{
  margin: 10px 0;
}
/deep/.el-table .caret-wrapper .sort-caret.ascending,
/deep/.el-table .caret-wrapper .sort-caret.descending {
    display: none;
}
/deep/.el-table .caret-wrapper {
    background: url('../../assets/images/sort.png') center no-repeat;
    width: 12px;
    height: 12px;
    margin-left: 4px;
}
/deep/.el-dialog__header {
  padding: 5px;
}
/deep/.el-dialog__headerbtn{
  top: 9px;
}
.inp{
  width: 480px;
  height: 40px;
  background: #FFFFFF;
  border: 1px solid #E5E5E5;
  border-radius: 23px;
  margin-bottom: 15px;
  input{
    width: 100%;
    height: 100%;
    border-radius: 23px;
    outline: none;
    border: 0;
    text-indent: 170px;
  }
}
.el-icon-search{
  position: absolute;
  top: 73px;
  left: 175px;
}
</style>