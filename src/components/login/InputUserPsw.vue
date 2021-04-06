<template>
  <div class="inputpsw">
    <el-input placeholder="请输入密码" @input="changepsw" show-password v-model="cookieval" @keydown.enter="onEnterPress">
      <template #prefix>
        <el-image
          class="icon-psw"
          :src="require('@/static/images/login_userpsw.png')"
          fit="cover"
        ></el-image>
      </template>
    </el-input>
  </div>
</template>
<script>
export default {
  name: "InputPsw",
   props:['cookieval'],
  data() {
    return {
      
    };
  },
  methods: {
    //返回用户名
    changepsw(val) {
      this.$emit("userpsw", val);
    },
    //enter事件处理
    onEnterPress(){
      this.$emit("onenter");
    }
  },
};
</script>
 <style lang="scss">
.icon-psw {
  height: 26px;
  width: 22px;
}
 

  .inputpsw {
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