/*
 登录过后将返回true
*/
class Login{
  constructor(url){
     this.url=url;
     //this.checkLogin();
  }
  check(){
   var user=null;
   var that=this;
   user= wx.getStorageSync( 'userInfo' );
   if (!user) {
     wx.redirectTo({
       url: that.url
     })
   }
  
  }
 
}
export default Login