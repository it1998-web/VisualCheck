// 登录
import request from './index';
const global = require('@/api/baseurl')
    // global.globalApi()  发布时在url前面打包加上 ${global.globalApi()}
    // 登录
export function login(data, sid) {
    return request({
        url: `${global.globalApi()}/handlers/MobileApp.ashx?code=login`,
        method: "post",
        withCredentials: true, // 默认的
        headers: {
            "ASP.NET_SessionId": sid
        },
        data,
    })
}

// 获取待检列表
export function awaitList(itemcode, data, sid) {
    return request({
        url: `${global.globalApi()}/handlers/MobileApp.ashx?code=getwaitinglist&&jyxm=${itemcode}`,
        method: "post",
        withCredentials: true, // 默认的
        headers: {
            "ASP.NET_SessionId": sid
        },
        data,
    })
}

// 获取 检测记录 列表
export function RecordList(itemcode, data, sid) {
    return request({
        url: `${global.globalApi()}/handlers/MobileApp.ashx?code=getresultlist&&jyxm=${itemcode}`,
        method: "post",
        withCredentials: true, // 默认的
        headers: {
            "ASP.NET_SessionId": sid
        },
        data,
    })
}
// 确认项目开始 动态获取检测项目
export function onConfirm(jyxm, data, sid) {
    return request({
        url: `${global.globalApi()}/handlers/MobileApp.ashx?code=getresult&&jyxm=${jyxm}`,
        method: "post",
        withCredentials: true, // 默认的
        headers: {
            "ASP.NET_SessionId": sid
        },
        data,
    })
}


// 开始项目
export function itemStart(jyxm, data, sid) {
    return request({
        url: `${global.globalApi()}/handlers/MobileApp.ashx?code=itemstart&jyxm=${jyxm}`,
        method: "post",
        withCredentials: true, // 默认的
        headers: {
            "ASP.NET_SessionId": sid
        },
        data,
    })
}

// 项目结束
export function itemEnd(jyxm, data, sid) {
    return request({
        url: `${global.globalApi()}/handlers/MobileApp.ashx?code=itemend&jyxm=${jyxm}`,
        method: "post",
        withCredentials: true, // 默认的
        headers: {
            "ASP.NET_SessionId": sid
        },
        data,
    })
}

// 图片上传
export function uploadImg(data, sid) {
    return request({
        url: `${global.globalApi()}/handlers/MobileApp.ashx?code=photoresult`,
        method: "post",
        withCredentials: true, // 默认的takePhoto
        headers: {
            "ASP.NET_SessionId": sid
        },
        data,
    })
}
// 触发拍照
export function takePhoto(data, sid) {
    return request({
        url: `${global.globalApi()}/handlers/MobileApp.ashx?code=takephoto`,
        method: "post",
        withCredentials: true, // 默认的
        headers: {
            "ASP.NET_SessionId": sid
        },
        data,
    })
}
// 保存外检结果
export function saveData(jyxm, data, sid) {
    return request({
        url: `${global.globalApi()}/handlers/MobileApp.ashx?code=result&&jyxm=${jyxm}`,
        method: "post",
        withCredentials: true, // 默认的
        headers: {
            "ASP.NET_SessionId": sid
        },
        data,
    })
}
// 保存违规车辆
export function saveViolateVeh(jyxm,data, sid) {
    return request({
        url: `${global.globalApi()}/handlers/MobileApp.ashx?code=result&&jyxm=${jyxm}`,
        method: "post",
        withCredentials: true, // 默认的
        headers: {
            "ASP.NET_SessionId": sid
        },
        data,
    })
}
// 保存嫌疑车辆
export function saveSuspicionVeh(data, sid) {
    return request({
        url: `${global.globalApi()}/handlers/MobileApp.ashx?code=result&&jyxm=VL`,
        method: "post",
        withCredentials: true, // 默认的
        headers: {
            "ASP.NET_SessionId": sid
        },
        data,
    })
}