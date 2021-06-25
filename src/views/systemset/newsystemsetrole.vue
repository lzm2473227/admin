<template>
  <div class="tab">
    <div class="tab-title">
      <div class="left">
        <div class="print" @click="$router.go(-1)">
          <img
            class="icon"
            src="../../assets/images/back.png"
            alt=""
          /><span class="axis">返回列表</span>
        </div>
        <div class="print" @click="addstore()">
          <img
            class="icon"
            src="../../assets/images/save.png"
            alt=""
          /><span class="axis">保存内容</span>
        </div>
        <div class="print">
          <img
            class="icon"
            src="../../assets/images/print.png"
            alt=""
          /><span class="axis">打印列表</span>
        </div>
        <div class="print" @click="exportExcel">
          <img
            class="icon"
            src="../../assets/images/derive.png"
            alt=""
          /><span class="axis">导出表格</span>
        </div>
      </div>
      <div class="right">
        <!-- <div class="setup">
          <img class="set" src="../../assets/images/ic-设置.png" alt="系统设置" @click="setup">
        </div> -->
      </div>
    </div>
    <div class="table-main">
      <div class="table-title">
        <p>新增人员</p>
      </div>
      <form action="#">
        <table border="1" class="">
          <tr>
            <td class="table-left">姓名</td>
            <td class="table-right mini">
              <input
                type="text"
                placeholder="请输入姓名"
                v-model="ruleForm.name"
              />
            </td>
            <td class="table-left">性别</td>
            <td class="table-right mini">
              <el-radio-group v-model="ruleForm.sex">
                <el-radio label="1">男</el-radio>
                <el-radio label="2">女</el-radio>
              </el-radio-group>
            </td>
          </tr>

          <tr>
            <td class="table-left">籍贯</td>
            <td class="table-right mini">
              <input
                type="text"
                placeholder="请输入籍贯"
                v-model="ruleForm.d"
              />
            </td>
            <td class="table-left">民族</td>
            <td class="table-right mini">
              <select type="checkout">
                <option :value="item.name" v-for="item in nation" :key="item.id">{{item.name}}</option>
              </select>
            </td>
          </tr>

          <tr>
            <td class="table-left">政治面貌</td>
            <td class="table-right">
              <select type="checkout" v-model="ruleForm.k">
                <option value="群众">群众</option>
                <option value="党团">党团</option>
              </select>
            </td>
            <td class="table-left">出生年月</td>
            <td class="table-right mini">
              <el-date-picker
                v-model="value1"
                type="date"
                prefix-icon="false"
              >
              </el-date-picker>
            </td>
          </tr>
          <tr>
            <td class="table-left">联系号码</td>
            <td class="table-right mini">
              <input
                type="text"
                placeholder="请输入联系号码"
                v-model="ruleForm.telNum"
              />
            </td>
            <td class="table-left">身份证号</td>
            <td class="table-right">
              <input
                type="text"
                placeholder="请输入身份证号"
                v-model="ruleForm.idNumber"
              />
            </td>
          </tr>

          <tr>
            <td class="table-left">最高学历</td>
            <td class="table-right mini">
              <select type="checkout" v-model="ruleForm.h">
                <option value="本科">本科</option>
                <option value="大专">大专</option>
              </select>
            </td>
            <td class="table-left">所学专业</td>
            <td class="table-right" colspan="3">
              <input
                type="text"
                placeholder="请输入专业"
                v-model="ruleForm.zhuanye"
              />
            </td>
          </tr>

          <tr>
            <td class="table-left">毕业院校</td>
            <td class="table-right" colspan="3">
              <input
                type="text"
                placeholder="请输入毕业院校"
                v-model="ruleForm.school" style="width:100%"
              />
            </td>
          </tr>
          <tr>
            <td class="table-left">居住地址</td>
            <td class="table-right" colspan="3" style="padding: 6px;">
              <el-cascader
                :options="options"
                v-model="selectedOptions"
                @change="handleChange"
                style="width: 100%"
                placeholder="请选择居住地址"
              >
              </el-cascader>
              <br />
              <input
                type="text"
                placeholder="请输入居住详情地址"
                style="margin-top: 6px; width: 100%"
                v-model="ruleForm.address"
              />
            </td>
          </tr>
          <!-- <tr> 
            <td class="table-left">所属门店</td>
            <td class="table-right" colspan="3">
              <select
                v-model="ruleForm.storeName"
                placeholder="请选择所属门店" style="width:100%"
                @change="changeStore(ruleForm.storeName)"
              >
                <option 
                  v-for="item in storeNameItemList"
                  :key="item.value"
                  :label="item.storeName"
                  :value="item.storeName"
                ></option>
              </select>
            </td>
          </tr> -->
          <tr>
            <td class="table-left">所属岗位</td>
            <td class="table-right" colspan="3" style="padding: 6px;">
              <el-checkbox-group v-model="station" style="margin-top: -8px">
                <el-checkbox
                  style="margin-right: 10px"
                  v-for="(item, index) in clerkrolessss"
                  :key="index"
                  :label="item.name"
                  @change="changeStation"
                  >{{ item.name }}</el-checkbox
                >
              </el-checkbox-group>
            </td>
          </tr>

          <tr style="vertical-align: top;">
            <td class="table-left" style="padding: 12px;">证件照</td>
            <td class="table-right" colspan="3" style="padding-top: 6px;">
              <div style="display: flex; height:525px">
                <el-upload
                  class="avatar-uploader photos-card"
                  action="http://14.29.162.130:6602/image/imageUpload"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess1"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="imageUrl1" :src="imageUrl1" class="avatar">
                  <i v-else class="avatar-uploader-icon">
                    <img src="../../assets/images/upload.png" alt="">
                    <span>请上传身份证正面</span>
                  </i>
                </el-upload>
                <el-upload
                  class="avatar-uploader photos-card"
                  action="http://14.29.162.130:6602/image/imageUpload"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess2"
                  :before-upload="beforeAvatarUpload"
                  style="margin-left: 10px;">
                  <img v-if="imageUrl2" :src="imageUrl2" class="avatar">
                  <i v-else class="avatar-uploader-icon">
                    <img src="../../assets/images/upload.png" alt="">
                    <span>请上传身份证反面</span>
                  </i>
                </el-upload>
              <!-- <el-upload  
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
              </el-upload> -->
              <!-- <el-upload  
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
              </el-upload> -->
              </div>
            </td>
          </tr>
          <el-upload
            class="avatar-uploader personal-portrait"
            action="http://14.29.162.130:6602/image/imageUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess3"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl3" :src="imageUrl3" class="avatar">
            <i v-else class="avatar-uploader-icon">
              <img src="../../assets/images/upload.png" alt="">
              <span>请上传个人照</span>
            </i>
          </el-upload>
          <!-- <el-dialog v-model="dialogVisible">
            <img style="width:100%" :src='ruleForm.frontId' alt="">
          </el-dialog> -->
          <!-- <el-upload class="personal" style="position: absolute;top:0px;left:473px"
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
                <div class="upload-tip">请上传个人证件照</div> 
              </div>
            </template>
          </el-upload> -->
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
        c:"",
        d:"",
        k:"",
        h:"",
        g:"",
        zhuanye: '',
        school: '',
        address: "",   //省地址
        province: "",  //地址
      },
      clerkrolessss:[
        {name:"超级管理员",id:"1"},
        {name:"管理员",id:"2"},
        {name:"核算专员",id:"3"},
        {name:"出纳专员",id:"4"}
      ],
      station: [],
      clerkroles: [],
      //民族
      nation:[
        {id:1 ,name:'汉族'},
        {id:2 ,name:'蒙古族'},
        {id:3 ,name:'回族'},
        {id:4 ,name:'藏族'},
        {id:5 ,name:'维吾尔族'},
        {id:6 ,name:'苗族'},
        {id:7 ,name:'彝族'},
        {id:8 ,name:'壮族'},
        {id:9 ,name:'布依族'},
        {id:10,name:'朝鲜族'},
        {id:11,name:'满族'},
        {id:12,name:'侗族'},
        {id:13,name:'瑶族'},
        {id:14,name:'白族'},
        {id:15,name:'土家族'},
        {id:16,name:'哈尼族'},
        {id:17,name:'哈萨克族'},
        {id:18,name:'傣族'},
        {id:19,name:'黎族'},
        {id:20,name:'傈僳族'},
        {id:21,name:'佤族'},
        {id:22,name:'畲族'},
        {id:23,name:'高山族'},
        {id:24,name:'拉祜族'},
        {id:25,name:'水族'},
        {id:26,name:'东乡族'},
        {id:27,name:'纳西族'},
        {id:28,name:'景颇族'},
        {id:29,name:'柯尔克孜族'},
        {id:30,name:'土族'},
        {id:31,name:'达翰尔族'},
        {id:32,name:'么佬族'},
        {id:33,name:'羌族'},
        {id:34,name:'布朗族'},
        {id:35,name:'撒拉族'},
        {id:36,name:'毛南族'},
        {id:37,name:'仡佬族'},
        {id:38,name:'锡伯族'},
        {id:39,name:'阿昌族'},
        {id:40,name:'普米族'},
        {id:41,name:'塔吉克族'},
        {id:42,name:'怒族'},
        {id:43,name:'乌孜别克族'},
        {id:44,name:'俄罗斯族'},
        {id:45,name:'鄂温克族'},
        {id:46,name:'德昂族'},
        {id:47,name:'保安族'},
        {id:48,name:'裕固族'},
        {id:49,name:'京族'},
        {id:50,name:'塔塔尔族'},
        {id:51,name:'独龙族'},
        {id:52,name:'鄂伦春族'},
        {id:53,name:'赫哲族'},
        {id:54,name:'门巴族'},
        {id:55,name:'珞巴族'},
        {id:56,name:'基诺族'},
      ],
      storeNameItemList: [],
      imgArr: [],
      roleUuid: '',
      groupUuid: '',
      uuidArr: [],
      msg: '',
      imageUrl1: '', // 正面
      imageUrl2: '', // 反面
      imageUrl3: '', // 个人照
      value1: ''
    };
  },
  mounted() {
    // this.getdata();
    // this.StoreNameList();
    // this.getRoleUuid()
  },
  methods: {
    changeStore(data){
      let index = this.storeNameItemList.map(item => item.storeName).indexOf(data)
      this.groupUuid = this.storeNameItemList[index].groupUuid
    },
    //选择省市区
    handleChange(value) {
      let t = this;
      t.ruleForm.province = CodeToText[value[0]];
      t.ruleForm.city = CodeToText[value[1]];
      t.ruleForm.county = CodeToText[value[2]];
    },
    // 图片预览
    handlePictureCardPreview(res, file){
      // console.log(file);
      console.log(res);
      this.dialogVisible = true;
      this.ruleForm.frontId = res.response.data;
    },
    handleAvatarSuccess1(res, file) {
      if (res.code === "SUCCESS") {
        this.dialogImageUrl = res.data;
        this.imageUrl1 = res.data; // 身份证正面
      }
    },
    handleAvatarSuccess2(res, file) {
      if (res.code === "SUCCESS") {
        this.dialogImageUrl = res.data;
        this.imageUrl2 = res.data; // 身份证反面
      }
    },
    handleAvatarSuccess3(res, file) {
      if (res.code === "SUCCESS") {
        this.dialogImageUrl = res.data;
        this.imageUrl3 = res.data; // 个人照
      }
    },
    beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (file.type != 'image/jpeg' && file.type != 'image/png') {
          this.$message.error('上传头像图片只能是 JPG 格式!');
          return false
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
          return false
        }
      },
    // 获取岗位
    // changeStation() {
    //   this.identityItems = []
    //   let obj = {}
    //   for(let i in this.clerkroles){
    //     obj[this.clerkroles[i].name] = this.clerkroles[i]
    //   }
    //   for(let item of this.station){
    //     if(obj[item]){
    //       this.uuidArr.push(obj[item].uuid)
    //     }
    //   }
    // },
    
  },
};
</script>
<style lang="scss" scoped>
@import "../../assets/css/reset.scss";
@import "@/assets/css/image2.scss";
.table-main table{
  border-bottom: none;
}
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
/deep/ .personal .el-upload--picture-card{
  width: 120px;
  height: 121px;
  line-height: 120px;
  border: none;
  background: #F8F8F8;
  border-left: 1px solid #DADBDF;
  border-radius: 0;
}
.table-right .el-checkbox{
  margin-top: 8px;
}
.personal .el-icon-upload{
    top: 20px;
    left: 50px;
}

.personal-portrait{
  position: absolute;
  top: 0;
  right: 0;
  border-left: 1px solid #DADBDF;
  background: #F8F8F8;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
    color: #8c939d;
    width: 120px;
    height: 120px;
    // line-height: 120px;
    span{
      padding-top: 10px;
      font-style:normal;
      font-size: 12px;
      color: #999;
    }
  }
  .photos-card{
    width: 140px;
    height: 96px;
    background: #F8F8F8;
    border: 1px dashed #ddd;
    border-radius: 4px;
    .avatar-uploader-icon{
      width: 140px;
      height: 96px;
    }
    .avatar {
      width: 138px;
      height: 94px;
      display: block;
  }
  }
  .avatar {
    width: 120px;
    height: 120px;
    display: block;
  }
</style>