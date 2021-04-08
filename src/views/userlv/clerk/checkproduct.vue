<template>
  <div class="checkproduct">
    <div class="checkproduct-child">
      <div class="nosale-title">已盘点</div>
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
      <!-- <div class="total">
        <div class="check-total">
          <div class="check-total-child">
            <p class="check-time">本次盘点时间：2021.03.15 09:00</p>
            <p>本次盘点数：202</p>
          </div>
          <div class="check-total-child">
            <p class="check-name">本次盘点人：王海</p>
            <p>本次账存数：2021</p>
          </div>
        </div>
        <div class="check-total">
          <div class="check-total-child">
            <p class="check-time">上次盘点时间：2021.03.15 09:00</p>
            <p>上次盘点数：202</p>
          </div>
          <div class="check-total-child">
            <p class="check-name">上次盘点人：王海</p>
            <p>上次账存数：2021</p>
          </div>
        </div>
      </div> -->
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
          <el-table-column align="center" prop="productprice" label="盘货员"></el-table-column>
          <el-table-column align="center" prop="scanTime" label="盘货时间" width="200"></el-table-column>
          <el-table-column align="center" label="售价" fixed="right">
            <template v-slot="scope">
							￥{{ scope.row.price }}
						</template>
          </el-table-column>
        </el-table>
        <div class="com-bottom">
          <div class="bot">
            <el-pagination background layout="prev, pager, next" :total="pageTotal" :page-size="pageSize" @current-change="handleCurrentChange">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InpTop from "../../../components/InpTop";
import httpreques from '../../../utils/httpreques';
import moment from 'moment';
export default {
  name: "Checkproduct",
  data() {
    return {
      formInline: {
        productname: "",
        brandname: "",
      },
      tabledata: [],
      options: [],
      time: '',
      pageNum: 1,
      pageTotal: 0,
      pageSize: 15
    };
  },
  computed: {
    filterTime(){
      return function(val){
        let date = new Date(val)
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        var h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        var minute = date.getMinutes();
        minute = minute < 10 ? ('0' + minute) : minute;
        let time = y + '-' + m + '-' + d +' '+ h + ':' + minute
        return time
      }
    }
  },
  components: {
    InpTop,
  },
  created() {
    this.getdata(this.pageNum)
  },
  methods: {
    getdata(pageNum){
      let param = {
        "barCode": "",
        "commodityCode": "",
        "commodityName": "",
        "pageNum": pageNum,
        "pageSize": this.pageSize
      }
      this.tabledata = []
      httpreques('post', param, '/realbrand-management-service/Inventory/InventoryList').then(res => {
        console.log(res)
        if(res.data.code === 'SUCCESS'){
          let data = res.data.data
          data.forEach(item => {
            item.scanTime = moment(item.scanTime).format(
              "YYYY-MM-DD HH:mm:ss"
            );
          })
          this.pageTotal = res.data.total
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
              sellstatus: '-',
              scanTime: data[i].scanTime
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
@import '../../../assets/css/reset'
</style>