<template>
  <div class="role">
    <div class="role-tools">
      <div class="tools-pagetitle">岗位列表</div>
      <div class="tools-new">
        <el-button type="primary" @click="addRole">新增岗位</el-button>
      </div>
    </div>
    <div class="role-list">
      <el-table
        :data="storeUserItemList"
        stripe
        border
        style="width: 100%"
        fit="true"
        header-cell-style="background:#f6faff"
      >
        <el-table-column prop="index" label="序号" width="80" align="center">
        </el-table-column>
        <el-table-column
          prop="name"
          label="岗位名称"
          width="180"
          align="center"
        >
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="text">编辑</el-button>
            <el-button type="text" @click="setpowers">权限分配</el-button>
            <el-button
              type="text"
              @click="deleteRole(scope.row.idNumber)"
              style="color: #fb3d3d"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 新建角色弹窗 -->
    <el-dialog
      title="新建角色"
      v-model="addDialogNewRole"
      width="20%"
      center
      top="40vh"
    >
      <el-form :model="addPost" ref="addPostRef">
        <el-form-item>
          <el-input
            v-model="newRoleInput"
            placeholder="请输入角色名称"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="addPost">确 定</el-button>
          <el-button @click="addDialogNewRole = false">取 消</el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog
      title="设置权限"
      v-model="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <div class="rolepower">
        <div class="powerhead">
          <div class="powergroup">权限组</div>
          <div class="powerlist">权限名</div>
        </div>
        <template v-for="(item, key) in grouppower" :key="key">
          <div class="powerhead">
            <div class="powergroup2">{{ key }}</div>
            <div class="powerlist2">
              <template v-for="(item2, key2) in item" :key="key2">
                <el-checkbox v-model="item2.select">{{
                  item2.powername2
                }}</el-checkbox>
              </template>
            </div>
          </div>
        </template>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false"
            >确 定</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import _ from "lodash";
import httpreques from "../../utils/httpreques";
export default {
  name: "Role",
  data() {
    return {
      newRoleInput: "",
      powerdata: [
        {
          powergroup: "商品",
          powername: "product",
          select: true,
          powername2: "商品",
        },
        {
          powergroup: "盘存货",
          powername: "inventory",
          select: true,
          powername2: "盘存货",
        },
        {
          powergroup: "盘存货",
          powername: "checkproduct",
          select: false,
          powername2: "已盘点",
        },
        {
          powergroup: "进货",
          powername: "purchase",
          select: true,
          powername2: "进货",
        },
        {
          powergroup: "销售",
          powername: "sale",
          select: true,
          powername2: "销售",
        },
        {
          powergroup: "销售",
          powername: "sales",
          select: false,
          powername2: "已销售",
        },
        {
          powergroup: "销售",
          powername: "nosale",
          select: false,
          powername2: "未销售",
        },
      ], //权限数据
      grouppower: {},
      rolename: "",
      roledata: [
        {
          index: 1,
          rolename: "店长",
          rolepowers: "9",
          remake: "角色备注",
        },
        {
          index: 2,
          rolename: "进货操作人",
          rolepowers: "9",
          remake: "角色备注",
        },
        {
          index: 3,
          rolename: "盘货操作人",
          rolepowers: "9",
          remake: "角色备注",
        },
        {
          index: 4,
          rolename: "销售操作人",
          rolepowers: "9",
          remake: "角色备注",
        },
      ], //角色数据
      addDialogNewRole: false,
      dialogVisible: false,
      storeUserItemList: [],
    };
  },
  created() {
    this.ObtainStorelist();
  },
  methods: {
    // 获取列表
    async ObtainStorelist() {
      const { data: res } = await httpreques(
        "post",
        { idNumber: "1111" },
        "/realbrand-management-service/StoreUserMgt/StoreUserList"
      );
      console.log(res.data);
      this.storeUserItemList = res.data;
    },
    // 新增
    addPost() {
      let params = {
        frontId: "",
        idNumber: "",
        name: this.newRoleInput,
        password: "",
        reverseId: "",
        station: "",
        storeName: "",
        telNum: "",
      };
      console.log(params)
      httpreques(
        "post",
        params,
        "/realbrand-management-service/StoreUserMgt/InserUseraccount"
      ).then((res) => {
        if (res.data.code == "SUCCESS") {
          console.log(res)
          this.$message({ type: "success", message: "新增成功" });
          this.dialogVisible = false;
          this.ObtainStorelist();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 删除
    deleteRole(idNumber) {
      httpreques(
        "post",
        { idNumber: idNumber },
        "/realbrand-management-service/StoreUserMgt/DeleteStoreUser"
      ).then((res) => {
        console.log(res);
        if (res.data.code == "SUCCESS") {
          this.$message({ type: "success", message: "删除成功" });
          this.ObtainStorelist();
        } else {
          this.$message.error(res.data.msg);
        }
      });

      // this.storeUserItemList = res.data;
    },
    //查询
    onSearch() {},
    //设置权限
    setpowers() {
      //打开模态框
      // let t = this;
      // t.dialogVisible = true;
      // var group = _.groupBy(t.powerdata, "powergroup");
      // console.log(group);
      // t.grouppower = group;
      let t = this;
      t.$router.push({ path: "/setting/Authority" });
    },
    handleClose() {},
    addRole() {
      this.addDialogNewRole = true;
    },
  },
};
</script>
<style lang="scss" scoped>
.role {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  height: 100%;
}

.role-tools {
  padding: 0 0 0 10px;
}
.role-list {
  padding: 20px;
  .el-table--striped .el-table__body tr.el-table__row--striped td {
    background: #f6faff;
  }
}
.tools-pagetitle {
  padding: 20px 0 20px 0;
  color: #101010;
  font-size: 20px;
  font-family: SourceHanSansSC-regular;
  font-weight: bold;
}
.tools-new {
  padding-bottom: 20px;
}
.demo-form-inline {
  .el-input--medium .el-input__inner {
    width: 250px;
  }
}
.operation {
  display: flex;
  flex-direction: row;
}
.rolepower {
  padding: 0 10px 0 10px;
  display: flex;
  flex-direction: column;
  border: 1px solid #ebeef5;
}
.powerhead {
  width: 100%;
  display: flex;
  flex-direction: row;
}
.powergroup {
  display: flex;
  flex: 1;
  padding: 10px 5px 10px 5px;
  align-items: center;
  justify-content: center;
  color: #909399;
  border-right: 1px solid #ebeef5;
  font-weight: bold;
}

.powerlist {
  display: flex;
  flex: 4;
  padding: 10px 5px 10px 5px;
  align-items: center;
  justify-content: center;
  color: #909399;
  font-weight: bold;
}
.powergroup2 {
  display: flex;
  flex: 1;
  padding: 10px 5px 10px 5px;
  align-items: center;
  justify-content: center;
  color: #909399;
  border-right: 1px solid #ebeef5;
  border-top: 1px solid #ebeef5;
}
</style>