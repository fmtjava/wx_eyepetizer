// components/recommend-item/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data:Object
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
    go2Recommend(event){
      const contentData = this.data.data.data.content
      const recommendData = contentData.data;
      if(contentData.type === 'video'){
        console.log('video')
        wx.previewMedia({
          sources: [{url:recommendData.playUrl,
          type:'video',
          poster:recommendData.cover.feed}],
        })
      }else{
        if(recommendData.urls === null ||recommendData.urls.legnth === 0){
          wx.previewImage({
            urls: [recommendData.url],
          })
        }else{
          wx.previewImage({
            urls: recommendData.urls,
          })
        }
      }
    }
  }
})
