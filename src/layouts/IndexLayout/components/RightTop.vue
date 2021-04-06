<template>
  <div id="indexlayout-right-top" :class="{ topNavEnable: !topNavEnable }">
    <div class="indexlayout-right-top-top">
      <!-- <div class="indexlayout-flexible" 
              @click="() => {
                if(toggleCollapsed) {
                  toggleCollapsed();
                }
              }"
            >
               <i class="el-icon-s-fold" ></i>
            </div> -->
      <div class="indexlayout-top-menu">
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
        <div ref="topMenuCon" :style="{ width: topMenuWidth }">
          <template v-if="topNavEnable">
            <template v-for="(item, key) in menuData">
              <a-link
                :key="key"
                v-if="!item.hidden"
                :to="item.path"
                :class="{ active: belongTopMenu === item.path }"
                class="indexlayout-top-menu-li"
              >
                {{ t(item.title) }}
              </a-link>
            </template>
          </template>
          <bread-crumbs
            v-else
            class="breadcrumb"
            :list="breadCrumbs"
          ></bread-crumbs>
        </div>
      </div>
      <div class="indexlayout-top-menu-right">
        <right-top-user />
      </div>
    </div>
    <!-- 禁用面包屑 -->
    <!-- <div v-if="topNavEnable" class="indexlayout-right-top-bot">
            <div class="indexlayout-right-top-bot-home">
              <i class="el-icon-s-home"></i>
            </div>
            <bread-crumbs class="breadcrumb" :list="breadCrumbs"></bread-crumbs>
        </div> -->
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, PropType, Ref, toRefs } from "vue";
import { useI18n } from "vue-i18n";
import { BreadcrumbType, RoutesDataItem } from "@/utils/routes";
import BreadCrumbs from "@/components/BreadCrumbs/index.vue";

import ALink from "@/components/ALink/index.vue";

import RightTopUser from "./RightTopUser.vue";
import useTopMenuWidth from "../composables/useTopMenuWidth";
import store from "../../../store.js";

interface RightTopSetupData {
  t: Function;
  topMenuCon: Ref;
  topMenuWidth: Ref;
}

export default defineComponent({
  name: "RightTop",
  components: {
    ALink,
    BreadCrumbs,
    RightTopUser,
  },
  props: {
    collapsed: {
      type: Boolean,
      default: false,
    },
    topNavEnable: {
      type: Boolean,
      default: true,
    },
    belongTopMenu: {
      type: String,
      default: "",
    },
    toggleCollapsed: {
      type: Function as PropType<() => void>,
    },
    breadCrumbs: {
      type: Array as PropType<BreadcrumbType[]>,
      default: [],
    },
    menuData: {
      type: Array as PropType<RoutesDataItem[]>,
      default: [],
    },
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
    };
  },
  mounted() {
    let rolename = JSON.parse(localStorage.getItem("roleEnum"));

    switch (rolename) {
      case "CUSTOMER":
        rolename = "消费者";
        break;
      case "STORE":
        rolename = "门店";
        break;
      case "LOGISTICS":
        rolename = "物流配送";
        break;
      case "WAREHOUSE":
        rolename = "物流仓库";
        break;
      case "FACTORY":
        rolename = "工厂";
        break;
      case "INSURANCE":
        rolename = "保险机构";
        break;
      case "BANK":
        rolename = "银行机构";
        break;
      case "KAIHUA":
        rolename = "凯华公司";
        break;
      default:
        break;
    }

    this.rolename = "系统用户：  "+ rolename;
  },
  methods: {
    async loginout() {
      let t = this;
      await store.dispatch("user/logout");
      t.$router.push({ path: "/user/login" });
    },
  },
  setup(props): RightTopSetupData {
    const { t } = useI18n();
    const { topNavEnable } = toRefs(props);

    const { topMenuCon, topMenuWidth } = useTopMenuWidth(topNavEnable);

    return {
      t,
      topMenuCon,
      topMenuWidth,
    };
  },
});
</script>
<style lang="scss">
@import "../../../assets/css/global.scss";
#indexlayout-right-top {
  width: 100%;
  height: ($headerHeight + $headerBreadcrumbHeight);
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  z-index: 9;
  background: #fff;

  .indexlayout-right-top-top {
    display: flex;
    width: 100%;
    height: $headerHeight;
    background-color: $menu-dark-bg;
    color: #c0c4cc;

    .indexlayout-flexible {
      width: $headerHeight;
      height: $headerHeight;
      line-height: $headerHeight;
      text-align: center;
      cursor: pointer;
      &:hover {
        background-color: $menu-dark-submenu-bg;
        color: $menu-dark-highlight-color;
      }
    }

    .indexlayout-top-menu {
      height: $headerHeight;
      line-height: $headerHeight;
      flex: 1;
      /* display: flex; */
      overflow: hidden;
      overflow-x: auto;
      .el-input--small .el-input__inner {
        background-color: rgb(44, 48, 57);
        color: #fff;
        border-color: rgb(44, 48, 57);
        font-weight: bold;
      }
      .indexlayout-top-menu-li {
        display: inline-block;
        padding: 0 15px;
        height: ($headerHeight - 3);
        text-decoration: none;
        color: #c0c4cc;
        font-size: 15px;
        border-bottom: solid 3px transparent;
        &:hover,
        &.active {
          background-color: $menu-dark-submenu-bg;
          color: $menu-dark-highlight-color;
          border-bottom-color: $--color-primary;
        }
      }

      .breadcrumb {
        line-height: $headerHeight;
      }
    }

    .indexlayout-top-menu-right {
      width: 180px;
      display: flex;
      flex-direction: row;
      align-items: center;
      .indexlayout-top-usermenu {
        padding-left: 10px;
        color: #fff;
      }
      .indexlayout-top-selectlang {
        padding-left: 10px;
        .dropDown {
          i {
            font-size: 16px;
            color: #c0c4cc;
          }
        }
      }
    }

    @include scrollbar;
  }
  .indexlayout-right-top-bot {
    display: flex;
    width: 100%;
    height: $headerBreadcrumbHeight;
    background-color: $mainBgColor;
    .indexlayout-right-top-bot-home {
      width: $headerBreadcrumbHeight;
      height: $headerBreadcrumbHeight;
      line-height: $headerBreadcrumbHeight;
      text-align: center;
    }
    .breadcrumb {
      line-height: $headerBreadcrumbHeight;
      margin-left: 10px;
    }
  }
  &.topNavEnable {
    height: $headerHeight;
    .indexlayout-right-top-top {
      background-color: rgb(63, 69, 81);
      color: $--color-text-primary;
      .indexlayout-flexible {
        &:hover {
          background-color: $mainBgColor;
          color: $heading-color;
        }
      }
      .indexlayout-top-menu-right {
        .indexlayout-top-message {
          color: $heading-color;
        }
        .indexlayout-top-usermenu {
          color: $heading-color;
        }
        .indexlayout-top-selectlang {
          .dropDown {
            i {
              color: $heading-color;
            }
          }
        }
      }
    }
  }
}
</style>