<template>
  <div>
    <div>
      <el-row :gutter="20">
        <el-col :span="6" style="margin-top: 8px"><span style="font-size: 20px;">书名: 追风筝的人</span></el-col>
        <el-col :span="10" style="margin-top: 8px"><span style="font-size: 20px;">编号：0aad3542ae54892a1d31f449ab2dcabf</span></el-col>
        <el-col :span="8">
          <el-input style="margin-left: 0px;width: 350px;" placeholder="请输入书名或图书编号"
                    clearable prefix-icon="el-icon-search" v-model="searchBook">
            <el-button slot="append">搜索</el-button>
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
      searchBook: '',
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
              text: '2021年销售信息'
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
                data: [
                  341, 231, 531, 231, 119, 180, 251, 221, 351, 299, 114, 231
                ]
              },
              {
                name: '收藏量',
                type: 'bar',
                data: [
                  452, 421, 832, 551, 420, 467, 521, 501, 553, 437, 301, 412
                ]
              },
              {
                name: '点击量',
                type: 'line',
                yAxisIndex: 1,
                data: [895, 1003, 852, 832, 771, 1021, 1131, 896, 980, 911, 1249, 1342]
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
                  {value: 1048, name: '五星'},
                  {value: 735, name: '四星'},
                  {value: 580, name: '三星'},
                  {value: 484, name: '两星'},
                  {value: 300, name: '一星'}
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
