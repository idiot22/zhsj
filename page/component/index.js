import { getRadarData } from '../../util/api.js'
const API = require('../API/api.js')
const app = getApp()
const imgPath = app.globalData.imgPath
Page({
  data: {
    if_loading:false
   
    },

  //页面初加载
  onLoad: function (options) {
    var that = this
    this.setData({
     
    })
   
     
  },
  gomore: function (options) {
    wx.switchTab({
      url: '../../../more/more'
    })
  },
  data: {
    interval: 5000,
    duration: 800,
    focus: false,
    swiperheight:'height:380rpx',
    inputValue: '',
  
    kcbaoming: [{
      courseImg: '/image/courses/cooker.jpg',
      course: '小小美食家',
      flag: '进行中',
      
      day: '周六',
      time: '15:00-17:00',
      price:'3500'

    },
    {
      courseImg: '/image/courses/活动02.jpg',
      course: '折纸课程',
      flag: '一天后',
  
      day: '周日',
      time: '15:00-17:00',
       price: '5500'
    },
    {
      courseImg: '/image/courses/活动03.jpg',
      course: '航模制作',
      flag: '六天后',
   
      day: '周五',
      time: '19:00-21:00',
      price: '6000'

    },
  
    ],
   hdbaoming: [
      {
       courseImg: 'http://zhsj.bnuz.edu.cn/xcx_img/activities/reading.png',
        course: '活动 | 阅读交流分享',
        flag: '一天后',

        day: '周日',
        time: '15:00-17:00',
        price: '0'
      },
      {
        courseImg: 'http://zhsj.bnuz.edu.cn/xcx_img/courses/cooker.jpg',
        course: '夏令营 | 西点专业营',
        flag: '进行中',

        day: '周六',
        time: '15:00-17:00',
        price: '5000'

      },
      {
        courseImg: 'http://zhsj.bnuz.edu.cn/xcx_img/courses/pilot.jpg',
        course: '职业体验营|小小飞行员',
        flag: '六天后',
        day: '周五',
        time: '19:00-21:00',
        price: '7200'
      },

    ],
    myactivity: [
      {
        activityImg: 'http://zhsj.bnuz.edu.cn/xcx_img/courses/coding.png',
        activity: '编程大赛',
        flag: '一天后',

        day: '2019-04-19',
        time: '15:00'
      },
      {
        activityImg: 'http://zhsj.bnuz.edu.cn/xcx_img/activities/vrcamp.png',
        activity: 'vr体验营',
        flag: '六天后',

        day: '2019-04-19',
        time: '15:00'
      },
      {
        activityImg: 'http://zhsj.bnuz.edu.cn/xcx_img/activities/skiing.png',
        activity: '滑雪体验',
        flag: '三天后',

        day: '2019-04-19',
        time: '15:00'
      },
      {
        activityImg: '/image/courses/课程.jpg',
        activity: '航模制作',
        flag: '六天后',

        day: '2019-04-19',
        time: '15:00'
      },

    ],
    mycourse: [{
   
      flag: '进行中',
      t_img: '/image/portrait02.png',
      t_name: 'David',
      day: '2019-04-19',
      time: '15:00'

    },
    {
  
      flag: '一天后',
      t_img: '/image/portrait.png',
      t_name: 'Susan',
      day: '2019-04-19',
      time: '15:00'
    },
    {
   
      flag: '六天后',
      t_img: '/image/portrait.png',
      t_name: 'Helen',
      day: '2019-04-19',
      time: '15:00'
    },
    {
     
      flag: '一天后',
      t_img: '/image/portrait02.png',
      t_name: 'Mathew',
      day: '2019-04-19',
      time: '15:00'
    }
    ],
   
    courseImg:[
      '/image/courses/课程.jpg',
      '/image/courses/课程02.jpg',
      '/image/courses/课程03.jpg',
      '/image/courses/课程.jpg',
    ],
    imgUrls: [
      'http://zhsj.bnuz.edu.cn/xcx_img/banner02.png',
      'http://zhsj.bnuz.edu.cn/xcx_img/banner01.png',
      'http://zhsj.bnuz.edu.cn/xcx_img/banner03.png',    
     
      
         
    ],
    grid:
      [
        { 
          icon: 'http://zhsj.bnuz.edu.cn/xcx_img/icon/通知.png',
          text:'通知',
          iftag:true,
          info_num: 5,
          url: '/page/component/kcinfo/kcinfo'

        },
        {
          icon: 'http://zhsj.bnuz.edu.cn/xcx_img/icon/评价.png',
          text: '评价',
          iftag: true,
          info_num: 4,
          url: '/page/component/overallCommend/overallCommend'
        },
        {
          icon: 'http://zhsj.bnuz.edu.cn/xcx_img/icon/雷达.png',
          text: '雷达',
          iftag: false,
          info_num: 30,
          url: '/page/component/radar/radar'
        },
        {
          icon: 'http://zhsj.bnuz.edu.cn/xcx_img/icon/课表.png',
          text: '课表',
          iftag: true,
          info_num: 2,
          url: '/page/component/timeframe/timeframe'
        },
        {
          icon: 'http://zhsj.bnuz.edu.cn/xcx_img/icon/申报.png',
          text: '申报',
          iftag:false,
          info_num:30,
          url: '/page/component/radar/radar'
        }
      ],
   
    baoming:[
      '/image/courses/活动03.jpg'
    ],
    //通知
    inform: [{
    title: "课程：您的少儿编程课已成功报名",
    isread:"已读",
    label: "上课时间：每周六 10：00-11：30",
    border : true
    },
      {
        title: "课程：您报名的少儿英语有作业需要提交",
        newvalue : "未读",
        // label = "上课时间：每周六 10：00-11：30",
        border : true
      },
      {
        title: "活动：您报名的PCA马术夏令营地点变更",
        isread: "已读",
        label : "原计划于鄂尔多斯市举行的开营市改为包头市",
        border : true
      }
      
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 3000,
    duration: 800,
  },
  suo: function () {
    this.setData({
      focus: true
    })
  },
  toPage: function (e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
    })
  },
  toPageMore(){
    wx.navigateTo({
      url: './more2/more2?isSearch=1',
    })
  },
  onLoad:function(){
    let that = this
    //获取我的课程数据
    API.myCourseAPI()
      .then((res) => {
        let myCourseData = this.myCourseData(res)
        console.log(myCourseData)
        for (let i = 0; i <myCourseData.length;i++){
          if(i==1){
            myCourseData[i].courseImg = 'http://zhsj.bnuz.edu.cn/xcx_img/courses/课程.jpg'
          }else if(i==2){
            myCourseData[i].courseImg = 'http://zhsj.bnuz.edu.cn/xcx_img/activities/vr.png'
          }else{
            myCourseData[i].courseImg = 'http://zhsj.bnuz.edu.cn/xcx_img/activities/reading.png'
          }
        }
        that.setData({
          mycourse: myCourseData
        })
      })

    //获取报名课程数据
    API.chooseCourseAPI().then((res) => {
      let chooseCourseData =this.chooseCourseData(res)
      that.setData({
        kcbaoming: chooseCourseData
      })
      wx.setStorageSync('kcbaoming', that.data.kcbaoming)
    })
    //获取通知数据
    API.getMessageAPI().then((res) => {
      wx.setStorageSync('message', res)    //存储数据
    })
    getRadarData().then((res) => {
      let scorelist = [];
      for (let i in res.statisticsArrayList) {
        scorelist = scorelist.concat(res.statisticsArrayList[i].num)
      }
      app.globalData.radar = scorelist
      app.globalData.week = res.week
    })
  },
  onSearch(e){
    
    console.log(this.data.value)
    wx.request({
      url: `${roothPath}/api/course/getAllCourses`,
    })
  },
  onChange(e){
    this.setData({
      value: e.detail
    })
  },
  courseMore: function () {
    wx.navigateTo({
      url: `/page/component/more/more?kcbaoming=${JSON.stringify(this.data.kcbaoming)}`
    })
  },
  isRead: function () {
    POST.isRead()
  },
  //跳转到课程列表
  gomore: function (options) {
    wx.navigateTo({
      url: '../../../more2/more2'
    })
  },
  //
  //将我的课程api返回的数据进行处理,用于在首页输出
  myCourseData(datas){
    let  myCourse = []
    for(let i = 0; i<datas.length;i++){
    let data = {}
    data.courseImg = `${imgPath}/${datas[i].courseImgUrl}`
    data.courseId = datas[i].courseId
    data.course = datas[i].courseName
    data.flag = "进行中"
    data.t_img = ''
    data.t_name = ''
    data.day = datas[i].startDate.substr(0, 10)
    data.time = datas[i].courseStartTime.substr(0, 5)
    myCourse.push(data)
}
return myCourse
},
//课程报名数据转换
 chooseCourseData(datas) {
  let chooseCourse = []
  for (let i = 0; i < datas.length; i++) {
    let data = {}
    data.courseImg = `http://zhsj.bnuz.edu.cn/${datas[i].courseImgUrl}`
    data.course = datas[i].courseName
    data.courseId = datas[i].courseId
    data.flag = "进行中"
    data.day = datas[i].startDate
    data.time = datas[i].courseStartTime
    data.price = datas[i].money
    chooseCourse.push(data)
  }
  return chooseCourse
},
//跳转到课程详情
toCourseXQ(e){
  let courseId = e.currentTarget.dataset.courseid
  let mycourse = e.currentTarget.dataset.mycourse
  wx.navigateTo({
    url: `./c-details/c-details?courseId=${courseId}&mycourse=${mycourse}`
  })
},
  onReady: function () {
    
  },

 
})
