<template>
  <div class="index-manage">
    <div class="index-stroe-title">
      {{ title }}
      <div
        @click="changestatus()"
        :class="showstatus == false ? 'index-menu-show' : 'index-menu-hidden'"
      ></div>
    </div>
    <div
      class="index-manage-content"
      :class="showstatus == false ? 'contenthidden' : ''"
    >
      <el-tree
        :data="data"
        :props="defaultProps"
        @node-click="handleNodeClick"
        highlight-current
        node-key="id"
        ref="vueTree2"
      ></el-tree>
    </div>
  </div>
</template>

<script>
export default {
  name:"Khcommodity",
  props: ["title"],
  data() {
    return {
      showstatus: false,
      nodekey: "khcommodity",
      data: [
        {
          id: 1,
          label: "消费者侧",
          key: "customer",
        },
        {
          id: 2,
          label: "门店侧",
          key: "store",
        },
        {
          id: 3,
          label: "物流配送侧",
          key: "logistics",
        },
        {
          id: 4,
          label: "物流仓库侧",
          key: "warehouse",
        },
        {
          id: 5,
          label: "工厂侧",
          key: "factory",
        },
        {
          id: 6,
          label: "保险机构侧",
          key: "insurance",
        },
        {
          id: 7,
          label: "银行机构侧",
          key: "bank",
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  mounted() {
    //是否展开状态判断。
    let stu = true;
    let stuobj = JSON.parse(localStorage.getItem(this.nodekey));
    if (stuobj) {
      stu = stuobj[this.nodekey];
    }
    this.showstatus = stu;
    let selectmenu = JSON.parse(localStorage.getItem("selectmenu"));
    //判断组件选中高亮
    if (selectmenu) {
      if (selectmenu.nodekey == this.nodekey) {
        this.$nextTick(() => {
          let key = 0;
          switch (selectmenu.pathname) {
            case "customer":
              key = 1;
              break;
            case "store":
              key = 2;
              break;
            case "logistics":
              key = 3;
              break;
            case "warehouse":
              key = 4;
              break;
            case "factory":
              key = 5;
              break;
            case "insurance":
              key = 6;
              break;
            case "bank":
              key = 7; //预留文件管理
              break;
            default:
              key = 4;
              break;
          }
          this.$refs.vueTree2.setCurrentKey(key);
        });
      }
    } else {
      this.$nextTick(() => {
        this.$refs.vueTree2.setCurrentKey(4);
      });
    }
  },
  methods: {
    //显示隐藏
    changestatus() {
      let t = this;
      t.showstatus = !t.showstatus;
      //存储展开状态
      let nodekey = t.nodekey;
      let menuobj = {};
      menuobj[nodekey] = t.showstatus;
      localStorage.setItem(nodekey, JSON.stringify(menuobj));
    },
    handleNodeClick(obj) {
     
      let path = "";
      let pathname = "";
      switch (obj.key) {
        case "customer":
          path = "/sysuser/customer";
          break;
        case "store":
          path = "/sysuser/store";
          break;
        case "logistics":
          path = "/sysuser/logistics";
          break;
        case "warehouse":
          path = "/sysuser/warehouse";
          break;
        case "factory":
          path = "/sysuser/factory";
          break;
        case "insurance":
          path = "/sysuser/insurance";
          break;
        case "bank":
          path = "/sysuser/bank";
          break;
        default:
          break;
      }
      if (path) {
        let selectmenu = {
          nodekey: this.nodekey,
          pathname: obj.key,
        };
        localStorage.setItem("selectmenu", JSON.stringify(selectmenu)); //需要在此处判断，路由跳转才缓存
        this.$router.push({
          path: path,
          query: {}, //后续传递当前级别
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
/* 
店长组件样式
*/
.index-manage {
  width: 160px;
  border-top: 1px solid #b8d0f2;
  border-bottom: 1px solid #b8d0f2;
  // padding-top: 16px;
}
.index-stroe-title {
  height: 38px;
  // background: #ecf3fb;
  font-size: 14px;
  font-family: Source Han Sans CN;
  font-weight: 500;
  color: #333333;
  line-height: 38px;
  padding-left: 10px;
  padding-right: 10px;
  box-sizing: border-box;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.index-menu-hidden {
  width: 16px;
  height: 16px;
  background: #ffffff;
  border: 1px solid #a0c3f1;
  border-radius: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.index-menu-hidden::before {
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  width: 8px;
  margin-left: -3.5px;
  margin-top: -1px;
  border-top: 2px solid;
  background: #2a78d2;
}
.index-menu-show {
  width: 16px;
  height: 16px;
  background: #ffffff;
  border: 1px solid #a0c3f1;
  border-radius: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
//横
.index-menu-show::before {
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  width: 8px;
  margin-left: -3.5px;
  margin-top: -1px;
  border-top: 2px solid;
  background: #2a78d2;
}
//竖
.index-menu-show::after {
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  height: 8px;
  margin-left: -0.5px;
  margin-top: -4px;
  border-left: 2px solid;
  background: #2a78d2;
}
.index-manage-content {
  background: #fff;
  // padding: 10px 0 10px 0;
}
.contenthidden {
  display: none !important;
}
/deep/.el-tree-node__content > .el-tree-node__expand-icon{
  padding-left: 20px;
}
</style>>