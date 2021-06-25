<template>
  <div class="tab">
    <div class="tab-title">
      <div class="left">
        <div class="print" @click="toBackList"><img class="icon" src="@/assets/images/back.png" alt=""/><span class="axis">返回列表</span></div>
        <div class="print" @click="addstore()"><img class="icon" src="@/assets/images/save.png" alt=""/><span class="axis">保存内容</span></div>
        <div class="print"><img class="icon" src="@/assets/images/print.png" alt="" /><span class="axis">打印列表</span></div>
        <div class="print" @click="exportExcel"><img class="icon" src="@/assets/images/derive.png" alt="" /><span class="axis">导出表格</span></div>
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
          <p>新增开户申请资料</p>
        </div>
        <table border="1" class="">
          <tr>
            <td class="table-left">业务编号</td>
            <td class="table-right" colspan="3">
              <input type="text" placeholder="开户业务编号由系统随机生成" style="width: 100%" v-model="form.address" disabled/>
            </td>
          </tr>
          <tr>
            <td class="table-left">开户银行</td>
            <td class="table-right">
              <select placeholder="请选择开户银行" v-model="form.storeType">
                <option value="" disabled style="display:none; color: #ddd">请选择开户银行</option>
                <option value="广州银行">广州银行</option>
                <option value="天府银行">天府银行</option>
                <option value="徽商银行">徽商银行</option>
                <option value="贵州银行">贵州银行</option>
              </select>
            </td>
            <td class="table-left">开卡类型</td>
            <td class="table-right">
              <select placeholder="请选择开卡类型" v-model="form.storeType">
                <option value="" disabled style="display:none; color: #ddd">请选择开卡类型</option>
                <option value="储蓄卡">储蓄卡</option>
                <option value="信用卡">信用卡</option>
              </select>
            </td>
          </tr>
          <tr>
            <td class="table-left">身份证号</td>
            <td class="table-right">
              <input type="text" placeholder="请输入身份证号码" v-model="form.name" />
            </td>
            <td class="table-left">开户人姓名</td>
            <td class="table-right">
              <input type="text" placeholder="请输入开户人姓名" v-model="form.tel" />
            </td>
          </tr>
          <tr>
            <td class="table-left">开户人性别</td>
            <td class="table-right">
              <el-radio v-model="radio" label="1" style="margin-left: 8px;">男</el-radio>
              <el-radio v-model="radio" label="2" style="margin-left: 20px;">女</el-radio>
            </td>
            <td class="table-left">手机号码</td>
            <td class="table-right">
              <input type="text" placeholder="请输入手机号码" v-model="form.storeName"/>
            </td>
          </tr>
          <tr>
            <td class="table-left">开户类型</td>
            <td class="table-right" colspan="3">
              <el-radio v-model="radio1" label="1" style="margin: 5px 0 0 8px; display: flex; align-items: center;">一类账户<span style="margin-left: 8px; color: #aaa;">（主要用于投资理财、贷款、缴费、支付）</span></el-radio>
              <el-radio v-model="radio1" label="2" style="margin: 10px 0 4px 8px; display: flex; align-items: center;">二类账户<span style="margin-left: 8px; color: #aaa;">（主要用于小额支付）</span></el-radio>
            </td>
          </tr>
          <tr>
            <td class="table-left">所在地区</td>
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
          <tr>
            <td colspan="4" style="height: 20px;"></td>
          </tr>
          <tr>
            <td class="table-left">开户邀请人</td>
            <td class="table-right">
              <input type="text" placeholder="开户邀请人" v-model="form.name" />
            </td>
            <td class="table-left">所属门店</td>
            <td class="table-right">
              <input type="text" placeholder="所属门店" v-model="form.tel" />
            </td>
          </tr>
          <tr>
            <td class="table-left">手机号码</td>
            <td class="table-right">
              <input type="text" placeholder="手机号码" v-model="form.name" />
            </td>
            <td class="table-left">所属经销商</td>
            <td class="table-right">
              <input type="text" placeholder="所属经销商" v-model="form.tel" />
            </td>
          </tr>
          <tr>
            <td colspan="4">
              <button class="guangzhou">点击进入广州银行系统开户界面</button>
            </td>
          </tr>
          <tr>
            <td colspan="4" style="height: 365px;"></td>
          </tr>
        </table>
      </form>
    </div>
  </div>
</template>
<script>
import httpreques from "@/utils/httpreques";
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
    return {
      options: regionData,
      selectedOptions: [],
      form: {
        orgCode: "",
        businessLicense: "",
        storeName: "",
        address: "",
        storetype: "",
        county: "",
        city: "",
        province: "",
        name: "",
        tel: "",
        code: "",
        jianjie: "",
        storeLicence: "", //默认选中显示
      },
      dialogImageUrl: "",
      dialogVisible: false,
      imgArr: [],
      radio: '1',
      radio1: '1',
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
          if (res.data.code == "SUCCESS") {
            //对象数据处理
            let storeobj = res.data.data;
            storeobj.storetype = storeobj.storeType;
            delete storeobj.storeType;
            t.selectedOptions =
              TextToCode[storeobj.province][storeobj.city][
                storeobj.county
              ].code;
            t.form = storeobj;
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
      params.id = this.form.id;
      // params.storeLicence = 111111111111;
      params.storeLicence = this.form.storeLicence;
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
        if (res.data.code == "SUCCESS") {
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
      if (res.code === "SUCCESS") {
        this.dialogImageUrl = res.data;
        this.form.storeLicence = res.data;
      }
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
.guangzhou{
    width: 100%;
    text-align: center;
    margin-top: 40px;
    padding: 10px 0;
    background: #F3F7FF;
    border: 1px solid #3377FF;
    font-size: 16px;
    color: #3377FF;
    cursor: pointer;
    outline: none;
}
@import "@/assets/css/reset.scss";
</style>