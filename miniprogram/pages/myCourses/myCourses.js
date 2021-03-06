// miniprogram/pages/myCourses/myCourses.js
// import DataBaseManager from /miniprogram/dbModule.js;
var app = getApp()
var dbModule = require('../../my_modules/dataBaseManager.js')
var db = new dbModule.DataBaseManager()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    courses: [],
  },

  DropCourse(e) {
    console.log(app.globalData.openid);
    let courseNum = e.currentTarget.dataset.coursenum
    let courseName = e.target.id

    db.DropCourse(courseNum, courseName);
    this.onLoad();
    // 退课之后，界面刷新
    wx.redirectTo({
      url: '../myCourses/myCourses',
    })
    
    wx.showToast({
      title: '退选成功',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    var stuNum = app.globalData.uid;
    console.log(stuNum)
    var courseName = await db.GetMyCoursesName(stuNum);
    var info = await db.GetCousreInfo(courseName)
    // 加载页面之后渲染课程
    Promise.all(info).then(res => {
      this.setData({
        courses: res
      })
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
    this.onLoad();
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

  }
})