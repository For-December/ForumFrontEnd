// 尝试自动验证并登录
import {takeAuthObj} from "@/plugins/myAxios.ts";
import {userInfo} from "@/api/auth.ts";
import {authed, curUser, curUserId} from "@/plugins/globalData.ts";

export async function authAndLogin(): Promise<boolean> {
    const authObj = takeAuthObj();
    console.log(authObj)
    if (authObj) {
        return await userInfo(authObj.username).then((data) => {
            authed.value = true;
            curUser.value = authObj.username;
            curUserId.value = data.id
            console.log(data);
            return true;
        }).catch((err) => {
            console.log(err);
            return false;
        })
    }
    return false;
}


// 计算时间间隔
export const getTimeGap = (now: Date, last: Date): string => {
    const millisecondsGap = now.valueOf() - last.valueOf();
    const yearGap = Math.floor(millisecondsGap / (1000 * 60 * 60 * 24 * 365));
    if (yearGap > 0) return yearGap + " 年前";


    const monthGap = Math.floor(millisecondsGap / (1000 * 60 * 60 * 24 * 30));
    if (monthGap > 0) return monthGap + " 月前";

    const dayGap = Math.floor(millisecondsGap / (1000 * 60 * 60 * 24));
    if (dayGap > 0) return dayGap + " 天前";

    const hourGap = Math.floor(millisecondsGap / (1000 * 60 * 60));
    if (hourGap > 0) return hourGap + " 小时前";

    const minuteGap = Math.floor(millisecondsGap / (1000 * 60));
    if (minuteGap > 0) return minuteGap + " 分钟前";

    const secondGap = Math.floor(millisecondsGap / (1000));
    if (secondGap > 0) return secondGap + " 秒前";
    return "刚刚";

}