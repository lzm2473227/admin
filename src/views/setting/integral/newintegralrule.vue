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
          <div class="addintegralrule"><p>规则类型</p><p>积分增加</p></div>
          <div class="addintegraltime"><p>积分有效期</p><p>从积分获取开始至</p>
            <el-select v-model="val" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <p>12月31日 23:59:59</p>
          </div>  
        </div>
        <div class="addintegralchild">
          <div class="addintegralrule"><p>规则编号</p>
          <div class="system">
            <p><input class="inp" type="text"></p><p>系统生成</p>
          </div>
          <p>规则名称</p><p>注册得积分</p>
          </div>
          <div class="addintegraltime"><p>规则描述</p><p>消费者注册后,</p>得<div><input type="text"></div>积分
          </div>  
        </div>
        <div class="addintegralchild">
          <div class="addintegralrule"><p>规则编号</p>
          <div class="system">
            <p><input class="inp" type="text"></p><p>系统生成</p>
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
        </div>
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
      dialogImageUrl: "",
      dialogVisible: false,
      val:"第1年",
      options: [{
          value: '选项1',
          label: '第1年'
        }, {
          value: '选项2',
          label: '第2年'
      }],
    };
  },
  mounted() {
    // this.getdata();
  },
  methods: {
    toBackList(){
      this.$router.go(-1)
    },
    add(){
      
    }
  }
};
</script>
<style lang="scss" scoped>
.tab-title {
    height: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-image: linear-gradient(#F5FAFD, #E0EDF6);
    border: 1px solid #D0DDE5;
    padding: 0 15px;
    margin-bottom: 10px;
    .left {
        display: flex;
        align-items: center;
        font-size: 14px;
        color: black;
        font-weight: 400;
        .derive {
            display: flex;
            align-items: center;
        }
        .print {
            cursor: pointer;
            display: flex;
            align-items: center;
        }
    }
}
.table-title {
    width: 599px;
    height: 36px;
    line-height: 36px;
    background: #288DFF;
    text-align: center;
    font-size: 14px;
    color: #fff;
}
.icon {
    height: 18px;
    padding-left: 14px;
    padding-right: 4px;
  }
  .print:first-child .icon {
    padding-left: 0;
}
.axis {
    padding-right: 14px;
    border-right: 1px solid #B8D0F2;
}
.print:last-child .axis {
    border-right: 0;
}
.addintegral{
  display: flex;
  flex-direction: column;
  background-color: rgb(136, 136, 136);
  padding:0px 0 10px 0;
  width: 599px;
  p{
    margin: 12px;
  }
}
.mini{
  height: 50px;
}
.addintegralrule{
  display: flex;
  margin-top: 8px;
}
.addintegraltime{
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  div input{
    width: 60px;
    height: 22px;
    border: 1px solid #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 10px;
  }
}
/deep/.el-input__inner{
  width: 90px;
  background-color: #fff;
  color: black;
}
.addintegralchild{
  border: 1px solid rgb(200, 200, 200);
  width: 599px;
  margin: 10px 0;
  background: rgb(242,242,242);
  p{
    margin: 12px;
  }
}
.system{
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  height: 38px;
}
.inp{
  width: 120px;
  
}
.el-select{
  width: 80px;
}
</style>