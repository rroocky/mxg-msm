import request from "@/utils/request.js"

export default {
    //获取商品分页列表
    search(page, size, searchMap) {
        return request({
            url: `/goods/list/search/${page}/${size}`,
            method: 'post',
            data: searchMap
        })
    }
}