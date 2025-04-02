import request from '../../utils/request.js'

/**
 * 
 * @param {*} data 
 * @description 获取图书列表
 */
export const getBookslist = (data) => {
    return request({
        method: 'GET',
        url: '/api/books',
        //data: data //body传参方式
        params: data //params传参方式
    })
}

/**
 * 
 * @param {*} data 
 * @description 新增图书
 */
export const getBooksAdd = (data) => {
    return request({
        method: 'POST',
        url: '/api/books/add',
        data: data //body传参方式
        //params: data //params传参方式
    })
}

/**
 * 
 * @param {*} data 
 * @description 修改图书
 */
export const getBooksUpd = (data) => {
    return request({
        method: 'POST',
        url: '/api/books/update',
        data: data //body传参方式
        //params: data //params传参方式
    })
}

/**
 * 
 * @param {*} data 
 * @description 删除图书
 */
export const getBooksDel = (data) => {
    return request({
        method: 'POST',
        url: '/api/books/delete',
        data: data //body传参方式
        //params: data //params传参方式
    })
}


