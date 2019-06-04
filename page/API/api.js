const app = getApp();
const rootPath = app.globalData.rootPath;
const studentId = app.globalData.studentId
const schoolId = app.globalData.schoolId
//调用我的课程的api并返回数据
function myCourseAPI() {
  console.log(studentId)
  return new Promise(function (resolve, reject) {
  wx.request({
    url: `${rootPath}/api/course/getMyCourse`,
    data: { 'studentId': studentId },
    success: function (res) {
      console.log("我的课程数据获取成功")
      resolve(res.data.result.data)
    },
    error: function (err) {
      console.log("我的课程数据获取错误")
      reject(err)
    }
  })
})
}

//调用课程报名的数据
function chooseCourseAPI() {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: `${rootPath}/api/course/chooseCourse/init`,
      data: { 
        'studentId': studentId,
        'schoolId': schoolId
        },
      success: function (res) {
        console.log("课程报名数据获取成功")
        resolve(res.data.result.data)
      },
      error: function (err) {
        console.log("课程报名数据获取错误")
        reject(err)
      }
    })
  })
}
//筛选课程
function queryCourse(gradeId, week, subjectId, interestType, courseStartTime,courseEndTime){
  return new Promise(function (resolve, reject) {
    wx.request({
      url: `${rootPath}/api/course/getCoursesByTime`,
      data: {
        "studentId": studentId,
        "schoolId": schoolId,
        "grade": gradeId,
        "week": week,
        "type": subjectId,
        "interestType": interestType,
        "courseStartTime": courseStartTime,
        "courseEndTime": courseEndTime
      },
      success: function (res) {
        console.log("筛选报名数据获取成功")
        resolve(res.data.result.data)
      },
      error: function (err) {
        console.log("筛选报名数据获取错误")
        reject(err)
      }
    })
  })
}
//获取通知信息
function getMessageAPI() {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: `${rootPath}/api/studentMessage/getMessages`,
      data: {
        'studentId': studentId,
      },
      success: function (res) {
        if (res.data.code == 200) {
          console.log("通知数据获取成功")
          resolve(res.data.data)
        } else {
          console.log("通知数据获取时服务器输出：2020" + res.data.msg);
        }
      },
      error: function (err) {
        console.log("通知数据获取错误")
        reject(err)
      }
    })
  })
}


module.exports = {
  myCourseAPI: myCourseAPI,
  chooseCourseAPI: chooseCourseAPI,
  queryCourse: queryCourse,
  getMessageAPI: getMessageAPI
}