<template>
  <div class="Take_Photo">
    <!-- 顶部导航 -->
    <van-nav-bar left-arrow :fixed="true"  @click-left="onClickLeft">
      <template #title>
        <span class="navbar">拍摄照片</span>
      </template>
    </van-nav-bar>
    <div class="Take_Photobox">
      <p class="listtitle">
        拍摄列表
        <span style="font-size: 16px; color: #8989e6">(共{{ PhotoList.length }}项)</span>
      </p>
      <ul>
         <li class="uploaderlist" v-for="(item,i) in PhotoList" :key="i">
          <van-image
            width="100px"
            height="100px"
            fit="conver"
            v-bind:src="item"
            >
          </van-image>
         </li>
         <div class="clearboth"></div>
      </ul>
       <div >
          <van-image
            width="100px"
            height="100px"
            fit="conver"
            :src="require('../assets/image/uploadImg2.png')"
            @click="getImage()"
          >
          </van-image>
         </div>
    </div>
  </div>
</template>
<script>
import { Uploader, Button, Toast, Notify,  Image as VanImage, Dialog,Field,NavBar } from "vant";
import { getDate } from "@/router/config/Utility";
import { uploadImg } from "@/api/login";
export default {
  name: "violatePhoto",
  components: {
    [Uploader.name]: Uploader,
    [Button.name]: Button,
    [Toast.name]: Toast,
    [Notify.name]: Notify,
    [VanImage.name]: VanImage,
    [Dialog.Component.name]: Dialog.Component,
    [Field.name]: Field,
    [NavBar.name]: NavBar,

  },
  data() {
    return {
      PhotoList: [],
      formData: {
        //照片上传参数
        xh:"",//序号
        zp: "", //照片
        pssj: "", //拍摄时间
        zpzl: "", //照片种类
        jyjgbh: "", //检验机构编号
        hphm: "", //号牌号码 可空
        hpzl: "", //号牌种类 可空
        clsbdh: "", //车辆的vin
        zpsxh:1,//照片顺序号
      },
    };
  },
mounted() {
  document.querySelector('body').setAttribute('style', 'background-color:#F5F5F5');
  console.log(this.$store.getters.getxh)
  console.log(this.$route.params.type,this.$route.params.clsbdh,this.$route.params.jyjgbh)
  this.formData.xh=this.$store.getters.getxh;//上传照片的序号
  this.formData.jyjgbh=this.$route.params.jyjgbh;//检验机构编号
  this.formData.clsbdh=this.$route.params.clsbdh;//车辆识别代号
  if(this.$route.params.type=='Violate'){
    this.formData.zpzl='A182';//违规车辆
  }else{
    this.formData.zpzl='A181';//嫌疑车辆
  }

  },
beforeDestroy() {
      document.querySelector('body').removeAttribute('style');
  },
  methods: {
    //  返回按钮
  onClickLeft(){
      this.$router.push({name:'violate'});
   },
    // 拍照
    getImage() {
      const value = new Date();
      const nowdate = getDate(value);
      this.formData.pssj = nowdate;
      console.log(this.formData);
      var index = this.PhotoList.length;
      var that=this;
      this.onPlusReady(function () {
        var cmr = plus.camera.getCamera();
        //执行拍照操作
        cmr.captureImage(
          function  (photoPath) {
            //拍照成功
            plus.io.resolveLocalFileSystemURL(
              photoPath,
              function (entry) {
                //文件读取成功 entry FileEntry
                entry.file(
                  //onSuccess
                  function (file) {
                    var fileReader = new plus.io.FileReader();
                    fileReader.readAsDataURL(file);
                    fileReader.onloadend = function (e) {
                      var picBase64 = e.target.result.toString();
                      that.zpReadImg(picBase64, file.type, file.size, index);
                    };
                  },
                  function (e) {
                    Toast("读取文件错误：" + e.message);
                  }
                );
              },
              function (e) {
                Toast("读取拍照文件错误：" + e.message);
              }
            );
          },
          function (e) {
            Toast("取消拍照");
          },
          //摄像机参数
          { filename: "_doc/camera/", index: 1 }
        );
      });
    },
    //  限制图片上传大小 不能大于15MB 否则拒绝上传
    oversize(img) {
      Notify({ type: "warning", message: "照片不能大于15MB" });
    },
    //压缩处理
    zpReadImg(base64, type, size, index) {
      // 大于1.5MB的图片都缩小像素上传
      if (size > 1548576) {
        // 创建Canvas对象(画布)
        let canvas = document.createElement("canvas");
        // 获取对应的CanvasRenderingContext2D对象(画笔)
        let context = canvas.getContext("2d");
        // 创建新的图片对象
        let img =  document.createElement("img");
        // 监听浏览器加载图片完成，然后进行进行绘制
        img.onload = () => {
          var _h=img.naturalHeight;//原始高度
          var _w=img.naturalWidth;//原始宽度
          var _hh=Math.round((_h/_w)*800)
          // 指定canvas画布大小，该大小为最后生成图片的大小
          canvas.width = 800;
          canvas.height = _hh;
          /* drawImage画布绘制的方法。(0,0)表示以Canvas画布左上角为起点，400，300是将图片按给定的像素进行缩小。
          如果不指定缩小的像素图片将以图片原始大小进行绘制，图片像素如果大于画布将会从左上角开始按画布大小部分绘制图片，最后的图片就是张局部图。*/
          context.drawImage(img, 0, 0, 800, _hh);
          // 将绘制完成的图片重新转化为base64编码，file.file.type为图片类型，0.92为默认压缩质量
          var _content = canvas.toDataURL('image/jpeg', 0.92);
          // var files = this.dataURLtoFile(file.content, fileName);
          //安卓我遇到过这个问题，具体是因为安卓机canvas.toDataUrl的时候导出的base64图片没有base64前缀！！！！，
          if(_content.indexOf('base64')<0){
            _content = "data:image/jpeg;base64,"+_content
          }


          this.formData.zp = _content.split(",")[1];
          this.uploadImg();
          this.PhotoList.push(_content);
        };
        img.onerror=()=>{
           Dialog.alert({
            message: "加载失败",
          });
        };
        img.src = base64;
      } else {
        this.formData.zp = base64.split(",")[1];
        this.uploadImg();
        this.PhotoList.push(base64);
      }
    },

// 上传图片
uploadImg() {
      Dialog.alert({
        message: "上传中...",
      });
      uploadImg(this.formData)
        .then((res) => {
          if (res.data.success == 1) {
            Dialog.alert({
              message: "上传成功",
            });
            // 上传成功顺序自增 1
            this.formData.zpsxh+=1;
          } else {
            // Toast(res.data.result);
            alert("图片上传失败,重新拍照上传"+res.data.result);
          }
        })
        .catch((err) => {
          Dialog.alert({
            message: "图片上传失败,重新拍照上传" + err,
          });
        });
    },
  },
};
</script>
<style scoped>
.navbar{
    font-size: 0.533333rem;
    font-weight: 600;
}
.Take_Photo{
  margin-top:60px;
  margin-bottom: 40px;
}
.Take_Photobox {
  width: 338px;
  margin: 0 auto;
  background-color: #fff;
  overflow: hidden;
}
.Take_Photobox .listtitle{
    font-size: 20px;
    font-weight: 600;
    margin: 20px 0 18px 18px;
}
.uploaderlist .potoTitle {
  font-size: 18px;
}
ul li:nth-child(even){
  float: right;
}

.uploaderlist{
  float:left;
  border-bottom: 1px dashed #727272;
  margin:15px;
}
ul li:nth-child(odd){
  float: left;
}
.potoTitle{
  margin:8px 0 8px 18px;
}
.van-image{
  margin:0 18px;
}
.ycyinfo{
  position: fixed;
    top: 170px;
    z-index: 99;
    margin: 0 auto;
    width: 338px;
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
.van-cell {
    font-size: 18px;
    font-weight: 600;
}
.clearboth{
  clear:both;
}
</style>
