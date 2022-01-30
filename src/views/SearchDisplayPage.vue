<template>
  <!--给<router-view>加上key属性 解决重复请求无效问题-->
  <router-view :key="$route.path+$route.query.keyWord+$route.query.scope"></router-view>
</template>

<script>
export default {
  name: "SearchDisplayPage.vue"
}
</script>

<style scoped>
</style>