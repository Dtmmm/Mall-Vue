<template>
  <div>
    <div>
      <el-row :gutter="20">
        <el-col :span="5" style="margin-top: 8px"><span style="font-size: 17px;">用户名: {{this.userName}}</span></el-col>
        <el-col :span="8" style="margin-top: 8px"><span style="font-size: 17px;">编号：{{this.userId}}</span></el-col>
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
          <el-input style="margin-left: 0;width: 280px;" placeholder="请输入用户名或编号"
                    clearable prefix-icon="el-icon-search" v-model="condition">
            <el-button slot="append" @click="search">搜索</el-button>
          </el-input>
        </el-col>
      </el-row>
    </div>
    <el-divider></el-divider>
    <div id="chart-wrap">
      <el-row :gutter="50">
        <el-col :span="11">
          <div id="bar"></div>
        </el-col>
        <el-col :span="13">
          <div><div id="line"></div></div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import '../assets/js/shine.js'

export default {
  name: "UserConsumptionInfo",
  data() {
    return {
      condition: '',
      userName: '--',
      userId: '--',
      userMetrics: [],
      pageviews:[],
      consumption:[],
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
    this.drawBar();
    this.drawLine();
  },
  methods: {
    drawBar() {
      let bar = this.$echarts.init(document.getElementById('bar'), 'shine');
      bar.setOption(
          {
            title: {
              text: this.year + '年度用户指标'
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
            },
            xAxis: {
              type: 'value',
              axisLabel: {
                show: true,
                formatter: '{value}%'
              },
              max: 100,
              min: 0
            },
            yAxis: {
              type: 'category',
              data: ['售后率', '活跃率', '评论率', '好评率']
            },
            series: [
              {
                name: '2011',
                type: 'bar',
                label: {
                  show: true,
                  position: 'right',
                  formatter: '{c}%'
                },
                data: this.userMetrics,
                barWidth: 50
              }
            ]
          }
      );
    },
    drawLine() {
      let line = this.$echarts.init(document.getElementById('line'), 'shine');
      line.setOption(
          {
            title: {text: this.year + '年度消费状况'},
            tooltip: {trigger: 'axis'},
            legend: {},
            xAxis: [{
              type: 'category',
              data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
              axisTick: {alignWithLabel: true}
            }],
            yAxis: [
              {
                type: 'value',
                position: 'right',
                axisLabel: {
                  formatter: '{value}本'
                }
              },
              {
                type: 'value',
                position: 'left',
                axisLabel: {
                  formatter: '{value}元'
                }
              }
            ],
            series: [
              {
                name: '商品浏览量',
                type: 'line',
                yAxisIndex: 0,
                data: this.pageviews,
                label: {
                  show: true,
                  position: 'bottom',
                  textStyle: {
                    fontSize: 14
                  }
                },
              },
              {
                name: '累计消费额',
                type: 'line',
                yAxisIndex: 1,
                data: this.consumption,
                label: {
                  show: true,
                  position: 'top',
                  textStyle: {
                    fontSize: 14
                  }
                },
              }
            ]
          }
      );
    },
    // 查询用户数据情况
    search() {
      axios.get("http://localhost:8081/backstage/selectUserByCondition/" + this.condition)
          .then((resp) => {
            if (resp.data.id == null) {
              this.$message({
                message: '没有查询到该用户，请检查输入的用户名或编号是否正确',
                type: 'error',
                duration: 5000,
                showClose: true
              });
            } else {
              this.clearData();
              this.flag = true;
              this.userId = resp.data.id;
              this.userName = resp.data.userName;
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
    // 生成随机用户指标
    randomUserMetrics(){
      this.userMetrics[0] = this.randomNum(0,40);
      this.userMetrics[1] = this.randomNum(20,95);
      this.userMetrics[2] = this.randomNum(0,100);
      this.userMetrics[3] = this.randomNum(0,100);
    },
    // 生成随机商品浏览量
    randomPageviews(){
      for (let i = 0; i < 12; i++) {
        if (Math.random()<=0.1){
          this.pageviews[i] = 0;
        } else {
          this.pageviews[i] = this.randomNum(10,1000);
        }
      }
    },
    // 生成随机消费额
    randomConsumption(){
      for (let i = 0; i <12; i++) {
        if (this.pageviews[i] === 0){
          this.consumption[i] = 0;
        } else if (Math.random()<=0.5){
          this.consumption[i] = 0;
        } else {
          this.consumption[i] = this.randomNum(0,300);
        }
      }
    },
    // 填充图表随机数据
    randomData() {
      // 柱状图
      this.randomUserMetrics();
      // 折线图
      this.randomPageviews();
      this.randomConsumption()

      this.drawBar();
      this.drawLine();
    },
    // 清空图表数据
    clearData() {
      this.year = "";
      this.userMetrics = [];
      this.pageviews = [];
      this.consumption = [];
      this.drawBar();
      this.drawLine();
    },
    // 改变年份
    changeYear(){
      this.randomData();
    },
    // 导出Excel
    exportExcel(){
      this.loading = true;
      let data = this.getData();
      axios.post("http://localhost:8081/backstage/exportUserExcel",data,{responseType:'blob'})
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
      let pageviews = [];
      let consumptions = [];
      for (let i = 0; i < 4; i++) {
        let pageviewsData = [];
        for (let i = 0; i < 12; i++) {
          if (Math.random()<=0.1){
            pageviewsData[i] = 0;
          } else {
            pageviewsData[i] = this.randomNum(10,1000);
          }
        }
        pageviews.push(pageviewsData);

        let consumptionData = [];
        for (let i = 0; i < 12; i++) {
          if (pageviewsData[i] === 0){
            consumptionData[i] = 0;
          } else if (Math.random()<=0.5){
            consumptionData[i] = 0;
          } else {
            consumptionData[i] = this.randomNum(0,300);
          }
        }
        consumptions.push(consumptionData);
      }

      return {
        userId: this.userId,
        pageviews: pageviews,
        consumptions: consumptions,
        metrics: [this.userMetrics[0], this.userMetrics[1], this.userMetrics[2], this.userMetrics[3]]
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
      link.setAttribute('download', this.userName+'-用户消费情况.xlsx');
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

#bar {
  width: 600px;
  height: 530px;
}
#line {
  width: 640px;
  height: 530px;
}

</style>