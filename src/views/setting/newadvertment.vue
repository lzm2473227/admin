<template>
  <div class="newadvertment">
    <NewBreadCrumb
      ptitle="广告管理"
      ctitle="新增广告"
      path="/setting/advertmentlist"
    ></NewBreadCrumb>
    <div class="advertment-content">
      <div class="advertment-from">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="120px"
          class="demo-ruleForm"
          label-position="left"
        >
          <el-form-item
            label="广告位置"
            prop="positionName"
            class="from-item-padding"
          >
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
          <el-form-item
            label="广告图片"
            prop="linkPosition"
            class="from-item-padding"
          >
            <el-upload
              action="http://14.29.162.130:6602/image/imageUpload"
              list-type="picture-card"
              :on-success="handleAvatarSuccess"
              :limit = 1
              v-if="!dialogImageUrl"
            >
              <template #default >
                <div  class="imgs-title">
                  <i class="el-icon-plus"></i>
                </div>
              </template>
               
            </el-upload>
            
                <div  v-if="dialogImageUrl" >
                  <img
                   style="width:200px;height:120px"
                    class="el-upload-list__item-thumbnail"
                    :src="dialogImageUrl"
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
                <span class="img-desc"
              >建议尺寸为：680px*308px，格式为JPEG、PNG</span
            >
          </el-form-item>
          <el-form-item
            label="开始时间"
            prop="startTime"
            class="from-item-padding"
          >
            <el-date-picker
              v-model="ruleForm.startTime"
              type="datetime"
              format="YYYY-MM-DD HH:mm:ss"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item
            label="结束时间"
            prop="endTime"
            class="from-item-padding"
          >
            <el-date-picker
              v-model="ruleForm.endTime"
              type="datetime"
              format="YYYY-MM-DD HH:mm:ss"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
          <div class="advertmentstatus">
            <el-radio v-model="ruleForm.enableState" label="0">启用</el-radio>
            <el-radio
              v-model="ruleForm.enableState"
              class="radio-right"
              label="1"
              >禁用</el-radio
            >
          </div>
        </el-form>
      </div>
    </div>

    <Btn
      :btntext="$route.query.advertmentid ? '编辑' : '新增'"
      @addbtn="addadv"
      @cancelbtn="cancelbtn"
    />
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
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      ruleForm: {
        enableState: "0",
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
    // if (localStorage.getItem("loginuser"))
    //   this.idNumber = JSON.parse(
    //     localStorage.getItem("loginuser")
    //   ).userDetails.idNumber;
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
          if (res.data.code === "SUCCESS") {
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
        if (res.data.code === "SUCCESS") {
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
        console.log(params);
        httpreques("post", params, url).then((res) => {
          if (res.data.code === "SUCCESS") {
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
.newadvertment {
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: #f6faff;
  padding-top: 30px;
  height: 100%;
  box-sizing: border-box;
}
.advertment-content {
  background-color: #fff;
  flex: 1;
}
.advertment-from {
  padding: 30px 0 0 20px;
}
.imgs-title {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.img-desc {
  padding-top: 10px;
  color: rgba(153, 153, 153, 100);
  font-size: 12px;

  font-family: SourceHanSansSC-regular;
}
.radio-right {
  padding-left: 32px;
}
/deep/.el-form-item--small.el-form-item {
  margin-bottom: 24px;
}
/deep/.el-upload--picture-card {
  width: 200px;
  height: 100px;
}
/deep/.el-input__inner {
  width: 328px;
  height: 36px;
  font-size: 14px;
}
/deep/.el-radio__inner {
  width: 18px;
  height: 18px;
}
/deep/.el-form-item--small.el-form-item {
  margin-bottom: 24px;
}
</style>