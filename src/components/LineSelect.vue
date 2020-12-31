<template>
  <div class="aisle">
  <van-nav-bar left-arrow @click-left="onClickLeft">
      <template #title>
        <span class="navbar">{{itemTitle(itemtype)}}通道</span>
      </template>
  </van-nav-bar>
<van-cell-group v-for="(item,i) in lineList">
  <van-cell style="margin-top:10px;" class="linelist" :title="item.text" is-link  value="" @click="Selecttongdao(item.value)"/>
</van-cell-group>
  </div>
</template>
<script>
import {NavBar,List,Cell, CellGroup} from 'vant';
export default {
  name:'aisle',
  components:{
    [NavBar.name]:NavBar,
    [List.name]:List,
    [Cell.name]:Cell,
    [CellGroup.name]:CellGroup,
  },
  data() {
    return {
      lineList:[],//外观检测通道列表
      itemtype:'',//检测项目类型
    }
  },
  mounted() {
    document.querySelector('body').setAttribute('style', 'background-color:#F5F5F5');
    console.log(this.$store.getters.getLinelist);
    this.itemtype=this.$store.getters.getitemtype; //页面加载获取检验项目类型
    var configlist= this.$store.getters.getLinelist; //获取检测通道列表
    configlist.forEach(value=>{
      if(value.tag==this.itemtype){
          this.lineList.push(value);
        }
    });
  },
  beforeDestroy() {
    document.querySelector('body').removeAttribute('style')
  },
  computed: {
     // 检验项目类型
     itemTitle(value){
       return function (value) {
         if(value=='F1'){
           return '外观检测';
         }else if(value=='NQ'){
           return '联网查询';
         }else if(value=='UC'){
           return '唯一性检查';
         }else if(value=='DC'){
           return '底盘动态';
         }else if(value=='R'){
           return '路试检查';
         }
       }
     },
  },
  methods: {
     /**
       *返回按钮
       */
    onClickLeft(){
        this.$router.push({name:'itemSelect'})
      },
    // 选择外检通道
    Selecttongdao(value){
      this.$router.push({name:'car_select'});
      this.$store.dispatch('getlineNum',value);
    },
  },
}
</script>
<style scoped>
.linelist{
  font-size: 19px;
  font-weight: 600;
}
.van-nav-bar__title{
  font-size: 20px;
  font-weight: 600;
}
.navbar{
  font-size: 20px;
  font-weight: 600;
}
.van-cell__right-icon{
  font-size:22px;
}
</style>
