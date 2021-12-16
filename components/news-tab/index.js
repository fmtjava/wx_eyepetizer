// components/news-tab/index.js
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
    newsList:[],
    _nextPageUrl:''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onRefresh(){
      wx.request({
        url: app.gBaseUrl + 'v7/information/list?vc=6030000&deviceModel=Android',
        success:(res)=>{
          const nextPageUrl = res.data.nextPageUrl
          const itemList = res.data.itemList
  
         this.setData({
          newsList:itemList,
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
        url: this.data._nextPageUrl + "&vc=6030000&deviceModel=Android",
        success:(res)=>{
          const nextPageUrl = res.data.nextPageUrl
          const itemList = res.data.itemList
  
         this.setData({
          newsList:this.data.newsList.concat(itemList),
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
    go2NewsDetail(event){
      const index = event.currentTarget.dataset.index
      const item = this.data.newsList[index]
      const actionUrl = decodeURIComponent(item.data.actionUrl.substring(item.data.actionUrl.indexOf('url')))
      const url = actionUrl.substring(4)
      console.log(url)
      wx.navigateTo({
        url: "/pages/news-detail/news-detail?url=" + encodeURIComponent(url),
      })
    }
  },
  attached: function() {
    this.onRefresh()
  },
})
