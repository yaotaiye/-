import config from '../../etc/config'
export default  (url = '', data = {}, type = 'GET') => {
  type = type.toUpperCase();
  url = config.basePath + url;

    return new Promise((resolve, reject) => {

        wx.request({
          url: url, 
          data: data,
          header: {
            'content-type': 'application/json'
          },
          success: function (obj) {
            resolve(obj)
          },
          fail:function(res){
            reject(res)
          },
          dataType:'json',
          method:type

        })

    })
 
}