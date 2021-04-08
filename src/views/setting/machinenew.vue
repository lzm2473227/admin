<template>
  <div class="header">
    <ul>
      <li><img src="../../assets/iconsvg/Print_list.png" alt="" />返回列表</li>
      <li>
        <img src="../../assets/iconsvg/Save_content.png" alt="" />保存内容
      </li>
      <li><img src="../../assets/iconsvg/Print_list.png" alt="" />打印预览</li>
      <li><img src="../../assets/iconsvg/Print_list.png" alt="" />导出表格</li>
    </ul>
  </div>
  <div class="main">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      class="demo-ruleForm"
      label-position="left"
    >
      <table width="596" height="842" border="1" cellspacing="0">
        <tr height="50">
            <td width="88" class="bg">机具编码</td>
            <td width="508"></td>
        </tr>
        <tr height="50">
            <td width="88" class="bg">机具型号</td>
            <td width="508"></td>
        </tr>
        <tr height="50">
            <td width="88" class="bg">机具名称</td>
            <td width="508"></td>
        </tr>
        <tr height="50">
            <td width="88" class="bg">机具供应商</td>
            <td width="508"></td>
        </tr>
        <tr height="50">
            <td width="88" class="bg">机具生产商</td>
            <td width="508"></td>
        </tr>
        <tr height="50">
            <td width="88" class="bg">所属门店</td>
            <td width="508"></td>
        </tr>
        <tr height="86">
            <td width="88" class="bg">门店地址</td>
            <td width="508"></td>
        </tr>
        <tr height="50">
            <td width="88" class="bg">启用时间</td>
            <td width="508"></td>
        </tr>
        <tr height="50">
            <td width="88" class="bg">机具状态</td>
            <td width="508"></td>
        </tr>
        <tr height="347">
            <td width="88" class="bg">机具功能</td>
            <td width="508"></td>
        </tr>
    </table>
    </el-form>
    <Btn
      :btntext="$route.query.advertmentid ? '编辑' : '新增'"
      @addbtn="addadv"
      @cancelbtn="cancelbtn"
    />
  </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss" scoped>
.header {
  height: 42px;
  line-height: 44px;
  background: #ecf3fb;
  border: 1px solid #b8d0f2;
  font-size: 14px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: #222222;
  ul {
    display: flex;
    height: 44px;
    line-height: 44px;
    align-items: center;
    margin: 0;
    padding: 0;
    li {
      width: 112px;
      height: 16px;
      line-height: 16px;
      list-style: none;
      text-align: center;
      border-right: 1px solid #99bbe8;
      display: flex;
      justify-content: center;
      cursor: pointer;
      // align-items: center;
      img {
        margin-right: 4px;
      }
      &:last-child {
        border-right: none;
      }
    }
  }
}
.main {
  border: 1px solid #cccccc;
  padding: 28px;
  box-sizing: border-box;
  margin-top: 16px;
}
table {
  border: 1px solid #b8d0f2;
  border-collapse: collapse;
  font-size: 12px;
  font-family: Source Han Sans CN;
  font-weight: 400;
}
td {
  padding-left: 20px;
  // padding-top: 10px;
}
.bg {
  background: #ecf3fb;
}
.clerk-imgs {
  display: flex;
}
.imgs-title {
  display: flex;
  flex-direction: column;
}
/deep/.el-form-item--small.el-form-item {
  margin-bottom: 0px;
}
/deep/.el-input__inner {
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: none;
  color: #333;
  font-size: 14px;
  font-family: Source Han Sans CN;
  border: 1px solid #ddd !important;
}
// /deep/.el-input__inner:hover {
// //   border: 1px solid #66b1ff ;
// }
</style>