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
    nextPageUrl:""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onRefresh(){
      wx.request({
        url: app.gBaseUrl + 'v7/community/tab/rec',
        success:(res)=>{
          const nextPageUrl = res.data.nextPageUrl
         let itemList = res.data.itemList
         itemList = itemList.filter((value)=> value.type !== 'horizontalScrollCard')

        this.data.nextPageUrl = nextPageUrl

         wx.lin.renderWaterFlow(itemList, true)
         wx.stopPullDownRefresh()
        }
      })
    },
    onLoadMore(){      
      if(this.data.nextPageUrl === null){
          return
      }
      wx.request({
        url: this.data.nextPageUrl,
        success:(res)=>{
          const nextPageUrl = res.data.nextPageUrl
         let itemList = res.data.itemList
  
        this.data.nextPageUrl = nextPageUrl

         wx.lin.renderWaterFlow(itemList, false)
        }
      })
    },
  },
  attached: function() {
    this.onRefresh()
  },
})
