// pages/detail/detail.js
let timer = null;
const tool = require("../../utils/tool.js");

Page({

  /**
   * 页面的初始数据
   */
  onReady: function (e) {
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    this.audioCtx = wx.createAudioContext('myAudio')
    this.audioPlay();
  },
  data: {
    songId: "",
    poster: '',
    name: '',
    author: '',
    src: '',
    time: 0
  },
  audioPlay: function () {
    this.audioCtx.play();

    timer = setInterval(() => {
      this.setData({
        time: ++this.data.time
      })
    }, 1000)
  },
  audioPause: function () {
    this.audioCtx.pause();
    clearInterval(timer);
  },
  audio14: function () {
    this.audioCtx.seek(14)
  },
  audioStart: function () {
    this.audioCtx.seek(0)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(tool.plus(1,3))
    this.setData({
      songId: options.songId
    })
    this.getSongInfo();
    this.getLrcInfo();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  getSongInfo() {
    var self = this;
    wx.request({
      url: 'http://tingapi.ting.baidu.com/v1/restserver/ting',
      data: {
        method: "baidu.ting.song.play",
        songid: self.data.songId
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data);
        let bitrate = res.data.bitrate;
        let songinfo = res.data.songinfo;
        self.setData({
          poster: songinfo.pic_big,
          name: songinfo.title,
          author: songinfo.author,
          src: bitrate.show_link
        })
      }
    })
  },
  getLrcInfo() {
    var self = this;
    wx.request({
      url: 'http://tingapi.ting.baidu.com/v1/restserver/ting',
      data: {
        method: "baidu.ting.song.lry",
        songid: self.data.songId
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data.lrcContent);
        let lrc = res.data.lrcContent;
        let obj = self.parseLyric(lrc);
        console.log(obj)
        self.setData({
          lrc: obj
        })
      }
    })
  },
  parseLyric(lrc) {
    var lyrics = lrc.split("\n");
    var lrcObj = {};
    for (var i = 0; i < lyrics.length; i++) {
      var lyric = decodeURIComponent(lyrics[i]);
      var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
      var timeRegExpArr = lyric.match(timeReg);
      if (!timeRegExpArr) continue;
      var clause = lyric.replace(timeReg, '');
      for (var k = 0, h = timeRegExpArr.length; k < h; k++) {
        var t = timeRegExpArr[k];
        var min = Number(String(t.match(/\[\d*/i)).slice(1)),
          sec = Number(String(t.match(/\:\d*/i)).slice(1));
        var time = min * 60 + sec;
        lrcObj[time] = clause;
      }
    }
    return lrcObj;
  }
})