<template>
  <div class="machine">
    <ListTile titlename="机具管理"></ListTile>
    <div class="tools-btn">
      <el-form
        :inline="true"
        :model="formInline"
        class="demo-form-inline"
        size="medium"
      >
        <el-form-item label="机具编码(MEID)：">
          <el-input placeholder="请输入机具编码(MEID)" v-model="storename" />
        </el-form-item>
        <el-form-item label="机具型号：">
          <el-input placeholder="请输入机具型号" v-model="storename" />
        </el-form-item>
        <el-form-item label="归属门店：">
          <el-input placeholder="请输入归属门店" v-model="storename" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSearch">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="tools-new">
      <el-button type="primary" @click="clerkDialog('1')">新增机具</el-button>
    </div>
    <el-dialog
      v-model="centerDialogVisible"
      :close-on-click-modal="false"
      width="30%"
      center
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="140px"
        class="demo-ruleForm"
        labelPosition="left"
      >
        <el-form-item label="机具编码(MEID)" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="机具型号" prop="type">
          <el-input v-model="ruleForm.type"></el-input>
        </el-form-item>
        <el-form-item label="归属门店" prop="affiliation">
          <el-select v-model="ruleForm.affiliation" placeholder="请选择门店">
            <!-- <el-option label="门店A" value="shanghai"></el-option> -->
            <el-option
              :label="item.storeName"
              :value="item.storeName"
              v-for="item in storeNameItemList"
              :key="item.value"
            ></el-option>
            <!-- <el-option label="门店B" value="beijing"></el-option> -->
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="addclerk">确 定</el-button>
          <el-button @click="centerDialogVisible = false">取 消</el-button>
        </span>
      </template>
    </el-dialog>
    <div class="machine-list">
      <el-table
        :data="tabledata"
        stripe="true"
        header-cell-style="background:#f6faff"
        style="width: 100%"
        border
      >
        <el-table-column align="center" width="50" label="序号">
          <template v-slot="scope">
            {{ scope.row.index + 1 }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="meid" label="机具编码(MEID)">
        </el-table-column>
        <el-table-column
          align="center"
          prop="machinecode"
          label="机具型号"
          width="180"
        >
        </el-table-column>
        <el-table-column align="center" prop="name" label="机具名称">
        </el-table-column>
        <el-table-column align="center" prop="storeName" label="归属门店">
        </el-table-column>
        <el-table-column align="center" prop="status" label="状态">
        </el-table-column>
        <el-table-column align="center" prop="bindingTime" label="激活时间">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template v-slot="scope">
            <div class="operation">
              <div class="operation-title" @click="clerkDialog('2', scope.row)">
                编辑
              </div>
              <div
                class="deletebtn"
                @click="deldata(scope.$index, scope.row.meid)"
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
import moment from "moment";
export default {
  name: "Machine",
  components: { ListTile },
  data() {
    return {
      labelPosition: "left", //lable向左对齐
      storeNameItemList: [],
      ruleForm: {
        name: "",
        storeName: "",
        affiliation: "",
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入机具编码（MEID）",
            trigger: "blur",
          },
        ],
        type: [{ required: true, message: "请输入机具型号", trigger: "blur" }],
        affiliation: [
          { required: true, message: "请选择归属门店", trigger: "change" },
        ],
      },
      tabledata: [],
      centerDialogVisible: false, //弹出框的控制开关
      index: "", // ‘1’为新增机具，‘2’为编辑机具
      pageNum: 1, //当前页码
      pages: 0, //页码
      total: 0, //员工总数
      pageSize: 15,
      idNumber: ''
    };
  },
  created() {
    if(localStorage.getItem("loginuser")) this.idNumber = JSON.parse(localStorage.getItem("loginuser")).userDetails.idNumber
    this.getdata();
  },
  methods: {
    handleCurrentChange(val) {
      this.pageNum = val
      this.getdata(val);
    },
    //机具列表
    getdata() {
      this.tabledata = [];
      httpreques(
        "post",
        {
          meid: "",
          storeName: "",
          pageNum: this.pageNum,
          pageSize: this.pageSize,
        },
        "/realbrand-management-service/EquipmentMgt/EquipmentList"
      ).then((res) => {
        console.log(res);
        let { data } = res.data;
        this.pageNum = res.data.pageNum;
        this.total = res.data.total;
        this.pages = res.data.pages;
        data.forEach((item) => {
          item.bindingTime = moment(item.bindingTime).format(
            "YYYY-MM-DD HH:mm:ss"
          );
        });
        for (let i = 0; i < data.length; i++) {
          this.tabledata.push({
            index: i,
            meid: data[i].meid,
            machinecode: "-",
            name: "-",
            storeName: data[i].storeName,
            idNumber: data[i].idNumber,
            status: "-",
            bindingTime: data[i].bindingTime,
          });
        }
        this.tabledata.reverse();
      });
    },
    //删除单个机具
    deldata(index, meid) {
      this.$confirm("此操作将永久删除该条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          httpreques(
            "post",
            {
              meid: meid,
            },
            "/realbrand-management-service/EquipmentMgt/DeleteEquipment"
          ).then((result) => {
            console.log(result);
            if (result.status && result.data.data === 1) {
              this.$message.success("删除机具成功!");
              this.tabledata.splice(index, 1);
              console.log(index);
            }
          });
        })
    },
    //点击触发新增机具
    addclerk() {
      if (this.index === "1") {
        // 新增机具
        httpreques(
          "post",
          {
            meid: this.ruleForm.name,
            storeName: this.ruleForm.affiliation,
          },
          "/realbrand-management-service/EquipmentMgt/BindingEquipment"
        ).then((result) => {
          console.log(result);
          if (result.status && result.data.data === 1) {
            this.centerDialogVisible = false;
            this.$message.success("新增机具成功");
            this.getdata();
          } else {
            this.$message.error("新增机具失败");
          }
        });
      }
      if (this.index === "2") {
        // 编辑机具
        httpreques(
          "post",
          {
            meid: this.ruleForm.name,
            storeName: this.ruleForm.affiliation,
          },
          "/realbrand-management-service/EquipmentMgt/UpdateEquipment"
        ).then((result) => {
          if (result.status && result.data.data === 1) {
            this.centerDialogVisible = false;
            this.getdata(); //更新后刷新页面
            this.$message.success("更新机具成功");
            // console.log(result);
          } else {
            this.$message.error("更新机具失败");
          }
        });
      }
    },
    clerkDialog(index, val) {
      this.index = index; // 判断是新增还是编辑机具
      this.centerDialogVisible = true;
      this.StoreNameList(); //点击新增获取门店名称列表
      if (index === "1") {
        this.ruleForm = {
          name: "",
        };
      } else {
        this.ruleForm = {
          name: val.meid,
          machinecode: val.machinecode,
          affiliation: val.storeName,
        };
      }
    },
    //获取店名列表
    StoreNameList() {
      httpreques(
        "post",
        {
          idNumber: this.idNumber,
        },
        "/realbrand-management-service/StoreMgt/StoreNameList"
      ).then((result) => {
        console.log(result);
        if (result.data.code == "SUCCESS") {
          this.storeNameItemList = result.data.data.storeNameItemList;
        } else {
          this.$message.error(result.data.msg);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.machine {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  height: 100%;
}
.tools-btn {
  padding-left: 12px;
}
.tools-new {
  padding-bottom: 20px;
  padding-left: 10px;
}
.operation-title {
  color: #3daeff;
  cursor: pointer;
  padding: 0 10px 0 10px;
}
.bot {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
.deletebtn {
  color: #e40f0f;
  cursor: pointer;
  padding: 0 10px 0 10px;
}
.operation {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.machine-list {
  padding: 20px;
}
/deep/.el-input__inner {
  width: 328px;
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