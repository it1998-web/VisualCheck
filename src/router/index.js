import Vue from 'vue'
import Router from 'vue-router'

import login from './config/Business';
import aisle from './config/Business';
import jcjl from './config/Business';
import waitinglist from './config/Business';
import testmain from './config/Business';
import identification from './config/Business';
import characteristic from './config/Business';
import appearance from './config/Business';
import safetydevice from './config/Business';
import takephoto from './config/Business';
import server from './config/Business';
import Main from './config/Business';
import onlinequery from './config/Business';
import dynamicchassis from './config/Business';
import violateVeh from './config/Business';
import violatePhoto from './config/Business';
Vue.use(Router)

const routes = [
    ...login, // 登录
    ...aisle, //检测通道
    ...jcjl, //检测记录
    ...waitinglist, //车辆待检列表
    ...testmain, //外检主界面
    ...identification, //唯一性
    ...characteristic, //特征参数
    ...appearance, //外观检查
    ...safetydevice, //安全检查
    ...takephoto, //拍照
    ...server, //服务器选择
    ...Main, //检测项目选择
    ...onlinequery, //联网
    ...dynamicchassis, //底盘动态检查
    ...violateVeh,
    ...violatePhoto,
]
const router = new Router({
        routes
    })
    /*
    路由导航守卫 检测路由跳转 判断用户是否登录

    如果访问的是登录页面 且没有 token 信息 就直接访问登录页
    如果登录页面有 token 那就无需再次登录 直接进主页选择 检测项目

    登录成功以后进入软件 也要判断页面是否有 token 信息 有就放行 没有则强制跳转到登录页

    */
router.beforeEach((to, from, next) => {
    const tokenStr = window.localStorage.getItem('token');
    console.log(tokenStr)
    console.log(to);
    if (to.path === '/') {
        if (tokenStr) {
            next('/itemSelect');
        } else {
            next();
        }
    } else if (to.path === '/server') {
        next();
    } else {
        //获取token 信息
        if (tokenStr) {
            next();
        } else {
            next('/');
        }
    }

})
export default router