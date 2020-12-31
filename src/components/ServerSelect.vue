<template>
<!-- 选择服务器 -->
  <div class="serverSelect">
  <van-nav-bar :left-arrow="true" @click-left="onClickLeft">
      <template #title>
        <span class="navbar">选择服务器</span>
      </template>
  </van-nav-bar>
<!-- 服务器列表 -->
  <div class="serverList" style="margin-top: 18px;">
    <div style="font-size:18px;font-weight: 600;"><i class="iconfont"style="margin:0 5px 0 10px;color:#1AA034">&#xe628;
</i>服务器地址</div>
  <van-form>
   <van-field  clearable border style="font-size:20px;margin:5px 0;"  placeholder="输入http://以后的内容" v-model="value" name="pattern" :rules="[{ pattern, message: '请输入正确的IP地址' }]">
     <template #button>
         <van-button size="small" @click="connect" type="primary" style="font-size:16px;">连接</van-button>
     </template>
   </van-field>
   <!-- 设备信息  95EC658BB9D20742 uuid 设备的唯一标识-->
   <div style="font-size:18px;font-weight: 600;"class="uuid"><i class="iconfont" style="margin:0 5px 0 10px;color:#1AA034">&#xe60e;</i>设备标识</div>
    <van-field  style="color:#E21918;margin:5px 0;" :readonly="true" v-model="uuid" placeholder="">
    </van-field>

   </van-form>
  </div>
  </div>
</template>
<script>
import {NavBar,Cell, CellGroup,Button,Toast,Field,Form   } from 'vant';
import {login} from "@/api/login";
export default {
  name:'server_Select',
  components:{
    [NavBar.name]:NavBar,
    [Cell.name]:Cell,
    [CellGroup.name]:CellGroup,
    [Button.name]:Button,
    [Toast.name]:Toast,
    [Field.name]:Field,
    [Form.name]:Form,
  },
  data () {
    return {
      pattern:/^(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5]):([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/,// ip端口号校验
      visible:false,
      value:'',
      uuid:'',
    }
  },
mounted() {
  document.querySelector('body').setAttribute('style', 'background-color:#F5F5F5');
    let globalApi = localStorage.getItem('apiUrl');
    console.log(globalApi);
    this.value=globalApi.slice(7);//存在内存中的ip 地址

  var that=this;
    // 页面加载获取设备信息
  this.onPlusReady(function () {
    plus.device.getInfo({
		success:function(e){
      console.log('getDeviceInfo success: '+JSON.stringify(e));
      // alert('getDeviceInfo success: '+JSON.stringify(e.uuid))
      var uuidArr=e.uuid.split(",");
      that.uuid=uuidArr[0].toUpperCase();//转成大写
		},
		fail:function(e){
      console.log('getDeviceInfo failed: '+JSON.stringify(e));
      // alert('getDeviceInfo failed: '+JSON.stringify(e))
		}
	  });
　　})
  },
  beforeDestroy() {
    document.querySelector('body').removeAttribute('style');
  },
  methods: {
     /**
       *返回按钮
       */
onClickLeft(){
        this.$router.push({name:'login'})
      },
  // 连接服务器
connect(){
    if(this.pattern.test(this.value)){
        window.localStorage.setItem('apiUrl','http://'+this.value);
        //window.localStorage.setItem('apiUrl','http://localhost:3407');
        login("").then(res=>{
          if(res.status==200){
              Toast({
              message: '连接成功',
              position: 'top',
              duration:1000, });
              setTimeout(() => {
              this.$router.push({name:'login'})
              }, 1000);
          }else{
            Toast({
              message: '连接失败,请检查服务器是否正确',
              position: 'top',
              duration:1000, });
            }
        },err=>{ Toast({
              message: '连接失败,请检查服务器是否正确',
              position: 'top',
              duration:2000, });
            });
  }else{
     Toast({
    message: '请输入正确的IP地址',
    position: 'top',
    duration:1000,
  });
    }


  }
  }

}
</script>
<style scoped>
.serverSelect{
  overflow: hidden;
}
.navbar{
  font-size: 20px;
  font-weight: 600;
}
.serverList{
  overflow:hidden;
  margin-top: 46px;
  width: 338px;
  height:240px;
  background-color: #fff;
  margin:0 auto;
  border-radius: 10px;
}
.servertitle{
  font-size: 19px;
  font-weight: 600;
}
.serverdescribe{
  font-size: 16px;
}
.buttontext{
  font-size: 16px;
}
.van-cell{
  border: 1px solid #ccc;
  font-size: 16px;
  font-weight: 600;
  border-radius: 10px;
}
.uuid{
  margin-top:30px;
}
.van-cell__title .van-field__label{
  width:30%!important;
  margin-right: 0;
}
</style>
