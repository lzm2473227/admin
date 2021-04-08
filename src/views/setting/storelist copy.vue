<template>
  <div class="storelist">
    <ListTile titlename="门店列表"></ListTile>
    <div class="store-tools">
      <div class="tools-btns">
        <el-form :inline="true" size="medium">
          <el-form-item label="门店名称：">
            <el-input placeholder="请输入门店名称" v-model="storename" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSearch">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="tools-new">
        <el-button type="primary" @click="addStore">新增门店</el-button>
      </div>
    </div>
    <div class="store-list">
      <el-table
        ref="multipleTable"
        :data="tabledata"
        tooltip-effect="dark"
        style="width: 100%"
        stripe="true"
        fit="true"
        border
        header-cell-style="background:#f6faff"
        :default-sort="{ prop: 'index', order: 'descending' }"
      >
        <el-table-column prop="index" label="序号" width="80" align="center">
        </el-table-column>

        <el-table-column
          align="center"
          prop="orgCode"
          label="门店机构代码"
          width="200"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="storeName"
          label="门店名称"
          width="200"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="address"
          label="门店地址"
          width="200"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="store_type"
          label="门店类别"
          width="120"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="storeLicence"
          label="门店许可证"
          width="200"
        >
        </el-table-column>
        <!-- <el-table-column
          align="center"
          prop="storeaccount"
          label="门店账号"
          width="200"
        >
        </el-table-column> -->
        <el-table-column label="操作" align="center">
          <template #default="scope">
            <div class="operation">
              <div
                @click="editstore(scope.row.storeName)"
                class="operation-title"
              >
                编辑
              </div>
              <div
                @click="delstore(scope.row.storeName)"
                class="operation-title"
              >
                删除
              </div>
              <!-- <div class="operation-title">重置密码</div> -->
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="com-bottom">
      <div class="bot">
        <el-pagination background layout="prev, pager, next" 
        :total="total"
        :page-size="pageSize"
         @current-change="currentchange"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import NewBreadCrumb from "../../layouts/IndexLayout/components/NewBreadCrumb";
import ListTile from "../../layouts/IndexLayout/components/ListTitle";
import httpreques from "../../utils/httpreques";
export default {
  name: "StoreList",
  components: {
    ListTile,
    NewBreadCrumb,
  },
  data() {
    return {
      pageSize:15,
      pageIndex:1,
      total:0,
      storename: "",
      tabledata: [],
    };
  },
  created() {
    this.getdata();
  },
  methods: {
    onSearch() {
      this.getdata();
    },
    getdata() {
      let t = this;
      let params = {
        "storeName": "",
        "pageNum": this.pageIndex,
        "pageSize": this.pageSize,
      };
      httpreques(
        "post",
        params,
        "/realbrand-management-service/StoreMgt/StoreInfoList"
      ).then((res) => {
        if (res.data.code == "SUCCESS") {
       
          res.data.data.forEach((item,key) => {
             item.index = key + 1; //加入index
            let address = item.province + item.city + item.county;
            item.address = address + item.address;
          });
          t.tabledata = res.data.data;
          t.total= res.data.total;
        } else {
          //接口错误处理
        }
      });
    },
    addStore() {
      let t = this;

      t.$router.push({ path: "/setting/newstore" });
    },
    delstore(storename) {
      let t = this;
      let params = {
        storeName: storename,
      };
      httpreques(
        "post",
        params,
        "/realbrand-management-service/StoreMgt/DeleteStore"
      ).then((res) => {
        if (res.data.code == "SUCCESS") {
          t.$message({
            message: "删除成功",
            type: "success",
          });
          t.getdata();
        } else {
          //接口错误处理
          t.$message.error(res.data.msg);
        }
      });
    },
    editstore(storename) {
      let t = this;
      t.$router.push({
        path: "/setting/newstore",
        query: {
          storename: storename,
        },
      });
    },
    currentchange(index){
      this.pageIndex = index;
      this.getdata();
    }
  },
  
  
};
</script>
<style lang="scss" scoped>
.storelist {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  height: 100%;
}
.store-tools {
  padding: 0 0 0 10px;
}
.store-list {
  padding: 20px;
  .el-table--striped .el-table__body tr.el-table__row--striped td {
    background: #f6faff;
  }
}

.tools-new {
  padding-bottom: 20px;
}
.operation-title {
  color: #3daeff;
  cursor: pointer;
  padding: 0 10px 0 10px;
}
.operation {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.bot {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
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
  // margin-top: 6px;
}
</style>