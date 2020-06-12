/*
    权限校验：
        vue中的router的前置钩子函数内，beforeEach(to,from,next)
        进行路由跳转前判断是否登录，登录跳转，没登录跳转登录页

*/

import router from './router/index';
import { getUserInfo } from './api/login';

router.beforeEach((to, from, next) => {
    //1.获取token
    const token = localStorage.getItem('mxg-msm-token');
    if (!token) {
        //1.1没有获取到，要访问非登录页，跳转到登录页
        if (to.path !== '/login') {
            next({ path: '/login' });
        } else {
            //如果访问的是login
            next()
        }
    } else {
        //1.2获取到token
        //1.2.1 请求/login,跳转到登录页
        if (to.path === '/login') {
            next({ path: '/login' });
        } else {
            //1.2.2 请求非登录页,先在本地查看是否有用户信息
            const userInfo = localStorage.getItem('mxg-msm-user');
            if (userInfo) {
                //如果获取到用户信息，就进行非登录页面的跳转
                next();
            } else {
                //如果本地没有用户信息，通过token获取用户信息
                getUserInfo(token).then(response => {
                    const resp = response.data;
                    if (resp.flag) {
                        //如果获取到用户信息，就进行非登录页面的跳转
                        //将用户信息保存到本地
                        localStorage.setItem('mxg-msm-user', JSON.stringify(resp.data));
                        next();
                    } else {
                        //未获取到用户信息,跳转到登录
                        next({ path: '/login' })
                    }
                })
            }
        }
    }


})