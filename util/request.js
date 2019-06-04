export function wxrequest({ url, data ,resKey,header}) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      data: data,
      header: header,
      dataType: 'json',
      method: 'GET',
      success: function(res){
        if(resKey == 1){
          resolve(res.data.result)
        }
        else if (resKey== 2){
        resolve(res.data.result.data)}
      else{
        resolve(res)
      }},
      fail: reject
    })
  })
}