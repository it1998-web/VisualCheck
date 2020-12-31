<template>
  <div class="car_select">
    <!-- 顶部导航 -->
  <van-nav-bar @click-left="onClickLeft"  :fixed="true"   left-arrow>
  <template #title>
        <span class="navbar">{{itemTitle(itemtype)}}记录</span>
  </template>
  </van-nav-bar>
  <!-- 搜索框 -->
  <van-search
  v-model="value"
  placeholder="请输入号牌号码/检验流水号"
  input-align="center"
  style="margin-top:60px;"
  @search="onSearch"
 >
 <template #left>
    <van-field :readonly="true" @click="onSelectTime" style="background-color: #F7F8FA;width:30%;flex: none;" v-model="formData.date1"  placeholder="请选择时间" />
 </template>
  </van-search>
<!-- 选择时间 -->
<van-action-sheet v-model="showtime" :closeable="false"  title="选择时间">
  <van-datetime-picker
   v-model="currentDate"
   type="date"
  :min-date="minDate"
  :max-date="maxDate"
  @confirm="OnconfirmDate"
  @cancel="showtime=false"
  />
</van-action-sheet>
<!-- 车辆选择列表 -->
<van-pull-refresh success-text="刷新成功" v-model="isLoading" @refresh="onRefresh">
  <van-list
  v-model="loading"
  :finished="finished"
  :finished-text="finishedtext"
  offset="100"
  :error.sync="error"
  error-text="出错了呢，请点击重新加载"
  @load="onLoad"
  :immediate-check="check"
>
<ul>
  <li class="carlist" @click="Startdetection(item)" v-for="(item,i) in vehicleList" :key="i">
    <P class="liushui">
       <span style="float:left;"><span class="after"></span>流水号:{{item.jylsh}}</span>
       <span style="float:right;">第<span style="color:#E21918;margin-left:0;">{{item.jycs}}</span>次检测</span>
     </P>
    <h1 class="hphm"  v-bind:class="hpzlclass(item.hpzl)" style="margin-left: 50%;transform: translateX(-50%);">{{item.cptz}} {{item.cphm}}</h1>
    <!-- <P>{{item.jylsh}} 第<span style="color:red;">{{item.jycs}}</span>次检测</P> -->
    <!-- <P class="jcjl"><span class="csys" v-bind:class="computedCsys(item.csys)"></span>{{item.hpzl_str}}</P> -->
    <P class="jcjl">检测时间：{{item.jcsj}}</P>
    <P class="jcjl">检测时长：{{item.jcsc}}</P>
    <P class="jcjl">检测结果：<span  v-bind:class="item.jyjg==1?'greentext':'redtext'">{{item.jyjg==1?'合格':'不合格'}}</span></P>
  </li>
</ul>
</van-list>
</van-pull-refresh>
<!-- 车辆检测对话框 -->
<van-dialog :close-on-click-overlay="true" v-model="showdialog" @confirm="clickconfirm" confirm-button-color="#6060DE" show-cancel-button>
  <template #title>
    <p style="font-size:19px; font-weight: 600!important;">车辆参数</p>
  </template>
  <div class="dialogbox">
      <p><span>号牌号码：</span>{{carData.hphm}}</p>
      <p><span>号牌种类：</span>{{hpzl(carData)}}</p>
      <p><span>检验流水号：</span>{{carData.jylsh}}</p>
      <p><span>识别码：</span>{{carData.clsbdh}}</p>
  </div>
</van-dialog>
</div>
</template>
<script>
import {NavBar,Search,Cell, CellGroup,Icon,List,Dialog,Toast,PullRefresh,Field,Calendar,DatetimePicker,ActionSheet,} from 'vant';
import {awaitList,onConfirm,RecordList} from '@/api/login';
import {myformatter} from '@/router/config/Utility';
export default {
  name:'car_select',
  components:{
    [NavBar.name]:NavBar,
    [Search.name]:Search,
    [Cell.name]:Cell,
    [CellGroup.name]:CellGroup,
    [Icon.name]:Icon,
    [List.name]:List,
    [Dialog.Component.name]: Dialog.Component,
    [Toast.name]: Toast,
    [PullRefresh.name]: PullRefresh,
    [Field.name]: Field,
    [Calendar.name]: Calendar,
    [DatetimePicker.name]: DatetimePicker,
    [ActionSheet.name]: ActionSheet,
  },
  data() {
    return {
      minDate: new Date(2015, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
      value:'',//搜索框输入的值
      itemtype:'',//检测项目类型
      showtime:false,// 是否显示时间选择弹框
      showdialog: false,
      finished:false,//是否已经加载完成
      loading:false,//是否处于加载状态
      error:false,//请求失败 是否重新加载
      isLoading:false,//下拉刷新
      finishedtext:'------ 没有更多了呢 ------',
      check:false,//页面滚动位置检查
      formData:{
        pageNumber:1,//第几页
        pageSize:15,//每页条目
        totalCount:50,//总记录数
        keyWord:'',//关键字
        date1:'',//开始时间
        date2:'',//结束时间
      },
      carData:{},//车辆信息
      vehicleList:[],
      form:{ /*项目开始参数 */
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
      time:'',
      number:'',//外检通道编号
    }
  },
  mounted() {
  document.querySelector('body').setAttribute('style', 'background-color:#F5F5F5');
  const date=new Date();
  this.formData.date2=myformatter(date);
  this.formData.date1=myformatter(date);
  console.log(this.$store.getters.getitemtype);
  this.itemtype=this.$store.getters.getitemtype;//检验项目类型
  this.number=this.$store.getters.getlineNum;//外检通道编号
  this.onLoad();
  },
  beforeDestroy() {
    document.querySelector('body').removeAttribute('style');
  },
  computed:{
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
    },
  methods: {
    // 动态切换车牌背景色
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
      // 一个方法计算车身颜色
   computedCsys(item){
     if(item=='A'){
        return 'white';
     }else if(item=='B'){
        return 'gray';
     }else if(item=='C'){
        return 'yellow';
     }else if(item=='D'){
        return 'pink';
     }else if(item=='E'){
        return 'red';
     }else if(item=='F'){
        return 'purple';
     }else if(item=='G'){
        return 'green';
     }else if(item=='H'){
        return 'blue';
     }else if(item=='I'){
        return 'brown';
     }else if(item=='J'){
        return 'black';
     }
   },
      /**
       *返回按钮
       */
  onClickLeft(){
      this.$router.push({name:'car_select'});
   },
  // 获取待检列表
onLoad(){
      this.loading=true,
      console.log('页面触底了');
    RecordList(this.itemtype,this.formData).then(res=>{
        console.log(res)
        if(res.data.success==1){
          this.formData.totalCount=res.data.tag.totalCount;
          //添加集合
          res.data.tag.list.forEach(item=>{
            item['cptz']=item.hphm.slice(0,2);
            item['cphm']=item.hphm.slice(2);
            const date=item.kssj.split('T'); // 2020-12-19 T 17:26:25 先截取 T
            item['jcsj']=date[0]+" "+date[1]; //再拼接
            this.vehicleList.push(item);
            // console.log(kssj.getTime());
            })
            console.log(this.vehicleList)
          if(this.vehicleList.length>=this.formData.totalCount){
             this.finished=true;
           }else{
            this.formData.pageNumber+=1; //每次页面触底页码都会自增 1
          }
        }else{
          Toast(res.data.result);
        }
        this.loading=false;
      }).catch(err=>{
        console.log('err获取待检列表失败')
      })

    },
// 选择时间
OnconfirmDate(value){
console.log(myformatter(value))
this.formData.date1=myformatter(value);//选择开始时间
this.showtime=false;
this.vehicleList=[];
this.formData.pageNumber=1;
this.onLoad();
},
onSelectTime(){
this.showtime=true;
},
// 通过关键字搜索
onSearch(){
    console.log(this.value)
    this.formData.keyWord=this.value.trim();
    this.vehicleList=[];
    this.formData.pageNumber=1;
    this.onLoad();
},
// 检测记录
goJCjl(){
  this.$router.push({name:'record_jcjl'})

     },

//开始检测
Startdetection(item){
  console.log(item)
  // this.carData=item;
  // this.showdialog=true;
},

// 确认开始检测 动态获取该车检测项目
  clickconfirm(){
     this.form.hphm=this.carData.hphm;
     this.form.hpzl=this.carData.hpzl;
     this.form.jylsh=this.carData.jylsh;
     this.form.jycs=this.carData.jycs;
     this.form.jyjgbh=this.carData.jyjgbh;
     this.form.clsbdh=this.carData.clsbdh;
     this.form.jyxm=this.$store.getters.getitemtype;
     onConfirm(this.itemtype,this.form).then(res=>{
          console.log(res);
          var Tag={};
     if(res.data.success==1){
             Tag=res.data.tag;
             window.localStorage.setItem('key',this.itemtype);
             this.$store.dispatch('getcarData',this.carData);
             this.$store.dispatch('getwgTag',Tag);
             this.$store.dispatch('getState',Tag.result);
             this.$router.push({name:'testMain'});
      }else{
        Toast("失败,数据未响应");
        }
      }).catch(err=>{
          console.log('err获取检测项目失败');
      })
    },

// 下拉刷新
onRefresh(){
this.formData.pageNumber=1;
    setTimeout(() => {
    this.finished = false;
    this.vehicleList=[];
    this.formData.keyWord="";
    this.value="";
    this.onLoad();
    this.isLoading=false;
    }, 1000);
}

  },
}
</script>
<style  scoped>
html,
body {
 height: 100%;
}
.carlist{
  height:220px;
  background-color: #fff;
  overflow: hidden;
  margin-bottom: 10px;
  border-radius: 15px;

}
.carlist:nth-child(1){
  margin-top: 10px;
}
.carlist h1{
    text-align: center;
    margin: 10px 0 10px 0;
    font-weight: 700;
    letter-spacing: 3px;
}
.carlist p {
    font-size: 16px;
    /* font-weight: 600; */
    color: #717171;
    margin-bottom:10px;
    /* text-align: center; */
  }
  .dialogbox{
    height: 220px;
    border-top: 2px dashed #6C6CE0;
    border-bottom: 2px dashed #6C6CE0;
    padding-left: 10px;
    margin-top: 10px;
    margin-bottom: 20px;
  }
   .dialogbox p:nth-child(1){
     margin-top: 18px;
   }
  .dialogbox p{
       margin-bottom:25px;
       font-size: 18px;
       font-weight: 600;

  }
  .dialogbox p span {
    display: inline-block;
    text-align: right;
    width:100px;
  font-size: 16px;
  font-weight: 600;
  color: #888888;
  }
  .van-dialog__header {
    font-size: 19px!important;
    font-weight: 600!important;
  }
  .navbar{
  font-size: 18px;
  font-weight: 600;
}
.number{
font-size:14px;
font-weight: none;
}
.hphm{
    width: 260px;
    height:60px;
    line-height: 60px;
    font-size:30px;
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
.liushui{
  width: 100%;
  height: 40px;
  line-height: 40px;
  border-bottom:1px solid #ccc;
}
.liushui span:nth-child(1){
  margin-left: 10px;
}
.liushui span:nth-child(2){
  margin-right: 10px;
}
.csys{
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 5px;
}
.white{
    background-color: #FFFFFF;
    border: 1px solid #000000;
}
.gray{
  background-color: #585858;
}
.yellow{
  background-color: #FFCE44;
}
.pink{
   background-color: #E46AA3;
}
.red{
  background-color: #E21918;
}
.redtext{
  color:#E21918;
}
.purple{
  background-color: #884799;
}
.green{
  background-color: #6FBA43;
}
.greentext{
   color: #6FBA43;
}
.blue{
  background-color: #4662D9;
}
.brown{
   background-color: #5A4942;
}
.black{
  background-color: #000000;
}
.carlist .jcjl{
  margin-left: 60px;
}
</style>
