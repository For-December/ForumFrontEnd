import {request} from "@/plugins/myAxios.ts";

export const login = (params:any)=>{
    return request({
        method: 'post',
        url: '/auth/login',
        data: params,
        headers:{'Content-Type': 'application/x-www-form-urlencoded'},
    })
}