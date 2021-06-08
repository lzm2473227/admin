<template>
  <div class="tab">
    <div class="tab-title">
      <div class="left">
        <div class="print" @click="$router.push('/setting/advertmentlist')">
          <img class="icon" src="../../assets/images/back.png" alt="" /><span
            class="axis"
            >返回列表</span
          >
        </div>
        <div class="print" @click="addadv()">
          <img class="icon" src="../../assets/images/save.png" alt="" /><span
            class="axis"
            >保存内容</span
          >
        </div>
        <div class="print">
          <img class="icon" src="../../assets/images/print.png" alt="" /><span
            class="axis"
            >打印列表</span
          >
        </div>
        <div class="print" @click="exportExcel">
          <img class="icon" src="../../assets/images/derive.png" alt="" /><span
            class="axis"
            >导出表格</span
          >
        </div>
      </div>
  </div>
  <div class="table-main">
    <div class="table-title">
          <p>新增广告</p>
        </div>
    <form>
      <table border="1">
        <tr>
          <td class="table-left">广告编码</td>
          <td class="table-right"><input type="text" placeholder="请输入广告编码" v-model="ruleForm.advertisementNumber"></td>
          <td class="table-left">广告名称</td>
          <td class="table-right"><input type="text" placeholder="请输入广告名称" v-model="ruleForm.advertisementName"></td>
        </tr>
        <tr>
          <td class="table-left">广告类型</td>
          <td class="table-right"><input type="text" placeholder="请输入广告类型" v-model="ruleForm.type"></td>
          <td class="table-left">广告位置</td>
          <td class="table-right">     
              <select
                v-model="ruleForm.positionName"
                placeholder="请选择广告位置"
                @change="selectpositionName"
              >
                <option
                  v-for="(item, key) in positions"
                  :key="key"
                  :label="item.positionName"
                  :value="item.positionName"
                >
                </option>
              </select>
          </td>
        </tr>
        <tr>
          <td class="table-left">起始时间</td>
          <td class="table-right">
              <el-date-picker
                v-model="ruleForm.startTime"
                type="datetime"
                format="YYYY-MM-DD HH:mm:ss"
                prefix-icon=none
                placeholder="请选择时间"
                
              >
              </el-date-picker>
            </td>
            <td class="table-left">截止时间</td>
            <td class="table-right">
              <el-date-picker
                v-model="ruleForm.endTime"
                type="datetime"
                format="YYYY-MM-DD HH:mm:ss"
                prefix-icon=none
                placeholder="请选择时间"
                
              >
              </el-date-picker>
          </td>
        </tr>
        <tr>
          <td class="table-left">广告状态</td>
          <td class="table-right">
            <el-radio v-model="ruleForm.enableState" label="1">启用</el-radio>
            <el-radio
              v-model="ruleForm.enableState"
              class="radio-right"
              label="0"
              >禁用</el-radio
            >
          </td>
          <td class="table-left">广告描述</td>
          <td class="table-right"><textarea class="table-item" placeholder="请输入广告描述" v-model="ruleForm.advertisementDescribe"></textarea></td>
        </tr>
        <tr style="vertical-align: top;">
          <td class="table-left" style="padding-top: 12px;">广告图片</td>
          <td class="table-right" colspan="3" style="height: 580px; padding-top: 6px;">
           <el-upload
              action="http://14.29.162.130:6602/image/imageUpload"
              list-type="picture-card"
              :on-success="handleAvatarSuccess"
              :on-preview="handlePictureCardPreview" 
            >
              <template #default >
                <div  class="imgs-title">
                  <i class="el-icon-plus"></i>
                </div>
              </template>         
            </el-upload>
            <el-dialog v-model="dialogVisible">
              <img style="width:100%" :src='ruleForm.linkPosition' alt="文字介绍">
            </el-dialog>
          </td>
          <!-- <div class="block">     //转化为时间戳
            <span class="demonstration">时间戳</span>
            <div class="demonstration">值：{{ value1 }}</div>
            <el-date-picker
              v-model="value1"
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              @change="aad(value1)"
              value1-format="timestamp">
            </el-date-picker>
          </div> -->
        </tr>
      </table>
    </form>
  </div>
  
  </div>
</template>
<script>
import NewBreadCrumb from "../../layouts/IndexLayout/components/NewBreadCrumb";
import httpreques from "../../utils/httpreques";
import moment from "moment";
import Btn from "../../components/Btn";
export default {
  name: "NewAdvertment",
  components: { NewBreadCrumb, Btn },
  data() {
    return {
      value1:"",
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      ruleForm: {
        enableState: "",
        endTime: "",
        linkPosition: "",
        positionName: "",
        startTime: "", 
        advertisementNumber:"", //广告编码
        advertisementName:"",  //广告名称
        type:"",               //广告类型
        advertisementDescribe:"",  //广告描述
      },
      linkPosition: "", //默认选中显示
      positions: [],
      idNumber: "",
    };
  },
  mounted() {
    this.getdata();
    // console.log( new Date().getTime());
    // this.aad()
  },
  methods: {
    aad(){
      console.log(new Date().getTime(this.value1));
      // console.log(timestamp);
    },
    //图片
    handleAvatarSuccess(res, file) {
      // console.log(file);
      // console.log(res);
      if (res.code === "Success") {
        this.dialogImageUrl = res.data;
        this.ruleForm.linkPosition = res.data;
      }
    },
    //预览图片
    handlePictureCardPreview(res, file) {
      // console.log(file);
      console.log(res);
      this.dialogVisible = true;
      this.ruleForm.linkPosition = res.response.data;
    },
    getdata() {
      let t = this;
      t.getpositionlist();
      // t.handleChange();
      let advertmentid = t.$route.query.advertmentid;
      if (advertmentid) {
        let params = {
          id: advertmentid,
        };
        httpreques(
          "post",
          params,
          "/realbrand-management-service/AdvertisementMgt/AdvertisementInfo"
        ).then((res) => {
          if (res.data.code === "SUCCESS") {
            // 对象数据处理
            let advobj = res.data.data;
            advobj.startTime = moment(advobj.startTime).format(
              "YYYY-MM-DD HH:mm:ss"
            );
            advobj.endTime = moment(advobj.endTime).format(
              "YYYY-MM-DD HH:mm:ss"
            );
            advobj.enableState = advobj.enableState.toString();
            if (advobj.linkPosition) this.dialogImageUrl = advobj.linkPosition;
            t.ruleForm = advobj;
          } else {
            //接口错误处理
            t.$message.error(res.data.msg);
          }
        });
      }
    },
    getpositionlist() {
      let t = this;
      httpreques(
        "post",
        {},
        "/realbrand-management-service/AdvertisementMgt/PositionNameList"
      ).then((res) => {
        if (res.data.code === "SUCCESS") {
          //对象数据处理
          t.positions = res.data.data.positionNameItemList;
        } else {
          //接口错误处理
          t.$message.error(res.data.msg);
        }
      });
    },
    addadv() {
      let t = this;
      // console.log(t.ruleForm.enableState);
      this.ruleForm.enableState = parseInt(this.ruleForm.enableState);
      let params = t.ruleForm;
      params.id = t.$route.query.advertmentid;

      let url = t.$route.query.advertmentid
        ? "/realbrand-management-service/AdvertisementMgt/UpdateAdvertisement"
        : "/realbrand-management-service/AdvertisementMgt/InsertAdvertisement";
      console.log(params);
      if (!params.id) {
        params.id = 0;
        params.applyTime = moment(params.startTime);
      }
      //接口参数格式处理
      params.startTime = moment(params.startTime);
      params.endTime = moment(params.endTime);

      httpreques("post", params, url).then((res) => {
        if (res.data.code === "SUCCESS") {
          t.$message({
            message: t.$route.query.storename ? "修改成功" : "添加成功",
            type: "success",
          });
          t.cancelbtn();
        } else {
          //接口错误处理
          t.$message.error(res.data.msg);
        }
      });
    },
    selectpositionName(val) {
      let t = this;
      t.positionName = val;
    },
    cancelbtn() {
      let t = this;
      t.$router.push({ path: "/setting/advertmentlist" });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../assets/css/reset.scss";
@import "@/assets/css/image2.scss";
/deep/.el-date-editor.el-input, .el-date-editor.el-input__inner, .table-right .el-input__inner{
  width: 196px;
  height: 24px;
}
/deep/.el-input__inner{
  width: 196px;
  height: 24px;
}
</style>
