import axios, {AxiosRequestConfig} from 'axios'

// 全局默认配置
// axios.defaults.baseURL = 'https://api.example.com';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 自定义实例
const myAxios = axios.create({
    baseURL: 'http://localhost:8080/api/v1'
});

myAxios.interceptors.request.use(
    config => {
        // 鉴权Header
        if (localStorage.getItem('PAOPAO_TOKEN')) {
            (config.headers as any)['Authorization'] = 'Bearer ' + localStorage.getItem('PAOPAO_TOKEN');
        }

        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

myAxios.interceptors.response.use(function (response){
    console.log("请求收到了",response)
    return response;
},function (error){
    return Promise.reject(error)
})

export default myAxios;
export function request<T, R>(config: AxiosRequestConfig<T>): Promise<R> {
    return myAxios(config) as unknown as Promise<R>;
}