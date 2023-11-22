// 查询所有咱过的贴子
import {request} from "@/plugins/myAxios.ts";

export const getStaredPost = (userId: number): Promise<number[]> => {
    return request({
        method: "get",
        url: "/user/stars",
        params: {userId},
    });
}