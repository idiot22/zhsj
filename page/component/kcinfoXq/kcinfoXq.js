// page/component/kcinfoXq/kcinfoXq.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    courseXqIndex: 1,
    courseXq: [{
      content1: "探秘寻宝需要很强的团队合作能力，学生甲在此次学习中很好的完成了任务，并且同组成员都对学生甲有很高的评价",
      content2: "学生甲需要再接再厉，希望通过这里的一系列课程可以充实自己，找到自己热爱的东西",
      courseName: "探秘寻宝",
      createTime: "2019-04-24 11:35:30",
      image: 'http://zhsj.bnuz.edu.cn/xcx_img/activities/lego.jpg',
      id: 3147,
      isRead: 1,
      receiverId: "",
      resourceId: "",
      senderId: "",
      teacherName: "监测管理",
    },
    {
      content1: "学生甲在探秘寻宝第二阶段获得第二名，接下来还有很多关卡，希望好好完成",
      content2: "学生甲需要再接再厉，希望通过这里的一系列课程可以充实自己，找到自己热爱的东西",
      courseName: "探秘寻宝",
      image: 'http://zhsj.bnuz.edu.cn/xcx_img/activities/lego.jpg',
      createTime: "2019-04-24 11:35:30",
      id: 3146,
      isRead: 1,
      receiverId: "",
      resourceId: "",
      senderId: "",
      teacherName: "监测管理",
      type: 4
    },
    {
      content1: "学生甲在探秘寻宝第二阶段获得第二名，接下来还有很多关卡，希望好好完成",
      content2: "学生甲需要再接再厉，希望通过这里的一系列课程可以充实自己，找到自己热爱的东西",
      courseName: "null",
      image: 'http://zhsj.bnuz.edu.cn/xcx_img/activities/robert02.jpg',
      createTime: "2019-04-24 11:35:30",
      id: 737,
      isRead: 1,
      receiverId: "",
      resourceId: "",
      senderId: "",
      teacherName: "监测管理",
      type: 4
    },

    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    let id = options.id
    let index = 0
    if (id == 3147) {
      index = 0
    } else if (id == 3146) {
      index = 1
    } else {
      index = 2
    }
    this.setData({
      courseXqIndex: index
    })
  },
  previous() {
    if (this.data.id == 3147) {
      wx.showModal({
        content: '已经到顶啦'
      })
    } else if (this.data.id == 3146) {
      wx.showModal({
        content: '已经到顶啦'
      })
    } else {
      wx.navigateTo({
        url: './kcinfoXq?id=3146',
      })
    }
  },
  next() {
    if (this.data.id == 3147) {
      wx.showModal({
        content: '已经到顶啦'
      })
    } else if (this.data.id == 3146) {
      wx.navigateTo({
        url: './kcinfoXq?id=737',
      })
    } else {
      wx.navigateTo({
        url: './kcinfoXq?id=3147',
      })
    }
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