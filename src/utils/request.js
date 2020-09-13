import Vue from 'vue'
import axios from 'axios'
import { Message } from 'element-ui'
import router from '../router'

Vue.prototype.$axios = axios
axios.defaults.baseURL = '/api'

axios.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = token
    }
    return config
})

axios.interceptors.response.use(res => {
    if (res.data.statusCode === 401 && res.data.message === '用户信息验证失败') {
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        Message.error('token失效')
        router.push('/login')
    }
    return res.data
})