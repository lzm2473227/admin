<template>
  <div class="clerklist">
    <ListTile titlename="员工管理"></ListTile>
    <div class="clerk-tools">
      <div class="tools-btns">
        <el-form :inline="true" size="medium">
          <el-form-item label="员工姓名：">
            <el-input placeholder="请输入店员姓名" v-model="storename" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSearch">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="tools-new">
        <el-button type="primary" @click="addclerk()">新增员工</el-button>
      </div>
    </div>
    <div class="clerk-list">
      <el-table
        ref="multipleTable"
        :data="tabledata"
        tooltip-effect="dark"
        style="width: 100%"
        stripe="true"
        fit="true"
        border
        header-cell-style="background:#f6faff"
      >
        <el-table-column label="序号" width="50" align="center">
          <template v-slot="scope">
            {{ scope.row.index }}
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          prop="idNumber"
          label="身份证号"
          width="200"
        >
        </el-table-column>
        <el-table-column align="center" prop="name" label="姓名" width="200">
        </el-table-column>
        <el-table-column
          align="center"
          prop="idcardImg"
          label="证件照"
          width="200"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="storeName"
          label="所属门店"
          width="120"
        >
        </el-table-column>
        <el-table-column align="center" prop="station" label="角色" width="200">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template v-slot="scope">
            <div class="operation">
              <div
                class="operation-title"
                @click="addclerk(scope.row.idNumber)"
              >
                编辑
              </div>
              <div class="operation-title">重置密码</div>
              <div
                class="operation-title2"
                @click="deldata(scope.$index, scope.row.idNumber)"
              >
                删除
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="com-bottom">
        <div class="bot">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            :page-size="pageSize"
            @current-change="handleCurrentChange"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ListTile from "../../layouts/IndexLayout/components/ListTitle";
import httpreques from "../../utils/httpreques";
export default {
  name: "clerkList",
  components: { ListTile },
  data() {
    return {
      clerkname: "",
      tabledata: [],
      pageNum: 1, //当前页码
      pages: 0, //页码
      total: 0, //员工总数
      pageSize: 15,
    };
  },
  created() {
    this.getdata();
  },
  methods: {
    handleCurrentChange(val) {
      this.pageNum = val
      this.getdata();
    },
    //删除
    deldata(index, idNumber) {
      this.$confirm("此操作将永久删除该条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        httpreques(
          "post",
          {
            isDelete: 1
          },
          "/realbrand-management-service/StoreUserMgt/DeleteStoreUser"
        ).then((result) => {
          console.log(result);
          if (result.data.code === "SUCCESS") {
            this.$message.success("删除员工成功!");
            this.tabledata.splice(index, 1);
          } else {
            this.$message.error("删除员工失败");
          }
        });
      });
    },
    addclerk(idNumber) {
      if (idNumber) {
        this.$router.push({
          path: "/setting/newclerk",
          query: { idNumber: idNumber },
        });
      } else {
        this.$router.push({
          path: "/setting/newclerk",
        });
      }
    },
    //店员列表
    getdata() {
      this.tabledata = [];
      httpreques(
        "post",
        {
          name: "",
          pageNum: this.pageNum,
          pageSize: this.pageSize,
        },
        "/realbrand-management-service/StoreUserMgt/StoreUserList"
      ).then((res) => {
        console.log(res);
        if ((res.data.code = "SUCCESS")) {
          let { data } = res.data;
          this.total = res.data.total;
          this.pages = res.data.pages;
          // this.tabledata = res.data.data;
          console.log(data);
          for (let i = 0; i < data.length; i++) {
            this.tabledata.push({
              index: i + 1,
              idNumber: data[i].idNumber,
              name: data[i].name,
              telNum: data[i].telNum,
              station: data[i].station,
              frontId: "-",
              reverseId: "-",
              storeName: data[i].storeName,
            });
          }
          this.tabledata.reverse();
        }
        // console.log(this.tabledata);
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.clerklist {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  height: 100%;
}
.clerk-tools {
  padding: 0 0 0 10px;
}
.clerk-list {
  padding: 20px;
  .el-table--striped .el-table__body tr.el-table__row--striped td {
    background: #f6faff;
  }
}
.bot {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
.tools-new {
  padding-bottom: 20px;
}
.operation-title {
  color: #3daeff;
  cursor: pointer;
  padding: 0 10px 0 10px;
}
.operation-title2 {
  color: red;
  cursor: pointer;
  padding: 0 10px 0 10px;
}
.operation {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
/deep/.el-input__inner {
  width: 328px;
  margin-right: 50px;
  height: 36px;
  font-size: 14px;
}
/deep/.el-form-item--medium .el-form-item__label {
  line-height: 36px;
  font-size: 14px;
}
/deep/.el-button--medium {
  width: 92px;
  height: 38px;
}
</style>