import { myCourseBiaoAPI } from '../../../util/api.js'
//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    colorArrays: ["#ff9e9e", "#ffdf62", "#61e7f0", "#c2b4f6", "#0A9A84", "#FF99CC", "#FF9966", "#99CCCC"],
    wlist: [
    ],
    time:[
      ''
    ]
  },
  onLoad: function () {
    myCourseBiaoAPI().then((res=>{
      let wlist = this.res2wlist(res)
      this.setData({
        wlist:wlist
      })
    }))
  },
  res2wlist(res){
    let wlist = []
    for(let i in res){
      let course = {}
      course.kcmc = res[i].courseName
      course.skcd = 2
      let date = new Date("2018/01/01"+' '+res[i].courseStartTime)
      if (date <= new Date("2018/01/01 10:00")){
        course.skjc = 1
      } else if (date <= new Date("2018/01/01 11:50")){
        course.skjc = 3
      } else if (date <= new Date("2018/01/01 16:00")){
        course.skjc = 5
      } else if (date <= new Date("2018/01/01 17:50")) {
        course.skjc = 7
      } else if (date <= new Date("2018/01/01 19:45")) {
        course.skjc = 9
      }
      switch(res[i].week){
        case "星期一":
          course.xqj = 1
          break;
        case "星期二":
          course.xqj = 2
          break;
        case "星期三":
          course.xqj = 3
          break;
        case "星期四":
          course.xqj = 4
          break;
        case "星期五":
          course.xqj = 5
          break;
        case "星期六":
          course.xqj = 6
          break;
        case "星期七":
          course.xqj = 7
          break;
      }
      wlist.push(course)
    }
    return wlist
  },
})