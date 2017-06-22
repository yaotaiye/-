/*
 登录过后将返回true
*/
class Login{
  constructor(){
  }
  check(url){
  var  user= wx.getStorageSync( 'userInfo' );
   if (!user) {
     wx.redirectTo({
       url: url
     })
   }
  
  }
 
}
export default Login