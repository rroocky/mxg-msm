import Axios from 'axios';

const request = Axios.create({
    baseURL: process.env.VUE_APP_BASE_API,//api路径前缀 没有就写/或不写
    timeout: 5000//超时响应
})

//默认找的是public下的文件
// request.get('/db.json').then(response => {
//     const data = response.data;
//     console.log(data);
// })

//请求拦截
request.interceptors.request.use(config => {
    //请求拦截
    return config
}, err => {
    //出现错误
    return Promise.reject(err);
})

//响应拦截
request.interceptors.response.use(response => {
    //响应拦截
    return response
}, err => {
    //出现错误
    return Promise.reject(err);
})


export default request;