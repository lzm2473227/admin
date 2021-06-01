<template>
  <div class="tab">
    <div class="tab-title">
      <div class="left">
        <div class="print" @click="toBackList"><img class="icon" src="../../../assets/images/back.png" alt=""/><span class="axis">返回列表</span></div>
        <div class="print" @click="addstore"><img class="icon" src="../../../assets/images/save.png" alt=""/><span class="axis">保存内容</span></div>
        <div class="print"><img class="icon" src="../../../assets/images/print.png" alt="" /><span class="axis">打印列表</span></div>
        <div class="print" @click="exportExcel"><img class="icon" src="../../../assets/images/derive.png" alt="" /><span class="axis">导出表格</span></div>
      </div>
    </div>
    <div class="table-main">
      <div class="right">
        <div class="table-title"><p>编辑等级</p></div>
        <div class="b-title"><p>等级规则</p><p>线上订单每满10元增加1个成长值</p></div>
        <div class="classrule">
          <div class="q">
            <p class="w">等级编号</p><input type="text">  <p class="w">等级名称</p><input type="text">
          </div>
          <div class="q">
            <p class="w">所需成长值</p><input type="text">  <p class="w">等级折扣</p><input type="text">
          </div>
          
        </div>
        <div class="classrule">
          <div class="q">
            <p class="w">等级编号</p><input type="text">  <p class="w">等级名称</p><input type="text">
          </div>
          <div class="q">
            <p class="w">所需成长值</p><input type="text">  <p class="w">等级折扣</p><input type="text">
          </div>
          
        </div>
        <div class="classrule">
          <div class="q">
            <p class="w">等级编号</p><input type="text">  <p class="w">等级名称</p><input type="text">
          </div>
          <div class="q">
            <p class="w">所需成长值</p><input type="text">  <p class="w">等级折扣</p><input type="text">
          </div>
          
        </div>
        <div class="classrule">
          <div class="q">
            <p class="w">等级编号</p><input type="text">  <p class="w">等级名称</p><input type="text">
          </div>
          <div class="q">
            <p class="w">所需成长值</p><input type="text">  <p class="w">等级折扣</p><input type="text">
          </div>
          
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import httpreques from "../../../utils/httpreques";
export default {
  name: "newmemberset",
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
.b-title{
  display: flex;
  p{
    margin: 10px 25px;
  }
}
.classrule{
  display: flex;
  flex-direction: column;
  width: 599px;
  height: 120px;
  justify-content: center;
  background: rgb(242,242,242);
  border: 1px solid #ccc;
  margin-bottom: 25px;
}
.q{
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.w{
  width: 80px;
}
input{
    display: inline-block;
    width: 180px;
    height: 20px;
  }
</style>