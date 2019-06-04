import { wxrequest } from './request.js'
const app = getApp()
const rootPath = app.globalData.rootPath
const baseUrl = rootPath + '/api/school/province'
const studentId = app.globalData.studentId
const schoolId = app.globalData.schoolId
var header = getApp().globalData.header; //获取app.js中的请求头
//取得省份学校等信息
export function getPlaceData({ condition, keyPro, keyCity }) {
  let data;
  switch (condition) {
    case 1:
      data = wxrequest({
        url: baseUrl,
      })
      break;
    case 2:
      data = wxrequest({
        url: `${baseUrl}/${keyPro}/city`
      })
      break;
    case 3:
      data = wxrequest({
        url: `${baseUrl}/${keyPro}/city/${keyCity}/school`
      })
      break;
  }
  return data;
}
//取得家庭和孩子评价的数据
export function getParentOrKidCommend({ key }) {
  let data;
  switch (key) {
    case 2:
      data = wxrequest({
        url: `${rootPath}/api/evaluation/family/content`, header: header
      })
      break;
    case 3:
      data = wxrequest({
        url: `${rootPath}/api/evaluation/student/content`, header: header
      })
      break;
  }
  return data
}
//取得课表信息
export function myCourseBiaoAPI() {
  return wxrequest({ url: `${rootPath}/api/course/getMyCourse`, resKey: 2, data: { 'studentId': studentId, 'getType':'ScheduleCard'}})
}
//取得雷达信息
export function getRadarData() {
  return wxrequest({ url: `${rootPath}/statistics/initRadar`, data: { 'classId': 0 }, resKey: 1, header: header})
}