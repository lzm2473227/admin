<template>
  <div class="main-table">
    <div class="table-top">
      <div class="top-btn">
        <span>打印列表</span>
        <span>|</span>
        <span>导出表格</span>
      </div>
      <div class="top-total">
        <span>按商品69编码统计</span>
        <span>按单品编码统计</span>
      </div>
      <div class="top-set"></div>
    </div>
    <div class="table"></div>
  </div>
  <!-- <div class="noredeive">
    <div class="noredeive-title">待收货</div>

    <el-form
      :inline="true"
      :model="formInline"
      class="demo-form-inline"
      size="medium"
    >
      <InpTop />

      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>

    <div class="product-list">
      <el-table
        ref="multipleTable"
        :data="tabledata"
        tooltip-effect="dark"
        style="width: 100%"
        stripe="true"
        fit="true"
        border
        header-cell-style="background:#F6FAFF"
      >
        <el-table-column align="center" prop="index" label="序号" width="50" fixed></el-table-column>
          <el-table-column align="center" prop="productcode" label="单品编号" width="200" fixed></el-table-column>
          <el-table-column align="center" prop="code69" label="商品69码" width="180"></el-table-column>
          <el-table-column align="center" prop="productname" label="商品名称"></el-table-column>
          <el-table-column align="center" prop="specname" label="规格名称" min-width="200"></el-table-column>
          <el-table-column align="center" prop="specparams" label="规格参数"></el-table-column>
          <el-table-column align="center" prop="productstandard" label="产品标准号" width="150"></el-table-column>
          <el-table-column align="center" prop="productsize" label="商品尺寸"></el-table-column>
          <el-table-column align="center" prop="productweight" label="商品重量/质量" width="150"></el-table-column>
          <el-table-column align="center" prop="productvolume" label="商品体积/容积" width="150"></el-table-column>
          <el-table-column align="center" prop="productimg" label="商品图片"></el-table-column>
          <el-table-column align="center" prop="producteffect" label="主要功能/功效" width="150"></el-table-column>
          <el-table-column align="center" prop="producteffect" label="商品小类"></el-table-column>
          <el-table-column align="center" prop="producteffect" label="商品中类"></el-table-column>
          <el-table-column align="center" prop="producteffect" label="商品大类"></el-table-column>
          <el-table-column align="center" prop="producteffect" label="包装类型"></el-table-column>
          <el-table-column align="center" prop="producteffect" label="包装尺寸"></el-table-column>
          <el-table-column align="center" prop="producteffect" label="商品简介" width="250"></el-table-column>
          <el-table-column align="center" prop="productprice" label="售价" width="100" fixed="right"></el-table-column>
      </el-table>
      <div class="com-bottom">
        <div class="bot">
          <el-pagination background layout="prev, pager, next" :total="pageNum">
          </el-pagination>
        </div>
      </div>
    </div>
  </div> -->
</template>

<script>
import InpTop from "../../components/InpTop";
import httpreques from "../../utils/httpreques";
export default {
  name: "Noredeive",
  data() {
    return {
      formInline: {
        productname: "",
        brandname: "",
      },
      tabledata: [],
      pageNum: 0,
    };
  },
  components: {
    InpTop,
  },
};
</script>

<style lang="scss" scoped>
.main-table{
  background: #E8F1FB;
}
.table-top{
  display: flex;
  justify-content: space-between;
}





.noredeive {
  box-sizing: border-box;
  background: #fff;
  padding: 20px;
  height: 100%;
}
.list-btndel {
  margin-left: 30px;
}
.noredeive-title {
  // margin: 16px 0 20px 0;
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: bold;
}
.bot {
  display: flex;
  justify-content: center;
}
.bot {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
/deep/.el-input__inner {
  width: 328px;
  margin-right: 50px;
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
}
</style>