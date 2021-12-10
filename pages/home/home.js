// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentIndex:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    switch(this.data.currentIndex){
      case 0:
        this.selectComponent("#daily").onRefresh()
        break;
      case 1:
        this.selectComponent("#category").onRefresh()
        break;  
      case 2:
        this.selectComponent("#recommend").onRefresh()
        break  
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    switch(this.data.currentIndex){
      case 0:
        const dailyComponent = this.selectComponent("#daily")
        dailyComponent.onLoadMore()
        break;
      case 1:
        break;  
      case 2:
        const recommendComponent = this.selectComponent("#recommend")
        recommendComponent.onLoadMore()
        break  
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  changeTabs(event){
   this.setData({
    currentIndex:event.detail.currentIndex
   })
  }
})