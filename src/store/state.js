const state={
  carData:{},//外检车辆信息
  appearanceTag:{},//外观检测参数
  savestate:{},//保存合格状态
  itemtype:'',//项目类型
  lineList:[],//检测通道列表
  lineNum:'',//外检通道编号
  userInfo:{},//用户信息
  qualified:'',//检验结果是否合格
  imgLength:0,//照骗拍摄数量
  sid:'',//登录返回的cookie
  date1:'',//查询待检列表的开始时间
  xh:'',//上传照片返回的唯一序号
};
export default state;