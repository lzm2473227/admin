<template>
  <div class="tab">
    <div class="tab-title">
      <div class="left">
        <div class="print" @click="$router.push('/systemUser/warehouse')">
          <img class="icon" src="../../assets/images/back.png" alt="" /><span class="axis">返回列表</span>
        </div>
        <div class="print" @click="addstore()">
          <img class="icon" src="../../assets/images/save.png" alt="" /><span class="axis">保存内容</span>
        </div>
        <div class="print">
          <img class="icon" src="../../assets/images/print.png" /><span class="axis">打印列表</span>
        </div>
        <div class="print" @click="exportExcel">
          <img class="icon" src="../../assets/images/derive.png" /><span class="axis">导出表格</span>
        </div>
      </div>
      <div class="right"></div>
    </div>
    <div class="table-main">
      <!-- <div class="table-title">
          <p>新增人员</p>
        </div> -->
      <form action="#">
        <table border="1" class="">
          <tr>
            <td class="table-left">门店机构代码</td>
            <td class="table-right mini">
              <input
                type="text"
                placeholder="请输入门店机构代码"
                v-model="ruleForm.name"
              />
            </td>
            <td class="table-left">门店类型</td>
            <td class="table-right mini">
              <select type="checkout" v-model="item">
                <option :value="item.value" v-for="item in ruleForm.h" :key="item.id">{{item.value}}</option>
                <!-- <option value="小海王">小海王</option>
                <option value="大海王">大海王</option> -->
              </select>
            </td>
          </tr>

          <tr>
            <td class="table-left">法人代表姓名</td>
            <td class="table-right mini">
              <input
                type="text"
                placeholder="请输入法人代表姓名"
                v-model="ruleForm.b"
              />
            </td>
            <td class="table-left">电话号码</td>
            <td class="table-right mini">
              <input
                type="text"
                placeholder="请输入电话号码"
                v-model="ruleForm.d"
              />
            </td>
          </tr>

          <tr>
            <td class="table-left">法人身份证号</td>
            <td class="table-right mini">
              <input
                type="text"
                placeholder="请输入法人身份证号"
                v-model="ruleForm.telNum"
              />
            </td>
            <td class="table-left">门店名称</td>
            <td class="table-right mini">
              <select type="checkout">
                <option value="海王">海王</option>
                <option value="大参林">大参林</option>
              </select>
            </td>
          </tr>

        <tr>
            <td class="table-left">门店地址</td>
            <td class="table-right" colspan="3" style="padding: 6px;">
              <el-cascader
                :options="options"
                v-model="selectedOptions"
                @change="handleChange"
                style="width: 100%"
                placeholder="请选择门店地址"
              >
              </el-cascader>
              <br />
              <input
                type="text"
                placeholder="请输入门店详情地址"
                style="margin-top: 6px; width: 100%"
                v-model="ruleForm.address"
              />
            </td>
          </tr>

           <!-- <tr>
            <td class="table-left">重置密码</td>
            <td class="table-right" colspan="3"> 
              <input
                style="width:100%;height:40px"
                type="text"
                placeholder="请输入新的密码"
                v-model="ruleForm.g"
              />
            </td>
           
          </tr> -->

          <!-- <tr style="vertical-align: top;">
            <td class="table-left" style="padding: 12px;">证件照</td>
            <td class="table-right" colspan="3" style="padding-top: 12px;">
              <div style="display: flex; height:368px">
              <el-upload  
                action="http://14.29.162.130:6602/image/imageUpload"
                list-type="picture-card"
                :on-success="handleAvatarSuccess"
                :file-list="imgArr" 
                :on-preview="handlePictureCardPreview"
                :limit="1"
              >
                <template #default >
                  <div class="imgs-title">
                    <i class="el-icon-upload"></i>
                    <div>请上传身份证正面</div> 
                  </div>
                </template>
              </el-upload>
              <el-upload  
                action="http://14.29.162.130:6602/image/imageUpload"
                list-type="picture-card"
                :on-success="handleAvatarSuccess"
                :on-preview="handlePictureCardPreview"
              
              >
                <template #default>
                  <div class="imgs-title" >
                    <i class="el-icon-upload"></i>
                    <div>请上传身份证反面</div> 
                  </div>
                </template>
              </el-upload>
              </div>
            </td>
          </tr> -->
          <!-- <el-dialog v-model="dialogVisible">
            <img style="width:100%" :src='ruleForm.frontId' alt="">
          </el-dialog> -->
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
    return {
      dialogImageUrl: "", //图片服务器的图片的地址
      dialogVisible:false,
      options: regionData,   //地址相关
      selectedOptions: [],    //地址相关
      ruleForm: {
        name: "",
        idNumber: "",
        telNum: "",
        password: "",
        reverseId: "", //身份证后照
        frontId: "", //身份证前照
        station: "1111",
        storeName: "",
        sex: "1",
        a:"",
        b:"",
        c:"汉族",
        d:"",
        k:"群众",
        h:[
            {value:"小海王",id:"1"},
            {value:"大海王",id:"2"}
              ],
        g:"",
        address: "",   //省地址
        province: "",  //地址
      },
      station: [],
      //民族
      storeNameItemList: [],
      imgArr: []
    };
  },
  mounted() {
    // this.getdata();
    // this.StoreNameList();
  },
  methods: {
    //选择省市区
    handleChange(value) {
      let t = this;
      t.ruleForm.province = CodeToText[value[0]];
      t.ruleForm.city = CodeToText[value[1]];
      t.ruleForm.county = CodeToText[value[2]];
    },
    // 图片预览
    // handlePictureCardPreview(res, file){
    //   // console.log(file);
    //   console.log(res);
    //   this.dialogVisible = true;
    //   this.ruleForm.frontId = res.response.data;
    // },
    // handleAvatarSuccess(res, file) {
    //   if (res.code === "Success") {
    //     console.log(res);
    //     this.dialogImageUrl = res.data;
    //     this.ruleForm.frontId = res.data;
    //   }
    // },
    
    addstore() {
      let params = {
        idNumber: this.ruleForm.idNumber, // 身份证号
        name: this.ruleForm.name,
        frontId: this.ruleForm.frontId, // 身份证正面照
        reverseId: "", // 身份证反面照
        station: this.station, // 岗位名称
        storeName: this.ruleForm.storeName, // 店铺名称
        telNum: this.ruleForm.telNum,
      };
      if (this.$route.query.idNumber) {
        httpreques(
          "post",
          params,
          "/realbrand-management-service/StoreUserMgt/UpdateUserInfo"
        ).then((res) => {
          if ((res.data.code = "SUCCESS")) {
            this.$message.success("编辑员工成功");
            this.$router.replace("/setting/clerklist");
          } else {
            this.$message.error("编辑员工失败");
          }
        });
      } else {
        httpreques(
          "post",
          params,
          "/realbrand-management-service/StoreUserMgt/InserUseraccount"
        ).then((res) => {
          // console.log(res)
          if ((res.data.code = "SUCCESS")) {
            this.$message.success("新增员工成功");
            this.$router.replace("/setting/clerklist");
          } else {
            this.$message.error("新增员工失败");
          }
        });
      }
    },
    station1(val) {
      // this.station = val
    },
    cancelbtn() {
      let t = this;
      this.$router.replace("/setting/clerklist");
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../assets/css/reset.scss";
/deep/.el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 196px;
}
/deep/.el-checkbox{
 width: 100px;
}
/deep/.el-radio{
  width: 50px;
}
.imgs-title{
  position: relative;
}
.el-icon-upload{
  position: absolute;
  top: 30px;
  left: 60px;
}
/deep/.el-cascader .el-input .el-input__inner{
  width: 100%;
  
}
/deep/.el-date-editor.el-input{
  width: 130px;
  
}
/deep/.table-main table .table-right.mini input{
  width: 130px;
  
}
/deep/.table-main table{
  box-sizing: border-box;
  border-bottom: 1px solid #D0DDE5;
}
.table-main table .table-right{
  width: 130px;
}
.table-main table .table-right select{
  width: 130px;
  height: 20px;
  line-height: 28px;
}
/deep/.table-main table .table-right input{
  width: 265px;
  height: 20px;
}
/deep/.el-upload--picture-card{
  height: 130px;
  width: 136px;
}
/deep/.el-upload--picture-card{
  line-height: 160px;
}
.el-icon-upload{
    top: 40px;
    left: 55px;
}
</style>