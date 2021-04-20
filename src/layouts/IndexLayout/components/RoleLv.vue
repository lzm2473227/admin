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
          @node-expand="handleNodeOpen"
        @node-collapse="handleNodeClose"
        highlight-current
        node-key="id"
        ref="vueTree"
        :default-expanded-keys='defaultkeys'
      ></el-tree>
    </div>
  </div>
</template>

<script>
import store from '../../../store';
import _ from 'lodash'
export default {
  props: ["title", "nodekey"],
  data() {
    return {
      showstatus: false,
      //nodekey:'',//门店店员，店长等级别的标识
      data: [
        {
          id: 1,
          label: "收货",
          "node-key": "receiving",
          children: [
            {
              id: 4,
              label: "待收货",
            },
            {
              id: 5,
              label: "已收货",
            },
          ],
        },
        {
          id: 2,
          label: "盘货",
          "node-key": "inventory",
          children: [
            {
              id: 6,
              label: "待盘货",
            },
            {
              id: 7,
              label: "已盘货",
            },
          ],
        },
        {
          id: 3,
          label: "销售",
          "node-key": "sale",
          children: [
            {
              id: 8,
              label: "待销售",
            },
            {
              id: 9,
              label: "已销售",
            },
          ],
        },
        {
          id: 10,
          label: "银行开户",
          "node-key": "bank",
          children: [
            {
              id: 11,
              label: "银行开户",
            },
          ],
        },
        {
          id: 12,
          label: "保单推送",
          "node-key": "guarantee",
          children: [
            {
              id: 13,
              label: "保单推送",
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
      defaultkeys:[],//展开的节点
    };
  },
  mounted() {
    //是否展开状态判断。
    let stu = false;
    let stuobj = JSON.parse(localStorage.getItem(this.nodekey));
    if (stuobj) {
      stu = stuobj[this.nodekey];
    }
    this.showstatus = stu;
    let defaultkeys = JSON.parse(localStorage.getItem(this.nodekey+"keys"));
    this.defaultkeys =defaultkeys;
    
    //数组件的默认展开
    let selectmenu = JSON.parse(localStorage.getItem("selectmenu"));
    //判断组件选中高亮
    if (selectmenu) {
      if (selectmenu.nodekey == this.nodekey) {
        this.$nextTick(() => {
          let key = 0;
          switch (selectmenu.pathname) {
            case "noreceive":
              key = 4;
              break;
            case "receive":
              key = 5;
              break;
            case "nocheckproduct":
              key = 6;
              break;
            case "checkproduct":
              key = 7;
              break;
            case "nosale":
              key = 8;
              break;
            case "sales":
              key = 9;
              break;
          }
          this.$refs.vueTree.setCurrentKey(key);
        });
      }
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
      // if(this.nodekey)
     
      let path = "";
      let jumprouter = false;
      path += "/" + this.nodekey;
      let pathname = "";
      switch (obj.label) {
        case "待收货":
          path += "/noreceive";
          pathname = "noreceive";
          jumprouter = true;
          break;
        case "已收货":
          path += "/receive";
          pathname = "receive";
          jumprouter = true;
          break;
        case "待盘货":
          path += "/nocheckproduct";
          pathname = "nocheckproduct";
          jumprouter = true;
          break;
        case "已盘货":
          path += "/checkproduct";
          pathname = "checkproduct";
          jumprouter = true;
          break;
        case "待销售":
          path += "/nosale";
          pathname = "nosale";
          jumprouter = true;
          break;
        case "已销售":
          path += "/sales";
          pathname = "sales";
          jumprouter = true;
          break;
        case "银行开户":
          path += "/bank";
          pathname = "bank";
          jumprouter = true;
          break;
        case "保单推送":
          path += "/guarantee";
          pathname = "guarantee";
          jumprouter = true;
          break;
      }

      if (jumprouter) {
        let selectmenu = {
          nodekey: this.nodekey,
          pathname: pathname,
        };
        localStorage.setItem("selectmenu", JSON.stringify(selectmenu)); //需要在此处判断，路由跳转才缓存
        this.$emit('jumpurl',{path:path,nodekey:this.nodekey})
        // this.$router.push({
        //   path: path,
        //   query: {}, //后续传递当前级别
        // });
      }
    },
    handleNodeOpen(obj){
      let arr = [];
      arr.push(obj.id);

     
      localStorage.setItem(this.nodekey+'keys', JSON.stringify(arr));
      this.defaultkeys = arr;
    },
    handleNodeClose(obj){
       _.pull(this.defaultkeys, obj.id);
        localStorage.setItem(this.nodekey+'keys', JSON.stringify(this.defaultkeys));
    }
  },

};
</script>

<style lang="scss" scoped>
/* 
店长组件样式
*/
.index-store {
  width: 160px;
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
/deep/.el-tree-node__content{
  margin-left: 14px;
}
/deep/.el-tree-node__children > .el-tree-node > .el-tree-node__content > .el-tree-node__expand-icon{
  padding-left: 14px;
}
</style>>
 