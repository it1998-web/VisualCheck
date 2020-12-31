<template>
  <div class="login" ref="table-container">
    <!-- 登录页背景图 -->
    <div class="loginbgn" :style="{backgroundImage: 'url(' + loginbg + ')' }">
      <!-- <img :src="require('../assets/image/lg.png')" alt=""> -->
      <!-- 服务器选择 -->
      <div class="iconfont server" @click="serverSelect">&#xe654;</div>
    </div>
    <!-- logo -->
  <div class="loginBox">
  <van-image
  fit="contain"
  :src="require('../assets/image/logo.png')"
  />
<div style="" class="APPTitle">长通车检</div>
<!-- form 表单提交登录 -->
  <van-form @submit="onSubmit">
  <van-field
    class="field"
    v-model="username"
    name="用户名"
    placeholder="用户名"
    clearable
    :center="true"
    @click="focusInput"
    :rules="[{ pattern:/^[a-zA-Z0-9_.-\w\u4e00-\u9fa5]{2,14}$/, message: '请填写用户名2至14位字母数字汉字下划线' }]"
  >

  <template #left-icon>
     <i class="iconfont" style="font-size:22px;margin-right:20px;">&#xe64a;</i>
  </template>
  </van-field>
  <van-field
    class="field inputpwd"
    v-model="password"
    type="password"
    name="密码"
    :center="true"
    clearable
    placeholder="密码"
    @click="focusInput"
    :rules="[{ pattern:/^[a-zA-Z0-9_.@-]{6,16}$/, message: '请填写密码6至16位包含字母数字下划线和字符' }]"
  >
   <template #left-icon>
     <i class="iconfont" style="font-size:22px;margin-right:20px;">&#xe63a;</i>
  </template>
  </van-field>
  <div class="buttonbox">
    <van-button class="loadingbutton" loading-text="登录中......" :loading="loadingButton" :disabled="disabledButton"  color="#7F7BE7" block  native-type="submit">
      登 录
    </van-button>
  </div>
</van-form>

<!-- 软件版本信息 -->
<div class="copyright" v-show="showcopyright">
  <p>版本号：v1.0.0.3</p>
  <!-- <p>Copyright © 2020 长通车检 All Rights Reserveed</p> -->
  <p>陕西长通 版权所有 客服电话 <span style="color:#25AFF3">029-86690063</span></p>
</div>
     </div>
</div>
</template>

<script>
import { Image as VanImage,Form,Button,Icon,Field,Toast,Dialog} from 'vant';
import {login} from "@/api/login";
import { JSEncrypt } from 'jsencrypt';
import login375 from '../../static/image/login3X.png';
export default {
  name: 'logins',
  components:{
   [VanImage.name]:VanImage,
   [Form.name]:Form,
   [Button.name]:Button,
   [Field.name]:Field,
   [Icon.name]:Icon,
   [Toast.name]:Toast,
   [Dialog.name]:Dialog,
  },
  data () {
    return {
     disabledButton:false,//是否禁用按钮
     loadingButton:false,//按钮是否为加载中
     showcopyright:true,//是否显示版本信息
     username: '',
     password: '',
     rolename:'',//角色名
     uuid:'',//设备唯一标识
     docmHeight: document.documentElement.clientHeight,  //默认屏幕高度
     showHeight:  '0',  //实时屏幕高度
     isResize:false, //默认屏幕高度是否已获取
     loginbg:login375,
    }
  },
  created(){
    console.log(window.localStorage.getItem('Username'));
    this.username=window.localStorage.getItem('Username');//从内存中读取上次登录的用户名

  },
  mounted () {
// window.onresize监听页面高度的变化
window.onresize = ()=>{
        return(()=>{
            this.showHeight = document.body.clientHeight;
            console.log( this.showHeight,this.docmHeight)
        })()
    };
    var that=this;
// '获取设备信息'
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
	  })
　　});
// this.getAndroidOS();
  },
  methods: {
  // 登录提交
  onSubmit(values) {
     this.disabledButton=true;
     this.loadingButton=true;
    //  console.log(this.encryptedData(this.username));
    //  console.log(this.encryptedData(this.password));
    //  95EC658BB9D20742 uuid 设备的唯一标识
     const username=this.encryptedData(this.username).replace(/\+/g, '%2B');
     const pwd=this.encryptedData(this.password).replace(/\+/g, '%2B');
     login({user:username,pass:pwd,imei:this.uuid,rolename:this.rolename}).then(res=>{
       console.log(res)
       if(res.data.success==1){
         Toast('登录成功')
         var userinfo={};
         userinfo.yhxm=res.data.tag.yhxm;
         userinfo.sfzh=res.data.tag.sfzh;
         this.$store.dispatch('getCookie',res.data.tag.sid);
         window.localStorage.setItem('token', res.data.tag.sid);
         this.$router.push({name:'itemSelect'});
         this.$store.dispatch('getLinelist',res.data.tag.config_list);//保存检测线
         this.$store.dispatch('getuserInfo',userinfo);//保存用户信息
         window.localStorage.setItem('Username',this.username);//登录成功之后记住当前登录用户
       }else{
         Toast(res.data.result)
         this.disabledButton=false;
         this.loadingButton=false;
       }
     }).catch(err=>{
       console.log('登录失败')
        Toast('登录失败:网络错误')
        this.disabledButton=false;
        this.loadingButton=false;
     })
    },
  // 加密
  encryptedData(data) {
    //公钥 和后端沟通写死了
    var publicKey="MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCa4KHNwDX44gGmmIAtRu4gjVYtGWZzcm4t+1wjUD4dn7fMLPvuK7ai4UrfDeEJE1RPwudJw+lJ6crql8wSIg7/DbTlG3ihsCT6dT9H5B9OoeR7K9VWUesaW/iyVL6HXiYOANabW14pvJATDmdq91Tfgp6PSQyvdfiRdV4r07crpQIDAQAB";//(很长的一串字符)
    // 新建JSEncrypt对象
    let encryptor = new JSEncrypt();
    // 设置公钥
    encryptor.setPublicKey(publicKey);
    // 加密数据
    return encryptor.encrypt(data);
   },
  // 服务器选择
  serverSelect(){
      this.$router.push({name:"serverSelect"});
    },
  // 获取设备 Android 系统版本
  getAndroidOS(){
    var device_type = navigator.userAgent;//获取userAgent信息
    var md = new MobileDetect(device_type);//实例化mobile-detect
    var os = md.os();//获取系统
    var model = "";
    if (os == "iOS") {//ios系统的处理
        os = md.os() + md.version("iPhone");
        model = md.mobile();
    } else if (os == "AndroidOS") {//Android系统的处理
        os = md.os() + md.version("Android");
        var sss = device_type.split(";");
        console.log(sss)
        alert(sss)
        var Android_os=0;
        if(sss.length==3){
          // console.log(sss[1].trim().split(" "));
          Android_os=sss[1].trim().split(" ")[1]
        }else if(sss.length==5){
          Android_os=sss[1].trim().split(" ")[1]
        }else{
          // console.log(sss[2].trim().split(" "));
           Android_os=sss[2].trim().split(" ")[1];
        }
        if(parseFloat(Android_os)<=11){
         Dialog.confirm({
            title: '提示',
            message: `<span style="color:">您的系统版本太低了,无法使用该软件</span>`,
            showConfirmButton:false,
            showCancelButton:false
         })
        }
    }
    console.log(parseFloat(Android_os));//打印系统版本和手机型号
    // console.log(md,"aaaa");
  },
  // 输入框聚焦时 页面滚动到最底部
  focusInput(){
    setTimeout(() => {
      this.$nextTick(() => {
        let tablePar = this.$refs["table-container"];
        tablePar.scrollTop = tablePar.scrollHeight;
        console.log(tablePar.scrollTop,tablePar.scrollHeight)
      });
    }, 1500);
  }
  },
watch: {
 showHeight:function() {
        if(this.docmHeight > this.showHeight){
            this.showcopyright=false;
        }else{
            this.showcopyright=true;
        }
    }
},
}
</script>

<style  scoped lang="less">
.login{
  position: relative;
  height: 100%;
}
.van-image{
    width: 95px;
    height: 95px;
    margin-left: 50%;
    transform: translateX(-50%);
    margin-top: 30px;

}
.APPTitle{
  text-align: center;
  margin-top:5px;
  font-size:24px;
  font-weight: 600;
}
.van-cell{
  border: 1px solid #ccc;
    width: 85%;
    margin-left: 50%;
    transform: translateX(-50%);
}
.van-form{
  margin-top:30px;
}
.field{
  font-size:20px;
}
.inputpwd{
  margin-top: 20px;
}
.buttonbox{
  margin:16px;
}
.van-field__value.van-field__body.van-field__control{
  text-align: center!important;
}
.server{
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 25px;
    color:#FFCD44;
}
.loadingbutton{
margin-top:30px;
margin-left: 50%;
width: 95%;
transform: translateX(-50%);
font-size: 22px;
border-radius: 8px;
}
.copyright{
    position: fixed;
    left: 0;
    bottom: 10px;
    /* margin-top: 50px; */
    width:100%;
}
.copyright p{
  text-align: center;
  color: #727272;
}
.loginbgn{
    /* position: absolute;
    top: 0;
    left: 0; */
    width: 100%;
    height:30%;
    /* margin:0 auto; */
    /* line-height: 60px; */
    /* font-size:30px; */
    //  background-image: url('../assets/image/login375.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
}
.loginBox{
    /* position: absolute; */
    /* top: 211px; */
    /* left: 0; */
    width: 100%;
    height:70%;
    background-color: #fff;
}
</style>
