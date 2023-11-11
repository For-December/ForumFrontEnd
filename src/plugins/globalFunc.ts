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