import * as echarts from '../ec-canvas/echarts.min';
const app = getApp();
//初始化图表
function initChart(canvas, width, height) {
 //图表的建立
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);
  let option = {}
//配置图表的样式参数等信息
   option = {
      backgroundColor: "#ffffff",
      color: ["#00c5bc"], //选择的界限
      tooltip: {},
      xAxis: {
        show: false
      },
      yAxis: {
        show: false
      },
      radar: {
          //shape: 'circle',
          splitArea: {     //不同环形的颜色
            areaStyle: {
              color: []
            },
            shadowColor: ['rgb(197, 207, 217)'], // 圆颜色
          },

          axisLine: {    //纵轴的颜色
            lineStyle: {
              color: 'rgb(197, 207, 217)'
            }
          },
          axisTick: {
            show: true,
          },
          indicator: [{      //指示的内容
            name: '人文底蕴',
            max: 100
            },
            {
              name: '科学精神',
              max: 100
            },
            {
              name: '学会学习',
              max: 100
            },
            {
              name: '健康生活',
              max: 100
            },
            {
              name: '责任担当',
              max: 100
            },
            {
              name: '实践创新',
              max: 100
            }
          ],
          name: {            //修改指示器的样式
              formatter: '{value}',
              textStyle: {
                color: 'white',
                backgroundColor: "#00c5bc",
                borderRadius: 3,
                padding:[3,5],
                fontSize:13,
              }
          },
      },
      series: [{   //选择区域
        name: '',
        type: 'radar',
        tooltip:{        // 触摸显示详情 
          trigger:'item',
          formatter: function (param) {
            // 利用循环更改显示的内容
            console.log(param)
            let length = param.value.length
            let txt = param.data.name +'\n'
            for( let i=0;i<length; i++){
              if(i==length-1){
                txt += param.value[i]
                return txt
              }
              txt += param.value[i]+'\n'
            }
        }},
        itemStyle: { normal: { areaStyle: { type: 'default' } } },
        data: [{
          value: app.globalData.radar,
          name: '素养得分:'
        }
        ],
        areaStyle: {   // 选择区域颜色
          normal: {
            color: 'rgba(0, 197,188, 0.2)' 
          }
        },
        label:{
          normal:{
            show:true,
            formatter:function(params){
              return params.value
            },
            textStyle:{
              color:'black'
            }
          }
        }
      }]
  };
  chart.setOption(option);
  return chart;
}
Page({
  onShareAppMessage: function (res) {
    return {
      title: '我的综合测评大家快来看看吧',
      path: '/pages/index/index',
      success: function () { },
      fail: function () { }
    }
  },
  data: {
    ec: {
      onInit: initChart
    }
  },

  onLoad(){
  },
  onReady() {

  }
});
