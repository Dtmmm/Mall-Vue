<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  // 监听窗口关闭时，清空Redis中游客购物车的缓存
  mounted() {
    window.addEventListener('beforeunload', event => {
      let visitorId = sessionStorage.getItem("visitorId");
      if (visitorId != null){
        axios.get("http://localhost:8081/user/clearVisitorCart/" + visitorId);
      }
    });
  },
  destroyed() {
    window.removeEventListener('beforeunload', event =>{});
  }
}
</script>

<style>
/*设置滚动条*/
/*html {
  overflow-y: scroll;
}

:root {
  overflow-y: auto;
  overflow-x: hidden;
}

:root body {
  position: absolute;
}

body {
  width: 100vw;
  overflow: hidden;
}*/

::-webkit-scrollbar-track {
  background-color: #F5F5F5;
}

::-webkit-scrollbar {
  width: 10px;
  height: 10px;
  background-color: #F5F5F5;
}

::-webkit-scrollbar-thumb {
  border-radius: 15px;
  background-color: rgba(180, 180, 180, 0.6);
}
</style>
