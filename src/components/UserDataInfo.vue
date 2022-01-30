<template>
  <div>
    <div>
      <el-row :gutter="20">
        <el-col :span="5" style="margin-top: 8px"><span style="font-size: 20px;">用户名: 张三</span></el-col>
        <el-col :span="11" style="margin-top: 8px"><span style="font-size: 20px;">用户编号：4ceed418a03791752931314772f15ee3</span></el-col>
        <el-col :span="8">
          <el-input style="margin-left: 0px;width: 350px;" placeholder="请输入用户名或用户编号"
                    clearable prefix-icon="el-icon-search" v-model="searchUser">
            <el-button slot="append">搜索</el-button>
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
      searchUser: ''
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
              text: '用户指标'
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
                data: [5, 60, 40, 80],
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
            title: {text: '用户消费状况'},
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
                data: [34, 0, 5, 8, 11, 12, 2, 0, 0, 9, 16, 24],
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
                data: [343, 0, 0, 122, 0, 54, 21, 0, 0, 0, 68, 102],
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