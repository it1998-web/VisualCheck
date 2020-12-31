<template>
  <div class="Charac_teristic">
    <div class="tezheng" >
    <!-- 新国标 特征参数-->
    <!-- 引车员信息 -->
      <div class="ycyinfo" style="border-top: 15px solid #f5f5f5;">
      <!-- <van-field style="color:#323233;" :readonly="true" v-model="F1Result.wgjcjyysfzh" label="" placeholder="外检员身份证号">
         <template #left-icon>
          <span style="color:#323233;margin-right:10px;font-size:18px;">身份证:</span>
        </template>
      </van-field> -->
      <!-- 总判定 -->
       <van-field style="color:#E21918;" :readonly="true" v-model="qualified" label="总判定" placeholder="" />
       </div>
   <van-cell-group  title="特征参数" style="border-bottom: 15px solid #f5f5f5;">
      <van-cell  center title="外廓尺寸" v-show="F1Result.rwkcc==0?false:true">
       <template #right-icon>
         <van-switch :inactive-color="swictcColor(F1Result.rwkcc)" @change="changeSwitch(F1Result.rwkcc,'rwkcc')" :disabled="F1Result.rwkcc==0?true:false"  active-color="#34C759" v-model="F1Result.rwkcc==1?true:false" size="24" />
       </template>
       </van-cell>
      <van-cell  center title="轴距" v-show="F1Result.rzj==0?false:true">
       <template #right-icon>
         <van-switch :inactive-color="swictcColor(F1Result.rzj)" @change="changeSwitch(F1Result.rzj,'rzj')" :disabled="F1Result.rzj==0?true:false"  active-color="#34C759" v-model="F1Result.rzj==1?true:false" size="24" />
       </template>
     </van-cell>
      <van-cell  center title="核定载人数和座椅布置" v-show="F1Result.rhdzrs==0?false:true">
       <template #right-icon>
         <van-switch :inactive-color="swictcColor(F1Result.rhdzrs)" @change="changeSwitch(F1Result.rhdzrs,'rhdzrs')" :disabled="F1Result.rhdzrs==0?true:false"  active-color="#34C759" v-model="F1Result.rhdzrs==1||0?true:false" size="24" />
       </template>
     </van-cell>
     <van-cell  center title="栏板高度" v-show="F1Result.rlbgd==0?false:true">
       <template #right-icon>
         <van-switch :inactive-color="swictcColor(F1Result.rlbgd)" @change="changeSwitch(F1Result.rlbgd,'rlbgd')" :disabled="F1Result.rlbgd==0?true:false"  active-color="#34C759" v-model="F1Result.rlbgd==1?true:false" size="24" />
       </template>
     </van-cell>
      <van-cell  center title="悬架" v-show="F1Result.rhzgbthps==0?false:true">
       <template #right-icon>
         <van-switch :inactive-color="swictcColor(F1Result.rhzgbthps)" @change="changeSwitch(F1Result.rhzgbthps,'rhzgbthps')" :disabled="F1Result.rhzgbthps==0?true:false"  active-color="#34C759" v-model="F1Result.rhzgbthps==1?true:false" size="24" />
       </template>
     </van-cell>
      <van-cell  center title="客车出口" v-show="F1Result.rkcyjck==0?false:true">
       <template #right-icon>
         <van-switch :inactive-color="swictcColor(F1Result.rkcyjck)" @change="changeSwitch(F1Result.rkcyjck,'rkcyjck')" :disabled="F1Result.rkcyjck==0?true:false"  active-color="#34C759" v-model="F1Result.rkcyjck==1?true:false" size="24" />
       </template>
     </van-cell>
      <van-cell  center title="客车乘客通道和引道" v-show="F1Result.rkccktd==0?false:true">
       <template #right-icon>
         <van-switch :inactive-color="swictcColor(F1Result.rkccktd)" @change="changeSwitch(F1Result.rkccktd,'rkccktd')" :disabled="F1Result.rkccktd==0?true:false"  active-color="#34C759" v-model="F1Result.rkccktd==1?true:false" size="24" />
       </template>
     </van-cell>
      <van-cell  center title="货箱/罐体" v-show="F1Result.rhx==0?false:true">
       <template #right-icon>
         <van-switch :inactive-color="swictcColor(F1Result.rhx)" @change="changeSwitch(F1Result.rhx,'rhx')" :disabled="F1Result.rhx==0?true:false"  active-color="#34C759" v-model="F1Result.rhx==1?true:false" size="24" />
       </template>
     </van-cell>
   </van-cell-group>
   <!-- 车辆外观 -->
   <van-cell-group title="车辆外观" style="border-bottom: 15px solid #f5f5f5;">
      <van-cell  center title="车身外观" v-show="F1Result.rcswg==0?false:true">
       <template #right-icon>
         <van-switch :inactive-color="swictcColor(F1Result.rcswg)" @change="changeSwitch(F1Result.rcswg,'rcswg')" :disabled="F1Result.rcswg==0?true:false"  active-color="#34C759" v-model="F1Result.rcswg==1?true:false" size="24" />
       </template>
     </van-cell>
      <van-cell  center title="外观标识,标注和标牌" v-show="F1Result.rwgbs==0?false:true">
       <template #right-icon>
         <van-switch :inactive-color="swictcColor(F1Result.rwgbs)" @click="changeSwitch(F1Result.rwgbs,'rwgbs')" :disabled="F1Result.rwgbs==0?true:false"  active-color="#34C759" v-model="F1Result.rwgbs==1?true:false" size="24" />
       </template>
     </van-cell>
      <van-cell  center title="外部照明和信号装置" v-show="F1Result.rwbzm==0?false:true">
       <template #right-icon>
         <van-switch :inactive-color="swictcColor(F1Result.rwbzm)" @click="changeSwitch(F1Result.rwbzm,'rwbzm')" :disabled="F1Result.rwbzm==0?true:false"  active-color="#34C759" v-model="F1Result.rwbzm==1?true:false" size="24" />
       </template>
     </van-cell>
     <van-cell  center title="轮胎"  v-show="F1Result.rlt==0?false:true">
       <template #right-icon>
         <van-switch :inactive-color="swictcColor(F1Result.rlt)" @change="changeSwitch(F1Result.rlt,'rlt')" :disabled="F1Result.rlt==0?true:false"  active-color="#34C759" v-model="F1Result.rlt==1?true:false" size="24" />
       </template>
     </van-cell>
      <van-cell  center title="号牌/号牌板(架)" v-show="F1Result.rhpaz==0?false:true">
       <template #right-icon>
         <van-switch :inactive-color="swictcColor(F1Result.rhpaz)" @change="changeSwitch(F1Result.rhpaz,'rhpaz')" :disabled="F1Result.rhpaz==0?true:false"  active-color="#34C759" v-model="F1Result.rhpaz==1?true:false" size="24" />
       </template>
     </van-cell>
     <van-cell  center title="加装/改装灯具" v-show="F1Result.rjzgj==0?false:true">
       <template #right-icon>
         <van-switch :inactive-color="swictcColor(F1Result.rjzgj)" @change="changeSwitch(F1Result.rjzgj,'rjzgj')" :disabled="F1Result.rjzgj==0?true:false"  active-color="#34C759" v-model="F1Result.rjzgj==1?true:false" size="24" />
       </template>
     </van-cell>
   </van-cell-group>
   <!-- 安全装置 -->
   <van-cell-group title="安全装置">
      <van-cell  center title="汽车安全带" v-show="F1Result.rqcaqd==0?false:true">
       <template #right-icon>
         <van-switch :inactive-color="swictcColor(F1Result.rqcaqd)" @change="changeSwitch(F1Result.rqcaqd,'rqcaqd')" :disabled="F1Result.rqcaqd==0?true:false"  active-color="#34C759" v-model="F1Result.rqcaqd==1?true:false" size="24" />
       </template>
     </van-cell>
     <van-cell  center title="应急停车安全附件">
       <template #right-icon>
         <van-switch :inactive-color="swictcColor(F1Result.rsjp)" @change="changeSwitch(F1Result.rsjp,'rsjp')" :disabled="F1Result.rsjp==0?true:false"  active-color="#34C759" v-model="F1Result.rsjp==1?true:false" size="24" />
       </template>
     </van-cell>
     <van-cell  center title="灭火器" v-show="F1Result.rmhq==0?false:true">
       <template #right-icon>
         <van-switch :inactive-color="swictcColor(F1Result.rmhq)" @change="changeSwitch(F1Result.rmhq,'rmhq')" :disabled="F1Result.rmhq==0?true:false"  active-color="#34C759" v-model="F1Result.rmhq==1?true:false" size="24" />
       </template>
     </van-cell>
     <van-cell  center title="行驶记录装置" v-show="F1Result.rxsjly==0?false:true">
       <template #right-icon>
         <van-switch :inactive-color="swictcColor(F1Result.rxsjly)" @change="changeSwitch(F1Result.rxsjly,'rxsjly')" :disabled="F1Result.rxsjly==0?true:false"  active-color="#34C759" v-model="F1Result.rxsjly==1?true:false" size="24" />
       </template>
     </van-cell>
     <van-cell  center title="车身反光标识" v-show="F1Result.rcsfgbs==0?false:true">
       <template #right-icon>
         <van-switch :inactive-color="swictcColor(F1Result.rcsfgbs)" @change="changeSwitch(F1Result.rcsfgbs,'rcsfgbs')" :disabled="F1Result.rcsfgbs==0?true:false"  active-color="#34C759" v-model="F1Result.rcsfgbs==1?true:false" size="24" />
       </template>
     </van-cell>
     <van-cell  center title="车辆尾部标志板" v-show="F1Result.rclwbzb==0?false:true">
       <template #right-icon>
         <van-switch :inactive-color="swictcColor(F1Result.rclwbzb)" @change="changeSwitch(F1Result.rclwbzb,'rclwbzb')" :disabled="F1Result.rclwbzb==0?true:false"  active-color="#34C759" v-model="F1Result.rclwbzb==1?true:false" size="24" />
       </template>
     </van-cell>
     <van-cell  center title="侧，后，前下部防护" v-show="F1Result.rchfh==0?false:true">
       <template #right-icon>
         <van-switch :inactive-color="swictcColor(F1Result.rchfh)" @change="changeSwitch(F1Result.rchfh,'rchfh')" :disabled="F1Result.rchfh==0?true:false"  active-color="#34C759" v-model="F1Result.rchfh==1?true:false" size="24" />
       </template>
     </van-cell>
     <van-cell  center title="应急锤" v-show="F1Result.ryjc==0?false:true">
       <template #right-icon>
         <van-switch :inactive-color="swictcColor(F1Result.ryjc)" @change="changeSwitch(F1Result.ryjc,'ryjc')" :disabled="F1Result.ryjc==0?true:false"  active-color="#34C759" v-model="F1Result.ryjc==1?true:false" size="24" />
       </template>
     </van-cell>
     <van-cell  center title="急救箱" v-show="F1Result.rjjx==0?false:true">
       <template #right-icon>
         <van-switch :inactive-color="swictcColor(F1Result.rjjx)" @change="changeSwitch(F1Result.rjjx,'rjjx')" :disabled="F1Result.rjjx==0?true:false"  active-color="#34C759" v-model="F1Result.rjjx==1?true:false" size="24" />
       </template>
     </van-cell>
     <van-cell  center title="车速限制/报警功能或装置" v-show="F1Result.rxsgn==0?false:true">
       <template #right-icon>
         <van-switch :inactive-color="swictcColor(F1Result.rxsgn)" @change="changeSwitch(F1Result.rxsgn,'rxsgn')" :disabled="F1Result.rxsgn==0?true:false"  active-color="#34C759" v-model="F1Result.rxsgn==1?true:false" size="24" />
       </template>
     </van-cell>
     <van-cell  center title="防抱制动装置" v-show="F1Result.rfbs==0?false:true">
       <template #right-icon>
         <van-switch :inactive-color="swictcColor(F1Result.rfbs)" @change="changeSwitch(F1Result.rfbs,'rfbs')" :disabled="F1Result.rfbs==0?true:false"  active-color="#34C759" v-model="F1Result.rfbs==1?true:false" size="24" />
       </template>
     </van-cell>
     <van-cell  center title="辅助制动装置" v-show="F1Result.rfzzd==0?false:true">
       <template #right-icon>
         <van-switch :inactive-color="swictcColor(F1Result.rfzzd)" @change="changeSwitch(F1Result.rfzzd,'rfzzd')" :disabled="F1Result.rfzzd==0?true:false"  active-color="#34C759" v-model="F1Result.rfzzd==1?true:false" size="24" />
       </template>
     </van-cell>
     <van-cell  center title="盘式制动器" v-show="F1Result.rpszdq==0?false:true">
       <template #right-icon>
         <van-switch :inactive-color="swictcColor(F1Result.rpszdq)" @change="changeSwitch(F1Result.rpszdq,'rpszdq')" :disabled="F1Result.rpszdq==0?true:false"  active-color="#34C759" v-model="F1Result.rpszdq==1?true:false" size="24" />
       </template>
     </van-cell>
     <van-cell  center title="制动间隙自动调整装置" v-show="F1Result.rjxtz==0?false:true">
       <template #right-icon>
         <van-switch :inactive-color="swictcColor(F1Result.rjxtz)" @change="changeSwitch(F1Result.rjxtz,'rjxtz')" :disabled="F1Result.rjxtz==0?true:false"  active-color="#34C759" v-model="F1Result.rjxtz==1?true:false" size="24" />
       </template>
     </van-cell>
     <van-cell  center title="紧急切断装置" v-show="F1Result.rjjqd==0?false:true">
       <template #right-icon>
         <van-switch :inactive-color="swictcColor(F1Result.rjjqd)" @change="changeSwitch(F1Result.rjjqd,'rjjqd')" :disabled="F1Result.rjjqd==0?true:false"  active-color="#34C759" v-model="F1Result.rjjqd==1?true:false" size="24" />
       </template>
     </van-cell>
     <van-cell  center title="发动机舱自动灭火装置" v-show="F1Result.rfdjcmh==0?false:true">
       <template #right-icon>
         <van-switch :inactive-color="swictcColor(F1Result.rfdjcmh)" @change="changeSwitch(F1Result.rfdjcmh,'rfdjcmh')" :disabled="F1Result.rfdjcmh==0?true:false"  active-color="#34C759" v-model="F1Result.rfdjcmh==1?true:false" size="24" />
       </template>
     </van-cell>
      <van-cell  center title="手动机械断电开关" v-show="F1Result.rsddd==0?false:true">
       <template #right-icon>
         <van-switch :inactive-color="swictcColor(F1Result.rsddd)" @change="changeSwitch(F1Result.rsddd,'rsddd')" :disabled="F1Result.rsddd==0?true:false"  active-color="#34C759" v-model="F1Result.rsddd==1?true:false" size="24" />
       </template>
     </van-cell>
     <van-cell  center title="副制动踏板" v-show="F1Result.rfzdtb==0?false:true">
       <template #right-icon>
         <van-switch :inactive-color="swictcColor(F1Result.rfzdtb)"  @change="changeSwitch(F1Result.rfzdtb,'rfzdtb')" :disabled="F1Result.rfzdtb==0?true:false"  active-color="#34C759" v-model="F1Result.rfzdtb==1?true:false" size="24" />
       </template>
     </van-cell>
      <van-cell  center title="校车标志灯和停车指示标志牌" v-show="F1Result.rxcbz==0?false:true">
       <template #right-icon>
         <van-switch :inactive-color="swictcColor(F1Result.rxcbz)"  @change="changeSwitch(F1Result.rxcbz,'rxcbz')" :disabled="F1Result.rxcbz==0?true:false"  active-color="#34C759" v-model="F1Result.rxcbz==1?true:false" size="24" />
       </template>
     </van-cell>
     <van-cell  center title="危险货物运输车辆标志" v-show="F1Result.rwxhwbz==0?false:true">
       <template #right-icon>
         <van-switch :inactive-color="swictcColor(F1Result.rwxhwbz)" @change="changeSwitch(F1Result.rwxhwbz,'rwxhwbz')" :disabled="F1Result.rwxhwbz==0?true:false"  active-color="#34C759" v-model="F1Result.rwxhwbz==1?true:false" size="24" />
       </template>
     </van-cell>
     <van-cell  center title="驾驶区隔离设施" v-show="F1Result.rjsqglss==0?false:true">
       <template #right-icon>
         <van-switch :inactive-color="swictcColor(F1Result.rjsqglss)" @change="changeSwitch(F1Result.rjsqglss,'rjsqglss')" :disabled="F1Result.rjsqglss==0?true:false"  active-color="#34C759" v-model="F1Result.rjsqglss==1?true:false" size="24" />
       </template>
     </van-cell>
     <van-cell  center title="肢体残疾人操纵辅助装置" v-show="F1Result.ztcjrfzzz==0?false:true">
       <template #right-icon>
         <van-switch :inactive-color="swictcColor(F1Result.ztcjrfzzz)" @change="changeSwitch(F1Result.ztcjrfzzz,'ztcjrfzzz')" :disabled="F1Result.ztcjrfzzz==0?true:false"  active-color="#34C759" v-model="F1Result.ztcjrfzzz==1?true:false" size="24" />
       </template>
     </van-cell>
   </van-cell-group>
    </div>
  </div>
</template>
<script>
import {Switch,Cell, CellGroup,Field  } from 'vant';
export default {
  name:'Charac_teristic',
  components:{
    [Switch.name]:Switch,
    [Cell.name]:Cell,
    [CellGroup.name]:CellGroup,
    [Field.name]:Field,
  },
  data() {
    return {
      active:true,
      checked:true,
      F1Result:true,
      disabled:false,//开关是否禁用
      datalist: [

                ],
      F1Result:{},
       itemtype:'',
      qualified:'合格',//检测结果是否合格
      judgesum:{},
      }

   },
   computed: {
     swictcColor(value){
       return function (value) {
         if(value==0){
           return '#B1B1B1'
         }else{
           return  '#F5F5F5'
         }
       }
     },
      // 检验项目类型
     itemTitle(value){
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
   },
   mounted () {
     console.log(this.$store.getters.getwgTag);
     const Tag=this.$store.getters.getwgTag;//外检参数
     console.log(Tag)
     this.F1Result=Tag.result;
     this.itemtype=this.$store.getters.getitemtype;//检验项目类型
     this.userInfo=this.$store.getters.getuserInfo;//登录后返回的用户信息
     this.F1Result.wgjcjyy=this.$store.getters.getuserInfo.yhxm;
     this.F1Result.wgjcjyysfzh=this.$store.getters.getuserInfo.sfzh;
     this.$store.dispatch('getqualified','1');//总检验结果是否合格 缺省合格
     const getqualified=this.F1Result.wgpd;//结果总判定
     console.log(getqualified)
     if(getqualified==1){
        this.qualified='合格';
     }else{
        this.qualified='不合格'
     }
    //  this.$store.dispatch('getState',this.F1Result);
   },
   methods: {
     changeSwitch(value,r){
      console.log(value,r);
        if(value=='1'){
          this.F1Result[r]='2';
          this.judgesum[r]="2";
        }else if(value=='2'){
          this.F1Result[r]='1';
          this.judgesum[r]="1";
        }
        console.log(this.judgesum)
        var stateList=[];//一个数组 用来存对象的属性值 value
        for(let key in this.judgesum){
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
         this.F1Result.wgpd=this.$store.getters.getqualified;
         this.$emit('childByValue', this.$store.getters.getqualified);//向父组件 TestMain 传值
     console.log(this.F1Result)
    this.$store.dispatch('getState',this.F1Result);
     }
   }
}
</script>
<style scoped>
.Charac_teristic{
  margin-top:240px;
}
.tezheng{
  margin-top: 16px;
  margin:0 auto;
  width: 338px;
  background-color: #fff;
}
.van-cell{
  font-size: 18px;
  font-weight: 600;
}

.celllabel{
  font-size: 16px;
}
.van-cell-group__title{
  font-size: 16px;
  font-weight: 600;
  color: #6060DE;
  text-align: center;
}
.ycyinfo{
  position: fixed;
    top: 170px;
    z-index: 99;
    margin: 0 auto;
    width: 338px;
}
</style>