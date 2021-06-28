<template>
  <div class="tab">
    <div class="tab-title">
      <div class="left">
        <div class="print" @click="toBackList"><img class="icon" src="../../assets/images/back.png" alt=""/><span class="axis">返回列表</span></div>
        <div class="print" @click="addstore()"><img class="icon" src="../../assets/images/save.png" alt=""/><span class="axis">保存内容</span></div>
        <div class="print"><img class="icon" src="../../assets/images/print.png" alt="" /><span class="axis">打印列表</span></div>
        <div class="print" @click="exportExcel"><img class="icon" src="../../assets/images/derive.png" alt="" /><span class="axis">导出表格</span></div>
      </div>
      <div class="right">
        <!-- <div class="setup">
          <img class="set" src="../../assets/images/ic-设置.png" alt="系统设置" @click="setup">
        </div> -->
      </div>
    </div>
    <div class="table-main">
      <form action="">
        <div class="table-title">
          <p>{{msg}}</p>
        </div>
        <table border="1" class="">
          <tr>
            <td class="table-left">机构代码</td>
            <td class="table-right">
              <input type="text" placeholder="请输入门店机构代码" v-model="form.orgCode" />
            </td>
            <td class="table-left">门店类型</td>
            <td class="table-right">
              <select placeholder="请选择门店类型" v-model="form.storeType">
                <option value="" disabled style="display:none; color: #ddd">请选择门店类型</option>
                <option value="直营店">直营店</option>
                <option value="加盟店">加盟店</option>
              </select>
            </td>
          </tr>
          <tr>
            <td class="table-left">法人姓名</td>
            <td class="table-right">
              <input type="text" placeholder="请输入法人代表姓名" v-model="form.name" />
            </td>
            <td class="table-left">门店名称</td>
            <td class="table-right">
              <input
                type="text"
                placeholder="请输入门店名称"
                v-model="form.storeName"
              />
            </td>
          </tr>
          <tr>
            <td class="table-left">身份证号</td>
            <td class="table-right">
              <input
                type="text"
                placeholder="请输入法人身份证号"
                v-model="form.idNumber"
              />
            </td>
            <td class="table-left">联系号码</td>
            <td class="table-right">
              <input type="text" placeholder="请输入联系号码" v-model="form.telNum" />
            </td>
          </tr>
          <tr style="vertical-align: top">
            <td class="table-left" style="padding-top: 12px">门店地址</td>
            <td class="table-right" colspan="3" style="padding: 6px;">
              <el-cascader
                :options="options"
                v-model="selectedOptions"
                @change="handleChange"
                style="width: 100%"
                placeholder="请选择门店地址"
              >
              </el-cascader>
              <!-- <input type="text" placeholder="请输入商品售价" style="width: 100%"> -->
              <br />
              <input
                type="text"
                placeholder="请输入门店详细地址"
                style="margin-top: 6px; width: 100%"
                v-model="form.address"
              />
            </td>
          </tr>
          <tr style="vertical-align: top">
            <td class="table-left" style="padding-top: 12px">营业时间</td>
            <td class="table-right" colspan="3">
              <div class="time">
                <span>营业日期：</span>
                <el-checkbox-group v-model="checkList">
                  <el-checkbox label="周一"></el-checkbox>
                  <el-checkbox label="周二"></el-checkbox>
                  <el-checkbox label="周三"></el-checkbox>
                  <el-checkbox label="周四"></el-checkbox>
                  <el-checkbox label="周五"></el-checkbox>
                  <el-checkbox label="周六"></el-checkbox>
                  <el-checkbox label="周日"></el-checkbox>
                </el-checkbox-group>
              </div>
              <div class="time">
                <span>营业时段：</span>
                <div class="business-time">
                <select placeholder="" v-model="hoursSelected1">
                  <option v-for="(item, index) in HOURS" :key="index" :value="item">{{item}}</option>
                </select>
                <select placeholder="" v-model="minSelected1">
                  <option v-for="(item, index) in MIN" :key="index" :value="item">{{item}}</option>
                </select>
                </div>
                <span>至</span>
                <div class="business-time" style="margin-left: 10px;">
                <select placeholder="" v-model="hoursSelected2">
                  <option v-for="(item, index) in HOURS" :key="index" :value="item">{{item}}</option>
                </select>
                <select placeholder="" v-model="minSelected2">
                  <option v-for="(item, index) in MIN" :key="index" :value="item">{{item}}</option>
                </select>
                </div>
                <!-- <el-time-picker
                  is-range
                  v-model="date"
                  range-separator="至"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  placeholder="选择时间范围">
                </el-time-picker> -->
              </div>
            </td>
          </tr>
          <tr style="vertical-align: top">
            <td class="table-left" style="padding-top: 12px">门店简介</td>
            <td class="table-right" colspan="3">
              <textarea
                class="table-item"
                placeholder="请输入门店简介"
                v-model="form.introduction"
              ></textarea>
            </td>
          </tr>
          <tr style="vertical-align: top">
            <td class="table-left" style="padding-top: 12px">证件照</td>
            <td class="table-right" colspan="3" style="height: 416px; padding-top: 6px;">
              <el-upload
              v-model="form.storeLicence"
                action="http://14.29.162.130:6602/image/imageUpload"
                list-type="picture-card"
                :file-list="imgArr" 
                :on-success="handleAvatarSuccess"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
              >
                  <div  class="imgs-title">
                    <i class="el-icon-plus"></i>
                  </div>      
              <el-dialog v-if="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
              </el-upload>
              <!-- <el-dialog v-model="dialogVisible">
                <img style="width:100%" :src='form.storeLicence' alt="">
              </el-dialog> -->
            </td>
          </tr>
        </table>
      </form>
    </div>
  </div>
</template>
<script>
import httpreques from "../../utils/httpreques";
import {
  provinceAndCityData,
  regionData,
  provinceAndCityDataPlus,
  regionDataPlus,
  CodeToText,
  TextToCode,
} from "element-china-area-data";
export default {
  name: "Newproduct",
  data() {
    const HOURS = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23']
    const MIN = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59']
    return {
      options: regionData,
      selectedOptions: [],
      form: {
        orgCode: "",
        businessLicense: "",
        storeName: "",
        address: "",
        storeType: "",
        county: "",
        city: "",
        province: "",
        name: "",
        telNum: "",
        idNumber: "",
        introduction: "",
        storeLicence: "", //默认选中显示
      },
      HOURS,
      MIN,
      dialogImageUrl: "",
      dialogVisible: false,
      imgArr: [],
      checkList: [],
      date: [],
      msg: '',
      hoursSelected1: '',
      hoursSelected2: '',
      minSelected1: '',
      minSelected2: '',
    };
  },
  mounted() {
    // if (localStorage.getItem("loginuser"))
    //   this.idNumber = JSON.parse(
    //     localStorage.getItem("loginuser")
    //   ).userDetails.idNumber;
    this.getdata();
  },
  methods: {
    getdata() {
      let t = this;
      let storename = "";
      if (t.$route.query.storename) {
        storename = t.$route.query.storename;
        this.msg = '编辑门店'
      }else{
        this.msg = '新增门店'
      }
      if (storename) {
        let params = {
          storeName: storename,
        };
        httpreques(
          "post",
          params,
          "/realbrand-management-service/StoreMgt/StoreInfo"
        ).then((res) => {
          console.log(res)
          if (res.data.code === "SUCCESS") {
            //对象数据处理
            let storeobj = res.data.data;
            // storeobj.storetype = storeobj.storeType;
            // delete storeobj.storeType;
            t.selectedOptions =
              TextToCode[storeobj.province][storeobj.city][
                storeobj.county
              ].code;
            t.form = storeobj;
            this.checkList = storeobj.businessDate.split(',')
            this.hoursSelected1 = storeobj.openingTime.split(":")[0]
            this.minSelected1 = storeobj.openingTime.split(":")[1]
            this.hoursSelected2 = storeobj.closingTime.split(":")[0]
            this.minSelected2 = storeobj.closingTime.split(":")[1]
            this.imgArr.push({url: storeobj.storeLicence})
            this.dialogImageUrl = storeobj.storeLicence;
          } else {
            //接口错误处理
            t.$message.error(res.data.msg);
          }
        });
      }
    },
    addstore() {
      let t = this;
      let params = t.form;
      let businessDate = this.checkList.join()
      let openingTime = `${this.hoursSelected1}:${this.minSelected1}:00`
      let closingTime = `${this.hoursSelected2}:${this.minSelected2}:00`
      if(!params.orgCode) return this.$message.error('门店机构代码不能为空')
      if(!params.storeType) return this.$message.error('请选择门店类型')
      if(!params.name) return this.$message.error('法人代表姓名不能为空')
      if(!params.telNum) return this.$message.error('电话号码不能为空')
      if(!params.idNumber) return this.$message.error('法人身份证号不能为空')
      if(!params.storeName) return this.$message.error('门店名称不能为空')
      if(!params.province) return this.$message.error('门店地址不能为空')
      if(!params.introduction) return this.$message.error('门店简介不能为空')
      if(!businessDate || !openingTime || !closingTime) return this.$message.error('营业时间不能为空')
      params.id = this.form.id;
      params.orgCode = this.form.orgCode;
      params.businessDate = businessDate;
      params.openingTime = openingTime;
      params.closingTime = closingTime;
      delete params.storeaccount;
      delete params.storepsw;

      if (params.registertime) {
        delete params.registertime;
      }
      // console.log(JSON.stringify(params));
      //判断url
      let url = t.$route.query.storename
        ? "/realbrand-management-service/StoreMgt/UpdateStoreInfo"
        : "/realbrand-management-service/StoreMgt/InsertStoreInfo";

      httpreques("post", params, url).then((res) => {
        if (res.data.code === "SUCCESS") {
          t.$message({
            message: t.$route.query.storename ? "修改成功" : "添加成功",
            type: "success",
          });
          t.toBackList();
        } else {
          //接口错误处理
          t.$message.error(res.data.msg);
        }
      });
      // });
    },
    //选择省市区
    handleChange(value) {
      let t = this;
      t.form.province = CodeToText[value[0]];
      t.form.city = CodeToText[value[1]];
      t.form.county = CodeToText[value[2]];
    },
    //预览图片
    handlePictureCardPreview(res, file){
      // console.log(file);
      console.log(res);
      this.dialogVisible = true;
      this.form.storeLicence = res.response.data;
    },
    //图片
    handleAvatarSuccess(res, file) {
      console.log(file);
      console.log(res);
      // return
      this.dialogImageUrl = res.data;
      this.form.storeLicence = res.data;
    },
    handleRemove(file, fileList) {
        console.log(file, fileList);
      },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
      },
    toBackList() {
      this.$router.go(-1);
    },
    cancelbtn() {
      let t = this;
      t.$router.push({ path: "/product" });
    },
  },
};
</script>
<style lang="scss" scoped>
/deep/.el-cascader .el-input .el-input__inner {
  width: 100%;
  height: 20px;
  line-height: 28px;
  font-size: 12px;
  padding: 4px;
  color: #333;
  outline: none;
}
/deep/.el-input--small{
  line-height: 28px;
}
/deep/.el-cascader--small{
  line-height: 28px;
}
/deep/.el-cascader .el-input .el-input__inner:focus {
  border: 1px solid #ddd;
}
/deep/.el-cascader .el-input__inner::-webkit-input-placeholder {
  color: #ddd;
}
/deep/.el-cascader .el-input__inner::-moz-input-placeholder {
  color: #ddd;
}
/deep/.el-cascader .el-input__inner::-ms-input-placeholder {
  color: #ddd;
}
.time{
  display: flex;
  align-items: center;
  margin: 8px 0 10px 0;
  span{
    color: #384F71;
  }
  /deep/.el-checkbox{
    margin-right: 12px;
    .el-checkbox__input{
      margin-right: 4px;
    }
  }
  /deep/input{
    border: none
  }
}
.table-main table .table-right .business-time select{
  width: 70px;
  margin-right: 10px;
}
.business-time{
  display: flex;
}
@import "../../assets/css/reset.scss";
@import "@/assets/css/image2.scss";
</style>