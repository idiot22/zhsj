// page/component/details/details.js

Page({
  data: {
    
    num: 1,
    totalNum: 0,
    hasCarts: false,
    curIndex: 0,
    show: false,
    scaleCart: false,
    g_id:""


  },
  
  onLoad: function (options) {
    var idd = options
    console.log(idd['id'])
    var that = this

    that.setData({
      g_id: options
    })
    wx.request({
      url: 'http://itcmsg.bnuz.edu.cn:8090/test/XCXSP_info',
      data: {},
      msethod: 'GET',
      header:
        {
          'content-type': 'application/json'
        },
    
      success: function (res) {
        that.setData({
          SPID:res.data.SPID,
          SPJG: res.data.SPJG,
          SPMC: res.data.SPMC,
          SPPIC: "http://itcmsg.bnuz.edu.cn:8090/test/pic/"+res.data.SPPIC,
          SPXQ: res.data.SPXQ,
          curIndex: 0
        });

        console.log(res.data);

      },
      fail: function (res) {
        console.log('fail')
      }
    })
  },
 
  addCount() {
    let num = this.data.num;
    num++;
    this.setData({
      num: num
    })
    console.log(this.data.num)
  },

  addToCart() {
    const self = this;
    const num = this.data.num;
    let total = this.data.totalNum;

    self.setData({
      show: true
    })
    setTimeout(function () {
      self.setData({
        show: false,
        scaleCart: true
      })
      setTimeout(function () {
        self.setData({
          scaleCart: false,
          hasCarts: true,
          totalNum: num 
        })
      }, 200)
    }, 300)
    console.log(self.data.totalNum)

    //获取缓存中的已添加购物车信息
    var cartItems = wx.getStorageSync('cartItems')
    console.log(cartItems)
    var index = self.data.g_id['id']
    console.log(index)
    // if (cartItems) {
    //   // var exist = cartItems.find(function (ele) {
    //   //   return ele.id === that.data.goodsInfoId
    //   // })
    //   // console.log(exist)
     
    //   console.log('goods'+index)
    //   var exist_num = cartItems[index]
    //   exist_num = parseInt(exist_num) + self.data.totalNum
      
    //   // this.setData
    //   //   ({
    //   //     collected: existCollected
    //   //   })
    // }
    // else {
      //如果不存在，传入该货品信息
      //加入购物车数据，存入缓存
      // ' + cartItems.length + '
      var cartItems={}
      // var idd = 'cartItems[0].g_id'
      // var numm = 'cartItems[0].num'
     
      // self.setData({
      //   [idd]: self.data.g_id['id'],
      //   [numm]: self.data.totalNum

      // })
      // console.log([idd])
      // console.log(cartItems)
      
      
       cartItems[index] = {
        "index": self.data.g_id['id'],
       
        "num": self.data.totalNum};

      console.log(cartItems)
      //当前文章状态为false
      // cartItems[self.data.g_id] = self.data.totalNum;
      // wx.setStorageSync(
      //   'post_collected',
      //   postsCollected);

      
      wx.setStorage({
        key: 'jjj',
        data: cartItems,
        success: function (res) {
          //添加购物车的消息提示框
          wx.showToast({
            title: "添加成功",
            icon: "success",
            durantion: 2000
          })
        }
      })

     
    // }


   
    
   
   
  },

  bindTap(e) {
    const index = parseInt(e.currentTarget.dataset.index);
    this.setData({
      curIndex: index
    })
  }

})