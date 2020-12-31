<template>
<!-- 安全装置 -->
  <div class="SafetyDevice">
     <div class="anquan" >
     <van-cell  center v-for="(item,i) in datalist" :key="i" :title="item.vehicleType">
       <template #right-icon>
         <van-switch @change="changeSwitch(item)"  active-color="#34C759" v-model="item.active" size="24" />
       </template>
       <template #label>
         <spna class="celllabel">合格请点击后面按钮</spna>
       </template>
     </van-cell>
    </div>
  </div>
</template>
<script>
import {Switch,Cell, CellGroup, } from 'vant';
export default {
  name:'SafetyDevice',
  components:{
    [Switch.name]:Switch,
    [Cell.name]:Cell,
    [CellGroup.name]:CellGroup,
  },
   data() {
    return {
      checked:true,
      datalist: [
                {vehicleType:"汽车安全带",active:true},
                {vehicleType:"应急停车安全附件",active:true},
                {vehicleType:"车辆品牌/型号",active:true},
                {vehicleType:"灭火器",active:true},
                {vehicleType:"行驶记录装置",active:true},
                {vehicleType:"车身反光标识",active:true},
                {vehicleType:"车辆尾部标志板",active:true},
                {vehicleType:"侧，后，前下部防护",active:true},
                {vehicleType:"应急锤",active:true},
                {vehicleType:"急救箱",active:true},
                {vehicleType:"车速限制/报警功能或装置",active:true},
                {vehicleType:"防抱制动装置",active:true},
                {vehicleType:"辅助制动装置",active:true},
                {vehicleType:"盘式制动器",active:true},
                {vehicleType:"制动间隙自动调整装置",active:true},
                {vehicleType:"紧急切断装置",active:true},
                {vehicleType:"发动机舱自动灭火装置",active:true},
                {vehicleType:"手动机械断电开关",active:true},
                {vehicleType:"校车标志灯和停车指示标志牌",active:true},
                {vehicleType:"危险货物运输车辆标志",active:true},
                {vehicleType:"驾驶区隔离设施",active:true},
                {vehicleType:"肢体残疾人操纵辅助装置",active:true},
                ],
      target:{},//目标对象
      }
   },
   mounted () {
    //  console.log(this.$store.getters.getwgTag);
    //  const Tag=this.$store.getters.getwgTag;//外检参数
     this.datalist=Tag.listItem_aqzz;
     console.log(this.datalist);
     console.log(this.$store.getters.getState);
      this.target=this.$store.getters.getState;
     var formAnq={}
     this.datalist.forEach((item,key)=>{
       if(item.active==true){
          formAnq[item.value]=1;
       }else{
          formAnq[item.value]=2;
       }
     });
   Object.assign(formAnq,this.target);
   this.$store.dispatch('getState',formAnq);
   console.log(formAnq);
   },
   methods: {
    //  选择合格状态
   changeSwitch(items){
      console.log(items);
      var formAnq={};
      this.datalist.forEach((item,key)=>{
       if(item.active==true){
          formAnq[item.value]=1;
       }else{
          formAnq[item.value]=2;
       }
     })
     console.log(this.target)
    Object.assign(formAnq,this.target);
    console.log(formAnq);
    this.$store.dispatch('getState',formAnq);
     }
   }
}
</script>
<style scoped>
.anquan{
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
</style>