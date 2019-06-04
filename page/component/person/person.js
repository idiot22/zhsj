const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    grade:'',
    name:'',
    score:90,
    growth:80,
    myworks:40,
    like:30,
    img_course: 'http://zhsj.bnuz.edu.cn/xcx_img/icon/course.png',
    img_works: 'http://zhsj.bnuz.edu.cn/xcx_img/icon/works.png',
    img_grade: 'http://zhsj.bnuz.edu.cn/xcx_img/icon/grade.png',
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    // 查看是否授权
    var that = this
    wx.getSetting({

      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称

          wx.getUserInfo({

            success(res) {


              console.log(res.userInfo)
              that.setData({
                //  nickName: '',
                userInfo: res.userInfo
              })
            },

          })

        }
      }
    })

    wx.request({
      url: `${app.globalData.rootPath}/api/personalInfo/getMyInfo`,
      method:'get',
      data:{
        studentId: app.globalData.studentId
      },
      header:{
        Cookie: app.globalData.header.Cookie
      },
      success:function(res){
        let data = res.data.result.data[0]
        let data2 = res.data.result.data
        that.setData({
          like: data.thumbUpNum,
          myworks: data.postNum,
          growth: res.data.result.totalnum,
          score: res.data.result.pindex,
          name: data.name,
          grade: data.gradeId
        })
      }
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