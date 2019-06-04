const app = getApp();
const API = require('../../API/api.js')
const imgPath = app.globalData.imgPath
const rootPath = app.globalData.rootPath
Page({

  /**
   * 页面的初始数据
   */
  data: {
    toutu: 'http://zhsj.bnuz.edu.cn/xcx_img/toutu.jpg',
    course_tab: ['请选择要提交的课程'],
    TabCur: 0,
    scrollLeft: 0,
    myCourse:[]
  },
  onPageScroll(e) {
    this.setData({
      scrollTop: e.scrollTop,
    })
  },
  tabSelect(e) {
    console.log(e);
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    //获取我的课程数据
    API.myCourseAPI()
      .then((res) => {
        for(let i in res){
          res[i].subjectMission = res[i].subjectMission.substr(0,40)+"......"
          res[i].courseImgUrl = rootPath+res[i].courseImgUrl
        }
        for (let i = 0; i <= 1; i++) {
          if (i == 1) {
            res[i].courseImgUrl = 'http://zhsj.bnuz.edu.cn/xcx_img/courses/课程.jpg'
          } else {
            res[i].courseImgUrl = 'http://zhsj.bnuz.edu.cn/xcx_img/courses/课程02.jpg'
          }
        }
        that.setData({
          myCourse: res
        })
      })

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
