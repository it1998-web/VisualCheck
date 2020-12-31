<template>
  <div class="RoadTest">
    <div class="tezheng">
      <!-- 引车员信息
       <div class="ycyinfo">
          <van-field style="color:#E21918;border-top:10px solid #f5f5f5" :readonly="true" v-model="qualified" label="总判定" placeholder="" />
       </div> -->

      <!-- R1 -->
       <van-cell-group   title="行车路试" style="border-bottom: 15px solid #f5f5f5;">
         <van-cell  center title="行车路试制动判定" v-show="Rresult.lszdpd==0?false:true">
            <template #right-icon>
            <van-switch :inactive-color="swictcColor(Rresult.lszdpd)" @change="changeSwitch(Rresult.lszdpd,'lszdpd')" :disabled="Rresult.lszdpd==0?true:false"   v-model="Rresult.lszdpd==1?true:false" size="24" />
            </template>
         </van-cell>

          <van-cell-group class="cellgroup" >
              <!-- <div class="fieldTitle">空载制动距离(mm)</div> -->
          <van-field :clearable="true" v-model="Rresult.xckzzdjl" label="空载制动距离(mm)" type="number"  maxlength="4" placeholder="空载制动距离" />
         </van-cell-group>

         <van-cell-group class="cellgroup" >
              <!-- <div class="fieldTitle"></div> -->
          <van-field :clearable="true" v-model="Rresult.xckzmfdd" label="空载制动MFDD(m/s²)" type="number"  maxlength="32" placeholder="空载制动MFDD" />
         </van-cell-group>

         <van-cell-group class="cellgroup" >
              <!-- <div class="fieldTitle"></div> -->
          <van-field :clearable="true" v-model="Rresult.zdcsd" label="制动初速度" type="number"  maxlength="3" placeholder="制动初速度" />
         </van-cell-group>

         <van-cell-group class="cellgroup" >
              <!-- <div class="fieldTitle">制动协调时间</div> -->
          <van-field :clearable="true" v-model="Rresult.zdxtsj" label="制动协调时间(s)" type="number"  maxlength="32" placeholder="制动协调时间" />
         </van-cell-group>

         <van-cell-group class="cellgroup" >
              <!-- <div class="fieldTitle"></div> -->
          <van-field v-model="zdwdx" label="制动稳定性"   maxlength="32" >
             <template #input>
          <van-dropdown-menu >
            <van-dropdown-item @change="changezdwdx" v-model="value2" :options="optionStability" />
          </van-dropdown-menu>
           </template>
          </van-field>
         </van-cell-group>

          <div style="border: 1px solid hsla(0,0%,100%,.5 ) ;overflow: hidden;">
            <van-button :disabled="R1button" @click="StartItem('R1')" type="primary"  style="float:left;margin-left:10px;"  class="button" >
              <i class="iconfont" style="margin-right:5px;">&#xe6a0;</i>
               {{startBtntextR1}}
            </van-button>
            <van-button :disabled="disabledbtnR1" @click="OntestStop('R1')" type="info" style="float:right;margin-right:10px;" class="button">
              <i class="iconfont" style="margin-right:5px;">&#xe6ec;</i>
                {{endBtntextR1}}
            </van-button>
          </div>
          <!-- 拍照 -->
        <div class="photoBtn" style="border-top: 15px solid #f5f5f5;" >
        <van-cell class="cellgroup">
        <van-button round type="primary" class="button" style="float:left;" @click="Photo('0341','R1')"><i class="iconfont" style="margin-right:5px;">&#xe613;</i>开始</van-button>
        <van-button round type="info"  class="button" style="float:right;" @click="Photo('0343','R1')"><i class="iconfont" style="margin-right:5px;">&#xe613;</i>结束</van-button>
       </van-cell>
      </div>
       </van-cell-group>
       <!-- R2 -->
       <van-cell-group   title="驻车路试" style="border-bottom: 15px solid #f5f5f5;margin-bottom:50px;">
          <van-cell  center title="驻车制动判定" v-show="Rresult.lszczdpd==0?false:true">
            <template #right-icon>
            <van-switch :inactive-color="swictcColor(Rresult.lszczdpd)" @change="changeSwitch(Rresult.lszczdpd,'lszczdpd')"    v-model="Rresult.lszczdpd==1?true:false" size="24" />
           </template>
         </van-cell>

          <van-cell-group class="cellgroup" >
          <van-field :clearable="true" v-model="Rresult.lszctlsj" label="驻车停留时间(秒)" type="digit"  maxlength="32" placeholder="驻车停留时间" />
         </van-cell-group>

          <!-- 驻车坡度 -->
         <van-cell-group class="cellgroup" >
              <!-- <div class="fieldTitle">制动协调时间</div> -->
          <van-field v-model="zcpd"  label="驻车坡度(%)"  maxlength="32" placeholder="驻车坡度(%)">
            <template #input>
          <van-dropdown-menu >
            <van-dropdown-item  @change="changeItem" v-model="value1" :options="optionSlope" />
          </van-dropdown-menu>
           </template>
          </van-field>
         </van-cell-group>

          <div style="border: 1px solid hsla(0,0%,100%,.5 ) ;overflow: hidden;">
            <van-button :disabled="R2button" @click="StartItem('R2')" type="primary" style="float:left;margin-left:10px;"  class="button">
              <i class="iconfont" style="margin-right:5px;">&#xe6a0;</i>
              {{startBtntextR2}}
            </van-button>
            <van-button :disabled="disabledbtnR2" @click="OntestStop('R2')" type="info" style="float:right;margin-right:10px;" class="button">
              <i class="iconfont" style="margin-right:5px;">&#xe6ec;</i>
              {{endBtntextR2}}
            </van-button>
          </div>
          <!-- 拍照 -->
          <div class="photoBtn" style="border-top: 15px solid #f5f5f5;" >
        <van-cell class="cellgroup">
        <van-button round type="primary" class="zhuchebutton" style="float:left;" @click="Photo('0345','R2')"><i class="iconfont" style="margin-right:5px;">&#xe613;</i>拍照</van-button>
       </van-cell>
      </div>
       </van-cell-group>
    </div>
  </div>
</template>
<script>
import {Tabbar, TabbarItem,NavBar,Overlay,Toast,Dialog,Cell, CellGroup,Switch,Field,ActionSheet,Picker,Button,DropdownMenu, DropdownItem  } from 'vant';
import {itemStart,saveData,itemEnd,takePhoto} from '@/api/login';
import { getDate } from "@/router/config/Utility";
export default {
name:'RoadTest',
components:{
    [Tabbar.name]:Tabbar,
    [TabbarItem.name]:TabbarItem,
    [NavBar.name]:NavBar,
    [Overlay.name]:Overlay,
    [Dialog.name]:Dialog,
    [Cell.name]:Cell,
    [CellGroup.name]:CellGroup,
    [Switch.name]:Switch,
    [Field.name]:Field,
    [ActionSheet.name]:ActionSheet,
    [Picker.name]:Picker,
    [Button.name]:Button,
    [DropdownMenu.name]:DropdownMenu,
    [DropdownItem.name]:DropdownItem,
    [Toast.name]:Toast,
  },
data() {
    return {
      active:true,
      checked:true,
      F1Result:true,
      disabled:false,//开关是否禁用
      disabledbtnR1:true,//是否按钮禁用结束
      disabledbtnR2:true,//是否按钮禁用结束
      R1button:true,
      R2button:true,
      startBtntextR1:'开始',
      endBtntextR1:'结束',
      startBtntextR2:'开始',
      endBtntextR2:'结束',
      Rresult:{},//路试检测参数
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
        itemtype:'',
        number:'',
      },
       zcpd:'15%',
       value1: 1,
       value2: 1,
       optionStability: [
        { text: "未跑偏", value: 1 },
        { text: "左跑偏", value: 2 },
        { text: "右跑偏", value: 3 }
      ],
       optionSlope: [
        { text: "15%", value: 1 },
        { text: "20%", value: 0 }
      ],
      judgesum:{},//判定项集合
      qualified:'不合格',//检验结果
    }
  },
mounted () {
    console.log(this.$store.getters.getwgTag);
     const Tag=this.$store.getters.getwgTag;//外检参数
     console.log(Tag)
     //  要检的项目参数
     this.Rresult=Tag.result;
     this.Rresult.lsy=this.$store.getters.getuserInfo.yhxm;//路试员姓名
     this.itemtype=this.$store.getters.getitemtype;//检验项目类型
     this.number=this.$store.getters.getlineNum;//检测线代号
     console.log(this.carData)
     /* R1 R2 开始项目和结束项目 要传的参数  一次赋值多次使用*/
     this.carData=this.$store.getters.getcarData;
     this.formData.hphm=this.carData.hphm;
     this.formData.hpzl=this.carData.hpzl;
     this.formData.jylsh=this.carData.jylsh;
     this.formData.jycs=this.carData.jycs;
     this.formData.jyjgbh=this.carData.jyjgbh;
     this.formData.clsbdh=this.carData.clsbdh;
     this.formData.jcxdh=this.$store.getters.getlineNum;
    //  this.DCResult.dpdtjyysfzh=this.$store.getters.getuserInfo.sfzh;
     this.itemtype=this.$store.getters.getitemtype;//检验项目类型
     this.$store.dispatch('getqualified','');//总检验结果是否合格
     /* 驻车坡度和驻车稳定性初始赋值为 1 因为后台返回的是 null */
     this.Rresult.zcpd='1';
     this.Rresult.zdwdx='1';
    //还是 初始赋值为 2 不合格  因为后端返回的还是null
     this.Rresult.lszczdpd='2';
     this.Rresult.lszdpd='2';
     this.itemShow();
  },
computed: {
    swictcColor(value){
       return function (value) {
         if(value==1){
           return '#B1B1B1'
         }else{
           return  '##F5F5F5'
         }
       }
     },
    // 制动稳定性计算

  },
methods: {
zdwdx(value){
         if(value==1){
           return '未跑偏'
         }else if(value==2){
           return '左跑偏'
         }else{
           return '右跑偏'
         }
    },

//  驻车坡度
changeItem(value){
   console.log(value)
  this.Rresult.zcpd=value;
 },
//  驻车稳定性
changezdwdx(value){
   console.log(value)
    this.Rresult.zdwdx=value;
 },
// 按钮切换时触发
changeSwitch(value,r){
      console.log(value,r);
        if(value=='1'){
          this.Rresult[r]='2';
          this.judgesum[r]="2";
        }else if(value==null||value=='2'){
          this.Rresult[r]='1';
          this.judgesum[r]="1";
        }
         var stateList=[];//一个数组 用来存对象的属性值 value
        for(let key in  this.judgesum){
             stateList.push(this.judgesum[key]);//循环出属性值追加到数组中
        }
        // console.log(stateList);
        if (stateList.some(item => item == '2')){ //查找数组中是否包含 2 为不合格 1 为合格
          // console.log("包含2")
          this.qualified='不合格';
          stateList=[]; //每次按钮点击都需要从新更新一下这个数组
          this.$store.dispatch('getqualified','2');
          }else{
            // console.log('不包含2')
          this.qualified='合格';
          this.$store.dispatch('getqualified','1');
          }
         this.$emit('childByValue', this.$store.getters.getqualified);//向父组件 TestMain 传值
         this.Rresult.lsjg=this.$store.getters.getqualified;
        console.log(this.judgesum)
     console.log(this.Rresult)
    this.$store.dispatch('getState',this.Rresult);
     },
// 开始项目 R1 R2
StartItem(value){
   console.log(value)
   this.formData.jyxm=value;
    itemStart(value,this.formData).then(res=>{
      console.log(res)
      if(res.data.success==1){
        Toast.success('开始项目:'+res.data.result);
        //开始成功 结束按钮可用 开始按钮禁用 防止用户频繁点击
        if(value=='R1'){
          this.disabledbtnR1=false;
          this.R1button=true;
          this.startBtntextR1='已开始';
        }else{
          this.disabledbtnR2=false;
          this.R2button=true;
          this.startBtntextR2='已开始';
        }

      }else{
        Toast.fail('失败:'+res.data.result);
      }
    }).catch(err=>{
      console.log('项目开始失败')
      alert('服务器错误')
    }
    )
 },

// 项目结束时做一个校验 输入框不能为空才可结束
OntestStop(value){
  console.log(value)
  this.formData.jyxm=value;
  if(value=='R1'){
    if(this.Rresult.xckzmfdd.trim().length==0){
       Toast('空载制动MFDD不能为空');
    }else if(this.Rresult.zdcsd.trim().length==0){
      Toast('制动初速度不能为空');
    }else if(this.Rresult.zdxtsj.trim().length==0){
      Toast('制动协调时间不能为空');
    }else{
       this.StopItem(value);
    }
  }else{
    if(this.Rresult.lszctlsj.trim().length==0){
      Toast('驻车停留时间不能为空')
    }else {
      this.StopItem(value);
    }
  }
},
//  结束项目 R1 R2
StopItem(value){
  itemEnd(value,this.formData).then(res=>{
    console.log(res)
    // 结束成功 结束按钮禁用
    if(res.data.success==1){
        Toast.success('结束项目:'+res.data.result);
        if(value=='R1'){
          this.disabledbtnR1=true;
          this.endBtntextR1='已结束';
        }else{
          this.disabledbtnR2=true;
          this.endBtntextR2='已结束';
        }

      }else{
        Toast.fail('失败:'+res.data.result);
      }
  }).catch(err=>{
    console.log('结束项目失败')
  })
},
// R1 R2 项目 是否可用
itemShow(){
 if(this.Rresult.jyxm=='R1,R2'){
      this.R1button=false;
      this.R2button=false;
 }else if(this.Rresult.jyxm=='R1'){
      this.R1button=false;
 }else if(this.Rresult.jyxm=='R2'){
      this.R2button=false;
 }
},
// 拍照
 Photo(code,itemtype) {
      var veh = this.$store.getters.getcarData;
      const value = new Date();
      const nowdate = getDate(value);
      var target = {
        //号牌号码 可空 在用车不可空
        hphm: veh.hphm,
        //号牌种类 可空 在用车不可空
        hpzl: veh.hpzl,
        //车辆的VIN 不可空
        clsbdh: veh.clsbdh,
        //安检机构编号 不可空
        jyjgbh:veh.jyjgbh,
        //检验流水号(监管部门) 不可空
        jylsh:veh.jylsh,
        //检验线代号 可空
        jcxdh:  this.$store.getters.getlineNum,
        //检验次数 不可空
        jycs: veh.jycs,
        //工位检验设备编号 可空 线内检验时不可空
        gwjysbbh: "",
        //检验项目 不可空
        jyxm: itemtype,
        //拍照触发时间
        pssj: nowdate,
        //照片种类
        zpzl: code,
      };

      takePhoto(target)
        .then((res) => {
          console.log(res);
          if (res.data.success == 1) {
            alert("拍照成功");
          } else {
           alert("拍照失败"+res.data.result);
          }
        })
        .catch((err) => {

          alert("未知错误"+err);
        });
    },
  }
}
</script>
<style >
.RoadTest{
  margin-top:200px;
}
.tezheng{
  margin-top: 16px;
  margin:0 auto;
  width: 338px;
  background-color: #fff;
}
.cellgroup{
  /* border-bottom: 10px solid #f5f5f5; */
}
.van-cell{
  font-size: 16px;
  font-weight: 600;
}

.celllabel{
  font-size: 16px;
}
.van-field__control{
  font-size: 16px !important;
}
.fieldTitle{
    font-size: 16px;
    font-weight: 600;
    margin-left: 14px;
    margin-top: 5px;
    color: #767778;
}
.input{
width: 28%;
border:1px solid #E6E6E6;
height: 40px;
box-shadow: 0px 0px 6px #888888;
border-radius: 8px;
}
.van-cell-group__title{
    font-size: 18px;
    font-weight: 600;
    text-align: center;
    color: #6060DE;
}
.van-field__label{
  width:50%!important;
}
.button{
  /* // width: 25%; */
 border-radius: 10px;
 margin-bottom: 10px;
}
.van-button__text{
  /* // font-size: 18px; */
}
.van-dropdown-menu{
  width: 50%;
}
.van-cell .van-field.van-field__label{
  width: 50%!important;
}
 .van-dropdown-menu__bar {
  box-shadow: none!important;
  width: 100%!important;
}
.ycyinfo{
  position: fixed;
    top: 170px;
    z-index: 99;
    margin: 0 auto;
    width: 338px;
}
.photoBtn{
  width: 100%;
}
.zhuchebutton{
  margin-left:50%;
  transform: translateX(-50%);
}
</style>
