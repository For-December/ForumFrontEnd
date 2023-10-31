import axios, {AxiosRequestConfig} from 'axios'
import {ElMessage} from "element-plus";
// 全局默认配置
// axios.defaults.baseURL = 'https://api.example.com';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 自定义实例
const myAxios = axios.create({
    baseURL: 'http://localhost:8080/api/v1'
});

const authItemName = 'sukura_fox_token'

const defaultFailure = (message: string, code: number, url: string) => {
    console.warn(`请求地址: ${url},状态码: ${code}, 错误信息: ${message}`)
    ElMessage.warning(message)
}
const defaultError = (err: any) => {
    console.error(err)
    ElMessage.warning('发生了一些奇怪的错误，请联系管理员')
}

function takeAccessToken():any{
    const str = localStorage.getItem(authItemName)||sessionStorage.getItem(authItemName)
    if (!str) return null
    const authObj = JSON.parse(str)
    if (authObj.expire<=new Date()){
        deleteAccessToken()
        ElMessage.warning('登录状态已过期，请重新登录')
        return null
    }
    return authObj.token
}

function deleteAccessToken(){
    localStorage.removeItem(authItemName)
    sessionStorage.removeItem(authItemName)
}

function storeAccessToken(remember:boolean,token:string,expire:Date){
    const authObj = {token:token,expire:expire}
    const  str = JSON.stringify(authObj)
    if (remember){
        localStorage.setItem(authItemName,str)
    }else {
        sessionStorage.setItem(authItemName,str)
    }
}

function internalPost(url: string, data: object, header: any, success: (data:any)=>void, failure = defaultFailure, error = defaultError) {
    myAxios.post(url, data, {headers: header}).then(({data}) => {
        if (data.code === 200) {
            success(data.data)
        } else {
            failure(data.message, data.code, url)
        }
    }).catch(err => error(err))
}

function internalGet(url: string, header: any, success: any, failure: any, error = defaultError) {
    myAxios.get(url, {headers: header}).then(({data}) => {
        if (data.code === 200) {
            success(data.data)
        } else {
            failure(data.message, data.code, url)
        }
    }).catch(err => error(err))
}
function login(username:string,password:string,remember:boolean,success:(data:any)=>void){
    internalPost('/auth/login',{
        username: username,
        password:password
    },{
        'Content-Type':'application/x-www-form-urlencoded'
    },(data)=>{
        storeAccessToken(remember,data.token,data.expire)
        ElMessage.success(`登录成功！欢迎${data.username}加入~`)
        success(data)


    })
}


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

export {login}