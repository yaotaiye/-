/*
 登录过后将返回true
*/
class Login{
  constructor(url){
     this.url=url;
     this.checkLogin();
  }
  checkLogin(){
   var user=null;
   var that=this;
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
       user=res.data
      }
    });
    if(user){return true}
    else{
      wx.redirectTo({
        url: that.url
      })
    }
  }
 
}
export default Login