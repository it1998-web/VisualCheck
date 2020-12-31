<template>
  <!-- 底盘动态 -->
  <div class="Dynamic_Chassis">
    <div class="dipan">
      <div class="ycyinfo" style="border-top: 15px solid #f5f5f5;">
      <!-- 总判定 -->
       <van-field style="color:#E21918;" :readonly="true" v-model="qualified" label="总判定" placeholder="" />
       </div>
      <van-cell center title="转向" v-show="DCResult.rzxx == 0 ? false : true">
        <template #right-icon>
          <van-switch
            :inactive-color="swictcColor(DCResult.rzxx)"
            :disabled="DCResult.rzxx == 0 ? true : false"
            @change="changeSwitch(DCResult.rzxx, 'rzxx')"
            v-model="DCResult.rzxx == 1 ? true : false"
            active-color="#34C759"
            size="24"
          />
        </template>
      </van-cell>
      <van-cell center title="传动" v-show="DCResult.rcdx == 0 ? false : true">
        <template #right-icon>
          <van-switch
            :inactive-color="swictcColor(DCResult.rcdx)"
            :disabled="DCResult.rcdx == 0 ? true : false"
            @change="changeSwitch(DCResult.rcdx, 'rcdx')"
            v-model="DCResult.rcdx == 1 ? true : false"
            active-color="#34C759"
            size="24"
          />
        </template>
      </van-cell>
      <van-cell center title="制动" v-show="DCResult.rzdx == 0 ? false : true">
        <template #right-icon>
          <van-switch
            :inactive-color="swictcColor(DCResult.rzdx)"
            :disabled="DCResult.rzdx == 0 ? true : false"
            @change="changeSwitch(DCResult.rzdx, 'rzdx')"
            v-model="DCResult.rzdx == 1 ? true : false"
            active-color="#34C759"
            size="24"
          />
        </template>
      </van-cell>
      <van-cell
        center
        title="仪表和指示器"
        v-show="DCResult.rybzsq == 0 ? false : true"
      >
        <template #right-icon>
          <van-switch
            :inactive-color="swictcColor(DCResult.rybzsq)"
            :disabled="DCResult.rybzsq == 0 ? true : false"
            @change="changeSwitch(DCResult.rybzsq, 'rybzsq')"
            v-model="DCResult.rybzsq == 1 ? true : false"
            active-color="#34C759"
            size="24"
          />
        </template>
      </van-cell>

      <van-cell-group class="cellgroup" style="border-top: 10px solid #f5f5f5">
        <div class="fieldTitle">方向盘最大自由转动量(度°)</div>
        <van-field
          v-model="DCResult.fxpzdzyzdl"
          :clearable="true"
          type="digit"
          maxlength="4"
          placeholder="最后轴左右高度差"
        />
      </van-cell-group>

       <!-- 检验员信息 -->
   <van-cell-group title="" style="border-bottom: 15px solid #f5f5f5;">

      <!-- 引车员 -->

      <van-field style="color:#323233;" label="引车员" clearable  v-model="DCResult.ycy" placeholder="引车员" />

      <van-field  style="color:#323233;" clearable  v-model="DCResult.ycysfzh" type="digit"  maxlength="18" label="引车员身份证" placeholder="引车员身份证号"/>
   </van-cell-group>

    <van-cell-group class="cellgroup jyyjy">
       <van-field  v-model="DCResult.jyyjy" autosize show-word-limit type="textarea"  maxlength="1024" label="检验员建议"  placeholder="检验员建议" />
    </van-cell-group>

    <!-- <div>{{Height.docmHeight}} {{Height.showHeight}}</div> -->
       <van-cell-group class="cellgroup footer">
          <!-- 此处cell 单元格为空 主要目的是用来占位置 让元素铺满屏幕 不然的话会出现一个 bug 在调用系统输入法 收起的时候屏幕会卡住不会恢复到原来状态 使整个屏幕铺满就可避免这个问题 但这不是最终解决方案 -->
       </van-cell-group>

      <div class="photoBtn" style="border-top: 15px solid #f5f5f5;" >
        <van-cell class="cellgroup">
        <van-button round type="primary" class="button" style="float:left;" @click="Photo('0344')"><i class="iconfont" style="margin-right:5px;">&#xe613;</i>起点拍照</van-button>
        <van-button round type="info"  class="button" style="float:right;" @click="Photo('0342')"><i class="iconfont" style="margin-right:5px;">&#xe613;</i>终点拍照</van-button>
       </van-cell>
      </div>
    </div>
  </div>
</template>
<script>
import { Switch, Cell, CellGroup, Field, Button } from "vant";
import { getDate } from "@/router/config/Utility";
import { takePhoto } from "@/api/login";
export default {
  name: "Dynamic_Chassis",
  components: {
    [Switch.name]: Switch,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Field.name]: Field,
    [Button.name]: Button,
  },
  props: ["Height"],
  data() {
    return {
      checked: true,
      DCResult: {}, //底盘动态检查参数
      userInfo: {}, //登录用户信息
      qualified: "合格", //检测结果是否合格
      itemtype: "", //检验项目类型
      showcopyright:true,
    };
  },
  computed: {
    swictcColor(value) {
      return function (value) {
        if (value == 0) {
          return "#B1B1B1";
        } else {
          return "#F5F5F5";
        }
      };
    },
    // 检验项目类型
    itemTitle(value) {
      return function (value) {
        if (value == "F1") {
          return "外检员";
        } else if (value == "NQ") {
          return "检验员";
        } else if (value == "UC") {
          return "检验员";
        } else if (value == "DC") {
          return "检验员";
        } else if (value == "RX") {
          return "路试员";
        }
      };
    },
    Heights(value1,value2){
      return function(value1,value2){
        if(value1>value2){
          return false;
        }else{
          return true;
        }
      }
    }
  },
  mounted() {
    console.log(this.$store.getters.getwgTag);
    const Tag = this.$store.getters.getwgTag; //检验项目参数

    console.log(Tag);
    this.DCResult = Tag.result;
    this.$store.dispatch("getState", this.DCResult);
    this.userInfo = this.$store.getters.getuserInfo; //登录后返回的用户信息
    this.DCResult.dpdtjyy = this.$store.getters.getuserInfo.yhxm;
    this.DCResult.dpdtjyysfzh = this.$store.getters.getuserInfo.sfzh;
    this.DCResult.ycy = this.$store.getters.getuserInfo.yhxm;
    this.DCResult.ycysfzh = this.$store.getters.getuserInfo.sfzh.slice(12);
    this.itemtype = this.$store.getters.getitemtype; //检验项目类型
    this.$store.dispatch("getqualified", "1"); //总检验结果是否合格 缺省合格
  },
  methods: {
    changeSwitch(value, r) {
      console.log(value, r);
      if (value == "1") {
        this.DCResult[r] = "2";
      } else if (value == "2") {
        this.DCResult[r] = "1";
      }
      var stateList = []; //一个数组 用来存对象的属性值 value
      for (let key in this.DCResult) {
        if (key == "jcxdh" || key == "dpdtpd") {
          console.log("检验线代号", this.DCResult["jcxdh"]);
        } else {
          stateList.push(this.DCResult[key]); //循环出属性值追加到数组中
        }
      }
      // console.log(stateList);
      if (stateList.some((item) => item == "2")) {
        //查找数组中是否包含 2 为不合格 1 为合格
        // console.log("包含2")
        this.qualified = "不合格";
        stateList = []; //每次按钮点击都需要从新更新一下这个数组
        this.$store.dispatch("getqualified", "2");
      } else {
        // console.log('不包含2')
        this.qualified = "合格";
        this.$store.dispatch("getqualified", "1");
      }
      this.$emit('childByValue', this.$store.getters.getqualified);//向父组件 TestMain 传值
      this.DCResult.dpdtpd = this.$store.getters.getqualified;
      console.log(this.DCResult);
      this.$store.dispatch("getState", this.DCResult);
    },
    Photo(code) {
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
        jyxm: "DC",
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
  },
};
</script>
<style scoped>
.Dynamic_Chassis {
  margin-top: 240px;
}
.dipan {
  margin-top: 16px;
  margin: 0 auto;
  width: 338px;
  background-color: #fff;
}
.van-cell {
  font-size: 18px;
  font-weight: 600;
}

.cellgroup {
  /* border-bottom: 10px solid #f5f5f5; */
}
.fieldTitle {
  font-size: 18px;
  font-weight: 600;
  margin-left: 14px;
  margin-top: 5px;
  color: #767778;
}
.button{
  /* // width: 25%; */
 border-radius: 10px;
 margin-bottom: 10px;
}
.ycyinfo{
  position: fixed;
    top: 170px;
    z-index: 99;
    margin: 0 auto;
    width: 338px;
}
.photoBtn{
  /* position: fixed;
  bottom: 0;
  left: 0; */
  width: 100%;
  /* margin-top: 80px; */
}
.jyyjy{
  height:120px;
}
.footer{
 border-top: 15px solid #f5f5f5;
 height: 100px;
}

</style>
