<template>
  <div class="CorporateInformation">
    <div class="main">
      <p>企业信息</p>
      <!-- <div class="newstore-from">
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
            prop="storecode"
            class="from-item-padding"
          >
            <el-input
              v-model="ruleForm.storecode"
              placeholder="请输入门店机构代码"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="门店名称"
            prop="storename"
            class="from-item-padding"
          >
            <el-input
              v-model="ruleForm.storename"
              placeholder="请输入门店名称"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="门店地址"
            prop="storename"
            class="from-item-padding"
          >
            <div class="select-province">
              <el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in province"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <el-select
                v-model="value"
                placeholder="请选择"
                style="padding: 0px 5px 0 5px"
              >
                <el-option
                  v-for="item in city"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in area"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
            <el-input
              v-model="ruleForm.storeaddress"
              placeholder="请输入门店地址"
              style="padding-top: 20px"
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
            prop="storecard"
            class="from-item-padding"
          >
            <el-input v-model="ruleForm.storecard"></el-input>
          </el-form-item>
          <el-form-item
            label="证件照"
            prop="clerkimgs"
            class="from-item-padding"
          >
            <div class="clerk-imgs">
              <el-upload
                action="#"
                list-type="picture-card"
                :auto-upload="false"
              >
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
          <el-form-item
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
          </el-form-item>
        </el-form>
      </div> -->
      <div class="mainForm">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="130px"
          class="demo-ruleForm"
          label-position="left"
        >
          <el-form-item label="活动名称：" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="所属行业：" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="企业账号：" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="企业密码：" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="企业地址" prop="name">
            <div class="linkage">
              <div>
                <el-select
                  v-model="selectProvince"
                  filterable
                  size="small"
                  @change="selectProvinceFun($event)"
                  placeholder="请选择省份"
                >
                  <el-option value="" label="请选择省份"></el-option>
                  <el-option
                    :value="item"
                    :label="item.label"
                    v-for="(item, index) in city"
                    :key="index"
                  ></el-option>
                </el-select>
              </div>
              <div>
                <el-select
                  v-model="selectCity"
                  filterable
                  size="small"
                  @change="selectCityFun($event)"
                  placeholder="请选择城市"
                >
                  <el-option value="" label="请选择城市"></el-option>
                  <el-option
                    :value="item"
                    :label="item.label"
                    v-for="(item, index) in cityList"
                    :key="index"
                  ></el-option>
                </el-select>
              </div>
              <div>
                <el-select
                  v-model="selectArea"
                  filterable
                  size="small"
                  @change="selectAreaFun($event)"
                  placeholder="请选择区县"
                >
                  <el-option value="" label="请选择区县"></el-option>
                  <el-option
                    :value="item"
                    :label="item.label"
                    v-for="(item, index) in areaList"
                    :key="index"
                  ></el-option>
                </el-select>
              </div>
            </div>
          </el-form-item>
          <el-form-item>
              <el-input></el-input>
          </el-form-item>
          <el-form-item label="营业执照" prop="name" class="from-item-padding">
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
          <el-form-item label="联系人" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="联系人手机号：" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import city from "../../assets/json/city.json";
export default {
  name: "linkage",
  data() {
    return {
      ruleForm: {
        name: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
      },
      // 整个省市县数据
      city: city,
      // 被选中的市数据
      cityList: [],
      // 被选中的县数据
      areaList: [],
      selectProvince: {},
      selectCity: {},
      selectArea: {},
    };
  },
  methods: {
    // 省份 市 县联动
    selectProvinceFun(event) {
      console.log(event);
      if (event) {
        this.cityList = event.children;
      } else {
        this.cityList = [];
      }
      this.areaList = [];
      this.$emit("getLawyerListInfo", [event.label, "province"]);
    },
    selectCityFun(event) {
      console.log(event);
      if (event) {
        this.areaList = event.children;
      } else {
        this.areaList = [];
      }
      this.$emit("getLawyerListInfo", [event.label, "city"]);
    },
    selectAreaFun(event) {
      console.log(event);
      this.$emit("getLawyerListInfo", [event.label, "area"]);
    },
  },
};
</script>
<style lang="scss" scoped>
.CorporateInformation {
  box-sizing: border-box;
  height: 100%;
  background: #f1f5fd;
  //   padding: 16px;
  .main {
    height: 100%;
    box-sizing: border-box;
    padding: 16px;
    background: #fff;
    p {
      font-size: 20px;
      font-weight: bold;
      color: #333;
    }
    .mainForm {
      width: 500px;
    }
  }
  .linkage {
    display: flex;
    div {
      margin-right: 5px;
    }
  }
}
</style>