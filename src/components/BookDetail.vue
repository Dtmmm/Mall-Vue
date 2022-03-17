<template>
  <div id="wrap">
    <div id="page-header">
      <el-page-header @back="goBack" content="详情页面" title="返回首页"></el-page-header>
    </div>
    <el-divider></el-divider>
    <div id="detail-container">
      <!--商品详情-->
      <div id="detail">
        <div id="img">
          <img :src="book.img">
        </div>
        <div id="descriptions">
          <el-descriptions :title="'《 '+book.bookName+' 》'" :column="3" :colon="false" style="font-size: 16px">
            <el-descriptions-item label="作者 :" :contentStyle="{'color':'#409EFF'}">{{ book.author }}
            </el-descriptions-item>
            <el-descriptions-item label="出版社 :" :contentStyle="{'color':'#409EFF'}">{{ book.press }}
            </el-descriptions-item>
            <el-descriptions-item label="出版时间 :" :contentStyle="{'color':'#409EFF'}">{{ book.publicationDate }}
            </el-descriptions-item>
            <el-descriptions-item label="" :contentStyle="{'margin-top':'10px','font-size':'20px','color':'#222222','font-weight':'400',
                'width':'750px','height':'115px','display':'-webkit-box','overflow':'hidden','-webkit-box-orient':'vertical','-webkit-line-clamp':'4'}">
              {{ book.brief }}
            </el-descriptions-item>
          </el-descriptions>
          <div>
            <span style="font-size: 18px;color: #ff1f1f">¥ </span><span
              class="discountPrice">{{ decimals(book.price * book.discount) }}</span>
            <span class="price">定价: ¥ {{ book.price }}</span>
          </div>
          <el-divider></el-divider>
          <div id="btn-group">
            <el-input-number style="margin-right: 30px;margin-left: 20px" :step="1" step-strictly :min="1" :max="99"
                             size="medium" v-model="quantity"></el-input-number>
            <el-button @click="addToCart" :loading="loadingBtn" type="primary" icon="el-icon-shopping-cart-1">加入购物车
            </el-button>
            <el-button @click="beforeBuyNow" type="primary" plain icon="el-icon-shopping-bag-2">立即购买</el-button>
            <el-popover
                placement="bottom"
                title="收藏"
                width="150"
                trigger="hover"
                content="添加该商品到收藏夹"
                style="margin-left: 180px;margin-right: 10px">
              <el-button @click="addToCollection" slot="reference" type="warning" icon="el-icon-star-off" circle
                         size="medium"></el-button>
            </el-popover>
            <el-popover
                placement="bottom"
                title="分享"
                width="150"
                trigger="hover"
                content="复制商品链接以分享">
              <el-button slot="reference" type="info" icon="el-icon-link" circle size="medium"></el-button>
            </el-popover>
          </div>
        </div>
      </div>
      <el-dialog :before-close="cancelBuyNow" title="结算" :visible.sync="checkTable" v-loading="loading">
        <el-table :data="checkData">
          <el-table-column type="index" width="60"></el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <el-popover placement="right" title="" trigger="hover">
                <img :src="scope.row.img" alt="" style="width: 150px;height: 170px">
                <img slot="reference" :src="scope.row.img" style="width: 50px;height: 55px">
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column property="bookName" label="书名"></el-table-column>
          <el-table-column property="quantity" label="数量"></el-table-column>
          <el-table-column property="discountPrice" label="单价(元)"></el-table-column>
        </el-table>
        <el-descriptions size="small" title="订单信息"
                         style="margin-top: 30px;margin-left: 40px;margin-bottom: 10px">
          <el-descriptions-item label="收货人"><span style="color: #409EFF">{{ userInfo.userName }}</span>
          </el-descriptions-item>
          <el-descriptions-item label="手机号"><span style="color: #409EFF">{{ userInfo.phoneNumber }}</span>
          </el-descriptions-item>
          <el-descriptions-item label="总金额"><span style="color: #409EFF">{{ checkData[0].discountPrice }}</span>
          </el-descriptions-item>
          <el-descriptions-item label="收货地址"><span style="color: #409EFF">{{ userInfo.shippingAddress }}</span>
          </el-descriptions-item>
          <el-descriptions-item label="支付方式">
            <el-radio-group v-model="payWay" size="mini">
              <el-radio-button label="支付宝"></el-radio-button>
              <el-radio-button label="微信"></el-radio-button>
              <el-radio-button label="信用卡"></el-radio-button>
              <el-radio-button label="货到付款"></el-radio-button>
            </el-radio-group>
          </el-descriptions-item>
        </el-descriptions>
        <el-button :loading="loadingBtn" @click="buyNow(2)" style="margin-left: 600px" type="primary" round>去付款
        </el-button>
      </el-dialog>

      <!--分隔线-->
      <div style="margin: 60px auto 100px;">
        <el-divider content-position="right">
            <span style="font-family: Monotype Corsiva,serif;font-weight: bolder;font-size: 25px;line-height: 2">
              <span style="color: #409EFF;">DengDeng-</span><span style="color: #45d8e7">p</span>
              <span style="color: #3ee343">l</span><span style="color: #ede257">u</span><span
                style="color: #ef846b">s</span>
            </span>
        </el-divider>
      </div>

      <!--推荐-->
      <div id="recommendation">
        <el-divider content-position="left">
          <span style="font-size: 20px"><i class="el-icon-present"></i> 同类推荐</span>
        </el-divider>
        <div id="recommendBooks">
          <el-row :gutter="20">
            <el-col :span="4" v-for="book in recommendBooks">
              <div @click="bookDetail(book.id)" style="cursor: pointer">
                <el-card :body-style="{ padding: '0px' }" shadow="hover">
                  <img :src="book.img" class="image">
                  <div style="padding: 12px;">
                    <span>{{ book.bookName }}</span><br>
                    <span style="font-size: 18px;color: #ff1f1f">¥ </span><span
                      class="discountPrice">{{ decimals(book.price * book.discount) }}</span>
                    <span v-if="book.discount<1" class="price"> ¥ {{ book.price }}</span>
                  </div>
                </el-card>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>

      <!--详情和评论-->
      <div id="detail-comment">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane name="detail">
            <span slot="label"><i class="el-icon-info"></i> 商品详情</span>
            <div class="detail-content" style="padding: 15px">
              <el-skeleton animated>
                <template slot="template">
                  <el-skeleton :rows="6"/>
                  <el-skeleton-item variant="image" style="width: 1170px; height: 250px;margin-top: 20px"/>
                  <el-skeleton-item variant="image"
                                    style="width: 1170px; height: 250px;margin-top: 10px;margin-bottom: 20px"/>
                  <el-skeleton :rows="12"/>
                </template>
              </el-skeleton>
            </div>
          </el-tab-pane>
          <el-tab-pane name="comment">
            <span slot="label"><i class="el-icon-s-comment"></i> 商品评论</span>
            <div v-if="commentData.length>0" class="comment-content">
              <el-table :data="commentData" :loading="loading" style="width: 100%">
                <el-table-column width="200">
                  <template slot-scope="scope">
                    <div class="userInfo">
                      <img slot="reference" :src="require('../assets/img/icon/user.png')">
                      <p>{{ scope.row.userName }}</p>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column width="970">
                  <template slot-scope="scope">
                    <div class="rate">
                      <el-rate v-model="scope.row.rate" :colors="colors" show-text disabled></el-rate>
                    </div>
                    <div class="content">{{ scope.row.content }}</div>
                    <div class="date">{{ formatDate(scope.row.updateTime) }}</div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <el-empty v-else description="暂无评论"></el-empty>
            <div id="pageBtn">
              <el-pagination
                  background
                  layout="prev, pager, next"
                  :page-size="10"
                  :total="total"
                  @current-change="page"
                  :hide-on-single-page=true
                  v-show="total!=null">
              </el-pagination>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: '',
      book: {
        id: '',
        bookName: '',
        author: '',
        price: 0,
        discount: 1,
        press: '',
        publicationDate: '',
        brief: '',
        img: ''
      },
      recommendBooks: [{id:'', bookName: '', price: 0, discount: 0, img: ''},],
      activeName: 'detail',
      quantity: 1,
      checkTable: false,
      loading: true,
      checkData: [{bookName: '', quantity: 0, discountPrice: 0, img: ''}],
      userInfo: {id: '', userName: '', phoneNumber: '', shippingAddress: ''},
      payWay: '支付宝',
      loadingBtn: false,
      commentData: [],
      colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
      total: null
    }
  },
  methods: {
    // 返回首页
    goBack() {
      this.$router.push("/Home");
    },
    // 保留一位小数
    decimals(value) {
      return value.toFixed(1);
    },
    // 页面初始化时执行，根据编号查询图书
    initData(bookId) {
      axios.get("http://localhost:8081/book/selectBookById/" + bookId)
          .then((resp) => {
            this.book = resp.data;
          })
    },
    // 加入购物车
    addToCart() {
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
      this.loadingBtn = true;
      let data = {
        id: id,
        bookId: this.book.id,
        quantity: this.quantity
      };
      axios.post("http://localhost:8081/user/addToCart",data)
          .then((resp) => {
            this.loadingBtn = false;
            if (resp.data === 1) {
              this.$message({
                type: 'success',
                message: '添加成功！'
              });
            } else if (resp.data === 0) {
              this.$message({
                type: 'error',
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
    // 加入收藏夹
    addToCollection() {
      let id = sessionStorage.getItem("id");
      if (id == null) {
        this.$message({
          type: 'warning',
          message: '您还未登录，请先登录！'
        });
      } else {
        axios.post("http://localhost:8081/user/addToCollection/"+id+"/"+this.book.id)
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
    // 立即购买
    beforeBuyNow() {
      let id = sessionStorage.getItem("id");
      if (id == null) {
        this.$message({
          type: 'warning',
          message: '您还未登录，请先登录！'
        });
      } else {
        this.loading = true;
        this.checkTable = true;
        axios.get("http://localhost:8081/user/selectUserById/" + this.id)
            .then((resp) => {
              this.userInfo = resp.data;
            });
        this.checkData[0] = {
          bookName: this.book.bookName,
          quantity: 1,
          discountPrice: this.decimals(this.book.discount * this.book.price),
          img: this.book.img
        };
        this.loading = false;
      }
    },
    // 结算立即购买
    buyNow(state) {
      this.loadingBtn = true;
      let deal = {
        userId: this.id,
        shippingAddress: this.userInfo.shippingAddress,
        total: this.checkData[0].discountPrice,
        payWay: this.payWay,
        state: state
      };
      let dealDetails = [{
        bookId: this.book.id,
        bookName: this.book.bookName,
        bookPrice: this.checkData[0].discountPrice,
        bookQuantity: 1,
        bookImg: this.book.img
      }];
      axios.post("http://localhost:8081/deal/buyNow", {deal: deal, dealDetails: dealDetails})
          .then((resp) => {
            this.loadingBtn = false;
            this.checkTable = false;
            this.payWay = "支付宝";
            if (resp.data === 1) {
              if (state === 2) {
                this.$message({
                  showClose: true,
                  type: 'success',
                  message: '结算成功！'
                });
              }
              if (state === 6) {
                this.$message({
                  showClose: true,
                  type: 'warning',
                  message: '您有一笔新的待支付订单，请尽快在 我的订单 中处理'
                });
              }
            } else {
              this.$message({
                showClose: true,
                type: 'error',
                message: '结算失败，请重试'
              });
            }
          });
    },
    // 取消立即购买
    cancelBuyNow() {
      this.$confirm('确认取消支付？未支付的订单稍后可在 我的订单 中重新支付')
          .then(_ => {
            this.buyNow(6);
            this.payWay = "支付宝";
          })
          .catch(_ => {
          });
    },
    // 切换标签页，显示评论
    handleClick(tab) {
      if (tab.name === 'comment') {
        this.loading = true;
        axios.get("http://localhost:8081/comment/selectCommentByBookId/" + this.book.id + "/1/10")
            .then((resp) => {
              this.commentData = resp.data.comments;
              this.total = resp.data.total;
              this.loading = false;
            });
      }
    },
    // 格式化日期
    formatDate(time){
      let date = new Date(time);
      let year = date.getFullYear();
      let month = date.getMonth();
      let day = date.getDate();
      return year+"-"+month+"-"+day;
    },
    // 翻页功能
    page(currentPage) {
      this.loading = true;
      axios.get("http://localhost:8081/comment/selectComment/" + this.book.id + "/" + currentPage + "/10")
          .then((resp) => {
            this.commentData = resp.data.comments;
            this.total = resp.data.total;
            this.loading = false;
          });
    },
    // 初始化同类推荐
    initRecommendBooks(bookId){
      axios.get("http://localhost:8081/book/selectRecommendBook/" + bookId)
          .then((resp) => {
            this.recommendBooks = resp.data;
          })
    },
    // 从同类推荐跳转到图书详情页
    bookDetail(bookId){
      this.$router.push({name: 'BookDetail', params: {id: bookId}});
    }
  },
  created() {
    this.id = sessionStorage.getItem("id");
    this.initData(this.$route.params.id);
    this.initRecommendBooks(this.$route.params.id);
  }
}
</script>

<style scoped>
#wrap {
  margin: 80px auto;
  width: 1200px;
}

#detail-container #detail {
  margin: 30px auto 0;
  width: 1200px;
  height: 400px;
}

#detail-container #detail #img {
  margin-right: 50px;
  margin-left: 15px;
  width: 300px;
  float: left;
  border: 1px #dcdfe6 solid;
  padding: 10px;
}

#detail-container #detail #img img {
  margin-left: 15px;
  width: 260px;
  height: 360px;
}

#detail-container #detail #descriptions {
  width: 800px;
  float: left;
  font-size: 25px;
  margin-top: 20px;
}

.discountPrice {
  color: #ff1f1f;
}

.price {
  margin-left: 20px;
  text-decoration: line-through;
  color: rgba(151, 151, 151, 0.9);
  font-size: 16px;
}

#btn-group {
  margin: 40px auto 0;
}

#recommendation .image {
  width: 160px;
  height: 200px;
  display: block;
  margin-left: 10px;
  margin-top: 5px;
}

#recommendBooks {
  margin-top: 60px;
}

#detail-comment {
  margin: 100px auto;
}

#detail-comment .comment-content {
  padding: 15px;
}

#detail-comment .comment-content .userInfo img {
  width: 80px;
  height: 80px;
  margin-top: 10px;
  margin-left: 50px;
}

#detail-comment .comment-content .userInfo p {
  text-align: center;
  font-size: 16px;
  color: #409EFF;
}

#detail-comment .comment-content .rate {
  margin: 0 auto 10px;
  width: 150px;
}

#detail-comment .comment-content .content {
  height: 90px;
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  text-indent: 30px;
}

#detail-comment .comment-content .date {
  margin-left: 850px;
}

#pageBtn {
  margin: 20px auto;
  display: table;
}
</style>