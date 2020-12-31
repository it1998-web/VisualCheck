<template>
  <div class="itemSelect">
     <van-nav-bar :fixed="true"   @click-left="Onmenu">
      <template #title>
        <span class="navbar">选择检测项目</span>
      </template>
      <!-- <template #right>
        <i class="iconfont" style="font-size:20px;">&#xe686;</i>
      </template> -->
      <template #left>
        <i class="iconfont" style="font-size:20px;">&#xe660;</i>
      </template>
    </van-nav-bar>
<!-- 选择检验项目背景图  -->
<div class="jyxmbgc" :style="{backgroundImage: 'url(' + CTCJ + ')' }">

</div>
<!-- 检测项目列表 -->
<van-row gutter="14" class="carbox"  >
  <van-col span="12">
    <div @click="detectionStart('NQ')"  class="itemcard" :style="{backgroundImage: 'url(' + Lianwang + ')' }"></div>
  </van-col>
  <van-col span="12">
    <div @click="detectionStart('UC')" class="itemcard " :style="{backgroundImage: 'url(' + Weiyi + ')' }"></div>
  </van-col>
  <van-col span="12">
    <div @click="detectionStart('F1')" class="itemcard "style="margin-top: 8px;" :style="{backgroundImage: 'url(' + Waijian + ')' }"></div>
  </van-col>
  <van-col span="12" >
    <div @click="detectionStart('DC')" class="itemcard "style="margin-top: 8px;" :style="{backgroundImage: 'url(' + Dipan + ')' }"></div>
  </van-col>
  <van-col span="12" >
    <div @click="detectionStart('R')" class="itemcard"style="margin-top: 8px;" :style="{backgroundImage: 'url(' + Lushi + ')' }"></div>
  </van-col>
  <van-col span="12" >
    <div @click="detectionVL('VL')" class="itemcard xianyi"style="margin-top: 8px;" :style="{backgroundImage: 'url(' + Xianyi + ')' }"></div>
  </van-col>
  <!-- <van-col span="12" >
    <div  class="itemcard qidai"style="margin-top: 8px;"></div>
  </van-col> -->
</van-row>
<!-- 左侧弹出层 -->
<van-popup v-model="showpopup" position="left" :style="{width: '70%',height:'100%' }">
  <div class="welcome">欢迎您: <span style="color:#323233">{{JYYname}}</span></div>
  <van-image  round  :src="require('../../static/image/touxiang3X.png')" />
  <van-cell title="用户名" :value="username" size="large" />
  <van-cell title="检查更新" @click="updates" is-link url="" />
  <van-cell title="清除缓存" @click="clearCache" is-link/>
  <div class="logout">
    <p style="color:#2FA2F5"  @click="logout">退出登录</p>
    <p>版本号：v1.0.0.3</p>
    <!-- 0.3版本更新日志：
    新增个人中心页面 可以清除缓存 检查更新(还未实现) 多个用户登录同一个账号时的 bug 直接返回登录页面 外检拍照功能不再限制用户是否已经全部上传图片  嫌疑车辆查询功能尚未完善 -->
  </div>
</van-popup>
</div>
</template>
<script>
import {NavBar,List,Cell, CellGroup, Col, Row,Dialog,Popup,Toast,Image as VanImage   } from 'vant';
import ctcj from '../../static/image/ctcj3X.png';
import lianwang from '../../static/image/lianwang3x.png';
import weiyi from '../../static/image/weiyix3X.png';
import dipan from '../../static/image/dipan3X.png';
import lushi from '../../static/image/lushi3x.png';
import waijian from '../../static/image/waijian3X.png';
import xianyi from '../../static/image/xianyi3X.png';
export default {
name:'itemSelect',
components:{
  [NavBar.name]:NavBar,
  [List.name]:List,
  [Cell.name]:Cell,
  [CellGroup.name]:CellGroup,
  [Col.name]:Col,
  [Row.name]:Row,
  [Dialog.name]:Dialog,
  [Popup.name]:Popup,
  [Toast.name]:Toast,
  [VanImage.name]:VanImage,
},
data () {
  return {
    itemList:[
      {title:'联网查询',state:'NQ'},
      {title:'唯一性检查',state:'UC'},
      {title:'外观检验',state:'F1'},
      {title:'底盘动态',state:'DC'},
      {title:'路试检查',state:'R'},
    ],
    CTCJ:ctcj,
    Lianwang:lianwang,
    Weiyi:weiyi,
    Dipan:dipan,
    Lushi:lushi,
    Xianyi:xianyi,
    Waijian:waijian,
    JYYname:'',//检验员姓名
    showpopup:false,//是否弹出左侧弹层
    username:'',
  }
},
 mounted() {
    document.querySelector('body').setAttribute('style', 'background-color:#F5F5F5');
    this.JYYname=this.$store.getters.getuserInfo.yhxm;//当前项目检验员姓名
     console.log(window.localStorage.getItem('Username'));
    this.username=window.localStorage.getItem('Username');//从内存中读取上次登录的用户名
  },
beforeDestroy() {
    document.querySelector('body').removeAttribute('style');
  },
 methods: {
   detectionStart(item){
      console.log(item)
       this.$store.dispatch('getitemtype',item);//保存检测项目类型
       var configlist= this.$store.getters.getLinelist;
       console.log(configlist)
       var list=[];
       configlist.forEach(value=>{
          if(value.tag==item){
             list.push(value);
          }
       });
       console.log(list)
//判定是否需要直接跳转默认通道（只有一个通道的情况）
       if(list.length>1){
         //跳转到选择通道选择页面
          this.$router.push({name:'aisle'});
       }else if(list.length==0){
         this.$store.dispatch('getlineNum', 1);
         this.$router.push({name:'car_select'});
       }else {
         //保存默认通道
         this.$router.push({name:'car_select'});
         this.$store.dispatch('getlineNum', list[0].value);
       }
      },
// 跳转 违规查询页面
detectionVL(item){
         //跳转道违规车辆等级页面
         this.$router.push({name:'violate'});
     },
// 退出登录
logout(){
        Dialog.confirm({
        title: '提示',
        message: `<span style="font-size:18px;">您确认退出登录?</span>`,
      })
        .then(() => {
          // on confirm
          window.localStorage.removeItem('token');
          this.$router.push({name:'login'});
        })
        .catch(() => {
          // on cancel
        });
      },
// 左上角菜单
Onmenu(){
  this.showpopup=true;
},
//检查更新
updates(){
  Toast('当前为最新版本');
},
// 清除缓存
clearCache(){
 Dialog.confirm({
  title: '提示',
  message: `<span style="font-size:18px;">您确认清除缓存?</span>`,
 })
  .then(() => {
    window.localStorage.clear();//彻底清除手机缓存数据
    this.$router.push({name:'login'});
  })
  .catch(() => {
    // on cancel
  });
}
  }
}
</script>
<style scoped>
.navbar{
  font-size: 20px;
  font-weight: 600;
}
.listbox{
  margin-top: 15px;
}
.itemTitle{
  font-size: 18px;
  font-weight: 600;
}
.right-title{
  font-size: 16px;
  font-weight: 600;
}
.itemcard{
    width:162px;
    height: 127px;
    background-image: url('../assets/image/lianwang3x.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
}
/* .weiyi{
      background-image: url('../assets/image/weiyix3X.png');
}
.waiguan{
  background-image: url('../assets/image/waijian3X.png');
}
.dipan{
   background-image: url('../assets/image/dipan3X.png');
}
.lushi{
    background-image: url('../assets/image/lushi3x.png');
}
.qidai{
   background-image: url('../assets/image/qditem.png');
    border: 1px dashed;
    border-radius: 10px;
} */
.xianyi{
    /* background-image: url('../assets/image/xianyi3X.png'); */
    /* border: 1px dashed; */
    /* border-radius: 10px; */
}
.carbox{
  margin: 30px 14px 0 14px;
}
.jyxmbgc{
    width:375px;
    height: 200px;
    margin:0 auto;
    /* background-image: url('../assets/image/ctcj.jpg'); */
    background-size: 100% 100%;
    background-repeat: no-repeat;
    margin-top: 60px;
}
.logout{
  position: fixed;
  bottom: 10px;
  left: 0;
  width: 100%;
}
.logout p:nth-child(1){
  font-size: 18px;
  font-weight: 600;
}
.logout p{
  text-align: center;
  color: #727272;
}
.welcome{
  font-size: 20px;
  font-weight: 600;
  width: 100%;
  margin:10px 0 10px 20px;
  color: #3296FA;
}
.welcome span{
  font-size: 18px;
}
.van-image{
    width: 95px;
    height: 95px;
    margin-left: 50%;
    transform: translateX(-50%);
    margin-top: 30px;
}
.van-cell{
  font-size:16px;
  font-weight: 600;
}
</style>
