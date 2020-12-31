<template>
  <div class="testMain">
   <van-nav-bar :fixed="true"  @click-left="onClickLeft" @click-right="uploadData"  >
  <template #right>
  <i class="iconfont" style="font-size:18px;" v-bind:class="classObject">&#xe614;</i>
  </template>
  <template #left>
    <div class="iconfont" style="color:#0193FE">&#xe641;<sapn style="color:#6060DE">{{times}}</sapn>
    </div>
  </template>
   <template #title>
        <span class="navbar">{{itemTitle(itemtype)}}</span>
  </template>
   </van-nav-bar>
   <div class="carinfobox">

     <div class="dialogbox">
      <!-- <p ><span>号牌号码：</span>{{carData.hphm}}</p> -->
       <p><span>流水号:{{carData.jylsh}} 第{{carData.jycs}}次</span></p>
       <h1 class="hphm" v-bind:class="hpzlclass(carData.hpzl)"  style="margin-left: 50%;transform: translateX(-50%);text-align: center;">{{carData.cptz}} {{carData.cphm}}</h1>
       <P class="jyy" style="float:left;">
         {{itemJCY(itemtype)}}:
         <span style="color:#34C759;margin-left:0;">{{JYY}} </span> <span style="margin-left:0;">****{{JYYsfzh}}</span>
      </P>
       <p class="number" style="float:right;">当前线号：<span style="color:#E21918;text-align: left;margin-left: 0;font-size:16px;">{{number}}</span></p>
     </div>
   </div>
   <!-- 子组件 Start -->
  <router-view @childByValue="childByValue" />
  <!-- 子组件 End -->
<div class="tabbar" style="margin-top: 70px;" v-if="itemtype=='F1'?true:false" v-show="showcopyright">
   <van-tabbar route v-model="active" active-color="#6060DE">
  <!-- tabBarshow==true?'/testMain/Characteristic':'/testMain/CharacteristicOld' -->
  <!-- /testMain/Characteristic  新国标-->
   <van-tabbar-item :to="tabBarshow==true?'/testMain/Characteristic':'/testMain/CharacteristicOld'">
    <span style="maargin-top:5px;">判定项</span>
    <template #icon="props">
      <img :src="props.active ? icon.intezheng: icon.tezhng"  />
    </template>
  </van-tabbar-item>
   <van-tabbar-item to="/testMain/Appearance" v-show="tabBarshow">
    <span style="maargin-top:5px;">测量项</span>
    <template #icon="props">
      <img :src="props.active ? icon.inwaiguan: icon.waiguan"  />
    </template>
  </van-tabbar-item>
    <van-tabbar-item to="/testMain/TakePhoto">
    <span style="maargin-top:5px;">拍照</span>
    <template #icon="props">
      <img :src="props.active ? icon.inpaizhao: icon.paizhao"  />
    </template>
  </van-tabbar-item>
 </van-tabbar>
</div>

<!-- 检测开始弹框 -->
<van-overlay :show="show" @click="show = false">
  <div class="wrapper" @click.stop>
    <div class="block" >
         {{overlayTitle}}
     </div>
  </div>
</van-overlay>
<!-- 开始失败弹框 -->
<van-overlay :show="showerr" z-index="999" @click="show = false">
  <div class="wrapper" @click.stop>
    <div class="block errblock" >
          <p class="iconfont">&#xe64e;</p>
          <p class="title">{{overlayTitle}}</p>
          <p class="title">(后台数据尚未反应)</p>
          <p @click="onClickLeft">点击返回</p>
    </div>
  </div>
</van-overlay>
<!-- 数据上传弹框 -->
<van-overlay :show="uploadoverlay" z-index="99" @click="show = false">
  <div class="wrapper" @click.stop>
    <div class="block" >
          <div class="uploadtitle" v-if="loading"><i class="iconfont font">&#xe606</i>数据上传中......</div>
          <!-- <van-progress :percentage="percentage" ref="progress" /> -->
          <div v-if="fileOk">
            <div class="iconfont fonts" style="color:#E39524">&#xe64f;</div>
            <div class="uploadtitle">上传成功!</div>
          </div>
    </div>
  </div>
</van-overlay>
<!-- 左滑进入 -->
<transition :name="vanslide" style="z-index:999">
  <div v-show="visible" class="transitionbox">{{itemStarts(itemName.jyxm)}}{{transitionTitle}}</div>
</transition>
<!-- 遮罩层 -->
<van-overlay :show="showoverlay" z-index="99" @click="show = false" />
  </div>
</template>
<script>
import {Tabbar, TabbarItem,NavBar,Overlay,Progress,Toast,Dialog,Cell, CellGroup,} from 'vant';
import {itemStart,saveData,itemEnd} from '@/api/login';
import weiyi from '../assets/image/weiyi.png';
import tezheng from '../assets/image/tezheng.png';
import inweiyi from '../assets/image/inweiyi.png';
import intezheng from '../assets/image/intezheng.png';
import waiguan from '../assets/image/waiguan.png';
import inwaiguan from '../assets/image/inwaiguan.png';
import anquan from '../assets/image/anquan.png';
import inanquan from '../assets/image/inanquan.png';
import paizhao from '../assets/image/paizhao.png';
import inpaizhao from '../assets/image/inpaizhao.png';
import Timer from './timer';
export default {
  name:'testMain',
  components:{
    [Tabbar.name]:Tabbar,
    [TabbarItem.name]:TabbarItem,
    [NavBar.name]:NavBar,
    [Overlay.name]:Overlay,
    [Progress.name]:Progress,
    [Dialog.name]:Dialog,
    [Cell.name]:Cell,
    [CellGroup.name]:CellGroup,
  },
  data() {
    return {
       active: 0,//选中的标签栏
       itemtype:'',//检验项目类型
       icon: {
        active: weiyi,
        inactive: inweiyi,
        tezhng:tezheng,
        intezheng:intezheng,
        waiguan:waiguan,
        inwaiguan:inwaiguan,
        anquan:anquan,
        inanquan:inanquan,
        paizhao:paizhao,
        inpaizhao:inpaizhao,
      },
      timer: "",
      hour: 0,
      minutes: 0,
      seconds: 0,
      times:'',
      isflag:1,
      show:false,//检测开始弹框
      visible:false,
      showerr:false,//检测失败弹框
      uploadoverlay:false,//数据上传弹框
      loading:false,//上传中
      fileOk:false,//上传成功
      showoverlay:false,//遮罩层
      onCofirmShow:false,//确认上传检检测结果
      vanslide:'',
      transitionTitle:'',
      overlayTitle:'',
      percentage:0,
      titleicon:``,
      carData:{},//当前待检车辆信息
      formData:{ /*项目开始参数 */
        jylsh:"",   //检验流水号(监管部门)
        jyjgbh:"", //安检机构编号
        jcxdh:"",  // 检验线代号
        jycs:"",   // 检验次数
        jyxm:"",   // 检验项目
        hphm:"",   // 号牌号码
        hpzl:"",   // 号牌种类
        clsbdh:"", //车辆的VIN
        gwjysbbh:"",//工位检验设备编号
      },
      target:{},//目标对象
      number:'',//检测线代号

     docmHeight: document.documentElement.clientHeight,  //默认屏幕高度
     showHeight:  '0',  //实时屏幕高度
     isResize:false, //默认屏幕高度是否已获取
     showcopyright:true,//是否显示底部tabbar
     tabBarshow:true,//是否显示底部tabbar 菜单
     userInfo:{},//用户信息
     qualifiedState:'',//记录总检测状态
     activeColor:'#30D900',
     JYY:'',//检验员姓名
     JYYsfzh:'',//检验员身份证号
     itemName:{},
     classObject:{
       qualified:false,
       disqualification:false,
     }
    }
  },
  mounted() {
    console.log(this.$store.getters.getCookie)
    document.querySelector('body').setAttribute('style', 'background-color:#F5F5F5');
    const date=new Date('2021-01-01');
    const nowdate=new Date();
    if(nowdate.getTime()<date.getTime()){
        this.tabBarshow=false;
        // this.tabBarshow=true;
    }else{
        this.tabBarshow=true;
    }
       // window.onresize监听页面实时高度的变化
    window.onresize = ()=>{
        return(()=>{
            this.showHeight = document.body.clientHeight;
            console.log( this.showHeight,this.docmHeight)
        })()
    };

    this.timer = setInterval(this.startTimer, 1000);
    this.carData=this.$store.getters.getcarData;
    console.log(this.$store.getters.getwgTag)
    this.itemtype=this.$store.getters.getitemtype;
    this.JYY=this.$store.getters.getuserInfo.yhxm;//当前项目检验员
    this.JYYsfzh = this.$store.getters.getuserInfo.sfzh.slice(12);//身份证号截取后6位
    console.log(this.JYYsfzh)
    this.number=this.$store.getters.getlineNum;//检测线代号
    this.itemName=this.$store.getters.getState;//当前的检验项目

    this.Start();
  },
  beforeDestroy() {
    document.querySelector('body').removeAttribute('style')
  },
  destroyed () {
    clearInterval(this.timer);
    },
computed: {
     // 号牌种类
     hpzl(item) {
        return function(item){
          if(item.hpzl=='01'){
            return '大型汽车'
          }else if(item.hpzl=='02'){
            return '小型汽车'
          }else if(item.hpzl=='03'){
            return '使馆汽车'
          }else if(item.hpzl=='04'){
            return '领馆汽车'
          }else if(item.hpzl=='16'){
            return '教练汽车'
          }
        }
      },
     // 检验项目类型
     itemTitle(value){
       return function (value) {
         if(value=='F1'){
           return '外观检测';
         }else if(value=='NQ'){
           return '联网查询';
         }else if(value=='UC'){
           return '唯一性检查';
         }else if(value=='DC'){
           return '底盘动态';
         }else if(value=='R'){
           return '路试检查';
         }
       }
     },
      // 检验项目类型
     itemJCY(value){
       return function (value) {
         if(value=='F1'){
           return '外检员';
         }else if(value=='NQ'){
           return '检验员';
         }else if(value=='UC'){
           return '检验员';
         }else if(value=='DC'){
           return '检验员';
         }else if(value=='R'){
           return '路试员';
         }
       }
     },
    //  开始项目检测
    itemStarts(value){
      return function (value) {
        if(value=='F1'){
           return '外观';
         }else if(value=='NQ'){
           return '联网';
         }else if(value=='UC'){
           return '唯一性';
         }else if(value=='DC'){
           return '底盘';
         }else if(value=='R1,R2'){
           return '行车,驻车';
         }else if(value=='R1'){
           return '行车';
         }else if(value=='R2'){
           return '驻车';
         }
      }
    }

  },
watch: {
    showHeight:function() {
        if(this.docmHeight > this.showHeight){ //如果页面默认高度大于页面的实时高度
            this.showcopyright=false
        }else{
            this.showcopyright=true
        }
    },
   },
methods: {
// 接收子组件传来的值 动态切换总判定的按钮颜色
childByValue(childByValue){
  console.log(childByValue)
  if(childByValue==1){
    this.classObject.qualified=true;
    this.classObject.disqualification=false;
  }else{
    this.classObject.disqualification=true;
    this.classObject.qualified=false;
  }
  },
  // 根据车牌类型切换背景色
hpzlclass(item){
        if(item=='02'){
         return 'bluecard';
        }else if(item=='01'||item=='15'){
          return 'yellowcard';
        }else if(item=='03'){
          return 'blackcard';
        }else if(item=='04'){
          return 'blackcard';
        }else if(item=='23'){
          return 'whitecard';
        }else if(item=='51'){
          return 'biggreencard';
        }else if(item=='52'){
          return 'greencard';
        }
      },
      /**
       *返回按钮
       */
onClickLeft(){
       this.$router.push({name:'car_select'});
       this.$store.dispatch('getImglength','');//返回的时候清空拍照的累加和
      },
// 计时开始
startTimer () {
    this.seconds += 1;
    if (this.seconds >= 60) {
    this.seconds = 0;
    this.minutes = this.minutes + 1;
    }
    if (this.minutes >= 60) {
    this.minutes = 0;
    this.hour = this.hour + 1;
    }
    this.times = (this.minutes < 10 ? '0' + this.minutes : this.minutes) + ':' + (this.seconds < 10 ? '0' + this.seconds : this.seconds);
   //  console.log(this.$refs.startTimer.innerHTML)
    },
   // 项目开始
Start(){
     this.showoverlay=true;
     this.formData.hphm=this.carData.hphm;
     this.formData.hpzl=this.carData.hpzl;
     this.formData.jylsh=this.carData.jylsh;
     this.formData.jycs=this.carData.jycs;
     this.formData.jyjgbh=this.carData.jyjgbh;
     this.formData.clsbdh=this.carData.clsbdh;
     this.formData.jyxm=this.itemtype;
     this.formData.jcxdh=this.number;//检测线代号
     itemStart(this.itemtype,this.formData).then(res=>{
       console.log(res)
    if(res.data.success==1){
         this.vanslide='van-slide-left';
         this.transitionTitle='检测开始!';
         this.showoverlay=true;
         this.visible=true;
         setTimeout(() => {
           this.visible=false;
           this.showoverlay=false;
         }, 2000);
       }else{
        this.overlayTitle=res.data.result;
        this.showerr=true;
        alert('getInfo failed:'+res.data.result);

       }
     }).catch(err=>{
       console.log('err项目开始失败')
        // this.overlayTitle='未知错误!';
        this.showerr=true;
        // alert('未知错误')
     })
   },
// 数据上传前先先校验 照片是否已经上传
onUploadData(){
  if(this.itemtype=="F1"){
     const imglength=this.$store.getters.getImglength;
   console.log(imglength,this.$store.getters.getwgTag)
   if(this.$store.getters.getwgTag.listPhoto == null){
     this.uploadData();
   }else {
     if(imglength >= this.$store.getters.getwgTag.listPhoto.length){
        this.uploadData();
      }else{
        Dialog.alert({
          title: '提示',
          message: `<span style="color:#E21918;font-size:16px;">必须确保照片全部已上传才可提交</span>`,
          confirmButtonColor:'#22A1FF',
           }).then(() => {
            // Toast('请上传照片');
            });
      }
   }
  }else{
     this.uploadData();
  }

 },
// 数据上传
uploadData(){
      const target=this.$store.getters.getState;
        console.log(this.$store.getters.getuserInfo);
      target.jcxdh=this.$store.getters.getlineNum;//检测线代号追加
      // target.jyxm=this.itemtype;//检验项目类型
      console.log(this.$store.getters.getImglength)
      const qualified=this.$store.getters.getqualified;//总判定的状态 1 合格 2 不合格
      console.log(qualified)
      if(qualified=='1'){
        this.qualifiedState='合格';
        this.activeColor='#30D900';
      }else{
        this.qualifiedState='不合格';
        this.activeColor='#E21918';
      }
      console.log(target);
        Dialog.confirm({
        title: `确认上传数据?`,
        message: `<span style="font-size:18px;">检测结果：<span style="color:#6060DE">${this.qualifiedState}</span></span>`,
        closeOnClickOverlay:true,
        }).then(() => {
            this.uploadoverlay=true;
            this.loading=true;
            this.fileOk=false;
            clearInterval(this.timer);
          saveData(this.itemtype,target).then(res=>{
            console.log(res);
          if(res.data.success==1){
              this.loading=false;
              this.fileOk=true;
              setTimeout(() => {
              this.loading=false;
              this.fileOk=true;
              this.uploadoverlay=false;
              this.finish();
              }, 2000);
              this.$store.dispatch('getImglength','');//数据上传成功时候清空拍照的累加和
            }else{
              this.uploadoverlay=false;
              setTimeout(() => {
                // Toast(res.data.result);
                alert('getInfo failed:'+res.data.result);
              }, 1000);
            }
          }).catch(err=>{
            this.uploadoverlay=false;
            console.log('err保存外检结果失败')
            alert('未知错误');
          })
        })
        .catch(() => {
          // on cancel
        });
      },
// 项目结束
finish(){
     this.formData.hphm=this.carData.hphm;
     this.formData.hpzl=this.carData.hpzl;
     this.formData.jylsh=this.carData.jylsh;
     this.formData.jycs=this.carData.jycs;
     this.formData.jyjgbh=this.carData.jyjgbh;
     this.formData.clsbdh=this.carData.clsbdh;
     this.formData.jcxdh=this.$store.getters.getlineNum;//检测线代号
     this.formData.jyxm=this.itemtype;//检验项目类型
    itemEnd(this.itemtype,this.formData).then(res=>{
      console.log(res)
      if(res.data.success==1){
         this.transitionTitle='检测结束!';
         this.vanslide='van-slide-right';
         this.showoverlay=true;
         this.visible=true;
         setTimeout(() => {
           this.visible=false;
           this.showoverlay=false;
           this.$router.push({name:'car_select'})
         }, 3000);
      }else{
        alert('getInfo failed:'+res.data.result);
      }
    }).catch(err=>{
      console.log('err结束操作失败')
      alert('err:结束操作失败')
      // this.showerr=true;
    })
  }

  },
}
</script>
<style  scoped>
.navbar{
  font-size: 20px;
  font-weight: 600;
}
 .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .block {
    width: 70%;
    height:200px;
    background-color: #6060DE;
    text-align: center;
    padding-top: 15%;
    font-size: 25px;
    color: #fff;
  }
   .wrapper .block p:nth-child(1) {
    text-align: center;
    font-size: 40px;
    color: #FE0E0D;
   }
    .wrapper .block .uploadtitle{
      font-size:18px;
    }
  .wrapper .block .uploadtitle .font{
    font-size: 28px;
    vertical-align: middle;
    margin-right: 10px;
     }
   .wrapper .block  .fonts{
     font-size: 38px;
   }
   .wrapper .block p:nth-child(2) {
    text-align: center;
    font-size: 23px;
    color: #DD001B;
   }
    .wrapper .block p:nth-child(3) {
    text-align: center;
    font-size: 18px;
    color: #fff;
   }
    .wrapper .block p:nth-child(4) {
   position: absolute;
    font-size: 18px;
    left: 50%;
    top: 70%;
    transform: translateX(-50%);
    width: 40%;
    height: 45px;
    line-height: 45px;
    border: 1px solid #fff;
    border-radius: 10px;
   }
   .carinfobox{
     margin:0 auto;
     width: 338px;
     background-color: #fff;
     overflow: hidden;
     margin-bottom: 16px;
     margin-top: 46px;
     position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    margin-left: 50%;
    transform: translateX(-50%);
    border-bottom:1px solid #6060DE;
    border-radius: 10px;
   }
   .dialogbox{
    padding-left: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
    width: 100%;
  }
   .dialogbox p:nth-child(1){
     margin-top: 15px;
   }
  .dialogbox .name{
     margin-left: 48px;
   }
  .dialogbox p{
       font-size: 14px;
       font-weight: 600;
       color: #9E9E9E;
       /* margin-left: 30px; */

  }
  .dialogbox p span {
    display: inline-block;
    text-align: center;
    margin-left: 50px;
  font-weight: 600;
  color: #888888;
  }
  .van-tabbar-item__text span{
    font-size: 16px;
  }
  .transitionbox{
    width: 240px;
    height: 180px;
    background-color: rgb(96, 96, 222);
    position: fixed;
    top: 25%;
    left: 0;
    margin-left: 50%;
    transform: translateX(-50%);
    text-align: center;
    line-height: 200px;
    font-size: 25px;
    font-weight: 600;
    color: #fff;
    border-radius: 10px;
    z-index: 999;
  }
  .hphm{
    width: 260px;
    height:60px;
    font-size: 40px;
    line-height: 60px;
    /* background-image: url('../assets/image/yellow.png'); */
    background-size: 100% 100%;
    background-repeat: no-repeat;

}
.yellowcard {
  background-image: url('../assets/image/yellow.png');
  color:#000000;
}
.bluecard {
  background-image: url('../assets/image/blue.png');
  color:#fff;
}
.blackcard {
  background-image: url('../assets/image/black.png');
  color:#fff;
}
.whitecard {
  background-image: url('../assets/image/white.png');
  color:#000000;
}
.greencard {
  background-image: url('../assets/image/green.png');
  color:#000000;
}
.biggreencard {
  background-image: url('../assets/image/biggreen.png');
  color:#000000;
}
.dialogbox h1{
    text-align: center;
    margin: 20px 0 10px 0;
    font-weight: 700;
      margin-top: 0;
      margin-bottom:0;
}
.username{
  width:100%;
  margin: 0 auto;
  height: 30px;
  margin-top: 46px;
  line-height: 30px;
  z-index:99;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #F5F5F5;
  padding: 0 18px 0 18px;
    /* margin-left: 50%; */
    /* transform: translateX(-50%); */
}
.username p{
  font-size: 16px;
}
.number{
  margin:5px 34px 5px 0;
}
.jyy{
  margin:5px 0 5px 34px;
}
.disqualification{
  color: #E21918;
}
.qualified{
  color: #333333;
}
</style>
