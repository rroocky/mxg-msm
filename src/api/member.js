import request from '@/utils/request.js';

export default {
    //获取会员列表
    getList() {
        return request({
            url: "/member/list",
            method: "get"
        })
    },
    //分页查询
    //page 当前页码
    //size 每页条数
    //searchMap 查询条件
    search(page, size, searchMap) {
        return request({
            url: `/member/list/search/${page}/${size}`,
            method: "post",
            data: searchMap
        })
    },
    //新增会员
    add(pojo) {
        return request({
            url: `/member`,
            method: "post",
            data: pojo
        })
    },
    //查询会员信息
    getById(id) {
        return request({
            url: `/member/${id}`,
            method: "get"
        })
    },
    //修改会员信息
    update(pojo) {
        return request({
            url: `/member/${pojo.id}`,
            method: "put",
            data: pojo
        })
    },
    delete(id) {
        return request({
            url: `/member/${id}`,
            method: "delete"
        })
    }
}