//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    indicatorDots: true,
      vertical: false,
      autoplay: true,
      interval: 3000,
      duration: 1000,
      imgPath:app.Config.fileBasePath,

      timer1:null,
      text: '风险须知：由于期货行情波动比较大，如果您使用手机操作交易可能会因为本身网络等不确定因素，导致你的交易不能正常工作，所造成的任何损失，全部由使用者承担。',
      marqueePace: 1,//滚动速度
      marqueeDistance: 0,//初始滚动距离
      size: 14,
      orientation: 'left',//滚动方向
      intervalMD: 20 ,// 时间间隔
      
      navList:[
        { url: '../kl/kl', name: '交易', info: '下单交易平台', src: app.Config.fileBasePath +'/images/tb04.png'},
        { url: '../chicang/index',name: '持仓', info: '持仓明细', src: app.Config.fileBasePath +'/images/tb01.png' },
        { url: '../zijin/index',name: '资金', info: '资金状况', src: app.Config.fileBasePath +'/images/tb03.png' }
      ],
      prompt: {
        hidden: true
      }
    
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onShow:function(){
    this.getBanners();
      //跑马灯
   // clearTimeout(this.data.timer1);
    //this.pmdInit();
    this.getList();
  
  },
  getList(){
    var that = this;

    // var data = {
    //   id: 87036728,
    //   begin: 0,
    //   count: 20,
    //   srvtype:""}
    // //调用应用实例的方法获取全局数据
    // app.Fetch("/API/JsonAllReportPush.ashx", data).then(res => {
    //     that.setData({ 
    //         gpList:res.data
    //     })
    // })

    that.setData({
      gpList: [{ "Chg": "1.11%", "InstrumentID": "HSI706", "LastPrice": "25780" }, { "Chg": "1.13%", "InstrumentID": "HSI707", "LastPrice": "25665" }, { "Chg": "", "InstrumentID": "HSI708", "LastPrice": null }, { "Chg": "1.03%", "InstrumentID": "HSI709", "LastPrice": "25533" }, { "Chg": "", "InstrumentID": "HSI710", "LastPrice": null }]
    })
   
  },
   getBanners(){
         var that = this
      //调用应用实例的方法获取全局数据
      //  app.Fetch("/api/slider.json").then(res =>{
         
      //        that.setData({
      //           images: res.data.data.slider
      //         })
      //  })
         that.setData({
           images: [{
             "name": "年货大礼包",
             "orders": 1,
             "picurl": "/images/banenr01.jpg",
             "targeturl": "#"
           },
           {
             "name": "年货大礼包",
             "orders": 2,
             "picurl": "/images/banenr02.jpg",
             "targeturl": "#"
           },
           {
             "name": "年货大礼包",
             "orders": 3,
             "picurl": "/images/banenr03.jpg",
             "targeturl": "#"
           },
           {
             "name": "年货大礼包",
             "orders": 3,
             "picurl": "/images/banenr04.jpg",
             "targeturl": "#"
           }]
              })
        
   
    },
    pmdInit(){
      var vm = this;
      var pmdLen = vm.data.text.length * vm.data.size;//文字长度
      var windowWidth = wx.getSystemInfoSync().windowWidth;// 屏幕宽度
   
      vm.setData({
        pmdLen: pmdLen,
        windowWidth: windowWidth
      });
      //console.log(pmdLen + ':' + windowWidth)
      vm.pmd();// 水平一行字滚动完了再按照原来的方向滚动
    },
    pmd: function () {
       var vm = this;
       
        vm.setData({
          marqueeDistance: vm.data.marqueeDistance - vm.data.marqueePace,
        });
        clearTimeout(vm.data.timer1);
        vm.data.timer1 =setTimeout(function () {
          if (-vm.data.marqueeDistance >= vm.data.pmdLen) {
              vm.setData({
                marqueeDistance: vm.data.windowWidth
              });
          } 
            vm.pmd();
          
         }, vm.data.intervalMD);
    
    },
    navigateTo(e) {
        wx.navigateTo({
          url: e.currentTarget.dataset.url
        });
        if (e.currentTarget.dataset.url.match('kl')){
          wx.switchTab({
            url: e.currentTarget.dataset.url
          })
        }
    },
  onLoad: function () {
    //console.log(wx)
   
    app.checkLogin;
  
  }
})
