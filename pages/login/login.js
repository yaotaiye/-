var app = getApp()
Page({
  data: {
    Password:'',
    UserName:'',
    agreen:true
  },
  Login() {
    var that=this;

    // wx.navigateTo({
    //   url: '/pages/index/index'
    // })

      app.Fetch(`/data.ashx`, { p:'9070', a:'JsonReqUserLogin', UserName: that.data.UserName, Password: that.data.Password }).then(res => {
        if (res.data.error){
          //失败
          wx.showToast({
            title: res.data.error,
            duration: 1000
          })

        }else{
          wx.showToast({
            title: "登录成功",
            icon: 'success',
            duration: 1000,
            success: function () { }
          });
         //缓存个人信息
         //var da=JSON.stringify()
          wx.setStorageSync('userInfo', 
                {
                  UserName: that.data.UserName,
                  Password: that.data.Password,
                  SrvType: res.data.SrvType,
                  UserID: res.data.m_sUser.UserID,
                  SystemName: res.data.m_sUser.SystemName,
                  SessionID: res.data.m_sUser.SessionID
                }
            );
         //跳转
          // setTimeout(function () {
          //   wx.redirectTo({
          //     url: '../index/index'
          //   })
          // }, 1000)


        }

    })

  } ,
  getPwd(e){
    this.setData({
      Password: e.detail.value
    })
  },
  getUserName(e){
    this.setData({
      UserName: e.detail.value
    })
    //console.log(e.detail.value)

  }


})