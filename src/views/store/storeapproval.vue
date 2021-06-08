<template>
  <div class="tab">
    <div class="tab-title">
      <div class="left">
        <div class="print" @click="toBackList"><img class="icon" src="../../assets/images/back.png" alt=""/><span class="axis">返回列表</span></div>
        <div class="print" @click="addStoreList()"><img class="icon" src="../../assets/images/save.png" alt=""/><span class="axis">保存内容</span></div>
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
      <form action="#">
        <div class="table-title">
          <p>新增企业</p>
        </div>
        <table border="1" class="">
          <tr>
            <td class="table-left">企业名称</td>
            <td class="table-right">
              <input type="text" placeholder="请输入企业名称" v-model="ruleForm.enterpriseName" />
            </td>
            <td class="table-left">所属行业</td>
            <td class="table-right">
              <input type="text" placeholder="请输入所属行业" v-model="ruleForm.industryName" />
            </td>
          </tr>
          <tr>
            <td class="table-left">企业账号</td>
            <td class="table-right">
              <input type="text" placeholder="请输入企业账号" v-model="ruleForm.idNumber" />
            </td>
            <td class="table-left">联系人</td>
            <td class="table-right">
              <input type="text" placeholder="请输入联系人" v-model="ruleForm.legalPerson" />
            </td>
          </tr>
          <tr>
            <td class="table-left">注册时间</td>
            <td class="table-right">
                <el-date-picker
                  v-model="ruleForm.registerTime"
                  type="datetime"
                  placeholder="选择日期时间"
                >
                </el-date-picker>
            </td>
            <td class="table-left">营业执照</td>
            <td class="table-right">
              <input
                type="text"
                placeholder="请输入营业执照"
                v-model="ruleForm.businessLicense"
              />
            </td>
          </tr>
          <tr>
            <td class="table-left">联系手机号</td>
            <td class="table-right" colspan="3">
              <input
                type="text"
                placeholder="请输入联系人手机号"
                v-model="ruleForm.userMobile"
              />
            </td>
          </tr>
          <tr style="vertical-align: top">
            <td class="table-left" style="padding-top:28px">企业地址</td>
            <td class="table-right" colspan="3" style="height:665px">
              <el-cascader
                :options="options"
                v-model="selectedOptions"
                @change="handleChange"
                style="width: 100%"
                placeholder="请选择企业地址"
              >
              </el-cascader>
              <br />
              <input
                type="text"
                placeholder="请输入门店详细地址"
                style="margin-top: 6px; width: 100%"
                v-model="ruleForm.address"
              />
            </td>
          </tr>
          <!-- <tr style="vertical-align: top">
            <td class="table-left" style="padding-top: 12px">证件照</td>
            <td class="table-right" colspan="3" style="height: 516px; padding-top: 6px;">
              <el-upload
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
              <el-dialog v-model="dialogVisible">
                <img style="width:100%" :src='form.storeLicence' alt="">
              </el-dialog>
            </td>
          </tr> -->
        </table>
      </form>
    </div>
    </div>
</template>
<script>
import Btn from "../../components/Btn";
import city from "../../assets/json/city.json";
import NewBreadCrumb from "../../layouts/IndexLayout/components/NewBreadCrumb";
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
  name: "linkage",
  data() {
    return {
      options: regionData,
      selectedOptions: [],
      ruleForm: {
        address: "",
        auditState: "",
        businessLicense: "",
        city: "",
        county: "",
        enterpriseName: "",
        id: "",
        idNumber: this.idNumber,
        industryName: "",
        legalPerson: "",
        province: "",
        registerTime: "",
        userMobile: "",
        a:"",//暂用于营业执照
      },
     
      // 整个省市县数据
      city: city,
      // 被选中的市数据
      cityList: [],
      // 被选中的县数据
      areaList: [],
      selectProvince: {},
      selectCity: {},
      selectArea: {},
    };
  },
  methods: {
    // async addStoreList() {
    //   let params = {
    //     frontId: this.ruleForm.frontId,
    //     idNumber: this.ruleForm.idNumber,
    //     name: this.ruleForm.name,
    //     password: this.ruleForm.password,
    //     reverseId: this.ruleForm.frontId,
    //     station: this.ruleForm.frontId,
    //     storeName: this.ruleForm.storeName,
    //     telNum: this.ruleForm.telNum,
    //   };
    //   const { data: res } = await httpreques(
    //     "post",
    //     params,
    //     "/realbrand-management-service/StoreUserMgt/InserUseraccount"
    //   );
    //   console.log(res);
    // },
    toBackList(){
      this.$router.go(-1)
    },
    addStoreList() {
      let t = this;
      // t.$refs["ruleForm"].validate((valid) => {
        // if (!valid) {
          // return false;
        // }
        let params = t.ruleForm;
        console.log(params);
        httpreques(
          "post",
          params,
          "/realbrand-management-service/EnterpriseMgt/InsertEnterpriseInfo"
        ).then((res) => {
          console.log(res);
          if (res.data.code == "SUCCESS") {
            // let storeobj = res.data.data;
            // storeobj.address = storeobj.addresss;
            // storeobj.storetype = storeobj.store_type;
            // delete storeobj.addresss;
            // delete storeobj.store_type;
            // t.selectedOptions =
            //   TextToCode[storeobj.province][storeobj.city][
            //     storeobj.county
            //   ].code;
            // t.ruleForm = storeobj;
            t.$message({
              message: "添加成功",
              type: "success",
            });
            // t.cancelbtn();
            t.$router.push({ path: "/sysuser/store" });
          } else {
            //接口错误处理
            t.$message.error(res.data.msg);
          }
        });
      // });
    },
    handleChange(value) {
      let t = this;
      t.ruleForm.province = CodeToText[value[0]];
      t.ruleForm.city = CodeToText[value[1]];
      t.ruleForm.county = CodeToText[value[2]];
    },
    cancelStoreList() {
      // this.ruleForm.frontId='',
      // this.ruleForm.idNumber='',
      // this.ruleForm.name='',
      // this.ruleForm.password='',
      // this.ruleForm.reverseId='',
      // this.ruleForm.station='',
      // this.ruleForm.storeName='',
      // this.ruleForm.telNum=''
      this.$router.push({ path: "/store" });
    },
  },
  components: {
    NewBreadCrumb,
    Btn
  },
};
</script>
<style lang="scss" scoped>
@import '@/assets/css/reset.scss';
/deep/.el-cascader .el-input .el-input__inner {
  width: 100%;
  height: 20px;
  line-height: 28px;
  font-size: 12px;
  padding: 4px;
  color: #333;
  outline: none;
}
/deep/.el-input--small .el-input__inner{
  height: 20px;
  width: 196px;
}
/deep/.el-input__inner{
  padding-left: 28px;
}
/deep/.el-input--small{
  line-height: 20px;
}
/deep/.el-date-editor.el-input, .el-date-editor.el-input__inner{
  width: 196px;
}
/deep/.el-input--suffix .el-input__inner{
  padding-right:0;
}
/deep/.el-input--small .el-input__icon {
  line-height: 24px;
}
</style>