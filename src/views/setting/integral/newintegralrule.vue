<template>
  <div class="tab">
    <div class="tab-title">
      <div class="left">
        <div class="print" @click="toBackList"><img class="icon" src="../../../assets/images/back.png" alt=""/><span class="axis">返回列表</span></div>
        <div class="print" @click="add"><img class="icon" src="../../../assets/images/save.png" alt=""/><span class="axis">保存内容</span></div>
        <div class="print"><img class="icon" src="../../../assets/images/print.png" alt="" /><span class="axis">打印列表</span></div>
        <div class="print" @click="exportExcel"><img class="icon" src="../../../assets/images/derive.png" alt="" /><span class="axis">导出表格</span></div>
      </div>
    </div>
    <div class="table-main">
      <div class="right">
        <div class="table-title">
          <p>编辑积分规则</p>
        </div>
         <div class="addintegral">
          <div class="addintegralrule">积分增加规则</div>
          <div class="addintegraltime">积分有效期，从积分获取开始至</div>
          <div>
            <el-select v-model="val" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>  
          <div>12月31日 23:59:59</div>
        </div>
        <table border="1" >
          <tr>
            <td>序号</td>
            <td>规则编码</td>
            <td>规则名称</td>
            <td>规则描述</td>
            <td>启用否</td>
          </tr>
          <tr>
            <td>1</td>
            <td>JFGZ-A01</td>
            <td>注册得积分</td>
            <td>新用户输入手机号完成注册流程，得<input type="text" v-model="points[0]">积分</td>
            <td><input type="checkbox" name="..." value="..." checked /></td>
          </tr>
          <tr>
            <td>2</td>
            <td>JFGZ-A02</td>
            <td>登录签到得积分</td>
            <td>用户登录APP后完成签到，得<input type="text" v-model="points[1]">积分</td>
            <td><input type="checkbox" name="..." value="..." checked /></td>
          </tr>
          <tr>
            <td>3</td>
            <td>JFGZ-A03</td>
            <td>线上首次下单得积分</td>
            <td>用户线上完成首次下单，得<input type="text" v-model="points[2]">积分</td>
            <td><input type="checkbox" name="..." value="..." checked /></td>
          </tr>
          <tr>
            <td>4</td>
            <td>JFGZ-A04</td>
            <td>线上下单得积分</td>
            <td>用户线上下单每消费<input type="text" v-model="money[3]">元，得<input type="text" v-model="points[3]">积分</td>
            <td><input type="checkbox" name="..." value="..." checked /></td>
          </tr>
          <tr>
            <td>5</td>
            <td>JFGZ-A05</td>
            <td>生日当天得N倍积分</td>
            <td>用户生日当天得倍数积分，倍数为<input type="text" v-model="points[4]">倍</td>
            <td><input type="checkbox" name="..." value="..." checked /></td>
          </tr>
        </table>
        <div class="addintegralrule2">积分减少规则</div>
        <table border="1">
          <tr>
            <td>序号</td>
            <td>规则编码</td>
            <td>规则名称</td>
            <td>规则描述</td>
            <td>启用否</td>
          </tr>
          <tr>
            <td>1</td>
            <td>JFGZ-B01</td>
            <td>线上支付订单积分抵现金</td>
            <td>线上支付订单<input type="text" v-model="points[5]">积分，抵现金<input type="text" v-model="money[5]">元，最多抵扣订单金额的<input type="text">%</td>
            <td><input type="checkbox" name="..." value="..." checked /></td>
          </tr>
          <tr>
            <td>1</td>
            <td>JFGZ-B02</td>
            <td>线上订单退款积分扣减</td>
            <td>与规则【线上下单消费得积分】关联</td>
            <td><input type="checkbox" name="..." value="..." checked /></td>
          </tr>
        </table>
        <!-- <div class="addintegralchild">
          <div class="addintegralrule"><p>规则编号</p>
          <div class="system">
            <p><input class="inp" type="text" v-model="ruleId"></p><p>系统生成</p>
          </div>
          <p>规则名称</p><p>注册得积分</p>
          </div>
          <div class="addintegraltime"><p>规则描述</p><p>消费者注册后,</p>得<div><input type="text" v-model="points"></div>积分
          </div>  
        </div>
        <div class="addintegralchild">
          <div class="addintegralrule"><p>规则编号</p>
          <div class="system">
            <p><input class="inp" type="text" ></p><p>系统生成</p>
          </div>
          <p>规则名称</p><p>登录签到得积分</p>
          </div>
          <div class="addintegraltime"><p>规则描述</p><p>消费者登录App签到,</p>得<div><input type="text"></div>积分
          </div>  
        </div>
        <div class="addintegralchild">
          <div class="addintegralrule"><p>规则编号</p>
          <div class="system">
            <p><input class="inp" type="text"></p><p>系统生成</p>
          </div>
          <p>规则名称</p><p>线上首次下单得积分</p>
          </div>
          <div class="addintegraltime"><p>规则描述</p><p>线上首次下单得积分,</p>得<div><input type="text"></div>积分
          </div>  
        </div>
        <div class="addintegral mini">
          <div class="addintegralrule"><p>规则类型</p><p>积分减少</p></div>
        </div>
        <div class="addintegralchild">
          <div class="addintegralrule"><p>规则编号</p>
          <div class="system">
            <p><input class="inp" type="text"></p><p>系统生成</p>
          </div>
          <p>规则名称</p><p>线上支付订单积分抵现</p>
          </div>
          <div class="addintegraltime"><p>规则描述</p><p>线上支付订单</p><div><input type="text"></div>积分抵现<div><input type="text"></div>
          <p>元,最多抵扣订单金额的</p><div><input type="text"></div>
          </div>  
        </div>
        <div class="addintegralchild">
          <div class="addintegralrule"><p>规则编号</p>
          <div class="system">
            <p><input class="inp" type="text"></p><p>系统生成</p>
          </div>
          <p>规则名称</p><p>线上订单退款积分扣减</p>
          </div>
          <div class="addintegraltime"><p>规则描述</p><p>与规则【202100004线上下单消费得积分】关联</p>
          </div>  
        </div>  -->
      </div>
    </div>
  </div>
</template>
<script>
import httpreques from "../../../utils/httpreques";
export default {
  name: "Newintegralrule",
  data() {
    return {
      val:"第1年",
      options: [{
          value: '选项1',
          label: '第1年'
        }, {
          value: '选项2',
          label: '第2年'
      }],
      tabledata:[],
      ruleId:[""],
      money:[0,0,0,10,0,1,0],
      points:[15,3,15,1,2,10,0],
      ruleDescribe:["	"],
      validityPeriod:1
    };
  },
  mounted() {
    this.getdata();
  },
  methods: {
    toBackList(){
      this.$router.go(-1)
    },
    getdata() {
      console.log(this.ruleDescribe);
      httpreques(
        "post",
        {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
        },
        "/realbrand-management-service/IntegralMgt/IntegralRuleList"
      ).then((res) => {
        // console.log(res.data.code);
        if (res.data.code == "SUCCESS") {
          _.forEach(res.data.data, function (item, key) {
            item.index = key + 1; //加入index
          });
          // console.log(res.data)
          this.total = res.data.total;
          this.tabledata = res.data.data;
          this.ruleDescribe = res.data.data[0].ruleDescribe;
          // this.tabledata.reverse()
          console.log(this.tabledata);
          // console.log(this.ruleDescribe);
        } else {
          this.$message(res.data.msg);
        }
      });
    },
    // 编辑积分
    add(){
      let params = {
        "money": [0,0,0,10,0,1,0],
        "points": [15,3,10,1,2,10,0],
        "ruleDescribe": [`新用户输入手机号完成注册流程，得${this.points[0]}积分`,`用户登录APP后完成签到，得${this.points[1]}积份`,`用户线上完成首次下单，得${this.points[2]}积分`,`用户线上下单每消费${this.money[3]}元，得${this.points[3]}积分`,`用户生日当天得倍数积分，倍数为${this.points[4]}倍`,`线上支付订单${this.points[5]}积分，抵现金${this.money[5]}元，最多抵扣订单金额的20%`,`与规则【线上下单消费得积分】关联`],
        "ruleId": ["JFGZ-A01","JFGZ-A02","JFGZ-A03","JFGZ-A04","JFGZ-A05","JFGZ-B01","JFGZ-B02"],
        "ruleState": [
          0,0,0,0,0,1,1
        ],
        "validityPeriod": 1
      }
       httpreques(
        "post",
        params,
        "/realbrand-management-service/IntegralMgt/UpdateIntegralRule"
      ).then((res) => {
        console.log(res);
        if (res.data.code == "SUCCESS") {
          _.forEach(res.data.data, function (item, key) {
            item.index = key + 1; //加入index
          });
          console.log(res.data)
          this.$message.success("编辑积分规则成功");
          this.$router.push("integralrule")
        } else {
          this.$message(res.data.msg);
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import '../../../assets/css/reset.scss';
@import "@/assets/css/image3.scss";
.addintegral{
  display: flex;
  align-items: center;
  margin-top: 5px;
  div{
    margin-right: 5px;
  }
}
/deep/.el-input__inner{
  width: 80px;
  height: 26px;
}
input{
  width: 60px;
  height: 22px;
}
.addintegralrule{
  font-size:12px ;
  font-weight: bold;
  color: #3060a7;
  margin: 20px 0 20px 20px;

}
.addintegralrule2{
  color: #3060a7;
  font-size:12px ;
  font-weight: bold;
  margin: 20px 0 20px 20px;
}
/deep/.el-table{
  padding: 15px;
}
.table-main table{
  width: 560px;
  margin: 0 auto;
  tr td:nth-of-type(1) {
    width: 40px;
    text-align: center;
  }
  tr td:nth-of-type(2) {
    width: 76px;
    text-align: center;
  }
  tr td:nth-of-type(3) {
    width: 140px;
    text-align: center;
  }
  tr td:nth-of-type(4) {
    width: 270px;
    padding: 8px;
  }
  tr td:nth-of-type(5) {
    text-align: center;
  }
}
.right{
  width: 602px;
  height: 808px;
  border: 1px solid #ccc;
}
</style>