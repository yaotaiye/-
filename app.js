//app.js

import Config from 'etc/config';
import Fetch from 'assets/js/fetch';
import Tools from 'assets/js/Tools';

App({
  onLaunch: function () {
    //文字适配

  },
  getUserInfo:function(cb){
    var that = this
  
  },
  globalData:{
    userInfo:null
  },
  Tools: new Tools, 
  Config: Config,
  Fetch: Fetch
})