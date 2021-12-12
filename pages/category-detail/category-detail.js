import moment from '../../miniprogram_npm/moment/index.js';

const CATEGOTY_DETAIL_URL = 'v4/categories/videoList?id=';
const SUFFIX =
  '&udid=d2807c895f0348a180148c9dfa6f2feeac0781b5&deviceModel=Android';
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    headerImage:'',
    name:'',
    description:'',
    itemList:[],
    _nextPageUrl:'',
    _id:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data._id = options.id
    wx.setNavigationBarTitle({
      title: options.name + '主页'
    })
    this.setData({
      headerImage:options.headerImage,
      name:options.name,
      description:options.description
    })
    this.onRefresh()
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
    this.onRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.onLoadMore()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  onRefresh(){
    wx.request({
      url: app.gBaseUrl + CATEGOTY_DETAIL_URL + this.data._id + SUFFIX,
      success:(res)=>{
        const nextPageUrl = res.data.nextPageUrl
       let itemList = res.data.itemList

       for(let item of itemList){
        item.videoTimeText = moment(new Date(item.data.duration * 1000)).format('mm:ss')
      }

       this.setData({
        itemList:itemList,
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
      url: this.data._nextPageUrl + SUFFIX,
      success:(res)=>{
        const nextPageUrl = res.data.nextPageUrl
       let itemList = res.data.itemList

       for(let item of itemList){
         item.videoTimeText = moment(new Date(item.data.duration * 1000)).format('mm:ss')
       }

       this.setData({
        itemList:this.data.itemList.concat(itemList),
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
})