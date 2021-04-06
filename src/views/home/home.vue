
<template>
  <Permission roles="kh">
    <!-- 权限控制 【嵌套】-->
    <template #otherwise>
      <Permission roles="business">
        <div class="business-title">商家主页</div>
        <template #otherwise>
          <div class="business-title">测试账号主页</div>
        </template>
      </Permission>
    </template>
    <div class="home">
      <div class="home-left">
        <div class="left-total">
          <div class="total-times">
            <div class="times-title">店铺数据</div>
            <div class="times-radio">
              <el-radio-group v-model="radio2" size="medium">
                <el-radio-button label="昨日"></el-radio-button>
                <el-radio-button label="今日"></el-radio-button>
                <el-radio-button label="最近7天"></el-radio-button>
                <el-radio-button label="最近30天"></el-radio-button>
              </el-radio-group>
            </div>
            <div class="times-picker">
              <div class="picker-title">选择时间</div>
              <el-date-picker
                v-model="value1"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                style="max-width: 240px"
              >
              </el-date-picker>
            </div>
          </div>
          <div class="total-count">
            <div class="count-amount">
              <div class="amount-font">
                <span style="font-weight: bold">交易完成金额</span>
                <span style="font-weight: bold; color: #ff2e2e; font-size: 18px"
                  >¥999.00</span
                >
                <span style="font-weight: bold; margin-top: 10px"
                  >环比：增长 80%</span
                >
              </div>
            </div>
            <div class="count-order">
              <div class="amount-font">
                <span style="font-weight: bold">交易完成订单</span>
                <span style="font-weight: bold; color: #ff2e2e; font-size: 18px"
                  >¥999.00</span
                >
                <span style="font-weight: bold; margin-top: 10px"
                  >环比：增长 80单</span
                >
              </div>
            </div>
            <div class="count-store">
              <div class="amount-font">
                <span style="font-weight: bold">下单门店</span>
                <span style="font-weight: bold; color: #ff2e2e; font-size: 18px"
                  >999</span
                >
              </div>
            </div>
            <div class="count-new-store">
              <div class="amount-font">
                <span style="font-weight: bold">新增下单门店</span>
                <span style="font-weight: bold; color: #ff2e2e; font-size: 18px"
                  >80</span
                >
              </div>
            </div>
          </div>
          <div class="total-chart"></div>
        </div>
        <div class="left-message">
          <div class="message-title">任务提醒</div>
          <div class="message-type">
            <div class="type-store">
              <div class="store-icon"></div>
              <div class="store-tips">
                <div class="tips-font">店铺未认证</div>
                <div class="tips-font tips-font2">去查看></div>
              </div>
            </div>
            <div class="type-order">
              <div class="store-icon"></div>
              <div class="store-tips">
                <div class="tips-font">待处理订单</div>
                <div class="tips-font tips-font2">去处理></div>
              </div>
            </div>
            <div class="type-product">
              <div class="store-icon"></div>
              <div class="store-tips">
                <div class="tips-font">待审核商品</div>
                <div class="tips-font tips-font2">去查看></div>
              </div>
            </div>
            <div class="type-activity">
              <div class="store-icon"></div>
              <div class="store-tips">
                <div class="tips-font">待审核活动报名</div>
                <div class="tips-font tips-font2">去查看></div>
              </div>
            </div>
          </div>
        </div>
        <div class="left-rank">
          <div class="rank-product">
            <div class="product-list">
              <div class="product-title">商品交易排行榜</div>
              <el-table
                row-key="key"
                :data="productdata"
                style="width: 100%"
                header-row-style="font-size: 14px;"
                row-style="border:none"
              >
                <el-table-column prop="productrank" label="商品排行">
                </el-table-column>
                <el-table-column prop="productcount" label="交易完成数量">
                </el-table-column>
                <el-table-column prop="productamount" label="交易完成金额">
                </el-table-column>
              </el-table>
            </div>
          </div>
          <div class="rank-store">
            <div class="product-list">
              <div class="product-title">门交易排行榜</div>
              <el-table
                row-key="key"
                :data="storedata"
                style="width: 100%"
                header-row-style="font-size: 14px;"
              >
                <el-table-column prop="storerank" label="门店排行">
                </el-table-column>
                <el-table-column prop="storeamount" label="交易完成金额">
                </el-table-column>
                <el-table-column prop="storeorder" label="交易完成订单量">
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
      </div>
      <div class="home-right">
        <div class="right-customer base-row">
          <div class="customer-heardimg"></div>
          <div class="custome-base"></div>
        </div>
        <div class="right-notice"></div>
        <div class="right-store"></div>
      </div>
    </div>
  </Permission>
</template>

<script>
import { defineComponent } from "vue";
import Permission from "@/components/Permission/index.vue";
import vPermission from "@/directives/permission";
export default {
  components: {
    Permission,
  },
  directives: {
    permission: vPermission,
  },
  data() {
    return {
      radio2: "最近7天",
      productdata: [
        {
          productrank: "1",
          productcount: "999",
          productamount: "999000",
        },
        {
          productrank: "2",
          productcount: "998",
          productamount: "998000",
        },
        {
          productrank: "3",
          productcount: "997",
          productamount: "997000",
        },
      ],
      storedata: [
        {
          storerank: "a门店",
          storeamount: "999000",
          storeorder: "999",
        },
        {
          storerank: "b门店",
          storeamount: "999000",
          storeorder: "999",
        },
        {
          storerank: "c门店",
          storeamount: "999000",
          storeorder: "999",
        },
      ],
    };
  },
};
</script>
<style scoped>
.base-row {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.base-cloumn {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.home {
  display: flex;
  flex-direction: row;
  padding: 25px;
}
.home-left {
  flex: 4;
  background: #f2f2f2;

  display: flex;
  flex-direction: column;
}
.left-total {
  height: 470px;
  /* background: #fff; */
  display: flex;
  flex-direction: column;
}
.total-times {
  height: 55px;
  background: #fff;
  border-radius: 5px;
  padding: 0 20px 0 20px;
  display: flex;
  flex-direction: row;

  justify-content: space-between;
}
.times-title {
  font-size: 18px;
  color: #333;
  flex: 3;
  display: flex;
  align-items: center;
}
.times-radio {
  /* flex: 2; */
  display: flex;
  align-items: center;
}
.times-picker {
  flex: 2;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
}
.picker-title {
  font-size: 16px;
}
.total-count {
  padding: 10px 0 10px 0;
  display: flex;
  flex-direction: row;
  height: 95px;
  width: 100%;
  justify-content: space-around;
}
.count-amount {
  flex: 1;
  background: rgba(230, 230, 230, 1);
  margin-right: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.amount-font {
  padding: 15px 0 15px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}
.count-order {
  flex: 1;
  background: rgba(230, 230, 230, 1);
  margin-right: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.count-store {
  flex: 1;
  background: rgba(230, 230, 230, 1);
  margin-right: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.count-new-store {
  flex: 1;
  background: rgba(230, 230, 230, 1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.total-chart {
  height: 310px;

  background: #f5f6f9;
}
.left-message {
  height: 185px;
  background: #fff;
  margin: 10px 0 10px 0;
  border: 1px solid gainsboro;
  display: flex;
  flex-direction: column;
}
.message-title {
  padding: 20px 0 20px 20px;
  font-size: 18px;
  font-weight: bold;
}
.message-type {
  height: 80px;
  /* width: 100%; */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.type-blank {
  flex: 1;
}
.type-store {
  flex: 1;
  margin-left: 10px;
  margin-right: 20px;
  background: #e6e6e6;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
.store-tips {
  display: flex;
  flex-direction: column;
  flex: 1;
}
.tips-font {
  font-size: 16px;
  line-height: 22px;
}
.tips-font2 {
  color: red;
}
.store-icon {
  height: 40px;
  width: 40px;
  background: red;
  margin: 0 30px 0 30px;
}

.type-order {
  flex: 1;
  margin-right: 20px;
  background: #e6e6e6;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
.type-product {
  flex: 1;
  margin-right: 20px;
  background: #e6e6e6;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
.type-activity {
  flex: 1;
  background: #e6e6e6;
  margin-right: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
.left-rank {
  height: 305px;

  margin: 0 0 10px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.rank-product {
  flex: 1;
  margin-right: 10px;
  background: #fff;
}
.rank-store {
  flex: 1;
  background: #fff;
}
.home-right {
  flex: 1;
  background: #f2f2f2;
}
.product-list {
  padding-left: 5px;
}
.product-title {
  font-size: 16px;
  font-weight: bold;
  line-height: 60px;
  margin-left: 15px;
}
.table-title {
  font-size: 16px;
  font-weight: normal;
}
.right-customer {
  margin-left: 10px;
  background: #fff;
  height: 160px;
  justify-content: flex-start !important;
}
.customer-heardimg {
  height: 80px;
  width: 80px;
  border-radius: 40px;
  background: chartreuse;
  margin: 0 15px 0 15px;
}
.business-title {
  font-size: 30px;
  padding: 40px 0 0 40px;
}
/* element 自定义样式 */
.el-date-editor--datetimerange.el-input__inner {
  width: 100px !important;
}
.el-row {
  margin-bottom: 20px;
  width: 100%;
  height: 100%;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  width: 100%;
  height: 100%;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>