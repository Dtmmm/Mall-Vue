<template>
  <div>
    <div>
      <el-row :gutter="20">
        <el-col :span="5" style="margin-top: 8px"><span style="font-size: 17px;">书名: {{ this.bookName }}</span></el-col>
        <el-col :span="8" style="margin-top: 8px"><span style="font-size: 17px;">编号：{{ this.bookId }}</span></el-col>
        <el-col :span="2">
          <el-button v-if="this.flag" type="primary" round icon="el-icon-printer" size="medium" @click="exportExcel" :loading="this.loading">导出</el-button>
          <el-button v-else type="primary" round icon="el-icon-printer" size="medium" disabled>导出</el-button>
        </el-col>
        <el-col :span="3">
          <el-select v-if="this.flag" v-model="year" placeholder="请选择年份" @change="changeYear">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
          <el-select v-else placeholder="请选择年份" disabled value=""></el-select>
        </el-col>
        <el-col :span="6">
          <el-input style="margin-left: 0;width: 280px;" placeholder="请输入图书名或编号"
                    clearable prefix-icon="el-icon-search" v-model="condition">
            <el-button slot="append" @click="search">搜索</el-button>
          </el-input>
        </el-col>
      </el-row>
    </div>
    <el-divider></el-divider>
    <div id="chart-wrap">
      <el-row :gutter="50">
        <el-col :span="12">
          <div id="mix-line-bar"></div>
        </el-col>
        <el-col :span="12">
          <div id="pie"></div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import '../assets/js/shine.js'

export default {
  data() {
    return {
      condition: '',
      bookName: '--',
      bookId: '--',
      salesVolume: [],
      collection: [],
      clicks: [],
      fiveStar: 0,
      fourStar: 0,
      threeStar: 0,
      twoStar: 0,
      oneStar: 0,
      options: [
        {
          value: '2021',
          label: '2021-2022年'
        }, {
          value: '2020',
          label: '2020-2021年'
        }, {
          value: '2019',
          label: '2019-2020年'
        }, {
          value: '2018',
          label: '2018-2019年'
        }
      ],
      year: '',
      flag: false,
      loading: false
    }
  },
  mounted() {
    this.drawMixLineBar();
    this.drawPie();
  },
  methods: {
    drawMixLineBar() {
      let mixLineBar = this.$echarts.init(document.getElementById('mix-line-bar'), 'shine');
      mixLineBar.setOption(
          {
            title: {
              text: this.year + '年度销售信息'
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross',
                crossStyle: {
                  color: '#999'
                }
              }
            },
            toolbox: {
              feature: {
                magicType: {show: true, type: ['line', 'bar']},
                restore: {show: true}
              }
            },
            legend: {},
            xAxis: [
              {
                type: 'category',
                data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                axisPointer: {
                  type: 'shadow'
                }
              }
            ],
            yAxis: [
              {
                type: 'value',
                name: '数量',
                axisLabel: {
                  formatter: '{value} 本'
                }
              },
              {
                type: 'value',
                name: '次数',
                axisLabel: {
                  formatter: '{value} 次'
                }
              }
            ],
            series: [
              {
                name: '销售量',
                type: 'bar',
                data: this.salesVolume
              },
              {
                name: '收藏量',
                type: 'bar',
                data: this.collection
              },
              {
                name: '点击量',
                type: 'line',
                yAxisIndex: 1,
                data: this.clicks
              }
            ]
          }
      );
    },
    drawPie() {
      let pie = this.$echarts.init(document.getElementById('pie'), 'shine');
      pie.setOption(
          {
            title: {
              text: '顾客评价',
              left: 'center'
            },
            tooltip: {
              trigger: 'item',
              formatter: '{b}率 : {d}%'
            },
            legend: {
              bottom: 10,
            },
            series: [
              {
                name: '顾客评价',
                type: 'pie',
                radius: '70%',
                data: [
                  {value: this.fiveStar, name: '五星'},
                  {value: this.fourStar, name: '四星'},
                  {value: this.threeStar, name: '三星'},
                  {value: this.twoStar, name: '两星'},
                  {value: this.oneStar, name: '一星'}
                ],
                itemStyle: {
                  borderRadius: 10,
                  borderColor: '#fff',
                  borderWidth: 2
                },
                emphasis: {
                  itemStyle: {
                    borderWidth: 0,
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          }
      );
    },
    // 查询图书销售情况
    search() {
      axios.get("http://localhost:8081/backstage/selectBookByCondition/" + this.condition)
          .then((resp) => {
            if (resp.data.id == null) {
              this.$message({
                message: '没有查询到该书，请检查输入的书名或编号是否正确',
                type: 'error',
                duration: 5000,
                showClose: true
              });
            } else {
              this.clearData();
              this.flag = true;
              this.bookId = resp.data.id;
              this.bookName = resp.data.bookName;
              this.year = "2021";
              this.randomData();
            }
          });
    },
    // 生成从minNum到maxNum的随机数
    randomNum(minNum, maxNum) {
      switch (arguments.length) {
        case 1:
          return parseInt(Math.random() * minNum + 1, 10);
        case 2:
          return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
        default:
          return 0;
      }
    },
    // 生成随机销售量
    randomSalesVolume() {
      let data = [];
      for (let i = 0; i < 12; i++) {
        data[i] = this.randomNum(100, 500);
      }
      this.salesVolume = data;
    },
    // 生成随机收藏量
    randomCollection() {
      let data = [];
      for (let i = 0; i < 12; i++) {
        data[i] = this.randomNum(300, 700);
      }
      this.collection = data;
    },
    // 生成随机点击量
    randomClicks() {
      let data = [];
      for (let i = 0; i < 12; i++) {
        data[i] = this.randomNum(800, 1300);
      }
      this.clicks = data;
    },
    // 生成随机顾客评价
    randomCustomerReviews() {
      this.oneStar = this.randomNum(100, 400);
      this.twoStar = this.randomNum(100, 400);
      this.threeStar = this.randomNum(300, 600);
      this.fourStar = this.randomNum(400, 800);
      this.fiveStar = this.randomNum(700, 1200);
    },
    // 填充图表随机数据
    randomData() {
      // 柱折图
      this.randomSalesVolume();
      this.randomCollection();
      this.randomClicks();
      // 饼图
      this.randomCustomerReviews();

      this.drawMixLineBar();
      this.drawPie();
    },
    // 清空图表数据
    clearData() {
      this.year = "";
      this.salesVolume = [];
      this.collection = [];
      this.clicks = [];
      this.fiveStar = 0;
      this.fourStar = 0;
      this.threeStar = 0;
      this.twoStar = 0;
      this.oneStar = 0;
      this.drawMixLineBar();
      this.drawPie();
    },
    // 改变年份
    changeYear(){
      this.randomData();
    },
    // 导出Excel
    exportExcel(){
      this.loading = true;
      let data = this.getData();
      axios.post("http://localhost:8081/backstage/exportBookExcel",data,{responseType:'blob'})
          .then((resp) =>{
            this.download(resp.data);
            this.loading = false;
            this.$message({
              message: '导出数据完成，已开始下载',
              type: 'success'
            });
          })
          .catch((err) => {console.log(err)});
    },
    // 生成数据
    getData(){
      let salesVolume = [];
      let collection = [];
      let clicks = [];
      for (let i = 0; i < 4; i++) {
        let salesVolumeData = [];
        for (let i = 0; i < 12; i++) {
          salesVolumeData[i] = this.randomNum(100, 500);
        }
        salesVolume.push(salesVolumeData);

        let collectionData = [];
        for (let i = 0; i < 12; i++) {
          collectionData[i] = this.randomNum(300, 700);
        }
        collection.push(collectionData);

        let clicksData = [];
        for (let i = 0; i < 12; i++) {
          clicksData[i] = this.randomNum(800, 1300);
        }
        clicks.push(clicksData);
      }

      return {
        bookId: this.bookId,
        salesVolume: salesVolume,
        collection: collection,
        clicks: clicks,
        rate: [this.oneStar, this.twoStar, this.threeStar, this.fourStar, this.fiveStar]
      };
    },
    // ajax不能下载文件，因此得自己定义方法下载
    download(data){
      if (!data) {
        return;
      }
      let url = window.URL.createObjectURL(new Blob([data]));
      let link = document.createElement('a');
      link.style.display = 'none';
      link.href = url;
      link.setAttribute('download', this.bookName+'-图书销售情况.xlsx');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    }
  }
}
</script>

<style scoped>
#chart-wrap {
  width: 1260px;
  height: 550px;
}

#mix-line-bar {
  width: 650px;
  height: 530px;
}

#pie {
  width: 600px;
  height: 490px;
}
</style>
