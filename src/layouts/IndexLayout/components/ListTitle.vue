<template>
  <div class="tools-pagetitle">{{ titlename }}</div>
</template>

<script>
export default {
  name: "ListTile",
  data() {
    return {};
  },
  props: ["titlename"],
};
</script>

<style lang="scss" scoped>
.tools-pagetitle {
  padding: 20px 0 20px 12px;
  color: rgba(16, 16, 16, 100);
  font-size: 20px;
  font-family: SourceHanSansSC-regular;
  font-weight: bold;
}
</style>