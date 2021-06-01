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
      <div class="mainForm">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="130px"
          class="demo-ruleForm"
          label-position="left"
        >
          <el-form-item label="企业名称：">
            <el-input
              v-model="ruleForm.enterpriseName"
              placeholder="请输入企业名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="所属行业：">
            <el-input
              v-model="ruleForm.industryName"
              placeholder="请输入所属行业"
            ></el-input>
          </el-form-item>
          <el-form-item label="企业账号：">
            <el-input
              v-model="ruleForm.idNumber"
              placeholder="请输入企业账号"
            ></el-input>
            <span
              style="
                display: inline-block;
                font-size: 12px;
                color: #666666;
                margin-top: 4px;
              "
              >身份证号为企业账号，初始密码为：<sapn style="color: red">66666666</sapn></span
            >
          </el-form-item>
          <el-form-item
            label="门店地址"
            prop="address"
            class="from-item-padding"
          >
            <div class="select-province">
              <el-cascader
                :options="options"
                v-model="selectedOptions"
                @change="handleChange"
              >
              </el-cascader>
            </div>
            <el-input
              v-model="ruleForm.address"
              placeholder="请输入门店详细地址"
              style="padding-top: 15px"
            ></el-input>
          </el-form-item>
          <!-- <el-form-item
            label="营业执照"
            prop="businessLicense"
            class="from-item-padding"
          >
            <div class="clerk-imgs">
              <el-upload
                action="#"
                list-type="picture-card"
                :auto-upload="false"
              >
                <template #default>
                  <div class="imgs-title">
                    <i class="el-icon-plus"></i>
                    <sapn class="cardfront"></sapn>
                  </div>
                </template>
                <template #file="{ file }">
                  <div>
                    <img
                      class="el-upload-list__item-thumbnail"
                      :src="file.url"
                      alt=""
                    />
                    <span class="el-upload-list__item-actions">
                      <span
                        class="el-upload-list__item-preview"
                        @click="handlePictureCardPreview(file)"
                      >
                        <i class="el-icon-zoom-in"></i>
                      </span>

                      <span
                        v-if="!disabled"
                        class="el-upload-list__item-delete"
                        @click="handleRemove(file)"
                      >
                        <i class="el-icon-delete"></i>
                      </span>
                    </span>
                  </div>
                </template>
              </el-upload>
            </div>
          </el-form-item> -->
          <el-form-item label="营业执照">
            <el-input
              v-model="ruleForm.businessLicense"
              placeholder="请输入营业执照"
            ></el-input>
          </el-form-item>

          <el-form-item label="联系人">
            <el-input
              v-model="ruleForm.legalPerson"
              placeholder="请输入联系人"
            ></el-input>
          </el-form-item>
          <el-form-item label="联系人手机号：">
            <el-input
              v-model="ruleForm.userMobile"
              placeholder="请输入联系人手机号"
            ></el-input>
          </el-form-item>
          <el-form-item label="注册时间">
            <!-- <el-input v-model="ruleForm.registerTime"></el-input> -->
            <div class="block">
              <el-date-picker
                v-model="ruleForm.registerTime"
                type="datetime"
                placeholder="选择日期时间"
              >
              </el-date-picker>
            </div>
          </el-form-item>
        </el-form>
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
      t.$refs["ruleForm"].validate((valid) => {
        if (!valid) {
          return false;
        }
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
      });
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
</style>