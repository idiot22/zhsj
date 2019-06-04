import { getParentOrKidCommend } from '../../../util/api.js'
import Toast from '../dist/toast/toast';
const app = getApp()
const header = app.globalData.header
const rootPath = app.globalData.rootPath
Page({
  /** 
   * 页面的初始数据
   */
  data: {
    firstload:true,
    zerenlist:[['没有学校评价'],["没有家庭评价"],['没有自我评价']],
    lifelist: [['没有学校评价'], ["没有家庭评价"], ['没有自我评价']],
    learnlist: [['没有学校评价'], ["没有家庭评价"], ['没有自我评价']],
    sciencelist: [['没有学校评价'], ["没有家庭评价"], ['没有自我评价']],
    humanlist: [['没有学校评价'], ["没有家庭评价"], ['没有自我评价']],
    array: [
      {id: 1 ,name : '第1周'},
      { id: 2, name: '第2周'},
      { id: 3, name: '第3周'},
      { id: 4, name: '第4周'},
      { id: 5, name: '第5周' },
      { id: 6, name: '第6周' },
      { id: 7, name: '第7周' },
      { id: 8, name: '第8周' },
      { id: 9, name: '第9周' },
      { id: 10, name: '第10周' },
      { id: 11, name: '第11周' },
      { id: 12, name: '第12周' },
      { id: 13, name: '第13周' },
      { id: 14, name: '第14周' },
      { id: 15, name: '第15周' },
      { id: 16, name: '第16周' },
      ],
    index: 0,
    tabIndex: 1,
    kidlist: [],
    uploadList:[],
    uploadNum:0,
    showUpload:true,
    parentlist: [],
    parentnochange:[],
    currentKid: [],
    current1:[],
    current2:[],
    current3:[],
    current4:[],
    current5:[]
  },
  showPicker(){
    this.setData({
      showPicker:1
    })
  },
//切换tab时数据的变化
  onTab(e) {
    let index = e.currentTarget.dataset.num
    let that = this
    this.setData({
      tabIndex: index
    })
    if (index == 3) {
      getParentOrKidCommend({ key: 3 }).then((res) => {
        //对请求的孩子自评数据进行格式化
        let kidlist = this.res2kidlist(res.data.result.data[0].templateList)
        setTimeout(function(){
          that.setData({
            kidlist: kidlist
          })
        },200)
      })
    } else if (index == 2) {
      getParentOrKidCommend({ key: 2 }).then((res) => {
        //对请求的孩子自评数据进行格式化
        let parentlist = this.res2parentlist(res.data.result.data[0].templateList)
        this.setData({
          parentlist:parentlist,
          parentnochange: res.data.result.data[0].templateList
        })
      })
    }
  },
  //多选
  handleKidChange({ detail = {} }) {
    const index = this.data.currentKid.indexOf(detail.value);
    index === -1 ? this.data.currentKid.push(detail.value) : this.data.currentKid.splice(index, 1);
    this.setData({
      currentKid: this.data.currentKid
    });
  },
  handleChange1({ detail = {} }) {
    const index = this.data.current1.indexOf(detail.value);
    index === -1 ? this.data.current1.push(detail.value) : this.data.current1.splice(index, 1);
    this.setData({
      current1: this.data.current1
    });
  },
  handleChange2({ detail = {} }) {
    const index = this.data.current2.indexOf(detail.value);
    index === -1 ? this.data.current2.push(detail.value) : this.data.current2.splice(index, 1);
    this.setData({
      current2: this.data.current2
    });
  },
  handleChange3({ detail = {} }) {
    const index = this.data.current3.indexOf(detail.value);
    index === -1 ? this.data.current3.push(detail.value) : this.data.current3.splice(index, 1);
    this.setData({
      current3: this.data.current3
    });
  },
  handleChange4({ detail = {} }) {
    const index = this.data.current4.indexOf(detail.value);
    index === -1 ? this.data.current4.push(detail.value) : this.data.current4.splice(index, 1);
    this.setData({
      current4: this.data.current4
    });
  },
  handleChange5({ detail = {} }) {
    const index = this.data.current5.indexOf(detail.value);
    index === -1 ? this.data.current5.push(detail.value) : this.data.current5.splice(index, 1);
    this.setData({
      current5: this.data.current5
    });
  },

  res2kidlist(data){
    let kidlist = []
    for(let i in data){
      let item = {};
      item.name=data[i].content
      item.id = data[i].templateId
      kidlist.push(item)
    }
    return kidlist
  },
  res2parentlist(data){
    let parentlist = [[],[],[],[],[],[]]
    for(let i in data){
      let item = {}
      item.name = data[i].content
      item.id = data[i].templateId
      parentlist[data[i].type-1].push(item)
    }
    return parentlist
  },
  //上传图片
  uploadImg(){
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
  clearImg(e){
    var nowList = [];//新数据
    var uploadList = this.data.uploadList;//原数据
    for (let i in  uploadList) {
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
  //孩子自评的提交信息
  kidSubmit(){
    let that = this
    let state = []
    let jsonStr = this.currentKid2state()
    if (jsonStr.add.length == 0) {
      wx.showModal({
        title: '提示',
        content: '评价不能为空',
      })
      return
    }
    wx.request({
      url: 'https://zhsj.bnuz.edu.cn/api/evaluation/student/update?skip=0&runSec=0&runMin=0&jump=0&situp=0',
      method:'POST',
      dataType: "json",
      data: jsonStr,
      header: {
        'Content-Type': 'application/json;charset=UTF-8;',
        'Cookie': header.Cookie
      },
      success:function(res){
        wx.showModal({
          title: '提示',
          content: '提交成功',
        })
        that.onLoad()
      },
      fail:function(){
        wx.showModal({
          title: '提示',
          content: '提交失败',
        })
      }
    })
  },
  //将孩子自评数据转换成提交的数据
  currentKid2state(){
    let add = []
    let current = this.data.currentKid
    let kidlist = this.data.kidlist
    let arr = kidlist.concat('')
    let del = []
    //取得选中的数据
    for(let i in current){
      for(let j in kidlist){
        if (current[i] == kidlist[j].name){
          add.push(kidlist[j].id)
          break;
        }
      }
    }
    //取得没选中的数据
    for(let i in add){
      for (let j in arr){
        if(add[i] == arr[j].id){
          arr.splice(j,1)
          break;
        }
      }
    }
    for (let i in arr){
      del.push(arr[i].id)
    }
    return {add,del}
  },
  //家庭评价提交信息
  parentSubmit(){
    let that = this
    let jsonStr=this.parent2state()
    if(jsonStr.add.length == 0){
      wx.showModal({
        title: '提示',
        content: '评价不能为空',
      }) 
      return
    }
    wx.request({
      url: 'https://zhsj.bnuz.edu.cn/api/evaluation/family/update',
      method: 'POST',
      dataType: "json",
      data: jsonStr,
      header: {
        'Content-Type': 'application/json;charset=UTF-8;',
        'Cookie': header.Cookie
      },
      success: function (res) {
        console.log(res)
        wx.showModal({
          title: '提示',
          content: '提交成功',
        })
        that.onLoad()
      },
      fail: function () {
        wx.showModal({
          title: '提示',
          content: '提交失败',
        })
      }
    })
  },
  //家庭评价数据转换
   parent2state(){
     let current = [].concat(this.data.current1, this.data.current2, this.data.current3, this.data.current4, this.data.current5)
     let add = []
     let parentnochange = this.data.parentnochange
     let arr = parentnochange.concat('')
     let del = []
     //取得选中的数据
     for (let i in current) {
       for (let j in parentnochange) {
         if (current[i] == parentnochange[j].content) {
           add.push(parentnochange[j].templateId)
           break;
         }
       }
     }
     //取得没选中的数据
     for (let i in add) {
       for (let j in arr) {
         if (add[i] == arr[j].templateId) {
           arr.splice(j, 1)
           break;
         }
       }
     }
     for (let i in arr) {
       del.push(arr[i].templateId)
     }
     del.pop()
     return { add, del }
   },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    if (this.data.firstload){
      this.setData({
        index:app.globalData.week-1
      })
        that.setData({
          firstload:false
        })
    }
    let week = parseInt(that.data.index)+1
    //获取责任担当数据
    wx.request({
      url: `${rootPath}/api/mybehavior/queryBehavior`,
      method:'get',
      data:{
        typeId: 5,
        week: week,
      },
      header:{
        'Cookie': header.Cookie
      },
      success:function(res){
        let zerenlist = [[],[],[]]
        let schoolShow = res.data.result.data[0].show[0].schoolShow
        let homeShow = res.data.result.data[0].show[0].homeShow
        let studentShow = res.data.result.data[0].show[0].studentShow
        if (homeShow.length == 0) {
          zerenlist[0].push('没有家长评价')
        }
        if (schoolShow.length == 0) {
          zerenlist[1].push('没有学校评价')
        }
        if (studentShow.length == 0) {
          zerenlist[2].push("没有自我评价")
        }
        for (let i in homeShow){
          zerenlist[0].push(homeShow[i].content)
        }

        for (let i in schoolShow) {
          zerenlist[1].push(schoolShow[i].content)
        }
        for (let i in studentShow) {
          zerenlist[2].push(studentShow[i].content)
        }

        that.setData({
          zerenlist
        })
      }
    })
    //获取健康生活数据 
    wx.request({
      url: `${rootPath}/api/mybehavior/queryBehavior`,
      method: 'get',
      data: {
        typeId: 4,
        week: week,
      },
      header: {
        'Cookie': header.Cookie
      },
      success: function (res) {
        let lifelist = [[], [], []]
        let schoolShow = res.data.result.data[0].show[0].schoolShow
        let homeShow = res.data.result.data[0].show[0].homeShow
        let studentShow = res.data.result.data[0].show[0].studentShow
        if (homeShow.length == 0) {
          lifelist[0].push('没有家长评价')
        }
        if (schoolShow.length == 0) {
          lifelist[1].push('没有学校评价')
        }
        if (studentShow.length == 0) {
          lifelist[2].push("没有自我评价")
        }
        for (let i in homeShow) {
          lifelist[0].push(homeShow[i].content)
        }

        for (let i in schoolShow) {
          lifelist[1].push(schoolShow[i].content)
        }
        for (let i in studentShow) {
          lifelist[2].push(studentShow[i].content)
        }

        that.setData({
          lifelist
        })
      }
    })
    //获取学会学习数据
    wx.request({
      url: `${rootPath}/api/mybehavior/queryBehavior`,
      method: 'get',
      data: {
        typeId: 3,
        week: week,
      },
      header: {
        'Cookie': header.Cookie
      },
      success: function (res) {
        let learnlist = [[], [], []]
        let schoolShow = res.data.result.data[0].show[0].schoolShow
        let homeShow = res.data.result.data[0].show[0].homeShow
        let studentShow = res.data.result.data[0].show[0].studentShow
        if (homeShow.length == 0) {
          learnlist[0].push('没有家长评价')
        }
        if (schoolShow.length == 0) {
          learnlist[1].push('没有学校评价')
        }
        if (studentShow.length == 0) {
          learnlist[2].push("没有自我评价")
        }
        for (let i in homeShow) {
          learnlist[0].push(homeShow[i].content)
        }
        for (let i in schoolShow) {
          learnlist[1].push(schoolShow[i].content)
        }
        for (let i in studentShow) {
          learnlist[2].push(studentShow[i].content)
        }
        that.setData({
          learnlist
        })
      }
    })
    //科学精神
    wx.request({
      url: `${rootPath}/api/mybehavior/queryBehavior`,
      method: 'get',
      data: {
        typeId: 2,
        week: week,
      },
      header: {
        'Cookie': header.Cookie
      },
      success: function (res) {
        let sciencelist = [[], [], []]
        let schoolShow = res.data.result.data[0].show[0].schoolShow
        let homeShow = res.data.result.data[0].show[0].homeShow
        let studentShow = res.data.result.data[0].show[0].studentShow
        if (homeShow.length == 0) {
          sciencelist[0].push('没有家长评价')
        }
        if (schoolShow.length == 0) {
          sciencelist[1].push('没有学校评价')
        }
        if (studentShow.length == 0) {
          sciencelist[2].push("没有自我评价")
        }
        for (let i in homeShow) {
          sciencelist[0].push(homeShow[i].content)
        }
        for (let i in schoolShow) {
          sciencelist[1].push(schoolShow[i].content)
        }
        for (let i in studentShow) {
          sciencelist[2].push(studentShow[i].content)
        }
        that.setData({
          sciencelist
        })
      }
    })
    //人文底蕴
    wx.request({
      url: `${rootPath}/api/mybehavior/queryBehavior`,
      method: 'get',
      data: {
        typeId: 1,
        week: week,
      },
      header: {
        'Cookie': header.Cookie
      },
      success: function (res) {
        let humanlist = [[], [], []]
        let schoolShow = res.data.result.data[0].show[0].schoolShow
        let homeShow = res.data.result.data[0].show[0].homeShow
        let studentShow = res.data.result.data[0].show[0].studentShow
        if (homeShow.length == 0) {
          humanlist[0].push('没有家长评价')
        }
        if (schoolShow.length == 0) {
          humanlist[1].push('没有学校评价')
        }

        if (studentShow.length == 0) {
          humanlist[2].push("没有自我评价")
        }
        for (let i in homeShow) {
          humanlist[0].push(homeShow[i].content)
        }
        console.log(res.data.result.data[0].show[0])
        for (let i in schoolShow) {
          humanlist[1].push(schoolShow[i].content)
        }
        for (let i in studentShow) {
          humanlist[2].push(studentShow[i].content)
        }
        that.setData({
          humanlist
        })
      }
    })
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
    console.log(e.detail.value)
    this.onLoad()
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