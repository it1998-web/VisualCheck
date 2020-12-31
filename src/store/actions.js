const actions = {
    getcarData({ commit }, payload) { //外检车辆信息
        commit("GETCARSDATA", payload)
    },
    getwgTag({ commit }, payload) { //外观检测参数
        commit("GETWGTAG", payload)
    },
    getState({ commit }, payload) { //保存合格状态
        commit("GETSAVESTATE", payload)
    },
    getitemtype({ commit }, payload) { //项目类型
        commit("GETITEMTYPE", payload)
    },
    getLinelist({ commit }, payload) { //检测通道
        commit("GETLINELIST", payload)
    },
    getlineNum({ commit }, payload) { //外检通道编号
        commit("GETLINENUM", payload)
    },
    getuserInfo({ commit }, payload) { //用户信息
        commit("GETUSERINFO", payload)
    },
    getqualified({ commit }, payload) { //总检验结果是否合格
        commit("GETQUALIFIED", payload)
    },
    getImglength({ commit }, payload) { //拍摄照片总数量
        commit("GETIMGLENGTH", payload)
    },
    getCookie({ commit }, payload) { //拍摄照片总数量
        commit("GETCOOKIE", payload)
    },
    getDate1({ commit }, payload) { //查询待检列表的开始时间
        commit("GETDATE1", payload)
    },
    getxh({ commit }, payload) { //上传照片时返回的序号
        commit("GETXH", payload)
    },
};
export default actions;