<template>
  <div class="newclerk">
    <NewBreadCrumb
      ptitle="员工管理"
      :ctitle="$route.query.idNumber ? '编辑员工' : '新增员工'"
      path="/setting/clerklist"
    ></NewBreadCrumb>
    <div class="newclerk-content">
      <div class="newclerk-from">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="120px"
        class="demo-ruleForm"
        label-position="left"
      >
        <el-form-item label="姓名" prop="name" class="from-item-padding">
          <el-input v-model="ruleForm.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="ruleForm.sex">
            <el-radio label="1">男</el-radio>
            <el-radio label="2">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="出生年月" prop="birth" class="from-item-padding">
          <el-date-picker v-model="value1" type="date" placeholder="请选择出生日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="身高" class="from-item-padding">
          <el-input v-model="ruleForm.a" placeholder="请输入身高"></el-input>
        </el-form-item>
        <el-form-item label="体重"  class="from-item-padding">
          <el-input v-model="ruleForm.b" placeholder="请输入体重"></el-input>
        </el-form-item>
        <el-form-item label="民族"  class="from-item-padding">
          <el-input v-model="ruleForm.c" placeholder="请输入民族"></el-input>
        </el-form-item>
        <el-form-item label="籍贯"  class="from-item-padding">
          <el-input v-model="ruleForm.d" placeholder="请输入籍贯"></el-input>
        </el-form-item>
        <el-form-item label="健康状态" class="from-item-padding">
          <el-input v-model="ruleForm.e" placeholder="请输入健康状态"></el-input>
        </el-form-item>
        <el-form-item label="婚姻状况"  class="from-item-padding">
          <el-input v-model="ruleForm.f" placeholder="请输入婚姻状况"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="idcard" class="from-item-padding">
          <el-input
            v-model="ruleForm.idNumber"
            placeholder="请输入身份证号"
          ></el-input>
          <p class="tip">身份证号为登录账号，初始密码为：<span>666668888</span></p>
        </el-form-item>
        <el-form-item label="户口所在地"  class="from-item-padding">
          <el-input v-model="ruleForm.g" placeholder="请输入户口所在地"></el-input>
        </el-form-item>
        <el-form-item label="学历"  class="from-item-padding">
          <el-input v-model="ruleForm.h" placeholder="请输入学历"></el-input>
        </el-form-item>
        <el-form-item label="专业"  class="from-item-padding">
          <el-input v-model="ruleForm.i" placeholder="请输入专业"></el-input>
        </el-form-item>
        <el-form-item label="毕业院校"  class="from-item-padding">
          <el-input v-model="ruleForm.j" placeholder="请输入毕业院校"></el-input>
        </el-form-item>
        <el-form-item label="政治面貌"  class="from-item-padding">
          <el-input v-model="ruleForm.k" placeholder="请输入政治面貌"></el-input>
        </el-form-item>
        <el-form-item label="职称等级"  class="from-item-padding">
          <el-input v-model="ruleForm.l" placeholder="请输入职称等级"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="clerkphone" class="from-item-padding">
          <el-input v-model="ruleForm.telNum" placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <el-form-item label="所属门店" prop="clerkstore" class="from-item-padding">
          <el-select v-model="ruleForm.storeName" placeholder="请选择所属门店">
            <el-option
              v-for="item in storeNameItemList"
              :key="item.value"
              :label="item.storeName"
              :value="item.storeName"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属岗位" prop="clerkrole" class="from-item-padding"
        >
          <el-checkbox-group v-model="radio">
            <el-checkbox v-for="item in clerkroles" :label="item.label" :key="item.value" @change="station1(item.label)">{{ item.label }}</el-checkbox>
          </el-checkbox-group>

        </el-form-item>
        <el-form-item label="证件照" prop="clerkimgs" class="from-item-padding">
          <div class="clerk-imgs">
            <el-upload action="#" list-type="picture-card" :auto-upload="false">
              <template #default>
                <div class="imgs-title">
                  <i class="el-icon-plus"></i>
                  <sapn class="cardfront">请上传身份证正面</sapn>
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
            <el-upload
              action="#"
              style="padding-left: 25px"
              list-type="picture-card"
              :auto-upload="false"
            >
              <template #default>
                <div class="imgs-title">
                  <i class="el-icon-plus"></i>
                  <sapn class="cardfront">请上传身份证反面</sapn>
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
      </el-form>
    </div>
    <Btn 
      :btntext="$route.query.idNumber ? '保存' : '新增'"
      @addbtn="addadv"
      @cancelbtn="cancelbtn"/>
    </div>
    
    
  </div>
</template>

<script>
import NewBreadCrumb from "../../layouts/IndexLayout/components/NewBreadCrumb";
import httpreques from "../../utils/httpreques";
import Btn from "../../components/Btn";

export default {
  name: "NewClerk",
  components: { NewBreadCrumb,Btn },
  data() {
    return {
      radio:[
          {
          label: "店长",
          value: "1",
        }
      ],
      ruleForm: {
        name: "",
        idNumber: "",
        telNum: "",
        password: "",
        reverseId: "",
        station: "1111",
        storeName: "",
        reverseId: "",
        sex: "1"
      },
      rules: {
        name: [{ required: true, message: "请输入性名", trigger: "blur" }],
        idcard: [{ required: true, message: "请输入身份证号", trigger: "blur" }],
        sex: [{ required: true, message: "请输入性别", trigger: "blur" }],
        birth: [{ required: true, message: "请输入出生年月", trigger: "blur" }],
        clerkpsw: [{ required: true, message: "请输入初始密码", trigger: "blur" }],
        clerkphone: [{ required: true, message: "请输入手机号码", trigger: "blur" }],
        clerkimgs: [{ required: true, message: "请上传证件照", trigger: "blur" }],
        clerkstore: [{ required: true, message: "请输入所属门店", trigger: "blur" }],
        clerkrole: [{ required: true, message: "请输入所属角色", trigger: "blur" }],
      },
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      clerkstore: [
        {
          label: "门店A",
          value: "0",
        },
        {
          label: "门店B",
          value: "1",
        },
      ],
      clerkroles: [
        {
          label: "店长",
          value: "1",
        },
        {
          label: "进货员",
          value: "2",
        },
        {
          label: "销售员",
          value: "3",
        },
        {
          label: "盘货员",
          value: "4",
        },
      ],
      tabledata: [],
      station: '',
      isIdNumber: '',
      storeNameItemList: []
    };
  },
  created(){
    if(localStorage.getItem("loginuser")) this.idNumber = JSON.parse(localStorage.getItem("loginuser")).userDetails.idNumber
    this.StoreNameList()
    this.isAdd()
  },
  methods: {
    isAdd(){
      if(this.$route.query.idNumber){
        this.isIdNumber = this.$route.query.idNumber
        let params = {
          "idCard": this.isIdNumber
        }
        httpreques(
          "post",
          params,
          "/realbrand-management-service/StoreUserMgt/StoreUser"
        ).then((res) => {
          console.log(res)
          if(res.data.code === "SUCCESS"){
            let detailInfo = res.data.data
            this.ruleForm = {
              idNumber: detailInfo.idNumber, // 身份证号
              name: detailInfo.name,
              password: '123456',
              frontId: '1', // 身份证正面照
              reverseId: '2', // 身份证反面照
              station: this.station, // 岗位名称
              storeName: detailInfo.storeName, // 店铺名称
              telNum: detailInfo.telNum
            }
          }else{
            this.$message.error('获取员工信息失败')
          }
        });
      }
    },
    //新增店员
    addadv() {
      let params = {
        idNumber: this.ruleForm.idNumber, // 身份证号
        name: this.ruleForm.name,
        password: '123456',
        frontId: '1', // 身份证正面照
        reverseId: '2', // 身份证反面照
        station: this.station, // 岗位名称
        storeName: this.ruleForm.storeName, // 店铺名称
        telNum: this.ruleForm.telNum
      }
      console.log(params)
      if(this.isIdNumber){
        httpreques(
          "post",
          params,
          "/realbrand-management-service/StoreUserMgt/UpdateUserInfo"
        ).then((res) => {
          if(res.data.code = "SUCCESS"){
            this.$message.success('编辑员工成功')
            this.$router.replace("/setting/clerklist")
          }else{
            this.$message.error('编辑员工失败')
          }
        })
      }else{
        httpreques(
          "post",
          params,
          "/realbrand-management-service/StoreUserMgt/InserUseraccount"
        ).then((res) => {
          if(res.data.code = "SUCCESS"){
            this.$message.success('新增员工成功')
            this.$router.replace("/setting/clerklist")
          }else{
            this.$message.error('新增员工失败')
          }
        })
      }
    },
    // 门店名称列表
    StoreNameList() {
      httpreques(
        "post",
        {
          pageNum: 1,
          pageSize: 15,
          storeName: ""
          // idNumber: this.idNumber,
        },
        "/realbrand-management-service/StoreMgt/StoreNameList"
      ).then((result) => {
        console.log(result);
        if (result.data.code == "SUCCESS") {
          this.storeNameItemList = result.data.data.storeNameItemList;
        } else {
          this.$message.error(result.data.msg);
        }
      });
    },
    station1(val){
      this.station = val
    },
    cancelbtn(){
      this.$router.replace("/setting/clerklist")
    }
  },
};
</script>
<style lang="scss" scoped>
.newclerk {
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: #f6faff;
  padding-top: 30px;
  height: 100%;
  box-sizing: border-box; 
 
}
 .newclerk-content{
  background-color: #fff;
  flex: 1;
}
.newclerk-from {
  width: 500px;
  
}
// .clerk-list{
//   padding: 20px;
// }
.demo-ruleForm{
  margin-top: 24px;
  margin-left: 40px;
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
.el-icon-plus {
  height: 45px;
  width: 45px;
}
.clerk-imgs {
  display: flex;
  flex-direction: row;
}
/deep/.el-upload--picture-card {
  width: 280px;
  height: 160px;
}
/deep/.el-form-item--small.el-form-item{
  margin-bottom: 24px;
}
/deep/.el-breadcrumb__inner.is-link,
.el-breadcrumb__inner a {
  color: #3b90f4;
}
/deep/.el-input__inner {
  width: 328px;
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
/deep/.el-form-item--small.el-form-item {
    margin-bottom: 24px;
}
.tip {
  margin: 0;
  font-size: 12px;
  color: #a0a0a0;
  span {
    color: #333;
  }
}
</style>>
 