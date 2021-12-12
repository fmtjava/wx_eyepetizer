
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
    categoryList:[]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onRefresh(){
      wx.request({
        url: app.gBaseUrl + 'v4/categories',
        success:(res)=>{
          this.setData({
            categoryList:res.data
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
    go2CategoryDetail(event){
      const category = this.data.categoryList[event.detail.index]
      wx.navigateTo({
        url: '/pages/category-detail/category-detail?id=' + category.id + "&headerImage=" + category.headerImage + "&name=" + category.name + "&description=" + category.description,
      })
    }
  },
  attached: function() {
    this.onRefresh()
  },
})
