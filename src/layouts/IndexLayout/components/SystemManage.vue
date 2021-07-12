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
  props: ["title"],
  data() {
    return {
      showstatus: false,
      nodekey: "systemmanage",
      data: [
        {
          id: 1,
          label: "门店配置",
          key: "store",
        },
        {
          id: 2,
          label: "人员配置",
          key: "user",
          children:[
            {
              id: 2,
              label: "人员管理",
              key: "user",
            },
            {
              id: 19,
              label: "消费者管理",
              key: "consumerlist",
            }
          ]
        },
        {
          id: 3,
          label: "商品配置",
          key: "commodity",
          children:[
            {
              id: 11,
              label: "商品类别设置",
              key: "commodity1",
            },
            {
              id: 12,
              label: "商品列表",
              key: "commodity",
            },
            {
              id: 13,
              label: "上架中商品列表",
              key: "commodity2",
            },
          ]
        },
        {
          id: 4,
          label: "机具配置",
          key: "machines",
        },
        {
          id: 5,
          label: "广告管理",
          key: "advertment",
        },
        {
          id: 8,   //外面这层不用在js写出来，是这个外层需要的东西
          label: "活动管理",
          key: "promotion",
          children:[
            {
              id: 18,
              label: "主题设置",
              key: "theme",
            },
            {
              id: 8,
              label: "活动列表",
              key: "promotion",
            },
            {
              id: 9,
              label: "活动商品列表",
              key: "Sellinglist",
            },
          ]
        },
        {
          id: 14,
          label: "积分管理",
          key: "integralrule",
          children:[
            {
              id: 15,
              label: "规则设置",
              key: "integralrule",
            },
            {
              id: 16,
              label: "会员等级设置",
              key: "memberset",
            },
            {
              id: 17,
              label: "积分对象",
              key: "integralobj",
            },
          ]
        },
        {
          id: 6,
          label: "对公账户",
          key: "public",
        },
        {
          id: 7,
          label: "文件管理",
          key: "file",
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
            case "store":
              key = 1;
              break;
            case "user":
              key = 2;
              break;
            case "machines":
              key = 3;
              break;
            case "commodity":
              key = 4;
              break;
            case "advertment":
              key = 5;
              break;
            case "public":
              key = 6;
              break;
            case "file":
              key = 7; 
              break;
            case "promotion":
              key = 8; 
              break;
            case "Sellinglist":
              key = 9; 
              break;
            case "commodity1":
              key = 10; 
              break;
            case "commodity2":
              key = 11; 
              break;
            case "integralrule":
              key = 15; 
              break;
            case "memberset":
              key = 16; 
              break;
            case "integralobj":
              key = 17; 
              break;
            case "theme":
              key = 18; 
              break;
            case "consumerlist":
              key = 19; 
              break;
            default:
              key = 4;
              break;
          }
          // this.$refs.vueTree2.setCurrentKey(key);
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
        case "store":
          path = "/setting/storelist";
          break;
        case "user":
          path = "/setting/clerklist";
          break;
        case "machines":
          path = "/setting/machine";
          break;
        case "commodity":
          path = "/product";
          break;
        case "commodity1":
          path = "/commodity1";
          break;
        case "commodity2":
          path = "/commodity2";
          break;
        case "advertment":
          path = "/setting/advertmentlist";
          break;
        case "public":
          path = "/setting/public";
          break;
        case "file":
          path = "/setting/file";
          break;
        case "promotion":
          path = "/setting/promotion";
          break;
        case "Sellinglist":
          path = "/setting/Sellinglist";
          break;
        case "commodity1":
          path = "/commodity1";
          break;
        case "commodity2":
          path = "/commodity2";
          break;
        case "integralrule":
          path = "/setting/integral/integralrule";
          break;
        case "memberset":
          path = "/setting/integral/memberset";
          break;
        case "integralobj":
          path = "/setting/integral/integralobj";
          break;
        case "theme":
          path = "/setting/theme";
          break;
        case "consumerlist":
          path = "/setting/consumerlist";
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
  // border-top: 1px solid #b8d0f2;
  // border-bottom: 1px solid #b8d0f2;
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
/deep/.el-tree-node__expand-icon.expanded{
  transform:none; 
}
</style>>
 