<template>
  <div class="tab">
    <div class="tab-title">
      <div class="left">
        <div class="print" @click="toBackList"><img class="icon" src="../../assets/images/back.png" alt=""><span class="axis">返回列表</span></div>
        <div class="print" @click="addMachine()"><img class="icon" src="../../assets/images/save.png" alt=""><span class="axis">保存内容</span></div>
        <div class="print"><img class="icon" src="../../assets/images/print.png" alt=""><span class="axis">打印列表</span></div>
        <div class="print" @click="exportExcel"><img class="icon" src="../../assets/images/derive.png" alt=""><span class="axis">导出表格</span></div>
      </div>
      <div class="right">
        <!-- <div class="setup">
          <img class="set" src="../../assets/images/ic-设置.png" alt="系统设置" @click="setup">
        </div> -->
      </div>
    </div>
    <div class="table-main">
      <div class="table-title">
          <p>{{msg}}机具</p>
        </div>
      <form action="">
      <table border="1" class="">
        <tr>
          <td class="table-left">机具编码</td>
          <td class="table-right"><input type="text" placeholder="请输入机具编码" v-model="form.meid" :disabled="$route.query.meid"></td>
          <td class="table-left">机具型号</td>
          <td class="table-right"><input type="text" placeholder="请输入机具型号" v-model="form.equipmentModel"></td>
        </tr>
        <tr>
            <td class="table-left">机具名称</td>
            <td class="table-right"><input type="text" placeholder="请输入机具名称" v-model="form.equipmentName"></td>
            <td class="table-left">机具供应商</td>
            <td class="table-right"><input type="text" placeholder="请输入机具供应商" v-model="form.equipmentSupplier"></td>
        </tr>
        <tr>
            <td class="table-left">所属门店</td>
            <td class="table-right">
              <select placeholder="请选择所属门店" v-model="form.storeName" @change="changeStore(form.storeName)">
                <option :value="item.storeName" v-for="(item, index) in storeName" :key="index">{{item.storeName}}</option>
              </select>
            </td>
            <td class="table-left">机具生产商</td>
            <td class="table-right"><input type="text" placeholder="请输入机具生产商" v-model="form.equipmentManufacturer"></td>
        </tr>
        <tr>
            <td class="table-left">门店地址</td>
            <td class="table-right" colspan="3"><input type="text" placeholder="请选择所属门店" v-model="form.address" style="width: 100%;" :disabled="true"></td>
        </tr>
        <tr style="vertical-align: top;">
            <td class="table-left" style="padding-top: 12px;">机具功能</td>
            <td class="table-right" colspan="3"><textarea class="table-item" placeholder="请输入机具功能" v-model="form.equipmentFunction"></textarea></td>
        </tr>
        <tr style="vertical-align: top;">
            <td class="table-left" style="padding-top: 12px;">机具图片</td>
            <td class="table-right" colspan="3" style="height: 542px; padding-top: 6px;">
              <el-upload
                action="http://14.29.162.130:6602/image/imageUpload"
                list-type="picture-card"
                :on-success="handleAvatarSuccess" 
                :on-preview="handlePictureCardPreview"
              >
                <template #default >
                  <div  class="imgs-title">
                    <i class="el-icon-plus"></i>
                  </div>
                </template>         
              </el-upload>
              <el-dialog v-model="dialogVisible">
                <img style="width:100%" :src='form.filePath' alt="">
              </el-dialog>
            </td>
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
      dialogImageUrl: "", //图片服务器的图片的地址
      dialogVisible:false,
      form: {
        meid: "",
        equipmentModel: "",
        equipmentName: "",
        equipmentSupplier: "",
        storeName: "",
        equipmentManufacturer: "",
        address: "",
        equipmentFunction: "",
        filePath:""
      },
      storeName: [],
      msg: '',
      storeId: 0
    };
  },
  mounted() {
    this.StoreNameList()
    this.getdata()
  },
  methods: {
    getdata() {
      let t = this;
      let meid = "";
      if (t.$route.query.meid) {
        meid = t.$route.query.meid;
        this.msg = '编辑'
      }else{
        this.msg = '新增'
      }
      if (meid) {
        let params = {
          meid: meid,
        };
        httpreques(
          "post",
          params,
          "/realbrand-management-service/EquipmentMgt/EquipmentInfo"
        ).then((res) => {
          console.log(res)
          if (res.data.code == "SUCCESS") {
            //对象数据处理
            let storeobj = res.data.data;
            storeobj.storetype = storeobj.storeType;
            storeobj.address = storeobj.province+storeobj.city+storeobj.county+storeobj.address
            delete storeobj.storeType;
            // t.selectedOptions =
            //   TextToCode[storeobj.province][storeobj.city][
            //     storeobj.county
            //   ].code;
            t.form = storeobj;
            this.dialogImageUrl = storeobj.filePath
          } else {
            //接口错误处理
            t.$message.error(res.data.msg);
          }
        });
      }
    },
    //预览图片
    handlePictureCardPreview(res, file){
      // console.log(file);
      console.log(res);
      this.dialogVisible = true;
      this.filePath = res.response.data;
    },
    // 图片
    handleAvatarSuccess(res, file) {
      console.log(file);
      console.log(res);
      if (res.code === "SUCCESS") {
        this.dialogImageUrl = res.data;
        this.form.filePath = res.data;
      }
    },
    addMachine() {
      if(!this.form.meid) return this.$message.error('机具编码不能为空')
      if(!this.form.equipmentModel) return this.$message.error('机具型号不能为空')
      if(!this.form.equipmentName) return this.$message.error('机具名称不能为空')
      if(!this.form.equipmentSupplier) return this.$message.error('机具供应商不能为空')
      if(!this.storeId) return this.$message.error('所属门店不能为空')
      if(!this.form.equipmentManufacturer) return this.$message.error('机具生产商不能为空')
      if(!this.form.equipmentFunction) return this.$message.error('机具功能不能为空')
      if(!this.form.filePath) return this.$message.error('机具图片不能为空')
      if (this.$route.query.meid) {
        // 编辑机具
        httpreques(
          "post",
          {
            meid: this.form.meid,
            storeId: this.storeId,
          },
          "/realbrand-management-service/EquipmentMgt/UpdateEquipment"
        ).then((result) => {
          if (result.data.code === 'SUCCESS') {
            this.$message.success("更新机具成功");
            this.$router.push({path: "/setting/machine"});
            // console.log(result);
          } else {
            this.$message.error("更新机具失败");
          }
        });
      }else{
        let params = {
          "equipmentFunction": this.form.equipmentFunction,
          "equipmentManufacturer": this.form.equipmentManufacturer,
          "equipmentModel": this.form.equipmentModel,
          "equipmentName": this.form.equipmentName,
          "equipmentSupplier": this.form.equipmentSupplier,
          "filePath": this.form.filePath,
          "meid": this.form.meid,
          "storeId": this.storeId
        }
        // 新增机具
        httpreques("post", params, "/realbrand-management-service/EquipmentMgt/BindingEquipment")
        .then((result) => {
          console.log(result);
          if (result.data.code === 'SUCCESS') {
            this.$message.success("新增机具成功");
            this.$router.push({path: "/setting/machine"});
          } else {
            this.$message.error("新增机具失败");
          }
        });
      }
    },
    // 获取店铺列表
    StoreNameList() {
      httpreques(
        "post",
        {
          idNumber: this.idNumber,
        },
        "/realbrand-management-service/StoreMgt/StoreNameList"
      ).then((result) => {
        if (result.data.code === "SUCCESS") {
          this.storeName = result.data.data;
        } else {
          this.$message.error(result.data.msg);
        }
      });
    },
    // 获取门店地址
    changeStore(){
      httpreques(
        "post",
        {
          "pageNum": 1,
          "pageSize": 15,
          "storeName": this.form.storeName,
          "storeType": ""
        },
        "/realbrand-management-service/StoreMgt/StoreInfo"
      ).then((res) => {
        if (res.data.code === "SUCCESS") {
          this.storeId = res.data.data.storeId
          this.form.address = res.data.data.province+res.data.data.city+res.data.data.county+res.data.data.address
        } else {
          this.$message.error(res.data.msg);
        }
      });
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
          if (res.data.code === "SUCCESS") {
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
    toBackList(){
      this.$router.go(-1)
    },
    cancelbtn() {
      let t = this;
      t.$router.push({ path: "/product" });
    },
  }
};
</script>
<style lang="scss" scoped>
@import '../../assets/css/reset.scss';
@import "@/assets/css/image2.scss";
</style>