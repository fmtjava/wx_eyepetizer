// components/daily/daily.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item:Object
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    go2VideoDetail(event){
      const itemJsonStr = encodeURIComponent(JSON.stringify(this.properties.item))
     wx.navigateTo({
       url: '/pages/video-detail/video-detail?item=' + itemJsonStr,
     })
    }
  }
})
