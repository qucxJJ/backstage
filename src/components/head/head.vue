<template>
  <div>
    <h2 class="head">{{name}}</h2>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    name: {
      type: String,
      default: ''
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.head
  height: 30px;
  width: 100px;
  line-height: 30px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  border-bottom: 1px solid #409EFF;
  margin-bottom: 20px;
</style>
