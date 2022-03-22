<template>
  <div>
    <el-container>
      <el-header height="70px">
        <!--LOGO-->
        <div id="Logo">
          <span style="color: #409EFF;">DengDeng-</span><span style="color: #45d8e7">p</span><span
            style="color: #3ee343">l</span><span style="color: #ede257">u</span><span style="color: #ef846b">s</span>
        </div>
        <el-divider content-position="right">
          <span @click="goHome" style="color: #409EFF;cursor: pointer"><i class="el-icon-caret-right"></i>返回商城首页</span>
        </el-divider>
      </el-header>
      <el-main style="height: 600px;overflow: hidden">
        <div id="wrap">
          <el-row :gutter="20">
            <el-col :span="12">
              <div style="height: 501px;width: 490px">
                <div id="LoginForm">
                  <div class="title">登录</div>
                  <el-form :model="loginForm" :rules="loginRules" ref="loginForm" label-width="50px" hide-required-asterisk>
                    <el-form-item label="账号" prop="userId">
                      <el-input @focus="clearError" v-model="loginForm.userId" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="userPwd">
                      <el-input @focus="clearError" @keydown.enter.native="key_Login" show-password type="password" v-model="loginForm.userPwd" clearable autocomplete="off"></el-input>
                    </el-form-item>
                    <div :class="loginForm.result === 0?'showError':'hiddenError'">用户名或密码错误</div>
                    <el-form-item>
                      <div>
                        <el-button style="width: 100px" type="primary" :loading="loadingBtn" @click="login('loginForm')">登 录</el-button>
                        <el-button style="margin-left: 110px;width: 100px" @click="toRegister" plain>去注册 <i class="el-icon-caret-right"></i></el-button>
                      </div>
                    </el-form-item>
                  </el-form>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div style="height: 501px;width: 490px">
                <div style="position: relative">
                  <div id="img" class="image" style="position: absolute;z-index: 10;">
                    <el-image :src="require('../assets/img/sc.jpg')" style="height: 501px;width: 490px;">
                      <div slot="placeholder" class="image-slot">
                        <i class="el-icon-picture-outline"></i>
                      </div>
                    </el-image>
                  </div>
                  <div v-show="load" id="RegisterForm">
                    <div class="title" >注册</div>
                    <el-form :model="registerForm" :rules="registerRules" ref="registerForm" label-width="80px">
                      <el-form-item label="账号" prop="userId">
                        <el-input v-model="registerForm.userId" clearable></el-input>
                      </el-form-item>
                      <el-form-item label="密码" prop="userPwd">
                        <el-input show-password type="password" v-model="registerForm.userPwd"
                                  autocomplete="off" clearable></el-input>
                      </el-form-item>
                      <el-form-item label="确认密码" prop="checkUserPwd">
                        <el-input show-password type="password" v-model="registerForm.checkUserPwd"
                                  autocomplete="off" clearable></el-input>
                      </el-form-item>
                      <el-form-item label="用户名" prop="userName">
                        <el-input v-model="registerForm.userName" clearable></el-input>
                      </el-form-item>
                      <el-form-item label="收货地址" prop="shippingAddress">
                        <el-input v-model="registerForm.shippingAddress" clearable></el-input>
                      </el-form-item>
                      <div :class="registerForm.result === 0?'showError':'hiddenError'" id="errorText">用户名或密码错误</div>
                      <el-form-item>
                        <div>
                          <el-button style="width: 100px" @click="toLogin" plain><i class="el-icon-caret-left"></i> 去登录</el-button>
                          <el-button style="margin-left: 100px;width: 100px" :loading="loadingBtn"
                                     type="primary" @click="register('registerForm')">注 册
                          </el-button>
                        </div>
                      </el-form-item>
                    </el-form>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-main>
      <footer>
        <div class="footer">
          <div class="container">
            <div class="footer-main">
              <h4>ElementUI</h4>
              <a href="https://element.eleme.cn/#/zh-CN" target="_blank" class="footer-main-link">官方网站</a>
              <a href="https://github.com/ElemeFE/element" target="_blank" class="footer-main-link">代码仓库</a>
              <a href="https://github.com/ElemeFE/element/releases" target="_blank" class="footer-main-link">更新日志</a>
              <a href="https://github.com/ElemeFE/element/blob/dev/FAQ.md" target="_blank"
                 class="footer-main-link">常见问题</a>
              <a href="https://gitter.im/ElemeFE/element" target="_blank" class="footer-main-link">在线讨论</a>
              <a href="https://github.com/ElemeFE/element/blob/master/.github/CONTRIBUTING.zh-CN.md" target="_blank"
                 class="footer-main-link">贡献指南</a>
            </div>
            <div class="footer-main">
              <h4>Vue</h4>
              <a href="https://v3.cn.vuejs.org/" target="_blank" class="footer-main-link">官方网站</a>
              <a href="https://v3.cn.vuejs.org/guide/introduction.html" target="_blank" class="footer-main-link">文档</a>
              <a href="https://v3.cn.vuejs.org/api/" target="_blank" class="footer-main-link">API参考</a>
              <a href="https://next.router.vuejs.org/" target="_blank" class="footer-main-link">Vue Router</a>
              <a href="https://cli.vuejs.org/" target="_blank" class="footer-main-link">Vue CLI</a>
            </div>
            <div class="footer-main">
              <h4>Github</h4>
              <a href="https://github.com" target="_blank" class="footer-main-link">Github社区</a>
              <a href="https://github.com/Dtmmm?tab=repositories" target="_blank"
                 class="footer-main-link">在Github上查看项目源码</a>
            </div>
            <div class="footer-social">
              <p class="footer-social-title">
            <span style="font-family: Monotype Corsiva,serif;font-weight: bolder;font-size: 50px;line-height: 2">
              <span style="color: #409EFF;">DengDeng-</span><span style="color: #45d8e7">p</span>
              <span style="color: #3ee343">l</span><span style="color: #ede257">u</span><span
                style="color: #ef846b">s</span>
            </span><br/>
                <span style="float: right">coding by 邓童淼</span><br/><br/><span style="float: right">浙江工业大学</span>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    // 自定义校验规则
    let userId = (rule, value, callback) => {
      const r = /^[a-zA-Z][a-zA-Z0-9]{4,15}$/;
      if (value == null || String(value).trim() === "") {
        callback(new Error("账号不能为空"));
      } else if (!r.test(value)) {
        callback(new Error("账号以字母开头，长度为5-16字节，不能包含特殊字符"));
      }else {
        callback();
      }
    };
    let userPwd = (rule, value, callback) => {
      const r = /^[a-zA-Z]\w{5,11}$/;
      if (value == null || String(value).trim() === "") {
        callback(new Error("密码不能为空"));
      } else if (value.length<6 || value.length>12) {
        callback(new Error("密码长度为6-12字节"));
      } else if (!r.test(value)) {
        callback(new Error("密码以字母开头，只能包含字母、数字和下划线"));
      }else {
        callback();
      }
    };
    let checkUserPwd = (rule, value, callback) => {
      if (value.trim() === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.registerForm.userPwd) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    let userName = (rule, value, callback) => {
      const r = /^[\u4E00-\u9FA5A-Za-z0-9]{2,11}$/;
      if (value == null || String(value).trim() === "") {
        callback(new Error("用户名不能为空"));
      } else if (!r.test(value)) {
        callback(new Error("用户名长度为2-12字节，不能包含特殊字符"));
      }else {
        callback();
      }
    };
    let shippingAddress = (rule, value, callback) => {
      const r = /^[\u4E00-\u9FA5A-Za-z0-9]{4,20}$/;
      if (value == null || String(value).trim() === "") {
        callback(new Error("收货地址不能为空"));
      } else if (!r.test(value)) {
        callback(new Error("收货地址长度为4-20字节，不能包含特殊字符"));
      }else {
        callback();
      }
    };
    return {
      loginForm: {
        userId: '',
        userPwd: '',
        checkUserPwd: '',
        result: null,
      },
      loginRules: {
        userId: [{required: true, message: '账号不能为空', trigger: 'blur'}],
        userPwd: [{required: true, message: '密码不能为空', trigger: 'blur'}]
      },
      registerForm: {
        userId: '',
        userPwd: '',
        checkUserPwd: '',
        userName: '',
        shippingAddress: '',
        result: null,
      },
      registerRules: {
        userId: [{ validator: userId, trigger: 'blur' }],
        userPwd: [{ validator: userPwd, trigger: 'blur' }],
        checkUserPwd: [{ validator: checkUserPwd, trigger: 'blur' }],
        userName: [{ validator: userName, trigger: 'blur' }],
        shippingAddress: [{ validator: shippingAddress, trigger: 'blur' }]
      },
      loadingBtn: false,
      load: false
    };
  },
  methods: {
    // 登录
    login(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loadingBtn = true;
          let formData = new FormData();
          formData.append("userId", this.loginForm.userId);
          formData.append("userPwd", this.loginForm.userPwd);
          axios({
            method: "post",
            url: "http://localhost:8081/user/login",
            headers: {
              "Content-Type": "multipart/form-data"
            },
            withCredentials: true,
            data: formData
          }).then((resp) => {
            this.loadingBtn = false;
            if (resp.data.result === 1) {
              sessionStorage.setItem("id", resp.data.id);
              sessionStorage.setItem("userName", resp.data.userName);
              sessionStorage.setItem("flag", "1");
              // 游客登录后，将购物车信息更新合并，并删除之前的信息
              if (sessionStorage.getItem("visitorId")!=null){
                this.updateVisitorToUser(sessionStorage.getItem("visitorId"),resp.data.id);
                sessionStorage.removeItem("visitorId");
              }
              this.$router.push("/Home");
            } else if (resp.data.result === 2) {
              this.$router.push("/Backstage");
            } else {
              this.loginForm.result = 0;
            }
          });
        } else {
          return false;
        }
      });
    },
    // 注册
    register(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loadingBtn = true;
          let user = {
            userId: this.registerForm.userId,
            userPwd: this.registerForm.userPwd,
            userName: this.registerForm.userName,
            shippingAddress: this.registerForm.shippingAddress
          };
          axios.post("http://localhost:8081/user/register",user)
          .then((resp) => {
            this.loadingBtn = false;
           if (resp.data === 1){
             this.$message({
               message: '注册成功！赶快去登录吧',
               type: 'success'
             });
             // 延迟1000毫秒
             setTimeout(() => {
               this.toLogin();
             }, 500);
           } else {
             this.$message({
               message: '注册失败！请重试',
               type: 'error'
             });
           }
          });
        } else {
          return false;
        }
      });
    },
    // 去注册
    toRegister() {
      let img = document.getElementById("img");
      img.className = "image-left";
      this.$refs["loginForm"].resetFields();
    },
    // 去登录
    toLogin() {
      let img = document.getElementById("img");
      img.className = "image-right";
      this.$refs["registerForm"].resetFields();
    },
    // 清除错误提示文本
    clearError(){
      this.loginForm.result = 1;
    },
    // 回到商城首页
    goHome(){
      this.$router.push("/Home");
    },
    // 键盘回车登录
    key_Login(){
      this.login('loginForm')
    },
    // 游客登录后，将购物车信息更新合并，并删除之前的信息
    updateVisitorToUser(visitorId,userId){
      axios.get("http://localhost:8081/user/updateVisitorToUser/"+visitorId+"/"+userId);
    }
  },
  created() {
    setTimeout(() => {
      this.load = true;
    }, 1000);
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

#wrap {
  margin: 30px auto 0;
  height: 500px;
  width: 1000px;
  border: 1px solid #eee;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}

#LoginForm {
  margin: 100px auto 0;
  width: 400px;
}

#RegisterForm {
  margin: 20px auto 0;
  width: 400px;
  position: absolute;
}

.title {
  margin: 0 auto 20px;
  display: table;
  font-size: 40px;
  color: #409EFF;
}

.showError {
  visibility: visible;
  color: #ff1f1f;
  font-size: 10px;
  margin: -10px 0 10px 50px;
}

.hiddenError {
  visibility: hidden;
  color: #ff1f1f;
  font-size: 10px;
  margin: -10px 0 10px 50px;
}

.image-left {
  display: block;
  transform: translateX(-510px);
  transition-duration: 1s;
}

.image-right {
  display: block;
  transform: translateX(0px);
  transition-duration: 1s;
}

.footer {
  background-color: #f7fbfd;
  width: 100%;
  padding: 40px 150px;
  box-sizing: border-box;
  height: 300px;
}

.footer .container {
  box-sizing: border-box;
  width: auto;
}

.footer .footer-main {
  font-size: 0;
  display: inline-block;
  vertical-align: top;
  margin-right: 110px;
}

.footer .footer-main h4 {
  font-size: 18px;
  color: #333;
  line-height: 1;
  margin: 0 0 15px;
}

.footer .footer-main .footer-main-link {
  display: block;
  margin: 0;
  line-height: 2;
  font-size: 14px;
  color: #666;
  text-decoration: none;
}

.footer .footer-main .footer-main-link:hover {
  color: #222222;
}

.footer .footer-social {
  float: right;
  text-align: right;
}

.footer .footer-social .footer-social-title {
  color: #666;
  font-size: 18px;
  line-height: 1;
  margin: 0 0 20px;
  padding: 0;
  font-weight: 700;
}

</style>