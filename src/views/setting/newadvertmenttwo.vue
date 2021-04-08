<template>
  <div class="header">
    <ul>
      <li @click="$router.push('/setting/advertmentlist')"><img src="../../assets/iconsvg/Print_list.png" alt="" />返回列表</li>
      <li @click="addadv()">
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
          <td width="88" class="bg">广告编码</td>
          <td width="508">
            <el-input v-model="a"></el-input>
          </td>
        </tr>
        <tr height="120">
          <td width="88" class="bg">广告名称</td>
          <td width="508">
            <el-input v-model="b"></el-input>
          </td>
        </tr>
        <tr height="50">
          <td width="88" class="bg">广告类型</td>
          <td width="508">
            <el-input v-model="c"></el-input>
          </td>
        </tr>
        <tr height="120">
          <td width="88" class="bg">广告描述</td>
          <td width="508">
            <el-input v-model="d"></el-input>
          </td>
        </tr>
        <tr height="50">
          <td width="88" class="bg">广告位置</td>
          <td width="508">
            <el-form-item prop="positionName" class="from-item-padding">
              <el-select
                v-model="ruleForm.positionName"
                placeholder="请选择广告位置"
                @change="selectpositionName"
              >
                <el-option
                  v-for="(item, key) in positions"
                  :key="key"
                  :label="item.positionName"
                  :value="item.positionName"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </td>
        </tr>
        <tr height="50">
          <td width="88" class="bg">起始时间</td>
          <td width="508">
            <el-form-item prop="startTime" class="from-item-padding">
              <el-date-picker
                v-model="ruleForm.startTime"
                type="datetime"
                format="YYYY-MM-DD HH:mm:ss"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
          </td>
        </tr>
        <tr height="50">
          <td width="88" class="bg">截止时间</td>
          <td width="508">
            <el-form-item prop="endTime" class="from-item-padding">
              <el-date-picker
                v-model="ruleForm.endTime"
                type="datetime"
                format="YYYY-MM-DD HH:mm:ss"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
          </td>
        </tr>
        <tr height="50">
          <td width="88" class="bg">广告状态</td>
          <td width="508">
            <el-radio v-model="ruleForm.enableState" label="1">启用</el-radio>
            <el-radio
              v-model="ruleForm.enableState"
              class="radio-right"
              label="0"
              >禁用</el-radio
            >
          </td>
        </tr>
        <tr height="294">
          <td width="88" class="bg"></td>
          <td width="508">
            <el-upload
              action="http://14.29.162.130:6602/image/imageUpload"
              list-type="picture-card"
              :on-success="handleAvatarSuccess"
              :limit = 1  
            >
              <template #default >
                <div  class="imgs-title">
                  <i class="el-icon-plus"></i>
                </div>
              </template>         
            </el-upload>
          </td>
        </tr>
      </table>
    </el-form>
    <!-- <Btn
      :btntext="$route.query.advertmentid ? '编辑' : '新增'"
      @addbtn="addadv"
      @cancelbtn="cancelbtn"
    /> -->
  </div>
</template>
<script>
import NewBreadCrumb from "../../layouts/IndexLayout/components/NewBreadCrumb";
import httpreques from "../../utils/httpreques";
import moment from "moment";
import Btn from "../../components/Btn";
export default {
  name: "NewAdvertment",
  components: { NewBreadCrumb, Btn },
  data() {
    return {
      a:"",
      b:"",
      c:"",
      d:"",
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      ruleForm: {
        enableState: "",
        endTime: "",
        linkPosition: "",
        positionName: "",
        startTime: "",
      },
      linkPosition: "", //默认选中显示
      positions: [],
      idNumber: "",
      rules: {
        positionName: [
          { required: true, message: "请选中广告位置", trigger: "blur" },
        ],
        // linkPosition: [
        //   { required: true, message: "请输入广告图片", trigger: "blur" },
        // ],
        startTime: [
          { required: true, message: "请输入开始时间", trigger: "blur" },
        ],
        endTime: [
          { required: true, message: "请输入结束时间", trigger: "blur" },
        ],
      },
    };
  },
  mounted() {
    if (localStorage.getItem("loginuser"))
      this.idNumber = JSON.parse(
        localStorage.getItem("loginuser")
      ).userDetails.idNumber;
    this.getdata();
  },
  methods: {
    // handleRemove(file) {
    //     console.log(file);
    //   },
    //   handlePictureCardPreview(file) {
    //     this.dialogImageUrl = file.url;
    //     this.dialogVisible = true;
    //     console.log(file);
    //   },
    //   handleDownload(file) {
    //     console.log(file);
    //   },
    handleAvatarSuccess(res, file) {
      console.log(file);
      console.log(res);
      // return
      if (res.code === "Success") {
        this.dialogImageUrl = res.data;
        this.ruleForm.linkPosition = res.data;
      }
    },
    getdata() {
      let t = this;
      t.getpositionlist();
      // t.handleChange();
      let advertmentid = t.$route.query.advertmentid;
      if (advertmentid) {
        let params = {
          id: advertmentid,
        };
        httpreques(
          "post",
          params,
          "/realbrand-management-service/AdvertisementMgt/AdvertisementInfo"
        ).then((res) => {
          if (res.data.code == "SUCCESS") {
            //对象数据处理
            let advobj = res.data.data;
            advobj.startTime = moment(advobj.startTime).format(
              "YYYY-MM-DD HH:mm:ss"
            );
            advobj.endTime = moment(advobj.endTime).format(
              "YYYY-MM-DD HH:mm:ss"
            );
            advobj.enableState = advobj.enableState.toString();
            if (advobj.linkPosition) this.dialogImageUrl = advobj.linkPosition;
            t.ruleForm = advobj;
          } else {
            //接口错误处理
            t.$message.error(res.data.msg);
          }
        });
      }
    },
    getpositionlist() {
      let t = this;
      httpreques(
        "post",
        {},
        "/realbrand-management-service/AdvertisementMgt/PositionNameList"
      ).then((res) => {
        if (res.data.code == "SUCCESS") {
          //对象数据处理
          t.positions = res.data.data.positionNameItemList;
        } else {
          //接口错误处理
          t.$message.error(res.data.msg);
        }
      });
    },
    addadv() {
      let t = this;
      t.$refs["ruleForm"].validate((valid) => {
        if (!valid) {
          return;
        }
         console.log(t.ruleForm.enableState);
        this.ruleForm.enableState = parseInt(this.ruleForm.enableState);
        let params = t.ruleForm;
        params.id = t.$route.query.advertmentid;

        let url = t.$route.query.advertmentid
          ? "/realbrand-management-service/AdvertisementMgt/UpdateAdvertisement"
          : "/realbrand-management-service/AdvertisementMgt/InsertAdvertisement";
        console.log(params);
        if (!params.id) {
          params.id = 0;
          params.applyTime = moment(params.startTime);
        }
        //接口参数格式处理
        params.startTime = moment(params.startTime);
        params.endTime = moment(params.endTime);
       
        
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
    selectpositionName(val) {
      let t = this;
      t.positionName = val;
    },
    cancelbtn() {
      let t = this;
      t.$router.push({ path: "/setting/advertmentlist" });
    },
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
/deep/.el-input {
  width: 220px;
}
</style>