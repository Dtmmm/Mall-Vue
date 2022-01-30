<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="12"><div id="pie"></div></el-col>
      <el-col :span="12">
        <el-row><div id="line"></div></el-row>
        <el-row><div id="bar"></div></el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import '../assets/js/shine.js'
export default {
  name: "Summary",
  data () {
    return {

    }
  },
  mounted() {
    this.drawLine();
    this.drawPie();
    this.drawBar();
  },
  methods: {
    // 折线图
    drawLine() {
      let line = this.$echarts.init(document.getElementById('line'), 'shine');
      line.setOption(
          {
            title: {text: '年度销售状况'},
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
                name: '销售量(本)',
                type: 'line',
                yAxisIndex: 0,
                data: [3241, 2634, 2524, 3103, 3321, 3532, 2941, 4313, 3412, 3541, 3341, 3892],
                label: {
                  show: true,
                  position: 'bottom',
                  textStyle: {
                    fontSize: 14
                  }
                },
              },
              {
                name: '销售额(元)',
                type: 'line',
                yAxisIndex: 1,
                data: [95230, 86234, 82224, 92013, 93231, 98732, 88941, 100313, 94412, 92441, 92341, 95322],
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
    // 饼图
    drawPie() {
      let pie = this.$echarts.init(document.getElementById('pie'), 'shine');
      pie.setOption({
        title: {
          text: '年度图书分类销售占比',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c}本 ({d}%)'
        },
        legend: {
          type: 'scroll',
          bottom: 10,
        },
        series: [
          {
            type: 'pie',
            radius: [20, 230],
            center: ['50%', '50%'],
            roseType: 'area',
            itemStyle: {
              borderRadius: 8,
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            },
            data: [
              { value: 3421, name: '小说' },
              { value: 2642, name: '文艺' },
              { value: 2329, name: '科技' },
              { value: 2008, name: '人文社科' },
              { value: 1784, name: '童书' },
              { value: 1543, name: '教育' },
              { value: 1445, name: '经管' },
              { value: 1321, name: '成功/励志' },
              { value: 1262, name: '期刊' }
            ]
          }
        ]
      });
    },
    // 柱状图
    drawBar(){
      let bar = this.$echarts.init(document.getElementById('bar'), 'shine');
      bar.setOption({
        title: {
          text: '年度图书收藏数',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              formatter: '{value} 本'
            }
          }
        ],
        series: [
          {
            type: 'bar',
            barWidth: '60%',
            data: [42331, 42212, 23251, 32364, 54621, 28137, 62532, 45298, 54282, 23181, 53359, 64852],
            label: {
              show: true,
              position: 'top',
              textStyle: {
                fontSize: 12
              }
            },
          }
        ]
      });
    }
  }
}
</script>

<style scoped>
#line {
  width: 640px;
  height: 350px;
}
#pie{
  width: 600px;
  height: 600px;
}
#bar{
  width: 620px;
  height: 260px;
}
</style>