const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    topicList:[],
    _nextPageUrl:''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onRefresh(){
      wx.request({
        url: app.gBaseUrl + 'v3/specialTopics',
        success:(res)=>{
          const nextPageUrl = res.data.nextPageUrl
          const itemList = res.data.itemList

         this.setData({
          topicList:itemList,
           _nextPageUrl:nextPageUrl
         })
  
         wx.stopPullDownRefresh()
        },
        fail:(res)=>{
          wx.showToast({
            icon:'error',
            title: res.errMsg,
          })
        }
      })
    },
  
    onLoadMore(){
      if(this.data._nextPageUrl === null){
          return
      }
      
      wx.request({
        url: this.data._nextPageUrl,
        success:(res)=>{
          const nextPageUrl = res.data.nextPageUrl
          const itemList = res.data.itemList
  
         this.setData({
          topicList:this.data.topicList.concat(itemList),
           _nextPageUrl:nextPageUrl
         })
        },
        fail:(res)=>{
          wx.showToast({
            icon:'error',
            title: res.errMsg,
          })
        }
      })
    },
    go2TopicDetail(event){
      const topicItem = this.data.topicList[event.currentTarget.dataset.index]
      wx.navigateTo({
        url: '/pages/topic-detail/topic-detail?id=' + topicItem.data.id,
      })
    }
  },
  attached: function() {
    this.onRefresh()
  },
})
