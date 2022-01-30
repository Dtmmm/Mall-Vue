<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
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
