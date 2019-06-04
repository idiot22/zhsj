const app = getApp();
const rootPath = app.globalData.rootPath
const header = app.globalData.header
const studentId = app.globalData.studentId
const schoolId = app.globalData.schoolId
Page({
  /**
   * 页面的初始数据
   */
  data: {
    iszan2:0,
    iszan3:0,
    iszan4: 0,
    zuoping:0,
    yingyong1:0,
    poster: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000',
    name: '此时此刻',
    author: '许巍',
    src: 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46',
    rootPath: rootPath,
    works:[],
    mycourseXQ:{},
    toutu: '/image/toutu.jpg',
    workstype:[],
    applicationtype: [],
    my:[{
          explain:'历经自主探索和实践交流，从中体验和领悟解决问题的要领和方法，培养运营系统的思想分析和解决问题的思维方式和能力',          work_img:"http://img.zcool.cn/community/01aa445afadc3ea801207ab4eb90cc.jpg@1280w_1l_2o_100sh.jpg",
          work_title: '自己设计的书',
          comments: '该学生的作品极富创意性',
          self_coments: '在实践的过程中收获了很多在实践的过程中收获了很多在实践的过程中收获了很多',
          someone: '学生甲',
          zan: 10,
          comments_num: 20,
          date: "2019年5月3日",
          iszan1:0,
          iszan2: 0,
        },{
            work_img:"http://img.zcool.cn/community/016ffc5afcd662a801218cf47f1d73.jpg@800w_1l_2o_100sh.jpg",
            work_title: '插画设计',
            comments: '该学生的作品极富创意性',
            self_coments: '在实践的过程中收获了很多在实践的过程中收获了很多在实践的过程中收获了很多',
            someone: '学生甲',
            zan: 10,
            iszan1: 0,
            iszan2: 0,
            comments_num: 20,
            date: "2018年12月3日",
        }
      ],
    target:'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1.学生能够以小组合作的方式，破解谜题，寻找线索，找到宝藏埋藏地点。\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.通过寻宝闯关和寻宝活动，学生知道团队合作，互相帮助的重要性，懂得耐心，细心和恒心在日常生活和学习中的重要作用。\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3.历经自主探索和实践交流，从中体验和领悟解决问题的要领和方法，培养运营系统的思想分析和解决问题的思维方式和能力。',
    prepare:'谜题，ppt,地图',
    course_tab: ['课程详情', '作品', '作品应用'],
    TabCur: 0,
    scrollLeft: 0
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
    let courseId = options.courseId
    let that = this
    //请求提交的数据
    wx.request({
      url: `${rootPath}/api/product/getMyProduct`,
      method:'get',
      header:{
        Cookie: header.Cookie
      },
      data:{
        courseId,
        studentId
      },
      success:function(res){
        let works = res.data.data
        let workstype=[], applicationtype=[]
        for(let i in works){
          if (works[i].postType == 'form_post_application'){
            applicationtype.push(works[i])
          }else{
            workstype.push(works[i])
          }
        }
        that.setData({
          workstype,
          applicationtype,
        })
      }
    })
    //请求课程的详细信息
    wx.request({
      url: `${rootPath}/api/course/getCourseByCourseId`,
      method: 'get',
      header: {
        Cookie: header.Cookie
      },
      data: {
        courseId,
        studentId,
        schoolId
      },
      success: function (res) {
        res.data.result.data[0].courseImgUrl = rootPath+res.data.result.data[0].courseImgUrl
        that.setData({
          mycourseXQ: res.data.result.data[0]
        })
      }
    })
  },
  //预览
  previewImage: function (e) {
    var current = e.currentTarget.dataset.src;
    var urls = []
    urls[0] = current
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls:urls
    })
  },
  //预览
  previewImage1: function (e) {
    var current = e.currentTarget.dataset.src;
    var urls = ['http://img.zcool.cn/community/0142885afa4dd4a801216045a2977b.jpg@1280w_1l_2o_100sh.jpg',
    'http://img.zcool.cn/community/016ffc5afcd662a801218cf47f1d73.jpg@800w_1l_2o_100sh.jpg',
    'http://img.zcool.cn/community/01aa445afadc3ea801207ab4eb90cc.jpg@1280w_1l_2o_100sh.jpg'
    ]
    urls[0] = current
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: urls
    })
  },
  dianzan1(e){
    let index = e.currentTarget.dataset.index
    let my = this.data.my
    my[index].iszan1 = 1
    my[index].zan+=1
    this.setData({
      my:my
    })
    console.log(my)
  },
  dianzan2() {
  let workstype = this.data.workstype
    workstype[0].thumbUpNumbers+=1
   this.setData({
     iszan2:1,
     workstype
   })
  },
  dianzan3() {
    let applicationtype = this.data.applicationtype
    applicationtype[0].thumbUpNumbers += 1
    this.setData({
      iszan3: 1,
      applicationtype
    })
  },
  //点赞
  dianzan(e){
  },
  //删除
  delwork(){
    wx.showModal({
      title: '提示',
      content: '现在作品不能删除哦',
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
