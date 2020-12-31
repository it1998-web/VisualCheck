import store from '@/store';
import { myformatter } from './Utility';
export default [
    // 登录
    {
        path: '/',
        name: 'login',
        component: () =>
            import ('@/components/Login'),
        meta: {
            title: "登录",
            keepAlive: false
        }
    },
    // 服务器选择
    {
        path: '/server',
        name: 'serverSelect',
        component: () =>
            import ('@/components/ServerSelect'),
        meta: {
            title: "服务器选择",
            keepAlive: false
        }
    },
    // 检测项目选择
    {
        path: '/itemSelect',
        name: 'itemSelect',
        component: () =>
            import ('@/components/Main'),
        meta: {
            title: "选择检测项目",
            keepAlive: false
        }
    },
    // 外观检测通道
    {
        path: '/aisle',
        name: 'aisle',
        component: () =>
            import ('@/components/LineSelect'),
        meta: {
            title: "检测通道",
            keepAlive: false
        }
    },
    // 车辆选择
    {
        path: '/carselect',
        name: 'car_select',
        component: () =>
            import ('@/components/WaitingList'),
        meta: {
            title: "车辆选择",
            keepAlive: false
        }
    },
    // 检测记录
    {
        path: '/recordJCJL',
        name: 'record_jcjl',
        component: () =>
            import ('@/components/TestResultList'),
        meta: {
            title: "检测记录",
            keepAlive: false
        }
    },
    //违规车辆
    {
        path: '/violateVeh',
        name: 'violate',
        component: () =>
            import ('@/components/ViolateVeh'),
        meta: {
            title: "违规车辆",
            keepAlive: false
        }
    },
    //违规车辆照片
    {
        path: '/ViolatePhoto',
        name: 'violatePhoto',
        component: () =>
            import ('@/components/ViolatePhoto'),
        meta: {
            title: "违规车辆照片",
            keepAlive: false
        }
    },
    /*
     外观检测主界面
     /testMain/Characteristic
    */
    {
        path: '/testMain',
        name: 'testMain',
        redirect: to => {
            console.log(window.localStorage.getItem('key'))
            const type = window.localStorage.getItem('key');
            const date = new Date('2021-01-01');
            const nowdate = new Date();

            console.log(date.getTime(), nowdate.getTime())
            if (type == 'F1') {
                if (nowdate.getTime() < date.getTime()) {
                    return '/testMain/CharacteristicOld';
                    // return '/testMain/Characteristic';
                } else {
                    return '/testMain/Characteristic';
                }
            } else if (type == 'DC') {
                return '/testMain/DynamicChassis';
            } else if (type == 'NQ') {
                return '/testMain/OnlineQuery';
            } else if (type == 'UC') {
                return '/testMain/Identification';
            }else if (type == 'R') {
                return '/testMain/RoadTest';
            }
        },
        component: () =>
            import ('@/components/TestMain'),
        meta: {
            title: "外观检测主界面",
            keepAlive: false
        },
        children: [
            // 唯一性
            {
                path: 'Identification',
                name: 'Identification',
                component: () =>
                    import ('@/components/Identification'),
                meta: {
                    title: "唯一性",
                    keepAlive: false
                }
            },
            // 特征参数 新国标
            {
                path: 'Characteristic',
                name: 'Charac_teristic',
                component: () =>
                    import ('@/components/Characteristic'),
                meta: {
                    title: "特征参数",
                    keepAlive: false
                }
            },
            // 老国标 特征参数
            {
                path: 'CharacteristicOld',
                name: 'Charac_teristicOld',
                component: () =>
                    import ('@/components/CharacteristicOld'),
                meta: {
                    title: "老国标特征参数",
                    keepAlive: false
                }
            },
            // 外观检查
            {
                path: 'Appearance',
                name: 'Appearance',
                component: () =>
                    import ('@/components/Appearance'),
                meta: {
                    title: "外观检查",
                    keepAlive: false
                }
            },
            // 安全检查
            {
                path: 'SafetyDevice',
                name: 'SafetyDevice',
                component: () =>
                    import ('@/components/SafetyDevice'),
                meta: {
                    title: "安全检查",
                    keepAlive: false
                }
            },
            // 拍照
            {
                path: 'TakePhoto',
                name: 'Take_Photo',
                component: () =>
                    import ('@/components/TakePhoto'),
                meta: {
                    title: "拍照",
                    keepAlive: false
                }
            },
            // 联网
            {
                path: 'OnlineQuery',
                name: 'Online_Query',
                component: () =>
                    import ('@/components/OnlineQuery'),
                meta: {
                    title: "联网",
                    keepAlive: false
                }
            },
            // 底盘动态
            {
                path: 'DynamicChassis',
                name: 'Dynamic_Chassis',
                component: () =>
                    import ('@/components/DynamicChassis'),
                meta: {
                    title: "底盘动态",
                    keepAlive: false
                }
            },

            // 路试检查
            // 底盘动态
            {
                path: 'RoadTest',
                name: 'RoadTest',
                component: () =>
                    import ('@/components/RoadTest'),
                meta: {
                    title: "底盘动态",
                    keepAlive: false
                }
            },

        ]
    },
]
