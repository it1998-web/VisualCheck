<template>
  <div class="car_select">
    <!-- 顶部导航 -->
  <van-nav-bar @click-left="onClickLeft" @click-right="goJCjl" :fixed="true"   left-arrow>
  <template #right >
   <van-icon  name="clock-o" color="#6060DE" size="26" style="vertical-align: middle;"  />
  </template>
  <template #title>
        <span class="navbar">
          {{itemTitle(itemtype)}}待检列表
           <span class="number" v-if="number!==''">
            (<span style="color:#DD4F43">通道{{number}}</span>)
           </span>
        </span>
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
       <span style="float:left;"><span class="csys" v-bind:class="computedCsys(item.csys)"></span>流水号:{{item.jylsh}}</span>
       <span style="float:right;">第<span style="color:#E21918;margin-left:0;">{{item.jycs}}</span>次检测</span>
     </P>
    <h1 class="hphm"  v-bind:class="hpzlclass(item.hpzl)" style="margin-left: 50%;transform: translateX(-50%);">{{item.cptz}} {{item.cphm}}</h1>
    <P>{{item.cllx_str}}</P>
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
      <p><span>号牌种类：</span>{{carData.hpzl_str}}</p>
      <p><span>车身颜色：</span>{{carColor(carData.csys)}}</p>
      <p><span>检验流水号：</span>{{carData.jylsh}}</p>
      <p><span>识别码：</span>{{carData.clsbdh}}</p>
  </div>
</van-dialog>
</div>
</template>
<script>
import {NavBar,Search,Cell, CellGroup,Icon,List,Dialog,Toast,PullRefresh,Field,Calendar,DatetimePicker,ActionSheet,} from 'vant';
import {awaitList,onConfirm} from '@/api/login';
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
      classObject:{
        yellowcard:true,
        blue:false,
        black:false,
        white:false,
        green:false,
        biggreen:false,

      },
      formData:{
        pageNumber:1,//第几页
        pageSize:15,//每页条目
        totalCount:50,//总记录数
        keyWord:'',//关键字
        date1:'',//开始时间
        date2:'',//结束时间
      },
      carData:{},//车辆信息
      vehicleList:[
          // {hphm:'陕A 00000',type:'挂车',runningNum:32900118041700007},
          // {hphm:'陕A 00001',type:'小型汽车',runningNum:32900118041700007},
          // {hphm:'陕A 00002',type:'警车',runningNum:32900118041700007},
          // {hphm:'陕A 00003',type:'领事馆车',runningNum:32900118041700007},
          // {hphm:'陕A 00004',type:'小型新能源车',runningNum:32900118041700007},
          // {hphm:'陕A 00005',type:'大型新能源车',runningNum:32900118041700007},
      ],
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
  beforeRouteEnter(to, from, next) {
  next(vm => {
// 通过 `vm` 访问fetchData，将query参数name，传递过去，进行逻辑处理
// 如果是从上一页返回来的  就会利用当前页面上次跳转的时候的开始时间查询  目的是记住上次的浏览状态 roadtest
  if(from.name=='Charac_teristicOld'||from.name=='Charac_teristic'||from.name=='record_jcjl'||from.name=='RoadTest'||from.name=='Dynamic_Chassis'||from.name=='Identification'){
    console.log('从上一页Charac_teristicOld来的');
    console.log(vm.$store.getters.getDate1);
    vm.formData.date1=vm.$store.getters.getDate1;
  }else{
    const date=new Date();
    vm.formData.date1=myformatter(date);//页面加载获取当前时间作为查询的开始时间
  }
   console.log(vm.$route);//有值
});

},
  mounted() {
  document.querySelector('body').setAttribute('style', 'background-color:#F5F5F5');
  const date=new Date();
  this.formData.date2=myformatter(date);//页面加载获取当前时间作为查询的结束时间
  console.log(this.$store.getters.getitemtype);
  this.itemtype=this.$store.getters.getitemtype;//检验项目类型
  this.number=this.$store.getters.getlineNum;//外检通道编号
  console.log(this.$store.getters.getLinelist);
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
           return '外检';
         }else if(value=='NQ'){
           return '联网';
         }else if(value=='UC'){
           return '唯一性';
         }else if(value=='DC'){
           return '底盘动态';
         }else if(value=='R'){
           return '路试';
         }
       }
     },
carColor(value){
  return function (value) {
      if(value=='A'){
        return '白色';
      }else if(value=='B'){
        return '灰色';
      }else if(value=='C'){
        return '黄色';
      }else if(value=='D'){
        return '粉色';
      }else if(value=='E'){
        return '红色';
      }else if(value=='F'){
        return '紫色';
      }else if(value=='G'){
        return '绿色';
      }else if(value=='H'){
        return '蓝色';
      }else if(value=='I'){
        return '棕色';
      }else if(value=='J'){
        return '黑色';
      }
  }
},
},
methods: {
    // 动态切换车牌背景色
 hpzlclass(item){
        if(item=='02'){
         return 'bluecard';
        }else if(item=='01'||item=='15'||item=='07'||item=='16'){
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
    if(this.itemtype=='F1'){
      this.$router.push({name:'aisle'});
    }else{
      this.$router.push({name:'itemSelect'});
     }
   },
  // 获取待检列表
 onLoad(){
      this.loading=true,
      console.log('页面触底了');
    awaitList(this.itemtype,this.formData).then(res=>{
        console.log(res)
        if(res.data.success==1){
          this.formData.totalCount=res.data.tag.totalCount;
          //添加集合
          res.data.tag.list.forEach(item=>{
            item['cptz']=item.hphm.slice(0,2);
            item['cphm']=item.hphm.slice(2);
            this.vehicleList.push(item);
            })
          if(this.vehicleList.length>=this.formData.totalCount){
             this.finished=true;
           }else{
            this.formData.pageNumber+=1; //每次页面触底页码都会自增 1
          }
        }else{
          // Toast(res.data.result);
          if(res.data.result=='未登录或登录超时'){
            Dialog.alert({
               message: `<span>未登录或登录超时请重新登录</span>`,
               }).then(() => {
                 window.localStorage.removeItem('token');
                 this.$router.push({name:'login'});
                });
          }else{
             alert('getInfo failed:'+res.data.result);
          }
        }
        this.loading=false;
      }).catch(err=>{
        console.log('err获取待检列表失败');
        alert('未知错误:获取待检列表失败')
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
  this.$store.dispatch('getDate1',this.formData.date1);//页面跳转记住列表查询的开始时间
     },

//开始检测
Startdetection(item){
  console.log(item)
  this.showdialog=true;
  this.carData=item;
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
     this.form.jcxdh=this.number;

     onConfirm(this.itemtype,this.form,this.$store.getters.getCookie).then(res=>{
          console.log(res);
          var Tag={};
     if(res.data.success==1){
             Tag=res.data.tag;
             window.localStorage.setItem('key',this.itemtype);
             this.$router.push({name:'testMain'});
             this.$store.dispatch('getcarData',this.carData);
             this.$store.dispatch('getwgTag',Tag);//检测项目参数
             this.$store.dispatch('getState',Tag.result);
             this.$store.dispatch('getDate1',this.formData.date1);//页面跳转记住列表查询的开始时间

      }else{
        // Toast("出错啦"+res.data.result);
        alert("出错啦:"+res.data.result);
        }
      }).catch(err=>{
          console.log('err获取检测项目失败');
      })
    },

// 下拉刷新
onRefresh(){
this.formData.pageNumber=1;
// const date=new Date();
// this.formData.date1=myformatter(date);//页面加载获取当前时间作为查询的开始时间
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
  height:150px;
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
    /* margin-bottom:10px; */
    text-align: center;
  }
  .dialogbox{
    height: 260px;
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
.after{
  display: inline-block;
  width: 5px;
  height: 15px;
  line-height: 15px;
  margin-right:5px;
  background-color: #6060DE;
}
.liushui span:nth-child(2){
  margin-right: 10px;
}
.csys{
  display: inline-block;
  width: 8px;
  height: 15px;
  margin-right:3px;
  border-radius:3px;
 vertical-align: middle;
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
.purple{
  background-color: #884799;
}
.green{
  background-color: #6FBA43;
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
</style>
