<template>
<!-- 测量项 -->
  <div class="Appearance">
     <div class="waiguan" >
       <div class="fieldTitle">外廓尺寸(mm)</div>
       <van-cell  center  style="color:#767778">
       <template #default>
         <input class="input"  v-model="F1Result.cwkc" type="number" placeholder="长" name="long"  :maxlength="5"></input><i style="font-size:16px;margin:0 5px;">×</i>
         <input class="input"  v-model="F1Result.cwkk" type="number" placeholder="宽" name="width" :maxlength="4"></input><i style="font-size:16px;margin:0 5px;">×</i>
         <input class="input"  v-model="F1Result.cwkg" type="number" placeholder="高" name="height" :maxlength="4"></input>
       </template>
       </van-cell>

     <van-cell-group class="cellgroup" style="border-top:10px solid #f5f5f5;border-bottom:0;">
       <div class="fieldTitle">轴距(mm)</div>
       <van-field v-model="F1Result.zj" label=""  maxlength="32" placeholder="多个轴距用英文半角“+”分隔" />
     </van-cell-group>

     <van-cell-group class="cellgroup">
       <div class="fieldTitle">车厢栏板高度(mm)</div>
       <van-field v-model="F1Result.cxlbgd"  type="digit" maxlength="4" placeholder="车厢栏板高度" />
     </van-cell-group>

     <van-cell-group class="cellgroup" style="border:0;">
       <div class="fieldTitle">单车转向轮轮胎花纹深度(mm)</div>
       <van-field v-model="F1Result.dczxlhwsd"  maxlength="64"  placeholder="多个轮胎花纹深度用英文半角“/”分隔" />
     </van-cell-group>

     <van-cell-group class="cellgroup" style="border:0;">
       <div class="fieldTitle">单车其他轮轮胎花纹深度(mm)</div>
       <van-field v-model="F1Result.dcqtlhwsd"   maxlength="128" placeholder="单车其他轮轮胎花纹深度" />
     </van-cell-group>

     <van-cell-group class="cellgroup">
       <div class="fieldTitle">挂车轮胎花纹深度(mm)</div>
       <van-field v-model="F1Result.gchwsd"   maxlength="128"  placeholder="挂车轮胎花纹深度" />
     </van-cell-group>

     <van-cell-group class="cellgroup" style="border:0;">
       <div class="fieldTitle">第一轴左高度(mm)</div>
       <van-field v-model="F1Result.yzzgd"  type="digit" maxlength="4" placeholder="第一轴左高度挂车不填" />
     </van-cell-group>

    <van-cell-group class="cellgroup" style="border:0;">
      <div class="fieldTitle">第一轴右高度(mm)</div>
       <van-field v-model="F1Result.yzygd"  type="digit" maxlength="4" placeholder="第一轴右高度挂车不填" />
     </van-cell-group>

    <van-cell-group class="cellgroup">
        <div class="fieldTitle">第一轴左右高度差(mm)</div>
       <van-field v-model="F1Result.yzzygdc"  type="digit" maxlength="4" placeholder="第一轴左右高度差挂车不填" />
     </van-cell-group>

     <van-cell-group class="cellgroup" style="border:0;">
       <div class="fieldTitle">最后轴左高度(mm)</div>
       <van-field v-model="F1Result.zhzzgd"  type="digit" maxlength="4" placeholder="最后轴左高度" />
     </van-cell-group>

    <van-cell-group class="cellgroup" style="border:0;">
       <div class="fieldTitle">最后轴右高度(mm)</div>
       <van-field v-model="F1Result.zhzygd"  type="digit" maxlength="4" placeholder="最后轴右高度" />
     </van-cell-group>

      <van-cell-group class="cellgroup">
        <div class="fieldTitle">最后轴左右高度差(mm)</div>
       <van-field v-model="F1Result.zhzzygdc"  type="digit" maxlength="4" placeholder="最后轴左右高度差" />
     </van-cell-group>

       <van-cell  center title="是否全时/适时四驱" >
       <template #right-icon>
         <van-switch :inactive-color="swictcColor(F1Result.sfqssq)"  @change="changeSwitch(F1Result.sfqssq,'sfqssq')"   v-model="F1Result.sfqssq==1?true:false" size="24" />
       </template>
       </van-cell>

      <van-cell  center title="驻车制动是否使用电子控制装置" >
       <template #right-icon>
         <van-switch :inactive-color="swictcColor(F1Result.sfdzzc)"  @change="changeSwitch(F1Result.sfdzzc,'sfdzzc')"   v-model="F1Result.sfdzzc==1?true:false" size="24" />
       </template>
       </van-cell>

      <!-- <van-cell-group class="cellgroup">
       <van-field v-model="F1Result.sfkqxj" label="是否配备空气悬架" type="digit" placeholder="请输入是否全时/适时四驱" />
     </van-cell-group> -->

       <van-cell  center title="是否配备空气悬架" >
       <template #right-icon>
         <van-switch :inactive-color="swictcColor(F1Result.sfkqxj)"  @change="changeSwitch(F1Result.sfkqxj,'sfkqxj')"   v-model="F1Result.sfkqxj==1?true:false" size="24" />
       </template>
       </van-cell>

      <van-cell-group class="cellgroup" style="border-top:10px solid #f5f5f5">
       <van-field v-model="F1Result.kqxjz" label="空气悬架轴" type="digit" maxlength="16" placeholder="空气悬架轴" />
     </van-cell-group>

      <van-cell-group class="cellgroup">
       <van-field v-model="F1Result.zxzsl" label="转向轴数量" type="digit" maxlength="1" placeholder="转向轴数量" />
     </van-cell-group>

     <van-cell-group class="cellgroup">
       <van-field v-model="F1Result.jyyjy" autosize show-word-limit type="textarea"  maxlength="1024" label="检验员建议"  placeholder="检验员建议" />
     </van-cell-group>
    </div>
  </div>
</template>
<script>
import {Switch,Cell, CellGroup,Field  } from 'vant';
export default {
  name:'Appearance',
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
      target:{},//目标对象
      F1Result:{},//外检参数
      qualified:''

      }
   },
  mounted () {
     const Tag=this.$store.getters.getwgTag;//外检参数
     console.log(Tag)
     this.F1Result=Tag.result;
    //  this.$store.dispatch('getState',this.F1Result);
     const getqualified=this.$store.getters.getqualified;//结果总判定
     if(getqualified==1){
        this.qualified='合格';
     }else{
        this.qualified='不合格'
     }
    //  this.F1Result=this.$store.getters.getState;

  },
  computed: {
     swictcColor(value){
       return function (value) {
         if(value==1){
           return '#B1B1B1'
         }else{
           return  '#F5F5F5'
         }
       }
     }
   },
   methods: {
    //  选择合格状态
     changeSwitch(value,r){
      console.log(value,r);
        if(value=='0'){
          this.F1Result[r]='1'
        }else if(value=='1'){
          this.F1Result[r]='0'
        }else if(value==''){
          this.F1Result[r]='1'
        }
     console.log(this.F1Result)
    this.$store.dispatch('getState',this.F1Result);
     }
   },

}
</script>
<style scoped>
.Appearance{
  margin-top:180px;
}
.waiguan{
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
.cellgroup{
  border-bottom: 10px solid #f5f5f5;
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
.ycyinfo{
  position: fixed;
    top: 170px;
    z-index: 99;
    margin: 0 auto;
    width: 338px;
}
</style>