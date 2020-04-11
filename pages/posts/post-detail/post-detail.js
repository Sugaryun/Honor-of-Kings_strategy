// pages/posts/post-detail/post-detail.js
var postsData = require('../../../data/posts-data')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collected: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var postId = options.id;
    this.data.currentPostId = postId;
    var postData = postsData.postsList[postId]
    this.setData({ postData });

    //缓存
    var postsCollected = wx.getStorageSync('postsCollected')
    // console.log(postsCollected)
    if (postsCollected) {
      var postCollected = postsCollected[postId]
      if (postCollected) {
        this.setData({ collected: postCollected })
      }
    } else {
      var postsCollected = {};
      postsCollected[postId] = false;
      wx.setStorageSync('postsCollected', postsCollected)
    }
  },

  //收藏按钮
  onCollectTap: function () {

    //提示的另一种API点击收藏图标弹出提示 比较简单
    // wx.showToast({
    //   title: collected ? '收藏成功' : '取消成功',
    //   duration: 1000,
    //   icon: "success"
    // })
    

    //第二种API
    //如果当前文章已经被收藏：是否取消收藏
    //如果当前文章未被收藏：是否收藏

    var postsCollected = wx.getStorageSync('postsCollected')
    var collected = postsCollected[this.data.currentPostId]

    wx.showModal({
      content: collected ? '是否取消收藏' : '是否收藏',
      cancelColor: '#333',
      confirmColor: '#405f80',
      cancelText: '取消',
      confirmText: '确认',
      showCancel: 'true',
      success: (res) => {
        if (res.confirm) {
          collected = !collected;
          postsCollected[this.data.currentPostId] = collected
          wx.setStorageSync('postsCollected', postsCollected)
          this.setData({ collected });
        }
      }
    })
  },
})