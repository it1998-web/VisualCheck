<template>
  <div class="Online_Query">
    <div class="lianwang">
      <!-- 引车员信息 -->
      <div class="ycyinfo" style="border-top: 15px solid #f5f5f5;">
      <!-- 总判定 -->
       <van-field style="color:#E21918;" :readonly="true" v-model="qualified" label="总判定" placeholder="" />
       </div>

      <van-cell-group  title="联网查询" style="border-bottom: 15px solid #f5f5f5;">
        <van-field style="color:#151518f7;" :clearable="true"  v-model="NQResult.lwcxjgms" label="结果描述" placeholder="结果描述">
        </van-field>

        <van-cell  center title="联网查询" v-show="NQResult.rlwcx==0?false:true">
       <template #right-icon>
         <van-switch :inactive-color="swictcColor(NQResult.rlwcx)" @change="changeSwitch(NQResult.rlwcx,'rlwcx')"   active-color="#34C759" v-model="NQResult.rlwcx==1?true:false" size="24" />
       </template>
        </van-cell>
      </van-cell-group>
    </div>
  </div>
</template>
<script>
import {Switch,Cell, CellGroup,Field} from 'vant';
export default {
  name:'Online_Query',
  components:{
    [Switch.name]:Switch,
    [Cell.name]:Cell,
    [CellGroup.name]:CellGroup,
    [Field.name]:Field,
  },
  data() {
    return {
      NQResult:{},//检测项目参数
      itemtype:'',//检测项目类型
      judgesum:{},
      qualified:'合格',
    }
  },
  mounted () {
     console.log(this.$store.getters.getwgTag);
     const Tag=this.$store.getters.getwgTag;//外检参数
     console.log(Tag)
     this.NQResult=Tag.result;
     this.itemtype=this.$store.getters.getitemtype;//检验项目类型
     this.NQResult.wgjcjyy=this.$store.getters.getuserInfo.yhxm;
     this.NQResult.wgjcjyysfzh=this.$store.getters.getuserInfo.sfzh;
     this.$store.dispatch('getqualified','1');//总检验结果是否合格 缺省合格
    //  this.NQResult.rlwcx='1';
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
  },
  methods: {
     changeSwitch(value,r){
      console.log(value,r);
        if(value=='1'){
          this.NQResult[r]='2';
          this.judgesum[r]='2';
        }else if(value==null||value=='2'){
          this.NQResult[r]='1';
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
         this.NQResult.rlwcx=this.$store.getters.getqualified;
     console.log(this.NQResult)
    this.$store.dispatch('getState',this.NQResult);
     }
  }


}
</script>
<style scoped>
.Online_Query{
  margin-top:240px;
}
.lianwang{
  margin-top: 16px;
  margin:0 auto;
  width: 338px;
  background-color: #fff;
}
.van-cell{
  font-size: 18px;
  font-weight: 600;
  color: #646566;
}

.celllabel{
  font-size: 16px;
}
.van-cell-group__title {
    font-size: 0.426667rem;
    font-weight: 600;
    color: #6060DE;
    text-align: center;
}
.van-field__label{
  color: #323233!important;
}
.ycyinfo{
  position: fixed;
    top: 170px;
    z-index: 99;
    margin: 0 auto;
    width: 338px;
}
</style>