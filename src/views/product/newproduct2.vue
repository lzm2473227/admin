<template>
  <div class="newproduct">
     
    <NewBreadCrumb ptitle="商品" ctitle="新增商品" path="product"></NewBreadCrumb>
    <div class="newproduct-content">
       <div class="newproduct-from">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="120px"
        class="demo-ruleForm"
        label-position="left"
      >
        <el-form-item
          label="商品单码："
          prop="commodityCode"
          class="from-item-padding"
        >
          <el-input
            v-model="ruleForm.commodityCode"
            placeholder="请输入单品编码"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="商品69编码："
          prop="barcode"
          class="from-item-padding"
        >
          <el-input
            v-model="ruleForm.barcode"
            placeholder="请输入商品69编码"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="商品名称："
          prop="commodityName"
          class="from-item-padding"
        >
          <el-input
            v-model="ruleForm.commodityName"
            placeholder="请输入商品名称"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="规格名称："
          prop="storecard"
          class="from-item-padding"
        >
          <el-input
            v-model="ruleForm.storecard"
            placeholder="请输入规格名称"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="规格参数："
          prop="storeaccount"
          class="from-item-padding"
        >
          <el-input
            v-model="ruleForm.specsParameter"
            placeholder="请输入规格参数"
          ></el-input>
        </el-form-item>
        <el-form-item label="产品标准号：" class="from-item-padding">
          <el-input
            v-model="ruleForm.storepsw"
            placeholder="请输入产品标准号"
          ></el-input>
        </el-form-item>
        <el-form-item label="商品重量/质量：" class="from-item-padding">
          <el-input
            v-model="ruleForm.storecard"
            placeholder="商品名称"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="商品尺寸："
          prop="storecard1"
          class="from-item-padding"
        >
          <el-input
            v-model="ruleForm.storecard1"
            placeholder="请输入商品尺寸"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="商品体积/容积："
          prop="storecard2"
          class="from-item-padding"
        >
          <el-input
            v-model="ruleForm.storecard2"
            placeholder="请输入商品体积／容积"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="商品图片："
          prop="storecard3"
          class="from-item-padding"
        >
          <el-upload
            action="https://www.mocky.io/v2/5185415ba171ea3a00704eed/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog v-model="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </el-form-item>
        <el-form-item
          label="主要功能/功效："
          prop="storecard3"
          class="from-item-padding"
        >
          <el-input
            v-model="ruleForm.storecard4"
            placeholder="请输入商品主要功能／功效"
          ></el-input>
        </el-form-item>
        <el-form-item label="售价：" prop="price" class="from-item-padding">
          <el-input
            v-model="ruleForm.price"
            placeholder="请输入售价"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
    </div>
       <Btn
      :btntext="$route.query.commodityCode ? '编辑' : '新增'"
      @addbtn="addcomm"
      @cancelbtn="cancelbtn"
    />
  </div>
</template>

<script>
import Btn from "../../components/Btn";
import httpreques from "../../utils/httpreques";
import NewBreadCrumb from "../../layouts/IndexLayout/components/NewBreadCrumb";
export default {
  name: "Newproduct",
  data() {
    return {
      ruleForm: {
        storecode: "",
        specsParameter: "",
        commodityName: "",
        filePath: "",
        price: "",
        commodityCode:"",
      },
      dialogImageUrl: "",
      rules: {
        commodityCode:[
             { required: true, message: "请输入商品单码", trigger: "blur" },
        ],
        storecode: [
          { required: true, message: "请输入条形码", trigger: "blur" },
        ],
        commodityName: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
        ],
      },
    };
  },
  mounted() {
    //
    this.getdata();
  },
  methods: {
    getdata() {
      let t = this;
       let commodityCode = t.$route.query.commodityCode;
      if (commodityCode) {
        let params = {
          commodityCode: commodityCode,
        };
        httpreques(
          "post",
          params,
          "/realbrand-management-service/CommodityMgt/CommodityInfo"
        ).then((res) => {
          if (res.data.code == "SUCCESS") {
            //对象数据处理
            let commobj = res.data.data;
           
            t.ruleForm = commobj;
          } else {
            //接口错误处理
            t.$message.error(res.data.msg);
          }
        });
      }
    },
    addNewProduct() {
      this.$router.replace("/product");
      this.$message.success("新增商品成功");
      //manufacturer  brandName  policyNo
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      console.log(file.url);
      this.dialogImageUrl = file.url;
      // this.dialogVisible = true;
    },
    //提交
    addcomm() {
      let t = this;
      t.$refs["ruleForm"].validate((valid) => {
        if (!valid) {
          return;
        }
        let params = {
          barcode: t.ruleForm.barcode,
          brandName: "品牌名称",
          commodityName: t.ruleForm.commodityName,
          filePath: "string",
          manufacturer: "厂商",
          policyNo: 0, //保单号
          price: t.ruleForm.price,
          specsParameter: t.ruleForm.specsParameter,
        };

        let url = t.$route.query.commodityCode
          ? "/realbrand-management-service/CommodityMgt/UpdateCommodity"
          : "/realbrand-management-service/CommodityMgt/InsertCommodity";
        console.log(params);

        httpreques("post", params, url).then((res) => {
          if (res.data.code == "SUCCESS") {
            t.$message({
              message: t.$route.query.commodityCode ? "修改成功" : "添加成功",
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
    cancelbtn() {
      let t = this;
      t.$router.push({ path: "/product" });
    },
  },
  components: {
    Btn,NewBreadCrumb
  },
};
</script>

<style lang="scss" scoped>
.newproduct {
  display: flex;
  flex-direction: column;
    position: relative;
   background-color: #f6faff;
  padding-top: 30px;
  
  box-sizing: border-box; 
}
.newproduct-content{
  background-color: #fff;
  flex: 1;
}
 
.newproduct-from {
  /deep/.el-input__inner {
    width: 360px;
    border-radius: 3px;
    height: 42px;
    box-sizing: border-box;
  }
}
/deep/.el-form-item__label {
  height: 42px;
  line-height: 42px;
}
/deep/.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
/deep/.el-breadcrumb__inner.is-link,
.el-breadcrumb__inner a {
  color: #3b90f4;
}
.el-form-item--small.el-form-item {
  margin: 24px 20px;
}
/deep/.newproduct-from[data-v-2dcd26ee] .el-input__inner {
    width: 328px;
    border-radius: 3px;
    height: 36px;
    box-sizing: border-box;
    line-height: 36px;
}
/deep/[data-v-2dcd26ee] .el-form-item__label {
    height: 36px;
    line-height: 36px;
}
/deep/.el-upload--picture-card {
    background-color: #fbfdff;
    border: 1px dashed #c0ccda;
    border-radius: 6px;
    box-sizing: border-box;
    width: 100px;
    height: 100px;
    cursor: pointer;
    line-height: 102px;
    vertical-align: top;
}
 
</style>