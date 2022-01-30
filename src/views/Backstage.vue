<template>
  <div>
    <el-container>
      <el-header height="120px" style="border: 1px solid #eee;">
        <div id="Logo" style="pointer-events: none">
          <span style="color: #409EFF;">DengDeng-</span><span style="color: #45d8e7">p</span><span
            style="color: #3ee343">l</span><span style="color: #ede257">u</span><span style="color: #ef846b">s</span>
        </div>
        <el-divider content-position="right">
          <span><i class="el-icon-s-operation"></i> 后台管理</span>
          <el-divider direction="vertical"></el-divider>
          <span id="login" @click="login"><i class="el-icon-caret-right"></i> 回到登录页</span>
        </el-divider>
      </el-header>
      <el-container>
        <el-aside width="200px" style="height: 625px;overflow-x: hidden;background-color: rgb(238, 241, 246);border-left: 1px solid #eee;border-bottom: 1px solid #eee">
          <el-menu
              router
              :default-openeds="['2', '3']"
              default-active="Summary">
            <el-menu-item index="Summary">
              <i class="el-icon-menu"></i>
              <span slot="title">数据总览</span>
            </el-menu-item>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-s-management"></i>
                <span>图书管理</span>
              </template>
              <el-menu-item index="BookInfo">图书信息</el-menu-item>
              <el-menu-item index="BookSaleInfo">销售情况</el-menu-item>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-s-custom"></i>
                <span>用户管理</span>
              </template>
              <el-menu-item index="UserInfo">用户信息</el-menu-item>
              <el-menu-item index="UserDataInfo">用户数据明细</el-menu-item>
            </el-submenu>
            <el-menu-item index="CommentManagement">
              <i class="el-icon-s-comment"></i>
              <span slot="title">评论管理</span>
            </el-menu-item>
            <el-menu-item index="DealManagement">
              <i class="el-icon-s-order"></i>
              <span slot="title">订单管理</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main style="height: 625px;overflow-y: hidden;border-right: 1px solid #eee;border-bottom: 1px solid #eee;border-left: 1px solid #eee">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Backstage",
  data() {
    return {};
  },
  methods: {
    login(){
      this.$router.push("/Login");
    }
  }
}
</script>

<style scoped>
#Logo {
  font-size: 40px;
  font-weight: bolder;
  font-family: Monotype Corsiva, Consolas, serif;
  margin-top: 15px;
  margin-left: 15px;
  cursor: pointer;
  width: 250px;
}

#login {
  cursor: pointer
}

#login:hover{
  color: #409EFF;
}
</style>