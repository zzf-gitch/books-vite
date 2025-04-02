import axios from "axios";
import qs from "qs";
import {
    ElMessage,
    ElLoading
} from "element-plus";

const server = axios.create({})
// get请求默认请求头
server.defaults.headers.get['Content-Type'] = 'application/json'
// post请求默认请求头信息
server.defaults.headers.post['Content-Type'] = 'application/json'
// 请求超时时间1分钟
server.defaults.timeout = 60000
//设置全局请求次数
server.defaults.retry = 1
//设置全局请求间隙
server.defaults.retryDelay = 12000
// 请求地址
server.defaults.baseURL = process.env.VUE_APP_BASE_URL

let loading = null
// 请求拦截器
server.interceptors.request.use(config => {
    loading = ElLoading.service({
        lock: true,
        text: '正在加载中，请稍后.......',
        background: 'rgba(255, 255, 255, 0.3)',
        customClass: 'loadingAnimation'
    })


    return config
}, error => {
    loading.close()
    return Promise.reject(error)
})

// 响应拦截器
server.interceptors.response.use(
    response => {
        loading.close()
        return response.data
    },
    error => {
        console.log('err' + error)
        ElMessage({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)

export default server
