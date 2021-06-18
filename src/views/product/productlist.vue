<template>
  <div class="tab">
    <div class="tab-title">
      <div class="left">
        <div class="print" @click="addProduct">
          <img class="icon" src="../../assets/images/add.png" alt="" /><span class="axis">新增商品</span>
        </div>
        <div class="print" @click="editproduct">
          <img class="icon" src="../../assets/images/edit.png" alt="" /><span class="axis">编辑商品</span>
        </div>
        <div class="print" @click="delproduct()">
          <img class="icon" src="../../assets/images/delete.png" alt="" /><span class="axis">删除商品</span>
        </div>
        <div class="print" @click="putaway">
          <img class="icon" src="../../assets/images/ic-上架.png" alt="" /><span class="axis">线上商城上架</span>
        </div>
        <div class="print">
          <img class="icon" src="../../assets/images/print.png" alt="" /><span class="axis">打印列表</span>
        </div>
        <div class="print" @click="exportExcel">
          <img class="icon" src="../../assets/images/derive.png" alt="" /><span class="axis">导出表格</span>
        </div>
      </div>
      <div class="right">
        <div class="setup"><img class="set" src="../../assets/images/ic-设置.png" alt="系统设置" @click="setup" /></div>
      </div>
    </div>
    <div class="tab-body">
      <el-table
        :row-class-name="tableRowClassName"
        ref="multipleTable2"
        :data="tabledata"
        style="width: 100%"
        highlight-current-row
        @selection-change="handleSelectionChange"
        :default-sort="{ prop: 'date', order: 'descending' }"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="index" label="序号" align="center" sortable width="80"></el-table-column>
        <el-table-column
          prop="barcode"
          label="商品69编码"
          align="center"
          sortable
          width="150"
        ></el-table-column>
        <el-table-column
          prop="commodityName"
          label="商品名称"
          sortable
          width="240"
        ></el-table-column>
        <el-table-column
          prop="specsParameter"
          label="规格"
          sortable
          width="120"
        ></el-table-column>
        <el-table-column
          prop="brandName"
          label="品牌"
          align="center"
          sortable
          width="120"
        ></el-table-column>
        <el-table-column
          prop="manufacturer"
          label="生产厂商"
          width="150"
          sortable
          align="center"
        ></el-table-column>
        <el-table-column
          prop="b"
          label="商品三级类别"
          width="180"
          sortable
        ></el-table-column>
        <el-table-column
          prop="p"
          label="商品二级类别"
          width="180"
          sortable
        ></el-table-column>
        <el-table-column
          prop="m"
          label="商品一级类别"
          width="180"
          sortable
        ></el-table-column>
        <el-table-column label="商品单价" align="center" sortable width="120">
          <template v-slot="scope"> ￥{{ scope.row.price }} </template>
        </el-table-column>
        <el-table-column prop="time" label="图片" sortable align="center" width="150">
          <template v-slot="scope">
            <img :src="scope.row.filePath" alt="" style="height: 20px;">
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="bot">
      <Page :total="total" :current="pageNum" :pageSize="pageSize" @changeCurrentPage="changeCurrentPage"></Page>
    </div>
    <div class="inp-bot">
      <el-form
        :inline="true"
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="input-with-select"
      >
        <el-form-item label="商品名称:" prop="commodityName" class="name-search">
          <el-input v-model="ruleForm.commodityName" placeholder="请输入商品名称或扫描69码"></el-input>
          <img @click="scan" src="../../assets/images/ic-code.png" alt="" />
        </el-form-item>
        <el-form-item label="商品单价:" prop="price">
          <el-input v-model="ruleForm.price" placeholder="请输入商品单价"></el-input>
        </el-form-item>
        <el-form-item label="品牌:" prop="brand">
          <el-input v-model="ruleForm.brand" placeholder="请输入品牌"></el-input>
        </el-form-item>
        <el-form-item label="商品类别:" prop="category">
          <el-select v-model="ruleForm.category">
            <el-option label="一级类别" value="一级类别"></el-option>
            <el-option label="二级类别" value="二级类别"></el-option>
            <el-option label="三级类别" value="三级类别"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button class="a" type="primary" @click="submitForm">查询</el-button>
          <el-button class="a" type="primary" @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog
      title=""
      v-model="centerDialogVisible"
      width="30%"
      center
      :close-on-click-modal="false"
    >
      <el-input
        type="textarea"
        :rows="5"
        placeholder="请扫描或输入单品编码"
        v-model="textarea"
      >
      </el-input>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="centerDialogVisible = false"
          >确 定</el-button
        >
        <el-button @click="centerDialogVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Page from '@/components/Pagination/page'
import httpreques from "../../utils/httpreques";

export default {
  name: "tab",
  components: {
    Page
  },
  data() {
    return {
      total: 0,
      pageSize: 15,
      pageNum: 1,
      radio1: "按商品69编码统计",
      centerDialogVisible: false,
      textarea: "",
      tabledata: [],
      totalNum: 0,
      multipleSelection: [],
      ruleForm: {
        commodityName: "",
        price: "",
        brand:"",
        category:""
      },
    };
  },
  created() {
    this.getdata();
  },
  methods: {
    getdata() {
      let t = this;
      httpreques(
        "post",
        {
          price: this.ruleForm.price,
          commodityName: this.ruleForm.commodityName,
          pageNum: t.pageNum,
          pageSize: t.pageSize,
        },
        "/realbrand-management-service/CommodityMgt/BarcodeList"
      ).then((res) => {
        // console.log(res.data.code);
        if (res.data.code == "SUCCESS") {
          _.forEach(res.data.data, function (item, key) {
            item.index = key + 1; //加入index
          });
          // console.log(res.data)
          t.total = res.data.total;
          t.pages = res.data.pages;
          t.tabledata = res.data.data;
          t.tabledata.reverse()
        } else {
          this.$message(res.data.msg);
        }
      });
    },
    addProduct() {
      this.$router.replace("/newproduct");
    },
    editproduct() {
      if(this.multipleSelection.length !== 1) return this.$message('请选择一项需要编辑的商品')
      let barcode = this.multipleSelection[0].barcode
      this.$router.push({
        path: "/newproduct",
        query: {
          barcode: barcode,
        },
      });
    },
    delproduct() {
      if(this.multipleSelection.length <= 0) return this.$message.error('请选择需要删除的商品')
      let t = this;
      //抽取commoditycode
      let codearr = [];
      _.forEach(
        JSON.parse(JSON.stringify(t.multipleSelection)),
        function (item, key) {
          codearr.push(item.barcode);
        }
      );
      let params = {
        barcode: codearr
      };
      let url = "/realbrand-management-service/CommodityMgt/DeleteBarcode";
      httpreques("post", params, url).then((res) => {
        // console.log(res)
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
    //上架
    putaway() {
      if(this.multipleSelection.length <= 0) return this.$message.error('请选择需要上架的商品')
      let t = this;
      let codearr = [];
      _.forEach(
        JSON.parse(JSON.stringify(t.multipleSelection)),
        function (item, key) {
          codearr.push(item.barcode);
        }
      );
      // console.log(codearr);  //要进行数据转换，把数组变为字符串
      codearr = codearr.toString();
      let params = {
        barcode: codearr,commodityState:1
      };
      httpreques(
        "post",
        {params},
        "/realbrand-management-service/CommodityMgt/ChangeCommodityState"
      ).then((res) => {
        console.log(res);
        if (res.data.code == "SUCCESS") {
          // _.forEach(res.data.data, function (item, key) {
          //   item.index = key + 1; //加入index
          // });
          // console.log(res.data)
          // t.total = res.data.total;
          // t.pages = res.data.pages;
          // t.tabledata = res.data.data;
          // t.tabledata.reverse()
        } else {
          this.$message(res.data.msg);
        }
      });
    },
    //分页
    changeCurrentPage(val) {
      this.pageNum = val;
      this.getdata();
    },
    submitForm(){
      this.getdata()
    },
    resetForm(){
      this.ruleForm = {}
    },
    exportExcel() {
      let t = this;
      var tHeader = [
        "单品编号",
        "商品69码",
        "商品名称",
        "规格名称",
        "规格参数",
        "产品标准号",
        "商品尺寸",
        "商品重量/质量",
        "商品体积/容积",
        "主要功能/功效",
        "商品小类",
        "商品中类",
        "商品大类",
        "包装类型",
        "包装尺寸",
        "商品简介",
        "售价",
      ];
      var filterVal = [
        "barcode",
        "commodityCode",
        "commodityName",
        "specname",
        "specsParameter",
        "productstandard",
        "productsize",
        "productweight",
        "productvolume",
        "producteffect",
        "productsmall",
        "productmid",
        "productlarge",
        "packingtype",
        "packingsize",
        "productdesc",
        "price",
      ];

      var filename = "商品列表";
      var data = t.formatJson(filterVal, t.multipleSelection);
      export_json_to_excel({
        header: tHeader,
        data,
        filename,
      });
    },
    //序列化json数据
    formatJson(filterVal, tableData) {
      return tableData.map((v) => {
        return filterVal.map((j) => {
          return v[j];
        });
      });
    },
    //添加class样式
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 0) {
        return "warning-row";
      }
      return "";
    },
    formatter(row, column) {
      return row.address;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
  
    scan() {
      this.centerDialogVisible = true;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/reset.scss";
@import "@/assets/css/image2.scss";
</style>
