<template>
  <!--给<router-view>加上key属性 解决重复请求无效问题-->
  <router-view :key="$route.path"></router-view>
</template>

<script>
export default {
  name: "HomePage"
}
</script>

<style scoped>

</style>