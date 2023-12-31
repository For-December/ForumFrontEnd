import axios, {AxiosRequestConfig} from 'axios'
import {ElMessage} from "element-plus";
import Authorize = NetResp.Authorize;
// 全局默认配置
// axios.defaults.baseURL = 'https://api.example.com';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 自定义实例
const myAxios = axios.create({
    baseURL: 'http://localhost:8080/api/v1',
});

export const authTokenKey = 'sukura_fox_token';
myAxios.interceptors.request.use(
    // 相当于 map 处理器，为config 添加内容
    config => {
        // 鉴权Header
        if (localStorage.getItem(authTokenKey)) {
            const token = takeAuthObj()?.token;
            (config.headers as any)['Authorization'] = 'Bearer ' + token;
        }


        return config;
    },
    error => {
        return Promise.reject(error);
    }
)
myAxios.interceptors.response.use(
    response => {

        // 这里不再传递message了，因为是前端预期中的结果
        const {data = {}, code = 0} = response?.data || {};
        if (+code === 200) {
            return data;
        }

        return Promise.reject(response?.data || {});

    },
    (error = {}) => {
        const {response = {}} = error || {};

        // 加号将后面的内容转换为数字，`?.`是可选链操作符，为空则表达式结果为undefined而非报错
        switch (+response?.status) {
            case 401: // 鉴权失败时执行此逻辑
                if (response?.data.code !== 10005) {
                    ElMessage.warning(response?.data.message || '鉴权失败！');
                }
                break;
            case 403: // 权限不够时执行此逻辑
                ElMessage.warning(response?.data.message || '权限不足！');
                break;

            case 400:
                ElMessage.warning(response?.data.message || '请求信息有误！');
                break;
            default: // 未知错误
                console.log(error)
                console.log(response)
                ElMessage.error('发生了一些奇怪的错误，请联系管理员')

        }

        return Promise.reject(response?.data || {});
    }
)

// const defaultFailure = (message: string, code: number, url: string) => {
//     console.warn(`请求地址: ${url},状态码: ${code}, 错误信息: ${message}`)
//     ElMessage.warning(message)
// }
// const defaultError = (err: any) => {
//     console.error(err)
//     ElMessage.warning('发生了一些奇怪的错误，请联系管理员')
// }

export function takeAuthObj(): Authorize | null {
    const str = localStorage.getItem(authTokenKey)
    if (!str) return null
    const authObj = JSON.parse(str)
    if (authObj.expire <= new Date()) {
        deleteAccessToken()
        ElMessage.warning('登录状态已过期，请重新登录')
        return null
    }
    return authObj
}

export function deleteAccessToken() {
    localStorage.removeItem(authTokenKey)
}

export function storeAuthInfo(authObj: Authorize) {
    const str = JSON.stringify(authObj)
    localStorage.setItem(authTokenKey, str)
}

// function internalPost(url: string, data: object, header: any, success: (data: any) => void, failure = defaultFailure, error = defaultError) {
//     myAxios.post(url, data, {headers: header}).then(({data}) => {
//         if (data.code === 200) {
//             success(data.data)
//         } else {
//             failure(data.message, data.code, url)
//         }
//     }).catch(err => error(err))
// }

// function internalGet(url: string, header: any, success: any, failure: any, error = defaultError) {
//     myAxios.get(url, {headers: header}).then(({data}) => {
//         if (data.code === 200) {
//             success(data.data)
//         } else {
//             failure(data.message, data.code, url)
//         }
//     }).catch(err => error(err))
// }

// function login(username: string, password: string, remember: boolean, success: (data: any) => void) {
//     internalPost('/auth/login', {
//         username: username,
//         password: password
//     }, {
//         'Content-Type': 'application/x-www-form-urlencoded'
//     }, (data) => {
//         storeAccessToken(remember, data.token, data.expire)
//         ElMessage.success(`登录成功！欢迎${data.username}加入~`)
//         success(data)
//     })
// }


// myAxios.interceptors.request.use(
//     config => {
//         // 鉴权Header
//         if (localStorage.getItem('PAOPAO_TOKEN')) {
//             (config.headers as any)['Authorization'] = 'Bearer ' + localStorage.getItem('PAOPAO_TOKEN');
//         }
//
//         return config;
//     },
//     error => {
//         return Promise.reject(error);
//     }
// );

// myAxios.interceptors.response.use(function (response) {
//     console.log("请求收到了", response)
//     return response;
// }, function (error) {
//     return Promise.reject(error)
// })

// export default myAxios;

// export function request<T, R>(config: AxiosRequestConfig<T>): Promise<R> {
//     return myAxios(config) as unknown as Promise<R>;
// }

export function request<T, R>(config: AxiosRequestConfig<T>): Promise<R> {
    return myAxios(config) as unknown as Promise<R>;
}