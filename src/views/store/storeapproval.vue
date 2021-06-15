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
          <p>新增经销商</p>
        </div>
        <table border="1" class="">
          <tr>
            <td class="table-left">机构代码</td>
            <td class="table-right">
              <input type="text" placeholder="请输入机构代码" v-model="ruleForm.industryName" />
            </td>
            <td class="table-left">单位名称</td>
            <td class="table-right">
              <input type="text" placeholder="请输入企业名称" v-model="ruleForm.enterpriseName" />
            </td>
          </tr>
          <tr>
            <td class="table-left">法人代表</td>
            <td class="table-right">
              <input type="text" placeholder="请输入法人代表" v-model="ruleForm.b" />
            </td>
            <td class="table-left">代理人</td>
            <td class="table-right">
              <input type="text" placeholder="请输入代理人" v-model="ruleForm.legalPerson" />
            </td>
          </tr>
          <!-- <tr>
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
          </tr> -->
          <tr>
            <td class="table-left">身份证号</td>
            <td class="table-right">
              <input
                type="text"
                placeholder="请输入代理人身份证号"
                v-model="ruleForm.a"
              />
            </td>
            <td class="table-left">联系手机号</td>
            <td class="table-right">
              <input
                type="text"
                placeholder="请输入联系人手机号"
                v-model="ruleForm.userMobile"
              />
            </td>
          </tr>
          <tr style="vertical-align: top">
            <td class="table-left" style="padding-top:28px">单位地址</td>
            <td class="table-right" colspan="3">
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
                placeholder="请输入单位详细地址"
                style="margin-top: 6px; width: 100%"
                v-model="ruleForm.address"
              />
            </td>
          </tr>
          <tr style="vertical-align: top">
            <td class="table-left" style="padding-top:20px">初始密码</td>
            <td class="table-right" colspan="3" style="height:615px; padding-top:20px">
              <div class="password"><div>666666</div><button type="button">重置密码</button></div>
            </td>
          </tr>
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
        password:"666666",
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
.password{
  display: flex;
  // justify-content: space-around;
  align-items: center;
  button{
    margin-left: 82px;
    outline: none;
    padding: 0;
  }
}
</style>