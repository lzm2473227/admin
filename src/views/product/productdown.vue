<template>
  <div class="productdown">
    <div class="product-search">
      <el-form
        :inline="true"
        :model="formInline"
        class="demo-form-inline"
        size="other"
      >
        <el-form-item label="商品名称">
          <el-input
            v-model="formInline.productname"
            placeholder="商品名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="品牌名称">
          <el-input
            v-model="formInline.brandname"
            placeholder="品牌名称"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="product-btndown">
      <el-button type="primary" size="other" @click="Producdown">下架</el-button>
    </div>
    <div class="product-list">
      <el-table
        row-key="id"
        :data="productlist"
        ref="multipleTable"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column
          type="index"
          label="序号"
          :index="productlist.index"
          width="80"
        >
        </el-table-column>
        <el-table-column label="商品名称" prop="productname"> </el-table-column>
        <el-table-column label="品牌名称" prop="brandname"></el-table-column>
        <el-table-column label="描述" prop="productdesc"> </el-table-column>
        <el-table-column label="下架数量" prop="stock"> </el-table-column>
      </el-table>
      <div class="padding-t10 text-align-left">
        <el-pagination
          background
          :page-size="pageSize"
          :total="total"
          @current-change="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          layout="  prev, pager, next, jumper"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import _ from "lodash";
export default {
  name: "Productdown",
  data() {
    return {
      formInline: {
        productname: "",
        brandname: "",
      },
      productlist: [],
      pageSize: 10,
      total: 20,
      multipleSelection:[],
    };
  },
  mounted() {
    let t = this;
    t.getdata();
  },
  methods: {
    //获取数据
    getdata() {
      let t = this;
      t.productlist = [];
      t.productlist.push(
        {
          productname: "iPhone 8 Plus",
          brandname: "iPhone",
          productdesc: "苹果8P",
          stock: "99",
        },
        {
          productname: "HuaWei Mate 40",
          brandname: "HUAWEI",
          productdesc: "华为Mate40",
          stock: "88",
        }
      );
    },
    //查询
    onSubmit() {
      let t = this;
      t.getdata();
      if (t.formInline.productname) {
        t.productlist = _.filter(
          JSON.parse(JSON.stringify(t.productlist)),
          function (o) {
            return o.productname == t.formInline.productname;
          }
        );
      }
      if (t.formInline.brandname) {
        t.productlist = _.filter(
          JSON.parse(JSON.stringify(t.productlist)),
          function (o) {
            return o.brandname == t.formInline.brandname;
          }
        );
      }
    },
    //商品下架
    Producdown() {
      let t = this;
      if(t.multipleSelection.length<1){
          t.$message({message:"请选择要下架的商品",type:"error"});
      }else{
         t.$message({
        message: "商品已下架",
        type: "success",
      });
      }
    },
     //列表选中
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
  },
};
</script>
<style lang="scss" scoped>
.productdown {
  padding: 20px 0 0 20px;
}
.product-search {
  height: 80px;
  width: 100%;
  .el-button--primary {
    color: #ffffff;
    background-color: #409eff;
    border-color: #409eff;
  }
   
}
</style>