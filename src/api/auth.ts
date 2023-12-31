import {request} from "@/plugins/myAxios.ts";
import Authorize = NetResp.Authorize;
import UserInfo = NetResp.UserInfo;

export const login = (params: any): Promise<Authorize> => {
    return request({
        method: 'post',
        url: '/auth/login',
        data: params,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    });
};

export const userInfo = (username: string): Promise<UserInfo> => {
    return request({
        method: 'get',
        url: '/user/info',
        params: {username: username},
        headers: {'Content-Type': 'application/json'}
    });
};

export const logout = () => {
    return request({
        method: 'get',
        url: '/auth/logout',
    });
};

export const askCode = (email: string, type: string) => {
    return request({
        method: 'get',
        url: '/auth/ask-code',
        params: {email: email, type: type},
    });
}

export const register = (data:any) => {
    return request({
        method: 'post',
        url: '/auth/register',
        data,
    });
}
