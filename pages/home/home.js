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
        this.selectComponent("#follow").onRefresh()
        break;  
      case 2:
        this.selectComponent("#category").onRefresh()
        break;
      case 3:
        this.selectComponent("#topic").onRefresh()
        break;    
      case 4:
        const newsComponent = this.selectComponent("#news")
        newsComponent.onRefresh()
        break      
      case 5:
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
        this.selectComponent("#daily").onLoadMore()
        break;
      case 1:
       this.selectComponent("#follow").onLoadMore()
        break;  
      case 2:
          break; 
      case 3:
        this.selectComponent("#topic").onLoadMore()
          break      
      case 4:
       this.selectComponent("#news").onLoadMore()
        break  
      case 5:
        this.selectComponent("#recommend").onLoadMore()
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