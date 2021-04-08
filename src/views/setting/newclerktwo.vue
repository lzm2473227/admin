<template>
  <div class="tab">
    <div class="tab-title">
      <div class="left">
        <div class="print" @click="toBackList"><img class="icon" src="../../assets/images/ic-打印列表.png" alt=""><span class="axis">返回列表</span></div>
        <div class="print" @click="addstore()"><img class="icon" src="../../assets/images/ic-打印列表.png" alt=""><span class="axis">保存内容</span></div>
        <div class="print"><img class="icon" src="../../assets/images/ic-打印列表.png" alt=""><span class="axis">打印列表</span></div>
        <div class="print" @click="exportExcel"><img class="icon" src="../../assets/images/ic-导出表格.png" alt=""><span class="axis">导出表格</span></div>
      </div>
      <div class="right">
        <!-- <div class="setup">
          <img class="set" src="../../assets/images/ic-设置.png" alt="系统设置" @click="setup">
        </div> -->
      </div>
    </div>
    <div class="table-main">
      <form action="">
      <table border="1" class="">
        <tr>
          <td class="table-left">机具编码</td>
          <td class="table-right"><input type="text" placeholder="请输入机具编码" v-model="form.meid"></td>
          <td class="table-left">机具型号</td>
          <td class="table-right"><input type="text" placeholder="请输入机具编码" v-model="form.type"></td>
        </tr>
        <tr>
            <td class="table-left">机具名称</td>
            <td class="table-right"><input type="text" placeholder="请输入机具名称" v-model="form.name"></td>
            <td class="table-left">机具供应商</td>
            <td class="table-right"><input type="text" placeholder="请输入机具供应商" v-model="form.supplier"></td>
        </tr>
        <tr>
            <td class="table-left">所属门店</td>
            <td class="table-right">
              <select placeholder="请选择所属门店" v-model="form.storeName">
                <option value="直营">直营</option>
                <option value="加盟">加盟</option>
              </select>
            </td>
            <td class="table-left">机具生产商</td>
            <td class="table-right"><input type="text" placeholder="请输入机具生产商" v-model="form.producer"></td>
        </tr>
        <tr>
            <td class="table-left">门店地址</td>
            <td class="table-right" colspan="3"><input type="text" placeholder="请输入门店详细地址" v-model="form.address" style="width: 100%;"></td>
        </tr>
        <tr style="vertical-align: top;">
            <td class="table-left" style="padding-top: 12px;">机具功能</td>
            <td class="table-right" colspan="3" style="height: 694px;"><textarea class="table-item" placeholder="请输入机具功能" v-model="form.gongneng"></textarea></td>
        </tr>
      </table>
      </form>
    </div>
  </div>
</template>
<script>
import httpreques from "../../utils/httpreques";
export default {
  name: "Newproduct",
  data() {
    return {
      form: {
        orgCode: "",
        businessLicense: "",
        storeName: "",
        address: "",
        storetype: "",
        county: "",
        city: "",
        province: "",
        name: "",
        tel: "",
        code: "",
        jianjie: ""
      }
    };
  },
  mounted() {
    this.getdata();
  },
  methods: {
    getdata() {
      let t = this;
      let storename = "";
      if (t.$route.query.storename) {
        storename = t.$route.query.storename;
      }
      if (storename) {
        let params = {
          storeName: storename,
        };
        httpreques(
          "post",
          params,
          "/realbrand-management-service/StoreMgt/StoreInfo"
        ).then((res) => {
          if (res.data.code == "SUCCESS") {
            //对象数据处理
            let storeobj = res.data.data;
            storeobj.storetype = storeobj.storeType;
            delete storeobj.storeType;
            t.selectedOptions =
              TextToCode[storeobj.province][storeobj.city][
                storeobj.county
              ].code;
            t.ruleForm = storeobj;
          } else {
            //接口错误处理
            t.$message.error(res.data.msg);
          }
        });
      }
    },
    addstore() {
      let t = this;
        let params = t.form;
        // params.storeName = uuidv4().substring(0, 8);
        params.id = this.form.id;
        params.storeLicence = "1";
        delete params.storeaccount;
        delete params.storepsw;

        if (params.registertime) {
          delete params.registertime;
        }
        console.log(JSON.stringify(params));
        //判断url
        let url = t.$route.query.storename
          ? "/realbrand-management-service/StoreMgt/UpdateStoreInfo"
          : "/realbrand-management-service/StoreMgt/InsertStoreInfo";

        httpreques("post", params, url).then((res) => {
          if (res.data.code == "SUCCESS") {
            t.$message({
              message: t.$route.query.storename ? "修改成功" : "添加成功",
              type: "success",
            });
            t.toBackList();
          } else {
            //接口错误处理
            t.$message.error(res.data.msg);
          }
        });
      // });
    },
    // 门店名称列表
    StoreNameList() {
      httpreques(
        "post",
        {
          pageNum: 1,
          pageSize: 15,
          storeName: "",
          // idNumber: this.idNumber,
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
    station1(val) {
      this.station = val;
    },
    cancelbtn() {
      let t = this;
      t.$router.push({ path: "/product" });
    },
  }
};
</script>
<style lang="scss" scoped>
@import '../../assets/css/reset.scss'
</style>