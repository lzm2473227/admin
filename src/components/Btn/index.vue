<template>
  <div class="btn-btns">
    <el-button type="primary" @click="addNewProduct">{{btntext}}</el-button>
    <el-button @click="cancel">取消</el-button>
  </div>
</template>

<script>
export default {
  name: "Btn",
  props:['btntext'],
  data() {
    return {};
  },
  methods: {
    addNewProduct() {
      this.$emit('addbtn');
      // this.$router.replace("/");
      // this.$message.success("新增商品成功");
    },
    cancel(){
      this.$emit('cancelbtn');
    }
  },
};
</script>

<style lang="scss" scoped>
.btn-btns {
  height: 64px;
  width: 100%;
  box-sizing: border-box;
  border-top: 1px solid #dedede;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  // `.el-button--small {
  //   padding: 12px 32px;
  // }`
}
</style>