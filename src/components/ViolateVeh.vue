<template>
 <div >
   <!-- 顶部导航 -->
    <van-nav-bar left-arrow :fixed="true"  @click-left="onClickLeft" @click-right="switchPath()">
      <template #title>
        <span class="navbar">{{navtitle}}</span>
      </template>
      <template #right>
        <i class="iconfont" style="font-size:20px;">&#xe7e9;</i>
      </template>
    </van-nav-bar>
    <!-- <van-button type="primary" style="margin-top:50px;" size="normal" @click="switchPath()">切换</van-button> -->
    <div  class="luru"><i class="iconfont" style="margin-right:5px;">&#xe630;</i>信息录入({{navtitle}})</div>
    <van-cell-group  title="">
      <van-form @submit="onSubmit">
         <van-field :clearable="true" maxlength="10" required v-model="result.jyjgbh"  placeholder="检验机构编号" :rules="[{ required: true, message: '检验机构编号' }]">
         <template #left-icon>
          <span style="color:#323233;margin-right:10px;font-size:18px;">检验机构编号:</span>
         </template>
      </van-field>

      <van-field :clearable="true" maxlength="14" v-if="type=='VL'" required v-model="result.bh" placeholder="机动车公告编号" :rules="[{ required: true, message: '机动车公告编号' }]">
        <template #left-icon>
          <span style="color:#323233;margin-right:10px;font-size:18px;">机动车公告编号:</span>
        </template>
      </van-field>

      <van-field :clearable="true"  maxlength="40" required v-model="result.clpp1"  placeholder="中文品牌" :rules="[{ required: true, message: '中文品牌' }]">
         <template #left-icon>
          <span style="color:#323233;margin-right:10px;font-size:18px;">中文品牌:</span>
         </template>
      </van-field>

      <van-field :clearable="true" maxlength="40" v-model="result.clpp2"  placeholder="英文品牌" >
         <template #left-icon>
          <span style="color:#323233;margin-right:10px;font-size:18px;">英文品牌:</span>
         </template>
      </van-field>

      <van-field :clearable="true" maxlength="40" required v-model="result.clxh"  placeholder="车辆型号" :rules="[{ required: true, message: '车辆型号' }]">
         <template #left-icon>
          <span style="color:#323233;margin-right:10px;font-size:18px;">车辆型号:</span>
         </template>
      </van-field>

      <van-field :clearable="true" maxlength="128" required v-model="result.zzcmc"  placeholder="制造厂商" :rules="[{ required: true, message: '制造厂商' }]">
         <template #left-icon>
          <span style="color:#323233;margin-right:10px;font-size:18px;">制造厂商:</span>
         </template>
      </van-field>

      <van-field :clearable="true"  maxlength="200"  v-model="result.scdz"  placeholder="生产地址" >
         <template #left-icon>
          <span style="color:#323233;margin-right:10px;font-size:18px;">生产地址:</span>
         </template>
      </van-field>

      <van-field :clearable="true" maxlength="64" required v-model="result.fdjxh"  placeholder="发动机/驱动电机型号" :rules="[{ required: true, message: '发动机型号' }]">
         <template #left-icon>
          <span style="color:#323233;margin-right:10px;font-size:18px;">发动机/驱动电机型号:</span>
         </template>
      </van-field>

      <van-field :clearable="true" maxlength="25" required v-model="result.clsbdh"  placeholder="车辆识别代号" :rules="[{ required: true, message: '发动机型号' }]">
         <template #left-icon>
          <span style="color:#323233;margin-right:10px;font-size:18px;">车辆识别代号:</span>
         </template>
      </van-field>

       <van-field :clearable="true" maxlength="20"  v-model="result.fdjh"  placeholder="多值用半角逗号分割" >
         <template #left-icon>
          <span style="color:#323233;margin-right:10px;font-size:18px;">发动机/驱动电机号码:</span>
         </template>
      </van-field>

      <van-field :clearable="true"   v-model="result.ccrq"  placeholder="按“yyyy-mm-dd”格式填写">
         <template #left-icon>
          <span style="color:#323233;margin-right:10px;font-size:18px;">出厂日期:</span>
         </template>
      </van-field>

      <van-field :clearable="true" maxlength="15"  v-model="result.hgzbh"  placeholder="合格证编号" >
         <template #left-icon>
          <span style="color:#323233;margin-right:10px;font-size:18px;">合格证编号:</span>
         </template>
      </van-field>

       <!-- <van-field :clearable="true" maxlength="1"  v-model="result.jkpz"  placeholder="进口凭证" >
         <template #left-icon>
          <span style="color:#323233;margin-right:10px;font-size:18px;">进口凭证:</span>
         </template>
      </van-field> -->

      <van-popover
      v-model="showPopover"
      trigger="click"
      :actions="actions"
      @select="onSelect"
      style="width:100%;"
      placement="top"
     >
     <template #reference>
      <van-field :clearable="true" maxlength="1"  v-model="result.jkpz"  placeholder="进口凭证" >
         <template #left-icon>
          <span style="color:#323233;margin-right:10px;font-size:18px;">进口凭证:</span>
         </template>
       </van-field>
    </template>
   </van-popover>

      <van-field :clearable="true" maxlength="20"  v-model="result.jkpzhm"  placeholder="进口凭证号码" >
         <template #left-icon>
          <span style="color:#323233;margin-right:10px;font-size:18px;">进口凭证号码:</span>
         </template>
      </van-field>

      <!-- <van-field :clearable="true" maxlength="1" required v-model="result.gcjk" placeholder="国产进口" :rules="[{ required: true, message: '国产进口' }]">
         <template #left-icon>
          <span style="color:#323233;margin-right:10px;font-size:18px;">国产进口:</span>
         </template>
      </van-field> -->

      <van-popover
      v-model="gcjkPopover"
      trigger="click"
      :actions="actionsgcjk"
      @select="onSelect"
      style="width:100%;"
      placement="top"
     >
     <template #reference>
      <van-field :clearable="true" maxlength="1" required v-model="result.gcjk" placeholder="国产进口" :rules="[{ required: true, message: '国产进口' }]">
         <template #left-icon>
          <span style="color:#323233;margin-right:10px;font-size:18px;">国产进口:</span>
         </template>
      </van-field>
    </template>
   </van-popover>

      <van-field :clearable="true" maxlength="3"  v-model="result.cllx" placeholder="车辆类型符合GA/T 16.4" >
         <template #left-icon>
          <span style="color:#323233;margin-right:10px;font-size:18px;">车辆类型:</span>
         </template>
      </van-field>

      <van-field :clearable="true" maxlength="2" required v-if="type=='VL'"  v-model="result.wgjdcs" placeholder="一次上报违规车数量" :rules="[{ required: true, message: '一次上报违规车数量' }]">
         <template #left-icon>
          <span style="color:#323233;margin-right:10px;font-size:18px;">一次上报违规车数量:</span>
         </template>
      </van-field>

      <van-field :clearable="true" maxlength="4000" required  v-if="type=='VL'" v-model="result.wgqx"   placeholder="违规情形描述" :rules="[{ required: true, message: '违规情形描述' }]">
         <template #left-icon class="lefticon">
          <span style="color:#323233;margin-right:10px;font-size:18px;">违规情形描述:</span>
         </template>
      </van-field>

      <!-- <van-field :clearable="true" maxlength="1"  v-if="type=='VL'" v-model="result.wgly"   placeholder="违规信息来源" >
         <template #left-icon class="lefticon">
          <span style="color:#323233;margin-right:10px;font-size:18px;">违规信息来源:</span>
         </template>
      </van-field> -->

      <van-popover
      v-model="wglyPopover"
      trigger="click"
      :actions="actionswgly"
      @select="onSelect"
      style="width:100%;"
      placement="top"
     >
     <template #reference>
      <van-field :clearable="true" maxlength="1"  v-if="type=='VL'" v-model="result.wgly"   placeholder="违规信息来源" >
         <template #left-icon class="lefticon">
          <span style="color:#323233;margin-right:10px;font-size:18px;">违规信息来源:</span>
         </template>
      </van-field>
    </template>
   </van-popover>

      <van-field :clearable="true" maxlength="50"  v-if="type=='VL'" v-model="result.gwbh"   placeholder="公文编号" >
         <template #left-icon class="lefticon">
          <span style="color:#323233;margin-right:10px;font-size:18px;">公文编号:</span>
         </template>
      </van-field>

      <van-field :clearable="true" maxlength="4000" required  v-if="type=='SP'" v-model="result.xyqxms"  placeholder="嫌疑情形描述" :rules="[{ required: true, message: '嫌疑情形描述' }]">
         <template #left-icon>
          <span style="color:#323233;margin-right:10px;font-size:18px;">嫌疑情形描述:</span>
         </template>
      </van-field>


      <van-field :clearable="true" maxlength="128" required  v-model="result.lxdw" placeholder="联系单位(填写报告单位)" :rules="[{ required: true, message: '联系单位' }]">
         <template #left-icon>
          <span style="color:#323233;margin-right:10px;font-size:18px;">联系单位:</span>
         </template>
      </van-field>

       <van-field :clearable="true" maxlength="20"   v-model="result.lxdh" placeholder="联系电话" :rules="[{  pattern:/^0\d{2,3}-?\d{7,8}$/, message: '请输入正确的联系电话' }]">
         <template #left-icon>
          <span style="color:#323233;margin-right:10px;font-size:18px;">联系电话:</span>
         </template>
      </van-field>

      <van-field :clearable="true" maxlength="60" required  v-model="result.lxr" placeholder="联系人" :rules="[{ required: true, message: '联系人' }]">
         <template #left-icon>
          <span style="color:#323233;margin-right:10px;font-size:18px;">联系人:</span>
         </template>
      </van-field>


       <van-field :clearable="true" maxlength="11"   v-model="result.sjhm" placeholder="联系人手机号码" :rules="[{  pattern:/^((13[0-9])|(17[0-1,6-8])|(15[^4,\\D])|(18[0-9]))\d{8}$/, message: '请输入正确的手机号码' }]">
         <template #left-icon>
          <span style="color:#323233;margin-right:10px;font-size:18px;">联系人手机号码:</span>
         </template>
      </van-field>

      <van-field style="margin-bottom:100px;" maxlength="1024" :clearable="true" v-model="result.qtclsbdh" :center="true"  placeholder="多值用半角逗号分割" >
         <template #left-icon>
          <span style="color:#323233;margin-right:10px;font-size:18px;">其他车辆识别代号:</span>
         </template>
      </van-field>
      <!-- 表单提交 -->
      <van-button  class="submitBtn" :type="bgccolor" native-type="submit" size="large" @click="" >提交{{butontext}}车辆</van-button>
      </van-form>
    </van-cell-group>
    <!-- <van-button type="primary" size="normal" @click="switchPotho()">拍照</van-button> -->
    <!-- tabar -->

 </div>
</template>
<script>
import {Switch,Cell, CellGroup,Field ,Form,Button,NavBar,Tabbar, TabbarItem,Dialog,Toast,Popover} from 'vant';
import {saveViolateVeh} from '@/api/login';
export default {
  name:'violate',
  components:{
    [Switch.name]:Switch,
    [Cell.name]:Cell,
    [CellGroup.name]:CellGroup,
    [Field.name]:Field,
    [Form.name]:Form,
    [Button.name]:Button,
    [NavBar.name]:NavBar,
    [Tabbar.name]:Tabbar,
    [TabbarItem.name]:TabbarItem,
    [Dialog.name]:Dialog,
    [Toast.name]:Toast,
    [Popover.name]:Popover,
  },
  data() {
    return {
       type:"SP",
       result:{
          xh:"",
          bh:"",
          jyjgbh:"",//检验机构编号
          clpp1:"",
          clpp2:"",
          clxh:"",
          zzcmc	:"",
          scdz:"",
          fdjxh	:"",
          clsbdh	:"",
          fdjh	:"",
          ccrq	:"",
          hgzbh	:"",
          pc	:"",
          jkpz:""	,
          jkpzhm:"",
          gcjk	:"",
          cllx:	"",
          wgjdcs	:"",
          qtclsbdh	:"",
          wgqx:""	,
          wgly:""	,
          gwbh:	"",
          lxdw	:"",
          lxr	:"",
          lxdh:	"",
          sjhm:	"",
          xyqxms:""	, //嫌疑车辆
       },
       navtitle:'嫌疑车辆',
       bgccolor:'primary',
       butontext:'嫌疑',
       showPopover:false,//井口凭证
       gcjkPopover:false,//国产进口
       wglyPopover:false,//违规来源
       actions: [{ text: '1-货物进口证明书' }, { text: '2-罚没证明书' }, { text: '3-领销牌照通知书' }],//进口凭证
       actionsgcjk: [{ text: 'A-国产' }, { text: 'B-海关进口' }, { text: 'E-海关没收' },{ text: 'G-海关监管' },{ text: 'H-进口改装' }],//国产进口
       actionswgly: [{ text: '1-生产厂家' }, { text: '2-经销商' }, { text: '3-产品公告' }],//违规来源
      }

   },
   computed: {

   },
   mounted () {
      document.querySelector('body').setAttribute('style', 'background-color:#F5F5F5');
   },
   beforeDestroy() {
      document.querySelector('body').removeAttribute('style');
  },
methods: {
    onSelect(action) {
      // Toast(action.text);
    },
//  返回按钮
  onClickLeft(){
      this.$router.push({name:'itemSelect'});
   },
//  数据提交
  onSubmit(){
    console.log(this.type)
    var jyxm='';
    if(this.type=='VL'){
      jyxm='Violate';
    }else if(this.type=='SP'){
      jyxm='Suspic';
    }
      console.log(this.result)
          //this.result 验证下必填填信息
    saveViolateVeh(jyxm,this.result).then(res=>{
        if(res.data.success==1){
                //成功后 拿到xh(序号)
                //这个有大用
            console.log(res)
            // this.result.xh=res.data.tag;
            Dialog.alert({
             title: '提示',
             message: `<span style="font-size:18px;">提交成功请上传照片</span>`,
             theme: 'round-button',
               }).then(() => {
                this.$store.dispatch('getxh',res.data.tag);
                // 将检验项目 检验机构编号 车辆识别代号 传递给目标页面
                this.$router.push({name:'violatePhoto',params:{type:jyxm,clsbdh:this.result.clsbdh,jyjgbh:this.result.jyjgbh}});
            });

          }else{
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
         }).catch(err=>{
                console.log('err获取检测项目失败');
          });
      },
      switchPath(){
        if(this.type=="VL"){
          this.type="SP";//嫌疑车辆
          this.navtitle="嫌疑车辆";
          this.bgccolor='primary';
          this.butontext='嫌疑';
        }else{
          this.type="VL";
          this.navtitle="违规车辆";
          this.bgccolor='info';
          this.butontext='违规';
        }
        console.log(this.type)
         // alert("切换道嫌疑车辆录入");
      },
      switchPotho(){
          alert("切换拍照");
          this.$router.push({name:'violatePhoto'});
      }
   }
}
</script>
<style scoped>
.tezheng{
  margin-top: 16px;
  margin:0 auto;
  width: 338px;
  background-color: #fff;
}
.van-cell{
  font-size: 16px;
  font-weight: 600;
  border: 1px solid #C1C1C1;
  border-radius: 10px;
  margin-bottom: 10px;
}
.van-cell-group{
  margin-top: 100px;
}
.celllabel{
  font-size: 16px;
}
.cellgroup{
  border-bottom: 10px solid #f5f5f5;
  margin-top: 100px;
}
.van-field__control{
  font-size: 16px !important;
}
.fieldTitle{
    font-size: 16px;
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
.navbar{
    font-size: 0.533333rem;
    font-weight: 600;
}
.submitBtn{
  position: fixed;
  bottom:0;
  left:0;
  font-size:18px;
}
.van-field__left-icon{
  width: 50%!important;
}
.luru{
    position: fixed;
    top: 46px;
    left: 0;
    font-size: 18px;
    font-weight: 600;
    text-align: left;
    color: #6060DE;
    z-index: 99;
    background-color: #F5F5F5;
    width: 100%;
    padding-left: 10px;
    border-top: 10px solid #F5F5F5;
    /* margin:60px 0 10px 20px; */
    padding-bottom: 10px;
}
</style>
