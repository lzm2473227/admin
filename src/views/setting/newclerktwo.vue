<template>
  <div class="tab">
    <div class="tab-title">
      <div class="left">
        <div class="print" @click="$router.push('/setting/clerklist')">
          <img
            class="icon"
            src="../../assets/images/ic-打印列表.png"
            alt=""
          /><span class="axis">返回列表</span>
        </div>
        <div class="print" @click="addstore()">
          <img
            class="icon"
            src="../../assets/images/ic-打印列表.png"
            alt=""
          /><span class="axis">保存内容</span>
        </div>
        <div class="print">
          <img
            class="icon"
            src="../../assets/images/ic-打印列表.png"
            alt=""
          /><span class="axis">打印列表</span>
        </div>
        <div class="print" @click="exportExcel">
          <img
            class="icon"
            src="../../assets/images/ic-导出表格.png"
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
      <form action="#">
        <table border="1" class="">
          <tr>
            <td class="table-left">姓名</td>
            <td class="table-right">
              <input
                type="text"
                placeholder="请输入姓名"
                v-model="ruleForm.name"
              />
            </td>
            <td class="table-left">性别</td>
            <td class="table-right">
              <el-radio-group v-model="ruleForm.sex">
                <el-radio label="1">男</el-radio>
                <el-radio label="2">女</el-radio>
              </el-radio-group>
            </td>
          </tr>

          <tr>
            <td class="table-left">出生年月</td>
            <td class="table-right">
              <el-date-picker
                v-model="value1"
                type="date"
                placeholder="请选择出生日期"
              >
              </el-date-picker>
            </td>
            <td class="table-left">身高</td>
            <td class="table-right">
              <input
                type="text"
                placeholder="请输入身高"
                v-model="ruleForm.a"
              />
            </td>
          </tr>

          <tr>
            <td class="table-left">体重</td>
            <td class="table-right">
              <input
                type="text"
                placeholder="请输入体重"
                v-model="ruleForm.b"
              />
            </td>
            <td class="table-left">民族</td>
            <td class="table-right">
              <input
                type="text"
                placeholder="请输入民族"
                v-model="ruleForm.c"
              />
            </td>
          </tr>

          <tr>
            <td class="table-left">籍贯</td>
            <td class="table-right">
              <input
                type="text"
                placeholder="请输入籍贯"
                v-model="ruleForm.d"
              />
            </td>
            <td class="table-left">健康状态</td>
            <td class="table-right">
              <input
                type="text"
                placeholder="请输入健康状态"
                v-model="ruleForm.e"
              />
            </td>
          </tr>

          <tr>
            <td class="table-left">婚姻状况</td>
            <td class="table-right">
              <input
                type="text"
                placeholder="请输入婚姻状况"
                v-model="ruleForm.f"
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
            <td class="table-left">户口所在地</td>
            <td class="table-right">
              <input
                type="text"
                placeholder="请输入户口所在地"
                v-model="ruleForm.g"
              />
            </td>
            <td class="table-left">学历</td>
            <td class="table-right">
              <input
                type="text"
                placeholder="请输入学历"
                v-model="ruleForm.h"
              />
            </td>
          </tr>

          <tr>
            <td class="table-left">专业</td>
            <td class="table-right">
              <input
                type="text"
                placeholder="请输入专业"
                v-model="ruleForm.i"
              />
            </td>
            <td class="table-left">毕业院校</td>
            <td class="table-right">
              <input
                type="text"
                placeholder="请输入毕业院校"
                v-model="ruleForm.j"
              />
            </td>
          </tr>

          <tr>
            <td class="table-left">政治面貌</td>
            <td class="table-right">
              <input
                type="text"
                placeholder="请输入政治面貌"
                v-model="ruleForm.k"
              />
            </td>
            <td class="table-left">职称等级</td>
            <td class="table-right">
              <input
                type="text"
                placeholder="请输入职称等级"
                v-model="ruleForm.l"
              />
            </td>
          </tr>

          <tr>
            <td class="table-left">手机号码</td>
            <td class="table-right">
              <input
                type="text"
                placeholder="请输入手机号码"
                v-model="ruleForm.telNum"
              />
            </td>
            <td class="table-left">所属门店</td>
            <td class="table-right">
              <el-select
                v-model="ruleForm.storeName"
                placeholder="请选择所属门店"
              >
                <el-option
                  v-for="item in storeNameItemList"
                  :key="item.value"
                  :label="item.storeName"
                  :value="item.storeName"
                ></el-option>
              </el-select>
            </td>
          </tr>

          <tr>
            <td class="table-left">所属岗位</td>
            <td class="table-right" colspan="3">
              <el-checkbox-group v-model="radio">
                <el-checkbox
                  style="margin-right: 6px"
                  v-for="item in clerkroles"
                  :label="item.label"
                  :key="item.value"
                  @change="station1(item.label)"
                  >{{ item.label }}</el-checkbox
                >
              </el-checkbox-group>
            </td>
          </tr>

          <tr>
            <td class="table-left">证件照</td>
            <td class="table-right" colspan="3">
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
            </td>
          </tr>
        </table>
      </form>
    </div>
  </div>
</template>
<script>
import httpreques from "../../utils/httpreques";
export default {
  name: "Newproduct",
  data() {
    return {
      ruleForm: {
        name: "",
        idNumber: "",
        telNum: "",
        password: "",
        reverseId: "",
        station: "1111",
        storeName: "",
        reverseId: "",
        sex: "1",
      },
      radio: [
        {
          label: "店长",
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
      storeNameItemList: [],
    };
  },
  mounted() {
    this.getdata();
    this.StoreNameList();
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
    // 门店名称列表
    StoreNameList() {
      httpreques(
        "post",
        {
          pageNum: 1,
          pageSize: 15,
          storeName: this.ruleForm.storeName,
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
    station1(val) {
      this.station = val;
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
/deep/.el-input__inner {
  width: 196px;
}
</style>