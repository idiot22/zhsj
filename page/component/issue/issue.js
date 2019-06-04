// pages/issue/issue.js 
Page({
  /**
   * 页面的初始数据
   */
  data: {
    uploadList:[],
    showUpload: true,
    uploadNum:0,
    courseId:'',
    topicId:'',
    type: [{
      id: 1,
      name: '作品',
    }, {
      id: 2,
      name: '应用'
    }],
    uploadType: [{
      id: 1,
      name: '图片',
    }, {
      id: 2,
      name: '视频'
    },
      {
        id: 3,
        name: '音频'
      }],
    current: '应用',
    currentTab: 'tab2',
  },
  handleFruitChange({ detail = {} }) {
    const index = this.data.current.indexOf(detail.value);
    index === -1 ? this.data.current.push(detail.value) : this.data.current.splice(index, 1);
    this.setData({
      current: this.data.current
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let courseId = options.courseId
    let subjectType = options.subjectType
    let topicId
    if (subjectType == 0) {
      topicId = "form_post_yanxue";
    } else if (subjectType == 1) {
      topicId = "form_post_shijian";
    } else {
      topicId = "form_post_xingqu";
    }
    this.setData({
      courseId,
      topicId
    })
  },
  //上传图片
  uploadImg() {
    var that = this;
    wx.chooseImage({
      count: 9 - that.data.uploadNum, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let tempFilePaths = res.tempFilePaths;
        let uploadList = that.data.uploadList.concat(tempFilePaths);
        if (uploadList.length == 9) {
          that.setData({
            showUpload: false
          })
        }
        that.setData({
          uploadList: uploadList,
          uploadNum: uploadList.length,
        })
      }
    })
  },
  //展示图片
  showImg: function (e) {
    var that = this;
    wx.previewImage({
      urls: that.data.uploadList,
      current: that.data.uploadList[e.currentTarget.dataset.index]
    })
  },
  //删除图片
  clearImg(e) {
    var nowList = [];//新数据
    var uploadList = this.data.uploadList;//原数据
    for (let i in uploadList) {
      if (i == e.currentTarget.dataset.index) {
        continue;
      } else {
        nowList.push(uploadList[i])
      }
    }
    this.setData({
      uploadList: nowList,
      uploadNum: this.data.uploadNum - 1,
      showUpload: true
    })
  },
  submit(){
wx.switchTab({
  url: '../myCoursetijiao/myCoursetijiao',
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