// components/search/search.js
Component({
  /**
   * 组件的属性列表
   */
  // props
  properties: {
    status: String
  },
  data: {
    inputShowed: false,
    inputVal: "",
    song:[]
  },

  ready() {
    if (this.data.status=="showInput"){
      this.setData({
        inputShowed: true
      });
    }else{
      this.setData({
        inputShowed: false
      });
    }
    console.log(this.data.status)
  },
  /**
   * 组件的方法列表
   */
  methods: {
    showInput: function() {
      wx.navigateTo({
        url: '/pages/search/search',
      })
    },
    hideInput: function() {
      console.log(1)
      wx.navigateBack({
        delta: 2
      })
    },
    clearInput: function() {
      this.setData({
        inputVal: ""
      });
    },
    inputTyping: function(e) {
      console.log(e.detail.value)
      this.getSongInfo(e.detail.value)
      this.setData({
        inputVal: e.detail.value
      });
    },
    getSongInfo(keyword){
      var self = this;
      wx.request({
        url: 'http://tingapi.ting.baidu.com/v1/restserver/ting', //仅为示例，并非真实的接口地址
        data: {
          method: "baidu.ting.search.catalogSug",
          query: keyword
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          console.log(res)
          self.setData({
            song: res.data.song ? res.data.song:""
          })
        }
      })
    }
  }

})