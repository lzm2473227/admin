<template>
  <div class="tab">
    <div class="tab-title">
      <div class="left">
        <div class="print" @click="toBackList"><img class="icon" src="../../assets/images/back.png" alt=""/><span class="axis">返回列表</span></div>
        <div class="print" @click="addStoreList()"><img class="icon" src="../../assets/images/save.png" alt=""/><span class="axis">保存内容</span></div>
        <div class="print"><img class="icon" src="@/assets/images/print.png" alt=""><span class="axis">打印列表</span></div>
        <div class="print" @click="exportExcel"><img class="icon" src="@/assets/images/derive.png" alt=""><span class="axis">导出表格</span></div>
      </div>
      <div class="right">
        <div class="setup">
          <img class="set" src="@/assets/images/ic-设置.png" alt="系统设置" @click="setup">
        </div>
      </div>
    </div>
    <div class="table-main">
      <form action="#">
        <div class="table-title">
          <p>新增岗位</p>
        </div>
        <table border="1" class="">
          <tr>
            <td class="table-left">岗位编号</td>
            <td class="table-right">
              <input type="text" placeholder="请输入岗位编号" v-model="a" />
            </td>
            <td class="table-left">岗位名称</td>
            <td class="table-right">
              <input type="text" placeholder="请输入岗位名称" v-model="b" />
            </td>
          </tr>
        </table>
        <div class="quanxian">岗位权限</div>
      </form>
    </div>
    </div>
</template>
<script>
import Btn from "../../components/Btn";
import city from "../../assets/json/city.json";
import NewBreadCrumb from "../../layouts/IndexLayout/components/NewBreadCrumb";
import httpreques from "../../utils/httpreques";
import {
  provinceAndCityData,
  regionData,
  provinceAndCityDataPlus,
  regionDataPlus,
  CodeToText,
  TextToCode,
} from "element-china-area-data";
export default {
  name: "linkage",
  data() {
    return {
      a:"",
      b:""
    };
  },
  methods: {

  },
  components: {
    
  },
};
</script>
<style lang="scss" scoped>
@import '@/assets/css/reset.scss';
.quanxian{
  width: 56px;
  height: 14px;
  font-size: 14px;
  font-family: Source Han Sans CN;
  font-weight: 500;
  line-height: 24px;
  color: #384F71;
  opacity: 1;
  margin-left: 18px;
  margin-top: 12px;
}
</style>