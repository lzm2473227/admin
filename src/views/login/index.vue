<template>
  <div class="login">
    <!-- <div class="login-role">
      <div class="role-list">
        <template v-for="(item, key) in roles" :key="key">
          <div
            :class="rolekey == item.key ? 'roleactive list-base' : 'list-base'"
            @click="selectrole(item)"
          >
            {{ item.value }}
          </div>
        </template>
      </div>
    </div> -->
    <div class="login-content">
      <div class="content-form">
        <div class="form-title">
          <el-image
            style="width: 60px; height: 60px"
            :src="require('@/static/images/login_logo.png')"
            :fit="cover"
          ></el-image>
          <div class="managetitle">{{ rolevalue }}</div>
        </div>
        <div class="form-content">
          <div class="login-info">
            <form action="">
              <div class="username">
                <span>身份证号:</span>
                <input type="text" v-model="username" placeholder="请输入身份证号">
                <span class="descfont">（18位身份证号码）</span>
              </div>
              <div class="username">
                <span>登录密码:</span>
                <input type="password" v-model="userpsw" placeholder="请输入密码">
                <span class="descfont">（密码为6-16位）</span>
              </div>
              <div class="username">
                <span class="verification-code">验证密码:</span>
                <input type="text" v-model="verificationCode" placeholder="请输入验证码">
                <span class="descfont rand-code" @click="sendSMS">（点击随机码）</span>
                <span class="tip">{{ tip }}</span>
              </div>
              <el-checkbox class="save-login" v-model="checked">保存登录信息</el-checkbox>
              <div class="login-btn">
                <button @click.prevent="loginsystem($event)" type="button">登录</button>
              </div>
            </form>
            <!-- <el-form ref="form" :model="form" label-width="80px" class="login-form">
              <el-form-item label="身份证号:">
                <el-input v-model="username"></el-input>
                <span class="descfont">（18位身份证号码）</span>
              </el-form-item>
              <el-form-item label="登录密码:">
                <el-input v-model="userpsw" show-password></el-input>
                <span class="descfont">（密码为6-16位）</span>
              </el-form-item>
              <el-form-item class="verification-code" label="验证密码:">
                <el-input v-model="verificationCode"></el-input>
                <span class="descfont rand-code" @click="sendSMS">（点击随机码）</span>
                <span class="tip">{{ tip }}</span>
              </el-form-item>
              <el-form-item label="">
                <el-radio-group v-model="isremember">
                  <el-radio label="保存登录信息"></el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item>
                <el-button class="login-btn" @click="loginsystem" type="primary">登录</el-button>
              </el-form-item>
            </el-form> -->
          </div>
          <div class="dottline"></div>
          <div class="technology-support">
            <span>技术支持电话：0755-83825745</span>
            <span>©2021 深圳凯华技术有限公司版权所有</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import store from "../../store";
const Base64 = require("js-base64").Base64;
import httpreques from "../../utils/httpreques";
export default {
  name: "Login",
  data() {
    return {
      roles: [
        { key: "CUSTOMER", value: "消费者系统" },
        { key: "STORE", value: "门店管理系统" },
        { key: "LOGISTICS", value: "物流配送管理系统" },
        { key: "WAREHOUSE", value: "物流仓库管理系统" },
        { key: "FACTORY", value: "工厂管理系统" },
        { key: "INSURANCE", value: "保险机构管理系统" },
        { key: "BANK", value: "银行管理系统" },
        { key: "KAIHUA", value: "凯华内部管理系统" },
      ],
      rolekey: "STORE",
      rolevalue: "凯华管理系统",
      // rolevalue: "厦门商品交易中心",
      // rolevalue: "门店管理系统",
      isremember: false,
      username: "",
      userpsw: "",
      verificationCode: '',
      tip: '',
      checked: false
    };
  },
   mounted() {
    // 在页面加载时从cookie获取登录信息
    if(localStorage.getItem('isChecked') === 'true'){
      let username = this.getCookie("username");
      let userpsw = Base64.decode(this.getCookie("userpsw")); //密码进行base64解密 cookie不保存明文，所以需要解密才能赋值
      this.username = username;
      this.userpsw = userpsw;
      this.checked = true
    }
    // 如果存在赋值给表单，并且将记住密码勾选
    // if (username) {
    //   t.username = username;
    //   t.userpsw = userpsw;
    //   // t.checked = true;
    // }
    
  },
  methods: {
    selectrole(item) {
      let t = this;
      t.rolekey = item.key;
      t.rolevalue = item.value;
    },
     loginsystem(e) {
      e.preventDefault()
      let t = this;
      let loginparams = {
        username : t.username,
        password: t.userpsw,
        captcha: this.verificationCode,
        module : t.rolekey,
      };
      // localStorage.removeItem('roleEnum');
      httpreques("post", loginparams, "/managementLogin").then((res) => {
        // console.log(res);
        if (res.data.code == "SUCCESS") {
          // console.log(JSON.parse(localStorage.getItem("roleEnum")));
          // localStorage.setItem("roleEnum", JSON.stringify(t.rolekey));//缓存当前的登录成功的角色。接口未返回角色名称
          let roleEnum = res.data.data.identities[0].role.module
          localStorage.setItem("roleEnum", JSON.stringify(roleEnum));//缓存当前的登录成功的角色。接口未返回角色名称
          localStorage.setItem("loginuser", JSON.stringify(res.data.data));
          localStorage.setItem('isChecked', this.checked)
          store.dispatch("loginsucess", "ok")
          t.$message.success("登录成功");
          t.$router.push({ path: "/product"})
          //判断复选框是否被勾选 勾选则调用配置cookie方法
          if(this.checked) {
            this.setCookie(this.username, this.userpsw, 7) // 传入账号名，密码，和保存天数3个参数
          }else{
            this.clearCookies()
          }
        } else {
          this.clearCookies()
          return this.tip = res.data.msg
          // t.$message.error(res.data.msg);
        }
      });
    },
    // 发送验证码
    sendSMS(){
      if(!this.username) return this.tip = '请输入身份证号！'
      let params = {
        idNumber: this.username
      }
      httpreques("post", params, "/sendCAPTCHA").then((res) => {
        // console.log(res);
        if (res.data.code == "SUCCESS") {
          this.$message.success("发送验证码成功");
        } else {
          t.$message.error("发送验证码失败");
        }
      });
    },
    changeCheck(){
      if(this.checked) this.setUserInfo()
    },
     // 储存表单信息
    setUserInfo: function () {
      let t = this;
      // 判断用户是否勾选记住密码，如果勾选，向cookie中储存登录信息，
      // 如果没有勾选，储存的信息为空
      if (t.checked) {
        t.setCookie("username", t.username, 7);
        // base64加密密码
        let userpsw = Base64.encode(t.userpsw);
        t.setCookie("userpsw", userpsw, 7);
        t.setCookie("checked", t.checked, 7);
      } else {
        t.setCookie("username", "");
        t.setCookie("userpsw", "");
      }
    },
    //获取浏览器cookie
    getCookie: function (key) {
      if (document.cookie.length > 0) {
        var start = document.cookie.indexOf(key + "=");
        if (start !== -1) {
          start = start + key.length + 1;
          var end = document.cookie.indexOf(";", start);
          if (end === -1) end = document.cookie.length;
          return unescape(document.cookie.substring(start, end));
        }
      }
      return "";
    },
    // 设置cookie, 保存cookie  键值 和过期天数
    setCookie: function (username, password, exdays) {
      let userpsw = Base64.encode(password);
      var exdate = new Date();
      exdate.setDate(exdate.getDate() + 24*60*60*1000*exdays);
      //字符串拼接cookie
      window.document.cookie="username"+ "=" +username+";path=/;expires="+exdate.toGMTString()
      window.document.cookie="userpsw"+"="+userpsw+";path=/;expires="+exdate.toGMTString()
    },
    clearCookies() {
      this.setCookie("","",-1) // 修改2值都为空，天数为负1天就好了
    }
  },
};
</script>
 
<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.login-role {
  height: 80px;
  background: linear-gradient(150deg, #2699d2, #3183c6);
}
.role-list {
  width: 1200px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  text-align: center;
  margin: 0 auto;
}
.list-base {
  padding: 31px 15px 31px 15px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.login-content {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.roleactive {
  background: #0566B2;
}
.content-form {
  width: 650px;
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
}
.form-title {
  height: 90px;
  padding: 0 120px 0 120px;
  background-image: url("../../static/images/login_titlebg.png");
  background-size: cover;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: #fff;
}
.form-content {
  background: #f8f8f8;
}
.descfont{
    font-size: 14px;
font-family: Source Han Sans CN;
 
line-height: 44px;
color: #666666;
}
.managetitle {
  font-size: 40px;
  font-family: FZShuSong-Z01;
  padding-left: 30px;
}
.dottline {
  height: 1px;
  background-image: linear-gradient(
    to right,
    #0a73fc 0%,
    #0a73fc 50%,
    transparent 0%
  );
  background-size: 10px 1px;
  background-repeat: repeat-x;
}
.technology-support {
  height: 90px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  line-height: 27px;
  color: #999999;
  opacity: 1;
}
.info-username {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 550px;
}
.usernamelabel {
  width: 80px;
}
.login-info {
  display: flex;
  flex-direction: column;
  // height: 250px;
  padding: 50px 0 50px 0;
  align-items: center;
  justify-content: space-between;
}
.username{
  position: relative;
  margin-bottom: 24px;
  input{
    width: 270px;
    height: 40px;
    margin-left: 10px;
    padding-left: 10px;
    border: 1px solid #DCDFE6;
    border-radius: 4px;
    outline: none;
    color: #606266;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
  input:focus{
    outline: none;
    border-color: #409eff;
  }
}
.info-psw {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 550px;
}
.verification-code{
  color: #008BD6;
  text-decoration: underline;
}
.rand-code{
  cursor: pointer;
}
.rand-code:hover{
  color: #008BD6;
}
.tip{
  position: absolute;
  top: 48px;
  left: 78px;
  font-size: 12px;
  color: #FC0E0E;
}
/deep/.el-form-item__label{
font-size: 16px;
font-family: Source Han Sans CN;
line-height: 44px;
color: #333333;
}
/deep/.verification-code{
    .el-form-item__label{
      color: #008BD6;
      text-decoration: underline;
    }
  }
.login-btn{
  text-align: center;
  button{
    width: 330px;
    height: 44px;
    background: #008bd6;
    border: none;
    border-radius: 4px;
    outline: none;
    color: #fff;
    cursor: pointer;
  }
}
/deep/.login-form{
  .el-input--small{
    width: 280px;
  }
  .el-input--small .el-input__inner{
    height: 44px;
  }
}
/deep/.el-form-item--small.el-form-item{
  margin-bottom: 24px;
}
/deep/.el-form-item--small.el-form-item:last-child{
  margin-bottom: 0;
}
/deep/.save-login{
  margin-bottom: 24px;
  margin-left: 78px;
}
</style>