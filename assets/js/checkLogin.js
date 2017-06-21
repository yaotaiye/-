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
   user= wx.getStorageSync( 'userInfo' );
   if (user) {
     wx.redirectTo({
       url: 'pages/index/index'
     })
     //  return true;
   }
   else {
     wx.redirectTo({
       url: that.url
     })
   }
  
  }
 
}
export default Login