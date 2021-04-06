<template>
  <div class="login">
    <div class="login-info">
      <div class="info-logo">
        <div class="logo-content">
          <el-image
            class="logo-img"
            :src="require('@/static/images/login_logo.png')"
            fit="cover"
          ></el-image>
          <span class="logo-title">门店终端管理后台</span>
        </div>
      </div>
      <div class="info-user">
        <div class="user-content">
          <div class="user-title">欢迎登录</div>
          <div class="user-input">
            <InputUserName
              @username="getusername"
              :cookieval="username"
            ></InputUserName>
            <InputUserPsw
              @userpsw="getuserpsw"
              @onenter="onenter"
              :cookieval="userpsw"
            ></InputUserPsw>
            <div class="user-isremember">
              <el-checkbox style="float: right" v-model="isremember"
                >记住用户名</el-checkbox
              >
            </div>
          </div>
          <div class="user-btn">
            <button class="btn-login" @click="loginsystem">
              <span class="btn-text">立即登录</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="technicalfont">技术支持：凯华技术有限公司</div>
  </div>
</template>
<script>
import InputUserName from "../../components/login/InputUserName";
import InputUserPsw from "../../components/login/InputUserPsw";
import store from "../../store";
const Base64 = require("js-base64").Base64;
import httpreques from "../../utils/httpreques";
export default {
  name: "Login",
  components: { InputUserName, InputUserPsw },
  data() {
    return {
      isremember: false,
      username: "",
      userpsw: "",
    };
  },
  mounted() {
    // 在页面加载时从cookie获取登录信息
    let t = this;
    let username = this.getCookie("username");
    let userpsw = Base64.decode(this.getCookie("userpsw")); //密码进行base64解密 cookie不保存明文，所以需要解密才能赋值
    // 如果存在赋值给表单，并且将记住密码勾选
    if (username) {
      t.username = username;
      t.userpsw = userpsw;
      t.isremember = true;
    }
    //  t.getdata();
  },
  methods: {
    //获取用户名
    getusername(val) {
      let t = this;
      t.username = val;
    },
    //获取用户密码
    getuserpsw(val) {
      let t = this;
      t.userpsw = val;
    },
    //登录
    async loginsystem() {
      let t = this;
      let loginparams = {
        idNumber: t.username,
        password: t.userpsw,
        roleEnum: 'STORE'
        // customer    消费者
        // store           门店
        // logistics       物流配送
        // warehouse  物流仓库
        // factory        工厂
        // insurance     保险机构
        // bank            银行
        // government 政府机构
        // kaihua          凯华平台
      };
        //  localStorage.removeItem('loginuser');
      httpreques("post", loginparams, "/managementLogin").then((res) => {
        console.log(res);
        if (res.data.code == "SUCCESS") {
          console.log("1111111111111");
          console.log(res.data.data);
          localStorage.setItem("loginuser", JSON.stringify(res.data.data));

          store.dispatch("loginsucess", "ok");
          t.$message({
            message: "登录成功",
            type: "success",
          });
          t.$router.push({ path: "/" });
          // 储存登录信息
          t.setUserInfo();
        } else {
          t.$message.error("账号或密码错误！");
        }
      });
    },
    //密码enter调起登录
    onenter() {
      let t = this;
      t.loginsystem();
    },
    // 储存表单信息
    setUserInfo: function () {
      let t = this;
      // 判断用户是否勾选记住密码，如果勾选，向cookie中储存登录信息，
      // 如果没有勾选，储存的信息为空
      if (t.isremember) {
        t.setCookie("username", t.username, 7);
        // base64加密密码
        let userpsw = Base64.encode(t.userpsw);
        t.setCookie("userpsw", userpsw, 7);
        t.setCookie("isremember", t.isremember, 7);
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
    // 保存cookie  键值 和过期天数
    setCookie: function (cName, value, expiredays) {
      var exdate = new Date();
      exdate.setDate(exdate.getDate() + expiredays);
      document.cookie =
        cName +
        "=" +
        decodeURIComponent(value) +
        (expiredays == null ? "" : ";expires=" + exdate.toGMTString());
    },
  },
};
</script>
<style lang="scss" src="../../static/scss/login.scss"  scoped>
</style>