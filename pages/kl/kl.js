/**
 * Created by ChenChao on 2016/9/27.
 */

var app = getApp();
var storage = require('../../assets/storage');
//分时
var ts = require('../../assets/wxChart/time-sharing');
var axisShow = require('../../assets/wxChart/axis-show');
var ts1, ts2;     //分时
var tsd51, tsd52; //五日
var tsAxisShow;   //分时手势坐标
var getOptionTimeSharing1 = function (type, width) {
  return {
    name: type || 'time-sharing',
    width: width || 'auto',
    height: 200,
    axis: {
      row: 4,
      col: 4,
      paddingTop: 0,
      paddingBottom: 0,
      paddingLeft: 0,
      paddingRight: 0,
      color: '#cdcdcd'
    },
    xAxis: {
      data: []
    },
    yAxis: [
      {
        type: 'line',
        lineColor: '#2F6098',
        background: 'rgba(53,125,222,0.1)',
        /*background: function () {  //渐变背景在IOS上会影响均线颜色，这个应该是小程序canvas的bug
            return ['rgba(53,125,222,0.3)', 'rgba(0,0,0,0)'];
        },*/
        data: []
      },
      {
        type: 'line',
        lineColor: '#A96F3E',
        data: []
      }
    ],
    callback: function (time) {
      var page = getCurrentPages();
      page = page[page.length - 1];
      page.setData({
        ts1RenderTime: time
      });
    }
  };
};
var getOptionTimeSharing2 = function (type, width) {
  return {
    name: type || 'time-sharing-b',
    width: width || 'auto',
    height: 80,
    axis: {
      row: 2,
      col: 4,
      showEdg: true,
      showX: true,
      showY: true,
      paddingTop: 5,
      paddingBottom: 14,
      paddingLeft: 0,
      paddingRight: 0,
      color: '#cdcdcd'
    },
    xAxis: {
      times: ['09:30', '15:00'],
      data: []
    },
    yAxis: [
      {
        type: 'bar',
        color: [],
        data: [],
        showMax: true
      }
    ],
    callback: function (time) {
      var page = getCurrentPages();
      page = page[page.length - 1];
      page.setData({
        ts2RenderTime: time
      });
    }
  };
};
var getOptionTimeSharingAxis = function () {
  return {

  };
};
var timer = null;
//k线
var kl = require('../../assets/wxChart/k-line');
var getOptionKline1 = function (type) {
    return {
        name: type || 'dk',
        width: 'auto',
        height: 160,
        average: [5, 10, 20],
        axis: {
            row: 4,
            col: 5,
            showX: false,
            showY: true,
            showEdg: true,
            paddingTop: 0,
            paddingBottom: 1,
            paddingLeft: 0,
            paddingRight: 0,
            color: '#cdcdcd'
        },
        xAxis: {
            data: [],
            averageLabel: []
        },
        yAxis: [],
        callback: function (time) {
            var page = getCurrentPages();
            page = page[page.length - 1];
            page.setData({
                kl1RenderTime: time
            });
        }
    };
};
var getOptionKline2 = function (type) {
    return {
        name: type || 'dk',
        width: 'auto',
        height: 80,
        average: [5, 10, 20],
        axis: {
            row: 1,
            col: 5,
            showX: false,
            showY: true,
            showEdg: true,
            paddingTop: 0,
            paddingBottom: 14,
            paddingLeft: 0,
            paddingRight: 0,
            color: '#cdcdcd'
        },
        xAxis: {
            times: [],
            data: [],
            averageLabel: []
        },
        yAxis: [],
        callback: function (time) {
            var page = getCurrentPages();
            page = page[page.length - 1];
            page.setData({
                kl2RenderTime: time
            });
        }
    };
};
var kLine, kLineB;
var ma5Arr, ma10Arr, ma20Arr,
    ma5bArr, ma10bArr, ma20bArr;

Page({
    data: {
        ma5: '',
        ma10: '',
        ma20: '',
        ma5b: '',
        ma10b: '',
        ma20b: '',
        tabName: '',
        stock: '',
        code: '',
        time: '',
        yc: '',
        kl1RenderTime: 0,
        kl2RenderTime: 0,
        minIndex: 3,
        minArray: ['5分钟', '15分钟', '30分钟', '60分钟'],
        //分时
        ts: {},
        ts5: {},
        stock: '',
        code: '',
        time: '',
        yc: '',
        dataIndex: 0,
        ts1RenderTime: 0,
        ts2RenderTime: 0,
        timerIndex: 4,
        timerArray: ['50ms', '100ms', '200ms', '500ms', '1000ms'],
        isShowAxis: false,
        //弹框
        buypop:true,
        salepop: true,
        canvasHide:false,
        isAgree:false,
        sw1:true,
        sw2: true,
    },
    onLoad: function () {
      var tsData = storage.getTsData();
      var ts5Data = storage.getTs5Data();
      this.setData({
        dataIndex: 0,
        ts: tsData,
        ts5: ts5Data
      });
      this.tabtsChart({
        target: {
          dataset: {
            type: 'ts'
          }
        }
      });
        //默认切换到日K
        // this.tabChart({
        //     target: {
        //         dataset: {
        //             type: 'dk'
        //         }
        //     }
        // });
    },
    //分时
    tabtsChart:function(e){
      this.clearTimer();
      var type = e.target.dataset.type;
      var data = this.data[type];
      this.setData({
        tabName: type,
        stock: data.name,
        code: data.code,
        time: data.info.time,
        yc: data.info.yc
      });
      this['init-' + type]();
    },
    'init-ts': function () {
      var data = this.data.ts;
      ts1 = ts('time-sharing').init(getOptionTimeSharing1());
      this.renderTs1(data);
      ts2 = ts('time-sharing-b').init(getOptionTimeSharing2());
      this.renderTs2(data);
      tsAxisShow = axisShow('time-sharing-axis', {
        //todo: 配置项
        type: 'ts',
        height: 280,
        width: 'auto',
        maxY: 100,
        minY: 0
      });
      tsAxisShow.init();
    },
    renderTs1: function (data) {
      ts1.metaData1(data, getOptionTimeSharing1());
      ts1.draw();
    },
    renderTs2: function (data) {
      ts2.metaData2(data, getOptionTimeSharing2());
      ts2.draw();
    },
    clearTimer: function () {
      clearInterval(timer);
      this.setData({
        dataIndex: 0
      });
    },
    reset: function () {
      this.clearTimer();

      var data = storage.getTsData();
      this.renderTs1(data);
      this.renderTs2(data);
    },
    dynamic: function () {
      var that = this;
      var data = storage.getTsData();
      var origin = data.data.slice(0);
      var index = 0;
      var times = [50, 100, 200, 500, 1000];
      clearInterval(timer);
      timer = setInterval(function () {
        index += 1;
        if (index > 241 + 16) {
          clearInterval(timer);
          return;
        }
        data.data = origin.slice(0, index);
        that.renderTs1(data);
        that.renderTs2(data);
        that.setData({
          dataIndex: index
        });
      }, times[this.data.timerIndex]);
    },
    bindTimeChange: function (e) {
      var index = e.detail.value;
      this.setData({
        timerIndex: index === '' ? 4 : index
      });
      this.dynamic();
    },
    axisStart: function (e) {
      var x = e.touches[0].x;
      var y = e.touches[0].y;
      this.data.isShowAxis = true;
      tsAxisShow.start(x, y);
    },
    axisMove: function (e) {
      if (this.data.isShowAxis) {
        var x = e.touches[0].x;
        var y = e.touches[0].y;
        tsAxisShow.move(x, y);
      }
    },
    axisStop: function () {
      this.data.isShowAxis = false;
      tsAxisShow.stop();
    },
    onHide: function () {
      clearInterval(timer);
    },
    //k线
     tabChart: function (e) {
        var type = e.target.dataset.type;
        var getDataByType = function (type) {
            return {
                'dk': function () {
                    return storage.getDkData();
                },
                'wk': function () {
                    return storage.getWkData();
                },
                'mk': function () {
                    return storage.getMkData();
                }
            }[type]();
        };
        var data = getDataByType(type);
        this.setData({
            tabName: type,
            stock: data.name,
            code: data.code,
            time: data.info.time,
            yc: data.info.yc
        });
        this.draw(data, type);
    },
    tabMinChart: function (e) {
        var type = 'mink';
        var index = e.detail.value;
        index = index=== '' ? 3 : index;
        var getDataByType = function (type) {
            return {
                'mink-5': function () {
                    return storage.getMin5Data();
                },
                'mink-15': function () {
                    return storage.getMin15Data();
                },
                'mink-30': function () {
                    return storage.getMin30Data();
                },
                'mink-60': function () {
                    return storage.getMin60Data();
                }
            }[type]();
        };
        var typeList = [5, 15, 30, 60];
        var minType = type + '-' + typeList[index];
        var data = getDataByType(minType);
        this.setData({
            tabName: type,
            minIndex: index,
            stock: data.name,
            code: data.code,
            time: data.info.time,
            yc: data.info.yc
        });
        this.draw(data, minType);
    },
    draw: function (data, type) {
        kLine = kl('k-line').init(getOptionKline1(type));
        kLine.metaData1(data, getOptionKline1(type));
        kLine.draw();

        kLineB = kl('k-line-b').init(getOptionKline2(type));
        kLineB.metaData2(data, getOptionKline2(type));
        kLineB.draw();

        var yAxis1 = kLine.options.yAxis;
        var yAxis2 = kLineB.options.yAxis;
        ma5Arr = yAxis1[1].dataShow;
        ma10Arr = yAxis1[2].dataShow;
        ma20Arr = yAxis1[3].dataShow;
        ma5bArr = yAxis2[1].dataShow;
        ma10bArr = yAxis2[2].dataShow;
        ma20bArr = yAxis2[3].dataShow;
        this.showLastAverage();
    },
    showLastAverage: function () {
        this.setData({
            ma5: ma5Arr[ma5Arr.length - 1],
            ma10: ma10Arr[ma10Arr.length - 1],
            ma20: ma20Arr[ma20Arr.length - 1],
            ma5b: ma5bArr[ma5bArr.length - 1],
            ma10b: ma10bArr[ma10bArr.length - 1],
            ma20b: ma20bArr[ma20bArr.length - 1]
        });
    },
    buy: function () {
      // wx.showModal({
      //   title: '弹窗标题',
      //   content: '弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内',
      //   confirmText: "主操作",
      //   cancelText: "辅助操作",
      //   success: function (res) {
      //     console.log(res);
      //     if (res.confirm) {
      //       console.log('用户点击主操作')
      //     } else {
      //       console.log('用户点击辅助操作')
      //     }
      //   }
      // });

      this.setData({
        buypop: false,
        canvasHide: true
      })
    },
    sale:function(){
      this.setData({
        buypop: false,
        canvasHide:true
      })
    },
    closePop:function(){
      this.setData({
        buypop: true,
        canvasHide: false
      })
    },
    bindAgreeChange: function (e) {
      this.setData({
        isAgree: !!e.detail.value.length
      });
    },
    switch1Change: function (e) {
      this.setData({
        sw1: !e.detail.value
      });
    },
    switch2Change: function (e) {
      this.setData({
        sw2: !e.detail.value
      });
    }
});
