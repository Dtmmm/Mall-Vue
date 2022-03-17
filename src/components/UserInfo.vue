<template>
  <div>
    <el-button @click="initData" size="small" icon="el-icon-refresh" plain>重置</el-button>
    <el-input id="keyWord" placeholder="请输入关键字" v-model="keyWord" style="width: 400px;left: 780px" size="medium" clearable>
      <el-select v-model="select" slot="prepend" placeholder="请选择" style="width: 100px">
        <el-option label="用户名" value="user_name"></el-option>
        <el-option label="账号" value="user_id"></el-option>
        <el-option label="用户编号" value="id"></el-option>
      </el-select>
      <el-button @click="search" slot="append" icon="el-icon-search"></el-button>
    </el-input>
    <div id="table">
      <el-table v-loading="loading" empty-text="这里空空如也..." stripe height="502px" :data="userData" style="width: 100%">
        <el-table-column
            type="index"
            width="40">
        </el-table-column>
        <el-table-column
            label="用户编号"
            prop="id"
            width="180px">
        </el-table-column>
        <el-table-column
            label="账号"
            prop="userId"
            width="100px">
        </el-table-column>
        <el-table-column
            label="密码"
            prop="userPwd"
            width="100px">
        </el-table-column>
        <el-table-column
            label="用户名"
            prop="userName"
            width="100px">
        </el-table-column>
        <el-table-column
            label="最近登录"
            prop="lastLoginDate"
            sortable
            width="180px">
        </el-table-column>
        <el-table-column
            label="累计消费额"
            prop="consumption"
            sortable
            width="120px">
        </el-table-column>
        <el-table-column
            label="电话号码"
            prop="phoneNumber"
            width="120px">
        </el-table-column>
        <el-table-column
            label="邮箱"
            prop="email"
            width="150">
        </el-table-column>
        <el-table-column
            label="收货地址"
            prop="shippingAddress"
            width="200px">
        </el-table-column>
        <el-table-column
            label="头像"
            prop="icon"
            width="100px">
        </el-table-column>
        <el-table-column
            label="操作"
            width="140px"
            fixed="right">
          <template slot-scope="scope">
            <el-popconfirm
                confirm-button-text='删除'
                cancel-button-text='取消'
                confirm-button-type="danger"
                icon="el-icon-info"
                title="确认删除该用户？"
                @confirm="deleteRow(userData,scope.row.id)">
              <el-button style="margin-left: 10px" slot="reference" type="danger" icon="el-icon-delete" size="small">删除用户</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div id="page">
      <el-pagination
          background
          layout="prev, pager, next"
          :page-size="6"
          :total="total"
          @current-change="page"
          hide-on-single-page
          v-if="total!=null">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserInfo",
  data() {
    return {
      userData: [
        {
          id: '',
          userId: '',
          userPwd: '',
          userName: '',
          phoneNumber: '',
          email: '',
          shippingAddress: '',
          icon: '',
          lastLoginDate: null,
          consumption: 0
        }
      ],
      loading: true,
      keyWord: '',
      select: 'user_name',
      total: null,
    }
  },
  methods: {
    // 翻页功能
    page(currentPage) {
      this.loading = true;
      axios.get("http://localhost:8081/backstage/selectAllUserInfo/"+currentPage+"/6")
          .then((resp) => {
            this.userData = resp.data.users;
            this.total = resp.data.total;
            this.loading = false;
          });
    },
    // 删除
    deleteRow(rows, id) {
      axios.delete("http://localhost:8081/backstage/deleteUserById/"+id)
          .then((resp) => {
            if (resp.data === 1) {
              this.myDelete(rows,id);
              this.$message({
                showClose: true, type: 'success',
                message: '删除成功！'
              });
            } else {
              this.$message({
                showClose: true, type: 'error',
                message: '删除失败，请重试'
              });
            }
          });
    },
    // 自定义的删除数组的方法
    myDelete(rows, id){
      for (let i = 0; i < rows.length; i++) {
        if (rows[i].id === id) {
          rows.splice(i,1);
          break;
        }
      }
    },
    // 模糊搜索
    search() {
      if (this.keyWord.trim() === '') {
        this.$message.error('关键字不能为空!');
      } else {
        this.loading = true;
        this.total = null;
        axios.get("http://localhost:8081/backstage/searchUserInfo/" + this.keyWord + "/" + this.select)
            .then((resp) => {
              this.userData = resp.data;
              this.loading = false;
            })
      }
    },
    initData(){
      axios.get("http://localhost:8081/backstage/selectAllUserInfo/1/6")
          .then((resp) => {
            this.userData = resp.data.users;
            this.total = resp.data.total;
            this.loading = false;
          });
    }
  },
  created() {
    this.initData();
  }
}
</script>

<style scoped>
#table {
  margin-top: 10px;
  border: 1px solid #eee;
  height: 500px;
}

#page {
  margin: 10px auto 0;
  display: table;
}
</style>