<template>
  <el-form-item label="单品编码：">
    <el-input placeholder="请输入单品编码" v-model="productcode" />
  </el-form-item>

  <el-form-item label="商品69编码：">
    <el-input placeholder="请输入商品69编码" v-model="code69" />
  </el-form-item>

  <el-form-item label="商品名称：">
    <el-input placeholder="请输入商品名称" v-model="productname" />
  </el-form-item>
</template>

<script>
export default {
  name: "InpTop",
};
</script>

<style lang="scss" scoped>
/deep/.el-input__inner {
  width: 360px;
  margin-right: 50px;
  height: 36px;
}
</style>