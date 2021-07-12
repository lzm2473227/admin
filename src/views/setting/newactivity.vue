<template>
  <div class="newactivity">
    <div class="tab-title">
      <div class="left">
        <div class="print" @click="$router.go(-1)">
          <img class="icon" src="@/assets/images/back.png" alt="" /><span
            class="axis"
            >返回列表</span
          >
        </div>
        <div class="print" @click="addActivity">
          <img class="icon" src="@/assets/images/confirm.png" alt="" /><span
            class="axis"
            >保存确认</span
          >
        </div>
        <div class="print">
          <img class="icon" src="@/assets/images/print.png" alt="" /><span
            class="axis"
            >打印列表</span
          >
        </div>
        <div class="print" @click="exportExcel">
          <img class="icon" src="@/assets/images/derive.png" alt="" /><span
            class="axis"
            >导出表格</span
          >
        </div>
      </div>
      <div class="right">
        <div class="setup">
          <img
            class="set"
            src="@/assets/images/ic-设置.png"
            alt="系统设置"
            @click="setup"
          />
        </div>
      </div>
    </div>
    <div class="table-main">
      <div class="table-title">
        <p>新增折扣活动</p>
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
            <td class="table-left">活动规则</td>
            <td class="table-right" colspan="3">
              <div style="display: flex; align-items: center">
                折扣比例<input
                  type="text"
                  v-model="ruleForm.discountRatio"
                  style="width: 88%; margin-left: 11px"
                />
              </div>
            </td>
          </tr>

          <tr>
            <td class="table-left">活动对象</td>
            <td class="table-right" colspan="3">
              <el-radio-group v-model="radio">
                <el-radio label="0" style="margin-right: 40px">全部</el-radio>
                <el-radio label="1" style="margin-right: 40px" @click="appoint"
                  >指定消费者</el-radio
                >
              </el-radio-group>
            </td>
          </tr>

          <tr>
            <td class="table-left" style="height: 620px">活动内容</td>
            <td class="table-right" colspan="3">
              <textarea
                style="height: 614px"
                class="table-item"
                v-model="ruleForm.activityContent"
                placeholder="此段文字是关于五一节活动折扣促销的文字描述"
              ></textarea>
            </td>
          </tr>
        </table>
      </form>
    </div>
    <el-dialog
      title=""
      v-model="centerDialogVisible"
      width="30%"
      :close-on-click-modal="false"
    >
      <tr class="h">
        <td class="table-left">性别</td>
        <td class="table-right" style="margin-right: 18px">
          <el-radio-group v-model="ruleForm.sex">
            <el-radio label="1" class="rad">男</el-radio>
            <el-radio label="2" class="rad">女</el-radio>
            <el-radio label="3" class="rad">未知</el-radio>
          </el-radio-group>
        </td>
      </tr>
      <tr class="h">
        <td class="table-left">年龄区间</td>
        <td class="table-right" style="margin-right: 18px">
          <el-radio-group v-model="ruleForm.age">
            <el-radio label="1" class="rad">≥18周岁</el-radio>
            <el-radio label="2" class="rad">≥50周岁</el-radio>
          </el-radio-group>
        </td>
      </tr>
      <tr class="h">
        <td class="table-left">生日</td>
        <td class="table-right" style="margin-right: 18px">
          <el-radio-group v-model="ruleForm.birthday">
            <el-radio label="1" class="rad">本月生日</el-radio>
            <el-radio label="2" class="rad">本周生日</el-radio>
            <el-radio label="3" class="rad">本日生日</el-radio>
          </el-radio-group>
        </td>
      </tr>
      <tr class="h">
        <td class="table-left">职业</td>
        <td class="table-right" style="margin-right: 18px">
          <el-radio-group v-model="ruleForm.profession">
            <el-radio label="1" class="rad">医生</el-radio>
            <el-radio label="2" class="rad">教师</el-radio>
            <el-radio label="3" class="rad">其他</el-radio>
          </el-radio-group>
        </td>
      </tr>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="centerDialogVisible = false"
          >确 定</el-button
        >
        <el-button @click="centerDialogVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import httpreques from "../../utils/httpreques";
// import moment from "moment";
export default {
  name: "newactivity",
  data() {
    return {
      themelist:[],
      ruleForm: {
        titleNumber: "",
        startTime: "",
        endTime: "",
        activityContent: "",
        discountRatio: 10,
        activityContent: "",
        // activeObjects: 0,
        barcode:"",
        customer: [
          { id: 0, name: "全部" },
          { id: 1, name: "指定消费者" },
        ],
        sex: 1,
      },
      centerDialogVisible: false,
      titleName:"",  //选中的主题
      radio:"0",     //单选框默认值
    };
  },
  created(){
    this.StoreNameList();
    this.getdata()
  },
  methods: {
    // getdata() {
    //   let len = [];
    //   let t = this;
    //   let params = {
    //     activityState: this.ruleForm.activityState,
    //     subActivityName: this.ruleForm.subActivityName,
    //     pageNum: this.pageNum,
    //     pageSize: this.pageSize,
    //   };
    //   this.tabledata = [];
    //   httpreques(
    //     "post",
    //     params,
    //     "realbrand-management-service/Activity/ActivityList"
    //   ).then((res) => {
    //     // console.log(res);
    //     if (res.data.code === "SUCCESS") {
    //       t.total = res.data.total;
    //       // 序号倒序排列
    //       let arr = new Array(this.total)
    //         .join(",")
    //         .split(",")
    //         .map((item, index) => {
    //           return index + 1;
    //         });
    //       arr = arr.reverse();
    //       len = arr.slice(
    //         (this.pageNum - 1) * this.pageSize,
    //         this.pageNum * this.pageSize
    //       ); // 获取数组最后 20 个元素
    //       _.forEach(res.data.data, function (item, key) {
    //         item.startTime = moment(item.startTime).format(
    //           "YYYY-MM-DD HH:mm:ss"
    //         );
    //         item.endTime = moment(item.endTime).format("YYYY-MM-DD HH:mm:ss");
    //         item.index = key + 1;
    //         // item.index = len[key];
    //         // console.log(key);
    //         // console.log(len[key]);
    //       });
    //       t.tabledata = res.data.data;
    //       // t.tabledata.reverse()
    //     } else {
    //       this.$message(res.data.msg);
    //     }
    //   });
    // },
    appoint() {
      this.centerDialogVisible = true;
    },
    addActivity() {
      if(!this.ruleForm.titleNumber) return this.$message("请选择主题活动")
      if(!this.ruleForm.activityName) return this.$message("请填写活动名称")
      if(!this.ruleForm.startTime) return this.$message("请填写起始时间")
      if(!this.ruleForm.endTime) return this.$message("请填写结束时间")
      if(!this.ruleForm.activityContent) return this.$message("请填写促销活动")
      if(!this.ruleForm.discountRatio) return this.$message("请填写折扣比列")
      let params = {
        titleNumber: this.ruleForm.titleNumber, // 活动主题
        startTime: this.ruleForm.startTime, //起始时间
        endTime: this.ruleForm.endTime, // 结束时间
        activityName: this.ruleForm.activityName, // 活动名称
        activityContent: this.ruleForm.activityContent, //促销活动
        discountRatio: this.ruleForm.discountRatio, //折扣比列
        activeObjects: this.radio, //活动对像 0-折扣，1-买赠，2-满增
        activityType: 1, //活动类型
        ageGroup: "", //年龄段，0-≥18周岁、1-≥50周岁
        barcode: "", //商品编码
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
    //选中的主题
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
    },
    //赠送商品列表
    getdata() {
      let len = []
      let t = this;
      httpreques(
        "post",
        {
          price: "",
          commodityName: this.ruleForm.commodityName,
          pageNum: t.pageNum,
          pageSize: t.pageSize,
        },
        "/realbrand-management-service/CommodityMgt/BarcodeList"
      ).then((res) => {
        console.log(res);
        if (res.data.code == "SUCCESS") {
          t.total = res.data.total;
          t.pages = res.data.pages;
          // 序号倒序排列
          let arr=new Array(this.total).join(',').split(',').map((item,index)=>{
            return index+1;
          })
          arr = arr.reverse()
          len = arr.slice((this.pageNum-1)*this.pageSize, this.pageNum*this.pageSize) // 获取数组最后 20 个元素
          _.forEach(res.data.data, function (item, key) {
            item.index = len[key]
          });
          t.tabledata = res.data.data;
          // t.tabledata.reverse()
        } else {
          this.$message(res.data.msg);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/reset";
/deep/.el-input--small .el-input__inner {
  height: 20px;
  line-height: 20px;
}
/deep/.el-input__inner,
/deep/.el-input {
  line-height: 20px;
  width: 196px;
}
.rad {
  margin-right: 40px;
}
.table-left {
  width: 80px;
}
/deep/.el-dialog__header {
  padding: 5px;
}
/deep/.h {
  margin: 18px;
}
/deep/.el-dialog__body {
  background: #fff;
  height: 300px;
  display: flex;
  flex-direction: column;
}
</style>