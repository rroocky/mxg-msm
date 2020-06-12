//@符号就表示项目的src目录  vuecli已经设定好了
import request from '@/utils/request';

export function login(username, password) {
    return request({
        url: "/user/login",
        method: "post",
        data: {
            username,
            password
        }
    })
}

export function getUserInfo(token) {
    return request({
        url: "/user/info/${token}",
        method: "get"
    })
}

export function logout(token) {
    return request({
        url: "/user/logout",
        method: "post",
        data: {
            token
        }
    })
}