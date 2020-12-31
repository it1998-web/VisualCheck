const getters={
  getcarData:state => state.carData,//外检车辆信息
  getwgTag:state => state.appearanceTag,//外观检测参数
  getState:state => state.savestate,//保存合格状态
  getitemtype:state => state.itemtype,//项目类型
  getLinelist:state => state.lineList,//检测通道列表
  getlineNum:state => state.lineNum,//外检通道编号
  getuserInfo:state => state.userInfo,//用户信息
  getqualified:state => state.qualified,//总检验结果是否合格
  getImglength:state => state.imgLength,//拍摄照片总数量
  getCookie:state => state.sid,//cookie
  getDate1: state => state.date1,//查询待检列表的开始时间
  getxh: state => state.xh,//上传照片返回的序号
};
export default getters;