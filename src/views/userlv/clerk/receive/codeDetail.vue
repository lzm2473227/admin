<template>
  <form ref="form">
    <div class="tab">
      <div class="tab-title">
        <div class="left">
          <div class="print" @click="goBack">
            <img class="icon" src="@/assets/images/back.png" alt=""/><span class="axis">返回列表</span>
          </div>
          <div class="print" @click="addcomm()">
            <img class="icon" src="@/assets/images/save.png" alt=""/><span class="axis">保存内容</span>
          </div>
          <div class="print">
            <img class="icon" src="@/assets/images/print.png" alt=""/><span class="axis">打印列表</span>
          </div>
          <div class="print" @click="exportExcel">
            <img class="icon" src="@/assets/images/derive.png" alt=""/><span class="axis">导出表格</span>
          </div>
        </div>
        <div class="right">
          <!-- <div class="setup">
          <img class="set" src="../../assets/images/ic-设置.png" alt="系统设置" @click="setup">
        </div> -->
        </div>
      </div>
      <div class="table-main">
        <div>
        <div class="table-title">
          <p>商品基本信息</p>
        </div>
        <table border="1" class="">
          <tr>
            <td class="table-left">单品编码</td>
            <td class="table-right">{{form.commodityCode}}</td>
            <td class="table-left">商品69编码</td>
            <td class="table-right">{{form.barcode}}</td>
          </tr>
          <tr>
            <td class="table-left">商品名称</td>
            <td class="table-right">{{form.commodityName}}</td>
            <td class="table-left">商品规格</td>
            <td class="table-right">{{form.specsParameter}}</td>
          </tr>
          <tr>
            <td class="table-left">生产厂家</td>
            <td class="table-right">{{form.manufacturer}}</td>
            <td class="table-left">商品品牌</td>
            <td class="table-right">{{form.brandName}}</td>
          </tr>
          <tr>
            <td class="table-left">商品售价</td>
            <td class="table-right">{{form.price}}</td>
            <td class="table-left">商品尺寸</td>
            <td class="table-right">{{form.data}}</td>
          </tr>
          <tr>
            <td class="table-left">商品小类</td>
            <td class="table-right">{{form.data}}</td>
            <td class="table-left">批准文号</td>
            <td class="table-right">{{form.data}}</td>
          </tr>
          <tr>
            <td class="table-left">商品中类</td>
            <td class="table-right">{{form.data}}</td>
            <td class="table-left">包装类型</td>
            <td class="table-right">{{form.data}}</td>
          </tr>
          <tr>
            <td class="table-left">商品大类</td>
            <td class="table-right">{{form.data}}</td>
            <td class="table-left">包装尺寸</td>
            <td class="table-right">{{form.data}}</td>
          </tr>
          <tr>
            <td class="table-left" style="height: 42px;">商品体积<br/><span style="padding-top: 5px; display: inline-block;">（容积）</span></td>
            <td class="table-right">{{form.data}}</td>
            <td class="table-left" style="height: 42px;">商品重量<br/><span style="padding-top: 5px; display: inline-block;">（质量）</span></td>
            <td class="table-right">{{form.data}}</td>
          </tr>
          <tr>
            <td class="table-left" style="height: 42px;">主要功能<br/><span style="padding-top: 5px; display: inline-block;">（功效）</span></td>
            <td class="table-right" colspan="3">{{form.data}}</td>
          </tr>
          <tr  style="height: 70px; vertical-align: top;">
            <td class="table-left" style="padding-top: 8px;">商品简介</td>
            <td class="table-right" colspan="3">{{form.data}}</td>
          </tr>
          <tr style="vertical-align: top;">
            <td class="table-left" style="padding-top: 8px;">商品图片</td>
            <td class="table-right" colspan="3" style="height: 200px; padding-top: 6px;">
            <div class="demo-image__preview">
                <el-image 
                    style="width: 100px; height: 100px"
                    :src="url" 
                    :preview-src-list="srcList">
                </el-image>
            </div>
            </td>
          </tr>
        </table>
        </div>
        <div style="margin-top: 10px;">
        <div class="table-title">
          <p>门店侧</p>
        </div>
        <table border="1" class="">
          <tr>
            <td class="table-left">机构代码</td>
            <td class="table-right">{{form.data}}</td>
            <td class="table-left">门店名称</td>
            <td class="table-right">{{form.data}}</td>
          </tr>
          <tr>
            <td class="table-left">门店类别</td>
            <td class="table-right">{{form.data}}</td>
            <td class="table-left">销售单价</td>
            <td class="table-right">{{form.data}}</td>
          </tr>
          <tr>
            <td class="table-left">进货操作人</td>
            <td class="table-right">{{form.data}}</td>
            <td class="table-left">进货时间</td>
            <td class="table-right">{{form.data}}</td>
          </tr>
          <tr>
            <td class="table-left">盘货操作人</td>
            <td class="table-right">{{form.data}}</td>
            <td class="table-left">盘货时间</td>
            <td class="table-right">{{form.data}}</td>
          </tr>
          <tr>
            <td class="table-left">销售操作人</td>
            <td class="table-right">{{form.data}}</td>
            <td class="table-left">销售时间</td>
            <td class="table-right">{{form.data}}</td>
          </tr>
          <tr>
            <td class="table-left">门店地址</td>
            <td class="table-right" colspan="3">{{form.data}}</td>
          </tr>
          <tr style="vertical-align: top;">
            <td class="table-left" style="padding-top: 8px;">门店许可证</td>
            <td class="table-right" colspan="3" style="height: 110px; padding-top: 6px;">
            <div class="demo-image__preview">
                <el-image 
                    style="width: 100px; height: 100px"
                    :src="url" 
                    :preview-src-list="srcList">
                </el-image>
            </div>
            </td>
          </tr>
        </table>
        </div>
      </div>
    </div>
  </form>
</template>
<script>
import Btn from "@/components/Btn";
import httpreques from "@/utils/httpreques";
import NewBreadCrumb from "@/layouts/IndexLayout/components/NewBreadCrumb";
export default {
  name: "Newproduct",
  data() {
    return {
      form: {},
      url:"",
      srcList: [],
      categoriesCatalog:[],//三级目录
    };
  },
  mounted() {
    this.getdata();
  },
  methods: {
    getdata() {
      let commodityCode = this.$route.query.commodityCode;
      if (commodityCode) {
        let params = {
          commodityCode: commodityCode,
        };
        httpreques(
          "post",
          params,
          "/realbrand-management-service/CommodityMgt/CommodityInfo"
        ).then((res) => {
          console.log(res);
          if (res.data.code === "SUCCESS") {
            let commobj = res.data.data;
            // this.imgArr.push({url: commobj.filePath})
            // this.dialogImageUrl = commobj.filePath;
            commobj.data = '——'
            this.form = commobj
            this.url = commobj.filePath
            this.srcList.push(commobj.filePath)
            console.log(this.srcList)
          } else {
            //接口错误处理
            this.$message.error(res.data.msg);
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
    //三级目录
    threedirectories() {
      httpreques(
        "post",{},"/realbrand-management-service/Classify/queryCategoriesCatalogApi"
      ).then((res) => {
        if (res.data.code === "SUCCESS") {
          this.categoriesCatalog = res.data.data.categoriesCatalog;
          this.getTreeData(this.categoriesCatalog)
          
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    //解决出现空白选项的bug
    getTreeData(data){
        // 循环遍历json数据
        for(var i=0;i<data.length;i++){
            if(data[i].subItemList== "null"||data[i].subItemList.length<1){
                // children若为空数组，则将children设为undefined
                data[i].subItemList=undefined;
            }else {
                // children若不为空数组，则继续 递归调用 本方法
                this.getTreeData(data[i].subItemList);
            }
        }
        return data;
    },
    handleAvatarSuccess(res, file) {
      console.log(file);
      console.log(res);
      // return
      if (res.code === "SUCCESS") {
        this.dialogImageUrl = res.data;
        this.form.filePath = res.data;
      }
    },
    cancelbtn() {
      let t = this;
      t.$router.push({ path: "/product" });
    },
    goBack(){
        this.$router.go(-1)
    }
  },
  components: {
    Btn,
    NewBreadCrumb,
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/reset.scss";
@import "@/assets/css/image1.scss";
/deep/.el-cascader{
    width: 100%;
    height: 20px;
    line-height: 20px;
}
/deep/.el-input__inner {
    width: 100%;
    height: 20px
}
/deep/.el-input--small{
  line-height: 24px;
}
</style>