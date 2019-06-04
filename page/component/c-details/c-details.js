const app = getApp();
const rootPath = app.globalData.rootPath
const schoolId = app.globalData.schoolId
const studentId = app.globalData.studentId
const imgPath = app.globalData.imgPath
const header = app.globalData.header
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mycourseShow:'false',
    courseName:"",
    classId:'',
    gradeId:4,
    address: '',
    money:100,
    scrollTop: 0,
    manager: "",
    course_tab: ['课程简介', '时间', '评价'],
   subjectMission: "",
    subjectTarget: "",
    week:'星期三',
    courseStartTime: "",
    courseEndTime: "",
    startDate: "",
    endDate: "",
    number: 100,
    avatar: '/image/courses/farm.png',
    courseImgUrl: app.globalData.courseImgUrl,
    avatar: app.globalData.avatar,
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
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
    let that = this
    let courseId = options.courseId
    let mycourse =options.mycourse
    that.setData({
      'mycourseShow': mycourse
    })
    wx.request({
      url: `${rootPath}/api/course/chooseCourse/initCourseByCourseId`,
      data:{
        studentId:studentId,
        schoolId:schoolId,
        courseId: courseId,
        Cookie: header.Cookie,
      },
      success:function(res){
        let data = res.data.result.data[0]
        that.setData({
          address: data.address,
          classId: data.classId,
          classNumber: data.classNumber,
          courseEndTime: data.courseEndTime,
          courseId: data.courseId,
          courseImgUrl: imgPath+data.courseImgUrl,
          courseName: data.courseName,
          courseStartTime: data.courseStartTime,
          endDate: data.endDate,
          gradeId: data.gradeId,
          interestType: data.interestType,
          manager: data.manager,
          money: data.money,
          number: data.number,
          startDate: data.startDate,
          subjectMission: data.subjectMission,
          subjectPrepare: data.subjectPrepare,
          subjectTarget: data.subjectTarget,
          subjectType: data.subjectType,
          teacherId: data.teacherId,
          week: data.week
        })
      }
    })
  },
  chooseCourse(){
    /*获取学生年级，判断学生是否符合课程的要求*/
    var reg = RegExp(0);
    var flag = reg.test(this.data.gradeId)
    if (flag == false) {
      wx.showModal({
        title: '提醒',
        content: '这是' + this.data.gradeId + '年级的课，你不能选择',
      })
      return;
    }
        /*如果学生条件符合，开始选这门课的时间*/
        var courseStartTime = this.getNowTime();
        let teacherId = this.data.teacherId
        let courseId = this.data.courseId
        let courseName = this.data.courseName
        wx.request({
          url:  `${rootPath}/api/course/chooseCourse`,
          data:{
            studentId,
            schoolId,
            teacherId,
            courseId,
            courseName,
            courseStartTime
          },
          success:function(res){
            if (res.data.code == 200) {
              wx.showModal({
                title: '提示',
                content: '选择课程成功！请到我的课程页面查看',
              })
              return
            } else if (res.data.code == 202) {
              wx.showModal({
                title: '提示',
                content: '你已经选了这么这课了，不需要再次选择',
              })
              return
            } else if (res.data.code == 10006) {
              wx.showModal({
                title: '提示',
                content: '上课时间冲突了！请选择另外的课程吧！',
              })
              return;
            } else {
              alert("选择课程失败");
              return
            }
          }
        })
    
  },
  //退选课程
  exitCourse(){
    let that = this
    wx.showModal({
      title: '提醒',
      content: '确定要退选这门课吗？',
      success(res) {
        if (res.confirm) {
          //退选课程
          /*如果学生条件符合，开始选这门课的时间*/
          var classId = that.data.classId;
          let teacherId = that.data.teacherId
          let courseId = that.data.courseId
          let courseName = that.data.courseName
          wx.request({
            url: `${rootPath}/api/course/exitCourse`,
            data: {
              studentId,
              schoolId,
              teacherId,
              courseId,
              courseName,
              classId
            },
            success: function (res) {
              console.log(res)
              if (res.data.code == 200) {
                wx.showModal({
                  title: '提示',
                  content: '退选成功',
                })
                return
              }  else {
                wx.showModal({
                  title: '提示',
                  content: '退选失败',
                })
                
                return
              }
            }
          })
        } else if (res.cancel) {
          return
        }
      }
    })

  },
  //获取当前时间方法
   getNowTime() {
    function getNow(s) {
    return s < 10 ? '0' + s : s;
    }
      
    var myDate = new Date();
    var year = myDate.getFullYear(); //获取当前年
    var month = myDate.getMonth() + 1; //获取当前月
    var date = myDate.getDate();     //获取当前日

    var h = myDate.getHours();       //获取当前小时数(0-23)
    var m = myDate.getMinutes();     //获取当前分钟数(0-59)
    var s = myDate.getSeconds();

    return year + '-' + getNow(month) + "-" + getNow(date) + " " + getNow(h) + ':' + getNow(m) + ":" + getNow(s);
},
  dianhua(){
    wx.makePhoneCall({
      phoneNumber: '13631285434',
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
