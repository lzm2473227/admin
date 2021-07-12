<template>
  <div class="tab">
    <div class="tab-title">
      <!-- <div class="left">
        <div class="print" @click="toBackList"><img class="icon" src="../../../assets/images/back.png" alt=""/><span class="axis">返回列表</span></div>
        <div class="print" @click="addstore"><img class="icon" src="../../../assets/images/save.png" alt=""/><span class="axis">保存内容</span></div>
        <div class="print"><img class="icon" src="../../../assets/images/print.png" alt="" /><span class="axis">打印列表</span></div>
        <div class="print" @click="exportExcel"><img class="icon" src="../../../assets/images/derive.png" alt="" /><span class="axis">导出表格</span></div>
      </div> -->
    </div>
    <div class="table-main">
      <div class="right">
        <!-- <div class="table-title"><p>增加等级</p></div> -->
        
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
@import '../../../assets/css/reset.scss';
@import "@/assets/css/image3.scss";
</style>