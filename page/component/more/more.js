const API = require('../../API/api.js')
const app = getApp()
let first = true
Page({
  data: {
   isSearch:0,
    kcbaoming: [
    ],
      items: [{
          type: 'radio',
          label: '综合排序',
          value: 'updated',
          groups: ['001'],
        },
        {
          type: 'text',
          label: '销量优先',
          value: 'forks',
          groups: ['002'],
        },
        {
          type: 'sort',
          label: '价格',
          value: 'stars',
          groups: ['003'],
        },
        {
          type: 'filter',
          label: '筛选',
          value: 'filter',
          children: [{
            type: 'radio',
            label: '年级',
            value: '年级',
            children: [{
              label: '一年级',
              value: '1',
            },
            {
              label: '二年级',
              value: '2',
            },
            {
              label: '三年级',
              value: '3',
            },
            {
              label: '四年级',
              value: '4',
            },
            {
              label: '五年级',
              value: '5',
            },
            {
              label: '六年级',
              value: '6',
            },
          ],
        },
        {
          type: 'radio',
          label: '类型',
          value: '类型',
          children: [
            {
              label: '研学',
              value: '0',
            },
            {
              label: '实践',
              value: '1',
            },
            {
              label: '兴趣',
              value: '2',
            },

          ],
        },
        {
          type: 'radio',
          label: '星期',
          value: '星期',
          children: [{
            label: '星期一',
            value: '星期一',
          },
          {
            label: '星期二',
            value: '星期二',
          },
          {
            label: '星期三',
            value: '星期三',
          },
          {
            label: '星期四',
            value: '星期四',
          },
          {
            label: '星期五',
            value: '星期五',
          },
          {
            label: '星期六',
            value: '星期六',
          },
          {
            label: '星期日',
            value: '星期日',
          },

          ],
        },

        {
          type: 'radio',
          label: '时间',
          value: '时间',
          children: [{
            label: '08:30-10:00',
            value: '08:30-10:00',
          },
          {
            label: '10:20-11:50',
            value: '10:20-11:50',
          },
          {
            label: '14:30-16:00',
            value: '14:30-16:00',
          },
          {
            label: '16:20-17:50',
            value: '16:20-17:50',
          },
          {
            label: '18:15-19:45',
            value: '18:15-19:45',
          }

          ],
        },
        ],
      },

    ],
  },
  onLoad(option) {
    this.setData({
      isSearch : option.isSearch
    })
    if(this.data.isSearch == 1){
      return
    }
    this.getRepos()
    this.setData({
      kcbaoming: wx.getStorageSync('kcbaoming')
    })
  },
  onChange(e) {
    const { checkedItems, items } = e.detail
    const params = {}
    checkedItems.forEach((n) => {
      if (n.checked) {
        if (n.value === 'updated') {
          const selected = n.children.filter((n) => n.checked).map((n) => n.value).join(' ')
          params.sort = n.value
          params.order = selected
        } else if (n.value === 'stars') {
          params.sort = n.value
          params.order = n.sort === 1 ? 'asc' : 'desc'
        } else if (n.value === 'forks') {
          params.sort = n.value
        } else if (n.value === 'filter') {
          n.children.filter((n) => n.selected).forEach((n) => {
            if (n.value === 'language') {
              const selected = n.children.filter((n) => n.checked).map((n) => n.value).join(' ')
              params.language = selected
            } else if (n.value === 'query') {
              const selected = n.children.filter((n) => n.checked).map((n) => n.value).join(' ')
              params.query = selected
            }
          })
        }
      }
    })

    this.getRepos(params)
  },
  getRepos(params = {}) {
    const language = params.language || 'javascript'
    const query = params.query || 'react'
    const q = `${query}+language:${language}`
    const data = Object.assign({
      q,
    }, params)
  },
  onClose(e) {
    this.setData({
      pageStyle: '',
    })
  },
  //筛选课程
  filterCourse(option, flag, first) {
    this.setData({
      first: first
    })
    if (flag == 'choose') {
      console.log("筛选课程中")
      let that = this
      let gradeId, subjectId, interestType, week, courseStartTime, courseEndTime
      //取得选中的值
      if (this.data.first == true) {
        gradeId = (option[0].hasOwnProperty('selectValue')) ? option[0].selectValue : -1
        subjectId = (option[1].hasOwnProperty('selectValue')) ? option[1].selectValue : -1
        interestType = 2
        week = (option[2].hasOwnProperty('selectValue')) ? option[2].selectValue : ""
        courseStartTime = (option[3].hasOwnProperty('selectValue')) ? option[3].selectValue.substr(0, 5) : "08:30"
        courseEndTime = (option[3].hasOwnProperty('selectValue')) ? option[3].selectValue.substr(6, 5) : "19:45"
      }
      else {
        gradeId = (option[0].selectValue != "") ? option[0].selectValue : -1
        subjectId = (option[1].selectValue != '') ? option[1].selectValue : -1
        interestType = 2
        week = (option[2].selectValue != '') ? option[2].selectValue : ""
        courseStartTime = (option[3].selectValue != '') ? option[3].selectValue.substr(0, 5) : "08:30"
        courseEndTime = (option[3].selectValue != '') ? option[3].selectValue.substr(6, 5) : "19:45"
      }
      //通过选中的调用api进行筛选
      API.queryCourse(gradeId, week, subjectId, interestType, courseStartTime, courseEndTime).then(res => {
        let chooseCourseData =this.chooseCourseData(res)
        that.setData({
          kcbaoming: chooseCourseData
        })
      })
    }
    if (flag == 'reset') {
      this.resetCourse()
    }
    console.log("回到筛选")
  },
  //重置课程
  resetCourse: function () {
    this.setData({
      kcbaoming: wx.getStorageSync('kcbaoming'),
      first: true
    })
  },
  //课程报名数据转换
  chooseCourseData(datas) {
    let chooseCourse = []
    for (let i = 0; i < datas.length; i++) {
      let data = {}
      data.courseImg = `http://zhsj.bnuz.edu.cn/${datas[i].courseImgUrl}`
      data.course = datas[i].courseName
      data.flag = "进行中"
      data.courseId = datas[i].courseId
      data.day = datas[i].startDate
      data.time = datas[i].courseStartTime
      data.price = datas[i].money
      chooseCourse.push(data)
    }
    return chooseCourse
  },
  //跳转到课程详情
  toCourseXQ(e) {
    let courseId = e.currentTarget.dataset.courseid
    let mycourse = e.currentTarget.dataset.mycourse
    wx.navigateTo({
      url: `../c-details/c-details?courseId=${courseId}&mycourse=${mycourse}`
    })
  },
  onChange(e) {
    this.setData({
      value: e.detail
    })
  },
  onSearch(){
    let keyword = this.data.value
    let that = this
    wx.request({
      url: `${app.globalData.rootPath}/api/course/chooseCourse/init`,
      method:'get',
      data:{
        studentId: app.globalData.studentId,
        schoolId: app.globalData.schoolId,
        keyword: keyword
      },
      success:function(res){
        let data = that.chooseCourseData(res.data.result.data)
        console.log(data)
        that.setData({
          kcbaoming: data,
        })
      }
    })
  }
})