<template>
  <div id="indexlayout">
    <!-- <left
          :collapsed="collapsed"
          :topNavEnable="topNavEnable"
          :belongTopMenu="belongTopMenu"
          :defaultActive="defaultActive"
          :menuData="permissionMenuData"
        >
        </left>

        <div
          id="indexlayout-right"
          :class="{'fiexd-header': headFixed}"
        >

            <right-top
              :collapsed="collapsed"
              :topNavEnable="topNavEnable"
              
              :menuData="permissionMenuData"
            >              
            </right-top>

            <div class="indexlayout-right-main">
                <permission :roles="routeItem.roles">
                  <router-view></router-view>
                </permission>
                
            </div>

        </div> -->

    <!-- <div class="indexlayout-newtop">
      <div class="selectroles">
        <el-select v-model="rolename" @change="loginout" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
    </div> -->
    <div class="indexlayout-newbot">
      <div class="indexlayout-bot-left">
        <div class="index-user">
          <div class="index-user-title">{{ systitle }}</div>
          <div class="index-user-content">
            <el-avatar
              :size="50"
              @click="edituser"
              :src="circleUrl"
            ></el-avatar>
            <span class="index-user-lvname">{{ lvname }}</span>
          </div>
        </div>
        <!-- <div class="index-store">
          <div class="index-stroe-title">
            门店店员
            <div
              :class="1 == 0 ? 'index-menu-show' : 'index-menu-hidden'"
            ></div>
          </div>
          <div class="index-store-content">
            <el-tree
              :data="data"
              :props="defaultProps"
              @node-click="handleNodeClick"
            ></el-tree>
          </div>
        </div> -->
        <div class="roles">
          <RoleLv
            v-if="rolelv['clerk']"
            title="门店店员"
            nodekey="clerk"
          ></RoleLv>
          <RoleLv
            v-if="rolelv['shopowner']"
            title="门店店长"
            nodekey="shopowner"
          ></RoleLv>
          <RoleLv
            v-if="rolelv['citydistributor']"
            title="市级经销商"
            nodekey="citydistributor"
          ></RoleLv>
          <RoleLv
            v-if="rolelv['provincedistributor']"
            title="省级经销商"
            nodekey="provincedistributor"
          ></RoleLv>
          <RoleLv
            v-if="rolelv['countrydistributor']"
            title="全国经销商"
            nodekey="countrydistributor"
          ></RoleLv>
          <SystemManage title="内部管理"></SystemManage>
        </div>
      </div>

      <div class="indexlayout-bot-right">
        <permission :roles="routeItem.roles">
          <router-view></router-view>
        </permission>
      </div>
    </div>
    <div class="indexlayout-newsup">
      <span style="color: #333">技术支持单位：</span>
      <span style="color: #2a78d2"
        >深圳凯华技术有限公司&nbsp;&nbsp;&nbsp;&nbsp;</span
      >
      <span style="color: #333"> 技术支持电话：0755-83825745 </span>
    </div>

    <!-- 个人设置弹窗 -->

    <div v-if="dialogVisible" class="edituser-modal">
      <div class="modal-userinfo">
      <div class="modal-top">
        <div class="modal-title">个人设置</div>
        <div class="modalbtns">
          <div class="modalbtn" @click="saveuser">
            <img src="../../assets/images/ic-save.png" class="modalben-img" />
            <span>应用</span>
          </div>
          <div class="modalbtn" style="margin-left:20px" @click="escclick">
            <img src="../../assets/images/ic-esc.png" class="modalben-img" />
            <span>退出</span>
          </div>
        </div>
      </div>
      <div class="modal-bot">
        <div class="modalbot-left">
          <div class="modalbot-menu" :class="selectmenu=='baseinfo'?'modalmunebg':''"   @click="changemenu('baseinfo')">基本信息</div>
          <div class="modalbot-menu" :class="selectmenu=='userseting'?'modalmunebg':''" @click="changemenu('userseting')">个人设置</div>
        </div>
        <div class="modalbot-right">
          <div v-if="selectmenu=='baseinfo'" class="modal-baseinfo">
            <div class="baseinfo-left">
              <div class="baseinfo-info">
                  <div class="baseinfo-title">用户名称：</div>
                  <div class="baseinfo-content">
                    <input class="baseinfo-input" disabled="disabled" v-model="userinfo.name" />
                  </div>
              </div>
            <div class="baseinfo-info">
                  <div class="baseinfo-title">所属门店：</div>
                  <div class="baseinfo-content">
                    <input class="baseinfo-input" disabled="disabled" v-model="userinfo.storeName" />
                  </div>
              </div>
              <div class="baseinfo-info">
                  <div class="baseinfo-title">联系号码：</div>
                  <div class="baseinfo-content">
                    <input class="baseinfo-input" disabled="disabled" v-model="userinfo.telNum" />
                  </div>
              </div>
            </div>
            <div class="baseinfo-right">
                <div class="baseinfo-info">
                  <div class="baseinfo-title">用户账号：</div>
                  <div class="baseinfo-content">
                    <input class="baseinfo-input" disabled="disabled" v-model="userinfo.idNumber" />
                  </div>
              </div>
                <div class="baseinfo-info">
                  <div class="baseinfo-title">用户角色：</div>
                  <div class="baseinfo-content">
                    <input class="baseinfo-input" disabled="disabled" v-model="userinfo.station" />
                  </div>
              </div>
                <div class="baseinfo-info">
                  <div class="baseinfo-title">用户密码：</div>
                  <div class="baseinfo-content">
                    <input class="baseinfo-input" type="password" />
                  </div>
              </div>
              
            </div>
          </div>
          <div v-else class="modal-userseting"></div>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { StateType as GlobalStateType } from "@/store/global";
import { StateType as UserStateType } from "@/store/user";
import store from "../../store";
import {
  vueRoutes,
  RoutesDataItem,
  getRouteItem,
  getSelectLeftMenuPath,
  formatRoutePathTheParents,
  getRouteBelongTopMenu,
  getBreadcrumbRoutes,
  BreadcrumbType,
  getPermissionMenuData,
} from "@/utils/routes";
import { mergeUnique as ArrayMergeUnique } from "@/utils/array";
import useTitle from "@/composables/useTitle";
import IndexLayoutRoutes from "./routes";
import Permission from "@/components/Permission/index.vue";
import Left from "./components/Left.vue";
import RightTop from "./components/RightTop.vue";
import RoleLv from "./components/RoleLv.vue";
import SystemManage from "./components/SystemManage.vue";
import httpreques from "../../utils/httpreques";
interface IndexLayoutSetupData {
  collapsed: boolean;
  toggleCollapsed: () => void;
  topNavEnable: boolean;
  belongTopMenu: string;
  headFixed: boolean;
  defaultActive: string;
  breadCrumbs: BreadcrumbType[];
  permissionMenuData: RoutesDataItem[];
  routeItem: RoutesDataItem;
}

export default defineComponent({
  name: "IndexLayout",
  components: {
    Permission,
    Left,
    RightTop,
    RoleLv,
    SystemManage,
  },
  data() {
    return {
      options: [
        {
          value: "CUSTOMER",
          label: "消费者",
        },
        {
          value: "STORE",
          label: "门店",
        },
        {
          value: "LOGISTICS",
          label: "物流配送",
        },
        {
          value: "WAREHOUSE",
          label: "物流仓库",
        },
        {
          value: "FACTORY",
          label: "工厂 ",
        },
        {
          value: "INSURANCE",
          label: "保险机构 ",
        },
        {
          value: "BANK",
          label: "银行机构",
        },
        {
          value: "KAIHUA",
          label: "凯华公司",
        },
      ],
      rolename: "",
      systitle: "",
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      lvname: "", //职称
      data: [
        {
          label: "进货",
          children: [
            {
              label: "待进货",
            },
            {
              label: "已进货",
            },
          ],
        },
        {
          label: "收货",
          children: [
            {
              label: "待收货",
            },
            {
              label: "已收货",
            },
          ],
        },
        {
          label: "盘货",
          children: [
            {
              label: "待盘货",
            },
            {
              label: "已盘货",
            },
          ],
        },
      ],
      rolelv: {
        clerk: "clerk",
        shopowner: "shopowner",
        citydistributor: "citydistributor",
      }, //角色多重身份 利用对象属性值的特性，判断加载的身份组件。【非路由权限方式加载组件菜单，与store文件夹下user.ts权限对应。否则有菜单，无权限，跳转404页面】
      dialogVisible: false,
      selectmenu:'baseinfo',
      userinfo:{},
    };
  },
  mounted() {
    let rolename = JSON.parse(localStorage.getItem("roleEnum"));
    let systitle = "";
    switch (rolename) {
      case "CUSTOMER":
        rolename = "消费者";
        systitle = "消费者系统";
        break;
      case "STORE":
        rolename = "门店";
        systitle = "门店管理系统";
        break;
      case "LOGISTICS":
        rolename = "物流配送";
        systitle = "物流配送管理系统";
        break;
      case "WAREHOUSE":
        rolename = "物流仓库";
        systitle = "物流仓库管理系统";
        break;
      case "FACTORY":
        rolename = "工厂";
        systitle = "工厂管理系统";
        break;
      case "INSURANCE":
        rolename = "保险机构";
        systitle = "保险机构管理系统";
        break;
      case "BANK":
        rolename = "银行机构";
        systitle = "银行管理系统";
        break;
      case "KAIHUA":
        rolename = "凯华公司";
        systitle = "凯华内部管理系统";
        break;
      default:
        break;
    }

    this.rolename = "系统用户：  " + rolename;
    this.systitle = "用户：   " + systitle;
    this.lvname = this.$store.state.user.currentUser.name;
  },
  methods: {
    async loginout() {
      let t = this;
      await t.$store.dispatch("user/logout");
      t.$router.push({ path: "/user/login" });
    },
    getdata(){
         let t = this;
         const loginuser = JSON.parse(localStorage.getItem('loginuser'));
        
         let params ={
           idCard:loginuser.userDetails.idNumber
         };
         httpreques(
          "post",
           params,
          "/realbrand-management-service/StoreUserMgt/StoreUser"
        ).then((res) => {
          if (res.data.code == "SUCCESS") {
            //对象数据处理
            t.userinfo = res.data.data;
          } else {
            //接口错误处理
            t.$message.error(res.data.msg);
          }
        });
    },
    //个人设置
    edituser() {
      let t = this;
      t.dialogVisible = true;
      t.getdata();
    },
    //菜单切换
    changemenu(menu){
      let t =this;
      t.selectmenu = menu;
    },
    //保存设置
    saveuser(){
          
    },
    //退出
    escclick(){
        let t = this;
      t.dialogVisible = false;
    }
  },
  setup(): IndexLayoutSetupData {
    const store = useStore<{
      global: GlobalStateType;
      user: UserStateType;
    }>();
    const route = useRoute();

    // 所有菜单路由
    const menuData: RoutesDataItem[] = vueRoutes(IndexLayoutRoutes);

    // 当前路由 item
    const routeItem = computed<RoutesDataItem>(() =>
      getRouteItem(route.path, menuData)
    );

    // 有权限的菜单
    const permissionMenuData = computed<RoutesDataItem[]>(() =>
      getPermissionMenuData(store.state.user.currentUser.roles, menuData)
    );

    // 当前路由的顶部菜单path
    const belongTopMenu = computed<string>(() =>
      getRouteBelongTopMenu(routeItem.value)
    );

    // 当前路由的父路由path[]
    const routeParentPaths = computed<string[]>(() =>
      formatRoutePathTheParents(routeItem.value.path)
    );

    // 收缩左侧
    const collapsed = computed<boolean>(() => store.state.global.collapsed);
    const toggleCollapsed = (): void => {
      store.commit("global/changeLayoutCollapsed", !collapsed.value);
    };

    // 右侧顶部导航是否开启
    const topNavEnable = computed<boolean>(
      () => store.state.global.topNavEnable
    );

    // 右侧顶部是否固定
    const headFixed = computed<boolean>(() => store.state.global.headFixed);

    // 左侧选择的菜单
    const defaultActive = computed<string>(() =>
      getSelectLeftMenuPath(routeItem.value)
    );

    // 面包屑导航
    const breadCrumbs = computed<BreadcrumbType[]>(() =>
      getBreadcrumbRoutes(routeItem.value, routeParentPaths.value, menuData)
    );

    // 设置title
    useTitle(routeItem);

    return {
      collapsed: (collapsed as unknown) as boolean,
      toggleCollapsed,
      topNavEnable: (topNavEnable as unknown) as boolean,
      belongTopMenu: (belongTopMenu as unknown) as string,
      headFixed: (headFixed as unknown) as boolean,
      defaultActive: (defaultActive as unknown) as string,
      breadCrumbs: (breadCrumbs as unknown) as BreadcrumbType[],
      permissionMenuData: (permissionMenuData as unknown) as RoutesDataItem[],
      routeItem: (routeItem as unknown) as RoutesDataItem,
    };
  },
});
</script>
<style lang="scss" scoped>
@import "../../assets/css/variables.scss";
#indexlayout {
  display: flex;
  height: 100vh;
  overflow: hidden;
  flex-direction: column;
  background: #f2f6fb;
}
#indexlayout-right {
  position: relative;
  flex: 1;
  overflow: auto;
  background-color: $mainBgColor;
  &.fiexd-header {
    display: flex;
    flex-direction: column;
    .indexlayout-right-main {
      flex: 1;
      overflow: auto;
      background-color: #f6faff;
      // padding: 16px;
    }
  }
}
.indexlayout-main-conent {
  margin: 24px;
  position: relative;
}

.selectroles {
  width: 240px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.indexlayout-newtop {
  height: 62px;
  background: #146ed6;
  opacity: 1;
  width: 100%;
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
}
.indexlayout-newbot {
  display: flex;
  flex-direction: row;
  padding-top: 10px;
  flex: 1;
  position: fixed;
  top: 0px;
  left: 0;
  width: 100vw;
}
.indexlayout-bot-left {
  position: relative;
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.index-user {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  border: 1px solid #b8d0f2;
}
.index-user-title {
  width: 180px;
  height: 38px;
  background: #ecf3fb;
  font-size: 14px;
  border-bottom: 1px solid #b8d0f2;
  font-family: Source Han Sans CN;
  font-weight: 500;
  color: #333333;
  line-height: 38px;
  padding-left: 10px;
  box-sizing: border-box;
  font-weight: bold;
}
.index-user-content {
  width: 180px;
  height: 116px;
  background: #ffffff;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.index-user-lvname {
  font-size: 14px;
  font-family: Source Han Sans CN;

  color: #222222;
  font-weight: bold;
  padding-top: 10px;
}
.indexlayout-bot-right {
  flex: 1;
  box-sizing: border-box;
  padding: 0 10px 10px 0;
  width: 1200px;
}

.indexlayout-newsup{
  height: 38px;
  width: 100vw;
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: #f2f6fb;
  font-size: 12px;
}
.edituser-modal {
  position: fixed;
  z-index: 2002;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.modal-userinfo{
  width: 924px;
  height: 580px;
  background: #FFFFFF;
  display: flex;
  flex-direction: column;
 
}
.modal-title{
  font-size: 16px;
font-family: Source Han Sans CN;
 
 font-weight: bold;
color: #333333;
}
.modal-top {
  height: 48px;
  width: 100%;
  background: #ebebeb;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0 20px 0 20px;
}
.modalbtns{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.modalbtn{
  font-size: 16px;
font-family: Source Han Sans CN;
 
color: #333333;
display: flex;
align-items: center;
width: 68px;
height: 30px;
border: 1px solid #C0C0C0;
background: linear-gradient(180deg, #F9F9F9 0%, #E3E3E3 100%);
border-radius: 2px;
justify-content: space-evenly;
box-sizing: border-box;
 cursor: pointer;
}
.modal-bot{
  flex: 1;
  display: flex;
  flex-direction: row;
}
.modalbot-left{
  width: 124px;
  height: 100%;
  background: #F3F3F3;
  box-sizing: border-box;
  padding-top: 20px ;
}
.modalbot-menu{
  height: 38px;
  width: 124px;
  
  font-size: 14px;
  font-family: Source Han Sans CN;
   text-align: center;
line-height: 38px;
color: #3F4551;
cursor: pointer;
}
.modalmunebg{
background: #fff;
}
.modal-baseinfo{
  display: flex;
  flex-direction: row;
}
.baseinfo-info{
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  padding: 20px 0 0 30px;
  font-size: 14px;
font-family: Source Han Sans CN;
 
 
color: #666666;
align-items: center;

}
.baseinfo-right{
  padding-left: 100px;
}
.baseinfo-input{
  width: 180px;
 height: 26px;
 background: #F5F5F5;
 border: 1px solid #DDDDDD; 
  outline: none;
}
/deep/.el-input__inner {
  background-color: #0054b7;
  background-image: none;
  border-radius: 4px;
  border: none;
  color: #fff;
  font-size: 14px;
  font-family: Source Han Sans CN;
}
/deep/.el-input__inner:hover {
  border: none;
}
.roles {
  height: calc(100% - 193px);
  border: 1px solid #b8d0f2;
}
</style>