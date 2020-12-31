// 公共方法

export function transfer(day) {
    return `${day.getFullYear()}-${(day.getMonth() + 1) >= 10?(day.getMonth() + 1):'0'+(day.getMonth() + 1)}-${day.getDate() >= 10?day.getDate():'0'+day.getDate()}`

}
//获取当前日期
export function myformatter(val) {
    var date = new Date(val)
    var year = date.getFullYear();
    var mouth = date.getMonth() + 1;
    var day = date.getDate();
    if (mouth < 10) {
        mouth = '0' + mouth
    }
    if (day < 10) {
        day = '0' + day
    }
    return year + '-' + mouth + '-' + day;
}

//上个月的1号
export function ThirtyDaysAgo(date) {
    var date1 = new Date()
    var strDate1 = date1.getFullYear() + '-';
    strDate1 += date1.getMonth() + '-' + '1';
    return strDate1;
}

// JSON格式时间戳 /Date(1545299299910)/ 处理
export function jsonDate(date) {
    var time = new Date(parseInt(date.replace("/Date(", "").replace(")/", ""), 10));
    return time;
}

//日期格式化处理 给日期自动补0操作 .toString().padStart(2,'0') 获取年月日时分秒
export function getDate(time) {
    var value = time.getFullYear() + "-" + ((time.getMonth() + 1).toString().padStart(2, '0')) + "-" + ((time.getDate()).toString().padStart(2, '0')) + " " + ((time.getHours()).toString().padStart(2, '0')) + ":" + ((time.getMinutes()).toString().padStart(2, '0')) + ":" + ((time.getSeconds()).toString().padStart(2, '0'));
    return value;
}

/**
 * 获取上一个月
 *
 * @date 格式为yyyy-mm-dd的日期，如：2014-01-25
 */
export function getlastPreMonth(date) {
    var arr = date.split('-');
    var year = arr[0]; //获取当前日期的年份
    var month = arr[1]; //获取当前日期的月份
    var day = arr[2]; //获取当前日期的日
    var days = new Date(year, month, 0);
    days = days.getDate(); //获取当前日期中月的天数
    var year2 = year;
    var month2 = parseInt(month) - 1;
    if (month2 == 0) {
        year2 = parseInt(year2) - 1;
        month2 = 12;
    }
    var day2 = day;
    var days2 = new Date(year2, month2, 0);
    days2 = days2.getDate();
    if (day2 > days2) {
        day2 = days2;
    }
    if (month2 < 10) {
        month2 = '0' + month2;
    }
    var t2 = year2 + '-' + month2;
    return t2;
}

/**
 * 获取下一个月
 *
 * @date 格式为yyyy-mm-dd的日期，如：2014-01-25
 */
export function getNextMonth(date) {
    var arr = date.split('-');
    var year = arr[0]; //获取当前日期的年份
    var month = arr[1]; //获取当前日期的月份
    var day = arr[2]; //获取当前日期的日
    var days = new Date(year, month, 0);
    days = days.getDate(); //获取当前日期中的月的天数
    var year2 = year;
    var month2 = parseInt(month) + 1;
    if (month2 == 13) {
        year2 = parseInt(year2) + 1;
        month2 = 1;
    }
    var day2 = day;
    var days2 = new Date(year2, month2, 0);
    days2 = days2.getDate();
    if (day2 > days2) {
        day2 = days2;
    }
    if (month2 < 10) {
        month2 = '0' + month2;
    }

    var t2 = year2 + '-' + month2;
    return t2;
}