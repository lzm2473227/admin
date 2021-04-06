<template>
    <div id="indexlayout-left" :class="{'narrow': collapsed}">
        <div class="indexlayout-left-logo">
            <router-link to="/" class="logo-url">
                <!-- <img v-if="collapsed" alt="Vue logo" src="../../../assets/images/logo.png" width="30"> -->
                <!-- <h3 v-else class="logo-title">正品汇&nbsp;&nbsp;</h3> -->
                
                <span class="logotitle2" v-if="collapsed==false">{{roletitle}}</span>
            </router-link>
        </div>
        <div class="indexlayout-left-menu">
            <sider-menu
              :collapsed="collapsed"
              :topNavEnable="topNavEnable"
              :belongTopMenu="belongTopMenu"
              :defaultActive="defaultActive"
              :menuData="menuData"
            >
            </sider-menu>
        </div>
    
    </div>
</template>
<script lang="ts">
import { defineComponent, PropType} from "vue";
import { RoutesDataItem } from '@/utils/routes';
import SiderMenu from './SiderMenu.vue';
export default defineComponent({
    name: 'Left',
    props: {
      collapsed: {
        type: Boolean,
        default: false
      },
      topNavEnable: {
        type: Boolean,
        default: true
      },
      belongTopMenu: {
        type: String,
        default: ''
      },
      defaultActive: {
          type: String,
          default: ''
      },
      menuData: {
        type: Array as PropType<RoutesDataItem[]>,
        default: []
      }
    },
    components: {   
        SiderMenu,   
    },
    data(){
      return {
        roletitle:"",
      }
    },
    mounted(){
       let rolename = JSON.parse(localStorage.getItem("roleEnum"));
    switch (rolename) {
      case "CUSTOMER":
        rolename = "消费者系统";
        break;
      case "STORE":
        rolename = "门店管理系统";
        break;
      case "LOGISTICS":
        rolename = "物流配送管理系统";
        break;
      case "WAREHOUSE":
        rolename = "物流仓库管理系统";
        break;
      case "FACTORY":
        rolename = "工厂管理系统";
        break;
      case "INSURANCE":
        rolename = "保险机构管理系统";
        break;
      case "BANK":
        rolename = "银行管理系统";
        break;
      case "KAIHUA":
        rolename = "凯华内部管理系统";
        break;
      default:
        break;
    }

 
    this.roletitle = rolename;
    
    }
 
})
</script>
<style lang="scss" scoped>
@import '../../../assets/css/global.scss';
#indexlayout-left {
  display: flex;
  flex-direction: column;
  width: $leftSideBarWidth;
  height: 100vh;
  background-color: #3f4551;
  color: #c0c4cc;
  transition-duration: 0.1s;
  .indexlayout-left-logo {
    width: 100%;
    height: $headerHeight;
    line-height: $headerHeight;
    text-align: center;
    vertical-align: middle;
    background-color: #3f4551;
    .logo-url {
      display: inline-block;
      width: 100%;
      height: 100%;
      overflow: hidden;
      .logo-title {
        display: inline-block;
        margin: 0;
        font-size: 24px;
        font-family: Roboto, sans-serif;
        color: #c0c4cc;
      }
    }
    img {
      vertical-align: middle;
    }
  }
  .logotitle2{
    font-size: 16px;
    color: #c0c4cc;
    font-weight: bold;
  }

  .indexlayout-left-menu {
    flex: 1;
    overflow: hidden auto;
    // height: calc(100vh);

    .left-scrollbar {
      width: 100%;
      height: 100%;
    }
  }

  &.narrow {
    width: $menu-collapsed-width;
  }

  @include scrollbar;

}

</style>