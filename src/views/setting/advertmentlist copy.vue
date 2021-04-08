<template>
  <div class="advertmentlist">
    <!-- <NewBreadCrumb
      ptitle="门店列表"
    ></NewBreadCrumb> -->
    <ListTile titlename="广告管理"></ListTile>
    <div class="tools-btn">
      <div class="tools-new">
        <el-button type="primary" @click="addAdvert">新增广告</el-button>
      </div>
    </div>
    <div class="advertlist">
      <el-table
        border
        :data="tabledata"
        stripe="true"
        header-cell-style="background:#f6faff"
        style="width: 100%"
        :default-sort="{ prop: 'index', order: 'descending' }"
      >
        <el-table-column prop="index" label="序号" align="center" width="50">
        </el-table-column>
        <el-table-column
          prop="positionName"
          label="广告位置"
          align="center"
          width="180"
        >
        </el-table-column>
        <el-table-column align="center" label="广告图片">
          <template #default="scope">
            <el-image
              style="width: 200px; height: 100px"
              :src="scope.row.linkPosition"
              :fit="cover"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="startTime" align="center" label="开始时间">
        </el-table-column>
        <el-table-column prop="endTime" align="center" label="结束时间">
        </el-table-column>
        <el-table-column align="center" label="状态">
          <template #default="scope">
            <span v-if="scope.row.enableState == '0'">禁用</span>
            <span v-else>启用</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center">
          <template #default="scope">
            <div class="operation">
              <div
                @click="editadvertment(scope.row.id)"
                class="operation-title"
              >
                编辑
              </div>

              <div
                @click="editstatus(1, scope.row.id)"
                v-if="scope.row.enableState == '0'"
                class="operation-title"
              >
                启用
              </div>
              <div
                @click="editstatus(0, scope.row.id)"
                v-else
                class="operation-title delfont"
              >
                禁用
              </div>
              <div
                @click="deladvertment(scope.row.id)"
                class="operation-title delfont"
              >
                删除
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="com-bottom">
      <div class="bot">
        <el-pagination
          background
          layout="prev, pager, next"
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
import ListTile from "../../layouts/IndexLayout/components/ListTitle";
import httpreques from "../../utils/httpreques";
import NewBreadCrumb from "../../layouts/IndexLayout/components/NewBreadCrumb";
import _ from "lodash";
import moment from "moment";
export default {
  name: "AdvertmentList",
  components: { ListTile, NewBreadCrumb },
  data() {
    return {
      pageSize: 15,
      pageIndex: 1,
      total: 0,
      tabledata: [],
      idNumber: "",
    };
  },
  created() {
    if (localStorage.getItem("loginuser"))
      this.idNumber = JSON.parse(
        localStorage.getItem("loginuser")
      ).userDetails.idNumber;
    this.getdata();
  },
  methods: {
    addAdvert() {
      let t = this;
      t.$router.push({ path: "/setting/newadvertment" });
    },
    getdata() {
      let t = this;
      let params = {
        pageNum: t.pageIndex,
        pageSize: t.pageSize,
      };
      httpreques(
        "post",
        params,
        "/realbrand-management-service/AdvertisementMgt/AdvertisementInfoList"
      ).then((res) => {
        if (res.data.code == "SUCCESS") {
          _.forEach(res.data.data, function (item, key) {
            item.startTime = moment(item.startTime).format(
              "YYYY-MM-DD HH:mm:ss"
            );
            item.endTime = moment(item.endTime).format("YYYY-MM-DD HH:mm:ss");
            item.index = key + 1;
          });
          t.total = res.data.total;
          t.tabledata = res.data.data;
        } else {
          //接口错误处理
          t.$message.error(res.data.msg);
        }
      });
    },
    //状态更改
    editstatus(stu, id) {
      let t = this;
      let params = {
        enableState: stu,
        id: id,
      };
      httpreques(
        "post",
        params,
        "/realbrand-management-service/AdvertisementMgt/EnableAdvertisement"
      ).then((res) => {
        if (res.data.code == "SUCCESS") {
          t.$message({
            message: stu == 0 ? "广告已禁用" : "广告已启用",
            type: "success",
          });
          t.getdata();
        } else {
          //接口错误处理
          t.$message.error(res.data.msg);
        }
      });
    },
    deladvertment(id) {
      let t = this;

      httpreques(
        "post",
        { id: id },
        "/realbrand-management-service/AdvertisementMgt/DeleteAdvertisement"
      ).then((res) => {
        if (res.data.code == "SUCCESS") {
          t.$message({
            message: "广告已删除",
            type: "success",
          });
          t.getdata();
        } else {
          //接口错误处理
          t.$message.error(res.data.msg);
        }
      });
    },
    editadvertment(id) {
      let t = this;
      t.$router.push({
        path: "/setting/newadvertment",
        query: {
          advertmentid: id,
        },
      });
    },
    currentchange(index) {
      let t = this;
      t.pageIndex = index;
      t.getdata();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../assets/css/reset"
</style>