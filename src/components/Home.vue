 <template>
  <div>
    <!--轮播图、排行榜-->
    <div id="Container">
      <!--轮播图-->
      <div id="Carousel">
        <div class="block">
          <el-carousel height="450px" autoplay>
            <el-carousel-item v-for="(url,index) in imgUrls" :key="index">
              <el-image :src="url" :fit="fits[0]">
                <div slot="placeholder" style="margin-top:220px;margin-left: 400px">
                  努力加载中<span class="dot">...</span>
                </div>
              </el-image>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
      <!--排行榜-->
      <div id="Rank" v-loading="loading">
        <p style="font-size: 18px;line-height: 1;color: #409EFF">
          <i class="el-icon-trophy" style="font-size: 20px"></i> 图书畅销榜
        </p>
        <el-collapse v-model="activeRankName" accordion>
          <el-collapse-item v-for="(book,index) in RankBooks" :name="index+1+''">
            <template slot="title">
              <i :class="index==0?'el-icon-medal-1':''"></i>第{{index+1}}名: {{book.bookName}}
            </template>
            <div id="rank-container" @click="BookDetail(book.id)">
              <img :src="book.img">
              <div id="content">
                <div id="bookName">{{book.bookName}}</div>
                <div id="price">
                  <span class="discountPrice"><span style="font-size: 14px">¥ </span>{{decimals(book.price*book.discount)}} </span><br>
                  <span class="price" v-if="book.discount<1">定价: ¥{{book.price}}</span>
                </div>
                <div id="sales">总销量: <span style="font-size: 15px;color: #333333">{{book.sales}}</span></div>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
    <!--标签页-->
    <div id="tab">
      <el-tabs v-model="activeName" @tab-click="handleClick" v-loading="loading">
        <el-tab-pane label="最新上架" name="1">
          <el-row :gutter="10">
            <el-col :span="4" v-for="Book in Books">
              <div class="container">
                <el-popover
                    placement="right"
                    :title="Book.bookName"
                    width="200"
                    trigger="hover"
                    :content="Book.brief"
                    :close-delay="100">
                  <el-button slot="reference" plain style="margin-top: 10px" @click="BookDetail(Book.id)">
                    <div>
                      <img :src="Book.img" class="img">
                      <div>
                        <span class="book-name">{{Book.bookName}}</span><br>
                        <div style="width: 130px;margin: 0 auto">
                          <span class="discountPrice"><span style="font-size: 14px">¥ </span>{{decimals(Book.price*Book.discount)}} </span>
                          <span class="price" v-if="Book.discount<1"> ¥{{Book.price}}</span>
                        </div>
                      </div>
                    </div>
                  </el-button>
                </el-popover>
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="独家畅品" name="2">
          <el-row :gutter="10">
            <el-col :span="4" v-for="Book in Books">
              <div class="container">
                <el-popover
                    placement="right"
                    :title="Book.bookName"
                    width="200"
                    trigger="hover"
                    :content="Book.brief"
                    :close-delay="100">
                  <el-button slot="reference" plain style="margin-top: 10px" @click="BookDetail(Book.id)">
                    <div>
                      <img :src="Book.img" class="img">
                      <div>
                        <span class="book-name">{{Book.bookName}}</span><br>
                        <div style="width: 130px;margin: 0 auto">
                          <span class="discountPrice"><span style="font-size: 14px">¥ </span>{{decimals(Book.price*Book.discount)}} </span>
                          <span class="price" v-if="Book.discount<1"> ¥{{Book.price}}</span>
                        </div>
                      </div>
                    </div>
                  </el-button>
                </el-popover>
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="重点推荐" name="3">
          <el-row :gutter="10">
            <el-col :span="4" v-for="Book in Books">
              <div class="container">
                <el-popover
                    placement="right"
                    :title="Book.bookName"
                    width="200"
                    trigger="hover"
                    :content="Book.brief"
                    :close-delay="100">
                  <el-button slot="reference" plain style="margin-top: 10px" @click="BookDetail(Book.id)">
                    <div>
                      <img :src="Book.img" class="img">
                      <div>
                        <span class="book-name">{{Book.bookName}}</span><br>
                        <div style="width: 130px;margin: 0 auto">
                          <span class="discountPrice"><span style="font-size: 14px">¥ </span>{{decimals(Book.price*Book.discount)}} </span>
                          <span class="price" v-if="Book.discount<1"> ¥{{Book.price}}</span>
                        </div>
                      </div>
                    </div>
                  </el-button>
                </el-popover>
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="好评发售" name="4">
          <el-row :gutter="10">
            <el-col :span="4" v-for="Book in Books">
              <div class="container">
                <el-popover
                    placement="right"
                    :title="Book.bookName"
                    width="200"
                    trigger="hover"
                    :content="Book.brief"
                    :close-delay="100">
                  <el-button slot="reference" plain style="margin-top: 10px" @click="BookDetail(Book.id)">
                    <div>
                      <img :src="Book.img" class="img">
                      <div>
                        <span class="book-name">{{Book.bookName}}</span><br>
                        <div style="width: 130px;margin: 0 auto">
                          <span class="discountPrice"><span style="font-size: 14px">¥ </span>{{decimals(Book.price*Book.discount)}} </span>
                          <span class="price" v-if="Book.discount<1"> ¥{{Book.price}}</span>
                        </div>
                      </div>
                    </div>
                  </el-button>
                </el-popover>
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </div>

    <!--活动图片-->
    <div id="Ad">
      <el-divider content-position="right">
        <span style="font-size: 18px"><i class="el-icon-shopping-bag-1"></i> 活动</span>
      </el-divider>
      <div style="margin-top: 30px">
        <el-row :gutter="20">
          <el-col :span="8"><img src="../assets/img/ad1.jpg" class="image"></el-col>
          <el-col :span="8"><img src="../assets/img/ad2.jpg" class="image"></el-col>
          <el-col :span="8"><img src="../assets/img/ad3.jpg" class="image"></el-col>
          <el-col :span="8"><img src="../assets/img/ad4.jpg" class="image"></el-col>
          <el-col :span="8"><img src="../assets/img/ad5.jpg" class="image"></el-col>
          <el-col :span="8"><img src="../assets/img/ad6.jpg" class="image"></el-col>
        </el-row>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
      imgUrls: [require('../assets/img/p1.png'), require('../assets/img/p2.png'), require('../assets/img/p3.png'), require('../assets/img/p4.png')],
      activeName: '1',
      Books: null,
      activeRankName: '1',
      RankBooks: [],
      loading: true
    }
  },
  methods: {
    // 切换标签页里显示的书
    handleClick(tab) {
      this.loading = true;
      const _this = this;
      axios.get("http://localhost:8081/book/selectBookByState/" + tab.name)
          .then(function (resp) {
            _this.Books = resp.data;
            _this.loading = false;
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
    // 右下角弹框的欢迎语
    welcome() {
      let userName = sessionStorage.getItem("userName");
      let flag = sessionStorage.getItem("flag");
      if (userName != null && flag === "1") {
        sessionStorage.setItem("flag", "0");
        this.$notify({
          title: '',
          dangerouslyUseHTMLString: true,
          message: "欢迎您 " + userName + " , 祝您有愉快的一天" +
              "<p style='text-align: right'>" +
              "<span style='font-family: Monotype Corsiva,serif;font-weight: bolder;color: #409EFF'>DengDeng-" +
              "<span style='color: #45d8e7'>p</span><span style='color: #3ee343'>l</span>" +
              "<span style='color: #ede257'>u</span><span style='color: #ef846b'>s</span></span>" +
              "</p>",
          position: 'bottom-right',
          offset: 50
        });
      }
    },
    // 初始化tab信息
    initTab(){
      this.loading = true;
      axios.get("http://localhost:8081/book/selectBookByState/1")
          .then((resp) => {
            this.Books = resp.data;
            this.loading = false;
          });
    },
    // 初始化排行榜
    initRank(){
      this.loading = true;
      axios.get("http://localhost:8081/book/selectRankBook")
          .then((resp) => {
            this.RankBooks = resp.data;
            this.loading = false;
          });
    }
  },
  created() {
    this.welcome();
    this.initTab();
    this.initRank();
  }
}
</script>

<style scoped>
#Container {
  margin-bottom: 100px;
}

#Carousel {
  margin: 50px 0px 0px 180px;
  width: 900px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}

#Rank {
  margin: -450px 0px 0px 1115px;
  padding-top: 5px;
  padding-left: 15px;
  padding-right: 15px;
  width: 250px;
  height: 445px;
  border: 1px #e9e9e9 solid;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  overflow-y: visible;
}
#Rank #rank-container{
  margin-left: 10px;
  height: 110px;
  cursor: pointer;
}
#Rank #rank-container img{
  float: left;
  width: 100px;
  height: 120px;
}

#Rank #rank-container #content{
  float: left;
  width: 100px;
  height: 120px;
  margin-left: 20px;
  margin-top: 5px;
}

#Rank #rank-container #content #bookName{
  font-size: 14px;
  width: 100px;
  height: 20px;
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  line-height: normal;
}
#Rank #rank-container #content #price{
  margin-top: 5px;
}

#Rank #rank-container #content .discountPrice{
  color: #ff1f1f;
  font-size: 17px;
}
#Rank #rank-container #content .price{
  text-decoration: line-through;
  color: rgba(151, 151, 151, 0.9);
  font-size: 13px;
}

#Rank #rank-container #content #sales{
  margin-top: 5px;
  color: rgba(90, 90, 90, 0.9);
}


#tab {
  margin: 70px auto;
  width: 1100px;
}

.container .img {
  width: 120px;
  height: 150px;
}

.container .book-name {
  width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  margin-top: 10px;
  line-height: normal;
}

.container .discountPrice {
  color: #ff1f1f;
  font-size: 18px;
}

.container .price {
  text-decoration: line-through;
  color: rgba(151, 151, 151, 0.9);
  font-size: 14px;
}

#Ad {
  margin: 0 auto 150px;
  width: 1200px;
}
</style>