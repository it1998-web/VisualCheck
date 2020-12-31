// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from '@/store/index'
import './assets/icon/iconfont.css';
import './assets/css/resetui.css';
import 'lib-flexible/flexible';
Vue.config.productionTip = false;
// 调用HTML5+ APi 获取设备信息
var onPlusReady = function (callback, context = this) {
　if (window.plus) {
　　　　callback.call(context)
　　 } else {
　　　　document.addEventListener('plusready', callback.bind(context))
　　　}
　　}
　　Vue.mixin({
　　 　　beforeCreate () {
　　　　　　onPlusReady(() => { this.plusReady = true }, this)
　　 　　},
　methods: {
　onPlusReady: onPlusReady
　　　　}

　　})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
