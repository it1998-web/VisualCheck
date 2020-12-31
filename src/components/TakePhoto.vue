<template>
  <div class="Take_Photo">
    <div class="Take_Photobox">
      <p class="listtitle">
        待拍列表
        <span style="font-size: 16px; color: #8989e6"
          >(共{{ PhotoList.length }}项)</span
        >
      </p>
      <ul>
        <li
          class="uploaderlist"
          v-for="(item, i) in PhotoList"
          :key="i"
          @click="Imgupload(item)"
        >
          <p class="potoTitle">{{ item.text }}</p>
          <van-image
            width="100px"
            height="100px"
            fit="conver"
            v-bind:src="item.tag"
            @click="getImage(i,item)"
          >
            <!-- <template v-slot:loading>
                <van-loading type="spinner" size="20">..</van-loading> />
              </template> -->
          </van-image>
          <!-- <van-popup v-model="show" round  :style="{ height: '20%' }" >{{showInfo}}</van-popup> -->
          <!-- <van-uploader max-size="15728640" @oversize="oversize"  capture="camera" @delete="deleteimg" :after-read="afterreadImg" v-model="item.filelist[0]" multiple max-count="1" style="margin: 10px 0;" /> -->
          <!-- <i
            v-show="showicon"
            class="iconfont"
            style="color: #e49827; position: absolute; right: 0; top: 50%"
            >&#xe607;</i> -->
        </li>
      </ul>
      <!-- <van-button loading-text="上传中...." :loading="loadingbutton" :disabled="disabledbutton" @click="uploadImg" style="height: 36px;" type="primary" round  size="large">上传图片</van-button> -->
    </div>
    <!-- <van-button type="primary" @click="getImage">anniu </van-button> -->
  </div>
</template>
<script>
import { Uploader, Button, Toast, Notify,  Image as VanImage, Dialog,Field } from "vant";
import { getDate } from "@/router/config/Utility";
import { uploadImg } from "@/api/login";
export default {
  name: "Take_Photo",
  components: {
    [Uploader.name]: Uploader,
    [Button.name]: Button,
    [Toast.name]: Toast,
    [Notify.name]: Notify,
    [VanImage.name]: VanImage,
    [Dialog.Component.name]: Dialog.Component,
    [Field.name]: Field,

  },
  data() {
    return {
      itemtype: "", //检验项目的类型
      showicon: false, //是否显示上传成功 icon
      disabledbutton: false, //是否禁用按钮
      loadingbutton: false, //按钮是否处于加载中
      PhotoList: [
        // {PhotoTitle:"车辆左前方斜视45度照片", fileList:[]},
        // {PhotoTitle:"车辆右后方斜视45度照片",fileList:[]},
        // {PhotoTitle:"车辆正前方照片",fileList:[]},
      ],
      ImgList: [],
      formData: {
        //照片上传参数
        zp: "", //照片
        pssj: "", //拍摄时间
        zpzl: "", //照片种类
        jylsh: "", //检验流水号
        jyjgbh: "", //检验机构编号
        jcxdh: "", //检测线代号
        jycs: "", //检验次数
        jyxm: "", //检验项目
        hphm: "", //号牌号码
        hpzl: "", //号牌种类
        clsbdh: "", //车辆的 vin
        gwjysbbh: "", //工位检验设备编号
      },
      Imglength:'',
      F1Result:{},
      qualified:'',
    };
  },
  mounted() {
    console.log(this.$store.getters.getwgTag);
    const Tag = this.$store.getters.getwgTag; //外检参数
    this.F1Result=Tag.result;
    console.log(this.F1Result)
     const getqualified=this.$store.getters.getqualified;//结果总判定
     if(getqualified==1){
        this.qualified='合格';
     }else{
        this.qualified='不合格'
     }
    // var list = [];
    // this.$store.getters.getwgTag.listPhoto.forEach(item=>{
    //       var it =  {
    //          //标签切换时 照片显示不对
    //           Imgurl:this.formData.zp==""?"":"data:image/jpeg;base64,"+this.formData.zp,
    //           value:item.value,
    //           tag:item.tag,
    //           text:item.text
    //       };
    //       list.push(it);
    // })
    console.log(this.$store.getters.getwgTag.listPhoto);
    this.PhotoList=this.$store.getters.getwgTag.listPhoto;

    const itemtype = this.$store.getters.getitemtype;
    const data = this.$store.getters.getcarData;
    this.formData.hphm = data.hphm;
    this.formData.hpzl = data.hpzl;
    this.formData.jylsh = data.jylsh;
    this.formData.jycs = data.jycs;
    this.formData.jyjgbh = data.jyjgbh;
    this.formData.clsbdh = data.clsbdh;
    this.formData.jyxm = itemtype;

  },
  methods: {
    // 拍照
    getImage(index,item) {

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
    //  照片种类
    Imgupload(item) {

      console.log(item.value);
      this.formData.zpzl = item.value;
    },
    //  限制图片上传大小 不能大于15MB 否则拒绝上传
    oversize(img) {
      Notify({ type: "warning", message: "照片不能大于15MB" });
    },
    //  图片选取完成 需要进行压缩处理
    afterreadImg(file) {
      const value = new Date();
      const nowdate = getDate(value);
      const imgbase64 = file.content;
      this.formData.pssj = nowdate;
      this.showicon = true;
      const fileName = file.file.name;
      console.log(this.formData);
      // 大于1.5MB的图片都缩小像素上传
      if (/\/(?:jpeg|png)/i.test(file.file.type) && file.file.size > 1500000) {
        console.log("压缩了");
        // 创建Canvas对象(画布)
        let canvas = document.createElement("canvas");
        // 获取对应的CanvasRenderingContext2D对象(画笔)
        let context = canvas.getContext("2d");
        // 创建新的图片对象
        let img = new Image();
        // 指定图片的DataURL(图片的base64编码数据)
        img.src = file.content;
        // 监听浏览器加载图片完成，然后进行进行绘制
        img.onload = () => {
          // 指定canvas画布大小，该大小为最后生成图片的大小
          canvas.width = 400;
          canvas.height = 300;
          /* drawImage画布绘制的方法。(0,0)表示以Canvas画布左上角为起点，400，300是将图片按给定的像素进行缩小。
        如果不指定缩小的像素图片将以图片原始大小进行绘制，图片像素如果大于画布将会从左上角开始按画布大小部分绘制图片，最后的图片就是张局部图。*/
          context.drawImage(img, 0, 0, 400, 300);
          // 将绘制完成的图片重新转化为base64编码，file.file.type为图片类型，0.92为默认压缩质量
          file.content = canvas.toDataURL(file.file.type, 0.92);
          // var files = this.dataURLtoFile(file.content, fileName);
          this.formData.zp = file.content.split(",")[1];
          this.uploadImg();
        };
      } else {
        console.log("没有压缩");
        this.formData.zp = file.content.split(",")[1];
        this.uploadImg();
      }
    },

    //压缩处理
    zpReadImg(base64, type, size, index) {
      const value = new Date();
      const nowdate = getDate(value);
      this.formData.pssj = nowdate;
      // 大于1.5MB的图片都缩小像素上传
      if (size > 1548576) {
        // 创建Canvas对象(画布)
        let canvas = document.createElement("canvas");
        // 获取对应的CanvasRenderingContext2D对象(画笔)
        let context = canvas.getContext("2d");
        // 创建新的图片对象
        let img =  document.createElement("img");
        // Dialog.alert({
        //     message: "创建图表",
        // });

        // 指定图片的DataURL(图片的base64编码数据)
        // img.src = base64;
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

          this.PhotoList[index].tag  = _content;
          this.formData.zp = _content.split(",")[1];
          this.uploadImg();

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
        this.PhotoList[index].tag = base64;
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
            this.Imglength++;
            // alert(this.Imglength);
            this.$store.dispatch('getImglength',this.Imglength);
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
    // 删除图片预览时触发
    deleteimg() {
      this.showicon = false;
    },
  },
};
</script>
<style scoped>
.Take_Photo{
  margin-top:180px;
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
.uploaderlist{
  border-bottom: 1px dashed #727272;
}
.potoTitle{
  margin:8px 0 8px 18px;
}
.van-image{
  margin-left: 18px;
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
</style>
