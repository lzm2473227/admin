<template>
  <div class="newactivity">
    <div class="tab-title">
      <div class="left">
        <div class="print" @click="goBack"><img class="icon" src="@/assets/images/back.png" alt=""><span class="axis">返回列表</span></div>
        <div class="print"><img class="icon" src="@/assets/images/confirm.png" alt=""><span class="axis">保存确认</span></div>
        <div class="print"><img class="icon" src="@/assets/images/print.png" alt=""><span class="axis">打印列表</span></div>
        <div class="print" @click="exportExcel"><img class="icon" src="@/assets/images/derive.png" alt=""><span class="axis">导出表格</span></div>
      </div>
      <div class="right">
        <div class="setup">
          <img class="set" src="@/assets/images/ic-设置.png" alt="系统设置" @click="setup">
        </div>
      </div>
    </div>

 </div>
</template>

<script>
export default {
  name:"newactivity"
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/reset'
</style>