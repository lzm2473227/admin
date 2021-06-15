<template>
  <div class="tab">
    <div class="tab-title">
      <div class="left">
        <div class="print" @click="delproduct()">
          <img class="icon" src="../../assets/images/delete.png" alt="" /><span class="axis">线上商城下架</span>
        </div>
        <div class="print">
          <img class="icon" src="../../assets/images/print.png" alt="" /><span class="axis">打印列表</span>
        </div>
        <div class="print" @click="exportExcel">
          <img class="icon" src="../../assets/images/derive.png" alt="" /><span class="axis">导出表格</span>
        </div>
      </div>
      <div class="right">
        <div class="setup">
          <img
            class="set"
            src="../../assets/images/ic-设置.png"
            alt="系统设置"
            @click="setup"
          />
        </div>
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
        <el-table-column prop="barcode" label="商品69编码" align="center" sortable width="150"></el-table-column>
        <el-table-column prop="commodityName" label="商品名称" align="center" sortable width="240"></el-table-column>
        <el-table-column prop="specsParameter" label="规格" width="120"></el-table-column>
        <el-table-column prop="brandName" label="品牌" width="120"></el-table-column>
        <el-table-column prop="manufacturer" label="生产厂商" width="150"></el-table-column>
        <el-table-column prop="classifyRsp.b" label="商品三级类别" width="180"></el-table-column>
        <el-table-column prop="classifyRsp.p" label="商品二级类别" width="180"></el-table-column>
        <el-table-column prop="classifyRsp.m" label="商品一级类别" width="180"></el-table-column>
        <el-table-column label="商品单价" sortable width="120">
          <template v-slot="scope"> ￥{{ scope.row.price }} </template>
        </el-table-column>
        <el-table-column prop="time" label="图片" align="center" width="150">
          <template v-slot="scope"><img :src="scope.row.filePath" alt="" style="height: 20px;"></template>
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
  name: "commodity2",
  components: {
    Page
  },
  data() {
    return {
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
      total: 0,
      pageSize: 15,
      pageNum: 1,
    };
  },
  mounted() {
    this.getdata()
  },
  methods: {
    getdata() {
      let t = this;
      let params= {
        // brandName: "",
        // categoryId: "",
        // commodityName: "",
        pageNum: t.pageNum,
        pageSize: t.pageSize,
        // price: ""
      }
      httpreques(
        "post",
         params,
        "/realbrand-management-service/CommodityMgt/OnSaleCommodityList"
      ).then((res) => {
        console.log(res);
        if (res.data.code == "SUCCESS") {
          _.forEach(res.data.data, function (item, key) {
            item.index = key + 1; //加入index
          });
          t.total = res.data.total;
          t.pageSize = res.data.pageSize;
          t.pageNum = res.data.pageNum;
          t.tabledata = res.data.data;
          // t.categoryImage = res.data.data.categoryImage;
          t.tabledata.reverse()
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
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/reset.scss";
@import "@/assets/css/image2.scss";
</style>
