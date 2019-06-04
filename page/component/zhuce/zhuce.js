import { getPlaceData } from '../../../util/api.js'
var md = require('../../../util/md5.js')
var sha = require('../../../util/sha1.js')
var header = getApp().globalData.header; //获取app.js中的请求头
Page({
  /** 
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userInfo: {},
    multiArray: [],
    multiIndex: [0,0, 0],
    proId: '',
    schoolId: -1
  },
  //事件响应传参
  bindMultiPickerChange: function (e) {
    console.log("取消")
    this.setData({
      multiIndex: e.detail.value
    })
  },
  //当选择发生改变时的触发事件
  bindMultiPickerColumnChange: function (e) {
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex,
      proId: this.data.proId
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      // 变量为第一层
      case 0:
        let proId = data.multiArray[0][e.detail.value].id
        data.proId = proId
        if (e.detail.value == 0) {
          data.multiArray[1] = [{ id: -1, name: '选择城市' }]
          data.multiIndex[1] = 0;
          this.setData(data);
          break
        }
        getPlaceData({ condition: 2, keyPro: proId }).then((res) => {
          data.multiArray[1] = [{ id: -1, name: '选择城市' }].concat(res.data.result.data)
          this.setData(data);
        })
        data.multiIndex[1] = 1;
        data.multiIndex[2] = 0;
        break;
      //变量为第二层
      case 1:
        let cityId = data.multiArray[1][e.detail.value].id
        if (e.detail.value == 0) {
          data.multiArray[2] = [{ id: -1, name: '选择学校' }]
          data.multiIndex[2] = 0;
          this.setData(data);
          break
        }
        getPlaceData({ condition: 3, keyPro: this.data.proId, keyCity: cityId }).then((res) => {
          data.multiArray[2] = [{ id: -1, name: '选择学校' }].concat(res.data.result.data)
          data.multiIndex[2] = 1;
          this.setData(data);
          if (res.data.result.data.length != 0) {
            this.setData({
              schoolId: data.multiArray[2][1].id
            })
          }
        })
        break;
      case 2:
        this.setData({
          schoolId: data.multiArray[2][e.detail.value].id
        })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //页面加载时初始化数据
    this.initPlaceData()
    // 查看是否授权
    var that = this
    wx.getSetting({

      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success(res) {
              that.setData({
                //  nickName: '',
                userInfo: res.userInfo
              })
            },
          })

        }
      }
    })

  },
  //初始化省份数据
  initPlaceData: function () {
    getPlaceData({ condition: 1 }).then((res) => {
      let place = []
      place[0] = [{ id: -1, name: '选择省份' }].concat(res.data.result.data)
      place[1] = [{ id: -1, name: '选择城市' }]
      place[2] = [{ id: -1, name: '选择学校' }]
      this.setData({
        multiArray: place
      })
    })
  },
  //登录,注意form表单的形式
  formSubmit: function (e) {
    let rootPath = 'http://zhsj.bnuz.edu.cn'
    //通过form表单来直接获取输入的信息
    let userName = e.detail.value.userName
    let userPwd = e.detail.value.userPwd
    let grade = e.detail.value.grade
    let sex = e.detail.value.sex
    let that = this;
    if (that.data.schoolId == -1) {
      wx.showModal({
        title: '提示',
        content: ' 请先选择学校',
        confirmColor: '#118EDE',
        showCancel: false,
      });
    }
    else if (sex != '女' && sex != '男') {
      wx.showModal({
        title: '提示',
        content: '性别女或男'
      })
    }
 else if (userName === "" || userName === null || userPwd === "" || userPwd === null) {
      wx.showModal({
        title: '提示',
        content: '帐号密码不能为空',
        confirmColor: '#118EDE',
        showCancel: false,
      });
      return false;
    } 
    else if (sex === "" || sex === null || grade === "" || grade === null) {
      wx.showModal({
        title: '提示',
        content: '年级或性别不能为空',
        confirmColor: '#118EDE',
        showCancel: false,
      });
      return false;
    } else {
      let multiIndex = that.data.multiIndex
      let schoolId = that.data.multiArray[2][1].id
      wx.request({
        method: 'POST',
        url: `${rootPath}/api/student/register`,
        header: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'X-Requested-With': 'XMLHttpRequest',
          Cookie: 'hasState=true; autoLogin=true;'
        },
        dataType: "json",
        data: {
          school: schoolId,
          name: userName,
          idcard: userPwd,
          sex,
          grade
        },
        success(res) {
          if (res.data.code == 202) {
            wx.showModal({
              title: '提示',
              content: '用户名或密码错误',
            })
            console.log("登录中" + res.data.detail)
          } else if (res.data.code == 200) {
            wx.showModal({
              title: '提示',
              content: '注册成功，即将跳转',
              success:function(){
                wx.navigateTo({
                  url: '../login/login',
                })
              }
            })
            console.log(res)
          } else if (res.data.code == 500) {
            wx.showModal({
              title: '提示',
              content: '服务器出错',
            })
            console.log("登录中" + res.data.msg)
          } else if (res.data.code == 404) {
            wx.showModal({
              title: '提示',
              content: '出错啦',
            })
            console.log("登录中" + res.data.msg)
          }
        }
      })
    }
  },
  PickerChange(e) {
    console.log(e);
    this.setData({
      index: e.detail.value
    })
  },
  // onOpen1() {
  //   this.setData({ visible1: true })
  // },
  // onClose1() {
  //   this.setData({ visible1: false })
  // },
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