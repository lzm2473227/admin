<template>
  <div class="tab">
    <div class="tab-title">
      <!-- <div class="left">
        <div class="print" @click="toBackList"><img class="icon" src="../../assets/images/back.png" alt=""/><span class="axis">返回列表</span></div>
        <div class="print" @click="addStoreList()"><img class="icon" src="../../assets/images/save.png" alt=""/><span class="axis">保存内容</span></div>
        <div class="print"><img class="icon" src="@/assets/images/print.png" alt=""><span class="axis">打印列表</span></div>
        <div class="print" @click="exportExcel"><img class="icon" src="@/assets/images/derive.png" alt=""><span class="axis">导出表格</span></div>
      </div> -->
      <div class="right">
        <!-- <div class="setup">
          <img class="set" src="@/assets/images/ic-设置.png" alt="系统设置" @click="setup">
        </div> -->
      </div>
    </div>
    <div class="table-main">
      <!-- <form action="#">
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
        <div class="permission">
          
        <div style="padding:15px">
          <el-tabs type="border-card" tab-position="left">
            <el-tab-pane>
              <template #label>
                <span><i class="el-icon-folder"></i> 商品</span>
              </template>
             <el-tree
              :data="data"
              show-checkbox
              node-key="id"
              :default-expanded-keys="[1,2,3,4,5,6]"
              :default-checked-keys="[5]"
              :props="defaultProps">
            </el-tree>
            </el-tab-pane>
            <el-tab-pane>
              <template #label>
                <span><i class="el-icon-folder"></i> 银行开户管理</span>
              </template>
              我的行程
            </el-tab-pane>
            <el-tab-pane>
              <template #label>
                <span><i class="el-icon-folder"></i> 系统用户管理</span>
              </template>
              我的行程
            </el-tab-pane>
            <el-tab-pane>
              <template #label>
                <span><i class="el-icon-folder"></i> 系统内部设置</span>
              </template>
              我的行程
            </el-tab-pane>
          </el-tabs>
        </div>

        </div>
      </form> -->
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
      b:"",
      data: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }, {
            id: 11,
            label: '三级 1-1-2'
          }, {
            id: 12,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }, {
            id: 11,
            label: '三级 1-1-2'
          }, {
            id: 12,
            label: '三级 1-1-2'
          }]
        }, {
          id: 6,
          label: '二级 2-2',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }, {
            id: 11,
            label: '三级 1-1-2'
          }, {
            id: 12,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }, {
            id: 11,
            label: '三级 1-1-2'
          }, {
            id: 12,
            label: '三级 1-1-2'
          }]
        }, {
          id: 8,
          label: '二级 3-2',
          
        }]
      }],
    };
  },
  mounted(){
    
  },
  methods: {
    toBackList(){
      this.$router.go(-1)
    }
  },
  components: {
    
  },
};
</script>
<style lang="scss" scoped>
@import '@/assets/css/reset.scss';
.el-tabs--border-card{
  box-shadow: none;
}
/deep/.el-tabs--left .el-tabs__item.is-left {
    text-align: left;
}
.el-tree{
  background: #FFFFFF;
  border-left: 1px solid #E7E8EC;
}
/deep/.el-tabs--border-card > .el-tabs__content{
  padding:0;
}
/deep/.el-tabs--left .el-tabs__header.is-left{
  margin: 0 ;
  // padding: 0 20px;
}
.quanxian{
  width: 56px;
  height: 22px;
  font-size: 14px;
  font-family: Source Han Sans CN;
  font-weight: 500;
  line-height: 24px;
  color: #384F71;
  opacity: 1;
  margin-left: 18px;
  margin-top: 12px;
}
form{
  width: 601px;
  height: 808px;
  background: #FFFFFF;
  border: 1px solid #DADBDF;
  opacity: 1;
}
/deep/.el-tabs--left .el-tabs__nav-wrap.is-left.is-scrollable{
  padding:0;
}
/deep/.el-tabs__item{
  padding: 0 20px !important;
}
</style>