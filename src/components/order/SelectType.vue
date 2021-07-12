<template>
  <el-select v-model="selectvalue"  @change="gettype">
    <template v-for="item, key in arrdata" v-bind:key="key">
      <el-option :label="item.label"  :value="item.value"></el-option> 
    </template
> 
    </el-select>
</template>
<script>
export default {
  name: "SelectType",
  props: ["arrdata"],
  data() {
    return {
      selectvalue:""
    };
  },
  methods:{
    //返回当前选中值
    gettype(val){
       this.$emit("typekey",val)
    }
  }
};
</script>