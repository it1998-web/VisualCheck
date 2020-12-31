<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive "/>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"/>
  </div>
</template>

<script>
export default {
  name: 'App',
  provide(){
    return {
      reload:this.reload
    }
  },
  data() {
    return {
      isRouterAlive:true
    }
  },
  created () {

  },
  mounted() {

  },
  methods:{
    reload(){
      this.isRouterAlive=false;
      this.$nextTick(function(){
         this.isRouterAlive=true;
      })
    }
  }
}
</script>

<style>
  @import "assets/css/basic.css";
  #app {
    height: 100%;
    overflow: auto;
  }
  /*.van-calendar__bottom-info{*/
  /*  color: #ffc107;*/
  /*}*/
</style>
