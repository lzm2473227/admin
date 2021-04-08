<template>
  <div class="index-store">
    <div class="index-stroe-title">
      {{ title }}
      <div
        @click="changestatus()"
        :class="showstatus == false ? 'index-menu-show' : 'index-menu-hidden'"
      ></div>
    </div>
    <div
      class="index-store-content"
      :class="showstatus == false ? 'contenthidden' : ''"
    >
      <el-tree
        :data="data"
        :props="defaultProps"
        @node-click="handleNodeClick"
      ></el-tree>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title", "nodekey"],
  data() {
    return {
      showstatus: false,
      //nodekey:'',//门店店员，店长等级别的标识
      data: [
        {
          label: "收货",
          "node-key": "receiving",
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
          "node-key": "inventory",
          children: [
            {
              label: "待盘货",
            },
            {
              label: "已盘货",
            },
          ],
        },
        {
          label: "销售",
          "node-key": "sale",
          children: [
            {
              label: "待销售",
            },
            {
              label: "已销售",
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  mounted() {},
  methods: {
    //显示隐藏
    changestatus() {
      let t = this;
      if (t.showstatus === true) t.showstatus = false;
      else t.showstatus = true;
    },
    handleNodeClick(obj) {
      // if(this.nodekey)
      let path = "";
      let jumprouter = false;
      path += "/"+this.nodekey;

      switch (obj.label) {
        case "待收货":
          path += "/noreceive";
          jumprouter = true;
          break;
        case "已收货":
          path += "/receive";
           jumprouter = true;
          break;
        case "待盘货":
          path += "/nocheckproduct";
           jumprouter = true;
          break;
        case "已盘货":
          path += "/checkproduct";
           jumprouter = true;
          break;
        case "待销售":
          path += "/nosale";
           jumprouter = true;
          break;
        case "已销售":
          path += "/sales";
           jumprouter = true;
          break;
        default:
          break;
      }
      if (jumprouter) {
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
.index-store {
  width: 180px;
  border-top: 1px solid #b8d0f2;
  // padding-top: 16px;
}
.index-store:first-child {
  border-top: 0;
}
.index-store:last-child {
  border-bottom: 1px solid #b8d0f2;
}
.index-stroe-title {
  height: 38px;
  background: #ecf3fb;
  // border: 1px solid #b8d0f2;
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
.index-store-content {
  background: #fff;
  padding: 10px 0 10px 0;
}
.contenthidden {
  display: none !important;
}
</style>>
 