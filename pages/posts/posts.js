// posts/posts.js
var postsData = require('../../data/posts-data')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.setData({
      posts_key: postsData.postsList
    })
  },
  onPostTap: function(event) {
    var postId = event.currentTarget.dataset.postid
    // console.log(postId)
    wx.navigateTo({
      url: 'post-detail/post-detail?id='+postId,
    })
  }
})