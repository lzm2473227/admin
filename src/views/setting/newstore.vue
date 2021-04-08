<template>
  <div class="newstore">
    <NewBreadCrumb
      ptitle="门店列表"
      ctitle="新增门店"
      path="/setting/storelist"
    ></NewBreadCrumb>
    <div class="newstore-content">
<div class="newstore-from">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="120px"
        class="demo-ruleForm"
        label-position="left"
      >
        <el-form-item
          label="门店机构代码"
          prop="orgCode"
          class="from-item-padding"
        >
          <el-input
            v-model="ruleForm.orgCode"
            placeholder="请输入门店机构代码"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="门店名称"
          prop="storeName"
          class="from-item-padding"
        >
          <el-input
            v-model="ruleForm.storeName"
            placeholder="请输入门店名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="门店地址" prop="address" class="from-item-padding">
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
          label="门店类别"
          prop="storetype"
          class="from-item-padding"
        >
          <el-input
            v-model="ruleForm.storetype"
            placeholder="请输入门店类别"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="门店许可证"
          prop="businessLicense"
          class="from-item-padding"
        >
          <el-input v-model="ruleForm.businessLicense"></el-input>
        </el-form-item>
        <el-form-item
          label="证件照"
          prop="businessLicense"
          class="from-item-padding"
        >
          <div class="clerk-imgs">
            <el-upload action="#" list-type="picture-card" :auto-upload="false">
              <template #default>
                <div class="imgs-title">
                  <i class="el-icon-plus"></i>
                  <sapn class="cardfront">请上传营业执照</sapn>
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
        <!-- <el-form-item
          label="门店账号"
          prop="storeaccount"
          class="from-item-padding"
        >
          <el-input
            v-model="ruleForm.storeaccount"
            placeholder="请输入门店账号"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="初始密码"
          prop="storepsw"
          class="from-item-padding"
        >
          <el-input
            v-model="ruleForm.storepsw"
            placeholder="请输入初始密码"
          ></el-input>
        </el-form-item> -->
      </el-form>
    </div>
    </div>
    <Btn
      :btntext="$route.query.storename ? '编辑' : '新增'"
      @addbtn="addstore"
      @cancelbtn="cancelbtn"
    />
  </div>
</template>
<script>
import Btn from "../../components/Btn";
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
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
export default {
  name: "NewStore",
  data() {
    return {
      options: regionData,
      selectedOptions: [],
      ruleForm: {
        orgCode: "",
        businessLicense: "",
        storeName: "",
        address: "",
        storetype: "",
        county: "",
        city: "",
        province: "",
      },
      idNumber: '',
      rules: {
        orgCode: [
          { required: true, message: "请输入门店机构代码", trigger: "blur" },
        ],
        storeName: [
          { required: true, message: "请输入门店名称", trigger: "blur" },
        ],
        address: [
          { required: true, message: "请输入门店地址", trigger: "blur" },
        ],
        storetype: [
          { required: true, message: "请输入门店类别", trigger: "blur" },
        ],
        businessLicense: [
          { required: true, message: "请输入门店许可证", trigger: "blur" },
        ],
      },
    };
  },
  mounted() {
    // let t = this;
    // t.selectedOptions = TextToCode[province][city][county].code;
    if(localStorage.getItem("loginuser")) this.idNumber = JSON.parse(localStorage.getItem("loginuser")).userDetails.idNumber
    this.getdata();
  },
  methods: {
    getdata() {
      let t = this;
      let storename = "";
      if (t.$route.query.storename) {
        storename = t.$route.query.storename;
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
          if (res.data.code == "SUCCESS") {
            //对象数据处理
            let storeobj = res.data.data;
            storeobj.storetype = storeobj.storeType;
            delete storeobj.storeType;
            t.selectedOptions =
              TextToCode[storeobj.province][storeobj.city][
                storeobj.county
              ].code;
            t.ruleForm = storeobj;
          } else {
            //接口错误处理
            t.$message.error(res.data.msg);
          }
        });
      }
    },
    addstore() {
      let t = this;
      t.$refs["ruleForm"].validate((valid) => {
        if (!valid) {
          return;
        }
        let params = t.ruleForm;

        // params.storeName = uuidv4().substring(0, 8);
        params.id = this.ruleForm.id;
        params.idNumber = this.idNumber;

        params.storeLicence = "1";
        delete params.storeaccount;
        delete params.storepsw;

        if (params.registertime) {
          delete params.registertime;
        }
        console.log(JSON.stringify(params));
        //判断url
        let url = t.$route.query.storename
          ? "/realbrand-management-service/StoreMgt/UpdateStoreInfo"
          : "/realbrand-management-service/StoreMgt/InsertStoreInfo";

        httpreques("post", params, url).then((res) => {
          if (res.data.code == "SUCCESS") {
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
      });
    },
    //选择省市区
    handleChange(value) {
      let t = this;
      t.ruleForm.province = CodeToText[value[0]];
      t.ruleForm.city = CodeToText[value[1]];
      t.ruleForm.county = CodeToText[value[2]];
    },
    cancelbtn() {
      let t = this;
      t.$router.push({ path: "/setting/storelist" });
    },
  },
  components: {
    Btn,
    NewBreadCrumb,
  },
};
</script>
<style lang="scss" scoped>
.newstore {
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: #f6faff;
  padding-top: 30px;
  // height: 100%;
  box-sizing: border-box; 
}
 
.newstore-content{
  background-color: #fff;
  flex: 1;
}
.newstore-from {
  width: 500px;
  padding: 24px 0 0 15px;
  margin-bottom: 20px;
}
.select-province {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.imgs-title {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.cardfront {
  font-size: 14px;
  color: rgb(51, 51, 51);
  line-height: 20px;
  font-family: SourceHanSansSC;
}
/deep/.el-form-item--small.el-form-item {
  margin-bottom: 24px;
}
/deep/.el-upload--picture-card {
  width: 280px;
  height: 160px;
}

/deep/.el-input__inner {
  box-sizing: border-box;
  height: 38px;
  font-size: 14px;
}
/deep/.el-form-item--medium .el-form-item__label {
  line-height: 36px;
  font-size: 14px;
}
/deep/.el-cascader--small {
  width: 100%;
}

/deep/.el-button--medium {
  width: 92px;
  height: 38px;
  // margin-top: 6px;
}
/deep/.el-form-item--small.el-form-item {
    margin-bottom: 24px;
}
</style>