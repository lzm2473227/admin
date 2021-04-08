<template>
  <div class="header">
    <ul>
      <li><img src="../../assets/iconsvg/Print_list.png" alt="">返回列表</li>
      <li><img src="../../assets/iconsvg/Save_content.png" alt="">保存内容</li>
      <li><img src="../../assets/iconsvg/Print_list.png" alt="">打印预览</li>
      <li><img src="../../assets/iconsvg/Print_list.png" alt="">导出表格</li>
    </ul>
  </div>
  <div class="main">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="0px"
      class="demo-ruleForm"
      label-position="left"
    >
      <table width="696" height="842" border="1" cellspacing="0">
        <tr height="50">
          <td width="87" style="background: #ecf3fb">姓名</td>
          <td width="144">
            <el-form-item prop="name" class="from-item-padding">
              <el-input
                v-model="ruleForm.name"
                placeholder="请输入姓名"
              ></el-input>
            </el-form-item>
          </td>
          <td width="88" style="background: #ecf3fb">性别</td>
          <td width="144">
            <el-form-item prop="sex">
              <el-radio-group v-model="ruleForm.sex">
                <el-radio label="1">男</el-radio>
                <el-radio label="2">女</el-radio>
              </el-radio-group>
            </el-form-item>
          </td>
          <td width="163" rowspan="3"></td>
        </tr>
        <tr height="50">
          <td style="background: #ecf3fb">籍贯</td>
          <td>
            <el-form-item class="from-item-padding">
              <el-input v-model="ruleForm.d" placeholder="请输入籍贯"></el-input>
            </el-form-item>
          </td>
          <td style="background: #ecf3fb">民族</td>
          <td>
            <el-form-item class="from-item-padding">
              <el-input v-model="ruleForm.c" placeholder="请输入民族"></el-input>
            </el-form-item>
          </td>
          <!-- <td></td> -->
        </tr>
        <tr height="50">
          <td style="background: #ecf3fb">政治面貌</td>
          <td>
            <el-form-item class="from-item-padding">
              <el-input v-model="ruleForm.k" placeholder="请输入政治面貌"></el-input>
            </el-form-item>
          </td>
          <td style="background: #ecf3fb">出生年月</td>
          <td>
            <el-form-item prop="birth" class="from-item-padding">
              <el-date-picker v-model="value1" type="date" placeholder="请选择出生日期">
              </el-date-picker>
            </el-form-item>
          </td>
          <!-- <td></td> -->
        </tr>
        <tr height="50">
          <td style="background: #ecf3fb">联系号码</td>
          <td>
            <el-form-item prop="clerkphone" class="from-item-padding">
              <el-input v-model="ruleForm.telNum" placeholder="请输入手机号码"></el-input>
            </el-form-item>
          </td>
          <td style="background: #ecf3fb">身份证号</td>
          <td colspan="4">
            <el-form-item prop="idcard" class="from-item-padding">
          <el-input
            v-model="ruleForm.idNumber"
            placeholder="请输入身份证号"
          ></el-input>
          <!-- <p class="tip">身份证号为登录账号，初始密码为：<span>666668888</span></p> -->
        </el-form-item>
          </td>
        </tr>
        <tr height="50">
          <td style="background: #ecf3fb">学历</td>
          <td>
            <el-form-item class="from-item-padding">
              <el-input v-model="ruleForm.h" placeholder="请输入学历"></el-input>
            </el-form-item>
          </td>
          <td style="background: #ecf3fb">专业</td>
          <td colspan="4">
            <el-form-item class="from-item-padding">
              <el-input v-model="ruleForm.i" placeholder="请输入专业"></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr height="50">
          <td style="background: #ecf3fb">毕业学校</td>
          <td colspan="4">
            <el-form-item class="from-item-padding">
              <el-input v-model="ruleForm.j" placeholder="请输入毕业院校"></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr height="86">
          <td style="background: #ecf3fb">居住地址</td>
          <td colspan="4">
            <el-form-item class="from-item-padding">
              <el-input v-model="ruleForm.g" placeholder="请输入户口所在地"></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr height="86">
          <td style="background: #ecf3fb">所属门店</td>
          <td colspan="4">
            <el-form-item prop="clerkstore" class="from-item-padding">
              <el-select v-model="ruleForm.storeName" placeholder="请选择所属门店">
                <el-option
                  v-for="item in ruleForm.storeName"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </td>
        </tr>
        <tr height="80">
          <td style="background: #ecf3fb">所属岗位</td>
          <td colspan="4">
            <el-form-item prop="clerkrole" class="from-item-padding">
              <el-checkbox-group v-model="radio">
                <el-checkbox v-for="item in clerkroles" :label="item.label" :key="item.value" @change="station1(item.label)">{{ item.label }}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </td>
        </tr>
        <tr height="281">
          <td style="background: #ecf3fb">证件照</td>
          <td colspan="4">
            <el-form-item prop="clerkimgs" class="from-item-padding">
              <div class="clerk-imgs">
                <el-upload
                  action="#"
                  list-type="picture-card"
                  :auto-upload="false"
                >
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
          </td>
        </tr>
      </table>
    </el-form>
    <Btn 
      :btntext="$route.query.idNumber ? '保存' : '新增'"
      @addbtn="addadv"
      @cancelbtn="cancelbtn"/>
  </div>
</template>
<script>
import NewBreadCrumb from "../../layouts/IndexLayout/components/NewBreadCrumb";
import httpreques from "../../utils/httpreques";
import Btn from "../../components/Btn";

export default {
  name: "NewClerk",
  components: { NewBreadCrumb, Btn },
  data() {
    return {
      radio: [
        {
          label: "店长",
          value: "1",
        },
      ],
      ruleForm: {
        name: "",
        idNumber: "",
        telNum: "",
        password: "",
        reverseId: "",
        station: "1111",
        storeName: "海王星辰",
        reverseId: "",
        sex: "1",
      },
      rules: {
        name: [{ required: true, message: "请输入性名", trigger: "blur" }],
        idcard: [
          { required: true, message: "请输入身份证号", trigger: "blur" },
        ],
        sex: [{ required: true, message: "请输入性别", trigger: "blur" }],
        birth: [{ required: true, message: "请输入出生年月", trigger: "blur" }],
        clerkpsw: [
          { required: true, message: "请输入初始密码", trigger: "blur" },
        ],
        clerkphone: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
        ],
        clerkimgs: [
          { required: true, message: "请上传证件照", trigger: "blur" },
        ],
        clerkstore: [
          { required: true, message: "请输入所属门店", trigger: "blur" },
        ],
        clerkrole: [
          { required: true, message: "请输入所属角色", trigger: "blur" },
        ],
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
      station: "",
      isIdNumber: "",
    };
  },
  mounted() {
    // this.updatadata();
    // this.adata();
  },
  created() {
    this.isAdd();
  },
  methods: {
    isAdd() {
      if (this.$route.query.idNumber) {
        this.isIdNumber = this.$route.query.idNumber;
        let params = {
          idNumber: this.isIdNumber,
          pageNum: 0,
          pageSize: 0,
        };
        httpreques(
          "post",
          params,
          "/realbrand-management-service/StoreUserMgt/StoreUser"
        ).then((res) => {
          console.log(res);
          if (res.data.code === "SUCCESS") {
            let detailInfo = res.data.data;
            this.ruleForm = {
              idNumber: detailInfo.idNumber, // 身份证号
              name: detailInfo.name,
              password: "123456",
              frontId: "1", // 身份证正面照
              reverseId: "2", // 身份证反面照
              station: this.station, // 岗位名称
              storeName: detailInfo.storeName, // 店铺名称
              telNum: detailInfo.telNum,
            };
          } else {
            this.$message.error("获取员工信息失败");
          }
        });
      }
    },
    //新增店员
    addadv() {
      let params = {
        idNumber: this.ruleForm.idNumber, // 身份证号
        name: this.ruleForm.name,
        password: "123456",
        frontId: "1", // 身份证正面照
        reverseId: "2", // 身份证反面照
        station: this.station, // 岗位名称
        storeName: this.ruleForm.storeName, // 店铺名称
        telNum: this.ruleForm.telNum,
      };
      console.log(params);
      if (this.isIdNumber) {
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
      this.station = val;
    },
    cancelbtn() {
      this.$router.replace("/setting/clerklist");
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
      border-right: 1px solid #99BBE8;
      display: flex;
      justify-content: center;
      cursor: pointer;
      // align-items: center;
      img{
        margin-right: 4px;
      }
       &:last-child{
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
.clerk-imgs{
  display: flex;
}
.imgs-title{
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
  border: 1px solid #66b1ff ;
}
/deep/.el-input__inner:hover {
  border: 1px solid #66b1ff ;
}
</style>