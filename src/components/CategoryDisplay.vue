<template>
  <div id="wrap">
    <div style="margin-bottom: 30px">
      <el-row :gutter="20">
        <el-col :span="6" v-for="(book,index) in books">
          <div id="card-container" @click="BookDetail(book.id)" style="cursor: pointer">
            <el-card :body-style="{ padding: '0px'}" shadow="hover">
              <div id="img">
                <img :src="book.img">
              </div>
              <div id="content">
                <div id="bookName">
                  <span class="title">书名: </span><br>
                  <div class="content" style="height: 45px;">{{ book.bookName }}</div>
                </div>
                <div id="author">
                  <span class="title">作者: </span><br>
                  <span class="content" style="height: 20px;">{{ book.author }}</span>
                </div>
                <div>
                  <el-popover
                      placement="right"
                      :title="book.bookName"
                      width="200"
                      trigger="hover"
                      :close-delay="100"
                      :content="book.brief">
                    <el-button slot="reference" type="text" >简介</el-button>
                  </el-popover>
                </div>
                <div id="price">
                  <span class="discountPrice"><span style="font-size: 15px">¥ </span>{{decimals(book.price*book.discount)}}</span><br>
                  <span v-if="book.discount<1" class="price">定价: ¥{{ book.price }}</span>
                </div>
              </div>
              <div id="bottom-btn">
                <el-button @click.stop="BookDetail(book.id)" size="medium" type="primary" plain>查看详情</el-button>
                <el-button-group style="margin-left: 15px">
                  <el-button @click.stop="addToCart(index)" size="mini" icon="el-icon-shopping-cart-1"></el-button>
                  <el-button @click.stop="addToCollection(index)" size="mini" icon="el-icon-star-off"></el-button>
                  <el-button @click.stop="" size="mini" icon="el-icon-more"></el-button>
                </el-button-group>
              </div>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </div>

    <!--数据为空时显示-->
    <div v-show="total===0" v-cloak>
      <el-empty :image-size="200"></el-empty>
    </div>
    <div id="pageBtn">
      <el-pagination
          background
          layout="prev, pager, next"
          :page-size="8"
          :total="total"
          @current-change="page"
          hide-on-single-page
          v-show="total!=null">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    // 翻页功能
    page(currentPage) {
      const _this = this;
      axios.get("http://localhost:8081/book/selectBook/" + _this.myArg + "/" + currentPage + "/8")
          .then(function (resp) {
            _this.books = resp.data.books;
            _this.total = resp.data.total;
          });
    },
    // 保留一位小数
    decimals(value) {
      return value.toFixed(1);
    },
    // 跳转商品详情页
    BookDetail(id) {
      this.$router.push({name: 'BookDetail', params: {id: id}});
    },
    // 加入购物车
    addToCart(index){
      let id = sessionStorage.getItem("id");
      if (id == null) {
        id = sessionStorage.getItem("visitorId");
        this.$message({
          type: 'warning',
          message: '您当前未登录，购物车中的内容会随着会话结束而消失，请尽快登录！',
          duration: 9000,
          showClose: true
        });
      }
      let data = {
        id: id,
        bookId: this.books[index].id,
        quantity: 1
      };
      axios.post("http://localhost:8081/user/addToCart",data)
          .then((resp) => {
            if (resp.data === 1) {
              this.$message({
                showClose: true, type: 'success',
                message: '添加成功！'
              });
            } else if (resp.data === 2) {
              this.$message({
                showClose: true, type: 'error',
                message: '添加失败，库存不足'
              });
            } else {
              this.$message({
                showClose: true, type: 'error',
                message: '操作失败，请重试'
              });
            }
          });
    },
    // 加入收藏
    addToCollection(index){
      let id = sessionStorage.getItem("id");
      if (id == null) {
        this.$message({
          type: 'warning',
          message: '您还未登录，请先登录！'
        });
      } else {
        axios.post("http://localhost:8081/user/addToCollection/"+id+"/"+this.books[index].id)
            .then((resp) => {
              if (resp.data === 1) {
                this.$message({
                  showClose: true, type: 'success',
                  message: '添加成功！'
                });
              } else if (resp.data === 0) {
                this.$message({
                  showClose: true,
                  message: '该图书已在收藏夹中'
                });
              } else {
                this.$message({
                  showClose: true, type: 'error',
                  message: '操作失败，请重试'
                });
              }
            });
      }
    },
    // 初始化页面数据
    initData(myArg) {
      this.myArg = myArg;
      axios.get("http://localhost:8081/book/selectBook/" + myArg + "/1" + "/8")
          .then((resp) => {
            this.books = resp.data.books;
            this.total = resp.data.total;
          });
    }
  },
  data() {
    return {
      total: null,
      books: null,
      myArg: null
    };
  },
  created() {
    // 使用 this.$route.params.参数名 获取传递的参数
    this.initData(this.$route.params.myArg);
  }
}
</script>

<style scoped>
[v-cloak] {
  display: none !important;
}

#wrap {
  margin: 50px auto;
  width: 1200px;
}

#pageBtn {
  margin: 20px auto;
  display: table;
}

#card-container {
  margin-top: 25px;
}

#card-container #img {
  float: left;
  margin-top: 10px;
  margin-left: 10px;
  margin-bottom: 10px;
  cursor: pointer;
}

#card-container #img {
  width: 150px;
  height: 220px;
}

#card-container #img img {
  width: 150px;
  height: 200px;
}

#card-container #content {
  float: left;
  margin-top: 25px;
  margin-left: 15px;
  width: 105px;
  height: 190px;
}

#card-container #content .title {
  color: #a9a6a6;
  font-size: 14px;
}

#card-container #content .content {
  font-size: 16px;
  width: 95px;
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

#card-container #content #price .discountPrice {
  color: #ff1f1f;
  font-size: 20px;
}

#card-container #content #price .price {
  text-decoration: line-through;
  color: rgba(151, 151, 151, 0.9);
  font-size: 14px;
}

#card-container #bottom-btn{
  float: none;
  margin: 0 0 10px 10px;
  width: 245px;
  height: 290px;
}
</style>