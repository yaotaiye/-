var app = getApp()
Page({
  data: {
    Password:'',
    UserName:''
  },
  Login() {
    var that=this;
    app.Fetch(`/Trading_system2/JsonReqUserLogin.ashx`, { UserName: that.data.UserName, Password: that.data.Password },'POST').then(res => {
       console.log(res)

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