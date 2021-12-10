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
      console.log(this.properties.item)
      wx.previewMedia({
        sources: [{
          url:this.properties.item.data.playUrl,
          type:'video',
          poster:this.properties.item.data.cover.feed
        }],
      })
    }
  }
})
