<template>
  <div class="CorporateInformation">
    <NewBreadCrumb
      ptitle="门店"
      ctitle="新增账号"
      path="/store"
    ></NewBreadCrumb>
    <div class="main">
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
          <el-form-item
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
      <!-- <div class="footer">
        <el-button type="primary" @click="addStoreList">新增</el-button>
        <el-button type="danger" @click="cancelStoreList">取消</el-button>
      </div> -->
      <Btn
      :btntext="$route.query.storename ? '编辑' : '新增'"
      @addbtn="addStoreList"
      @cancelbtn="cancelStoreList"
    />
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
            t.$router.push({ path: "/store" });
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
.CorporateInformation {
   display: flex;
  flex-direction: column;
    position: relative;
   background-color: #f6faff;
  padding-top: 30px;
  height: 100%;
  box-sizing: border-box; 
  //   padding: 16px;
  .main {
    height: 100%;
    box-sizing: border-box;
    padding: 16px;
    background: #fff;
    p {
      font-size: 20px;
      font-weight: bold;
      color: #333;
    }
    .mainForm {
      width: 500px;
    }
    .footer {
      position: absolute;
      bottom: 30px;
      left: 50%;
      transform: translate(-50%);
      .el-button {
        width: 120px;
        height: 38px;
        margin-right: 20px;
      }
    }
  }
  .linkage {
    display: flex;
    div {
      margin-right: 5px;
    }
  }
}
/deep/.el-input__inner {
  width: 328px;
  margin-right: 50px;
  height: 36px;
  font-size: 14px;
}
/deep/.el-form-item--medium .el-form-item__label {
  line-height: 36px;
  font-size: 14px;
}
/deep/.el-button--medium {
  width: 92px;
  height: 38px;
  // margin-top: 6px;
}
/deep/.el-input__suffix {
  position: absolute;
  height: 100%;
  right: 70px;
  top: 0;
  text-align: center;
  color: #c0c4cc;
  transition: all 0.3s;
  pointer-events: none;
}
/deep/.el-upload--picture-card {
  background-color: #fbfdff;
  border: 1px dashed #c0ccda;
  border-radius: 6px;
  box-sizing: border-box;
  width: 100px;
  height: 100px;
  cursor: pointer;
  line-height: 102px;
  vertical-align: top;
}
/deep/.el-form-item--small.el-form-item {
  margin-bottom: 24px;
}
</style>