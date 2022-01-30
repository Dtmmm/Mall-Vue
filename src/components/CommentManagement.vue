<template>
  <div>
    <el-button @click="initData" size="small" icon="el-icon-refresh" plain>重置</el-button>
    <el-input id="keyWord" placeholder="请输入关键字" v-model="keyWord" style="width: 400px;left: 780px" size="medium" clearable>
      <el-select v-model="select" slot="prepend" placeholder="请选择" style="width: 110px">
        <el-option label="评论编号" value="id"></el-option>
        <el-option label="用户编号" value="user_id"></el-option>
        <el-option label="用户名" value="user_name"></el-option>
        <el-option label="图书编号" value="book_id"></el-option>
        <el-option label="书名" value="book_name"></el-option>
      </el-select>
      <el-button @click="search" slot="append" icon="el-icon-search"></el-button>
    </el-input>
    <div id="table">
      <el-table v-loading="loading" empty-text="这里空空如也..." stripe height="502px" :data="commentData" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <div class="table-expand">
              <span style="float: left;width: 80px;margin-top: 5px">评论内容 : </span>
              <el-input style="float: left;width: 1100px" type="textarea" autosize readonly v-model="props.row.content"></el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column
            label="编号"
            width="100"
            prop="id">
        </el-table-column>
        <el-table-column
            label="书名"
            prop="bookName">
        </el-table-column>
        <el-table-column
            label="用户名"
            prop="userName">
        </el-table-column>
        <el-table-column
            label="时间"
            prop="updateTime"
            sortable>
        </el-table-column>
        <el-table-column
            label="评分"
            prop="rate"
            sortable>
          <template slot-scope="scope">
            <el-rate v-model="scope.row.rate" :colors="colors" show-text disabled></el-rate>
          </template>
        </el-table-column>
        <el-table-column
            label="操作"
            width="100px">
          <template slot-scope="scope">
            <el-popconfirm
                confirm-button-text='删除'
                cancel-button-text='取消'
                confirm-button-type="danger"
                icon="el-icon-info"
                title="确认删除此书？"
                @confirm="deleteRow(commentData,scope.row.id)">
              <el-button slot="reference" type="danger" icon="el-icon-delete" size="small">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div id="page">
      <el-pagination
          background
          layout="prev, pager, next"
          :page-size="10"
          :total="total"
          @current-change="page"
          :hide-on-single-page="true"
          v-if="total!=null">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "CommentManagement",
  data() {
    return {
      keyWord: '',
      select: 'id',
      loading: true,
      commentData: null,
      total: null,
      colors: ['#99A9BF', '#F7BA2A', '#FF9900']
    }
  },
  methods: {
    // 翻页功能
    page(currentPage) {
      this.loading = true;
      axios.get("http://localhost:8081/backstage/selectAllComment/" + currentPage + "/10")
          .then((resp) => {
            this.commentData = resp.data.comments;
            this.total = resp.data.total;
            this.loading = false;
          });
    },
    // 模糊搜索
    search(){
      if (this.keyWord.trim() === '') {
        this.$message.error('关键字不能为空!');
      } else {
        this.loading = true;
        this.total = null;
        axios.get("http://localhost:8081/backstage/searchComment/" + this.keyWord + "/" + this.select)
            .then((resp) => {
              this.commentData = resp.data;
              this.loading = false;
            })
      }
    },
    // 删除
    deleteRow(rows,id) {
      axios.delete("http://localhost:8081/backstage/deleteCommentById/"+id)
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
    initData(){
      this.loading = true;
      axios.get("http://localhost:8081/backstage/selectAllComment/1/10")
          .then((resp) => {
            this.commentData = resp.data.comments;
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

#table .table-expand {
  margin-left: 40px;
}
#page {
  margin: 10px auto 0;
  display: table;
}

</style>