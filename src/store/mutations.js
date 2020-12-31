const mutations={
   GETCARSDATA(state, payload) { //外检车辆信息
      var newscardata = payload
      return (state.carData = newscardata)
     },
   GETWGTAG(state, payload) { //外观检测参数
      var newsappearanceTag = payload
      return (state.appearanceTag = newsappearanceTag)
     },
   GETSAVESTATE(state, payload) { //保存合格状态
      var newssavestate = payload
      return (state.savestate = newssavestate)
     },
   GETITEMTYPE(state, payload) { //项目类型
      var newsitemtype = payload
      return (state.itemtype = newsitemtype)
     },
   GETLINELIST(state, payload) { //检测通道列表
      var newslineList = payload
      return (state.lineList = newslineList)
     },
   GETLINENUM(state, payload) { //外检通道编号
      var newslineNum = payload
      return (state.lineNum = newslineNum)
     },
   GETUSERINFO(state, payload) { //用户信息
      var newsuserinfo = payload
      return (state.userInfo = newsuserinfo)
     },
   GETQUALIFIED(state,payload) { //总检验结果是否合格
      var newsqualified = payload
      return (state.qualified = newsqualified)
     },
   GETIMGLENGTH(state,payload) { //拍摄照片总数量
      var newsimglength = payload
      return (state.imgLength = newsimglength)
     },
   GETCOOKIE(state,payload) { //sid  cookie
      var newssid = payload
      return (state.sid = newssid)
     },
  GETDATE1(state,payload) { //查询待检列表的开始时间
      var newsdate1 = payload
      return (state.date1 = newsdate1)
     },
  GETXH(state, payload) { //上传图片返回的序号
      var newsxh = payload
     return (state.xh = newsxh)
   },
};
export default mutations;