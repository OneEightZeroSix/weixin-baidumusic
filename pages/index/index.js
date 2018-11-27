var base64 = require("../../imgs/base64");

Page({
  data: {
    song_list: [],
    offset:0
  },
  onReady() {
    this.loadMore()
  },
  onLoad() {
    this.setData({
      icon20: base64.icon20,
      icon60: base64.icon60
    });
  },
  onPullDownRefresh() {
    console.log("触发下拉了");
    this.loadMore();
  },
  loadMore() {
    var self = this;
    wx.request({
      url: 'http://tingapi.ting.baidu.com/v1/restserver/ting', //仅为示例，并非真实的接口地址
      data: {
        method: "baidu.ting.billboard.billList",
        type: 1,
        size: 10,
        offset: this.data.offset
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        wx.stopPullDownRefresh();
        self.setData({
          offset: ++self.data.offset
        })
        console.log(res.data.song_list)
        let song_list = res.data.song_list.concat(self.data.song_list);
        self.setData({
          song_list
        });
      }
    })
  }
});