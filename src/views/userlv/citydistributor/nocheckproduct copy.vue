<template>
  <div class="nocheckproduct">
    <div class="nocheckproduct-title">待收货</div>

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

    <div class="product-list">
      <el-table
        ref="multipleTable"
        :data="tabledata"
        tooltip-effect="dark"
        style="width: 100%"
        stripe="true"
        fit="true"
        border
        header-cell-style="background:#F6FAFF"
      >
        <el-table-column align="center" label="序号" width="50" fixed>
            <template v-slot="scope">
							{{ scope.row.index+1 | reverseIndex }}
						</template>
          </el-table-column>
          <el-table-column align="center" prop="commodityCode" label="单品编码" fixed width="200"></el-table-column>
          <el-table-column align="center" prop="barcode" label="商品69码" width="200"></el-table-column>
          <el-table-column align="center" prop="commodityName" label="商品名称" min-width="250"></el-table-column>
          <el-table-column align="center" prop="specname" label="规格名称" width="200"></el-table-column>
          <el-table-column align="center" prop="specsParameter" label="规格参数" width="200"></el-table-column>
          <el-table-column align="center" prop="productstandard" label="产品标准号" width="200"></el-table-column>
          <el-table-column align="center" prop="productsize" label="商品尺寸"></el-table-column>
          <el-table-column align="center" prop="productweight" label="商品重量/质量" width="200"></el-table-column>
          <el-table-column align="center" prop="productvolume" label="商品体积/容积" width="200"></el-table-column>
          <el-table-column align="center" prop="productimg" label="商品图片" width="200"></el-table-column>
          <el-table-column align="center" prop="producteffect" label="主要功能/功效" width="200"></el-table-column>
          <el-table-column align="center" prop="producteffect" label="商品小类"></el-table-column>
          <el-table-column align="center" prop="producteffect" label="商品中类"></el-table-column>
          <el-table-column align="center" prop="producteffect" label="商品大类"></el-table-column>
          <el-table-column align="center" prop="producteffect" label="包装类型"></el-table-column>
          <el-table-column align="center" prop="producteffect" label="包装尺寸"></el-table-column>
          <el-table-column align="center" prop="producteffect" label="商品简介" width="250"></el-table-column>
          <el-table-column align="center" prop="productprice" label="进货员"></el-table-column>
          <el-table-column align="center" prop="productprice" label="进货时间"></el-table-column>
          <el-table-column align="center" label="销售单价" width="100" fixed="right">
            <template v-slot="scope">
							￥{{ scope.row.price }}
						</template>
          </el-table-column>
      </el-table>
      <div class="com-bottom">
        <div class="bot">
          <el-pagination background layout="prev, pager, next" :total="pageNum" :page-size="pageSize" @current-change="handleCurrentChange"></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InpTop from "../../components/InpTop";
import httpreques from '../../utils/httpreques';
export default {
  name: "Nocheckproduct",
  data() {
    return {
      formInline: {
        productname: "",
        brandname: "",
      },
      pageNum: 1,
      pageSize: 15,
      tabledata: [],
    };
  },
  components: {
    InpTop,
  },
  created() {
    this.getdata(this.pageNum)
  },
  methods: {
    getdata(pageNum){
      let parame = {
        "barcode": "",
        "codeState": "",
        "commodityCode": "",
        "commodityName": "",
        "pageNum": pageNum,
        "pageSize": this.pageSize
      }
      this.tabledata = []
      httpreques('post', parame, '/realbrand-management-service/CommodityMgt/queryReceivedCommodityList').then(res => {
        console.log(res)
        if(res.data.code === 'SUCCESS'){
          let data = res.data.data
          this.pageNum = res.data.total
          this.total = res.data.total
          for(let i = 0; i < data.length; i++){
            this.tabledata.push({
              index: i,
              barcode: data[i].barcode,
              brandName: data[i].brandName,
              commodityCode: data[i].commodityCode,
              commodityName: data[i].commodityName,
              filePath: data[i].filePath,
              id: data[i].id,
              manufacturer: data[i].manufacturer,
              policyNo: data[i].policyNo,
              price: data[i].price,
              specsParameter: data[i].specsParameter,
              guigemignc: '-',
              size: '-',
              productstandard: '-',
              weight: '-',
              volume: '-',
              type1: '-',
              type2: '-',
              type3: '-',
              baozhuangleixing: '-',
              baozhuangsize: '-',
              jianjie: '-',
              sellname: '-',
              selltime: '-',
              selltype: '-',
              sellstatus: '-'
            })
          }
          this.tabledata.reverse()
        }else{
          console.log(555)
          this.$message(res.data.msg)
        }
      })
    },
    handleCurrentChange(val){
      this.getdata(val)
    }
  },
};
</script>

<style lang="scss" scoped>
.nocheckproduct {
  box-sizing: border-box;
  background: #fff;
  padding: 20px;
  height: 100%;
}
.list-btndel {
  margin-left: 30px;
}
.nocheckproduct-title {
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: bold;
}
.bot {
  display: flex;
  justify-content: center;
}
.bot {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
/deep/.el-input__inner {
  width: 328px;
  margin-right: 50px;
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
}
</style>