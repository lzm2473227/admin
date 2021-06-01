<template>
  <form ref="form">
    <div class="tab">
      <div class="tab-title">
        <div class="left">
          <div class="print" @click="$router.replace('/product')">
            <img
              class="icon"
              src="../../assets/images/back.png"
              alt=""
            /><span class="axis">返回列表</span>
          </div>
          <div class="print" @click="addcomm()">
            <img
              class="icon"
              src="../../assets/images/save.png"
              alt=""
            /><span class="axis">保存内容</span>
          </div>
          <div class="print">
            <img
              class="icon"
              src="../../assets/images/print.png"
              alt=""
            /><span class="axis">打印列表</span>
          </div>
          <div class="print" @click="exportExcel">
            <img
              class="icon"
              src="../../assets/images/derive.png"
              alt=""
            /><span class="axis">导出表格</span>
          </div>
        </div>
        <div class="right">
          <!-- <div class="setup">
          <img class="set" src="../../assets/images/ic-设置.png" alt="系统设置" @click="setup">
        </div> -->
        </div>
      </div>
      <div class="table-main">
        <div class="table-title">
          <p>商品基本信息</p>
        </div>
        <table border="1" class="">
          <tr>
            <td class="table-left">单品编码</td>
            <td class="table-right">
              <input
                type="text"
                v-model="form.commodityCode"
                placeholder="请输入单品编码"
              />
            </td>
            <td class="table-left">商品69编码</td>
            <td class="table-right">
              <input type="text" v-model="form.barcode" placeholder="请输入商品69编码" />
            </td>
          </tr>
          <tr>
            <td class="table-left">商品名称</td>
            <td class="table-right">
              <input
                type="text"
                v-model="form.commodityName"
                placeholder="请输入商品名称"
              />
            </td>
            <td class="table-left">商品规格</td>
            <td class="table-right">
              <input
                type="text"
                v-model="form.specsParameter"
                placeholder="请输入商品规格"
              />
            </td>
          </tr>
          <tr>
            <td class="table-left">生产厂家</td>
            <td class="table-right">
              <input
                type="text"
                v-model="form.manufacturer"
                placeholder="请输入生产厂家"
              />
            </td>
            <td class="table-left">商品品牌</td>
            <td class="table-right">
              <input
                type="text"
                v-model="form.brandName"
                placeholder="请输入商品品牌"
              />
            </td>
          </tr>
          <tr>
            <td class="table-left">商品售价</td>
            <td class="table-right">
              <input
                type="text"
                v-model="form.price"
                placeholder="请输入商品售价"
              />
            </td>
            <td class="table-left">商品尺寸</td>
            <td class="table-right">
              <input type="text" placeholder="请输入商品尺寸" />
            </td>
          </tr>
          <tr>
            <td class="table-left">商品小类</td>
            <td class="table-right">
              <input type="text" placeholder="请输入商品小类" />
            </td>
            <td class="table-left">批准文号</td>
            <td class="table-right">
              <input type="text" placeholder="请输入批准文号" />
            </td>
          </tr>
          <tr>
            <td class="table-left">商品中类</td>
            <td class="table-right">
              <input type="text" placeholder="请输入商品中类" />
            </td>
            <td class="table-left">包装类型</td>
            <td class="table-right">
              <input type="text" placeholder="请输入包装类型" />
            </td>
          </tr>
          <tr>
            <td class="table-left">商品大类</td>
            <td class="table-right">
              <input type="text" placeholder="请输入商品大类" />
            </td>
            <td class="table-left">包装尺寸</td>
            <td class="table-right">
              <input type="text" placeholder="请输入包装尺寸" />
            </td>
          </tr>
          <tr>
            <td class="table-left">商品体积/容积</td>
            <td class="table-right">
              <input type="text" placeholder="请输入商品体积/容积" />
            </td>
            <td class="table-left">商品重量/质量</td>
            <td class="table-right">
              <input type="text" placeholder="请输入商品重量/质量" />
            </td>
          </tr>
          <tr>
            <td class="table-left">主要功能/功效</td>
            <td class="table-right" colspan="3">
              <textarea
                class="table-item"
                placeholder="请输入主要功能/功效"
              ></textarea>
            </td>
          </tr>
          <tr>
            <td class="table-left">商品简介</td>
            <td class="table-right" colspan="3">
              <textarea
                class="table-item"
                placeholder="请输入商品简介"
              ></textarea>
            </td>
          </tr>
          <tr style="vertical-align: top;">
            <td class="table-left" style="padding-top: 16px;">商品图片</td>
            <td class="table-right" colspan="3" style="height: 320px; padding-top: 6px;">
            <el-upload
              action="http://14.29.162.130:6602/image/imageUpload"
              list-type="picture-card"
              :on-success="handleAvatarSuccess"
              :file-list="imgArr" 
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
            >
              <template #default >
                <div  class="imgs-title">
                  <i class="el-icon-plus"></i>
                </div>
              </template>         
            </el-upload>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </form>
</template>
<script>
import Btn from "../../components/Btn";
import httpreques from "../../utils/httpreques";
import NewBreadCrumb from "../../layouts/IndexLayout/components/NewBreadCrumb";
export default {
  name: "Newproduct",
  data() {
    return {
      form: {
        barcode: "", //条形码
        brandName: "", //品牌名称
        commodityName: "", //商品名称
        filePath: "", //商品图片路径
        manufacturer: "", //厂商
        policyNo: "", //保险单号/默认为0
        price: "", //销售价格/默认为0
        specsParameter: "", // 规格参数
        commodityCode: "", // 单品编码
        storeId:""
      },
      dialogImageUrl:"",
      linkPosition: "", //默认选中显示
      imgArr: []
    };
  },
  mounted() {
    this.getdata();
  },
  methods: {
    getdata() {
      let t = this;
      let barcode = t.$route.query.barcode;
      if (barcode) {
        let params = {
          barcode: barcode,
        };
        httpreques(
          "post",
          params,
          "/realbrand-management-service/CommodityMgt/BarcodeInfo"
        ).then((res) => {
          console.log(res);
          if (res.data.code == "SUCCESS") {
            //对象数据处理
            console.log(res);
            let commobj = res.data.data;
            this.imgArr.push({url: commobj.filePath})
            this.dialogImageUrl = commobj.filePath;
            t.form = commobj;
          } else {
            //接口错误处理
            t.$message.error(res.data.msg);
          }
        });
      }
    },
    handleRemove(file, fileList) {
      // console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      // console.log(file.url);
      this.dialogImageUrl = file.url;
      // this.dialogVisible = true;
    },
    //提交
    addcomm() {
      let params = {
        barcode: this.form.barcode, //条形码
        brandName: this.form.brandName, //品牌名称
        commodityName: this.form.commodityName, //商品名称
        filePath: this.form.filePath, //商品图片路径
        manufacturer: this.form.manufacturer, //厂商
        policyNo: '0', //保险单号/默认为0
        price: this.form.price, //销售价格/默认为0
        specsParameter: this.form.specsParameter, // 规格参数
        commodityCode: this.form.commodityCode, // 单品编码
      };

      let url = this.$route.query.barcode
        ? "/realbrand-management-service/CommodityMgt/UpdateBarcode"
        : "/realbrand-management-service/CommodityMgt/InsertCommodity";
      console.log(params);

      httpreques("post", params, url).then((res) => {
        if (res.data.code == "SUCCESS") {
          this.$message({
            message: this.$route.query.barcode ? "修改成功" : "添加成功",
            type: "success",
          });
          console.log(res.data);
          this.cancelbtn();
        } else {
          //接口错误处理
          this.$message.error(res.data.msg);
        }
      });
    },
    handleAvatarSuccess(res, file) {
      console.log(file);
      console.log(res);
      // return
      if (res.code === "Success") {
        this.dialogImageUrl = res.data;
        this.form.filePath = res.data;
      }
    },
    cancelbtn() {
      let t = this;
      t.$router.push({ path: "/product" });
    },
  },
  components: {
    Btn,
    NewBreadCrumb,
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/reset.scss";
@import "@/assets/css/image2.scss";
</style>