<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="12">
        <el-select v-model="year" placeholder="请选择年份" @change="changeYear" size="small" style="width: 125px">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
        <div id="pie"></div>
      </el-col>
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
      options: [
        {
          value: '2021',
          label: '2021-2022 年'
        }, {
          value: '2020',
          label: '2020-2021 年'
        }, {
          value: '2019',
          label: '2019-2020 年'
        }, {
          value: '2018',
          label: '2018-2019 年'
        }
      ],
      year: '2021',
      pieData: [3721,2942,2308,2629,1843,2084,1745,1562,1621,],
      salesVolume: [3241, 2634, 2524, 3103, 3321, 3532, 2941, 4313, 3412, 3541, 3341, 3892],
      sales: [162327, 111004, 113540, 179231, 126087, 171042, 105227, 224063, 148092, 176492, 157027, 189924],
      collection: [42331, 42212, 23251, 32364, 54621, 28137, 62532, 45298, 54282, 23181, 53359, 64852]
    }
  },
  mounted() {
    this.drawPie();
    this.drawLine();
    this.drawBar();
  },
  methods: {
    // 饼图
    drawPie() {
      let pie = this.$echarts.init(document.getElementById('pie'), 'shine');
      pie.setOption({
        title: {
          text: this.year + '年度图书分类销售占比',
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
            radius: [20, 220],
            center: ['50%', '50%'],
            roseType: 'area',
            itemStyle: {
              borderRadius: 8,
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            },
            data: [
              { value: this.pieData[0], name: '小说' },
              { value: this.pieData[1], name: '文艺' },
              { value: this.pieData[2], name: '科技' },
              { value: this.pieData[3], name: '人文社科' },
              { value: this.pieData[4], name: '童书' },
              { value: this.pieData[5], name: '教育' },
              { value: this.pieData[6], name: '经管' },
              { value: this.pieData[7], name: '成功/励志' },
              { value: this.pieData[8], name: '期刊' }
            ]
          }
        ]
      });
    },
    // 折线图
    drawLine() {
      let line = this.$echarts.init(document.getElementById('line'), 'shine');
      line.setOption(
          {
            title: {text: this.year + '年度销售状况'},
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
                data: this.salesVolume,
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
                data: this.sales,
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
    // 柱状图
    drawBar(){
      let bar = this.$echarts.init(document.getElementById('bar'), 'shine');
      bar.setOption({
        title: {
          text: this.year + '年度图书收藏数',
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
            data: this.collection,
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
    },
    // 生成从minNum到maxNum的随机数
    randomNum(minNum, maxNum) {
      switch(arguments.length){
        case 1:
          return parseInt(Math.random()*minNum+1,10);
        case 2:
          return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10);
        default:
          return 0;
      }
    },
    // 改变年份
    changeYear(){
      // 饼图
      this.pieData[0] = this.randomNum(2000,4000);
      this.pieData[1] = this.randomNum(1800,3800);
      this.pieData[2] = this.randomNum(1600,3600);
      this.pieData[3] = this.randomNum(1400,3400);
      this.pieData[4] = this.randomNum(1200,3200);
      this.pieData[5] = this.randomNum(1000,3000);
      this.pieData[6] = this.randomNum(1000,2800);
      this.pieData[7] = this.randomNum(900,2600);
      this.pieData[8] = this.randomNum(800,2400);
      // 折线图
      for (let i = 0; i < 12; i++) {
        this.salesVolume[i] = this.randomNum(2500,4500);
        console.log(Math.random()*(0.4) + 0.8);
        this.sales[i] = Math.round(this.salesVolume[i]*47*((Math.random()*(0.4) + 0.8).toFixed(2)));
      }
      // 柱状图
      for (let i = 0; i < 12; i++) {
        this.collection[i] = this.randomNum(25000,70000)
      }

      this.drawPie();
      this.drawLine();
      this.drawBar();
    }
  }
}
</script>

<style scoped>
#pie{
  width: 600px;
  height: 570px;
}
#line {
  width: 640px;
  height: 350px;
}
#bar{
  width: 620px;
  height: 260px;
}
</style>