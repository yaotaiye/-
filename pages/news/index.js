Page({

  data: {
    news:[
      { img:'#',title:'asasfahsf',url:'../detail/index?title'},
      { img: '#',title: 'asasfahsf', url: '../detail/index?title' },
      { img: '#',title: '啊啥时放假咯是否', url: '../detail/index?title' },
      { img: '#',title: '啊啥好时间发货', url: '../detail/index?title' },
      { img: '#',title: 'asasfahsf', url: '../detail/index?title' },
      { img: '#',title: '啊说反说法康师傅', url: '../detail/index?title' },
      ]
  },
   onLoad: function (options) {
      var that = this;
      that.setData({
        mername: options.mername//options为页面路由过程中传递的参数
      })
      wx.setNavigationBarTitle({
        title: that.data.mername//页面标题为路由参数
      })
  },


})