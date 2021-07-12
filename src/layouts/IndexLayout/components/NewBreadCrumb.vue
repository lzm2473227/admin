<template>
   <div class="newbreadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: path}"
          >{{ptitle}}</el-breadcrumb-item
        >
        <el-breadcrumb-item>{{ctitle}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
</template>

<script>
export default {
name:"NewBreadCrumb",
props:["ptitle",'path','ctitle',]
}
</script>

<style lang="scss" scoped>

.newbreadcrumb{
     
  height: 36px;
    background: #fff;
    position: absolute;
    top: -16px;
    left: -16px;
    width: 100%;
    padding-right: 16px;
    padding-left: 16px;
    display: flex;
    align-items: center;
}
/deep/.el-breadcrumb__item{
    font-size: 14px;
}
/deep/.el-breadcrumb__inner.is-link,
.el-breadcrumb__inner a {
 color: rgba(59, 144, 244, 100);
font-size: 14px;
 font-weight: bold;
font-family: SourceHanSansSC-regular;
 
}
 
</style>