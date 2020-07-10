import request from '../utils/request'

export default {
    //获取列表信息
    getList() {
        return request({
            url: "/supplier/list",
            method: "get"
        })
    },
    //根据条件查询列表信息
    search(page, size, searchMap) {
        return request({
            url: `/supplier/list/search/${page}/${size}`,
            method: "post",
            data: searchMap
        })
    },
    //添加供应商
    add(pojo) {
        return request({
            url: `/supplier`,
            method: "post",
            data: pojo
        })
    },
    //根据id查询供应商
    getById(id) {
        return request({
            url: `/supplier/${id}`,
            method: "get"
        })
    },
    //更新供应商信息
    update(pojo) {
        return request({
            url: `/supplier/${pojo.id}`,
            method: "put",
            data: pojo
        })
    },
    //删除供应商
    delete(id) {
        return request({
            url: `/supplier/${id}`,
            method: "delete"
        })
    }
}