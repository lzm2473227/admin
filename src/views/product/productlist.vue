<template>
  <div class="product">
    <div class="product-tools">
      <div class="tools-pagetitle" style="">商品资料</div>
      <div class="tools-btns">
        <el-form
          :inline="true"
          :model="formInline"
          class="demo-form-inline"
          size="medium"
        >
          <InpTop />
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <Permission roles="md">
        <div class="tools-new">
          <el-button type="primary" @click="addProduct">新增商品</el-button>
          <el-button type="primary">打印列表</el-button>
          <el-button type="primary" @click="exportExcel">导出列表</el-button>
          <el-button type="primary">导入列表</el-button>
        </div>
        <template #otherwise>
          <!-- 需要添加空的div 否则默认无权限 -->
          <div></div>
        </template>
      </Permission>
    </div>
    <Permission roles="md">
      <div class="product-list2">
        <el-table
          ref="multipleTable2"
          :data="tabledata"
          tooltip-effect="dark"
          style="width: 100%"
          border
          stripe
          header-cell-style="background:#f6faff"
          @selection-change="handleSelectionChange"
          :default-sort="{ prop: 'index', order: 'descending' }"
        >
          <el-table-column type="selection" width="55" fixed> </el-table-column>
          <el-table-column
            prop="index"
            label="序号"
            width="50"
            fixed
          ></el-table-column>
          <el-table-column
            prop="commodityCode"
            label="单品编号"
            width="120"
            fixed
          ></el-table-column>
          <el-table-column
            prop="barcode"
            label="商品69码"
            width="120"
          ></el-table-column>
          <el-table-column
            prop="commodityName"
            label="商品名称"
            width="120"
          ></el-table-column>
          <el-table-column
            prop="specname"
            label="规格名称"
            width="120"
          ></el-table-column>
          <el-table-column
            prop="specsParameter"
            label="规格参数"
            width="120"
          ></el-table-column>
          <el-table-column
            prop="productstandard"
            label="产品标准号"
            width="120"
          ></el-table-column>
          <el-table-column
            prop="productsize"
            label="商品尺寸"
            width="120"
          ></el-table-column>
          <el-table-column
            prop="productweight"
            label="商品重量/质量"
            width="120"
          ></el-table-column>
          <el-table-column
            prop="productvolume"
            label="商品体积/容积"
            width="120"
          ></el-table-column>
          <el-table-column
            prop="filePath"
            label="商品图片"
            width="120"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="producteffect"
            label="主要功能/功效"
            width="120"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="productsmall"
            label="商品小类"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="productmid"
            label="商品中类"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="productlarge"
            label="商品大类"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="packingtype"
            label="包装类型"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="packingsize"
            label="包装尺寸"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="productdesc"
            label="商品简介"
          ></el-table-column>
          <el-table-column
            prop="price"
            label="售价"
            width="120"
            fixed="right"
          ></el-table-column>
          <el-table-column label="操作" width="100" fixed="right">
            <template #default="scope">
              <div
                @click="editproduct(scope.row.commodityCode)"
                class="operation-title"
              >
                编辑
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div style="margin-top: 20px">
          <el-checkbox
            v-model="checkall"
            @change="selectall()"
            class="list-checkall"
            >全选</el-checkbox
          >
          <el-button type="danger" @click="delproduct()" plain class="list-btndel">删除</el-button>
        </div>
      </div>

      <template #otherwise>
        <div class="product-list">
          <el-table
            ref="multipleTable"
            :data="tabledata"
            tooltip-effect="dark"
            style="width: 100%"
            stripe
            border
            fit="true"
            header-cell-style="background:#f6faff"
            :default-sort="{ prop: 'index', order: 'descending' }"
          >
            <el-table-column prop="index" width="50"  label="序号"> </el-table-column>
            <el-table-column
              prop="commodityCode"
              label="单品编号"
              width="250"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="barcode"
              label="商品69码"
              width="250"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="commodityName"
              label="商品名称"
              width="300"
              align="center"
            >
            </el-table-column>

            <el-table-column
              prop="productstatus"
              label="商品状态"
              width="200"
              align="center"
            ></el-table-column>

            <el-table-column
              prop="endtime"
              label="最新操作时间"
               
              align="center"
            >
            </el-table-column>
            <!-- <el-table-column label="操作" align="center">
              <div class="operation-title" @click="jumpproductinfo">
                查看详情
              </div>
            </el-table-column> -->
          </el-table>
        </div>
      </template>
    </Permission>
    <div class="com-bottom">
      <div class="bot">
        <el-pagination background layout="prev, pager, next" :total="total"
          :page-size="pageSize" @current-change="currentchange">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import Permission from "@/components/Permission/index.vue";
import httpreques from "../../utils/httpreques";
import InpTop from "../../components/InpTop/index";
import { export_json_to_excel } from "../../utils/Export2Excel.js";
import _ from "lodash";
import store from "../../store";
export default {
  name: "Product",
  data() {
    return {
      pageSize:15,
      pageIndex:1,
      total:0,
      formInline: {
        commodityName: "",
        commodityName: "",
      },
      barcode: "",
      commodityCode: "",
      commodityName: "",
      checkall: false,
      tabledata: [],
      multipleSelection: [],
      idNumber: ''
    };
  },
  created() {
    this.getdata();
  },
  mounted() {},
  methods: {
    addProduct() {
      this.$router.replace("/newproduct");
    },
    jumpproductinfo() {
      this.$router.replace("/productinfo");
    },

    getdata() {
      let t = this;
      httpreques(
        "post",
        {
          pageNum: t.pageIndex,
          pageSize: t.pageSize,
        },
        "/realbrand-management-service/CommodityMgt/CommodityInfoList"
      ).then((res) => {
        if (res.data.code == "SUCCESS") {
          _.forEach(res.data.data, function (item, key) {
            item.index = key + 1; //加入index
          });
          console.log(res.data)
          t.total = res.data.total;
          t.tabledata = res.data.data;
        } else {
          //接口错误处理
        }
      });
    },
    editproduct(commodityCode) {
      let t = this;
      t.$router.push({
        path: "/newproduct",
        query: {
          commodityCode: commodityCode,
        },
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    selectall() {
      let t = this;

      t.$refs["multipleTable2"].toggleAllSelection(); //element 全选函数
      t.checkall == true
        ? (t.multipleSelection = JSON.parse(JSON.stringify(t.tabledata)))
        : (t.multipleSelection = []);
      t.checkall = t.checkall === true ? true : false;
    },
    delproduct(){
      let  t =this;
      //抽取commoditycode 
      let codearr = [];
       _.forEach(JSON.parse(JSON.stringify(t.multipleSelection)),function(item,key){
           codearr.push(item.commodityCode);
       })
       let params = {
          commodityCode : codearr
        };
        let url = "/realbrand-management-service/CommodityMgt/DeleteCommodity";
        httpreques("post", params, url).then((res) => {
          if (res.data.code == "SUCCESS") {
            t.$message({
              message:  "删除成功",
              type: "success",
            });
            t.getdata();
          } else {
            //接口错误处理
            t.$message.error(res.data.msg);
          }
        });
     
    },
    currentchange(index){
    
        let t = this;
        t.pageIndex = index;
        t.getdata();
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
  },
  components: {
    InpTop,
    Permission,
  },
};
</script>
<style lang="scss" scoped>
.product {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  height: 100%;
  
}
.product-tools {
  padding: 20px;
  font-size: 20px;
  font-weight: bold;
}
.tools-pagetitle {
  color: #101010;
  font-size: 20px;
  font-family: SourceHanSansSC-regular;
  font-weight: bold;
  margin: 0 0 20px 0;
}
.demo-form-inline {
  .el-input--medium .el-input__inner {
    width: 250px;
  }
}
.tools-new {
  padding-bottom: 20px;
}
.list-btndel {
  margin-left: 30px;
}
.list-checkall {
  margin-left: 15px;
}
.product-list {
  box-sizing: border-box;
  padding: 10px 0 0 10px;
}
.product-list2 {
  // width:calc(100% - 200px);
  display: block;
  box-sizing: border-box;
  // width: 1200px;
}
.operation-title {
  color: #3daeff;
  cursor: pointer;
}
.bot {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
/deep/ .el-table--striped .el-table__body tr.el-table__row--striped td {
  background: #f6faff;
}
</style>