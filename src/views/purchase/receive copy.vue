<template>
  <div class="receive">
    <div class="receive-child">
      <div class="nosale-title">已收货</div>
      <div class="tools-btns">
        <el-form
          :inline="true"
          :model="formInline"
          class="demo-form-inline"
          size="medium"
        >
          <InpTop />
          <el-form-item label="状态：">
            <el-select v-model="value">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="total">
        <div class="sale-total">
          <div class="smallfont">收货数量</div>
          <div class="bigfont">{{ total }}</div>
        </div>
        <div class="sale-total">
          <div class="smallfont">收货金额</div>
          <div class="bigfont"><span>￥</span>{{price}}</div>
        </div>
      </div>
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
							{{ scope.row.index+1 }}
						</template>
          </el-table-column>
          <el-table-column align="center" prop="commodityCode" label="单品编码" fixed width="200"></el-table-column>
          <el-table-column align="center" prop="barcode" label="商品69码" width="200"></el-table-column>
          <el-table-column align="center" prop="commodityName" label="商品名称" min-width="250"></el-table-column>
          <el-table-column align="center" prop="guigemignc" label="规格名称" width="200"></el-table-column>
          <el-table-column align="center" prop="specsParameter" label="规格参数" width="200"></el-table-column>
          <el-table-column align="center" prop="productstandard" label="产品标准号" width="200"></el-table-column>
          <el-table-column align="center" prop="size" label="商品尺寸"></el-table-column>
          <el-table-column align="center" prop="weight" label="商品重量/质量" width="200"></el-table-column>
          <el-table-column align="center" prop="volume" label="商品体积/容积" width="200"></el-table-column>
          <el-table-column align="center" prop="filePath" label="商品图片" width="200"></el-table-column>
          <el-table-column align="center" prop="effect" label="主要功能/功效" width="200"></el-table-column>
          <el-table-column align="center" prop="type1" label="商品小类"></el-table-column>
          <el-table-column align="center" prop="type2" label="商品中类"></el-table-column>
          <el-table-column align="center" prop="type3" label="商品大类"></el-table-column>
          <el-table-column align="center" prop="baozhuangleixing" label="包装类型"></el-table-column>
          <el-table-column align="center" prop="baozhuangsize" label="包装尺寸"></el-table-column>
          <el-table-column align="center" prop="jianjie" label="商品简介" width="250"></el-table-column>
          <el-table-column align="center" prop="name" label="进货员"></el-table-column>
          <el-table-column align="center" prop="time" label="进货时间"></el-table-column>
          <el-table-column align="center" label="销售单价" width="100" fixed="right">
            <template v-slot="scope">
							￥{{ scope.row.price }}
						</template>
          </el-table-column>
        </el-table>
        <div class="com-bottom">
          <div class="bot">
            <el-pagination background layout="prev, pager, next" :total="pageTotal" :page-size="pageSize" @current-change="handleCurrentChange"></el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InpTop from "../../components/InpTop";
import httpreques from '../../utils/httpreques';
export default {
  name: "Receive",
  data() {
    return {
      formInline: {
        productname: "",
        brandname: "",
      },
      tabledata: [],
      options: [
        {
          value: "全部",
          label: "全部",
        },
      ],
      pageTotal: 0,
      pageNum: 1,
      total: 0,
      price: 0,
      pageSize: 15
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
        if(res.data.code === "SUCCESS"){
          let data = res.data.data
          this.pageTotal = res.data.total
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
              name: '-',
              time: '-',
            })
          }
          this.tabledata.reverse()
        }else{
          this.$message(res.data.msg)
        }
      })
    },
    handleCurrentChange(val){
      this.getdata(val)
    }
  }
};
</script>

<style lang="scss" scoped>
.receive {
  box-sizing: border-box;
  background: #fff;
  padding: 20px;
  height: 100%;
}
.list-btndel {
  margin-left: 30px;
}
.nosale-title {
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: bold;
}
.bot {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
/deep/.el-date-editor {
  width: 600px;
}
/deep/.el-select.el-select--medium .el-input__inner {
  width: 180px;
}
.el-button {
  margin-left: 30px;
}
.total {
  display: flex;
  margin: 10px 0 32px 0;
  .sale-total {
    width: 50%;
    padding: 30px 0;
    border-radius: 12px;
    background-color: rgba(115, 149, 254, 100);
    margin-right: 25px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    .smallfont {
      margin-bottom: 30px;
      font-size: 24px;
      color: #fff;
    }
    .bigfont {
      font-size: 48px;
      color: #fff;
      span {
        font-size: 26px;
      }
    }
  }
}
.sale-total:last-child{
  margin-right: 0;
  background: #60b1ff;
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
}
</style>