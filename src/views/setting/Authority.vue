<template>
  <div class="Authority">
    <NewBreadCrumb
      ptitle="角色管理"
      ctitle="权限分配"
      path="/setting/rolelist"
    ></NewBreadCrumb>
    <div class="main">
      <p>权限信息</p>
      <el-tree
        :data="data"
        show-checkbox
        node-key="id"
        default-expand-all
        :props="defaultProps"
        @node-expand="handleExpand"
        :render-content="renderContent"
      >
      </el-tree>
    </div>
  </div>
</template>
<script>
import NewBreadCrumb from "../../layouts/IndexLayout/components/NewBreadCrumb";
export default {
  data() {
    return {
      data: [
        {
          id: 1,
          label: "商品",
          children: [
            {
              id: 6,
              label: "新增",
            },
            {
              id: 7,
              label: "修改",
            },
            {
              id: 8,
              label: "删除",
            },
          ],
        },
        {
          id: 2,
          label: "进货",
          children: [
            {
              id: 9,
              label: "未收货",
            },
            {
              id: 10,
              label: "已收货",
            },
          ],
        },
        {
          id: 3,
          label: "盘存货",
          children: [
            {
              id: 11,
              label: "未盘点",
            },
            {
              id: 12,
              label: "已盘点",
            },
          ],
        },
        {
          id: 4,
          label: "销售",
          children: [
            {
              id: 13,
              label: "未销售",
            },
            {
              id: 14,
              label: "已销售",
            },
          ],
        },
        {
          id: 5,
          label: "设置",
          children: [
            {
              id: 15,
              label: "门店列表",
              children: [
                {
                  id: 18,
                  label: "新增",
                },
                {
                  id: 19,
                  label: "修改",
                },
                {
                  id: 20,
                  label: "删除",
                },
                {
                  id: 21,
                  label: "重置密码",
                },
              ],
            },
            {
              id: 16,
              label: "店员管理",
              children: [
                {
                  id: 22,
                  label: "新增",
                },
                {
                  id: 23,
                  label: "修改",
                },
                {
                  id: 24,
                  label: "删除",
                },
                {
                  id: 25,
                  label: "重置密码",
                },
              ],
            },
            {
              id: 17,
              label: "机具管理",
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
  components: {
    NewBreadCrumb,
  },
  mounted() {
    this.changeCss();
  },
  methods: {
    handleExpand() {
      //节点被展开时触发的事件
      //因为该函数执行在renderContent函数之前，所以得加this.$nextTick()
      this.$nextTick(() => {
        this.changeCss();
      });
    },
    renderContent(h, { node, data, store }) {
      //树节点的内容区的渲染 Function
      let classname = "";
      // 由于项目中有三级菜单也有四级级菜单，就要在此做出判断
      if (node.level === 4) {
        classname = "foo";
      }
      if (node.level === 3 && node.childNodes.length === 0) {
        classname = "foo";
      }
      return h(
        "p",
        {
          class: classname,
        },
        node.label
      );
    },
    changeCss() {
      var levelName = document.getElementsByClassName("foo"); // levelname是上面的最底层节点的名字
      for (var i = 0; i < levelName.length; i++) {
        // cssFloat 兼容 ie6-8  styleFloat 兼容ie9及标准浏览器
        levelName[i].parentNode.style.cssFloat = "left"; // 最底层的节点，包括多选框和名字都让他左浮动
        levelName[i].parentNode.style.styleFloat = "left";
        levelName[i].parentNode.onmouseover = function () {
          this.style.backgroundColor = "#fff";
        };
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.Authority {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  height: 100%;
}
.main {
  padding: 15px 0 0 15px;
}
.container {
  padding: 40px;
}
.routeList-box {
  border-left: 1px solid #eee;
  border-right: 1px solid #eee;
  margin-bottom: 20px;
  .el-tree {
    margin: 12px 0;
  }
  /deep/.el-collapse-item__header {
    height: 40px;
    background-color: #f4f4f4;
    padding: 0 10px;
  }
  /deep/.el-icon-arrow-right:before {
    color: #409eff;
  }
}
/deep/ .el-tree-node__content::before {
  content: "";
  padding-left: 10px;
}
/deep/.el-checkbox__input {
  margin-right: 6px;
}
</style>