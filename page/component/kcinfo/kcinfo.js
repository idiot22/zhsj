// pages/kcinfo/kcinfo.js
// const POST = require('../../API/post.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    message: [[], [], [], []],
    infoList1: [
    ],
    infoList2: [
    ],
    infoList3: [
    ],
    infoList4: [
    ]
  },
  getMessage() {
    let sum = wx.getStorageSync('message')
    let infoList1 = [], infoList2 = [], infoList3 = [], infoList4 = []
    let message = []
    for (let i = 0; i < sum.length; i++) {
      switch (sum[i].type) {
        case 1:
          infoList1.unshift(sum[i])
          break;
        case 2:
          let arr = sum[i]
          arr.content = arr.content.replace('<br/>', ' ')
          infoList2.unshift(arr)
          break;
        case 3:
          infoList3.unshift(sum[i])
          break;
        case 4:
          infoList4.unshift(sum[i])
      }
    }
    message[0] = infoList1
    message[1] = infoList2
    message[2] = infoList3
    message[3] = infoList4
    this.setData({
      message: message
    })
  },
  //已读功能
  hasRead(e) {
    let index = e.currentTarget.dataset.messageindex
    let tab = e.currentTarget.dataset.tab
    let message
    message = this.data.message
    message[tab][index].isRead = 1
    this.setData({
      message: message
    })
    //POST.isRead(e.currentTarget.dataset.messageid)
  },
  toMessageXq(e) {
    let index = e.currentTarget.dataset.messageindex
    let tab = e.currentTarget.dataset.tab
    let id = this.data.message[tab][index].id
    wx.navigateTo({
      url: '../kcinfoXq/kcinfoXq?id=' + id,
    })
  },
  onChange(event) {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMessage()
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