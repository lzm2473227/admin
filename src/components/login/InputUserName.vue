<template>
  <div class="inputusername">
    <el-input placeholder="请输入用户名" @input="changeusername" v-model="cookieval">
      <template #prefix>
        <el-image
          class="icon-username"
          :src="require('@/static/images/login_username.png')"
          fit="cover"
        ></el-image>
      </template>
    </el-input>
  </div>
</template>
<script>
export default {
  name: "InputUserName",
  props:['cookieval'],
  data() {
    return {
      
    };
  },
  
  methods: {
    //返回用户名
    changeusername(val) {
     
      this.$emit("username", val);
    },
  },
};
</script>
 <style lang="scss">
.icon-username {
  height: 22px;
  width: 22px;
}
 
  .inputusername {
    display: inline-block;
    width: 380px;
    height: 56px;
    &  
      .el-input--small .el-input__inner {
    height: 56px;
    width: 380px;
    padding-left: 50px;
      font-size: 18px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #999999;
  }
  }
.el-input__prefix {
  padding: 0 13px 0 13px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>