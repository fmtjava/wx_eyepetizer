import moment from '../../miniprogram_npm/moment/index.js';
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
    followList:[],
    _nextPageUrl:''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onRefresh(){
      wx.request({
        url: app.gBaseUrl + 'v4/tabs/follow',
        success:(res)=>{
          const nextPageUrl = res.data.nextPageUrl
          const itemList = res.data.itemList

          for(let item of itemList){
            for(let horizontalItem of item.data.itemList){
              horizontalItem.releaseTimeStr = moment(new Date(horizontalItem.data.releaseTime)).format('yyyy/MM/DD HH:mm')
            }
          }
  
         this.setData({
          followList:itemList,
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

          for(let item of itemList){
            for(let horizontalItem of item.data.itemList){
              horizontalItem.releaseTimeStr = moment(new Date(horizontalItem.data.releaseTime)).format('yyyy/MM/DD HH:mm')
            }
          }
  
         this.setData({
          followList:this.data.followList.concat(itemList),
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

    go2VideoDetail(event){
      const outerIndex = event.currentTarget.dataset.outerIndex
      const innerIndex = event.currentTarget.dataset.index
      const outerItem = this.data.followList[outerIndex]
      const innerItem = outerItem.data.itemList[innerIndex]
      const itemJsonStr = encodeURIComponent(JSON.stringify(innerItem))
     wx.navigateTo({
       url: '/pages/video-detail/video-detail?item=' + itemJsonStr,
     })
    }
  },
  attached: function() {
    this.onRefresh()
  },
})
