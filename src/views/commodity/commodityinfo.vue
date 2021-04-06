<template>
  <div class="indexlayout-main-conent">
    <div class="searchinfo">
      <el-card
        shadow="never"
        class="cus-card"
        style="margin-bottom: 15px"
        :body-style="{ 'padding-bottom': '0' }"
      >
        <el-form
          :model="searchModelRef"
          ref="searchFormRef"
          label-width="100px"
        >
          <el-row
            :gutter="18"
            type="flex"
            justify="start"
            class="flex-wrap-wrap"
          >
            <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
              <el-form-item label="商品名称">
                <el-input placeholder="请输入商品名称" v-model="commdityname" />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
              <el-form-item label="商品创建时间">
                <el-date-picker
                  v-model="commoditytime"
                  type="date"
                  placeholder="选择日期"
                  @change="selectcommoditytime"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
              <el-form-item label="商品类型">
                <SelectType
                  placeholder="请选择"
                  :arrdata="commoditytype"
                  @typekey="selectcommoditytype"
                />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
              <el-form-item label="排序">
                <SelectType
                  placeholder="请选择"
                  :arrdata="oderby"
                  @typekey="selectoderby"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
    </div>
    <div class="commoditybtns">
      <div class="btn-newcommodity">
        <el-button type="primary" @click="jumpcommdity('newcommodity')" >新增商品</el-button>
      </div>
      <div class="btn-exportcommodity">
        <el-button plain @click="exportExcel">导出商品</el-button>
      </div>
    </div>
    <div class="commoditystatus">
      <el-radio-group
        v-model="commoditystatus"
        size="medium"
        @change="selectcommoditystatus"
      >
        <el-radio-button label="全部"></el-radio-button>
        <el-radio-button label="待售"></el-radio-button>
        <el-radio-button label="在售"></el-radio-button>
        <el-radio-button label="已售罄"></el-radio-button>
      </el-radio-group>
    </div>
    <div class="listinfo">
      <el-table
        ref="multipleTable"
        :data="commoditydata"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        id="out-table"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="commodityname" label="商品名称" width="120">
        </el-table-column>
        <el-table-column prop="salecount" label="销量" width="120">
        </el-table-column>
        <el-table-column prop="specification" label="规格" width="120">
        </el-table-column>
        <el-table-column prop="stock" label="库存" width="120">
        </el-table-column>
        <el-table-column prop="price" label="店铺售价" show-overflow-tooltip>
        </el-table-column>
      </el-table>
    </div>
    <div class="padding-t10 text-align-right">
      <el-pagination
        background
        :page-size="pageSize"
        :total="total"
        @current-change="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        layout="  prev, pager, next,sizes, jumper"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import SelectType from "../../components/order/SelectType";
import { export_json_to_excel } from "../../utils/Export2Excel.js";
import _ from "lodash";
 
export default {
  name: "Commodityinfo",
  components: {
    SelectType,
  },
  data() {
    return {
      pageSize: 10,
      total: 999,
      commodityname: "",
      commoditytype: [
        {
          key: "0",
          value: "一级分类",
        },
        {
          key: "1",
          value: "二级分类",
        },
      ],
      commoditytime: "",
      oderby: [
        { key: "0", value: "按时间排序" },
        { key: "1", value: "按名称排序" },
        { key: "2", value: "按类型排序" },
      ],
      commoditystatus: "全部",
      multipleSelection: [],
      commoditydata: [
        {
          index: 1,
          commodityname: "测试商品01",
          salecount: "1000",
          specification: "黑；6瓶*500ml",
          stock: "99",
          price: "999.00",
        },
        {
          index: 2,
          commodityname: "测试商品02",
          salecount: "1000",
          specification: "黑；6瓶*500ml",
          stock: "99",
          price: "999.00",
        },
        {
          index: 3,
          commodityname: "测试商品03",
          salecount: "1000",
          specification: "黑；6瓶*500ml",
          stock: "99",
          price: "999.00",
        },
        {
          index: 4,
          commodityname: "测试商品04",
          salecount: "1000",
          specification: "黑；6瓶*500ml",
          stock: "99",
          price: "999.00",
        },
        {
          index: 5,
          commodityname: "测试商品05",
          salecount: "1000",
          specification: "黑；6瓶*500ml",
          stock: "99",
          price: "999.00",
        },
      ],
    };
  },
  mounted() {},
  methods: {
    selectcommoditytype() {},
    selectcommoditytime() {},
    selectoderby() {},
    selectcommoditystatus() {},
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    currentPage() {},
    exportExcel() {
      let t = this;
      var tHeader = ["商品名称", "销量", "规格", "库存", "店铺售价"];
      var filterVal = [
        "commodityname",
        "salecount",
        "specification",
        "stock",
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
    jumpcommdity(path){
   
      let t = this;
       t.$router.push({ path: path });
    }
  },
};
</script>

<style lang="scss" scoped>
.commodityifno {
  height: 100%;
  width: 100%;
}
.commoditybtns {
  padding-top: 50px;
  width: 200px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .el-button--primary {
    background-color: #409eff;
    border-color: #409eff;
  }
}
.commoditystatus {
  padding: 30px 0 0 0;
}
.listinfo {
  padding-top: 10px;
}
</style>