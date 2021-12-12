import moment from '../../miniprogram_npm/moment/index.js';
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item:{},
    itemList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const item = JSON.parse(decodeURIComponent(options.item))
    this.refreshData(item)
  },

  refreshData(item){
    item.releaseTimeStr = moment(new Date(item.data.releaseTime)).format('yyyy/MM/DD HH:mm')
    wx.setNavigationBarTitle({
      title: item.data.title,
    })
    this.setData({
      item:item,
    })

    wx.request({
      url: app.gBaseUrl + "v4/video/related?id=" + item.data.id,
      success:(res)=>{
       let itemList = res.data.itemList

       for(let item of itemList){
        item.videoTimeText = moment(new Date(item.data.duration * 1000)).format('mm:ss')
      }

       this.setData({
        itemList:itemList,
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
  go2VideoDetail(event){
    const index = event.currentTarget.dataset.index
    const item = this.data.itemList[index]
    const itemJsonStr = encodeURIComponent(JSON.stringify(item))
   wx.navigateTo({
     url: '/pages/video-detail/video-detail?item=' + itemJsonStr,
   })
  }
})