<template>
<!-- 唯一性检测 -->
  <div class="Identification">
    <div class="weiyi" >
      <!-- 引车员信息 -->
      <div class="ycyinfo" style="border-top: 15px solid #f5f5f5;">
      <!-- 总判定 -->
       <van-field style="color:#E21918;" :readonly="true" v-model="qualified" label="总判定" placeholder="" />
       </div>

     <van-cell  center  title="号牌号码和分类" v-show="UCResult.rhplx==0?false:true">
       <template #right-icon>
         <van-switch :inactive-color="swictcColor(UCResult.rhplx)" :disabled="UCResult.rhplx==0?true:false" @change="changeSwitch(UCResult.rhplx,'rhplx')" v-model="UCResult.rhplx==1?true:false" active-color="#34C759"  size="24" />
       </template>
     </van-cell>
     <van-cell  center  title="车辆品牌和型号" v-show="UCResult.rppxh==0?false:true">
       <template #right-icon>
         <van-switch :inactive-color="swictcColor(UCResult.rppxh)" :disabled="UCResult.rppxh==0?true:false" @change="changeSwitch(UCResult.rppxh,'rppxh')" v-model="UCResult.rppxh==1?true:false"  active-color="#34C759"  size="24" />
       </template>
     </van-cell>
     <van-cell  center  title="车辆识别代号" v-show="UCResult.rvin==0?false:true">
       <template #right-icon>
         <van-switch :inactive-color="swictcColor(UCResult.rvin)" :disabled="UCResult.rvin==0?true:false" @change="changeSwitch(UCResult.rvin,'rvin')" v-model="UCResult.rvin==1?true:false"  active-color="#34C759"  size="24" />
       </template>
     </van-cell>
     <van-cell  center  title="发动机号码/驱动电机号码" v-show="UCResult.rfdjh==0?false:true">
       <template #right-icon>
         <van-switch :inactive-color="swictcColor(UCResult.rfdjh)" :disabled="UCResult.rfdjh==0?true:false" @change="changeSwitch(UCResult.rfdjh,'rfdjh')" v-model="UCResult.rfdjh==1?true:false"  active-color="#34C759"  size="24" />
       </template>
     </van-cell>
      <van-cell  center  title="车身颜色和车辆外形" v-show="UCResult.rcsys==0?false:true">
       <template #right-icon>
         <van-switch :inactive-color="swictcColor(UCResult.rcsys)" :disabled="UCResult.rcsys==0?true:false" @change="changeSwitch(UCResult.rcsys,'rcsys')" v-model="UCResult.rcsys==1?true:false"  active-color="#34C759"  size="24" />
       </template>
     </van-cell>

    </div>
  </div>
</template>
<script>
import {Switch,Cell, CellGroup,Field } from 'vant';
export default {
  name:'Identification',
  components:{
    [Switch.name]:Switch,
    [Cell.name]:Cell,
    [CellGroup.name]:CellGroup,
    [Field.name]:Field,
  },
 data() {
    return {
      checked:true,
      datalist: [],
      UCResult:{},//唯一性检查参数
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
 mounted() {
     const Tag=this.$store.getters.getwgTag; //检验项目参数
     console.log(Tag)
     this.UCResult=Tag.result;
     this.itemtype=this.$store.getters.getitemtype;//检验项目类型
     this.UCResult.wgjcjyy=this.$store.getters.getuserInfo.yhxm;
     this.UCResult.wgjcjyysfzh=this.$store.getters.getuserInfo.sfzh;
    //  this.$store.dispatch('getState',this.UCResult);
    this.$store.dispatch("getqualified", "1"); //总检验结果是否合格 缺省合格
   },
 methods: {
      changeSwitch(value,r){
      console.log(value,r);
        if(value=='1'){
          this.UCResult[r]='2';
          this.judgesum[r]='2';
        }else if(value=='2'){
          this.UCResult[r]='1';
          this.judgesum[r]='1';
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
          this.$emit('childByValue', this.$store.getters.getqualified);//向父组件 TestMain 传值
         this.UCResult.wyxpd=this.$store.getters.getqualified;
     console.log(this.UCResult)
    this.$store.dispatch('getState',this.UCResult);
     }
   }
}
</script>
<style scoped>
.Identification{
  margin-top:260px;
}
.weiyi{
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
.ycyinfo{
  position: fixed;
    top: 170px;
    z-index: 99;
    margin: 0 auto;
    width: 338px;
}
</style>