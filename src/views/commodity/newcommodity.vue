<template>
  <div class="newcommodity">
    <el-form
      :ref="ruleForm"
      :rules="rules"
      :model="commodityform"
      label-width="120px"
      size="other"
    >
      <el-form-item label="商品名称" class="commodityname" prop="name">
        <el-input v-model="commodityform.name"></el-input>
      </el-form-item>
      <el-form-item label="价格" class="commodityname" prop="price">
        <el-input-number
          v-model="commodityform.price"
          :precision="2"
          :step="1"
          :min="0.01"
          :max="99999"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="促销价" class="commodityname" prop="discountprice">
        <el-input-number
          v-model="commodityform.discountprice"
          :precision="2"
          :step="1"
          :min="0.01"
          :max="9999"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="库存" class="commodityname" prop="stock">
        <el-input-number
          v-model="commodityform.stock"
          :min="1"
          :max="9999999"
          label="描述文字"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="品牌名称" class="commodityname" prop="brandname">
        <el-input v-model="commodityform.brandname"></el-input>
      </el-form-item>
      <el-form-item label="产品标准号" class="commodityname" prop="productno">
        <el-input v-model="commodityform.productno"></el-input>
      </el-form-item>
      <el-form-item label="商品简介" class="commodityname" prop="content">
        <el-input v-model="commodityform.content" type="textarea"></el-input>
      </el-form-item>
    </el-form>
    <div class="commodityimage">
      <div class="commodityimage-title">商品详情图</div>
      <el-upload action="#" list-type="picture-card" :auto-upload="false">
        <template #default>
          <i class="el-icon-plus"></i>
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
      <el-dialog v-model="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="" />
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  name: "Newcommodity",
  data() {
    return {
      commodityform: {
        name: "",
        price: "",
        discountprice: "",
        stock: "",
        brandname: "",
        productno: "",
        content: "",
      },
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      rules: {
        name: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到  20个字符",
            trigger: "blur",
          },
        ],
        price: [{ required: true, message: "请输入价格", trigger: "blur" }],
        discountprice: [
          { required: true, message: "请输入促销价", trigger: "blur" }, 
        ],
        stock: [
          { required: true, message: "请输入库存", trigger: "blur" },
          
        ],
        brandname: [
          { required: true, message: "请输入品牌", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        productno: [
          { required: true, message: "请输入产品标准编号", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        content: [
          { required: true, message: "请填写商品简介", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    handleRemove(file) {
      console.log(file);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
  
};
</script>
<style lang="scss" scoped>
.newcommodity {
  padding-top: 20px;
  display: flex;
  flex-direction: column;
 
}
.groupconent {
  display: flex;
  flex-direction: row;
}
.commodityname {
  width: 380px;
  padding: 5px 0 5px 0 ;
}
.commodityimage {
  padding: 20px 0 0 40px;
}
.commodityimage-title {
  color: #606266;
  padding-bottom: 20px;
}
</style>