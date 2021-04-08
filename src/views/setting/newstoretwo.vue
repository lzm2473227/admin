<template>
  <div class="header">
    <ul>
      <li @click="$router.push('/setting/storelist')"><img src="../../assets/iconsvg/Print_list.png" alt="" />返回列表</li>
      <li>
        <img src="../../assets/iconsvg/Save_content.png" alt="" />保存内容
      </li>
      <li><img src="../../assets/iconsvg/Print_list.png" alt="" />打印预览</li>
      <li><img src="../../assets/iconsvg/Print_list.png" alt="" />导出表格</li>
    </ul>
  </div>
  <div class="main">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      class="demo-ruleForm"
      label-position="left"
    >
      <table width="596" height="842" border="1" cellspacing="0">
        <tr height="50">
          <td width="88" class="bg">门店机构代码</td>
          <td width="508">
            <el-form-item
              prop="orgCode"
              class="from-item-padding"
            >
              <el-input
                v-model="ruleForm.orgCode"
                placeholder="请输入门店机构代码"
              ></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr height="50">
          <td width="88" class="bg">门店名称</td>
          <td width="508">
            <el-form-item
              prop="storeName"
              class="from-item-padding"
            >
              <el-input
                v-model="ruleForm.storeName"
                placeholder="请输入门店名称"
              ></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr height="88">
          <td width="88" class="bg">门店地址</td>
          <td width="508">
            <el-form-item
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
          </td>
        </tr>
        <tr height="50">
          <td width="88" class="bg">门店类别</td>
          <td width="508">
            <el-form-item
              prop="storetype"
              class="from-item-padding"
            >
              <el-input
                v-model="ruleForm.storetype"
                placeholder="请输入门店类别"
              ></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr height="602">
          <td width="88" class="bg">门店许可证</td>
          <td width="508">
            <el-form-item
              prop="businessLicense"
              class="from-item-padding"
            >
              <el-input v-model="ruleForm.businessLicense"></el-input>
            </el-form-item>
          </td>
        </tr>
      </table>
    </el-form>
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
      idNumber: "",
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
    if (localStorage.getItem("loginuser"))
      this.idNumber = JSON.parse(
        localStorage.getItem("loginuser")
      ).userDetails.idNumber;
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
.header {
  height: 42px;
  line-height: 44px;
  background: #ecf3fb;
  border: 1px solid #b8d0f2;
  font-size: 14px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: #222222;
  ul {
    display: flex;
    height: 44px;
    line-height: 44px;
    align-items: center;
    margin: 0;
    padding: 0;
    li {
      width: 112px;
      height: 16px;
      line-height: 16px;
      list-style: none;
      text-align: center;
      border-right: 1px solid #99bbe8;
      display: flex;
      justify-content: center;
      cursor: pointer;
      // align-items: center;
      img {
        margin-right: 4px;
      }
      &:last-child {
        border-right: none;
      }
    }
  }
}
.main {
  border: 1px solid #cccccc;
  padding: 28px;
  box-sizing: border-box;
  margin-top: 16px;
}
table {
  border: 1px solid #b8d0f2;
  border-collapse: collapse;
  font-size: 12px;
  font-family: Source Han Sans CN;
  font-weight: 400;
}
td {
  padding-left: 20px;
  // padding-top: 10px;
}
.bg {
  background: #ecf3fb;
}
.clerk-imgs {
  display: flex;
}
.imgs-title {
  display: flex;
  flex-direction: column;
}
/deep/.el-form-item--small.el-form-item {
  margin-bottom: 0px;
}
/deep/.el-input__inner {
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: none;
  color: #333;
  font-size: 14px;
  font-family: Source Han Sans CN;
  border: 1px solid #ddd !important;
}
// /deep/.el-input__inner:hover {
// //   border: 1px solid #66b1ff ;
// }
</style>